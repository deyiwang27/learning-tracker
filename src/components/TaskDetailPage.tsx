import type { ReactNode } from 'react';
import type { ProgressMap, Task } from '../types';
import { CATEGORY_META } from '../utils/categories';
import { formatPlanDate } from '../utils/date';

interface TaskDetailPageProps {
  task: Task | null;
  progress: ProgressMap;
  onBack: (taskId?: string) => void;
  onToggle: (taskId: string) => void;
}

function renderDetailText(detail: string) {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const renderLineWithLinks = (line: string) => {
    const nodes: ReactNode[] = [];
    let lastIndex = 0;

    for (const match of line.matchAll(urlPattern)) {
      const url = match[0];
      const matchIndex = match.index ?? 0;

      if (matchIndex > lastIndex) {
        nodes.push(line.slice(lastIndex, matchIndex));
      }

      nodes.push(
        <a
          key={`${url}-${matchIndex}`}
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-sky-700 underline underline-offset-4"
        >
          {url}
        </a>,
      );

      lastIndex = matchIndex + url.length;
    }

    if (lastIndex < line.length) {
      nodes.push(line.slice(lastIndex));
    }

    return nodes;
  };

  return detail.split('\n').map((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine === '') {
      return <div key={index} className="h-2" />;
    }

    if (trimmedLine.endsWith(':') && !trimmedLine.includes('http')) {
      return (
        <p key={index} className="pt-1 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
          {trimmedLine}
        </p>
      );
    }

    if (trimmedLine.startsWith('Estimated duration:')) {
      return (
        <p key={index} className="font-semibold text-slate-900">
          {trimmedLine}
        </p>
      );
    }

    if (trimmedLine.startsWith('- ')) {
      const content = trimmedLine.slice(2);

      return (
        <div key={index} className="flex gap-3 pl-1">
          <span className="pt-1 text-slate-400">•</span>
          <p className="min-w-0 break-words">{renderLineWithLinks(content)}</p>
        </div>
      );
    }

    return (
      <p key={index} className="break-words">
        {renderLineWithLinks(line)}
      </p>
    );
  });
}

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
  const categoryMeta = CATEGORY_META[task.category];

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
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryMeta.badgeClassName}`}>
                {categoryMeta.label}
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
          <div className="mt-4 space-y-2 text-base leading-8 text-slate-700">
            {renderDetailText(task.detail)}
          </div>
        </section>
      </div>
    </main>
  );
}
