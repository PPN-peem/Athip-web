"use client";
import { useConfiguratorStore } from '@/store/configurator';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';
import { Palette, Image as ImageIcon, Maximize, Move, RotateCw, Scaling, Box, ShoppingCart } from 'lucide-react';

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
  const router = useRouter();
  
  const { 
    selectedModel, setModel,
    selectedColor, setColor, selectedPattern, setPattern,
    modelScale, setModelScale, patternScale, setPatternScale,
    patternRotation, setPatternRotation, patternOffsetX, patternOffsetY, setPatternOffset
  } = useConfiguratorStore();
  
  const current = COLORS.find((c) => c.hex === selectedColor);

  // ฟังก์ชันช่วยเหลือสำหรับป้องกันค่า NaN เวลาผู้ใช้ลบตัวเลขในช่องพิมพ์จนหมด[cite: 1]
  const handleNumberChange = (val: string, setter: (v: number) => void) => {
    const num = parseFloat(val);
    if (!isNaN(num)) setter(num);
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 space-y-8 max-h-[80vh] overflow-y-auto shadow-sm">
      
      {/* 1. เลือกโมเดล */}
      <div>
        <div className="mb-4 flex items-center gap-2 text-lg font-bold">
          <Box className="h-5 w-5 text-gray-700" />
          <h2>รูปทรงสินค้า</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {MODELS.map((m) => (
            <button
              key={m.name}
              onClick={() => {
                setModel(m.file);
                setColor('#ffffff'); 
                setPattern(null);    
                setModelScale(1);   
                setPatternScale(1);
                setPatternRotation(0);
                setPatternOffset(0, 0);
            }}
              className={`p-3 rounded-xl border-2 font-medium transition-all ${
                selectedModel === m.file ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 hover:border-gray-200 text-gray-600'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* 2. ขนาดโมเดล */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Maximize className="h-5 w-5 text-gray-700" />
            <h2>ขนาดโมเดล</h2>
          </div>
          <input 
            type="number" 
            value={modelScale}
            step="0.1" 
            onChange={(e) => handleNumberChange(e.target.value, setModelScale)}
            className="w-20 px-3 py-1.5 text-right border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <input 
          type="range" min="0.5" max="10" step="0.1" 
          value={modelScale} 
          onChange={(e) => setModelScale(parseFloat(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
      </div>

      <hr className="border-gray-100" />

      {/* 3. สีสินค้า */}
      <div>
        <div className="mb-4 flex items-center gap-2 text-lg font-bold">
          <Palette className="h-5 w-5 text-gray-700" />
          <h2>สีสินค้า</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => setColor(c.hex)}
              className={`h-12 w-12 cursor-pointer rounded-full border border-gray-200 shadow-sm transition-transform hover:scale-110 ${
                selectedColor === c.hex ? 'ring-2 ring-blue-600 ring-offset-2 scale-110' : ''
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* 4. เลือกลาย */}
      <div>
        <div className="mb-4 flex items-center gap-2 text-lg font-bold">
          <ImageIcon className="h-5 w-5 text-gray-700" />
          <h2>ลายตกแต่ง</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {PATTERNS.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                setPattern(p.file);
                // รีเซ็ตค่าการปรับลายเมื่อเปลี่ยนลายใหม่[cite: 1]
                setPatternScale(1);
                setPatternRotation(0);
                setPatternOffset(0, 0);
              }}
              className={`overflow-hidden rounded-xl border-2 transition-all h-20 relative flex items-center justify-center bg-gray-50 ${
                selectedPattern === p.file ? 'border-blue-600 shadow-md' : 'border-transparent hover:border-gray-200'
              }`}
            >
              {p.file ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.file} alt={p.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs text-gray-500 font-medium">ไม่มีลาย</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 5. ปรับแต่งลาย (แสดงเฉพาะเมื่อมีการเลือกลาย) */}
      {selectedPattern && (
        <div className="space-y-6 bg-gray-50/80 p-5 rounded-2xl border border-gray-100 mt-4">
          
          {/* ขยายลาย */}
          <div>
            <div className="flex justify-between items-center text-sm mb-2 font-medium text-gray-700">
              <span className="flex items-center gap-1.5"><Scaling className="w-4 h-4 text-gray-500"/> ขนาดลาย</span>
              <input 
                type="number" step="0.01" value={patternScale} 
                onChange={(e) => handleNumberChange(e.target.value, setPatternScale)}
                className="w-20 px-2 py-1 text-right border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 bg-white"
              />
            </div>
            <input type="range" min="0.01" max="10" step="0.01" value={patternScale} onChange={(e) => setPatternScale(parseFloat(e.target.value))} className="w-full accent-blue-600 cursor-pointer"/>
          </div>
          
          {/* หมุนลาย */}
          <div>
            <div className="flex justify-between items-center text-sm mb-2 font-medium text-gray-700">
              <span className="flex items-center gap-1.5"><RotateCw className="w-4 h-4 text-gray-500"/> หมุนลาย (องศา)</span>
              <input 
                type="number" step="0.5" value={patternRotation} 
                onChange={(e) => handleNumberChange(e.target.value, setPatternRotation)}
                className="w-20 px-2 py-1 text-right border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 bg-white"
              />
            </div>
            <input type="range" min="-360" max="360" step="0.5" value={patternRotation} onChange={(e) => setPatternRotation(parseFloat(e.target.value))} className="w-full accent-blue-600 cursor-pointer"/>
          </div>

          {/* เลื่อนซ้าย-ขวา */}
          <div>
            <div className="flex justify-between items-center text-sm mb-2 font-medium text-gray-700">
              <span className="flex items-center gap-1.5"><Move className="w-4 h-4 text-gray-500"/> แกน X (ซ้าย-ขวา)</span>
              <input 
                type="number" step="0.01" value={patternOffsetX} 
                onChange={(e) => handleNumberChange(e.target.value, (val) => setPatternOffset(val, patternOffsetY))}
                className="w-20 px-2 py-1 text-right border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 bg-white"
              />
            </div>
            <input type="range" min="-5" max="5" step="0.01" value={patternOffsetX} onChange={(e) => setPatternOffset(parseFloat(e.target.value), patternOffsetY)} className="w-full accent-blue-600 cursor-pointer"/>
          </div>

          {/* เลื่อนบน-ล่าง */}
          <div>
            <div className="flex justify-between items-center text-sm mb-2 font-medium text-gray-700">
              <span className="flex items-center gap-1.5"><Move className="w-4 h-4 text-gray-500"/> แกน Y (บน-ล่าง)</span>
              <input 
                type="number" step="0.01" value={patternOffsetY} 
                onChange={(e) => handleNumberChange(e.target.value, (val) => setPatternOffset(patternOffsetX, val))}
                className="w-20 px-2 py-1 text-right border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 bg-white"
              />
            </div>
            <input type="range" min="-5" max="5" step="0.01" value={patternOffsetY} onChange={(e) => setPatternOffset(patternOffsetX, parseFloat(e.target.value))} className="w-full accent-blue-600 cursor-pointer"/>
          </div>

        </div>
      )}

      {/* 6. ปุ่มเพิ่มลงตะกร้าสินค้า (เชื่อมกับ Cart Store แล้ว) */}
      <button 
        onClick={() => {
          const { addToCart } = useCartStore.getState();
          addToCart({
            model: selectedModel,
            color: selectedColor,
            pattern: selectedPattern,
            price: 590, // สามารถเปลี่ยนราคาเริ่มต้นตรงนี้ได้
            quantity: 1
          });
          // พาไปที่หน้าตะกร้า
          router.push('/cart');
        }}
        className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        เพิ่มลงตะกร้าสินค้า
      </button>

    </div>
  );
}