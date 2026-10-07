"use client";
import { useConfiguratorStore } from '@/store/configurator';
import { Palette, Image as ImageIcon, Maximize, Move, RotateCw, Scaling, Box } from 'lucide-react';

const MODELS = [
  { name: 'แก้วไม้', file: '/models/1.glb' },
  { name: 'กล่องไม้', file: '/models/2.glb' },
  { name: 'ต้าวหลาม', file: '/models/3.glb' },
  { name: 'หลามน้อย', file: '/models/4.glb' },
  { name: 'หน้ากาก', file: '/models/mask.glb' },
];

const COLORS = [
  { name: 'ขาว', hex: '#ffffff' },
  { name: 'แดง', hex: '#ef4444' },
  { name: 'น้ำเงิน', hex: '#3b82f6' },
  { name: 'เขียว', hex: '#10b981' },
  { name: 'ส้ม', hex: '#f59e0b' },
  { name: 'ดำ', hex: '#111827' },
];

const PATTERNS = [
  { name: 'สีพื้น (ไม่มีลาย)', file: null },
  { name: 'ลายมาสก์ 1', file: '/patterns/mask1.png' },
  { name: 'ลายมาสก์ 2', file: '/patterns/mask2.png' },
];

export default function ConfiguratorPanel() {
  const { 
    selectedModel, setModel,
    selectedColor, setColor, selectedPattern, setPattern,
    modelScale, setModelScale, patternScale, setPatternScale,
    patternRotation, setPatternRotation, patternOffsetX, patternOffsetY, setPatternOffset
  } = useConfiguratorStore();
  
  const current = COLORS.find((c) => c.hex === selectedColor);

  // ฟังก์ชันช่วยเหลือสำหรับป้องกันค่า NaN เวลาผู้ใช้ลบตัวเลขในช่องพิมพ์จนหมด
  const handleNumberChange = (val: string, setter: (v: number) => void) => {
    const num = parseFloat(val);
    if (!isNaN(num)) setter(num);
  };

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 space-y-8 max-h-[80vh] overflow-y-auto">
      
      {/* 1. เลือกโมเดล */}
      <div>
        <div className="mb-4 flex items-center gap-2 text-lg font-bold">
          <Box className="h-5 w-5" />
          <h2>รูปทรงสินค้า</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {MODELS.map((m) => (
            <button
              key={m.name}
              onClick={() => {
                setModel(m.file);
                // รีเซ็ตค่าทุุกอย่างกลับเป็นค่าเริ่มต้น
                setPatternScale(1);
                setPatternRotation(0);
                setPatternOffset(0, 0); 
              }}
              className={`p-3 rounded-lg border-2 font-medium transition-all ${
                selectedModel === m.file ? 'border-cobalt bg-cobalt/5 text-cobalt' : 'border-ink/10 hover:border-ink/20'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-ink/10" />

      {/* 2. ขนาดโมเดล */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Maximize className="h-5 w-5" />
            <h2>ขนาดโมเดล</h2>
          </div>
          <input 
            type="number" 
            value={modelScale}
            step="0.5"
            onChange={(e) => handleNumberChange(e.target.value, setModelScale)}
            className="w-20 px-2 py-1 text-right border rounded-md text-sm outline-none focus:border-cobalt"
          />
        </div>
        <input 
          type="range" min="1" max="10" step="0.5" 
          value={modelScale} 
          onChange={(e) => setModelScale(parseFloat(e.target.value))}
          className="w-full accent-cobalt cursor-pointer"
        />
      </div>

      <hr className="border-ink/10" />

      {/* 3. สีสินค้า */}
      <div>
        <div className="mb-4 flex items-center gap-2 text-lg font-bold">
          <Palette className="h-5 w-5" />
          <h2>สีสินค้า</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => setColor(c.hex)}
              className={`h-11 w-11 cursor-pointer rounded-full border border-ink/15 transition-shadow ${
                selectedColor === c.hex ? 'ring-2 ring-cobalt ring-offset-2' : 'hover:ring-2 hover:ring-ink/20 hover:ring-offset-2'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      <hr className="border-ink/10" />

      {/* 4. เลือกลาย */}
      <div>
        <div className="mb-4 flex items-center gap-2 text-lg font-bold">
          <ImageIcon className="h-5 w-5" />
          <h2>ลายตกแต่ง</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {PATTERNS.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                setPattern(p.file);
                // รีเซ็ตค่าการปรับลายเมื่อเปลี่ยนลายใหม่
                setPatternScale(1);
                setPatternRotation(0);
                setPatternOffset(0, 0);
              }}
              className={`overflow-hidden rounded-lg border-2 transition-all h-16 relative flex items-center justify-center bg-paper ${
                selectedPattern === p.file ? 'border-cobalt shadow-md' : 'border-transparent hover:border-ink/20'
              }`}
            >
              {p.file ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.file} alt={p.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs text-ink/60 font-medium">ไม่มีลาย</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 5. ปรับแต่งลาย (แสดงเฉพาะเมื่อมีการเลือกลาย) */}
      {selectedPattern && (
        <div className="space-y-5 bg-paper/50 p-4 rounded-xl border border-ink/5 mt-4">
          
          {/* ขยายลาย (สามารถพิมพ์ค่าติดลบเพื่อกลับด้านรูปได้) */}
          <div>
            <div className="flex justify-between items-center text-sm mb-2 font-medium">
              <span className="flex items-center gap-1"><Scaling className="w-4 h-4"/> ขนาดลาย</span>
              <input 
                type="number" step="0.1" value={patternScale} 
                onChange={(e) => handleNumberChange(e.target.value, setPatternScale)}
                className="w-16 px-1 py-1 text-right border rounded-md text-xs outline-none focus:border-cobalt bg-white"
              />
            </div>
            {/* ขยายแถบเลื่อนให้รองรับค่าติดลบ -5 ถึง 5 */}
            <input type="range" min="0.1" max="5" step="0.1" value={patternScale} onChange={(e) => setPatternScale(parseFloat(e.target.value))} className="w-full accent-cobalt cursor-pointer"/>
          </div>
          
          {/* หมุนลาย */}
          <div>
            <div className="flex justify-between items-center text-sm mb-2 font-medium">
              <span className="flex items-center gap-1"><RotateCw className="w-4 h-4"/> หมุนลาย (องศา)</span>
              <input 
                type="number" step="1" value={patternRotation} 
                onChange={(e) => handleNumberChange(e.target.value, setPatternRotation)}
                className="w-16 px-1 py-1 text-right border rounded-md text-xs outline-none focus:border-cobalt bg-white"
              />
            </div>
            {/* ปรับให้หมุนติดลบได้ -360 ถึง 360 */}
            <input type="range" min="-360" max="360" step="1" value={patternRotation} onChange={(e) => setPatternRotation(parseFloat(e.target.value))} className="w-full accent-cobalt cursor-pointer"/>
          </div>

          {/* เลื่อนซ้าย-ขวา */}
          <div>
            <div className="flex justify-between items-center text-sm mb-2 font-medium">
              <span className="flex items-center gap-1"><Move className="w-4 h-4"/> แกน X (ซ้าย-ขวา)</span>
              <input 
                type="number" step="0.1" value={patternOffsetX} 
                onChange={(e) => handleNumberChange(e.target.value, (val) => setPatternOffset(val, patternOffsetY))}
                className="w-16 px-1 py-1 text-right border rounded-md text-xs outline-none focus:border-cobalt bg-white"
              />
            </div>
            <input type="range" min="-3" max="3" step="0.1" value={patternOffsetX} onChange={(e) => setPatternOffset(parseFloat(e.target.value), patternOffsetY)} className="w-full accent-cobalt cursor-pointer"/>
          </div>

          {/* เลื่อนบน-ล่าง */}
          <div>
            <div className="flex justify-between items-center text-sm mb-2 font-medium">
              <span className="flex items-center gap-1"><Move className="w-4 h-4"/> แกน Y (บน-ล่าง)</span>
              <input 
                type="number" step="0.1" value={patternOffsetY} 
                onChange={(e) => handleNumberChange(e.target.value, (val) => setPatternOffset(patternOffsetX, val))}
                className="w-16 px-1 py-1 text-right border rounded-md text-xs outline-none focus:border-cobalt bg-white"
              />
            </div>
            <input type="range" min="-3" max="3" step="0.1" value={patternOffsetY} onChange={(e) => setPatternOffset(patternOffsetX, parseFloat(e.target.value))} className="w-full accent-cobalt cursor-pointer"/>
          </div>

        </div>
      )}

      <button className="mt-4 w-full rounded-xl bg-cobalt py-3 font-medium text-white transition-colors hover:bg-cobalt/90">
        สั่งผลิตสินค้านี้
      </button>
    </div>
  );
}