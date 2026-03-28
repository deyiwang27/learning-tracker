import type { ProgressMap, Task, TaskCategory } from '../types';
import { formatPlanDate } from '../utils/date';

interface TaskDetailPageProps {
  task: Task | null;
  progress: ProgressMap;
  onBack: (taskId?: string) => void;
  onToggle: (taskId: string) => void;
}

const CATEGORY_STYLES: Record<TaskCategory, string> = {
  speaking: 'bg-amber-100 text-amber-800',
  listening: 'bg-sky-100 text-sky-800',
  interview: 'bg-emerald-100 text-emerald-800',
  coding: 'bg-violet-100 text-violet-800',
};

export function TaskDetailPage({ task, progress, onBack, onToggle }: TaskDetailPageProps) {
  if (!task) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.55)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Task Detail
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Task not found</h1>
          <button
            type="button"
            onClick={() => onBack()}
            className="mt-6 rounded-full border border-amber-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50"
          >
            Back to Homepage
          </button>
        </div>
      </main>
    );
  }

  const isCompleted = Boolean(progress[task.id]?.completed);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[1.75rem] border border-white/60 bg-white/85 p-8 shadow-[0_24px_90px_-45px_rgba(15,23,42,0.75)] backdrop-blur">
        <button
          type="button"
          onClick={() => onBack(task.id)}
          className="rounded-full border border-amber-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50"
        >
          Back to Homepage
        </button>

        <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Week {task.week} · Day {task.day} · Task #{task.taskNumber}
            </p>
            <h1 className="font-serif text-4xl text-slate-900">{task.title}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
                {formatPlanDate(task.date)}
              </span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${CATEGORY_STYLES[task.category]}`}>
                {task.category}
              </span>
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => onToggle(task.id)}
              className="h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            Mark complete
          </label>
        </div>

        <section className="mt-10 rounded-[1.5rem] border border-amber-100 bg-amber-50/80 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Task Description
          </p>
          <p className="mt-4 text-base leading-8 text-slate-700">{task.description}</p>
        </section>

        <section className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Task Detail
          </p>
          <p className="mt-4 text-base leading-8 text-slate-700">{task.detail}</p>
        </section>
      </div>
    </main>
  );
}
