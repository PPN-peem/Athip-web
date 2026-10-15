"use client";
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
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

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);

  const cartCount = hydrated ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-void/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo className="text-3xl" />

        <div className="hidden gap-8 text-sm font-medium tracking-widest md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-mist transition-colors hover:text-neon">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            aria-label={`ตะกร้าสินค้า ${cartCount} ชิ้น`}
            className="flex items-center gap-2 rounded-full border border-line px-4 py-2 transition-colors hover:border-neon hover:text-neon"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-sm font-medium">{cartCount}</span>
          </Link>
          <button
            type="button"
            className="p-2 text-mist hover:text-neon md:hidden"
            aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-void md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-sm font-medium tracking-widest text-mist hover:text-neon"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
