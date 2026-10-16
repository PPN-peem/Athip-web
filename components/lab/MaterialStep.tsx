"use client";
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { MATERIALS, PRESETS } from '@/lib/catalog';
import { useConfigurator } from '@/store/configurator';

export function MaterialList() {
  const material = useConfigurator((s) => s.material);
  const color = useConfigurator((s) => s.color);
  const setMaterial = useConfigurator((s) => s.setMaterial);
  const setColor = useConfigurator((s) => s.setColor);

  return (
    <div className="space-y-3">
      {MATERIALS.map((m, i) => (
        <button key={m.id} type="button" aria-pressed={material === m.id} onClick={() => setMaterial(m)}
          className={`tile enter flex w-full items-center gap-4 px-4 py-3 text-left ${material === m.id ? 'spray' : ''}`} style={{ ['--i' as string]: i }}>
          <span className="h-11 w-11 flex-none rounded-full ring-1 ring-white/20" style={{ background: m.swatch }} />
          <span className="font-medium tracking-[0.14em]">{m.name}</span>
        </button>
      ))}
      {material === 'custom' && (
        <label className="tile enter flex items-center justify-between px-4 py-3 text-sm">
          <span className="text-sky">เลือกสีของคุณ</span>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} aria-label="เลือกสี" className="h-9 w-20 cursor-pointer rounded bg-transparent" />
        </label>
      )}
    </div>
  );
}

export function PresetStrip() {
  const ref = useRef<HTMLUListElement>(null);
  const applyPreset = useConfigurator((s) => s.applyPreset);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 220, behavior: 'smooth' });
  return (
    <div className="panel flex items-center gap-2 p-3">
      <button type="button" aria-label="เลื่อนซ้าย" onClick={() => scroll(-1)} className="rounded-lg border border-line p-2 text-mist hover:text-neon"><ChevronLeft className="h-5 w-5" /></button>
      <ul ref={ref} className="flex flex-1 gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none]">
        {PRESETS.map((p) => (
          <li key={p.id} className="w-40 flex-none">
            <button type="button" onClick={() => applyPreset(p)} className="tile group block w-full overflow-hidden" aria-label={`ใช้สไตล์ ${p.name}`}>
              <div className="relative aspect-[5/4] bg-black">
                <Image src={p.img} alt="" fill sizes="160px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <p className="py-1.5 text-center text-[11px] tracking-[0.2em] text-mist group-hover:text-neon">{p.name}</p>
            </button>
          </li>
        ))}
      </ul>
      <button type="button" aria-label="เลื่อนขวา" onClick={() => scroll(1)} className="rounded-lg border border-line p-2 text-mist hover:text-neon"><ChevronRight className="h-5 w-5" /></button>
    </div>
  );
}
