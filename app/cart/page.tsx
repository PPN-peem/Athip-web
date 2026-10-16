"use client";
import Image from 'next/image';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import BrushButton from '@/components/ui/BrushButton';
import { Slash, Sparkle } from '@/components/decor/Graffiti';
import { cartTotals, itemTotal, useCartStore } from '@/store/cart';
import { useHydrated } from '@/lib/useHydrated';
import { formatBaht, getForm } from '@/lib/catalog';

export default function CartPage() {
  const { items, specialRequest, removeFromCart, updateQuantity, setSpecialRequest } = useCartStore();
  const hydrated = useHydrated();
  if (!hydrated) return <div className="min-h-[60vh]" />;
  const t = cartTotals(items);

  return (
    <main className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Sparkle color="#b6ff00" size={26} className="right-4 top-10" />
      <Slash color="#ff2ba6" className="-bottom-2 right-6 opacity-80" />

      {items.length === 0 ? (
        <div className="panel enter p-14 text-center">
          <ShoppingBag className="mx-auto mb-4 h-14 w-14 text-line" />
          <p className="mb-8 text-mist">ตะกร้าของคุณยังว่างอยู่</p>
          <BrushButton href="/custom">ENTER THE LAB</BrushButton>
        </div>
      ) : (
        <div className="panel enter space-y-6 p-6 sm:p-8">
          <h1 className="border-b border-line pb-3 text-sm font-medium tracking-[0.2em]">YOUR CREATION</h1>

          <ul className="space-y-4">
            {items.map((i, n) => (
              <li key={i.id} className="tile enter flex flex-col gap-4 p-4 sm:flex-row" style={{ ['--i' as string]: n }}>
                <div className="relative h-28 w-full flex-none overflow-hidden rounded-lg border border-line bg-black sm:w-28">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {i.thumb ? <img src={i.thumb} alt={`ชิ้นงาน ${i.pieceId}`} className="h-full w-full object-cover" /> : <Image src={getForm(i.form).img} alt="" fill sizes="112px" className="object-cover" />}
                </div>
                <div className="flex flex-1 flex-col justify-between gap-3">
                  <div className="flex justify-between gap-3">
                    <div className="text-sm">
                      <p className="font-medium">ATHIP 475 · {i.formName}</p>
                      <p className="neon-text">{i.pieceId}</p>
                      <p className="text-xs text-sky">{i.colorLabel}</p>
                      <p className="text-xs text-sky">Size : {i.size}{i.signature && ` · “${i.signature}”`}</p>
                    </div>
                    <p className="text-lg font-medium">{formatBaht(itemTotal(i))}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center overflow-hidden rounded-lg border border-[#343c44]">
                      <button type="button" aria-label="ลดจำนวน" onClick={() => updateQuantity(i.id, i.quantity - 1)} className="px-3 py-1.5 hover:bg-white/10"><Minus className="h-4 w-4" /></button>
                      <span className="w-8 text-center text-sm">{i.quantity}</span>
                      <button type="button" aria-label="เพิ่มจำนวน" onClick={() => updateQuantity(i.id, i.quantity + 1)} className="px-3 py-1.5 hover:bg-white/10"><Plus className="h-4 w-4" /></button>
                    </div>
                    <button type="button" aria-label="ลบสินค้า" onClick={() => removeFromCart(i.id)} className="p-2 text-mist hover:text-pink"><Trash2 className="h-5 w-5" /></button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <p className="mb-2 text-xs font-medium tracking-[0.2em]">SPECIAL REQUEST</p>
            <div className="relative">
              <textarea className="field min-h-24 resize-none" value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} aria-label="คำขอพิเศษ" placeholder="ระบุรายละเอียดเพิ่มเติม เช่น อยากได้โทนสีเข้มขึ้น / หรือปรับตำแหน่งลาย" />
              <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-mist">(Optional)</span>
            </div>
          </div>

          <dl className="space-y-2 text-sm">
            <div className="flex justify-between text-sky"><dt>Base Price</dt><dd>{formatBaht(t.base)}</dd></div>
            <div className="flex justify-between text-sky"><dt>Custom Fee</dt><dd>{formatBaht(t.fee)}</dd></div>
            <div className="flex justify-between text-sky"><dt>Shipping (จัดส่งแบบ EMS)</dt><dd>{formatBaht(t.shipping)}</dd></div>
            <div className="flex items-end justify-between border-t border-line pt-3"><dt className="text-lg">Total</dt><dd className="text-3xl font-medium">{formatBaht(t.total)}</dd></div>
          </dl>

          <BrushButton href="/checkout" className="w-full">CHECKOUT →</BrushButton>
        </div>
      )}
    </main>
  );
}
