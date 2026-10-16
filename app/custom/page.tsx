import type { Metadata } from 'next';
import CustomLab from '@/components/lab/CustomLab';

export const metadata: Metadata = { title: 'CUSTOM LAB | ATHIP 475' };

export default function CustomPage() {
  return <CustomLab />;
}
