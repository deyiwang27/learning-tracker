import type { ProgressMap, Task } from '../types';
import { isTaskCompleted } from '../utils/progress';

interface ProgressGridProps {
  tasks: Task[];
  progress: ProgressMap;
}

export function ProgressGrid({ tasks, progress }: ProgressGridProps) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.55)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Progress Grid
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Released task progress</h2>
        </div>
        <p className="text-sm text-slate-500">{tasks.length} visible task{tasks.length === 1 ? '' : 's'}</p>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-3 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6">
        {tasks.map((task) => {
          const completed = isTaskCompleted(progress, task.id);

          return (
            <div
              key={task.id}
              title={`Day ${task.day}: ${task.title}`}
              className={[
                'aspect-square rounded-2xl border transition',
                completed
                  ? 'border-emerald-300 bg-emerald-500 shadow-[0_10px_30px_-18px_rgba(16,185,129,0.8)]'
                  : 'border-sky-200 bg-sky-500 shadow-[0_10px_30px_-18px_rgba(14,165,233,0.7)]',
              ].join(' ')}
            >
              <span className="sr-only">{task.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
