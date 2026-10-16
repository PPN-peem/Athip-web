"use client";
import { useRouter } from 'next/navigation';
import FormStep from './FormStep';

export default function ShopGrid() {
  const router = useRouter();
  return <FormStep onPick={() => router.push('/custom')} />;
}
