export const STEP_COUNT = 6;

export default function StepNav({ current, onSelect }: { current: number; onSelect: (i: number) => void }) {
  return (
    <ol className="mx-auto flex max-w-2xl items-center" aria-label="ขั้นตอนการออกแบบ">
      {Array.from({ length: STEP_COUNT }, (_, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={i} className="flex flex-1 items-center last:flex-none">
            <button type="button" onClick={() => onSelect(i)} aria-current={active ? 'step' : undefined} aria-label={`ขั้นที่ ${i + 1}`}
              className={`dot ${active ? 'dot-active' : done ? 'dot-done' : ''}`}>
              {String(i + 1).padStart(2, '0')}
            </button>
            {i < STEP_COUNT - 1 && (
              <span aria-hidden className="mx-2 h-px flex-1" style={{ background: done ? 'linear-gradient(90deg,#b6ff00,#b6ff0033)' : 'repeating-linear-gradient(90deg,#3a434b 0 4px,transparent 4px 8px)' }} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
