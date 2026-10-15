import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer id="about" className="border-t border-line bg-void">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <Logo className="text-4xl" />
          <p className="mt-3 font-graffiti text-sm text-mist">SMALL DETAILS · BIG MEANING</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
          <Link href="/products" className="hover:text-neon">SHOP</Link>
          <Link href="/custom" className="hover:text-neon">CUSTOM</Link>
          <Link href="/community" className="hover:text-neon">COMMUNITY</Link>
          <Link href="/contact-us" className="hover:text-neon">ติดต่อเรา</Link>
        </nav>
        <p className="text-xs text-mist/60">© ATHIP 475 · #ATHIP475</p>
      </div>
    </footer>
  );
}
