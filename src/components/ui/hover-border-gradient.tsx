"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  showAnimation = true,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    showAnimation?: boolean;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = !showAnimation
    ? {
        TOP: "",
        LEFT: "",
        BOTTOM: "",
        RIGHT: "",
      }
    : {
        TOP: "radial-gradient(80.7% 50% at 50% 0%, hsl(49, 80%, 70%) 40%, rgba(255, 255, 255, 0) 100%)",
        LEFT: "radial-gradient(46.6% 43.1% at 0% 50%, hsl(49, 80%, 70%) 40%, rgba(255, 255, 255, 0) 100%)",
        BOTTOM:
          "radial-gradient(80.7% 50% at 50% 100%, hsl(49, 80%, 70%) 40%, rgba(255, 255, 255, 0) 100%)",
        RIGHT:
          "radial-gradient(46.2% 41.2% at 100% 50%, hsl(49, 80%, 70%) 40%, rgba(255, 255, 255, 0) 100%)",
      };

  const highlight =
    "radial-gradient(89% 181.15942028985506% at 50% 50%, hsl(49, 80%, 70%) 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered && showAnimation) {
      const interval = setInterval(() => {
        setDirection(prevState => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise, showAnimation]);

  // If showAnimation is false, we display a static background with no changes.
  const staticBackground = movingMap["TOP"]; // You can choose another direction if you prefer.

  return (
    <Tag
      onMouseEnter={() => showAnimation && setHovered(true)}
      onMouseLeave={() => showAnimation && setHovered(false)}
      className={cn(
        "relative flex rounded-full border border-border/40 content-center bg-background/20 hover:bg-background/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-[2px] decoration-clone w-fit",
        { "p-0": !showAnimation },
        containerClassName,
      )}
      {...props}
    >
      <div className={cn("w-auto z-10 rounded-[inherit]", className)}>
        {children}
      </div>
      {showAnimation ? (
        <motion.div
          className={cn(
            "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]",
          )}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            filter: hovered
              ? "blur(2px) drop-shadow(0 0 10px hsl(39, 80%, 50%))"
              : "blur(2px)",
          }}
          initial={{ background: movingMap[direction] }}
          animate={{
            background: hovered
              ? [movingMap[direction], highlight]
              : movingMap[direction],
          }}
          transition={{ ease: "linear", duration: duration ?? 1 }}
        />
      ) : (
        // Static, non-animated background when showAnimation is false
        <div
          className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: staticBackground,
            filter: "blur(2px)",
          }}
        />
      )}
      <div className="bg-background absolute z-1 flex-none inset-[2px] rounded-[100px]" />
    </Tag>
  );
}
