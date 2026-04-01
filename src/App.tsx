import { useEffect, useState } from 'react';
import tasksData from './data/tasks.json';
import { DoveLogo } from './components/DoveLogo';
import { Metrics } from './components/Metrics';
import { ProgressGrid } from './components/ProgressGrid';
import { TaskDetailPage } from './components/TaskDetailPage';
import { Tabs, type TabOption } from './components/Tabs';
import { TaskList } from './components/TaskList';
import type { ProgressMap, Task } from './types';
import {
  getTodayDateKey,
  PLAN_DAYS_PER_WEEK,
  PLAN_END_DATE,
  PLAN_LAST_DAY,
  PLAN_LENGTH_DAYS,
  PLAN_LAST_WEEK,
  PLAN_START_DATE,
  PLAN_WEEK_COUNT,
  formatLongDate,
  formatPlanDate,
  formatWeekday,
} from './utils/date';
import { getMetrics, getReleasedTasks, getTodayTasks, toggleTaskCompletion } from './utils/progress';
import { getStoredProgress, resetStoredTracker, saveProgress } from './utils/storage';

const tasks = tasksData as Task[];
const PENDING_SCROLL_TASK_KEY = 'pending_scroll_task_id';

type AppRoute =
  | { page: 'home' }
  | { page: 'task'; taskId: string };

const WEEK_OPTIONS: TabOption<number>[] = Array.from({ length: PLAN_WEEK_COUNT }, (_, index) => ({
  label: `Week ${index + 1}`,
  value: index + 1,
}));

const DAY_OPTIONS: TabOption<number>[] = Array.from({ length: PLAN_DAYS_PER_WEEK }, (_, index) => ({
  label: `Day ${index + 1}`,
  value: index + 1,
}));

function getInitialSelection(todayKey: string): { week: number; day: number } {
  if (todayKey < PLAN_START_DATE) {
    return { week: 0, day: 0 };
  }

  if (todayKey > PLAN_END_DATE) {
    return { week: PLAN_LAST_WEEK, day: PLAN_LAST_DAY };
  }

  const todayTask = getTodayTasks(tasks, todayKey)[0];

  if (todayTask) {
    return { week: todayTask.week, day: todayTask.day };
  }

  const releasedTasks = getReleasedTasks(tasks, todayKey);
  const fallbackTask = releasedTasks[releasedTasks.length - 1] ?? tasks[0];

  return { week: fallbackTask.week, day: fallbackTask.day };
}

function getStatusText(todayKey: string, todayTask: Task | null): string {
  if (todayTask) {
    return `Week ${todayTask.week}, Day ${todayTask.day}`;
  }

  if (todayKey < PLAN_START_DATE) {
    return `Plan opens on ${formatPlanDate(PLAN_START_DATE)}.`;
  }

  if (todayKey > PLAN_END_DATE) {
    return 'The full five-week plan is now visible.';
  }

  return 'No study day is scheduled today. Progress resumes on the next plan day.';
}

function getRouteFromHash(hash: string): AppRoute {
  if (hash.startsWith('#/task/')) {
    return {
      page: 'task',
      taskId: decodeURIComponent(hash.replace('#/task/', '')),
    };
  }

  return { page: 'home' };
}

