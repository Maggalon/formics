import { Star } from 'lucide-react';
import { cn } from '../utils/cn';
import { useStarRating } from '../hooks/useStarRating';

interface StarRatingProps {
    max?: number;
    value?: number;
    onChange?: (rating: number) => void;
    size?: number;
    readOnly?: boolean;
    className?: string;
}

export function StarRating({
  max = 5,
  value = 0,
  onChange,
  size = 24,
  readOnly = false,
  className,
}: StarRatingProps) {
  const { rating, handleStarClick, handleStarHover, handleMouseLeave, hoveredRating } = 
    useStarRating({ initialValue: value, onChange, readOnly });

  return (
    <div 
      className={cn("flex gap-1", className)}
      onMouseLeave={handleMouseLeave}
    >
      {[...Array(max)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = hoveredRating ? starValue <= hoveredRating : starValue <= rating;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
            className={cn(
              "transition-transform hover:scale-110 focus:outline-none rounded-full",
              readOnly ? "cursor-default" : "cursor-pointer"
            )}
            disabled={readOnly}
            aria-label={`Rate ${starValue} out of ${max} stars`}
          >
            <Star
              size={size}
              className={cn(
                "transition-colors",
                isFilled
                  ? "fill-white text-white"
                  : "fill-transparent text-gray-300"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}