import type { Category } from '../types';

interface TabsProps {
  categories: readonly Category[];
  activeCategory: Category;
  onChange: (category: Category) => void;
}

const CATEGORY_LABELS: Record<Category, string> = {
  speaking: 'Speaking',
  listening: 'Listening',
  interview: 'Interview',
  coding: 'Coding',
};

export function Tabs({ categories, activeCategory, onChange }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = category === activeCategory;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={[
              'rounded-full px-4 py-2 text-sm font-semibold transition',
              isActive
                ? 'bg-slate-950 text-white shadow-[0_10px_30px_-15px_rgba(15,23,42,0.8)]'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900',
            ].join(' ')}
          >
            {CATEGORY_LABELS[category]}
          </button>
        );
      })}
    </div>
  );
}
