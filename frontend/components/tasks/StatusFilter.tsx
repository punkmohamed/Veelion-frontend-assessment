import type { TaskFilter } from "@/types/api";
import { CheckCircle2, Circle, LayoutGrid } from "lucide-react";

const FILTERS: Array<{ label: string; value: TaskFilter; Icon: typeof LayoutGrid }> = [
  { label: "All", value: "all", Icon: LayoutGrid },
  { label: "Completed", value: "completed", Icon: CheckCircle2 },
  { label: "Pending", value: "pending", Icon: Circle },
];

type StatusFilterProps = {
  value: TaskFilter;
  onChange: (value: TaskFilter) => void;
};

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <section aria-label="Filter tasks by status" className="card section-padding">
      <div className="filter-pill-row">
        {FILTERS.map((filter) => {
          const active = filter.value === value;
          const { Icon } = filter;

          return (
            <button
              key={filter.value}
              type="button"
              className={active ? "button filter-pill primary" : "button filter-pill"}
              onClick={() => onChange(filter.value)}
              aria-pressed={active}
            >
              <Icon size={17} strokeWidth={active ? 2.25 : 2} aria-hidden />
              {filter.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
