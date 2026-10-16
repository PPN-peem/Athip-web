import { create } from 'zustand';
import { MATERIALS, getForm, getPattern, type FormId, type LayerKey, type Material, type Preset } from '@/lib/catalog';

export type ViewPreset = 'free' | 'side' | 'back' | 'top';
export type ActiveLayer = 'base' | LayerKey;

export interface Layer {
  src: string | null; // URL ของลาย (ไฟล์ในเว็บ / รูปอัปโหลด / ภาพวาด)
  name: string; // ชื่อที่แสดง
  scale: number; // %
  rotation: number; // องศา
  x: number; // -100..100
  y: number; // -100..100
  opacity: number; // 0..100
}

const newLayer = (): Layer => ({ src: null, name: '', scale: 70, rotation: 0, x: 0, y: 0, opacity: 100 });

interface State {
  form: FormId;
  size: number;
  material: string;
  color: string;
  metalness: number;
  roughness: number;
  layers: Record<LayerKey, Layer>;
  text: string;
  textColor: string;
  activeLayer: ActiveLayer;
  viewPreset: ViewPreset;
  viewNonce: number;
  pieceId: string;
  signature: string;

  setForm: (f: FormId) => void;
  setSize: (n: number) => void;
  setMaterial: (m: Material) => void;
  setColor: (hex: string) => void;
  setLayerSource: (key: Exclude<LayerKey, 'text'>, src: string | null, name?: string) => void;
  patchLayer: (key: LayerKey, patch: Partial<Layer>) => void;
  setText: (t: string) => void;
  setTextColor: (c: string) => void;
  setActiveLayer: (l: ActiveLayer) => void;
  applyPreset: (p: Preset) => void;
  setView: (v: ViewPreset) => void;
  setSignature: (s: string) => void;
  ensurePieceId: () => void;
  randomize: () => void;
  resetDesign: () => void;
}

const base = MATERIALS[0];
const initial = () => ({
  size: getForm('ring').defaultSize,
  material: base.id,
  color: base.color,
  metalness: base.metalness,
  roughness: base.roughness,
  layers: { graffiti: newLayer(), symbol: newLayer(), text: newLayer() },
  text: '',
  textColor: '#b6ff00',
  activeLayer: 'graffiti' as ActiveLayer,
  viewPreset: 'free' as ViewPreset,
  viewNonce: 0,
  pieceId: '',
  signature: '',
});

const rnd = (a: number, b: number) => Math.round(a + Math.random() * (b - a));

export const useConfigurator = create<State>((set, get) => ({
  form: 'ring',
  ...initial(),

  setForm: (form) => set({ ...initial(), form, size: getForm(form).defaultSize }),
  setSize: (size) => set({ size }),
  setMaterial: (m) =>
    set((s) => ({
      material: m.id,
      color: m.id === 'custom' && s.material === 'custom' ? s.color : m.color,
      metalness: m.metalness,
      roughness: m.roughness,
    })),
  setColor: (color) => {
    const m = MATERIALS.find((x) => x.id === 'custom')!;
    set({ material: 'custom', color, metalness: m.metalness, roughness: m.roughness });
  },
  setLayerSource: (key, src, name = '') =>
    set((s) => ({
      layers: { ...s.layers, [key]: src ? { ...newLayer(), src, name } : newLayer() },
      activeLayer: src ? key : s.activeLayer,
    })),
  patchLayer: (key, patch) => set((s) => ({ layers: { ...s.layers, [key]: { ...s.layers[key], ...patch } } })),
  setText: (text) =>
    set((s) => ({
      text: text.slice(0, 16),
      layers: { ...s.layers, text: s.layers.text.src || !text ? s.layers.text : { ...newLayer(), src: 'text', name: 'TEXT', scale: 60 } },
    })),
  setTextColor: (textColor) => set({ textColor }),
  setActiveLayer: (activeLayer) => set({ activeLayer }),
  applyPreset: (p) => {
    const m = MATERIALS.find((x) => x.id === p.material) ?? base;
    const g = getPattern(p.graffiti);
    const sy = getPattern(p.symbol);
    set((s) => ({
      material: m.id, color: m.color, metalness: m.metalness, roughness: m.roughness,
      layers: {
        ...s.layers,
        graffiti: g ? { ...newLayer(), src: g.file, name: g.name } : newLayer(),
        symbol: sy ? { ...newLayer(), src: sy.file, name: sy.name, scale: 45 } : newLayer(),
      },
    }));
  },
  setView: (viewPreset) => set((s) => ({ viewPreset, viewNonce: s.viewNonce + 1 })),
  setSignature: (signature) => set({ signature: signature.slice(0, 24) }),
  ensurePieceId: () => {
    if (get().pieceId) return;
    set({ pieceId: `CUSTOM-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}` });
  },
  // CHAOS : สุ่มตำแหน่ง/ขนาด/มุม/ความเข้มของทุกเลเยอร์ที่มีลาย
  randomize: () =>
    set((s) => {
      const layers = { ...s.layers };
      (Object.keys(layers) as LayerKey[]).forEach((k) => {
        if (layers[k].src) layers[k] = { ...layers[k], scale: rnd(35, 110), rotation: rnd(-180, 180), x: rnd(-45, 45), y: rnd(-45, 45), opacity: rnd(70, 100) };
      });
      return { layers };
    }),
  resetDesign: () => set((s) => ({ ...initial(), form: s.form, size: getForm(s.form).defaultSize })),
}));

