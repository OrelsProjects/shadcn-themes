"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, PaintBucket } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/logo";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <Link href="/resources" className="flex items-center gap-2 py-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to resources</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 py-2">
            <Logo withText={false} className="w-5 h-5" />
            <span>Generate Shadcn Themes</span>
          </Link>
          <Link
            href="/resources/tools/contrast-checker"
            className="flex items-center gap-2 py-2"
          >
            <PaintBucket className="h-5 w-5" />
            <span>Contrast Checker</span>
          </Link>
          <Link
            href="/resources/tools/color-converter"
            className="flex items-center gap-2 py-2"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v20M2 12h20" />
            </svg>
            <span>Color Converter</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
