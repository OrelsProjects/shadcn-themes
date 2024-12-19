"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Heart } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";
import { useReview } from "@/hooks/useReview";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export function ReviewPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const { submitReview, updateReview, isLoading, error } = useReview();
  const [hasShownReview, setReviewShown] = useLocalStorage(
    "review-shown",
    false,
  );

  useEffect(() => {
    if (hasShownReview) {
      setIsVisible(true);
    }
  }, [hasShownReview]);

  const handleClose = () => {
    setIsOpen(false);
    setIsVisible(false);
    setReviewShown(true);
  };

  const handleRate = async (newRating: number) => {
    setRating(newRating);
    await submitReview({ rating: newRating });
  };

  const handleSubmitComment = async () => {
    if (comment.trim()) {
      await updateReview({ rating, comment });
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        handleClose();
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-1/2 right-4 flex items-center z-[99]"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full mr-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          {isOpen && (
            <Card className="w-72">
              <CardContent className="p-4">
                <div
                  className="w-full flex justify-end"
                  aria-label="Close review popup"
                >
                  <Button variant="outline" size="icon" onClick={handleClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle>Rate Our Product</CardTitle>
                <CardDescription>
                  Help us improve by rating our product
                </CardDescription>
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: rating > 0 ? -280 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <StarRating rating={rating} onRate={handleRate} />
                </motion.div>
                {rating > 0 && (
                  <motion.div
                    initial={{ x: 280, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      delay: 0.2,
                    }}
                  >
                    <Textarea
                      placeholder="Tell us more about your experience..."
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                    <Button
                      className="mt-2 w-full"
                      onClick={handleSubmitComment}
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit"}
                    </Button>
                  </motion.div>
                )}
                {error && <p className="text-destructive mt-2">{error}</p>}
                {showThankYou && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-background/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <Heart className="w-12 h-12 text-destructive mx-auto mb-2" />
                      <p className="text-lg font-semibold">Thank you!</p>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
