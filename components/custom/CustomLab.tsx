"use client";
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Camera, Share2, Shuffle, ShoppingCart, Upload, RotateCcw } from 'lucide-react';
import ConfiguratorCanvas from '@/components/configurator/ConfiguratorCanvas';
import StepNav, { STEPS } from '@/components/custom/StepNav';
import { useConfiguratorStore, type ViewPreset } from '@/store/configurator';
import { useCartStore } from '@/store/cart';
import { BASE_PRICE, MATERIALS, MODELS, PATTERNS, getMaterialName, getModelName } from '@/lib/catalog';

const TITLES = [
  ['01', 'CHOOSE YOUR FORM', 'เลือกรูปทรงที่ต้องการ'],
  ['02', 'MATERIAL', 'เลือกวัสดุ / สีพื้น'],
  ['03', 'GRAFFITI', 'เลือกลายกราฟฟิตี้ หรืออัปโหลดเอง'],
  ['04', 'BREAK THE RULES', 'ปรับขนาด ตำแหน่ง ความโปร่งใส ของลาย'],
  ['05', '3D PREVIEW', 'หมุนดูรอบด้าน 360°'],
  ['06', 'SIGNATURE', 'สรุปรายละเอียดและรหัสชิ้นงาน'],
] as const;

function Slider(props: { label: string; value: number; min: number; max: number; step: number; unit?: string; onChange: (v: number) => void }) {
  const { label, value, min, max, step, unit = '', onChange } = props;
  const id = `r-${label}`;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <label htmlFor={id} className="text-mist">{label}</label>
        <span className="font-medium text-neon">{Math.round(value * 100) / 100}{unit}</span>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full cursor-pointer" />
    </div>
  );
}

