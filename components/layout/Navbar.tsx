"use client";
import Link from 'next/link';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useEffect, useState } from 'react';


const LINKS = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/products', label: 'แคตตาล็อกสินค้า' },
  { href: '/contact-us', label: 'ติดต่อเรา' },
];

export default function Navbar() {
  // ดึงข้อมูลสินค้าทั้งหมดจาก Store
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  // ป้องกัน Hydration Error ของ Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  // คำนวณจำนวนชิ้นรวมทั้งหมดในตะกร้า
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* ฝั่งซ้าย: โลโก้ */}
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          ATHIP<span className="font-light text-ink/60">DESIGN</span>
        </Link>

        {/* ตรงกลาง: เมนู */}
        <div className="hidden md:flex space-x-8">
          {LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ฝั่งขวา: ตะกร้าสินค้า และปุ่มเมนูมือถือ */}
        <div className="flex items-center space-x-4">
          
          {/* ปุ่มตะกร้า */}
          <Link 
            href="/cart" 
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-colors bg-white"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="font-medium text-sm">
              {/* ถ้าหน้าเว็บโหลดเสร็จแล้ว ให้โชว์ตัวเลขตะกร้า ถ้ายังให้โชว์ 0 */}
              {mounted ? cartCount : 0}
            </span>
          </Link>

          {/* ปุ่ม Menu (แฮมเบอร์เกอร์) สำหรับหน้าจอมือถือ */}
          <button className="md:hidden text-gray-600 hover:text-blue-600 p-2">
            <Menu className="w-6 h-6" />
          </button>

        </div>
      </nav>
    </header>
  );
}