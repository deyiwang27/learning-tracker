import { useState } from 'react';
import tasksData from './data/tasks.json';
import { Metrics } from './components/Metrics';
import { Onboarding } from './components/Onboarding';
import { ProgressGrid } from './components/ProgressGrid';
import { Tabs } from './components/Tabs';
import { TaskList } from './components/TaskList';
import { CATEGORY_ORDER, type Category, type ProgressMap, type Task } from './types';
import { getCurrentDay, getTodayStartIso } from './utils/date';
import { getMetrics, getReleasedTasks, getTodayTasks, toggleTaskCompletion } from './utils/progress';
import { getStoredProgress, getStoredStartDate, saveProgress, saveStartDate } from './utils/storage';

const tasks = tasksData as Task[];

export default function App() {
  const [startDate, setStartDate] = useState<string | null>(() => getStoredStartDate());
  const [progress, setProgress] = useState<ProgressMap>(() => getStoredProgress());
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORY_ORDER[0]);

  if (!startDate) {
    const handleStartPlan = () => {
      const todayIso = getTodayStartIso();
      saveStartDate(todayIso);
      setStartDate(todayIso);
    };

    return <Onboarding onStart={handleStartPlan} />;
  }

  const currentDay = getCurrentDay(startDate);
  const releasedTasks = getReleasedTasks(tasks, currentDay);
  const todayTasks = getTodayTasks(tasks, currentDay);
  const filteredTasks = releasedTasks.filter((task) => task.category === activeCategory);
  const metrics = getMetrics(tasks, currentDay, progress);

  const handleToggleTask = (taskId: string) => {
    const nextProgress = toggleTaskCompletion(progress, taskId);
    setProgress(nextProgress);
    saveProgress(nextProgress);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_24px_90px_-45px_rgba(15,23,42,0.75)] backdrop-blur xl:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
              Learning Tracker
            </p>
            <h1 className="mt-4 font-serif text-4xl text-slate-900 sm:text-5xl">
              One page to track the next 30 days of deliberate practice.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Released tasks stay visible, today&apos;s task load is easy to scan, and every
              completion is stored in your browser.
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-slate-950 px-5 py-4 text-sm text-slate-200">
            <p className="uppercase tracking-[0.18em] text-slate-400">Today</p>
            <p className="mt-2 text-lg font-semibold text-white">
              Day {currentDay} with {todayTasks.length} task{todayTasks.length === 1 ? '' : 's'} unlocked
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <Metrics currentDay={currentDay} metrics={metrics} />
      </section>

      <section className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.9fr)]">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.55)]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Task List
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Released tasks by category
              </h2>
            </div>
            <Tabs
              categories={CATEGORY_ORDER}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          <TaskList tasks={filteredTasks} progress={progress} onToggle={handleToggleTask} />
        </div>

        <ProgressGrid tasks={releasedTasks} progress={progress} />
      </section>
    </main>
  );
}
