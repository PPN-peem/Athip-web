import { Check } from 'lucide-react';

export const STEPS = [
  { key: 'form', label: 'FORM', th: 'รูปทรง' },
  { key: 'material', label: 'MATERIAL', th: 'วัสดุ' },
  { key: 'graffiti', label: 'GRAFFITI', th: 'ลาย' },
  { key: 'style', label: 'STYLE', th: 'ปรับแต่ง' },
  { key: 'preview', label: 'PREVIEW', th: '3D' },
  { key: 'signature', label: 'SIGNATURE', th: 'สรุป' },
] as const;

export default function StepNav({ current, onSelect }: { current: number; onSelect: (i: number) => void }) {
  return (
    <ol className="flex items-center justify-between gap-1 overflow-x-auto pb-2" aria-label="ขั้นตอนการออกแบบ">
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.key} className="flex flex-1 items-center">
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-current={active ? 'step' : undefined}
              className="flex flex-col items-center gap-1 px-1 text-[11px] tracking-wider"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${
                  active ? 'border-neon bg-neon text-black' : done ? 'border-neon text-neon' : 'border-line text-mist'
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={active ? 'text-neon' : 'text-mist'}>{s.label}</span>
            </button>
            {i < STEPS.length - 1 && <span className={`mx-1 h-px flex-1 ${done ? 'bg-neon' : 'bg-line'}`} />}
          </li>
        );
      })}
    </ol>
  );
}
