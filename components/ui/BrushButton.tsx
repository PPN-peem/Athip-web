import Link from 'next/link';

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  color?: 'neon' | 'pink' | 'blue';
  className?: string;
};

export default function BrushButton({ children, href, onClick, disabled, type = 'button', color = 'neon', className = '' }: Props) {
  const cls = `brush ${color === 'pink' ? 'brush-pink' : color === 'blue' ? 'brush-blue' : ''} ${className}`;
  const inner = (
    <>
      <span className="brush-bg" aria-hidden />
      <span className="brush-label">{children}</span>
    </>
  );
  if (href && !disabled) return <Link href={href} className={cls}>{inner}</Link>;
  return <button type={type} disabled={disabled} onClick={onClick} className={cls}>{inner}</button>;
}
