"use client";
import Image from 'next/image';
import { Eraser, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { INK_COLORS, PATTERNS, PATTERN_FILTERS, type PatternCategory, type PatternDef } from '@/lib/catalog';
import { useConfigurator } from '@/store/configurator';

type Tab = 'drop' | 'draw' | 'upload';

function DrawPad({ onApply }: { onApply: (url: string) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [ink, setInk] = useState(INK_COLORS[0]);
  const [dirty, setDirty] = useState(false);

  const pos = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 512, y: ((e.clientY - r.top) / r.height) * 512 };
  };
  const down = (e: React.PointerEvent) => {
    const ctx = ref.current!.getContext('2d')!;
    drawing.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    const { x, y } = pos(e);
    ctx.strokeStyle = ink; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.shadowColor = ink; ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 0.1, y + 0.1); ctx.stroke();
    setDirty(true);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = ref.current!.getContext('2d')!;
    const { x, y } = pos(e);
    ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y);
  };
  const up = () => { drawing.current = false; };
  const clear = () => { ref.current!.getContext('2d')!.clearRect(0, 0, 512, 512); setDirty(false); };

  return (
    <div className="space-y-3">
      <canvas ref={ref} width={512} height={512} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
        aria-label="พื้นที่วาดลาย" className="aspect-square max-h-64 w-full touch-none rounded-xl border border-dashed border-[#3a434b] bg-black/60" />
      <div className="flex items-center gap-2">
        {INK_COLORS.map((c) => (
          <button key={c} type="button" aria-label={`สี ${c}`} aria-pressed={ink === c} onClick={() => setInk(c)}
            className={`h-7 w-7 rounded-full border border-white/20 ${ink === c ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''}`} style={{ background: c }} />
        ))}
        <button type="button" onClick={clear} className="chip ml-auto flex items-center gap-1"><Eraser className="h-3.5 w-3.5" /> CLEAR</button>
        <button type="button" disabled={!dirty} onClick={() => onApply(ref.current!.toDataURL('image/png'))} className="chip disabled:opacity-40" aria-pressed={false}>APPLY</button>
      </div>
    </div>
  );
}

export default function GraffitiStep() {
  const layers = useConfigurator((s) => s.layers);
  const setLayerSource = useConfigurator((s) => s.setLayerSource);
  const [tab, setTab] = useState<Tab>('drop');
  const [filter, setFilter] = useState<'all' | PatternCategory>('all');
  const [notice, setNotice] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const list = PATTERNS.filter((p) => filter === 'all' || p.category === filter);
  const active = (p: PatternDef) => layers[p.layer].src === p.file;
  const toggle = (p: PatternDef) => setLayerSource(p.layer, active(p) ? null : p.file, active(p) ? '' : p.name);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    if (!f.type.startsWith('image/')) return setNotice('กรุณาเลือกไฟล์รูปภาพ (PNG / JPG)');
    if (f.size > 5 * 1024 * 1024) return setNotice('ไฟล์ใหญ่เกิน 5 MB');
    setNotice('');
    setLayerSource('graffiti', URL.createObjectURL(f), f.name.slice(0, 18));
  };

  return (
    <div className="space-y-4">
      <div role="tablist" aria-label="วิธีเลือกลาย" className="grid grid-cols-3 overflow-hidden rounded-xl border border-[#343c44] bg-black/40">
        {(['drop', 'draw', 'upload'] as Tab[]).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} type="button" onClick={() => setTab(t)}
            className={`py-3 text-sm tracking-[0.18em] transition-colors ${tab === t ? 'bg-white/10 text-white shadow-[inset_0_-2px_0_#b6ff00]' : 'text-sky hover:text-white'}`}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {tab === 'drop' && (
        <>
          <div className="flex flex-wrap gap-2" role="group" aria-label="หมวดลาย">
            {PATTERN_FILTERS.map((f) => (
              <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
            ))}
          </div>
          <ul className="grid grid-cols-4 gap-2.5">
            {list.map((p, i) => (
              <li key={p.id} className="enter" style={{ ['--i' as string]: i }}>
                <button type="button" draggable aria-pressed={active(p)} aria-label={p.name} title={p.name}
                  onDragStart={(e) => { e.dataTransfer.setData('text/athip-pattern', p.id); e.dataTransfer.effectAllowed = 'copy'; }}
                  onClick={() => toggle(p)}
                  className={`tile relative block aspect-square w-full overflow-hidden ${active(p) ? 'spray' : ''}`}>
                  <Image src={p.file} alt="" fill sizes="90px" className="object-contain p-1.5" draggable={false} />
                </button>
              </li>
            ))}
          </ul>
          <p className="text-xs text-mist">คลิกเพื่อใส่/เอาออก หรือลากลายไปวางบนชิ้นงานด้านขวา</p>
        </>
      )}

      {tab === 'draw' && <DrawPad onApply={(url) => setLayerSource('graffiti', url, 'My Draw')} />}

      {tab === 'upload' && (
        <div className="space-y-3">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onUpload} />
          <button type="button" onClick={() => fileRef.current?.click()} className="tile flex h-40 w-full flex-col items-center justify-center gap-2 border-dashed text-sky">
            <Upload className="h-7 w-7" /> UPLOAD ลายของคุณ
          </button>
          <p className="text-xs text-mist">แนะนำ PNG พื้นหลังโปร่งใส ไม่เกิน 5 MB</p>
        </div>
      )}
      {notice && <p role="status" className="text-xs text-pink">{notice}</p>}
    </div>
  );
}
