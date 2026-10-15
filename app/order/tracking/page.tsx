"use client";
import Link from 'next/link';
import OrderGuard from '@/components/order/OrderGuard';

// ยังไม่มี backend : แสดงเฉพาะสถานะที่เกิดขึ้นจริงแล้ว (สั่งซื้อ / ล็อกแบบ) ที่เหลือรออัปเดตจากระบบหลังบ้าน
const STATUS = ['Order Confirmed', 'Design Locked', 'In Production', 'Quality Check', 'Shipping', 'Delivered'];
const DONE = 2;

export default function TrackingPage() {
  return (
    <OrderGuard>
      {(order) => (
        <main className="mx-auto max-w-3xl px-4 py-12">
          <p className="text-xs tracking-widest text-mist">ORDER TRACKING</p>
          <h1 className="font-graffiti text-3xl text-neon">{order.id}</h1>
          <p className="mt-1 text-sm text-mist">สั่งเมื่อ {new Date(order.createdAt).toLocaleString('th-TH')} · ผู้รับ {order.customer.fullName}</p>

          <ol className="card mt-8 space-y-5 p-6">
            {STATUS.map((s, i) => (
              <li key={s} className="flex items-center gap-4">
                <span className={`h-4 w-4 rounded-full border ${i < DONE ? 'border-neon bg-neon' : i === DONE ? 'border-pink' : 'border-line'}`} aria-hidden />
                <span className={i < DONE ? 'text-white' : i === DONE ? 'text-pink' : 'text-mist'}>{s}</span>
                <span className="sr-only">{i < DONE ? 'เสร็จสิ้น' : i === DONE ? 'ขั้นตอนถัดไป' : 'รอดำเนินการ'}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-mist">สถานะหลังจากนี้จะอัปเดตเมื่อเชื่อมต่อระบบหลังบ้าน</p>
          <Link href="/custom" className="btn-ghost mt-8">ออกแบบชิ้นงานใหม่</Link>
        </main>
      )}
    </OrderGuard>
  );
}
