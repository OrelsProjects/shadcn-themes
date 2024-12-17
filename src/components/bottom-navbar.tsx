"use client";

import * as React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import CopyCode from "@/components/copy-code";
import { ThemesDialog } from "@/components/themes-dialog";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TWITTER_URL, LINKEDIN_URL, SUBSTACK_URL } from "@/lib/consts";

export function BottomNavbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      // springy
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
      <Card className="w-fit h-16 bg-background/80 backdrop-blur-md border border-border/80 shadow-sm px-6 py-2 flex items-center gap-4">
        <CopyCode />
        <ThemesDialog />
        <Separator orientation="vertical" />
        <Button variant="outline" asChild>
          <Link
            href={TWITTER_URL}
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter />
          </Link>
        </Button>
        <Button variant="outline" asChild className="hidden md:block">
          <Link
            href={LINKEDIN_URL}
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            href={SUBSTACK_URL}
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="text-white"
              viewBox="0 0 16 16"
            >
              <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z" />
            </svg>
          </Link>
        </Button>
      </Card>
    </motion.div>
  );
}
