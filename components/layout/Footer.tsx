import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="border-t border-line/70 bg-void">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <Logo size="lg" />
          <p className="mt-5 font-hand text-xs text-sky">SMALL DETAILS · BIG MEANING</p>
        </div>
        <nav className="flex flex-wrap gap-x-7 gap-y-2 text-sm tracking-[0.16em] text-mist">
          <Link href="/products" className="hover:text-neon">SHOP</Link>
          <Link href="/custom" className="hover:text-neon">CUSTOM</Link>
          <Link href="/community" className="hover:text-neon">COMMUNITY</Link>
          <Link href="/contact-us" className="hover:text-neon">ABOUT</Link>
        </nav>
        <p className="text-xs text-mist/60">© ATHIP 475 · #ATHIP475</p>
      </div>
    </footer>
  );
}