export default function App() {
  const todayKey = getTodayDateKey();
  const [progress, setProgress] = useState<ProgressMap>(() => getStoredProgress());
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromHash(window.location.hash));
  const initialSelection = getInitialSelection(todayKey);
  const [selectedWeek, setSelectedWeek] = useState<number>(initialSelection.week);
  const [selectedDay, setSelectedDay] = useState<number>(initialSelection.day);

  const todayTask = getTodayTasks(tasks, todayKey)[0] ?? null;
  const releasedTasks = getReleasedTasks(tasks, todayKey);
  const releasedDayCount = new Set(releasedTasks.map((task) => task.date)).size;
  const totalDayCount = new Set(tasks.map((task) => task.date)).size;
  const selectedTasks = tasks.filter((task) => task.week === selectedWeek && task.day === selectedDay);
  const isSelectedTaskReleased = selectedTasks[0] ? selectedTasks[0].date <= todayKey : false;
  const metrics = getMetrics(tasks, todayKey, progress);
  const statusText = getStatusText(todayKey, todayTask);
  const headerWeek = todayKey < PLAN_START_DATE
    ? 0
    : todayKey > PLAN_END_DATE
      ? PLAN_LAST_WEEK
      : (todayTask?.week ?? 0);
  const headerDay = todayKey < PLAN_START_DATE
    ? 0
    : todayKey > PLAN_END_DATE
      ? PLAN_LAST_DAY
      : (todayTask?.day ?? 0);

  const handleToggleTask = (taskId: string) => {
    const nextProgress = toggleTaskCompletion(progress, taskId);
    setProgress(nextProgress);
    saveProgress(nextProgress);
  };

  const handleResetProgress = () => {
    if (!window.confirm('Reset all saved progress and start over?')) {
      return;
    }

    resetStoredTracker();
    window.sessionStorage.removeItem(PENDING_SCROLL_TASK_KEY);
    setProgress({});
  };

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash(window.location.hash));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (route.page !== 'home') {
      return;
    }

    const pendingTaskId = window.sessionStorage.getItem(PENDING_SCROLL_TASK_KEY);

    if (!pendingTaskId) {
      return;
    }

    window.sessionStorage.removeItem(PENDING_SCROLL_TASK_KEY);

    window.requestAnimationFrame(() => {
      document.getElementById(`task-card-${pendingTaskId}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
  }, [route.page, selectedWeek, selectedDay]);

  if (route.page === 'task') {
    const task = tasks.find((item) => item.id === route.taskId) ?? null;

    return (
      <TaskDetailPage
        task={task}
        progress={progress}
        onToggle={handleToggleTask}
        onBack={(taskId) => {
          if (taskId) {
            window.sessionStorage.setItem(PENDING_SCROLL_TASK_KEY, taskId);
          }

          window.location.hash = '';
        }}
      />
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_24px_90px_-45px_rgba(15,23,42,0.75)] backdrop-blur xl:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <DoveLogo />
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
                Learning Tracker
              </p>
            </div>
            <h1 className="mt-4 font-serif text-4xl text-slate-900 sm:text-5xl">
              Nange's Weekly Learning Roadmap
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              This plan covers {PLAN_LENGTH_DAYS} study days in 5 weeks through {formatPlanDate(PLAN_START_DATE)} to {formatPlanDate(PLAN_END_DATE)}.
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-amber-300 px-5 py-4 text-sm text-slate-900 shadow-[0_20px_60px_-35px_rgba(217,119,6,0.55)]">
            <p className="uppercase tracking-[0.18em] text-amber-900/70">Today</p>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-2xl font-semibold text-slate-950">{formatLongDate(todayKey)}</p>
              <span className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-950/70">
                {formatWeekday(todayKey)}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.14em]">
              <span className="rounded-full border border-amber-900/20 bg-white/50 px-3 py-2 text-slate-900">
                Week {headerWeek}
              </span>
              <span className="rounded-full border border-amber-900/20 bg-white/50 px-3 py-2 text-slate-900">
                Day {headerDay}
              </span>
              <button
                type="button"
                onClick={handleResetProgress}
                className="rounded-full border border-amber-900/20 bg-white/50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 transition hover:bg-white/70"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <Metrics
          releasedDayCount={releasedDayCount}
          totalDayCount={totalDayCount}
          statusText={statusText}
          metrics={metrics}
        />
      </section>

      <section className="mt-8 grid gap-8 xl:grid-cols-4 xl:gap-4">
        <div className="space-y-6 xl:col-span-3">
          <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.55)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Task List
              </p>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Week
              </p>
              <Tabs items={WEEK_OPTIONS} activeValue={selectedWeek} onChange={setSelectedWeek} />
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Day
              </p>
              <Tabs items={DAY_OPTIONS} activeValue={selectedDay} onChange={setSelectedDay} />
            </div>
          </div>

          <TaskList
            tasks={selectedTasks}
            isReleased={isSelectedTaskReleased}
            progress={progress}
            onToggle={handleToggleTask}
          />
        </div>

        <div className="xl:col-span-1 xl:flex xl:justify-end">
          <ProgressGrid tasks={releasedTasks} progress={progress} />
        </div>
      </section>
    </main>
  );
}
