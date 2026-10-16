// ข้อมูลกลางของร้าน ATHIP 475 : รูปทรง วัสดุ ลาย พรีเซ็ต ราคา (แก้ที่ไฟล์นี้ที่เดียว)

export type FormId = 'ring' | 'pendant' | 'charm' | 'bracelet' | 'earring';
export type LayerKey = 'graffiti' | 'symbol' | 'text';
export type PatternCategory = 'flame' | 'thai' | 'symbol' | 'animal';

export interface FormDef {
  id: FormId;
  name: string;
  price: number;
  img: string;
  unit: 'mm' | 'cm';
  sizes: number[];
  defaultSize: number;
}

export const FORMS: FormDef[] = [
  { id: 'ring', name: 'RING', price: 2500, img: '/art/forms/ring.jpg', unit: 'mm', sizes: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22], defaultSize: 15 },
  { id: 'pendant', name: 'PENDANT', price: 2900, img: '/art/forms/pendant.jpg', unit: 'mm', sizes: [20, 25, 30, 35, 40], defaultSize: 25 },
  { id: 'charm', name: 'CHARM', price: 1800, img: '/art/forms/charm.jpg', unit: 'mm', sizes: [15, 20, 25, 30], defaultSize: 20 },
  { id: 'bracelet', name: 'BRACELET', price: 3900, img: '/art/forms/bracelet.jpg', unit: 'cm', sizes: [15, 16, 17, 18, 19, 20], defaultSize: 17 },
  { id: 'earring', name: 'EARRING', price: 2200, img: '/art/forms/earring.jpg', unit: 'mm', sizes: [15, 20, 25, 30], defaultSize: 20 },
];

export const CUSTOM_FORM = { name: 'CUSTOM FORM', img: '/art/forms/custom.jpg', href: '/contact-us' };

export const CUSTOM_FEE = 800; // ค่าลายและงานสั่งทำ (คิดเมื่อมีลาย/ข้อความ/สีเอง)

export interface Material {
  id: string;
  name: string;
  color: string;
  metalness: number;
  roughness: number;
  swatch: string; // CSS background ของวงกลมตัวอย่าง
}

export const MATERIALS: Material[] = [
  { id: 'silver', name: 'SILVER', color: '#d6d9de', metalness: 1, roughness: 0.18, swatch: 'radial-gradient(circle at 30% 28%,#fff,#b9bec6 45%,#4b5057)' },
  { id: 'black', name: 'BLACK', color: '#161616', metalness: 0.9, roughness: 0.28, swatch: 'radial-gradient(circle at 30% 28%,#9aa0a8,#2a2d31 50%,#050505)' },
  { id: 'gold', name: 'GOLD', color: '#e0b43c', metalness: 1, roughness: 0.2, swatch: 'radial-gradient(circle at 30% 28%,#fff1b0,#d9a826 50%,#6b4a05)' },
  { id: 'gunmetal', name: 'GUNMETAL', color: '#5a6068', metalness: 1, roughness: 0.3, swatch: 'radial-gradient(circle at 30% 28%,#c9cdd3,#5a6068 50%,#1c1e21)' },
  { id: 'custom', name: 'CUSTOM COLOR', color: '#b6ff00', metalness: 0.55, roughness: 0.3, swatch: 'conic-gradient(#b6ff00,#ff2ba6,#2d6bff,#00e5ff,#b6ff00)' },
];

export interface PatternDef {
  id: string;
  name: string;
  file: string;
  category: PatternCategory;
  layer: Exclude<LayerKey, 'text'>;
  colors: string;
}

const P = (n: number, name: string, category: PatternCategory, colors: string): PatternDef => ({
  id: `p${String(n).padStart(2, '0')}`,
  name,
  file: `/art/patterns/p${String(n).padStart(2, '0')}.png`,
  category,
  layer: category === 'symbol' ? 'symbol' : 'graffiti',
  colors,
});

export const PATTERNS: PatternDef[] = [
  P(1, 'Flame #01', 'flame', 'Neon Pink'),
  P(2, 'Star #02', 'symbol', 'White'),
  P(3, 'Thai Tag #03', 'thai', 'White'),
  P(4, 'Naga #04', 'animal', 'White'),
  P(5, 'Star #05', 'symbol', 'White'),
  P(6, 'Scribble #06', 'flame', 'White / Blue'),
  P(7, 'Serpent #07', 'animal', 'White'),
  P(8, 'Star #08', 'symbol', 'White'),
  P(9, 'Sigil #09', 'symbol', 'White'),
  P(10, 'Flame #10', 'flame', 'Neon Green'),
  P(11, 'Thai Tag #11', 'thai', 'White'),
  P(12, 'Thai Tag #12', 'thai', 'White'),
];

export const PATTERN_FILTERS: { id: 'all' | PatternCategory; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'flame', label: 'FLAME' },
  { id: 'thai', label: 'THAI' },
  { id: 'symbol', label: 'SYMBOL' },
  { id: 'animal', label: 'ANIMAL' },
];

export interface Preset {
  id: string;
  name: string;
  img: string;
  material: string;
  graffiti?: string;
  symbol?: string;
}

// ชุดสไตล์สำเร็จรูป (แถบรูปด้านล่างของขั้น 02)
export const PRESETS: Preset[] = [
  { id: 's1', name: 'STREET', img: '/art/presets/s1.jpg', material: 'black', graffiti: 'p10' },
  { id: 's2', name: 'MU', img: '/art/presets/s2.jpg', material: 'silver', symbol: 'p05' },
  { id: 's3', name: 'THAI', img: '/art/presets/s3.jpg', material: 'gold', graffiti: 'p03' },
  { id: 's4', name: 'FLAME', img: '/art/presets/s4.jpg', material: 'gunmetal', graffiti: 'p01', symbol: 'p02' },
];

export const INK_COLORS = ['#b6ff00', '#ff2ba6', '#2d6bff', '#bdbdbd', '#ffffff'];

export const PROVINCES = [
  'กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พะเยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยโสธร', 'ยะลา', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อำนาจเจริญ', 'อุดรธานี', 'อุตรดิตถ์', 'อุทัยธานี', 'อุบลราชธานี',
];

export const formatBaht = (n: number) => `฿${n.toLocaleString('en-US')}`;
export const getForm = (id: string) => FORMS.find((f) => f.id === id) ?? FORMS[0];
export const getMaterial = (id: string) => MATERIALS.find((m) => m.id === id) ?? MATERIALS[0];
export const getPattern = (id: string | null | undefined) => PATTERNS.find((p) => p.id === id);
