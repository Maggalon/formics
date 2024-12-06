import { useState, useCallback } from 'react';

interface UseOpinionScaleProps {
  value?: number;
  onChange?: (value: number) => void;
}

export function useOpinionScale({ value, onChange }: UseOpinionScaleProps) {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(
    value
  );

  const handleSelect = useCallback(
    (val: number) => {
      setSelectedValue(val);
      onChange?.(val);
    },
    [onChange]
  );

  return {
    selectedValue,
    handleSelect
  };
}