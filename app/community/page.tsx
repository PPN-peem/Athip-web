import Image from 'next/image';
import type { Metadata } from 'next';
import BrushButton from '@/components/ui/BrushButton';
import Logo from '@/components/ui/Logo';
import { Scrawl, Sparkle } from '@/components/decor/Graffiti';
import { FORMS, PATTERNS } from '@/lib/catalog';

export const metadata: Metadata = { title: 'COMMUNITY | ATHIP 475' };

function Phone({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <figure className="floaty mx-auto w-[240px]" style={{ ['--r' as string]: '0deg' }}>
      <div className="relative aspect-[9/18.5] overflow-hidden rounded-[2.2rem] border-2 border-[#2a3138] bg-black p-3 shadow-[0_30px_60px_rgba(0,0,0,.6)]">
        <div className="absolute left-1/2 top-2 h-4 w-20 -translate-x-1/2 rounded-full bg-[#0c0e10]" />
        <div className="flex h-full flex-col pt-5">{children}</div>
      </div>
      <figcaption className="mt-3 text-center text-xs tracking-[0.2em] text-mist">{label}</figcaption>
    </figure>
  );
}

const SOCIAL = [
  { n: 'IG', bg: 'linear-gradient(135deg,#feda75,#d62976,#4f5bd5)' },
  { n: 'TT', bg: '#111' },
  { n: 'FB', bg: '#1877f2' },
];

export default function CommunityPage() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <Sparkle color="#7cc4ff" size={28} className="right-10 top-8" />
      <p className="text-xs tracking-[0.3em] text-sky">MORE THAN JUST JEWELRY</p>
      <h1 className="mt-2 text-4xl font-medium tracking-wide">SHARE <span className="neon-text">YOUR CREATION</span></h1>
      <p className="th-sub mt-2">แชร์ชิ้นงานพร้อมแท็ก #ATHIP475 — ภาพจากชุมชนจะมาแสดงที่ THE WALL</p>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        <Phone label="HOME">
          <div className="flex justify-center"><Logo size="md" /></div>
          <div className="relative mt-3 flex-1 overflow-hidden rounded-xl">
            <Image src="/art/hero.jpg" alt="" fill sizes="220px" className="object-cover" />
          </div>
          <p className="mt-3 -rotate-2 text-center font-graffiti text-xl leading-tight">YOUR PIECE.<br />YOUR MARK.</p>
          <div className="mt-3 flex justify-center"><BrushButton href="/custom" className="min-h-10! px-6! text-xs">CUSTOMIZE</BrushButton></div>
        </Phone>

        <Phone label="THE WALL">
          <p className="font-graffiti text-lg text-neon">THE WALL</p>
          <p className="text-[10px] tracking-widest text-sky">#ATHIP475</p>
          <ul className="mt-3 grid flex-1 grid-cols-3 content-start gap-1.5 overflow-hidden">
            {[...FORMS.map((f) => f.img), ...PATTERNS.slice(0, 4).map((p) => p.file)].slice(0, 9).map((src, i) => (
              <li key={src} className="relative aspect-square overflow-hidden rounded-md border border-line bg-[#0b0d0f]">
                <Image src={src} alt="" fill sizes="70px" className={i < 5 ? 'object-cover' : 'object-contain p-1'} />
              </li>
            ))}
          </ul>
          <p className="mt-2 text-center text-[10px] text-mist">ตัวอย่างหน้าตา — ผลงานจริงเร็วๆ นี้</p>
        </Phone>

        <Phone label="SHARE YOUR CREATION">
          <p className="mt-2 text-center text-xs tracking-[0.14em] text-sky">SHARE YOUR CREATION</p>
          <div className="relative my-3 flex-1 overflow-hidden rounded-xl border border-line">
            <Image src={FORMS[0].img} alt="" fill sizes="220px" className="object-cover" />
          </div>
          <div className="flex justify-center gap-3">
            {SOCIAL.map((s) => <span key={s.n} className="grid h-9 w-9 place-items-center rounded-full text-[11px] font-bold text-white" style={{ background: s.bg }}>{s.n}</span>)}
          </div>
          <p className="mt-2 text-center text-xs text-white">#ATHIP475</p>
          <div className="mt-3 flex justify-center"><BrushButton href="/custom" className="min-h-10! px-6! text-xs">DESIGN YOURS</BrushButton></div>
        </Phone>
      </div>

      <Scrawl color="#ff2ba6" className="-bottom-2 right-6 text-3xl" style={{ ['--r' as string]: '-6deg' }}>MAKE YOUR MARK</Scrawl>
    </main>
  );
}
