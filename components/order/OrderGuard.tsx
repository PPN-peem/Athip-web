"use client";
import { useOrderStore, type Order } from '@/store/order';
import { useHydrated } from '@/lib/useHydrated';
import BrushButton from '@/components/ui/BrushButton';

// แสดงหน้าเฉพาะเมื่อมีคำสั่งซื้อล่าสุดในเบราว์เซอร์นี้ (เก็บใน localStorage)
export default function OrderGuard({ children }: { children: (order: Order) => React.ReactNode }) {
  const order = useOrderStore((s) => s.lastOrder);
  const hydrated = useHydrated();
  if (!hydrated) return <div className="min-h-[60vh]" />;
  if (!order) {
    return (
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="mb-6 text-mist">ไม่พบคำสั่งซื้อล่าสุดในเบราว์เซอร์นี้</p>
        <BrushButton href="/custom">ENTER THE LAB</BrushButton>
      </main>
    );
  }
  return <>{children(order)}</>;
}
