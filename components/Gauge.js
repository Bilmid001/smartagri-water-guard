'use client';

export default function Gauge({ value = 0, level = 'LOW' }) {
  const size = 200;
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * c * 0.75; // 270° arc
  const gap = c - dash;

  const color =
    level === 'HIGH' ? '#dc2626' :
    level === 'MEDIUM' ? '#f59e0b' :
    '#16a34a';

  return (
    <div className="flex w-full justify-center overflow-visible">
      <div className="relative h-[200px] w-[200px] shrink-0">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-[135deg]">
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="currentColor"
          className="text-earth-200 dark:text-earth-700"
          strokeWidth={stroke}
          strokeDasharray={`${c * 0.75} ${c}`}
          strokeLinecap="round"
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${dash} ${gap + c}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease, stroke 0.4s ease' }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-2 text-center">
        <div className="text-4xl font-extrabold leading-none" style={{ color }}>{pct}%</div>
        <div className="mt-2 text-[11px] leading-tight uppercase tracking-wider text-earth-500 dark:text-earth-300 font-semibold">
          Water Need
        </div>
        <div className="mt-2 inline-block rounded-full px-3 py-1 text-[10px] leading-tight font-bold"
             style={{ background: `${color}20`, color }}>
          {level} IRRIGATION
        </div>
      </div>
      </div>
    </div>
  );
}
