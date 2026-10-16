"use client";
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CUSTOM_FORM, FORMS, formatBaht } from '@/lib/catalog';
import { useConfigurator } from '@/store/configurator';

export default function FormStep({ onPick }: { onPick?: () => void }) {
  const form = useConfigurator((s) => s.form);
  const setForm = useConfigurator((s) => s.setForm);

  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      {FORMS.map((f, i) => (
        <li key={f.id} className="enter" style={{ ['--i' as string]: i }}>
          <button type="button" aria-pressed={form === f.id} onClick={() => { setForm(f.id); onPick?.(); }}
            className={`tile group block w-full overflow-hidden p-0 text-left ${form === f.id ? 'spray' : ''}`}>
            <div className="relative aspect-[4/3] overflow-hidden bg-black">
              <Image src={f.img} alt="" fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            <div className="p-4">
              <p className="font-medium tracking-[0.14em]">{f.name}</p>
              <p className="text-sm text-mist">{formatBaht(f.price)}+</p>
            </div>
          </button>
        </li>
      ))}
      <li className="enter" style={{ ['--i' as string]: FORMS.length }}>
        <Link href={CUSTOM_FORM.href} className="tile group block overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden bg-black">
            <Image src={CUSTOM_FORM.img} alt="" fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          <div className="p-4">
            <p className="font-medium tracking-[0.14em]">{CUSTOM_FORM.name}</p>
            <p className="flex items-center gap-1 text-sm text-sky">Contact <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></p>
          </div>
        </Link>
      </li>
    </ul>
  );
}
