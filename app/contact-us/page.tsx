import type { Metadata } from 'next';

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
    <main className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
      <section className="card p-8">
        <span className="inline-block rounded-full border border-neon/40 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-neon">Available for select projects</span>
        <h1 className="mt-5 font-graffiti text-5xl leading-none sm:text-6xl">ABOUT <span className="text-neon">&amp; CONTACT</span></h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-mist">
          I&apos;m PP — a software systems engineer, web developer, for a web development it&apos;s my second jobs.
          my background is in software systems engineering, and I specialize in creating digital experiences that are both functional and visually stunning.
          Whether you&apos;re looking to launch a new brand, revamp your website, or explore innovative ideas,
          I&apos;m here to help bring your vision to life. it&apos;s so good to work with you and I&apos;m excited to hear about your project. (PP)
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="mailto:pp.peempon@gmail.com" className="btn-neon">Book a call</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="btn-ghost">View profile</a>
        </div>
        <dl className="mt-9 grid gap-3 sm:grid-cols-3">
          {stats.map(([v, l]) => (
            <div key={l} className="rounded-lg border border-line bg-void p-4">
              <dt className="font-graffiti text-3xl text-neon">{v}</dt>
              <dd className="text-xs text-mist">{l}</dd>
            </div>
          ))}
        </dl>
      </section>

      <aside className="card flex flex-col gap-6 p-7">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-neon font-graffiti text-2xl text-black">PP</div>
        <div>
          <p className="text-xs uppercase tracking-widest text-mist">Contact</p>
          <h2 className="mt-1 text-2xl font-bold">PP</h2>
          <p className="mt-1 text-sm text-mist">Software systems engineer • Web developer • AI developer</p>
        </div>
        <div className="grid gap-3">
          {details.map((d) => (
            <a key={d.label} href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel={d.href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex items-center justify-between gap-3 rounded-lg border border-line bg-void px-4 py-3 text-sm transition-colors hover:border-neon">
              <span className="text-xs uppercase tracking-wider text-mist">{d.label}</span>
              <span className="font-medium">{d.value}</span>
            </a>
          ))}
        </div>
      </aside>
    </main>
  );
}
