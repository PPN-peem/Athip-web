"use client";
import { Hammer, PackageCheck, PenTool, ShieldCheck, Truck } from 'lucide-react';
import BrushButton from '@/components/ui/BrushButton';
import OrderGuard from '@/components/order/OrderGuard';
import { LabDecor } from '@/components/decor/Graffiti';

const FLOW = [
  { label: 'DESIGN', icon: PenTool },
  { label: 'PRODUCTION', icon: Hammer },
  { label: 'QC', icon: ShieldCheck },
  { label: 'SHIPPING', icon: Truck },
  { label: 'DELIVERED', icon: PackageCheck },
];

export default function ConfirmationPage() {
  return (
    <OrderGuard>
      {(order) => (
        <div className="relative">
          <LabDecor />
          <main className="relative mx-auto max-w-2xl px-4 py-16 text-center">
            <h1 className="enter text-4xl font-light leading-tight tracking-wide sm:text-5xl">
              YOUR MARK<br /><span className="text-xl text-sky">HAS BEEN</span><br />
              <span className="font-graffiti neon-text text-6xl">SAVED</span>
            </h1>
            <p className="enter mt-6 text-5xl font-light tracking-widest" style={{ ['--i' as string]: 3 }}>{(order.items[0]?.pieceId ?? order.id).replace('CUSTOM-', '')}</p>
            <p className="enter mt-1 text-xs tracking-[0.2em] text-mist" style={{ ['--i' as string]: 3 }}>ORDER {order.id}</p>

            <ol className="mt-12 grid grid-cols-5 gap-2">
              {FLOW.map(({ label, icon: Icon }, i) => (
                <li key={label} className="enter flex flex-col items-center gap-2" style={{ ['--i' as string]: i + 4 }}>
                  <span className={`grid h-12 w-12 place-items-center rounded-full border ${i < 2 ? 'border-neon text-neon shadow-[0_0_14px_rgba(182,255,0,.35)]' : 'border-[#3a434b] text-mist'}`}><Icon className="h-5 w-5" /></span>
                  <span className={`text-[10px] tracking-[0.16em] ${i < 2 ? 'text-neon' : 'text-mist'}`}>{label}</span>
                </li>
              ))}
            </ol>

            <div className="enter mt-12" style={{ ['--i' as string]: 9 }}><BrushButton href="/order/tracking">TRACK ORDER →</BrushButton></div>
          </main>
        </div>
      )}
    </OrderGuard>
  );
}
