"use client";
import { Box, Camera, Eye, Orbit, Share2 } from 'lucide-react';
import { useState } from 'react';
import { takeSnapshot } from '@/components/three/snapshot';
import { useConfigurator, type ViewPreset } from '@/store/configurator';

const VIEWS: { id: ViewPreset; label: string }[] = [
  { id: 'side', label: 'SIDE' },
  { id: 'back', label: 'BACK' },
  { id: 'top', label: 'TOP' },
];

// คอลัมน์ปุ่มมุมมองด้านขวาของขั้น 05
export function ViewColumn() {
  const view = useConfigurator((s) => s.viewPreset);
  const setView = useConfigurator((s) => s.setView);
  return (
    <div className="grid grid-cols-3 gap-3 lg:grid-cols-1" role="group" aria-label="มุมมอง">
      {VIEWS.map((v, i) => (
        <button key={v.id} type="button" aria-pressed={view === v.id} onClick={() => setView(v.id)}
          className={`tile enter grid aspect-square place-items-center p-2 ${view === v.id ? 'spray' : ''}`} style={{ ['--i' as string]: i }}>
          <span className="flex flex-col items-center gap-2 text-xs tracking-[0.2em] text-mist">
            <Orbit className={`h-7 w-7 ${view === v.id ? 'text-neon' : ''}`} style={{ transform: `rotate(${i * 60}deg)` }} /> {v.label}
          </span>
        </button>
      ))}
    </div>
  );
}

// แถบ 3D VIEW / AR TRY ON / SHARE ด้านล่าง
export function PreviewBar() {
  const view = useConfigurator((s) => s.viewPreset);
  const setView = useConfigurator((s) => s.setView);
  const form = useConfigurator((s) => s.form);
  const [msg, setMsg] = useState('');

  const share = async () => {
    const url = takeSnapshot();
    const text = `ลองดูชิ้นงานที่ฉันออกแบบ #ATHIP475 (${form})`;
    try {
      if (url && navigator.canShare) {
        const blob = await (await fetch(url)).blob();
        const file = new File([blob], 'athip475.jpg', { type: 'image/jpeg' });
        if (navigator.canShare({ files: [file] })) return void (await navigator.share({ files: [file], text }));
      }
      if (navigator.share) return void (await navigator.share({ text, url: window.location.origin + '/custom' }));
      await navigator.clipboard.writeText(`${text} ${window.location.origin}/custom`);
      setMsg('คัดลอกข้อความสำหรับแชร์แล้ว');
    } catch {
      /* ผู้ใช้ยกเลิก */
    }
  };

  return (
    <div className="panel p-4">
      <div className="grid grid-cols-3 gap-3 text-center text-[11px] tracking-[0.2em]">
        <button type="button" aria-pressed={view === 'free'} onClick={() => setView('free')}
          className={`tile flex items-center justify-center gap-2 py-3 text-sm ${view === 'free' ? 'border-sky! text-white shadow-[0_0_16px_rgba(124,196,255,.35)]' : 'text-mist'}`}>
          <Eye className="h-4 w-4" /> 3D VIEW
        </button>
        <button type="button" disabled title="เร็วๆ นี้" className="tile flex items-center justify-center gap-2 py-3 text-sm text-mist opacity-50">
          <Camera className="h-4 w-4" /> AR TRY ON
        </button>
        <button type="button" onClick={share} className="tile flex items-center justify-center gap-2 py-3 text-sm text-mist hover:text-white">
          <Share2 className="h-4 w-4" /> SHARE
        </button>
      </div>
      <p className="mt-2 flex items-center gap-2 text-xs text-mist"><Box className="h-3.5 w-3.5" /> ลากเพื่อหมุน · สกรอลล์เพื่อซูม · AR TRY ON เร็วๆ นี้ {msg && <span className="text-sky">· {msg}</span>}</p>
    </div>
  );
}
