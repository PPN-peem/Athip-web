"use client";
import { Canvas, createPortal, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, useTexture, Center, Decal } from '@react-three/drei';
import { useConfiguratorStore } from '@/store/configurator';
import * as THREE from 'three';
import { Fragment, Suspense, useMemo, useLayoutEffect, useEffect } from 'react';

function CustomModel() {
  const {
    selectedModel, selectedColor, metalness, roughness, selectedPattern, modelScale,
    patternScale, patternRotation, patternOffsetX, patternOffsetY, patternOpacity,
  } = useConfiguratorStore();

  const { scene } = useGLTF(selectedModel);
  const texture = useTexture(selectedPattern || '/patterns/mask1.png');

  // 1. ดึงชิ้นส่วน 3D (Mesh) ทั้งหมดของโมเดลออกมา
  const meshes = useMemo(() => {
    const m: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) m.push(child);
    });
    return m;
  }, [scene]);

  // 2. ใส่วัสดุให้โมเดล (สี + ความเงา/โลหะ) และ dispose ตัวเก่าเพื่อไม่ให้หน่วยความจำรั่ว
  useLayoutEffect(() => {
    const materials = meshes.map((mesh) => {
      const mat = new THREE.MeshStandardMaterial({ color: selectedColor, metalness, roughness });
      mesh.material = mat;
      return mat;
    });
    return () => materials.forEach((m) => m.dispose());
  }, [meshes, selectedColor, metalness, roughness]);

  return (
    <Center>
      <primitive object={scene} scale={modelScale} />

      {/* 3. ฉายลายกราฟฟิตี้แปะทับลงบนโมเดล (ใส่ key ที่ portal เพื่อไม่ให้ React เตือน) */}
      {selectedPattern &&
        meshes.map((mesh, index) => (
          <Fragment key={index}>
            {createPortal(
              <Decal
                position={[patternOffsetX, patternOffsetY, 2]}
                rotation={[0, 0, -patternRotation * (Math.PI / 180)]}
                scale={[patternScale, patternScale, 5]}
              >
                <meshStandardMaterial
                  map={texture}
                  transparent
                  opacity={patternOpacity}
                  polygonOffset
                  polygonOffsetFactor={-1}
                />
              </Decal>,
              mesh,
            )}
          </Fragment>
        ))}
    </Center>
  );
}

// ปุ่ม SIDE / BACK / TOP : ย้ายกล้องไปมุมที่เลือก
const VIEW_POSITIONS = {
  free: [0, 0, 5],
  side: [5, 0, 0],
  back: [0, 0, -5],
  top: [0, 5, 0.001],
} as const;

function CameraRig() {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as unknown as { target: THREE.Vector3; update: () => void } | null;
  const view = useConfiguratorStore((s) => s.viewPreset);
  const nonce = useConfiguratorStore((s) => s.viewNonce);

  useEffect(() => {
    if (nonce === 0) return; // ไม่แตะกล้องตอนโหลดครั้งแรก
    const [x, y, z] = VIEW_POSITIONS[view];
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.update();
    }
  }, [view, nonce, camera, controls]);

  return null;
}

export default function ConfiguratorCanvas({ className = 'h-105 md:h-140' }: { className?: string }) {
  return (
    <div className={`blueprint relative w-full overflow-hidden rounded-xl border border-line ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <CustomModel />
        </Suspense>

        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
        <OrbitControls makeDefault enablePan enableZoom minDistance={2} maxDistance={10} />
        <CameraRig />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1.5 text-xs text-mist">
        ลากเพื่อหมุน · คลิกขวาเพื่อเลื่อน · สกรอลล์เพื่อซูม
      </p>
    </div>
  );
}