export default function CustomLab() {
  const router = useRouter();
  const s = useConfiguratorStore();
  const addToCart = useCartStore((c) => c.addToCart);
  const [step, setStep] = useState(0);
  const [agree, setAgree] = useState(false);
  const [notice, setNotice] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const go = (i: number) => {
    const next = Math.min(STEPS.length - 1, Math.max(0, i));
    if (next === STEPS.length - 1) s.ensurePieceId();
    setStep(next);
  };

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) return setNotice('กรุณาเลือกไฟล์รูปภาพ (PNG / JPG)');
    if (f.size > 5 * 1024 * 1024) return setNotice('ไฟล์ใหญ่เกิน 5 MB');
    setNotice('');
    s.setPattern(URL.createObjectURL(f));
  };

  const share = async () => {
    const data = { title: 'ATHIP 475', text: `ลองดูชิ้นงานที่ฉันออกแบบ #ATHIP475 — ${getModelName(s.selectedModel)}`, url: window.location.origin + '/custom' };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(`${data.text} ${data.url}`);
        setNotice('คัดลอกข้อความสำหรับแชร์แล้ว');
      }
    } catch {
      /* ผู้ใช้ยกเลิกการแชร์ */
    }
  };

  const addAndGo = () => {
    addToCart({
      model: s.selectedModel,
      color: s.selectedColor,
      material: getMaterialName(s.selectedMaterial, s.selectedColor),
      pattern: s.selectedPattern,
      pieceId: s.pieceId,
      signature: s.signature.trim() || undefined,
      price: BASE_PRICE,
      quantity: 1,
    });
    router.push('/cart');
  };

  const [no, title, th] = TITLES[step];
  const hasPattern = !!s.selectedPattern;
  const views: { id: ViewPreset; label: string }[] = [
    { id: 'free', label: 'FREE' }, { id: 'side', label: 'SIDE' }, { id: 'back', label: 'BACK' }, { id: 'top', label: 'TOP' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <StepNav current={step} onSelect={go} />

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_400px]">
        <ConfiguratorCanvas />

        <section className="card flex flex-col gap-5 p-5" aria-labelledby="step-title">
          <header>
            <h1 id="step-title" className="font-graffiti text-2xl">
              <span className="text-neon">{no}</span> {title}
            </h1>
            <p className="text-sm text-mist">{th}</p>
          </header>

          {step === 0 && (
            <div className="grid grid-cols-2 gap-3">
              {MODELS.map((m) => (
                <button key={m.file} type="button" onClick={() => s.setModel(m.file)} aria-pressed={s.selectedModel === m.file}
                  className={`rounded-lg border p-4 text-left transition ${s.selectedModel === m.file ? 'border-neon text-neon' : 'border-line text-mist hover:border-mist'}`}>
                  <span className="block font-medium">{m.name}</span>
                  <span className="text-xs">฿{BASE_PRICE}</span>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              {MATERIALS.map((m) => (
                <button key={m.id} type="button" onClick={() => s.setMaterial(m)} aria-pressed={s.selectedMaterial === m.id}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 transition ${s.selectedMaterial === m.id ? 'border-neon' : 'border-line hover:border-mist'}`}>
                  <span className="h-8 w-8 rounded-full border border-line" style={{ background: m.id === 'custom' ? 'conic-gradient(#b6ff00,#ff2ba6,#2d6bff,#b6ff00)' : m.color }} />
                  <span className="text-sm font-medium tracking-wider">{m.name}</span>
                </button>
              ))}
              {s.selectedMaterial === 'custom' && (
                <label className="flex items-center justify-between rounded-lg border border-line p-3 text-sm">
                  <span className="text-mist">เลือกสีเอง</span>
                  <input type="color" value={s.selectedColor} onChange={(e) => s.setColor(e.target.value)} className="h-9 w-16 cursor-pointer rounded bg-transparent" aria-label="เลือกสี" />
                </label>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                {PATTERNS.map((p) => (
                  <button key={p.name} type="button" onClick={() => s.setPattern(p.file)} aria-pressed={s.selectedPattern === p.file} aria-label={p.name}
                    className={`relative flex h-24 items-center justify-center overflow-hidden rounded-lg border bg-black transition ${s.selectedPattern === p.file ? 'border-neon' : 'border-line hover:border-mist'}`}>
                    {p.file ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.file} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xs text-mist">ไม่มีลาย</span>
                    )}
                  </button>
                ))}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onUpload} />
              <button type="button" className="btn-ghost w-full" onClick={() => fileRef.current?.click()}>
                <Upload className="h-4 w-4" /> UPLOAD ลายของคุณ
              </button>
              <p className="text-xs text-mist">แนะนำไฟล์ PNG พื้นหลังโปร่งใส ไม่เกิน 5 MB</p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Slider label="ขนาดสินค้า" value={s.modelScale} min={0.5} max={10} step={0.1} onChange={s.setModelScale} />
              {hasPattern ? (
                <>
                  <Slider label="SCALE (ขนาดลาย)" value={s.patternScale} min={0.01} max={10} step={0.01} onChange={s.setPatternScale} />
                  <Slider label="ROTATION" value={s.patternRotation} min={-360} max={360} step={0.5} unit="°" onChange={s.setPatternRotation} />
                  <Slider label="POSITION X" value={s.patternOffsetX} min={-5} max={5} step={0.01} onChange={(v) => s.setPatternOffset(v, s.patternOffsetY)} />
                  <Slider label="POSITION Y" value={s.patternOffsetY} min={-5} max={5} step={0.01} onChange={(v) => s.setPatternOffset(s.patternOffsetX, v)} />
                  <Slider label="OPACITY" value={Math.round(s.patternOpacity * 100)} min={0} max={100} step={1} unit="%" onChange={(v) => s.setPatternOpacity(v / 100)} />
                  <button type="button" onClick={s.randomize} className="btn-neon w-full bg-pink! text-white!">
                    <Shuffle className="h-4 w-4" /> CHAOS · RANDOM DESIGN
                  </button>
                </>
              ) : (
                <p className="rounded-lg border border-dashed border-line p-4 text-sm text-mist">เลือกลายในขั้นที่ 03 ก่อน จึงจะปรับตำแหน่งและความโปร่งใสของลายได้</p>
              )}
              <button type="button" onClick={s.resetDesign} className="btn-ghost w-full"><RotateCcw className="h-4 w-4" /> รีเซ็ตการออกแบบ</button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2" role="group" aria-label="มุมมอง">
                {views.map((v) => (
                  <button key={v.id} type="button" onClick={() => s.setView(v.id)} aria-pressed={s.viewPreset === v.id}
                    className={`rounded-lg border py-3 text-xs font-medium tracking-wider ${s.viewPreset === v.id ? 'border-neon text-neon' : 'border-line text-mist hover:border-mist'}`}>
                    {v.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" disabled title="เร็วๆ นี้" className="btn-ghost"><Camera className="h-4 w-4" /> AR TRY ON</button>
                <button type="button" onClick={share} className="btn-ghost"><Share2 className="h-4 w-4" /> SHARE</button>
              </div>
              <p className="text-xs text-mist">AR TRY ON ยังไม่เปิดใช้งาน</p>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="rounded-lg border border-neon p-4">
                <p className="text-xs tracking-widest text-mist">YOUR PIECE ID</p>
                <p className="font-graffiti text-2xl text-neon">{s.pieceId || 'CUSTOM-0000'}</p>
              </div>
              <dl className="grid grid-cols-[110px_1fr] gap-y-2 text-sm">
                <dt className="text-mist">Form</dt><dd>{getModelName(s.selectedModel)}</dd>
                <dt className="text-mist">Material</dt><dd>{getMaterialName(s.selectedMaterial, s.selectedColor)}</dd>
                <dt className="text-mist">Graffiti</dt><dd>{hasPattern ? 'มีลาย' : 'สีพื้น'}</dd>
                <dt className="text-mist">Price</dt><dd className="text-neon">฿{BASE_PRICE.toLocaleString()}</dd>
              </dl>
              <label className="block text-sm">
                <span className="mb-1 block text-mist">SIGNATURE (ไม่เกิน 24 ตัวอักษร)</span>
                <input className="field" value={s.signature} onChange={(e) => s.setSignature(e.target.value)} placeholder="ATHIP" maxLength={24} />
              </label>
              <label className="flex items-start gap-2 text-sm text-mist">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 accent-[#b6ff00]" />
                ฉันยอมรับระยะเวลาผลิต 7–14 วัน และเข้าใจว่าเป็นสินค้าสั่งทำเฉพาะ
              </label>
              <button type="button" disabled={!agree} onClick={addAndGo} className="btn-neon w-full">
                <ShoppingCart className="h-5 w-5" /> ADD TO CART
              </button>
            </div>
          )}

          {notice && <p role="status" className="text-xs text-pink">{notice}</p>}

          <footer className="mt-auto flex justify-between border-t border-line pt-4">
            <button type="button" className="btn-ghost" onClick={() => go(step - 1)} disabled={step === 0}><ArrowLeft className="h-4 w-4" /> BACK</button>
            {step < STEPS.length - 1 && <button type="button" className="btn-neon" onClick={() => go(step + 1)}>NEXT <ArrowRight className="h-4 w-4" /></button>}
          </footer>
        </section>
      </div>
    </div>
  );
}
