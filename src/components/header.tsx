"use client";

import React, { useMemo } from "react";
import Logo from "@/components/logo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = ({ size, sticky }: { size?: "sm" | "md"; sticky?: boolean }) => {
  const pathname = usePathname();
  const isInBlogs = useMemo(() => pathname.includes("/blogs"), [pathname]);

  return (
    <header
      className={cn(
        "w-full transition-all duration-300 flex justify-center items-center h-16 border-b border-border bg-background/70 backdrop-blur-md shadow-md py-2",
        {
          "sticky top-0 z-50": sticky,
        },
      )}
      role="banner"
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center"
        aria-label="Main navigation"
      >
        <Logo size={size} />
        {!isInBlogs && (
          <motion.div whileHover={{ x: 5 }} className="flex flex-col">
            <Link
              href="/blogs"
              className="text-foreground/60 hover:text-foreground/80"
              aria-label="Read more about Shadcn themes and components"
            >
              <span className="flex items-center">
                <span className="hidden sm:block">Read Shadcn Themes Blog</span>
                <span className="block sm:hidden">Blogs</span>
                <ArrowRight className="ml-2" aria-hidden="true" />
              </span>
            </Link>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;
