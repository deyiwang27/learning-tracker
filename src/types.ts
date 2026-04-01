export type TaskCategory =
  | 'workout'
  | 'listening'
  | 'speaking'
  | 'interview'
  | 'immigration'
  | 'coding';

export interface Task {
  id: string;
  taskNumber: number;
  title: string;
  description: string;
  detail: string;
  category: TaskCategory;
  week: number;
  day: number;
  date: string;
}

export interface ProgressEntry {
  completed: boolean;
  completed_at: string;
}

export type ProgressMap = Record<string, ProgressEntry>;

export interface MetricValue {
  completed: number;
  total: number;
}

export interface MetricsSummary {
  daily: MetricValue;
  released: MetricValue;
  overall: MetricValue;
}
