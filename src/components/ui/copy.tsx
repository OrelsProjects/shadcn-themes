"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import React from "react";

export interface CopyProps {
  text: string;
  className?: string;
}

export default function CopyComponent({ text, className }: CopyProps) {
  const [didCopy, setDidCopy] = React.useState(false);
  const didCopyTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const handleCopy = () => {
    if (didCopyTimeout.current) {
      clearTimeout(didCopyTimeout.current);
    }
    navigator.clipboard.writeText(text);
    setDidCopy(true);

    didCopyTimeout.current = setTimeout(() => {
      setDidCopy(false);
    }, 2000);
  };

  return (
    <AnimatePresence mode="popLayout">
      {didCopy ? (
        <motion.span
          key="check"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn("h-4 w-4", className)}
        >
          <Check className="w-full h-full" />
        </motion.span>
      ) : (
        <motion.span
          key="copy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn("h-4 w-4", className)}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            console.log("clicked");
            handleCopy();
          }}
        >
          <Copy className="w-full h-full" />
        </motion.span>
      )}
    </AnimatePresence>
  );
}
