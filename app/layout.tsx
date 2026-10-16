import type { Metadata } from 'next';
import { Chakra_Petch, Permanent_Marker, Rock_Salt } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const chakra = Chakra_Petch({ subsets: ['thai', 'latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-chakra' });
const marker = Permanent_Marker({ subsets: ['latin'], weight: '400', variable: '--font-marker' });
const salt = Rock_Salt({ subsets: ['latin'], weight: '400', variable: '--font-salt' });

export const metadata: Metadata = {
  title: 'ATHIP 475 | YOUR PIECE. YOUR MARK.',
  description: 'ออกแบบจิวเวลรี่สไตล์ Street × มู × Thai ด้วยตัวเอง ปรับแต่งแบบ 3D ก่อนสั่งผลิตจริง',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${chakra.variable} ${marker.variable} ${salt.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
