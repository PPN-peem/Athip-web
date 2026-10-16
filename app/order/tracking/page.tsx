"use client";
import Image from 'next/image';
import { Check } from 'lucide-react';
import OrderGuard from '@/components/order/OrderGuard';
import { Sparkle } from '@/components/decor/Graffiti';

// ยังไม่มี backend : แสดงเฉพาะสถานะที่เกิดขึ้นจริง (สั่งซื้อ / ล็อกแบบ) ที่เหลือรออัปเดตจากระบบหลังบ้าน
const STATUS = ['Order Confirmed', 'Design Locked', 'In Production', 'Quality Check', 'Shipping', 'Delivered'];
const DONE = 2;
const fmt = (t: number) => new Date(t).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export default function TrackingPage() {
  return (
    <OrderGuard>
      {(order) => (
        <main className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <Sparkle color="#7cc4ff" size={26} className="right-6 top-6" />
          <div className="panel grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_1.1fr]">
            <section>
              <h1 className="text-2xl font-light tracking-wide">{order.items[0]?.pieceId ?? order.id}</h1>
              <p className="mt-1 text-xs text-sky">Placed on {fmt(order.createdAt)} · {order.id}</p>
              <ol className="mt-8 space-y-6 border-l border-dashed border-[#3a434b] pl-7">
                {STATUS.map((s, i) => (
                  <li key={s} className="enter relative" style={{ ['--i' as string]: i }}>
                    <span className={`absolute -left-[2.35rem] grid h-6 w-6 place-items-center rounded-full border ${i < DONE ? 'border-neon bg-neon text-black' : i === DONE ? 'dot-active border-white bg-black' : 'border-[#3a434b] bg-black'}`}>
                      {i < DONE && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <p className={i <= DONE ? 'text-white' : 'text-[#5d6770]'}>{s}</p>
                    {i < DONE && <p className="text-xs text-sky">{fmt(order.createdAt)}</p>}
                    {i === DONE && <p className="text-xs text-mist">ขั้นตอนถัดไป</p>}
                  </li>
                ))}
              </ol>
            </section>

            <section className="space-y-4">
              <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-line">
                <Image src="/art/production.jpg" alt="ภาพตัวอย่างขั้นตอนผลิต" fill sizes="(min-width:768px) 400px, 100vw" className="object-cover" />
              </div>
              <div className="tile p-4">
                <p className="text-xs font-medium tracking-[0.2em] text-sky">PRODUCTION UPDATE</p>
                <p className="mt-2 text-sm text-mist">ชิ้นงานของคุณอยู่ในคิวรอผลิต เมื่อเริ่มผลิตเราจะอัปเดตสถานะในหน้านี้</p>
              </div>
            </section>
          </div>
        </main>
      )}
    </OrderGuard>
  );
}
