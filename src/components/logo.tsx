"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME as string;
const LOGO = "/logo.png";

export interface LogoProps {
  height?: number;
  width?: number;
  textClassName?: string;
  animate?: boolean;
  className?: string;
  withText?: boolean;
}

export default function Logo({
  height,
  width,
  animate,
  className,
  textClassName,
  withText = true,
}: LogoProps) {
  const animation = animate
    ? {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      }
    : {};

  return (
    <motion.div
      className={cn("flex items-center gap-2", className)}
      {...animation}
    >
      <Image
        src={LOGO}
        alt={APP_NAME}
        width={width || 32}
        height={height || 32}
      />
      {withText && (
        <span
          className={cn("text-lg text-foreground font-semibold", textClassName)}
        >
          {APP_NAME}
        </span>
      )}
    </motion.div>
  );
}
