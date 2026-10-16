import { create } from 'zustand';

export interface CartItem {
  id: string;
  pieceId: string;
  form: string; // FormId
  formName: string;
  materialName: string;
  colorLabel: string; // เช่น "Black / Neon Green / Pink / Blue"
  graffiti: string; // ชื่อลาย หรือ "-"
  size: string; // เช่น "15 mm"
  signature?: string;
  thumb?: string; // ภาพ snapshot ขนาดเล็ก (data URL)
  basePrice: number;
  customFee: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  specialRequest: string;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  setSpecialRequest: (text: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  specialRequest: '',
  addToCart: (item) => set((s) => ({ items: [...s.items, { ...item, id: crypto.randomUUID().slice(0, 8) }] })),
  removeFromCart: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)) })),
  setSpecialRequest: (specialRequest) => set({ specialRequest }),
  clearCart: () => set({ items: [], specialRequest: '' }),
}));

export const SHIPPING_FEE = 0; // ส่ง EMS ฟรีตามแบบ
export const itemTotal = (i: CartItem) => (i.basePrice + i.customFee) * i.quantity;
export const cartTotals = (items: CartItem[]) => {
  const base = items.reduce((n, i) => n + i.basePrice * i.quantity, 0);
  const fee = items.reduce((n, i) => n + i.customFee * i.quantity, 0);
  return { base, fee, shipping: items.length ? SHIPPING_FEE : 0, total: base + fee + (items.length ? SHIPPING_FEE : 0) };
};
