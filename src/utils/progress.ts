import type { MetricsSummary, ProgressMap, Task } from '../types';

export function getReleasedTasks(tasks: Task[], currentDay: number): Task[] {
  return tasks.filter((task) => task.day <= currentDay);
}

export function getTodayTasks(tasks: Task[], currentDay: number): Task[] {
  return tasks.filter((task) => task.day === currentDay);
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

export function getMetrics(tasks: Task[], currentDay: number, progress: ProgressMap): MetricsSummary {
  const releasedTasks = getReleasedTasks(tasks, currentDay);
  const todayTasks = getTodayTasks(tasks, currentDay);

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
