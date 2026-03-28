type TabValue = number | string;

export interface TabOption<T extends TabValue> {
  label: string;
  value: T;
}

interface TabsProps<T extends TabValue> {
  items: readonly TabOption<T>[];
  activeValue: T;
  onChange: (value: T) => void;
}

export function Tabs<T extends TabValue>({ items, activeValue, onChange }: TabsProps<T>) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
        const isActive = item.value === activeValue;

        return (
          <button
            key={String(item.value)}
            type="button"
            onClick={() => onChange(item.value)}
            className={[
              'rounded-full px-4 py-2 text-sm font-semibold transition',
              isActive
                ? 'bg-amber-300 text-slate-950 shadow-[0_10px_30px_-15px_rgba(217,119,6,0.55)]'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900',
            ].join(' ')}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
