import { cn } from '../utils/cn';

interface ScaleButtonProps {
    value: number;
    isSelected: boolean;
    onClick: () => void;
}

export function ScaleButton({ value, isSelected, onClick }: ScaleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-12 h-12 rounded-lg transition-all duration-200 text-lg font-medium',
        'focus:outline-none text-gray-700',
        isSelected
          ? 'bg-white/70'
          : 'bg-white/30'
      )}
    >
      {value}
    </button>
  );
}