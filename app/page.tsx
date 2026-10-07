import ConfiguratorCanvas from '@/components/configurator/ConfiguratorCanvas';
import ConfiguratorPanel from '@/components/configurator/ConfiguratorPanel';

const STEPS = [
  { title: 'เลือกสี', text: 'เลือกสีปรับลายที่ชอบจากแผงด้านขวา' },
  { title: 'หมุนดู', text: 'ลากเมาส์หมุนดูทุกด้าน ซูมเข้าออกได้' },
  { title: 'สั่งผลิต', text: 'พอใจแล้วกดสั่งผลิต เราผลิตตามแบบที่คุณเห็น' },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="max-w-3xl py-10 md:py-14">
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          ออกแบบได้เองตามใจนึก
        </h1>
        <p className="mt-5 max-w-xl text-lg text-ink/65">
          ปรับแต่งสินค้าแบบ 3D ได้ทันทีในหน้านี้ ไม่ต้องสมัครสมาชิก
        </p>
      </header>

      <section className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <ConfiguratorCanvas />
        <aside className="lg:sticky lg:top-24">
          <ConfiguratorPanel />
        </aside>
      </section>

      <section className="py-16">
        <h2 className="mb-6 text-2xl font-bold">สั่งทำง่าย ๆ ใน 3 ขั้นตอน</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-ink/10 bg-white p-6">
              <span className="text-sm font-medium text-cobalt">ขั้นที่ {i + 1}</span>
              <p className="mt-2 text-lg font-bold">{s.title}</p>
              <p className="mt-1 text-ink/65">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
