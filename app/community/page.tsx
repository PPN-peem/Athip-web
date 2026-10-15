import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'COMMUNITY | ATHIP 475' };

const PALETTE = [
  ['NEON GREEN', '#b6ff00'], ['NEON PINK', '#ff2ba6'], ['NEON BLUE', '#2d6bff'],
  ['LIGHT GRAY', '#bdbdbd'], ['BLACK', '#000000'], ['WHITE', '#ffffff'],
];

export default function CommunityPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-xs tracking-[0.3em] text-mist">MORE THAN JUST JEWELRY</p>
      <h1 className="mt-2 font-graffiti text-5xl">SHARE <span className="text-neon">YOUR CREATION</span></h1>
      <p className="mt-4 max-w-xl text-mist">ออกแบบชิ้นงานแล้วแชร์พร้อมแท็ก <span className="text-pink">#ATHIP475</span> ภาพจากชุมชนจะมาแสดงที่นี่</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="blueprint flex aspect-square items-center justify-center rounded-xl border border-dashed border-line text-sm text-mist">เร็วๆ นี้</div>
        ))}
      </div>
      <Link href="/custom" className="btn-neon mt-8">เริ่มออกแบบ</Link>

      <h2 className="mb-4 mt-16 text-xs tracking-widest text-mist">BRAND COLORS</h2>
      <ul className="flex flex-wrap gap-4">
        {PALETTE.map(([name, hex]) => (
          <li key={name} className="text-center text-[11px] text-mist">
            <span className="mx-auto mb-1 block h-12 w-12 rounded-full border border-line" style={{ background: hex }} />{name}
          </li>
        ))}
      </ul>
    </main>
  );
}
