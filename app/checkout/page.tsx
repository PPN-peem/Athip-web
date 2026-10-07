"use client";
import { useConfiguratorStore } from '@/store/configurator';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, Truck, CreditCard } from 'lucide-react';
import { useState } from 'react';

// ชุดข้อมูลสีที่อ้างอิงจากหน้า ConfiguratorPanel
const COLORS = [
  { name: 'ขาว', hex: '#ffffff' },
  { name: 'แดง', hex: '#ef4444' },
  { name: 'น้ำเงิน', hex: '#3b82f6' },
  { name: 'เขียว', hex: '#10b981' },
  { name: 'ส้ม', hex: '#f59e0b' },
  { name: 'ดำ', hex: '#111827' },
];

export default function CheckoutPage() {
  const router = useRouter();
  
  // ดึงข้อมูลการตั้งค่าสินค้าของลูกค้าจาก Zustand[cite: 7]
  const { selectedModel, selectedColor, selectedPattern } = useConfiguratorStore();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    note: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ข้อมูลลูกค้า:", formData);
    console.log("สเปคสินค้า:", { selectedModel, selectedColor, selectedPattern });
    alert("ระบบได้รับคำสั่งซื้อเรียบร้อยแล้ว!");
  };

  const getModelName = (path: string) => {
    if (path.includes('1.glb')) return 'แก้วไม้';
    if (path.includes('2.glb')) return 'กล่องไม้';
    if (path.includes('3.glb')) return 'ต้าวหลาม';
    if (path.includes('4.glb')) return 'หลามน้อย';
    if (path.includes('mask.glb')) return 'หน้ากาก';
    return 'สินค้าสั่งทำ';
  };

  // ฟังก์ชันแปลงรหัสสี (Hex) เป็นชื่อสีภาษาไทย
  const getColorName = (hex: string) => {
    const found = COLORS.find((c) => c.hex.toLowerCase() === hex.toLowerCase());
    return found ? found.name : hex;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> กลับไปแก้ไขการออกแบบ
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Truck className="w-6 h-6 text-blue-600" />
                ข้อมูลการจัดส่ง
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล <span className="text-red-500">*</span></label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="นาย สมชาย ใจดี" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์ <span className="text-red-500">*</span></label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="081-234-5678" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="example@email.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่จัดส่งสินค้า <span className="text-red-500">*</span></label>
                  <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" placeholder="บ้านเลขที่, ซอย, ถนน, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">หมายเหตุเพิ่มเติม (ถ้ามี)</label>
                  <textarea name="note" value={formData.note} onChange={handleChange} rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" placeholder="เช่น ฝากไว้ที่ป้อมยาม..."></textarea>
                </div>

                <button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                  <CheckCircle className="w-5 h-5" />
                  ยืนยันคำสั่งซื้อ
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-blue-600" />
                สรุปคำสั่งซื้อ
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-500">รูปแบบสินค้า</span>
                  <span className="font-semibold">{getModelName(selectedModel)}</span>
                </div>
                
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-500">สีวัสดุ</span>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border border-gray-200 shadow-inner" style={{ backgroundColor: selectedColor }}></div>
                    {/* จุดที่เปลี่ยน: เรียกใช้ getColorName เพื่อแสดงชื่อสีภาษาไทยแทนรหัส Hex */}
                    <span className="font-medium text-sm">{getColorName(selectedColor)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-500">ลายตกแต่ง</span>
                  <span className="font-medium text-right text-sm">
                    {selectedPattern ? (
                      <span className="text-blue-600">มีลายสกรีน</span>
                    ) : (
                      <span className="text-gray-400">สีพื้น (ไม่มีลาย)</span>
                    )}
                  </span>
                </div>

                <div className="pt-4 flex justify-between items-end">
                  <span className="text-lg font-bold text-gray-800">ยอดชำระทั้งหมด</span>
                  <span className="text-2xl font-black text-blue-600">฿590.00</span>
                </div>
                <p className="text-xs text-gray-400 text-right mt-1">* ราคายังไม่รวมค่าจัดส่ง</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}