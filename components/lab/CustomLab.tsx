"use client";
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import StepNav, { STEP_COUNT } from './StepNav';
import FormStep from './FormStep';
import { MaterialList, PresetStrip } from './MaterialStep';
import GraffitiStep from './GraffitiStep';
import StyleStep from './StyleStep';
import { PreviewBar, ViewColumn } from './PreviewControls';
import SignatureStep from './SignatureStep';
import DesignCanvas from '@/components/three/DesignCanvas';
import { LabDecor, Scrawl, Sparkle } from '@/components/decor/Graffiti';
import { PATTERNS } from '@/lib/catalog';
import { useConfigurator } from '@/store/configurator';

const HEAD = [
  ['01', 'CHOOSE YOUR FORM', 'เลือกแบบเครื่องประดับที่ต้องการ Custom'],
  ['02', 'MATERIAL', 'เลือกวัสดุ / สีพื้น'],
  ['03', 'GRAFFITI', 'เลือกกราฟฟิตี้ หรือ วาดเอง / อัปโหลด'],
  ['04', 'BREAK THE RULES', 'ปรับตำแหน่ง ขนาด หมุน ความเข้ม และ Layer'],
  ['05', '3D PREVIEW', 'ดูผลงานแบบ 3D หมุนได้ 360°'],
  ['06', 'SIGNATURE', 'สร้างเอกลักษณ์ของคุณ'],
] as const;

// ความกว้างคอลัมน์ของแต่ละขั้น (เขียนเป็นข้อความเต็มเพื่อให้ Tailwind สแกนเจอ)
const COLS = [
  '',
  'lg:grid-cols-[1fr_0.9fr]',
  'lg:grid-cols-[1.1fr_0.9fr]',
  'lg:grid-cols-[0.85fr_1.15fr]',
  'lg:grid-cols-[1fr_170px]',
  'lg:grid-cols-[0.95fr_1.05fr]',
] as const;
const CANVAS_FIRST = [false, true, false, false, true, true] as const;

function Orbit() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-6 grid place-items-center">
      <div className="spin-slow absolute aspect-square w-[88%] rounded-full border border-dashed border-sky/40" />
      <div className="spin-rev absolute aspect-square w-[70%] rounded-full border border-dotted border-neon/30" />
    </div>
  );
}

export default function CustomLab() {
  const [step, setStep] = useState(0);
  const ensurePieceId = useConfigurator((s) => s.ensurePieceId);
  const setLayerSource = useConfigurator((s) => s.setLayerSource);

  const go = (i: number) => {
    const n = Math.min(STEP_COUNT - 1, Math.max(0, i));
    if (n === STEP_COUNT - 1) ensurePieceId();
    setStep(n);
  };

  // ลากลายจากขั้น 03 มาวางบนชิ้นงาน
  const onDrop = (e: React.DragEvent) => {
    const id = e.dataTransfer.getData('text/athip-pattern');
    const p = PATTERNS.find((x) => x.id === id);
    if (!p) return;
    e.preventDefault();
    setLayerSource(p.layer, p.file, p.name);
  };

  const [no, title, th] = HEAD[step];
  const showCanvas = step > 0;

  const canvas = showCanvas && (
    <div key="canvas" onDragOver={(e) => e.preventDefault()} onDrop={onDrop}
      className={`panel blueprint-lite relative overflow-hidden ${step === 4 ? 'h-[420px] sm:h-[520px] lg:h-[560px]' : 'h-[340px] sm:h-[440px] lg:h-[480px]'}`}>
      {(step === 3 || step === 4) && <Orbit />}
      <DesignCanvas />
      {step === 2 && <Scrawl hand color="#b6ff00" className="bottom-4 left-4 text-[11px]">DRAG{'\n'}TO APPLY</Scrawl>}
      {step === 4 && <Scrawl color="#7cc4ff" className="bottom-4 right-4 text-2xl" style={{ ['--r' as string]: '-6deg' }}>MAKE{'\n'}YOUR MARK</Scrawl>}
      <Sparkle color="#7cc4ff" size={22} className="left-4 top-4" />
    </div>
  );

  const panel = (
    <div key={`panel-${step}`} className="enter min-w-0">
      {step === 1 && <MaterialList />}
      {step === 2 && <GraffitiStep />}
      {step === 3 && <StyleStep goTo={go} />}
      {step === 4 && <ViewColumn />}
      {step === 5 && <SignatureStep />}
    </div>
  );

  return (
    <div className="relative">
      <LabDecor />
      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <StepNav current={step} onSelect={go} />

        <header key={`head-${step}`} className="enter mb-6 mt-8">
          <h1 className="text-3xl font-medium tracking-wide sm:text-4xl"><span className="text-white/90">{no}</span> <span className="text-mist">/</span> {title}</h1>
          <p className="th-sub mt-1">{th}</p>
        </header>

        {step === 0 ? (
          <FormStep />
        ) : (
          <div className={`grid items-start gap-5 ${COLS[step]}`}>
            {CANVAS_FIRST[step] ? <>{canvas}{panel}</> : <>{panel}{canvas}</>}
          </div>
        )}

        {step === 1 && <div className="enter mt-5"><PresetStrip /></div>}
        {step === 4 && <div className="enter mt-5"><PreviewBar /></div>}

        <footer className="mt-8 flex items-center justify-between text-sm tracking-[0.2em]">
          <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="flex items-center gap-2 text-sky transition-colors hover:text-white disabled:opacity-30">
            <ArrowLeft className="h-4 w-4" /> BACK
          </button>
          {step < STEP_COUNT - 1 && (
            <button type="button" onClick={() => go(step + 1)} className="flex items-center gap-2 text-white transition-colors hover:text-neon">
              NEXT <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
