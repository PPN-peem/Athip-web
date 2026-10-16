import type { Metadata } from 'next';
import BrushButton from '@/components/ui/BrushButton';
import { Splat } from '@/components/decor/Graffiti';

export const metadata: Metadata = { title: 'ABOUT & CONTACT | ATHIP 475' };

const details = [
  { label: 'Email', value: 'pp.peempon@gmail.com', href: 'mailto:pp.peempon@gmail.com' },
  { label: 'Phone', value: '+66 984 180-481', href: 'tel:+66984180481' },
  { label: 'Instagram', value: '@none', href: 'https://instagram.com/averyquinn' },
  { label: 'Location', value: 'Bangkok, Thailand', href: 'https://maps.google.com/?q=Bangkok+Thailand' },
];

const stats = [
  ['2+', 'Years web development experience'],
  ['4', 'Projects completed'],
  ['∞', 'Ideas worth chasing'],
];

export default function Page() {
  return (
    <main className="relative mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
      <Splat color="#b6ff00" size={120} className="-top-4 right-4 opacity-40" />
      <section className="panel p-8">
        <span className="inline-block rounded-full border border-neon/40 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-neon">Available for select projects</span>
        <h1 className="mt-5 text-5xl font-medium leading-none tracking-wide sm:text-6xl">ABOUT <span className="neon-text">&amp; CONTACT</span></h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-mist">
          I&apos;m PP — a software systems engineer, web developer, for a web development it&apos;s my second jobs.
          my background is in software systems engineering, and I specialize in creating digital experiences that are both functional and visually stunning.
          Whether you&apos;re looking to launch a new brand, revamp your website, or explore innovative ideas,
          I&apos;m here to help bring your vision to life. it&apos;s so good to work with you and I&apos;m excited to hear about your project. (PP)
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <BrushButton href="mailto:pp.peempon@gmail.com">Book a call</BrushButton>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="chip flex items-center px-6">View profile</a>
        </div>
        <dl className="mt-9 grid gap-3 sm:grid-cols-3">
          {stats.map(([v, l]) => (
            <div key={l} className="tile p-4">
              <dt className="font-graffiti text-3xl text-neon">{v}</dt>
              <dd className="text-xs text-mist">{l}</dd>
            </div>
          ))}
        </dl>
      </section>

      <aside className="panel flex flex-col gap-6 p-7">
        <div className="grid h-16 w-16 -rotate-6 place-items-center bg-neon font-graffiti text-2xl text-black" style={{ clipPath: 'polygon(2% 10%,30% 0,70% 4%,98% 0,100% 50%,96% 100%,60% 96%,20% 100%,0 60%)' }}>PP</div>
        <div>
          <p className="text-xs uppercase tracking-widest text-sky">Contact</p>
          <h2 className="mt-1 text-2xl font-bold">PP</h2>
          <p className="mt-1 text-sm text-mist">Software systems engineer • Web developer • AI developer</p>
        </div>
        <div className="grid gap-3">
          {details.map((d) => (
            <a key={d.label} href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel={d.href.startsWith('http') ? 'noreferrer' : undefined}
              className="tile flex items-center justify-between gap-3 px-4 py-3 text-sm">
              <span className="text-xs uppercase tracking-wider text-sky">{d.label}</span>
              <span className="font-medium">{d.value}</span>
            </a>
          ))}
        </div>
      </aside>
    </main>
  );
}
