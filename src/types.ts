export const CATEGORY_ORDER = ['speaking', 'listening', 'interview', 'coding'] as const;

export type Category = (typeof CATEGORY_ORDER)[number];

export interface Task {
  id: string;
  title: string;
  content: string;
  category: Category;
  day: number;
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
