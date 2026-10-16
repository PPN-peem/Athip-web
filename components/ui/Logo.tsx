import Link from 'next/link';

// โลโก้ ATHIP 475 : ตัวหนังสือสไตล์ทัคเขียวนีออน + 475 สีชมพู
export default function Logo({ className = '', size = 'md' }: { className?: string; size?: 'md' | 'lg' | 'xl' }) {
  const s = { md: 'text-3xl', lg: 'text-5xl', xl: 'text-7xl sm:text-8xl lg:text-9xl' }[size];
  return (
    <Link href="/" aria-label="ATHIP 475 หน้าแรก" className={`glitch relative inline-block -skew-x-6 font-graffiti leading-none text-neon ${s} ${className}`}>
      <span className="flicker" style={{ textShadow: '0 0 18px rgba(182,255,0,.55), 2px 2px 0 rgba(0,0,0,.6)' }}>ATHIP</span>
      <span className="absolute -bottom-[0.28em] right-[0.1em] text-[0.42em] text-pink" style={{ textShadow: '0 0 12px rgba(255,43,166,.6)' }}>475</span>
    </Link>
  );
}
