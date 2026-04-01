import type { TaskCategory } from '../types';

export const CATEGORY_META: Record<TaskCategory, { label: string; badgeClassName: string }> = {
  workout: {
    label: 'Workout',
    badgeClassName: 'bg-rose-100 text-rose-800',
  },
  listening: {
    label: 'Listening',
    badgeClassName: 'bg-sky-100 text-sky-800',
  },
  speaking: {
    label: 'Speaking',
    badgeClassName: 'bg-amber-100 text-amber-800',
  },
  interview: {
    label: 'Interview',
    badgeClassName: 'bg-emerald-100 text-emerald-800',
  },
  immigration: {
    label: 'Immigration',
    badgeClassName: 'bg-indigo-100 text-indigo-800',
  },
  coding: {
    label: 'Coding',
    badgeClassName: 'bg-violet-100 text-violet-800',
  },
};
