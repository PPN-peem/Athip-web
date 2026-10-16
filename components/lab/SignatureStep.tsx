"use client";
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { CUSTOM_FEE, formatBaht, getForm, getMaterial, getPattern } from '@/lib/catalog';
import { useConfigurator } from '@/store/configurator';
import { useCartStore } from '@/store/cart';
import { takeSnapshot } from '@/components/three/snapshot';
import BrushButton from '@/components/ui/BrushButton';
import { Sparkle } from '@/components/decor/Graffiti';

export function useSummary() {
  const s = useConfigurator();
  const form = getForm(s.form);
  const mat = getMaterial(s.material);
  const names = [s.layers.graffiti, s.layers.symbol].filter((l) => l.src).map((l) => l.name);
  if (s.layers.text.src && s.text.trim()) names.push(`“${s.text.trim()}”`);
  const colors = new Set<string>();
  [s.layers.graffiti, s.layers.symbol].forEach((l) => {
    const p = l.src ? getPattern(l.src.split('/').pop()?.replace('.png', '')) : null;
    if (p) colors.add(p.colors);
  });
  const materialName = s.material === 'custom' ? `Custom ${s.color.toUpperCase()}` : mat.name[0] + mat.name.slice(1).toLowerCase();
  const hasCustom = names.length > 0 || s.material === 'custom';
  return {
    s, form, materialName,
    graffiti: names.length ? names.join(' + ') : 'None',
    colorLabel: [materialName, ...colors].join(' / '),
    sizeLabel: `${s.size} ${form.unit}`,
    customFee: hasCustom ? CUSTOM_FEE : 0,
  };
}

export default function SignatureStep() {
  const router = useRouter();
  const addToCart = useCartStore((c) => c.addToCart);
  const m = useSummary();
  const [agree, setAgree] = useState(false);

  const add = () => {
    addToCart({
      pieceId: m.s.pieceId || 'CUSTOM-0000',
      form: m.form.id,
      formName: m.form.name,
      materialName: m.materialName,
      colorLabel: m.colorLabel,
      graffiti: m.graffiti,
      size: m.sizeLabel,
      signature: m.s.signature.trim() || undefined,
      thumb: takeSnapshot() ?? undefined,
      basePrice: m.form.price,
      customFee: m.customFee,
      quantity: 1,
    });
    router.push('/cart');
  };

  const rows: [string, string][] = [
    ['Form', m.form.name[0] + m.form.name.slice(1).toLowerCase()],
    ['Material', m.materialName],
    ['Graffiti', m.graffiti],
    ['Color', m.colorLabel],
    ['Size', m.sizeLabel],
    ['Custom fee', m.customFee ? `+${formatBaht(m.customFee)}` : '—'],
  ];

  return (
    <div className="space-y-5">
      <div className="panel relative overflow-hidden p-5">
        <p className="text-xs tracking-[0.2em] text-sky">YOUR PIECE ID</p>
        <p className="mt-2 text-sm text-mist">ATHIP 475</p>
        <p className="neon-text font-graffiti text-3xl">{m.s.pieceId || 'CUSTOM-0000'}</p>
        <p className="text-sm text-mist">1/1</p>
        <Sparkle color="#ffffff" size={64} className="right-6 top-5" />
      </div>

      <div>
        <p className="mb-2 text-xs tracking-[0.2em] text-sky">DETAILS</p>
        <dl className="grid grid-cols-[110px_1fr] gap-y-2 text-sm">
          {rows.map(([k, v], i) => (
            <div key={k} className="enter col-span-2 grid grid-cols-subgrid" style={{ ['--i' as string]: i }}>
              <dt className="text-sky">{k}</dt><dd>: {v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block text-xs text-sky">Add your name / initial (Optional)</span>
        <input className="field" value={m.s.signature} maxLength={24} placeholder="ATHIP" onChange={(e) => m.s.setSignature(e.target.value)} />
      </label>

      <label className="flex items-start gap-3 text-xs text-mist">
        <input type="checkbox" className="check mt-0.5" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        I agree to the production time (7–14 days) and custom policy.
      </label>

      <BrushButton onClick={add} disabled={!agree} className="w-full"><ShoppingCart className="h-5 w-5" /> ADD TO CART →</BrushButton>
    </div>
  );
}
