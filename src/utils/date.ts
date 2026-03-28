export const PLAN_START_DATE = '2026-03-30';
export const PLAN_END_DATE = '2026-05-01';
export const PLAN_WEEK_COUNT = 5;
export const PLAN_DAYS_PER_WEEK = 5;
export const PLAN_LENGTH_DAYS = PLAN_WEEK_COUNT * PLAN_DAYS_PER_WEEK;

function padDatePart(value: number): string {
  return value.toString().padStart(2, '0');
}

export function getTodayDateKey(now: Date = new Date()): string {
  const year = now.getFullYear();
  const month = padDatePart(now.getMonth() + 1);
  const day = padDatePart(now.getDate());

  return `${year}-${month}-${day}`;
}

export function parseDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatPlanDate(dateKey: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).format(parseDateKey(dateKey));
}

export function formatLongDate(dateKey: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(parseDateKey(dateKey));
}

export function formatWeekday(dateKey: string): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
  }).format(parseDateKey(dateKey));
}
