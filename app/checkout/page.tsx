"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Banknote, CreditCard, QrCode, Timer, Wallet } from 'lucide-react';
import BrushButton from '@/components/ui/BrushButton';
import { Scrawl, Sparkle } from '@/components/decor/Graffiti';
import { cartTotals, useCartStore } from '@/store/cart';
import { useOrderStore, type Customer } from '@/store/order';
import { useHydrated } from '@/lib/useHydrated';
import { PROVINCES, formatBaht } from '@/lib/catalog';

const PAYMENTS = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'promptpay', label: 'PromptPay', icon: QrCode },
  { id: 'bank', label: 'Bank Transfer', icon: Banknote },
  { id: 'wallet', label: 'TrueMoney / Wallet', icon: Wallet },
];
const APPROVALS = ['ตรวจสอบแบบ', 'ตรวจสอบตำแหน่งลาย', 'ตรวจสอบขนาด', 'เข้าใจระยะเวลาผลิต'];

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <label className="block text-sm"><span className="mb-1 block text-xs text-sky">{label}{required && <span className="text-pink"> *</span>}</span>{children}</label>
);

export default function CheckoutPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const { items, specialRequest, clearCart } = useCartStore();
  const placeOrder = useOrderStore((s) => s.placeOrder);
  const [f, setF] = useState<Customer>({ fullName: '', phone: '', email: '', address: '', province: '', district: '', postcode: '' });
  const [payment, setPayment] = useState('promptpay');
  const [ok, setOk] = useState<boolean[]>(APPROVALS.map(() => false));

  const totals = cartTotals(items);
  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [e.target.name]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ok.every(Boolean) || items.length === 0) return;
    placeOrder({ items, total: totals.total, customer: f, payment: PAYMENTS.find((p) => p.id === payment)?.label ?? payment, specialRequest });
    clearCart();
    router.push('/order/confirmation');
  };

  if (!hydrated) return <div className="min-h-[60vh]" />;
  if (items.length === 0) {
    return <main className="mx-auto max-w-xl px-4 py-24 text-center"><p className="mb-6 text-mist">ไม่มีสินค้าในตะกร้า</p><BrushButton href="/custom">ENTER THE LAB</BrushButton></main>;
  }

  return (
    <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Sparkle color="#ff2ba6" size={24} className="right-10 top-6" />
      <Scrawl color="#7cc4ff" className="right-[22%] top-3 hidden text-2xl lg:block" style={{ ['--r' as string]: '-4deg' }}>MAKE YOUR MARK</Scrawl>
      <h1 className="mb-6 text-sm tracking-[0.2em]"><span className="text-neon">07</span> <span className="text-mist">/</span> COMPLETE YOUR ORDER</h1>

      <form onSubmit={submit} className="grid gap-4 lg:grid-cols-5">
        <fieldset className="panel enter space-y-3 p-5" style={{ ['--i' as string]: 0 }}>
          <legend className="sr-only">Contact</legend>
          <h2 className="mb-1 text-sm font-medium tracking-[0.14em]">1. CONTACT</h2>
          <Field label="ชื่อ-นามสกุล" required><input required name="fullName" value={f.fullName} onChange={set} className="field" autoComplete="name" /></Field>
          <Field label="เบอร์โทรศัพท์" required><input required type="tel" name="phone" value={f.phone} onChange={set} className="field" autoComplete="tel" /></Field>
          <Field label="อีเมล" required><input required type="email" name="email" value={f.email} onChange={set} className="field" autoComplete="email" /></Field>
        </fieldset>

        <fieldset className="panel enter space-y-3 p-5" style={{ ['--i' as string]: 1 }}>
          <legend className="sr-only">Shipping</legend>
          <h2 className="mb-1 text-sm font-medium tracking-[0.14em]">2. SHIPPING</h2>
          <Field label="ที่อยู่จัดส่ง" required><input required name="address" value={f.address} onChange={set} className="field" autoComplete="street-address" /></Field>
          <Field label="จังหวัด" required>
            <select required name="province" value={f.province} onChange={set} className="field"><option value="">เลือกจังหวัด</option>{PROVINCES.map((p) => <option key={p}>{p}</option>)}</select>
          </Field>
          <Field label="แขวง / อำเภอ" required><input required name="district" value={f.district} onChange={set} className="field" /></Field>
          <Field label="รหัสไปรษณีย์" required><input required name="postcode" value={f.postcode} onChange={set} inputMode="numeric" pattern="[0-9]{5}" title="รหัสไปรษณีย์ 5 หลัก" className="field" autoComplete="postal-code" /></Field>
        </fieldset>

        <fieldset className="panel enter p-5" style={{ ['--i' as string]: 2 }}>
          <legend className="sr-only">Payment</legend>
          <h2 className="mb-4 text-sm font-medium tracking-[0.14em]">3. PAYMENT</h2>
          <div className="space-y-3">
            {PAYMENTS.map(({ id, label, icon: Icon }) => (
              <label key={id} className={`flex cursor-pointer items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-white/5 ${payment === id ? 'text-white' : 'text-mist'}`}>
                <input type="radio" name="payment" className="sr-only" checked={payment === id} onChange={() => setPayment(id)} />
                <span className={`grid h-5 w-5 place-items-center rounded-full border ${payment === id ? 'border-neon bg-neon/20' : 'border-[#4a545d]'}`}><span className={`h-2.5 w-2.5 rounded-full ${payment === id ? 'bg-neon' : ''}`} /></span>
                <Icon className="h-4 w-4 flex-none" /> {label}
              </label>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-mist">บันทึกวิธีชำระเงินไว้ในคำสั่งซื้อ (ยังไม่เชื่อมระบบชำระเงินจริง)</p>
        </fieldset>

        <div className="panel enter flex flex-col items-center p-5 text-center" style={{ ['--i' as string]: 3 }}>
          <h2 className="mb-4 self-start text-sm font-medium tracking-[0.14em]">4. PRODUCTION</h2>
          <Timer className="spin-slow h-12 w-12 text-neon" />
          <p className="mt-3 rounded-full border border-neon/60 px-4 py-1.5 text-sm tracking-widest text-neon shadow-[0_0_14px_rgba(182,255,0,.25)]">7 - 14 DAYS</p>
          <p className="mt-2 text-xs text-sky">ระยะเวลาผลิต</p>
          <dl className="mt-6 w-full space-y-1 border-t border-line pt-4 text-left text-xs text-mist">
            <div className="flex justify-between"><dt>Items</dt><dd>{items.reduce((n, i) => n + i.quantity, 0)}</dd></div>
            <div className="flex justify-between text-sm text-white"><dt>Total</dt><dd>{formatBaht(totals.total)}</dd></div>
          </dl>
        </div>

        <fieldset className="panel enter flex flex-col p-5" style={{ ['--i' as string]: 4 }}>
          <legend className="sr-only">Final approval</legend>
          <h2 className="mb-4 text-sm font-medium tracking-[0.14em]">FINAL APPROVAL</h2>
          <div className="flex-1 space-y-3">
            {APPROVALS.map((t, i) => (
              <label key={t} className="flex items-center gap-3 text-sm text-mist">
                <input type="checkbox" className="check" checked={ok[i]} onChange={(e) => setOk(ok.map((v, j) => (j === i ? e.target.checked : v)))} /> {t}
              </label>
            ))}
          </div>
          <BrushButton type="submit" disabled={!ok.every(Boolean)} className="mt-6 w-full">CREATE MY PIECE →</BrushButton>
        </fieldset>
      </form>
    </main>
  );
}
