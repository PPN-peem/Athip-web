import type { Metadata } from 'next';
import ProductGrid from '@/components/shop/ProductGrid';

export const metadata: Metadata = { title: 'SHOP | ATHIP 475' };

export default function ProductPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <p className="mb-3 text-xs tracking-[0.3em] text-mist">CUSTOM · STREET × มู × THAI</p>
      <h1 className="mb-10 font-graffiti text-4xl sm:text-5xl">CHOOSE <span className="text-neon">YOUR FORM</span></h1>
      <ProductGrid />
    </main>
  );
}
