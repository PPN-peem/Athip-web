import Image from 'next/image';
import { Scrawl, Slash, Sparkle, Splat } from '@/components/decor/Graffiti';
import BrushButton from '@/components/ui/BrushButton';
import Logo from '@/components/ui/Logo';
import { ArrowRight } from 'lucide-react';

const DNA = [
  { pct: '60%', name: 'STREET', text: 'ความเท่แบบเมือง กราฟฟิตี้ โลโก้ สตรีทแวร์', color: 'text-neon' },
  { pct: '30%', name: 'มู', text: 'ความเชื่อ สิริมงคล เครื่องราง พลังบวก', color: 'text-pink' },
  { pct: '10%', name: 'THAI STYLE', text: 'กลิ่นอายความเป็นไทย ลวดลายประณีต', color: 'text-sky' },
];

const STEPS = ['CHOOSE FORM', 'MATERIAL', 'GRAFFITI', 'BREAK THE RULES', '3D PREVIEW', 'SIGNATURE'];
const TICKER = ['STREET', 'มู', 'THAI', 'SMALL DETAILS', 'BIG MEANING', 'YOUR PIECE', 'YOUR MARK'];

export default function Home() {
  return (
    <>
      <section className="relative isolate min-h-[640px] overflow-hidden border-b border-line/70 lg:min-h-[720px]">
        <div className="absolute inset-y-0 left-0 -z-10 w-full md:w-[48%]" style={{ maskImage: 'linear-gradient(90deg,#000 55%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,#000 55%,transparent)' }}>
          <Image src="/art/hero.jpg" alt="" fill priority sizes="48vw" className="kenburns object-cover object-left opacity-90" />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(600px_400px_at_80%_30%,rgba(182,255,0,0.10),transparent_70%)]" />

        <Splat color="#ff2ba6" size={140} className="right-[3%] top-10 opacity-70" style={{ ['--r' as string]: '-12deg' }} />
        <Slash color="#ff2ba6" className="bottom-8 left-[30%] opacity-90" />
        <Sparkle color="#7cc4ff" size={30} className="left-[44%] top-16" />
        <Sparkle color="#b6ff00" size={22} className="right-[6%] top-[55%]" style={{ ['--d' as string]: '1.2s' }} />

        <div className="mx-auto grid min-h-[inherit] max-w-7xl items-center px-4 py-16 sm:px-6 md:grid-cols-[1fr_1fr] lg:px-8">
          <div className="hidden md:block" />
          <div className="relative text-center md:text-left">
            <div className="enter" style={{ ['--i' as string]: 0 }}><Logo size="xl" className="mb-8" /></div>
            <h1 className="enter -rotate-3 font-graffiti text-4xl leading-[1.12] text-white sm:text-5xl lg:text-6xl" style={{ ['--i' as string]: 2, textShadow: '0 0 20px rgba(255,255,255,.18)' }}>
              YOUR PIECE.<br />YOUR MARK.
            </h1>
            <p className="enter mt-8 text-sm tracking-[0.22em] text-mist" style={{ ['--i' as string]: 4 }}>
              CUSTOM JEWELRY<br />STREET × MU × THAI
            </p>
            <div className="enter mt-8" style={{ ['--i' as string]: 5 }}>
              <BrushButton href="/custom" className="min-w-64">ENTER THE LAB <ArrowRight className="h-5 w-5" /></BrushButton>
            </div>
          </div>
        </div>

        <p aria-hidden className="absolute bottom-6 left-4 hidden text-lg leading-tight text-white/90 sm:block">ไทย<br />สตรีท<br />มู</p>
        <Scrawl hand color="#7cc4ff" className="bottom-6 left-24 hidden text-[11px] md:block" style={{ ['--r' as string]: '-4deg' }}>NOT JUST JEWELRY{'\n'}IT&apos;S YOURS.</Scrawl>
      </section>

      <div className="overflow-hidden border-b border-line/70 bg-neon py-2 text-black" aria-hidden>
        <div className="ticker font-graffiti text-lg tracking-widest">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => <span key={i} className="mx-6">{t} <span className="mx-3">✦</span></span>)}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-medium tracking-wide">CONCEPT <span className="text-mist">&amp;</span> DNA</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {DNA.map((d) => (
            <li key={d.name} className="panel tile p-6">
              <p className={`font-graffiti text-5xl ${d.color}`}>{d.pct}</p>
              <p className="mt-3 text-lg font-bold tracking-[0.14em]">{d.name}</p>
              <p className="mt-1 text-sm text-mist">{d.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-medium tracking-wide">6 STEPS <span className="text-pink">TO YOUR MARK</span></h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((t, i) => (
            <li key={t} className="panel tile flex items-center gap-4 p-5">
              <span className="dot dot-done">{String(i + 1).padStart(2, '0')}</span>
              <span className="tracking-[0.14em]">{t}</span>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex justify-center"><BrushButton href="/custom" color="pink">START DESIGNING <ArrowRight className="h-5 w-5" /></BrushButton></div>
      </section>
    </>
  );
}
