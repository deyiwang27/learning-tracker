import { useState } from 'react';
import type { Task } from '../types';
import { CATEGORY_META } from '../utils/categories';
import { formatPlanDate } from '../utils/date';

interface TaskItemProps {
  task: Task;
  completed: boolean;
  onToggle: (taskId: string) => void;
}

export function TaskItem({ task, completed, onToggle }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const categoryMeta = CATEGORY_META[task.category];

  return (
    <div
      id={`task-card-${task.id}`}
      className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.55)] transition hover:border-slate-300"
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(task.id)}
        className="mt-1 h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Week {task.week} · Day {task.day} · Task #{task.taskNumber}
            </p>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
              {formatPlanDate(task.date)}
            </span>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryMeta.badgeClassName}`}>
            {categoryMeta.label}
          </span>
        </div>
        <a
          href={`#/task/${encodeURIComponent(task.id)}`}
          className="mt-3 inline-block text-xl font-semibold text-slate-900 transition hover:text-amber-700"
        >
          {task.title}
        </a>
        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          className="mt-2 w-full text-left"
        >
          {isExpanded ? (
            <p className="text-sm leading-7 text-slate-600">{task.description}</p>
          ) : (
            <p className="text-sm font-medium text-slate-400">Show description</p>
          )}
        </button>
      </div>
    </div>
  );
}
