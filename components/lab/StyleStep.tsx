"use client";
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { INK_COLORS, getForm, type LayerKey } from '@/lib/catalog';
import { useConfigurator, type ActiveLayer } from '@/store/configurator';
import BrushButton from '@/components/ui/BrushButton';

function Row({ label, value, unit = '', min, max, step = 1, onChange, extra }: { label: string; value: number; unit?: string; min: number; max: number; step?: number; onChange: (v: number) => void; extra?: React.ReactNode }) {
  const id = `sl-${label}`;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <label htmlFor={id} className="tracking-[0.12em]">{label}</label>
        <span className="flex items-center gap-1 text-mist">{extra}{value}{unit}</span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
    </div>
  );
}

const TABS: { k: ActiveLayer; label: string }[] = [
  { k: 'base', label: 'BASE' },
  { k: 'graffiti', label: 'GRAFFITI' },
  { k: 'symbol', label: 'SYMBOL' },
  { k: 'text', label: 'TEXT' },
];

export default function StyleStep({ goTo }: { goTo: (i: number) => void }) {
  const s = useConfigurator();
  const form = getForm(s.form);
  const al = s.activeLayer;
  const key = al === 'base' ? null : (al as LayerKey);
  const layer = key ? s.layers[key] : null;
  const ready = !!layer?.src && (key !== 'text' || s.text.trim().length > 0);
  const patch = (p: Parameters<typeof s.patchLayer>[1]) => key && s.patchLayer(key, p);

  const thumb = (k: ActiveLayer) => {
    if (k === 'base') return <Image src={form.img} alt="" fill sizes="64px" className="object-cover" />;
    if (k === 'text') return <span className="font-graffiti text-lg text-neon">Aa</span>;
    const src = s.layers[k].src;
    return src && src.startsWith('/') ? <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" /> : src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" className="h-full w-full object-contain p-1" />
    ) : <span className="text-[10px] text-mist">EMPTY</span>;
  };

  return (
    <div className="space-y-4">
      <div className="panel space-y-5 p-5">
        {al === 'base' && (
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="mb-2 block tracking-[0.12em]">SIZE ({form.unit})</span>
              <select className="field" value={s.size} onChange={(e) => s.setSize(Number(e.target.value))}>
                {form.sizes.map((n) => <option key={n} value={n}>{n} {form.unit}</option>)}
              </select>
            </label>
            <button type="button" onClick={() => goTo(1)} className="chip">เปลี่ยนวัสดุ / สี (ขั้น 02)</button>
          </div>
        )}

        {al === 'text' && (
          <div className="space-y-3">
            <label className="block text-sm">
              <span className="mb-2 block tracking-[0.12em]">TEXT (สูงสุด 16 ตัวอักษร)</span>
              <input className="field" value={s.text} maxLength={16} placeholder="ATHIP" onChange={(e) => s.setText(e.target.value)} />
            </label>
            <div className="flex gap-2" role="group" aria-label="สีข้อความ">
              {INK_COLORS.map((c) => (
                <button key={c} type="button" aria-label={`สี ${c}`} aria-pressed={s.textColor === c} onClick={() => s.setTextColor(c)}
                  className={`h-7 w-7 rounded-full border border-white/20 ${s.textColor === c ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''}`} style={{ background: c }} />
              ))}
            </div>
          </div>
        )}

        {key && !ready && key !== 'text' && (
          <p className="rounded-lg border border-dashed border-line p-4 text-sm text-mist">
            ยังไม่ได้เลือกลายในเลเยอร์นี้ <button type="button" onClick={() => goTo(2)} className="text-sky underline">ไปเลือกลาย (ขั้น 03)</button>
          </p>
        )}

        {key && (ready || key === 'text') && layer && (
          <div className={`space-y-4 ${ready ? '' : 'pointer-events-none opacity-40'}`}>
            <Row label="POSITION X" value={layer.x} min={-100} max={100} onChange={(v) => patch({ x: v })}
              extra={<>
                <button type="button" aria-label="เลื่อนซ้าย" onClick={() => patch({ x: Math.max(-100, layer.x - 5) })}><ChevronLeft className="h-4 w-4" /></button>
                <button type="button" aria-label="เลื่อนขวา" onClick={() => patch({ x: Math.min(100, layer.x + 5) })}><ChevronRight className="h-4 w-4" /></button>
              </>} />
            <Row label="POSITION Y" value={layer.y} min={-100} max={100} onChange={(v) => patch({ y: v })} />
            <Row label="SCALE" value={layer.scale} unit="%" min={10} max={160} onChange={(v) => patch({ scale: v })} />
            <Row label="ROTATION" value={layer.rotation} unit="°" min={-180} max={180} onChange={(v) => patch({ rotation: v })} />
            <Row label="OPACITY" value={layer.opacity} unit="%" min={0} max={100} onChange={(v) => patch({ opacity: v })} />
          </div>
        )}
      </div>

      <div role="tablist" aria-label="เลเยอร์" className="panel grid grid-cols-4 gap-3 p-3">
        {TABS.map((t) => (
          <button key={t.k} role="tab" aria-selected={al === t.k} type="button" onClick={() => s.setActiveLayer(t.k)}
            className={`tile flex flex-col items-center gap-1.5 p-2 ${al === t.k ? 'spray' : ''}`}>
            <span className="relative grid h-14 w-full place-items-center overflow-hidden rounded-lg bg-black">{thumb(t.k)}</span>
            <span className={`text-[11px] tracking-[0.14em] ${al === t.k ? 'text-neon' : 'text-mist'}`}>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <BrushButton onClick={s.randomize} className="min-w-44"><Zap className="h-5 w-5" /> CHAOS</BrushButton>
        <span className="text-sm tracking-[0.16em] text-mist">RANDOM DESIGN</span>
        <button type="button" onClick={s.resetDesign} className="ml-auto text-xs text-mist underline hover:text-pink">รีเซ็ตทั้งหมด</button>
      </div>
    </div>
  );
}
