import type { Metadata } from 'next';
import { Anuphan } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

const anuphan = Anuphan({ subsets: ['thai', 'latin'], variable: '--font-anuphan' });

export const metadata: Metadata = {
  title: 'ATHIPDESIGN | ออกแบบสินค้าของคุณเอง',
  description: 'ปรับแต่งสี หมุนดูสินค้าแบบ 3D ก่อนสั่งผลิตจริง',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={anuphan.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
