// ข้อมูลกลางของสินค้า วัสดุ สี และลาย ใช้ร่วมกันทุกหน้า (เดิมซ้ำกันอยู่ 3 ไฟล์)
export const MODELS = [
  { name: 'แก้วไม้', file: '/models/1.glb' },
  { name: 'กล่องไม้', file: '/models/2.glb' },
  { name: 'ต้าวหลาม', file: '/models/3.glb' },
  { name: 'หลามน้อย', file: '/models/4.glb' },
  { name: 'หน้ากาก', file: '/models/mask.glb' },
] as const;

export interface Material {
  id: string;
  name: string;
  color: string;
  metalness: number;
  roughness: number;
}

export const MATERIALS: Material[] = [
  { id: 'silver', name: 'SILVER', color: '#d4d7dc', metalness: 0.9, roughness: 0.25 },
  { id: 'black', name: 'BLACK', color: '#111111', metalness: 0.6, roughness: 0.35 },
  { id: 'gold', name: 'GOLD', color: '#d4af37', metalness: 0.9, roughness: 0.3 },
  { id: 'gunmetal', name: 'GUNMETAL', color: '#4b5058', metalness: 0.85, roughness: 0.35 },
  { id: 'custom', name: 'CUSTOM COLOR', color: '#b6ff00', metalness: 0.1, roughness: 0.6 },
];

export const PATTERNS = [
  { name: 'สีพื้น (ไม่มีลาย)', file: null },
  { name: 'ลายมาสก์ 1', file: '/patterns/mask1.png' },
  { name: 'ลายมาสก์ 2', file: '/patterns/mask2.png' },
] as const;

export const BASE_PRICE = 590;

export function getModelName(path: string): string {
  return MODELS.find((m) => m.file === path)?.name ?? 'สินค้าสั่งทำพิเศษ';
}

export function getMaterialName(id: string | undefined, hex: string): string {
  if (id === 'custom') return `CUSTOM ${hex.toUpperCase()}`;
  return MATERIALS.find((m) => m.id === id)?.name ?? hex.toUpperCase();
}
