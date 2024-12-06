import { useState } from 'react';

interface UseStarRatingProps {
    initialValue: number;
    onChange?: (rating: number) => void;
    readOnly?: boolean;
}

export function useStarRating({ 
  initialValue, 
  onChange, 
  readOnly 
}: UseStarRatingProps) {
  const [rating, setRating] = useState(initialValue);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarClick = (value: number) => {
    if (readOnly) return;
    setRating(value);
    onChange?.(value);
  };

  const handleStarHover = (value: number) => {
    if (readOnly) return;
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoveredRating(0);
  };

  return {
    rating,
    hoveredRating,
    handleStarClick,
    handleStarHover,
    handleMouseLeave,
  };
}