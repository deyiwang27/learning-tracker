import type { MetricsSummary, ProgressMap, Task } from '../types';

export function getReleasedTasks(tasks: Task[], todayKey: string): Task[] {
  return tasks.filter((task) => task.date <= todayKey);
}

export function getTodayTasks(tasks: Task[], todayKey: string): Task[] {
  return tasks.filter((task) => task.date === todayKey);
}

export function isTaskCompleted(progress: ProgressMap, taskId: string): boolean {
  return Boolean(progress[taskId]?.completed);
}

export function toggleTaskCompletion(progress: ProgressMap, taskId: string): ProgressMap {
  if (progress[taskId]?.completed) {
    const nextProgress = { ...progress };
    delete nextProgress[taskId];
    return nextProgress;
  }

  return {
    ...progress,
    [taskId]: {
      completed: true,
      completed_at: new Date().toISOString(),
    },
  };
}

function getCompletedCount(tasks: Task[], progress: ProgressMap): number {
  return tasks.filter((task) => isTaskCompleted(progress, task.id)).length;
}

export function getMetrics(tasks: Task[], todayKey: string, progress: ProgressMap): MetricsSummary {
  const releasedTasks = getReleasedTasks(tasks, todayKey);
  const todayTasks = getTodayTasks(tasks, todayKey);

  return {
    daily: {
      completed: getCompletedCount(todayTasks, progress),
      total: todayTasks.length,
    },
    released: {
      completed: getCompletedCount(releasedTasks, progress),
      total: releasedTasks.length,
    },
    overall: {
      completed: getCompletedCount(tasks, progress),
      total: tasks.length,
    },
  };
}
