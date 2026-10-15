"use client";
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { MODELS, BASE_PRICE } from '@/lib/catalog';
import { useConfiguratorStore } from '@/store/configurator';

export default function ProductGrid() {
  const router = useRouter();
  const setModel = useConfiguratorStore((s) => s.setModel);

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {MODELS.map((m) => (
        <li key={m.file} className="card flex flex-col p-5">
          <div className="blueprint mb-4 flex aspect-4/3 items-center justify-center rounded-lg border border-line font-graffiti text-2xl text-neon/70">{m.name}</div>
          <p className="font-bold">{m.name}</p>
          <p className="text-sm text-mist">เริ่มต้น ฿{BASE_PRICE.toLocaleString()}</p>
          <button
            type="button"
            className="btn-ghost mt-4 w-full"
            onClick={() => { setModel(m.file); router.push('/custom'); }}
          >
            DESIGN THIS <ArrowRight className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
