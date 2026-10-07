"use client";
import { useCartStore } from '@/store/cart';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity } = useCartStore();

  // คำนวณราคารวมของทุกชิ้นในตะกร้า
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // แปลงที่อยู่ไฟล์ให้เป็นชื่อที่อ่านง่าย
  const getModelName = (path: string) => {
    if (path.includes('1.glb')) return 'แก้วไม้';
    if (path.includes('2.glb')) return 'กล่องไม้';
    if (path.includes('3.glb')) return 'ต้าวหลาม';
    if (path.includes('4.glb')) return 'หลามน้อย';
    if (path.includes('mask.glb')) return 'หน้ากาก';
    return 'สินค้าสั่งทำพิเศษ';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 text-gray-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">ตะกร้าสินค้า</h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
            <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-500 mb-6">ตะกร้าสินค้าของคุณว่างเปล่า</h2>
            <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
              <ArrowLeft className="w-5 h-5" /> กลับไปออกแบบสินค้า
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ฝั่งซ้าย: รายการสินค้าในตะกร้า */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  
                  {/* ภาพจำลองสีสินค้า */}
                  <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center border-2" style={{ borderColor: item.color }}>
                    <div className="w-12 h-12 rounded-full shadow-inner" style={{ backgroundColor: item.color }}></div>
                  </div>
                  
                  {/* รายละเอียด */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{getModelName(item.model)}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      สี: <span className="uppercase">{item.color}</span> | 
                      ลาย: {item.pattern ? 'มีลายตกแต่ง' : 'ไม่มีลาย'}
                    </p>
                    <div className="text-blue-600 font-bold mt-2">฿{item.price.toFixed(2)}</div>
                  </div>

                  {/* ปุ่มปรับจำนวนและลบ */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition-colors">-</button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition-colors">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-2 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ฝั่งขวา: สรุปยอด */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold mb-6">สรุปคำสั่งซื้อ</h2>
                
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>จำนวนสินค้า</span>
                    <span>{items.reduce((sum, item) => sum + item.quantity, 0)} ชิ้น</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>ค่าจัดส่ง</span>
                    <span>คำนวณในขั้นตอนถัดไป</span>
                  </div>
                  <div className="border-t pt-3 mt-3 flex justify-between items-end">
                    <span className="font-bold text-gray-800">ยอดรวมทั้งหมด</span>
                    <span className="text-2xl font-black text-blue-600">฿{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                  ดำเนินการชำระเงิน <ArrowRight className="w-5 h-5" />
                </Link>
                
                <button onClick={() => router.push('/')} className="w-full mt-3 flex items-center justify-center gap-2 text-gray-500 py-3 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium">
                  กลับไปเลือกสินค้าเพิ่ม
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}