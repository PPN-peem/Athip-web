"use client";
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useHydrated } from '@/lib/useHydrated';
import { getModelName } from '@/lib/catalog';

export default function CartPage() {
  const { items, specialRequest, removeFromCart, updateQuantity, setSpecialRequest } = useCartStore();
  const hydrated = useHydrated();

  const totalQty = items.reduce((n, i) => n + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (!hydrated) return <div className="min-h-[60vh]" />;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 flex items-center gap-3 font-graffiti text-3xl"><ShoppingBag className="h-8 w-8 text-neon" /> CART</h1>

      {items.length === 0 ? (
        <div className="card p-12 text-center">
          <ShoppingBag className="mx-auto mb-4 h-14 w-14 text-line" />
          <p className="mb-6 text-mist">ตะกร้าของคุณยังว่างอยู่</p>
          <Link href="/custom" className="btn-neon"><ArrowLeft className="h-5 w-5" /> ไปออกแบบชิ้นงาน</Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <p className="text-xs tracking-widest text-mist">YOUR CREATION</p>
            {items.map((item) => (
              <article key={item.id} className="card flex flex-col items-start gap-5 p-5 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-line bg-black">
                  <span className="h-10 w-10 rounded-full" style={{ background: item.color }} />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold">{getModelName(item.model)}</h2>
                  <p className="text-sm text-mist">
                    {item.pieceId && <span className="text-neon">{item.pieceId} · </span>}
                    {item.material ?? item.color} · {item.pattern ? 'มีลายกราฟฟิตี้' : 'สีพื้น'}
                    {item.signature && ` · “${item.signature}”`}
                  </p>
                  <p className="mt-1 font-bold text-neon">฿{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center overflow-hidden rounded-lg border border-line">
                    <button type="button" aria-label="ลดจำนวน" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-white/10">−</button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button type="button" aria-label="เพิ่มจำนวน" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-white/10">+</button>
                  </div>
                  <button type="button" aria-label="ลบสินค้า" onClick={() => removeFromCart(item.id)} className="p-2 text-pink hover:text-white"><Trash2 className="h-5 w-5" /></button>
                </div>
              </article>
            ))}

            <label className="block">
              <span className="mb-1 block text-xs tracking-widest text-mist">SPECIAL REQUEST (ไม่บังคับ)</span>
              <textarea className="field resize-none" rows={3} value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} placeholder="พิมพ์ข้อความถึงทีมผลิต" />
            </label>
          </div>

          <aside className="lg:col-span-1">
            <div className="card sticky top-24 p-6">
              <h2 className="mb-5 font-bold tracking-wider">ORDER SUMMARY</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-mist"><span>จำนวน</span><span>{totalQty} ชิ้น</span></div>
                <div className="flex justify-between text-mist"><span>ค่าจัดส่ง</span><span>คำนวณภายหลัง</span></div>
                <div className="flex items-end justify-between border-t border-line pt-3">
                  <span className="font-bold">TOTAL</span>
                  <span className="text-2xl font-bold text-neon">฿{total.toLocaleString()}</span>
                </div>
              </div>
              <Link href="/checkout" className="btn-neon mt-6 w-full">CHECKOUT <ArrowRight className="h-5 w-5" /></Link>
              <Link href="/custom" className="btn-ghost mt-3 w-full text-sm">ออกแบบชิ้นงานเพิ่ม</Link>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
