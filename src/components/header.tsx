import React from "react";
import Logo from "@/components/logo";
import Link from "next/link";

const Header = () => {
  return (
    <nav
      className={`w-full transition-all duration-300 flex justify-center items-center h-16 border-b border-border bg-background/70 backdrop-blur-md shadow-md py-2`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Logo />
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-col">
            <Link
              href="/blog/the-shadcn-way"
              className="text-foreground/60 hover:text-foreground/80"
            >
              <span className="hidden sm:block">What is the Shadcn way?</span>
              <span className="block sm:hidden">The Shadcn way</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
