import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME as string;
const LOGO = "/logo.png";

export interface LogoProps {
  animate?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size, className }: LogoProps) {
  const height = useMemo(() => (size === "sm" ? 32 : 36), [size]);
  const width = useMemo(() => (size === "sm" ? 32 : 36), [size]);

  return (
    <Link href="/">
      <div className={cn("flex items-center gap-2", className)}>
        <Image src={LOGO} alt={APP_NAME} width={width} height={height} />
        <span
          className={cn("text-lg font-semibold", {
            "text-xl": size === "md",
          })}
        >
          {APP_NAME}
        </span>
      </div>
    </Link>
  );
}
