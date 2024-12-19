import { useState } from "react";

interface ReviewData {
  rating: number;
  comment?: string;
}

export function useReview() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitReview = async (data: ReviewData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const updateReview = async (data: ReviewData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/review", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update review");
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { submitReview, updateReview, isLoading, error };
}
