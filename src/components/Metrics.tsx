import type { MetricsSummary } from '../types';

interface MetricsProps {
  releasedDayCount: number;
  totalDayCount: number;
  statusText: string;
  metrics: MetricsSummary;
}

const METRIC_ITEMS = [
  { key: 'overall', label: 'Overall' },
  { key: 'released', label: 'Released' },
  { key: 'daily', label: 'Daily' },
] as const;

export function Metrics({ releasedDayCount, totalDayCount, statusText, metrics }: MetricsProps) {
  return (
    <section className="grid items-start gap-4 md:grid-cols-4">
      <article className="rounded-[1.75rem] bg-amber-300 p-5 text-slate-950 shadow-[0_20px_60px_-35px_rgba(217,119,6,0.55)]">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm uppercase tracking-[0.18em] text-amber-900/70">Progress</p>
            <p className="mt-3 text-sm text-amber-950/80">{statusText}</p>
          </div>
          <p className="shrink-0 text-[2.75rem] leading-none font-semibold">
            {releasedDayCount}
            <span className="text-amber-900/40">/</span>
            {totalDayCount}
          </p>
        </div>
      </article>

      {METRIC_ITEMS.map((item) => {
        const value = metrics[item.key];
        return (
          <article
            key={item.key}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.55)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                <p className="mt-3 text-sm text-slate-500">
                  {value.total === 0 ? 'No tasks yet.' : `${Math.round((value.completed / value.total) * 100)}% complete`}
                </p>
              </div>
              <p className="shrink-0 text-[2.75rem] leading-none font-semibold text-slate-900">
                {value.completed}
                <span className="text-slate-300">/</span>
                {value.total}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
