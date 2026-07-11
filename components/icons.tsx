// Minimal inline icon set — 1.5px strokes, sized via className.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function RadarMark({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 3 4 6.5v5c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11v-5L12 3Z" {...base} strokeWidth={2} />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <path d="M12 12l3.2-3.2" {...base} />
    </svg>
  );
}

export function MoonIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M20 13.5A8 8 0 0 1 10.5 4 8 8 0 1 0 20 13.5Z" {...base} />
    </svg>
  );
}

export function SunIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <circle cx="12" cy="12" r="4" {...base} />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" {...base} />
    </svg>
  );
}

export function AlertIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 4 2.8 20h18.4L12 4Z" {...base} />
      <path d="M12 10v4.5" {...base} />
      <circle cx="12" cy="17.3" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function EyeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" {...base} />
      <circle cx="12" cy="12" r="3" {...base} />
    </svg>
  );
}

export function CheckShieldIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M12 3 5 6v5c0 4.5 3 8.4 7 10 4-1.6 7-5.5 7-10V6l-7-3Z" {...base} />
      <path d="m9.2 11.8 2 2 3.8-4" {...base} />
    </svg>
  );
}

export function CheckIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" {...base} strokeWidth={2} />
    </svg>
  );
}

export function FlagIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M5 21V4.5" {...base} />
      <path d="M5 5c2-1.2 4-1.2 6 0s4 1.2 6 0v8c-2 1.2-4 1.2-6 0s-4-1.2-6 0" {...base} />
    </svg>
  );
}

export function QuoteIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path d="M9.5 7.5c-2.5.8-4 2.7-4 5.5v3.5H10V11H7.8c.2-1.5 1-2.4 2.4-2.9l-.7-.6ZM19 7.5c-2.5.8-4 2.7-4 5.5v3.5h4.5V11h-2.2c.2-1.5 1-2.4 2.4-2.9l-.7-.6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
