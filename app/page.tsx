import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const DNA = [
  { pct: '60%', name: 'STREET', text: 'ความเท่แบบเมือง กราฟฟิตี้ โลโก้ สตรีทแวร์' },
  { pct: '30%', name: 'มู', text: 'ความเชื่อ สิริมงคล เครื่องราง พลังบวก' },
  { pct: '10%', name: 'THAI STYLE', text: 'กลิ่นอายความเป็นไทย ลวดลายประณีต' },
];

const STEPS = [
  ['01', 'CHOOSE FORM', 'เลือกรูปทรง'],
  ['02', 'MATERIAL', 'เลือกวัสดุ / สี'],
  ['03', 'GRAFFITI', 'เลือกหรืออัปโหลดลาย'],
  ['04', 'BREAK THE RULES', 'ปรับขนาด ตำแหน่ง ความโปร่งใส'],
  ['05', '3D PREVIEW', 'หมุนดู 360°'],
  ['06', 'SIGNATURE', 'รับรหัสชิ้นงานของคุณ'],
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-neon/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-pink/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <div>
            <p className="mb-4 text-xs tracking-[0.3em] text-mist">CUSTOM JEWELRY · STREET × มู × THAI</p>
            <h1 className="font-graffiti text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              YOUR PIECE.<br /><span className="text-neon">YOUR MARK.</span>
            </h1>
            <p className="mt-6 max-w-md text-mist">ออกแบบชิ้นงานของคุณเอง เลือกวัสดุ แปะลายกราฟฟิตี้ แล้วหมุนดูแบบ 3D ก่อนสั่งผลิตจริง</p>
            <Link href="/custom" className="btn-neon mt-8">ENTER THE LAB <ArrowRight className="h-5 w-5" /></Link>
          </div>
          <div className="blueprint flex aspect-square items-center justify-center rounded-xl border border-line">
            <span className="font-graffiti text-6xl text-neon/80">4THIP</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-graffiti text-3xl">CONCEPT <span className="text-neon">&amp; DNA</span></h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {DNA.map((d) => (
            <li key={d.name} className="card p-6">
              <p className="font-graffiti text-4xl text-neon">{d.pct}</p>
              <p className="mt-2 text-lg font-bold tracking-wider">{d.name}</p>
              <p className="mt-1 text-sm text-mist">{d.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="font-graffiti text-3xl">6 STEPS <span className="text-pink">TO YOUR MARK</span></h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map(([n, t, th]) => (
            <li key={n} className="card p-5">
              <span className="text-sm font-bold text-neon">{n}</span>
              <p className="mt-1 font-bold tracking-wider">{t}</p>
              <p className="text-sm text-mist">{th}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-center font-graffiti text-xl text-mist">SMALL DETAILS · BIG MEANING</p>
      </section>
    </>
  );
}
