import { create } from 'zustand';
import { MATERIALS, type Material } from '@/lib/catalog';

export type ViewPreset = 'free' | 'side' | 'back' | 'top';

interface ConfiguratorState {
  selectedModel: string;
  selectedMaterial: string; // id ของ MATERIALS
  selectedColor: string;
  metalness: number;
  roughness: number;
  selectedPattern: string | null;
  modelScale: number;
  patternScale: number;
  patternRotation: number;
  patternOffsetX: number;
  patternOffsetY: number;
  patternOpacity: number; // 0 - 1
  viewPreset: ViewPreset;
  viewNonce: number; // เพิ่มทุกครั้งที่กดมุมมอง เพื่อให้กดซ้ำมุมเดิมได้
  pieceId: string;
  signature: string;
  setModel: (model: string) => void;
  setMaterial: (m: Material) => void;
  setColor: (color: string) => void;
  setPattern: (pattern: string | null) => void;
  setModelScale: (scale: number) => void;
  setPatternScale: (scale: number) => void;
  setPatternRotation: (rotation: number) => void;
  setPatternOffset: (x: number, y: number) => void;
  setPatternOpacity: (opacity: number) => void;
  setView: (view: ViewPreset) => void;
  setSignature: (s: string) => void;
  ensurePieceId: () => void;
  randomize: () => void;
  resetDesign: () => void;
}

const defaultMaterial = MATERIALS[0];

const designDefaults = {
  selectedMaterial: defaultMaterial.id,
  selectedColor: defaultMaterial.color,
  metalness: defaultMaterial.metalness,
  roughness: defaultMaterial.roughness,
  selectedPattern: null as string | null,
  modelScale: 4,
  patternScale: 1,
  patternRotation: 0,
  patternOffsetX: 0,
  patternOffsetY: 0,
  patternOpacity: 1,
  viewPreset: 'free' as ViewPreset,
  viewNonce: 0,
  pieceId: '',
  signature: '',
};

const rand = (min: number, max: number) => Math.round((Math.random() * (max - min) + min) * 100) / 100;

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  selectedModel: '/models/mask.glb',
  ...designDefaults,
  modelScale: 5.0,

  // เปลี่ยนรูปทรง = เริ่มออกแบบใหม่ (พฤติกรรมเดิมของเว็บ)
  setModel: (model) => set({ ...designDefaults, selectedModel: model }),
  setMaterial: (m) =>
    set((s) => ({
      selectedMaterial: m.id,
      // วัสดุ custom คงสีที่ผู้ใช้เลือกไว้ล่าสุด
      selectedColor: m.id === 'custom' && s.selectedMaterial === 'custom' ? s.selectedColor : m.color,
      metalness: m.metalness,
      roughness: m.roughness,
    })),
  setColor: (color) => {
    const custom = MATERIALS.find((m) => m.id === 'custom')!;
    set({ selectedMaterial: 'custom', selectedColor: color, metalness: custom.metalness, roughness: custom.roughness });
  },
  setPattern: (pattern) =>
    set({ selectedPattern: pattern, patternScale: 1, patternRotation: 0, patternOffsetX: 0, patternOffsetY: 0, patternOpacity: 1 }),

  setModelScale: (scale) => set({ modelScale: scale }),
  setPatternScale: (scale) => set({ patternScale: scale }),
  setPatternRotation: (rotation) => set({ patternRotation: rotation }),
  setPatternOffset: (x, y) => set({ patternOffsetX: x, patternOffsetY: y }),
  setPatternOpacity: (opacity) => set({ patternOpacity: Math.min(1, Math.max(0, opacity)) }),
  setView: (view) => set((s) => ({ viewPreset: view, viewNonce: s.viewNonce + 1 })),
  setSignature: (signature) => set({ signature: signature.slice(0, 24) }),

  // รหัสชิ้นงาน CUSTOM-0000 สร้างครั้งเดียวตอนเข้าขั้นตอน Signature
  ensurePieceId: () => {
    if (get().pieceId) return;
    set({ pieceId: `CUSTOM-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}` });
  },

  // ปุ่ม CHAOS : สุ่มค่าลาย
  randomize: () =>
    set({
      patternScale: rand(0.4, 3),
      patternRotation: rand(-180, 180),
      patternOffsetX: rand(-1.5, 1.5),
      patternOffsetY: rand(-1.5, 1.5),
      patternOpacity: rand(0.6, 1),
    }),

  resetDesign: () => set({ ...designDefaults, selectedModel: get().selectedModel }),
}));
