"use client";
import { Fragment, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Decal, useTexture } from '@react-three/drei';
import { useConfigurator } from '@/store/configurator';
import type { FormId, LayerKey } from '@/lib/catalog';
import { useGLTF } from '@react-three/drei';

function GlbModel({ url, form, size = 2.2 }: { url: string; form: FormId; size?: number }) {
  const { scene } = useGLTF(url);

  const geo = useMemo(() => {
    let best: THREE.Mesh | null = null;
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      if (!best || m.geometry.attributes.position.count > best.geometry.attributes.position.count) best = m;
    });
    if (!best) return null;
    const g = (best as THREE.Mesh).geometry.clone();
    g.center();
    g.computeBoundingBox();
    const s = g.boundingBox!.getSize(new THREE.Vector3());
    const k = size / Math.max(s.x, s.y, s.z);
    g.scale(k, k, k);
    return g;
  }, [scene, size]);

  if (!geo) return null;
  return (
    <mesh geometry={geo}>
      <Metal />
      <Layers form={form} />
    </mesh>
  );
}

interface DecalCfg { z: number; depth: number; size: number; reachX: number; reachY: number }
const DECAL: Record<FormId, DecalCfg> = {
  ring: { z: 1.0, depth: 0.7, size: 0.9, reachX: 0.9, reachY: 0.3 },
  pendant: { z: 0.09, depth: 0.3, size: 1.0, reachX: 0.4, reachY: 0.8 },
  charm: { z: 0.1, depth: 0.3, size: 0.9, reachX: 0.35, reachY: 0.6 },
  bracelet: { z: 0.04, depth: 0.2, size: 0.34, reachX: 0.25, reachY: 0.1 },
  earring: { z: 0.09, depth: 0.3, size: 0.4, reachX: 0.15, reachY: 0.3 },
  Axolotl: { z: 1.5, depth: 2.0, size: 1.5, reachX: 1.0, reachY: 1.0 },
};

function Metal() {
  const color = useConfigurator((s) => s.color);
  const metalness = useConfigurator((s) => s.metalness);
  const roughness = useConfigurator((s) => s.roughness);
  return <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} envMapIntensity={1.25} />;
}

/* ---------- เลเยอร์ลาย ---------- */
function DecalMesh({ map, k, form }: { map: THREE.Texture; k: LayerKey; form: FormId }) {
  const L = useConfigurator((s) => s.layers[k]);
  const c = DECAL[form];
  const s = (L.scale / 100) * c.size;
  return (
    <Decal
      position={[(L.x / 100) * c.reachX, (L.y / 100) * c.reachY, c.z]}
      rotation={[0, 0, -(L.rotation * Math.PI) / 180]}
      scale={[s, s, c.depth]}
    >
      <meshStandardMaterial map={map} transparent opacity={L.opacity / 100} polygonOffset polygonOffsetFactor={-4} depthWrite={false} roughness={0.5} />
    </Decal>
  );
}

function ImageDecal({ k, src, form }: { k: LayerKey; src: string; form: FormId }) {
  const map = useTexture(src);
  return <DecalMesh map={map} k={k} form={form} />;
}

