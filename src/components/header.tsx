import React from "react";
import Logo from "@/components/logo";

const Header = () => {
  return (
    <nav
      className={`w-full transition-all duration-300 flex justify-center items-center h-16 border-b border-border bg-background/70 backdrop-blur-md shadow-md py-2`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Logo />
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-col">
            <span className="text-xs text-muted flex flex-row gap-1 items-center mt-1"></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
