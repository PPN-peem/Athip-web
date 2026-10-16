import type { Metadata } from 'next';
import ShopGrid from '@/components/lab/ShopGrid';
import { Splat } from '@/components/decor/Graffiti';

export const metadata: Metadata = { title: 'SHOP | ATHIP 475' };

export default function ProductPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <Splat color="#ff2ba6" size={120} className="-right-6 top-6 opacity-50" />
      <p className="mb-3 text-xs tracking-[0.3em] text-sky">CUSTOM JEWELRY · STREET × MU × THAI</p>
      <h1 className="mb-2 text-4xl font-medium tracking-wide">CHOOSE YOUR FORM</h1>
      <p className="th-sub mb-8">เลือกแบบเครื่องประดับ แล้วเข้า Custom Lab เพื่อออกแบบต่อ</p>
      <ShopGrid />
    </main>
  );
}
