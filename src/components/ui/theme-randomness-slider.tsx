import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Sparkles } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { debounce } from "lodash";
import { EventTracker } from "@/eventTracker";

const descriptions = [
  { range: [0, 0], text: "Just shadcn, don't expect any changes" },
  { range: [1, 30], text: "A little bit of spice" },
  { range: [31, 60], text: "Ooh, you're getting adventurous" },
  { range: [61, 90], text: "Shadcn who?" },
  { range: [91, 99], text: "Oh, don't you dare going there" },
  {
    range: [100, 100],
    text: "Alright, we take no responsibility for this atrocity",
  },
];

export function ThemeRandomnessSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const [description, setDescription] = useState("");
  const [hasSeenSlider, setHasSeenSlider] = useLocalStorage(
    "has-seen-slider",
    false,
  );
  const [isFirstTime, setIsFirstTime] = useState(!hasSeenSlider);

  useEffect(() => {
    const currentDescription = descriptions.find(
      ({ range }) => value >= range[0] && value <= range[1],
    );
    setDescription(currentDescription?.text || descriptions[0].text);
  }, [value]);

  const handleValueChange = (newValue: number) => {
    onChange(newValue);
    trackEvent(newValue);
    if (isFirstTime) {
      setHasSeenSlider(true);
      setIsFirstTime(false);
    }
  };

  const trackEvent = debounce(value => {
    EventTracker.track("theme-randomness-slider", {
      value,
    });
  }, 3000);

  return (
    <motion.div
      initial={isFirstTime ? { scale: 0.95, opacity: 0 } : false}
      animate={
        isFirstTime
          ? {
              scale: 1,
              opacity: 1,
              boxShadow: [
                "0 0 0 rgba(124, 58, 237, 0)",
                "0 0 20px hsl(var(--primary))",
              ],
              transition: {
                duration: 1,
              },
            }
          : {
              scale: 1,
              opacity: 1,
              boxShadow: [
                "0 0 20px hsl(var(--primary))",
                "0 0 0 rgba(124, 58, 237, 0)",
              ],
              transition: {
                duration: 1,
              },
            }
      }
      transition={{
        duration: 1,
        repeat: 0,
        repeatType: "reverse",
      }}
      className="w-full space-y-2 rounded-lg bg-card p-4 relative"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Randomness</span>
          <AnimatePresence>
            {isFirstTime && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="text-sm text-muted-foreground">{value}%</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([newValue]) => handleValueChange(newValue)}
        max={100}
        step={1}
        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
      />
      <motion.p
        initial={false}
        animate={{ opacity: 1 }}
        className="text-sm text-muted-foreground italic text-center"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