function TextDecal({ form }: { form: FormId }) {
  const text = useConfigurator((s) => s.text);
  const color = useConfigurator((s) => s.textColor);
  const [fontsReady, setFontsReady] = useState(false);
  useEffect(() => {
    document.fonts.ready.then(() => setFontsReady(true));
  }, []);
  const map = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 256;
    const ctx = c.getContext('2d')!;
    const fam = getComputedStyle(document.body).getPropertyValue('--font-marker') || 'cursive';
    ctx.font = `120px ${fam}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillText(text || ' ', 256, 132, 480);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, color, fontsReady]);
  return <DecalMesh map={map} k="text" form={form} />;
}

function Layers({ form }: { form: FormId }) {
  const g = useConfigurator((s) => s.layers.graffiti.src);
  const y = useConfigurator((s) => s.layers.symbol.src);
  const t = useConfigurator((s) => s.layers.text.src);
  const text = useConfigurator((s) => s.text);
  return (
    <>
      {g && <ImageDecal key={g} k="graffiti" src={g} form={form} />}
      {y && <ImageDecal key={y} k="symbol" src={y} form={form} />}
      {t && text.trim() && <TextDecal form={form} />}
    </>
  );
}

/* ---------- โซ่ ---------- */
function Chain({ pts }: { pts: [number, number, number][] }) {
  const geo = useMemo(() => {
    const g = new THREE.TorusGeometry(0.07, 0.022, 10, 22);
    g.scale(1.55, 1, 1);
    return g;
  }, []);
  const links = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
    const n = 18;
    return Array.from({ length: n }, (_, i) => {
      const t = i / (n - 1);
      const p = curve.getPointAt(t);
      const tan = curve.getTangentAt(t);
      return { p, ang: Math.atan2(tan.y, tan.x), odd: i % 2 === 1 };
    });
  }, [pts]);
  return (
    <>
      {links.map((l, i) => (
        <group key={i} position={l.p} rotation={[0, 0, l.ang]}>
          <mesh geometry={geo} rotation={[l.odd ? Math.PI / 2 : 0, 0, 0]}>
            <Metal />
          </mesh>
        </group>
      ))}
    </>
  );
}

/* ---------- รูปทรง ---------- */
function extrude(shape: THREE.Shape, depth: number) {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.025, bevelSegments: 3, curveSegments: 14 });
  g.translate(0, 0, -depth / 2);
  return g;
}

function starShape(w: number, h: number, waist: number) {
  const s = new THREE.Shape();
  const pts: [number, number][] = [
    [0, h], [waist, waist * 1.4], [w, 0], [waist, -waist * 1.4], [0, -h], [-waist, -waist * 1.4], [-w, 0], [-waist, waist * 1.4],
  ];
  s.moveTo(...pts[0]);
  pts.slice(1).forEach((p) => s.lineTo(...p));
  s.closePath();
  return s;
}

function Ring() {
  const geo = useMemo(() => {
    const pts = [
      [0.88, -0.45], [0.98, -0.45], [1.0, -0.43], [1.0, 0.43], [0.98, 0.45], [0.88, 0.45], [0.86, 0.43], [0.86, -0.43], [0.88, -0.45],
    ].map(([r, y]) => new THREE.Vector2(r, y));
    return new THREE.LatheGeometry(pts, 120);
  }, []);
  return (
    <group rotation={[0.42, 0, 0]} scale={1.35}>
      <mesh geometry={geo}>
        <Metal />
        <Layers form="ring" />
      </mesh>
    </group>
  );
}

function Pendant() {
  const geo = useMemo(() => extrude(starShape(0.62, 1.35, 0.13), 0.12), []);
  return (
    <group scale={1.05} position={[0, -0.25, 0]}>
      <mesh geometry={geo}>
        <Metal />
        <Layers form="pendant" />
      </mesh>
      <mesh position={[0, 1.47, 0]}>
        <torusGeometry args={[0.1, 0.028, 12, 24]} />
        <Metal />
      </mesh>
      <Chain pts={[[-1.0, 2.35, 0], [-0.45, 1.85, 0], [0, 1.58, 0], [0.45, 1.85, 0], [1.0, 2.35, 0]]} />
    </group>
  );
}

function Charm() {
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.5, -0.8);
    s.lineTo(0.5, -0.8);
    s.lineTo(0.5, 0.2);
    s.bezierCurveTo(0.5, 0.58, 0.26, 0.85, 0, 0.98);
    s.bezierCurveTo(-0.26, 0.85, -0.5, 0.58, -0.5, 0.2);
    s.closePath();
    return extrude(s, 0.14);
  }, []);
  return (
    <group scale={1.25} position={[0, -0.2, 0]}>
      <mesh geometry={geo}>
        <Metal />
        <Layers form="charm" />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <torusGeometry args={[0.1, 0.028, 12, 24]} />
        <Metal />
      </mesh>
      <Chain pts={[[-0.9, 1.9, 0], [-0.4, 1.45, 0], [0, 1.22, 0], [0.4, 1.45, 0], [0.9, 1.9, 0]]} />
    </group>
  );
}

function Bracelet() {
  const N = 24;
  const R = 1.2;
  const geo = useMemo(() => {
    const g = new THREE.TorusGeometry(0.17, 0.045, 12, 26);
    g.scale(1.45, 1, 1);
    return g;
  }, []);
  return (
    <group rotation={[0.5, 0, 0]} scale={1.3}>
      {Array.from({ length: N }, (_, i) => {
        if (i >= 5 && i <= 7) return null; // เว้นที่ให้แผ่นป้าย
        const th = (i * 2 * Math.PI) / N;
        return (
          <group key={i} position={[R * Math.cos(th), 0, R * Math.sin(th)]} rotation={[0, -(th + Math.PI / 2), 0]}>
            <mesh geometry={geo} rotation={[i % 2 ? Math.PI / 2 : 0, 0, 0]}>
              <Metal />
            </mesh>
          </group>
        );
      })}
      <mesh position={[0, 0, R]}>
        <boxGeometry args={[0.78, 0.36, 0.08]} />
        <Metal />
        <Layers form="bracelet" />
      </mesh>
    </group>
  );
}

function Earring({ x }: { x: number }) {
  const geo = useMemo(() => extrude(starShape(0.2, 0.46, 0.05), 0.06), []);
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, 0.78, 0]}>
        <torusGeometry args={[0.42, 0.032, 12, 40]} />
        <Metal />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.06, 0.02, 10, 18]} />
        <Metal />
      </mesh>
      <mesh geometry={geo} position={[0, -0.3, 0]}>
        <Metal />
        <Layers form="earring" />
      </mesh>
    </group>
  );
}

export default function Jewelry({ form }: { form: FormId }) {
  return (
    <Fragment>
      {form === 'ring' && <Ring />}
      {form === 'pendant' && <Pendant />}
      {form === 'charm' && <Charm />}
      {form === 'bracelet' && <Bracelet />}
      {form === 'earring' && (
        <group scale={1.35} position={[0, -0.2, 0]}>
          <Earring x={-0.75} />
          <Earring x={0.75} />
        </group>
      )}
      {form === 'Axolotl' && <GlbModel url="/model/Axolotl.glb" form="Axolotl" size={2.5} />}
    </Fragment>
  );
}
