interface OnboardingProps {
  onStart: () => void;
}

export function Onboarding({ onStart }: OnboardingProps) {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-12">
      <div className="w-full rounded-[2rem] border border-slate-200/80 bg-white/85 p-8 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur xl:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-700">
          30-day system
        </p>
        <h1 className="mt-4 font-serif text-4xl text-slate-900 sm:text-5xl">
          Build daily momentum across workout, listening, speaking, interview, immigration, and coding.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Start your plan when you are ready. From that date, the tracker unlocks tasks
          day by day, saves your progress locally, and shows how far you have moved.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="mt-10 inline-flex items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Start Plan
        </button>
      </div>
    </section>
  );
}
