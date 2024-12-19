"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import CopyCode from "@/components/copy-code";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TWITTER_URL, LINKEDIN_URL, SUBSTACK_URL } from "@/lib/consts";
import { EventTracker } from "@/eventTracker";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const ThemesDialog = dynamic(
  () => import("@/components/themes-dialog").then(mod => mod.ThemesDialog),
  {
    ssr: false,
    loading: () => <Skeleton className="w-40 h-9" />,
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
      <Card
      aria-label="Theme tools and social links"
      className="w-fit h-16 bg-background/80 backdrop-blur-md border border-border/80 shadow-sm px-6 py-2 flex items-center gap-4">
        <CopyCode />
        <ThemesDialog />
        <Separator orientation="vertical" />
        <div role="list" aria-label="Social links" className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link
              href={TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => EventTracker.track("twitter_clicked")}
              aria-label="Follow us on Twitter for Shadcn theme updates"
            >
              <Twitter aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="hidden md:block">
            <Link
              href={LINKEDIN_URL}
              passHref
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => EventTracker.track("linkedin_clicked")}
              aria-label="Follow us on LinkedIn for Shadcn theme updates"
            >
              <Linkedin aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href={SUBSTACK_URL}
              passHref
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => EventTracker.track("substack_clicked")}
              aria-label="Follow us on Substack for Shadcn theme updates"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                className="text-white"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z" />
              </svg>
            </Link>
          </Button>
        </div>
      </Card>
    </motion.nav>
  );
}
