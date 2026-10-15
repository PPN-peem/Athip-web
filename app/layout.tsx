import type { Metadata } from 'next';
import { Kanit, Permanent_Marker } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const kanit = Kanit({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-kanit',
});
const marker = Permanent_Marker({ subsets: ['latin'], weight: '400', variable: '--font-marker' });

export const metadata: Metadata = {
  title: 'ATHIP 475 | YOUR PIECE. YOUR MARK.',
  description: 'ออกแบบจิวเวลรี่สไตล์ Street × มู × Thai ด้วยตัวเอง ปรับแต่งแบบ 3D ก่อนสั่งผลิตจริง',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${kanit.variable} ${marker.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
