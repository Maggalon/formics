import { cn } from '../utils/cn';
import { ScaleButton } from './ScaleButton';
import { useOpinionScale } from '../hooks/useOpinionScale';

interface OpinionScaleProps {
    min?: number;
    max?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    labels?: {
      start: string;
      end: string;
    };
    className?: string;
}

export function OpinionScale({
  min = 0,
  max = 10,
  defaultValue,
  onChange,
  labels = {
    start: 'Not likely at all',
    end: 'Extremely likely'
  },
  className
}: OpinionScaleProps) {
  const { selectedValue, handleSelect } = useOpinionScale({
    defaultValue,
    onChange
  });

  const values = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const totalValues = values.length;
  
  return (
    <div className={cn('w-full max-w-lg', className)}>
      <div className="flex flex-col justify-between mb-4 text-sm text-white/70">
        <span>{min} → {labels.start}</span>
        <span>{max} → {labels.end}</span>
      </div>
      
      <div className="flex flex-wrap gap-1 justify-center mx-auto">
        {values.map((value, index) => (
          <div
            key={value}
            className={cn(
              'flex justify-center basis-[calc(33.333%-4px)] sm:basis-[calc(25%-4px)] md:basis-[calc(16.666%-4px)] lg:basis-[calc(9.09%-4px)]',
              // Center the last row items
              index >= totalValues - (totalValues % 3) && 'last-row-center'
            )}
          >
            <ScaleButton
              value={value}
              isSelected={selectedValue === value}
              onClick={() => handleSelect(value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}