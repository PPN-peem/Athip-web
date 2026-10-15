"use client";
import Link from 'next/link';
import OrderGuard from '@/components/order/OrderGuard';
import { getModelName } from '@/lib/catalog';

const FLOW = ['DESIGN', 'PRODUCTION', 'QC', 'SHIPPING', 'DELIVERED'];

export default function ConfirmationPage() {
  return (
    <OrderGuard>
      {(order) => (
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <p className="text-xs tracking-[0.3em] text-mist">ORDER CONFIRMED</p>
          <h1 className="mt-3 font-graffiti text-5xl leading-tight">YOUR MARK<br /><span className="text-neon">HAS BEEN SAVED</span></h1>
          <p className="mx-auto mt-6 inline-block rounded-lg border border-neon px-6 py-3 font-graffiti text-2xl text-neon">{order.id}</p>

          <ul className="card mx-auto mt-8 max-w-md space-y-2 p-5 text-left text-sm">
            {order.items.map((i) => (
              <li key={i.id} className="flex justify-between gap-3">
                <span>{i.pieceId && <span className="text-neon">{i.pieceId} · </span>}{getModelName(i.model)} × {i.quantity}</span>
                <span className="text-mist">฿{(i.price * i.quantity).toLocaleString()}</span>
              </li>
            ))}
            <li className="flex justify-between border-t border-line pt-2 font-bold"><span>TOTAL</span><span className="text-neon">฿{order.total.toLocaleString()}</span></li>
          </ul>

          <ol className="mt-8 flex flex-wrap justify-center gap-2 text-xs tracking-wider text-mist">
            {FLOW.map((f, i) => <li key={f} className={i === 0 ? 'text-neon' : ''}>{f}{i < FLOW.length - 1 && <span className="mx-2">→</span>}</li>)}
          </ol>

          <Link href="/order/tracking" className="btn-neon mt-8">TRACK ORDER</Link>
        </main>
      )}
    </OrderGuard>
  );
}
