// ชิ้นส่วนตกแต่งแบบกราฟฟิตี้ (SVG/ข้อความ) ใช้วางมุมต่างๆ ของแต่ละหน้า
type Pos = { className?: string; style?: React.CSSProperties };

export function Sparkle({ color = '#7cc4ff', size = 28, className = '', style }: Pos & { color?: string; size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 40 40" className={`twinkle pointer-events-none absolute ${className}`} style={{ filter: `drop-shadow(0 0 6px ${color})`, ...style }}>
      <path d="M20 0 L24 16 L40 20 L24 24 L20 40 L16 24 L0 20 L16 16 Z" fill={color} />
    </svg>
  );
}

export function Splat({ color = '#b6ff00', size = 120, className = '', style }: Pos & { color?: string; size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 120 120" className={`floaty pointer-events-none absolute ${className}`} style={{ filter: `drop-shadow(0 0 10px ${color}80)`, ...style }}>
      <g fill={color}>
        <circle cx="52" cy="46" r="30" /><circle cx="84" cy="62" r="18" /><circle cx="30" cy="70" r="14" />
        <circle cx="96" cy="26" r="7" /><circle cx="12" cy="30" r="5" /><circle cx="70" cy="104" r="6" />
        <rect x="46" y="60" width="9" height="46" rx="4.5" /><rect x="78" y="70" width="7" height="30" rx="3.5" />
      </g>
    </svg>
  );
}

export function Slash({ color = '#ff2ba6', className = '', style }: Pos & { color?: string }) {
  return (
    <svg aria-hidden width="160" height="46" viewBox="0 0 160 46" className={`floaty pointer-events-none absolute ${className}`} style={{ filter: `drop-shadow(0 0 8px ${color}99)`, ...style }}>
      <path d="M4 36 C30 30 52 12 80 16 C108 20 126 8 156 6 L152 16 C126 22 110 34 80 32 C52 30 30 42 6 44 Z" fill={color} />
    </svg>
  );
}

export function Scrawl({ children, color = '#7cc4ff', className = '', style, hand = false }: Pos & { children: React.ReactNode; color?: string; hand?: boolean }) {
  return (
    <span aria-hidden className={`floaty pointer-events-none absolute select-none whitespace-pre-line ${hand ? 'font-hand' : 'font-graffiti'} ${className}`} style={{ color, textShadow: `0 0 12px ${color}88`, ...style }}>
      {children}
    </span>
  );
}

// ชุดตกแต่งสำเร็จรูปสำหรับมุมของหน้า Lab (ไม่ขวางการคลิก)
export function LabDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <Splat color="#b6ff00" size={150} className="-right-10 -top-10 opacity-60" style={{ ['--r' as string]: '20deg' }} />
      <Sparkle color="#7cc4ff" size={30} className="right-[8%] top-24" />
      <Sparkle color="#b6ff00" size={22} className="left-[4%] top-[45%]" style={{ ['--d' as string]: '1s' }} />
      <Slash color="#ff2ba6" className="-bottom-3 left-[10%] opacity-80" />
      <Scrawl color="#7cc4ff" className="right-3 top-28 hidden text-2xl xl:block" style={{ ['--r' as string]: '-8deg' }}>MAKE{'\n'}YOUR MARK</Scrawl>
    </div>
  );
}
