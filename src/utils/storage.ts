import type { ProgressMap } from '../types';

export const START_DATE_KEY = 'learning_start_date';
export const PROGRESS_KEY = 'learning_progress_v1';

function isBrowserAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getStoredStartDate(): string | null {
  if (!isBrowserAvailable()) {
    return null;
  }

  return window.localStorage.getItem(START_DATE_KEY);
}

export function saveStartDate(startDateIso: string): void {
  if (!isBrowserAvailable()) {
    return;
  }

  window.localStorage.setItem(START_DATE_KEY, startDateIso);
}

export function getStoredProgress(): ProgressMap {
  if (!isBrowserAvailable()) {
    return {};
  }

  const rawValue = window.localStorage.getItem(PROGRESS_KEY);

  if (!rawValue) {
    return {};
  }

  try {
    const parsed = JSON.parse(rawValue) as ProgressMap;
    return parsed ?? {};
  } catch {
    return {};
  }
}

export function saveProgress(progress: ProgressMap): void {
  if (!isBrowserAvailable()) {
    return;
  }

  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function resetStoredTracker(): void {
  if (!isBrowserAvailable()) {
    return;
  }

  window.localStorage.removeItem(START_DATE_KEY);
  window.localStorage.removeItem(PROGRESS_KEY);
}
