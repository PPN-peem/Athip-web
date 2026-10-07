import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

const LINKS = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/products', label: 'แคตตาล็อกสินค้า' },
  { href: '/how-it-works', label: 'วิธีสั่งทำ' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          ATHIP<span className="font-light text-ink/60">DESIGN</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-ink/70 transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/cart"
          aria-label="ตะกร้าสินค้า"
          className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm transition-colors hover:bg-paper"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>0</span>
        </Link>
      </nav>

      {/* เมนูสำหรับมือถือ: เลื่อนแนวนอน ไม่ต้องใช้ JavaScript */}
      <div className="flex gap-6 overflow-x-auto border-t border-ink/10 px-4 py-2 text-sm md:hidden">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap text-ink/70">
            {l.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
