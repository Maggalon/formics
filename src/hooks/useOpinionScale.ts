import { useState, useCallback } from 'react';

interface UseOpinionScaleProps {
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export function useOpinionScale({ defaultValue, onChange }: UseOpinionScaleProps) {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(
    defaultValue
  );

  const handleSelect = useCallback(
    (value: number) => {
      setSelectedValue(value);
      onChange?.(value);
    },
    [onChange]
  );

  return {
    selectedValue,
    handleSelect
  };
}