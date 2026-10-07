import { create } from 'zustand';

// โครงสร้างข้อมูลสินค้า 1 ชิ้นในตะกร้า
export interface CartItem {
  id: string;
  model: string;
  color: string;
  pattern: string | null;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  
  // เพิ่มสินค้าลงตะกร้า
  addToCart: (item) => set((state) => {
    // สร้างรหัสสินค้าแบบสุ่มง่ายๆ
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
    return { items: [...state.items, newItem] };
  }),
  
  // ลบสินค้าออกจากตะกร้า
  removeFromCart: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),
  
  // อัปเดตจำนวนสินค้า
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((item) => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),
  
  // ล้างตะกร้า
  clearCart: () => set({ items: [] })
}));