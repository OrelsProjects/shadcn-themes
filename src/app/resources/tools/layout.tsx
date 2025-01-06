"use client";

import CTA from "@/app/resources/tools/contrast-checker/cta";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Crosshair, PaintBucket } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MobileSidebar = () => {
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

export default function Layout({ children }: { children: React.ReactNode }) {
  // its kebab-case, make it PascalCase
  const title = window.location.pathname
    .split("/")
    .pop()
    ?.replace(/-/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <div className="w-full fixed top-0 py-4 z-50 flex justify-start items-center bg-background/30 backdrop-blur-lg px-8">
        <div className="absolute inset-0 transition-transform duration-300 z-10 flex justify-center items-center h-14">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <Button
          variant="ghost"
          className="relative hidden md:flex justify-center w-fit hover:bg-transparent px-0"
          asChild
        >
          <Link href="/">
            <Logo height={36} width={36} textClassName="text-xl" />
          </Link>
        </Button>
      </div>
      {/* Mobile Sidebar */}
      <div className="fixed top-2 left-2 z-50 md:hidden">
        <MobileSidebar />
      </div>
      <main className="mt-12">{children}</main>
      <CTA className="max-md:hidden mb-8" />
    </>
  );
}
