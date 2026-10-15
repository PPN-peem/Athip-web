import { create } from 'zustand';

// โครงสร้างข้อมูลสินค้า 1 ชิ้นในตะกร้า
export interface CartItem {
  id: string;
  model: string;
  color: string;
  material?: string; // ชื่อวัสดุที่แสดงผล
  pattern: string | null;
  pieceId?: string;
  signature?: string;
  price: number;
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

  addToCart: (item) =>
    set((state) => ({
      items: [...state.items, { ...item, id: crypto.randomUUID().slice(0, 8) }],
    })),

  removeFromCart: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i)),
    })),

  setSpecialRequest: (specialRequest) => set({ specialRequest }),

  clearCart: () => set({ items: [], specialRequest: '' }),
}));
