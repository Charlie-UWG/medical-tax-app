// components/SuggestInput.tsx
import { useId } from "react";

interface SuggestInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  required?: boolean;
  className?: string;
}

export const SuggestInput = ({
  label,
  placeholder,
  value,
  onChange,
  suggestions,
  required = false,
  className = "",
}: SuggestInputProps) => {
  const listId = useId();

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <span className="text-xs font-bold text-slate-500">{label}</span>}
      <input
        type="text"
        placeholder={placeholder}
        list={listId}
        className={`p-2 border rounded-md dark:bg-slate-700 dark:text-white dark:border-slate-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
      <datalist id={listId}>
        {suggestions.map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>
    </div>
  );
};
