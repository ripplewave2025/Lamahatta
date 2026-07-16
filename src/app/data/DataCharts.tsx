"use client";

type Dist = Record<string, number>;

const PALETTE = [
  "#D4AF37",
  "#1c1917",
  "#78716c",
  "#a8a29e",
  "#b45309",
  "#44403c",
];

function sum(d: Dist) {
  return Object.values(d).reduce((a, b) => a + b, 0) || 1;
}

function entries(d: Dist) {
  return Object.entries(d).filter(([, v]) => v > 0);
}

/** SVG donut — no external chart CDN (avoids failed network fetches). */
export function DonutChart({ data, title }: { data: Dist; title: string }) {
  const items = entries(data);
  const total = sum(data);
  const r = 54;
  const c = 2 * Math.PI * r;
  let offset = 0;

  const segments = items.map(([label, value], i) => {
    const frac = value / total;
    const len = frac * c;
    const seg = {
      label,
      value,
      pct: Math.round(frac * 100),
      color: PALETTE[i % PALETTE.length],
      dash: `${len} ${c - len}`,
      offset,
    };
    offset -= len;
    return seg;
  });

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="relative mx-auto h-44 w-44 shrink-0">
        <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
          <circle
            cx="70"
            cy="70"
            r={r}
            fill="none"
            stroke="#f5f5f4"
            strokeWidth="18"
          />
          {segments.map((s) => (
            <circle
              key={s.label}
              cx="70"
              cy="70"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="18"
              strokeDasharray={s.dash}
              strokeDashoffset={s.offset}
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-serif text-3xl font-light text-stone-900">{total}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
            people
          </span>
        </div>
      </div>
      <ul className="min-w-0 flex-1 space-y-2.5" aria-label={title}>
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="min-w-0 flex-1 text-stone-700">{s.label}</span>
            <span className="shrink-0 tabular-nums font-semibold text-stone-900">
              {s.value}
              <span className="ml-1 text-xs font-normal text-stone-500">{s.pct}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BarChart({ data, color = "#D4AF37" }: { data: Dist; color?: string }) {
  const items = entries(data);
  const total = sum(data);
  const max = Math.max(...items.map(([, v]) => v), 1);

  return (
    <ul className="space-y-4">
      {items.map(([label, value]) => {
        const pct = Math.round((value / total) * 100);
        const width = Math.max(6, (value / max) * 100);
        return (
          <li key={label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
              <span className="text-stone-700">{label}</span>
              <span className="shrink-0 tabular-nums font-semibold text-stone-900">
                {value}
                <span className="ml-1 text-xs font-normal text-stone-500">{pct}%</span>
              </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-stone-100">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${width}%`, backgroundColor: color }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
