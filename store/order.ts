import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from './cart';

export interface Customer {
  fullName: string;
  phone: string;
  email: string;
  address: string;
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

// เก็บคำสั่งซื้อล่าสุดไว้ใน localStorage เพื่อให้รีเฟรชหน้า Confirmation / Tracking แล้วข้อมูลไม่หาย
// (ยังไม่มี backend : ข้อมูลอยู่ในเบราว์เซอร์นี้เท่านั้น)
export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      lastOrder: null,
      placeOrder: (data) =>
        set({
          lastOrder: { ...data, id: `ATHIP-${Date.now().toString(36).toUpperCase().slice(-6)}`, createdAt: Date.now() },
        }),
    }),
    { name: 'athip-last-order' },
  ),
);
