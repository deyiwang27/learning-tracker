import type { ProgressMap, Task } from '../types';
import { isTaskCompleted } from '../utils/progress';

interface ProgressGridProps {
  tasks: Task[];
  progress: ProgressMap;
}

export function ProgressGrid({ tasks, progress }: ProgressGridProps) {
  return (
    <div className="w-full rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.55)]">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
        Completion Progress
      </p>

      <div className="mt-6 inline-grid grid-cols-8 gap-px bg-slate-200 p-px">
        {tasks.map((task) => {
          const completed = isTaskCompleted(progress, task.id);

          return (
            <div
              key={task.id}
              title={`Week ${task.week}, Day ${task.day}: ${task.title}`}
              className={[
                'h-6 w-6 transition sm:h-7 sm:w-7',
                completed
                  ? 'bg-emerald-500'
                  : 'bg-[#0000FF]',
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
