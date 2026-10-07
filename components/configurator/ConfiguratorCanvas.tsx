"use client";
import { Canvas, createPortal } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, useTexture, Center, Decal } from '@react-three/drei';
import { useConfiguratorStore } from '@/store/configurator';
import * as THREE from 'three';
import { Suspense, useMemo, useLayoutEffect } from 'react';

function CustomModel() {
  const { 
    selectedModel, 
    selectedColor, selectedPattern, modelScale, 
    patternScale, patternRotation, patternOffsetX, patternOffsetY 
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

  // 2. ทาสีพื้นฐานให้โมเดล 
  useLayoutEffect(() => {
    meshes.forEach((mesh) => {
      mesh.material = new THREE.MeshStandardMaterial({
        color: selectedColor,
        roughness: 0.6,
      });
    });
  }, [meshes, selectedColor]);

  return (
    <Center>
      {/* โหลดตัวโมเดล */}
      <primitive object={scene} scale={modelScale} />
      
      {/* 3. ฉายภาพ <Decal> แปะทับลงไปบนโมเดล */}
      {selectedPattern && meshes.map((mesh, index) => 
        createPortal(
          <Decal
            key={index}
            position={[patternOffsetX, patternOffsetY, 2]} 
            rotation={[0, 0, -patternRotation * (Math.PI / 180)]} 
            scale={[patternScale, patternScale, 5]} 
          >
            {/* นำการตั้งค่าลายและ PolygonOffset มาไว้ใน Material แทน */}
            <meshStandardMaterial 
              map={texture} 
              transparent={true} // ให้พื้นหลังของลายโปร่งใส
              polygonOffset={true}
              polygonOffsetFactor={-1}
            />
          </Decal>,
          mesh
        )
      )}
    </Center>
  );
}

export default function ConfiguratorCanvas() {
  return (
    <div className="blueprint relative h-105 w-full overflow-hidden rounded-2xl border border-ink/10 md:h-140">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <CustomModel />
        </Suspense>

        <ContactShadows position={[0, -2, 0]} opacity={0.45} scale={10} blur={2.5} far={4} />
        <OrbitControls enablePan={true} enableZoom minDistance={2} maxDistance={10} />
      </Canvas>
      <p className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1.5 text-xs text-ink/70">
        ซ้ายเพื่อหมุน / ขวาเพื่อเลื่อน / สกอร์ลเพื่อซูม
      </p>
    </div>
  );
}