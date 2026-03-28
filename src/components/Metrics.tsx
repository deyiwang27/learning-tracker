import type { MetricsSummary } from '../types';

interface MetricsProps {
  currentDay: number;
  metrics: MetricsSummary;
}

const METRIC_ITEMS = [
  { key: 'daily', label: 'Daily' },
  { key: 'released', label: 'Released' },
  { key: 'overall', label: 'Overall' },
] as const;

export function Metrics({ currentDay, metrics }: MetricsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-4">
      <article className="rounded-[1.75rem] bg-slate-950 p-6 text-white shadow-[0_20px_60px_-35px_rgba(15,23,42,0.95)]">
        <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Current Day</p>
        <p className="mt-4 text-5xl font-semibold">{currentDay}</p>
        <p className="mt-3 text-sm text-slate-300">Tasks unlock progressively through day 30.</p>
      </article>

      {METRIC_ITEMS.map((item) => {
        const value = metrics[item.key];
        return (
          <article
            key={item.key}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.55)]"
          >
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
            <p className="mt-4 text-4xl font-semibold text-slate-900">
              {value.completed}
              <span className="text-slate-300">/</span>
              {value.total}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              {value.total === 0 ? 'No tasks yet.' : `${Math.round((value.completed / value.total) * 100)}% complete`}
            </p>
          </article>
        );
      })}
    </section>
  );
}
