export type TaskCategory = 'speaking' | 'listening' | 'interview' | 'coding';

export interface Task {
  id: string;
  title: string;
  content: string;
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
