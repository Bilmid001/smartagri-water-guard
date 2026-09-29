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
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-[135deg]">
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
      <div className="-mt-24 text-center pointer-events-none">
        <div className="text-4xl font-extrabold" style={{ color }}>{pct}%</div>
        <div className="text-xs uppercase tracking-wider text-earth-500 dark:text-earth-300 font-semibold mt-1">
          Water Need
        </div>
        <div className="mt-2 inline-block px-3 py-0.5 rounded-full text-xs font-bold"
             style={{ background: `${color}20`, color }}>
          {level} IRRIGATION
        </div>
      </div>
    </div>
  );
}