"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Banknote, CreditCard, QrCode, Wallet } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useOrderStore, type Customer } from '@/store/order';
import { useHydrated } from '@/lib/useHydrated';
import { getModelName } from '@/lib/catalog';

const PAYMENTS = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'promptpay', label: 'PromptPay', icon: QrCode },
  { id: 'bank', label: 'Bank Transfer', icon: Banknote },
  { id: 'wallet', label: 'TrueMoney / Wallet', icon: Wallet },
];

const APPROVALS = [
  'ตรวจสอบแบบและวัสดุที่เลือกแล้ว',
  'ยอมรับระยะเวลาผลิต 7–14 วัน',
  'เข้าใจว่าเป็นสินค้าสั่งทำเฉพาะ ไม่สามารถเปลี่ยนแบบหลังเริ่มผลิต',
];

export default function CheckoutPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { items, specialRequest, clearCart } = useCartStore();
  const placeOrder = useOrderStore((s) => s.placeOrder);

  const [form, setForm] = useState<Customer>({ fullName: '', phone: '', email: '', address: '' });
  const [payment, setPayment] = useState('promptpay');
  const [approved, setApproved] = useState<boolean[]>(APPROVALS.map(() => false));

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const allApproved = approved.every(Boolean);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allApproved || items.length === 0) return;
    // ยังไม่มี backend : เก็บคำสั่งซื้อไว้ในเบราว์เซอร์เพื่อแสดงหน้า Confirmation / Tracking
    placeOrder({
      items,
      total,
      customer: form,
      payment: PAYMENTS.find((p) => p.id === payment)?.label ?? payment,
      specialRequest,
    });
    clearCart();
    router.push('/order/confirmation');
  };

  if (!hydrated) return <div className="min-h-[60vh]" />;

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="mb-6 text-mist">ไม่มีสินค้าในตะกร้า</p>
        <Link href="/custom" className="btn-neon">ไปออกแบบชิ้นงาน</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/cart" className="mb-6 inline-flex items-center gap-2 text-sm text-mist hover:text-neon"><ArrowLeft className="h-4 w-4" /> กลับไปตะกร้า</Link>
      <h1 className="mb-8 font-graffiti text-3xl">COMPLETE <span className="text-neon">YOUR ORDER</span></h1>

      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <fieldset className="card space-y-4 p-6">
            <legend className="px-2 text-xs tracking-widest text-neon">1 · CONTACT &amp; 2 · SHIPPING</legend>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm"><span className="mb-1 block text-mist">ชื่อ-นามสกุล *</span><input required name="fullName" value={form.fullName} onChange={onChange} className="field" autoComplete="name" /></label>
              <label className="text-sm"><span className="mb-1 block text-mist">เบอร์โทรศัพท์ *</span><input required type="tel" name="phone" value={form.phone} onChange={onChange} className="field" autoComplete="tel" /></label>
            </div>
            <label className="block text-sm"><span className="mb-1 block text-mist">อีเมล</span><input type="email" name="email" value={form.email} onChange={onChange} className="field" autoComplete="email" /></label>
            <label className="block text-sm"><span className="mb-1 block text-mist">ที่อยู่จัดส่ง *</span><textarea required name="address" value={form.address} onChange={onChange} rows={3} className="field resize-none" autoComplete="street-address" /></label>
          </fieldset>

          <fieldset className="card p-6">
            <legend className="px-2 text-xs tracking-widest text-neon">3 · PAYMENT</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {PAYMENTS.map(({ id, label, icon: Icon }) => (
                <label key={id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm ${payment === id ? 'border-neon text-neon' : 'border-line text-mist'}`}>
                  <input type="radio" name="payment" value={id} checked={payment === id} onChange={() => setPayment(id)} className="sr-only" />
                  <Icon className="h-5 w-5" /> {label}
                </label>
              ))}
            </div>
            <p className="mt-3 text-xs text-mist">เลือกวิธีชำระเงินเพื่อบันทึกในคำสั่งซื้อ ระบบชำระเงินจริงยังไม่เชื่อมต่อ</p>
          </fieldset>
        </div>

        <aside className="space-y-6">
          <div className="card p-6">
            <h2 className="mb-4 text-xs tracking-widest text-neon">4 · PRODUCTION</h2>
            <ul className="space-y-2 text-sm">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between gap-3">
                  <span>{getModelName(i.model)} × {i.quantity}</span>
                  <span className="text-mist">฿{(i.price * i.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-mist">ระยะเวลาผลิต 7–14 วัน · ค่าจัดส่งคำนวณภายหลัง</p>
            <div className="mt-4 flex items-end justify-between border-t border-line pt-3">
              <span className="font-bold">TOTAL</span><span className="text-2xl font-bold text-neon">฿{total.toLocaleString()}</span>
            </div>
          </div>

          <div className="card space-y-3 p-6">
            <h2 className="text-xs tracking-widest text-neon">FINAL APPROVAL</h2>
            {APPROVALS.map((t, idx) => (
              <label key={t} className="flex items-start gap-2 text-sm text-mist">
                <input type="checkbox" checked={approved[idx]} onChange={(e) => setApproved(approved.map((v, j) => (j === idx ? e.target.checked : v)))} className="mt-1 accent-[#b6ff00]" />
                {t}
              </label>
            ))}
            <button type="submit" disabled={!allApproved} className="btn-neon w-full">CREATE MY PIECE</button>
          </div>
        </aside>
      </form>
    </main>
  );
}
