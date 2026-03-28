import type { ProgressMap, Task } from '../types';
import { formatPlanDate } from '../utils/date';
import { isTaskCompleted } from '../utils/progress';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  isReleased: boolean;
  progress: ProgressMap;
  onToggle: (taskId: string) => void;
}

export function TaskList({ tasks, isReleased, progress, onToggle }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/60 p-6 text-sm text-slate-500">
        No task is configured for this selection.
      </div>
    );
  }

  const [firstTask] = tasks;

  if (!isReleased) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/60 p-6 text-sm text-slate-500">
        Week {firstTask.week}, Day {firstTask.day} unlocks on {formatPlanDate(firstTask.date)}.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          taskNumber={index + 1}
          completed={isTaskCompleted(progress, task.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
