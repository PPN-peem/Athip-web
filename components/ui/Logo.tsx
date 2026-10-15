import Link from 'next/link';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" aria-label="ATHIP 475 หน้าแรก" className={`font-graffiti leading-none text-neon ${className}`}>
      ATHIP<span className="ml-1 align-top text-[0.45em] text-white">475</span>
    </Link>
  );
}
