"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import CopyCode from "@/components/bottom-navbar/copy-code";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import AdditionalBottomNavbarOptions from "@/components/bottom-navbar/additionalOptions";
import Socials from "@/components/bottom-navbar/socials";
import Randomize from "@/components/bottom-navbar/randomize";

const ThemesDialog = dynamic(
  () =>
    import("@/components/bottom-navbar/themes-dialog").then(
      mod => mod.ThemesDialog,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="w-[50px] sm:w-40 h-9" />,
  },
);
export function BottomNavbar() {
  return (
    <motion.nav
      role="navigation"
      aria-label="Theme tools and social links"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 16,
        stiffness: 100,
        duration: 0.3,
        ease: "easeOut",
        delay: 1,
      }}
      className="sticky bottom-2 sm:bottom-8 left-0 sm:w-full flex justify-center items-center z-40 px-3"
    >
      <Card className="w-fit h-16 bg-background/80 backdrop-blur-md border border-border/80 shadow-sm px-6 py-2 flex items-center gap-4 max-sm:overflow-x-auto">
        <CopyCode />
        <ThemesDialog />
        <Randomize />
        <Separator orientation="vertical" />
        <AdditionalBottomNavbarOptions />
        <Separator orientation="vertical" />
        <Socials />
      </Card>
    </motion.nav>
  );
}
