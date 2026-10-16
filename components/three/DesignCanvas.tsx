"use client";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import Jewelry from './Jewelry';
import { registerSnapshot } from './snapshot';
import { useConfigurator } from '@/store/configurator';

const VIEW_POS = { free: [0, 0.5, 6], side: [6, 0, 0], back: [0, 0.3, -6], top: [0, 6, 0.001] } as const;

function Rig() {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as unknown as { target: THREE.Vector3; update: () => void } | null;
  const nonce = useConfigurator((s) => s.viewNonce);
  const view = useConfigurator((s) => s.viewPreset);

  useEffect(() => {
    if (nonce === 0) return;
    const [x, y, z] = VIEW_POS[view];
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.update();
    }
  }, [nonce, view, camera, controls]);
  return null;
}

function Snapshot() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    registerSnapshot(() => {
      gl.render(scene, camera);
      const src = gl.domElement;
      const w = 360;
      const h = Math.max(1, Math.round((src.height * w) / src.width));
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d');
      if (!ctx) return null;
      ctx.fillStyle = '#050506';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(src, 0, 0, w, h);
      return c.toDataURL('image/jpeg', 0.82);
    });
    return () => registerSnapshot(null);
  }, [gl, scene, camera]);
  return null;
}

function Model() {
  const form = useConfigurator((s) => s.form);
  const view = useConfigurator((s) => s.viewPreset);
  const g = useRef<THREE.Group>(null);
  // แกว่งเบาๆ ให้ดูมีชีวิต (หยุดเมื่อผู้ใช้เลือกมุมมองเอง)
  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.elapsedTime;
    g.current.rotation.y = view === 'free' ? Math.sin(t * 0.55) * 0.42 : 0;
    g.current.position.y = Math.sin(t * 1.1) * 0.05;
  });
  return (
    <group ref={g}>
      <Jewelry key={form} form={form} />
    </group>
  );
}

export default function DesignCanvas({ className = '' }: { className?: string }) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas camera={{ position: [0, 0.5, 6], fov: 40 }} dpr={[1, 2]} gl={{ preserveDrawingBuffer: true, antialias: true }}>
        <ambientLight intensity={0.26} />
        <directionalLight position={[3, 5, 5]} intensity={0.4} />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={6} position={[0, 6, 2]} scale={[14, 3, 1]} />
          <Lightformer form="rect" intensity={1.6} position={[0, 0.5, 7]} scale={[9, 5, 1]} />
          <Lightformer form="rect" intensity={3} position={[-4, 1, 6]} scale={[6, 6, 1]} />
          <Lightformer form="rect" intensity={3} position={[4, 1, 6]} scale={[6, 6, 1]} />
          <Lightformer form="rect" color="#b6ff00" intensity={3.5} position={[-6, 0, 0]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
          <Lightformer form="rect" color="#ff2ba6" intensity={3.5} position={[6, 0, 0]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} />
          <Lightformer form="rect" color="#2d6bff" intensity={3} position={[0, -4, -3]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
          <Lightformer form="rect" intensity={2.5} position={[0, 1, -7]} scale={[12, 5, 1]} />
        </Environment>
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <ContactShadows position={[0, -2.1, 0]} opacity={0.55} scale={12} blur={2.6} far={4} color="#000000" />
        <OrbitControls makeDefault enablePan={false} minDistance={3} maxDistance={10} />
        <Rig />
        <Snapshot />
      </Canvas>
    </div>
  );
}
