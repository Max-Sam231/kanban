"use client";

export type PriorityFilter = "ALL" | "HIGH" | "MEDIUM" | "LOW";

type FilterToggleProps = {
  value: PriorityFilter;
  onChange: (value: PriorityFilter) => void;
};

export default function FilterToggle({ value, onChange }: FilterToggleProps) {
  const options: { value: PriorityFilter; label: string }[] = [
    { value: "ALL", label: "📊 Все" },
    { value: "HIGH", label: "🔴 High" },
    { value: "MEDIUM", label: "🟡 Medium" },
    { value: "LOW", label: "🟢 Low" },
  ];

  return (
    <div className="priority-filter">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`priority-filter-button ${
            value === option.value ? "active" : ""
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
