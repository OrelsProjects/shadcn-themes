import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
}

export function StarRating({ rating, onRate }: StarRatingProps) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Button
          key={star}
          variant="outline"
          onClick={() => onRate(star)}
          className={`focus:outline-none transition-all duration-200 ${
            star <= rating ? "text-yellow-400" : "text-yellow-500"
          }`}
        >
          <Star
            className="w-8 h-8 md:w-10 md:h-10"
            fill={star <= rating ? "currentColor" : "none"}
          />
        </Button>
      ))}
    </div>
  );
}
