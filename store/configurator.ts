import { create } from 'zustand';

interface ConfiguratorState {
  selectedModel: string; // เพิ่มตัวเก็บไฟล์โมเดล
  selectedColor: string;
  selectedPattern: string | null;
  modelScale: number;
  patternScale: number;
  patternRotation: number;
  patternOffsetX: number;
  patternOffsetY: number;
  setModel: (model: string) => void; // เพิ่มฟังก์ชันเปลี่ยนโมเดล
  setColor: (color: string) => void;
  setPattern: (pattern: string | null) => void;
  setModelScale: (scale: number) => void;
  setPatternScale: (scale: number) => void;
  setPatternRotation: (rotation: number) => void;
  setPatternOffset: (x: number, y: number) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  selectedModel: '/models/mask.glb', // ชื่อไฟล์โมเดลเริ่มต้น
  selectedColor: '#ffffff',
  selectedPattern: null,
  
  modelScale: 5.0, // ปรับให้เริ่มต้นโมเดลมีขนาดใหญ่ขึ้น
  patternScale: 1,
  patternRotation: 0,
  patternOffsetX: 0, // ค่า 0 คือให้อยู่ตรงกลาง (ด้านหน้า)
  patternOffsetY: 0, // ค่า 0 คือให้อยู่ตรงกลาง (ด้านหน้า)

  setModel: (model) => set({ selectedModel: model }),
  setColor: (color) => set({ selectedColor: color }),
  setPattern: (pattern) => set({ selectedPattern: pattern }),
  
  setModelScale: (scale) => set({ modelScale: scale }),
  setPatternScale: (scale) => set({ patternScale: scale }),
  setPatternRotation: (rotation) => set({ patternRotation: rotation }),
  setPatternOffset: (x, y) => set({ patternOffsetX: x, patternOffsetY: y }),
}));