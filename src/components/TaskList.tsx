import type { ProgressMap, Task } from '../types';
import { isTaskCompleted } from '../utils/progress';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  progress: ProgressMap;
  onToggle: (taskId: string) => void;
}

export function TaskList({ tasks, progress, onToggle }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white/60 p-6 text-sm text-slate-500">
        No released tasks in this category yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          completed={isTaskCompleted(progress, task.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
