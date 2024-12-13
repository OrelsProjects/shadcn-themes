import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  textInCenter?: string;
}

export default function Divider({ className, textInCenter }: DividerProps) {
  return (
    <div className="w-full flex flex-row items-center justify-center">
      <div className={cn("w-full h-px bg-muted-foreground/30", className)} />
      {textInCenter && (
        <>
          <div className="mx-2 text-muted-foreground/40">{textInCenter}</div>
          <div
            className={cn(
              "w-full h-px bg-muted-foreground/30",
              className,
            )}
          />
        </>
      )}
    </div>
  );
}
