"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { useHydrated } from '@/lib/useHydrated';
import Logo from '@/components/ui/Logo';

const LINKS = [
  { href: '/products', label: 'SHOP' },
  { href: '/custom', label: 'CUSTOM' },
  { href: '/community', label: 'COMMUNITY' },
  { href: '/contact-us', label: 'ABOUT' },
];

// หน้าในขั้นตอนสั่งซื้อจะแสดงชื่อหน้าตรงกลางตามแบบ แทนเมนู
const FLOW: Record<string, string> = {
  '/custom': 'CUSTOM LAB',
  '/cart': 'CART',
  '/checkout': 'CHECKOUT',
  '/order/confirmation': 'CUSTOM LAB',
  '/order/tracking': 'ORDER TRACKING',
};

export default function Navbar() {
  const path = usePathname();
  const items = useCartStore((s) => s.items);
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);
  const count = hydrated ? items.reduce((n, i) => n + i.quantity, 0) : 0;
  const flowTitle = FLOW[path];

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-void/80 backdrop-blur-md">
      <nav className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
        <div><Logo size="md" /></div>

        {flowTitle ? (
          <p className="text-sm font-medium tracking-[0.2em] text-white">{flowTitle}</p>
        ) : (
          <div className="hidden gap-9 text-sm font-medium tracking-[0.18em] md:flex">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} aria-current={path === l.href ? 'page' : undefined}
                className={`relative py-1 transition-colors hover:text-neon ${path === l.href ? 'text-neon' : 'text-sky'}`}>
                {l.label}
                {path === l.href && <span className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-neon shadow-[0_0_8px_#b6ff00]" />}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center justify-end gap-2">
          {flowTitle && (
            <Link href="/" aria-label="หน้าแรก" className="rounded-full p-2 text-mist transition-colors hover:text-neon"><Home className="h-5 w-5" /></Link>
          )}
          <Link href="/cart" aria-label={`ตะกร้าสินค้า ${count} ชิ้น`} className="relative rounded-full p-2 text-mist transition-colors hover:text-neon">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-pink px-1 text-[10px] font-bold text-white">{count}</span>}
          </Link>
          {!flowTitle && (
            <button type="button" className="p-2 text-mist hover:text-neon md:hidden" aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          )}
        </div>
      </nav>

      {open && !flowTitle && (
        <div className="enter border-t border-line bg-void md:hidden">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-6 py-4 text-sm font-medium tracking-[0.2em] text-sky hover:text-neon">{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
