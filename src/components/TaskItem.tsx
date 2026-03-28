import { useState } from 'react';
import type { Task, TaskCategory } from '../types';
import { formatPlanDate } from '../utils/date';

interface TaskItemProps {
  task: Task;
  taskNumber: number;
  completed: boolean;
  onToggle: (taskId: string) => void;
}

const CATEGORY_STYLES: Record<TaskCategory, string> = {
  speaking: 'bg-amber-100 text-amber-800',
  listening: 'bg-sky-100 text-sky-800',
  interview: 'bg-emerald-100 text-emerald-800',
  coding: 'bg-violet-100 text-violet-800',
};

export function TaskItem({ task, taskNumber, completed, onToggle }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.55)] transition hover:border-slate-300">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(task.id)}
        className="mt-1 h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
      />
      <button
        type="button"
        onClick={() => setIsExpanded((value) => !value)}
        className="min-w-0 flex-1 text-left"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Week {task.week} · Day {task.day} · Task #{taskNumber}
            </p>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
              {formatPlanDate(task.date)}
            </span>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${CATEGORY_STYLES[task.category]}`}>
            {task.category}
          </span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-slate-900">{task.title}</h3>
        {isExpanded ? (
          <p className="mt-2 text-sm leading-7 text-slate-600">{task.content}</p>
        ) : null}
      </button>
    </div>
  );
}
