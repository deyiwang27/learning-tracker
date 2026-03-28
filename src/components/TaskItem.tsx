import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  completed: boolean;
  onToggle: (taskId: string) => void;
}

const CATEGORY_STYLES: Record<Task['category'], string> = {
  speaking: 'bg-amber-100 text-amber-800',
  listening: 'bg-sky-100 text-sky-800',
  interview: 'bg-emerald-100 text-emerald-800',
  coding: 'bg-violet-100 text-violet-800',
};

export function TaskItem({ task, completed, onToggle }: TaskItemProps) {
  return (
    <label className="flex cursor-pointer gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.55)] transition hover:border-slate-300">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(task.id)}
        className="mt-1 h-5 w-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Day {task.day}
          </p>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${CATEGORY_STYLES[task.category]}`}>
            {task.category}
          </span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-slate-900">{task.title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{task.content}</p>
      </div>
    </label>
  );
}
