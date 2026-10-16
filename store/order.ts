import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from './cart';

export interface Customer {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  province: string;
  district: string;
  postcode: string;
}

export interface Order {
  id: string;
  createdAt: number;
  items: CartItem[];
  total: number;
  customer: Customer;
  payment: string;
  specialRequest: string;
}

interface OrderStore {
  lastOrder: Order | null;
  placeOrder: (data: Omit<Order, 'id' | 'createdAt'>) => void;
}

// เก็บคำสั่งซื้อล่าสุดใน localStorage (ยังไม่มี backend) เพื่อให้หน้า Confirmation / Tracking รีเฟรชแล้วไม่หาย
export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      lastOrder: null,
      placeOrder: (data) =>
        set({ lastOrder: { ...data, id: `ATHIP-${Date.now().toString(36).toUpperCase().slice(-6)}`, createdAt: Date.now() } }),
    }),
    { name: 'athip-last-order' },
  ),
);
