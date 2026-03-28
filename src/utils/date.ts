const ONE_DAY_MS = 24 * 60 * 60 * 1000;
export const PLAN_LENGTH_DAYS = 30;

export function getStartOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getTodayStartIso(now: Date = new Date()): string {
  return getStartOfDay(now).toISOString();
}

export function getCurrentDay(startDateIso: string, now: Date = new Date()): number {
  const startDate = getStartOfDay(new Date(startDateIso));
  const today = getStartOfDay(now);
  const daysElapsed = Math.floor((today.getTime() - startDate.getTime()) / ONE_DAY_MS);

  return Math.min(PLAN_LENGTH_DAYS, Math.max(1, daysElapsed + 1));
}
