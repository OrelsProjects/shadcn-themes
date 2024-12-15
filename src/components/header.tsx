import React, { useState, useEffect } from "react";
import { Lamp, Menu, Moon, Sun, X } from "lucide-react";
import Logo from "@/components/logo";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";

const Header = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const [isPressed, setIsPressed] = useState(false);
  const controls = useAnimation();

  const handleMouseDown = () => {
    setIsPressed(true);
    controls.start({
      y: 10,
      transition: {
        type: "spring",
        duration: 0.3,
      },
    });
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    controls.start({
      y: [20, -15, 0], // Overshoot upward then settle
      transition: {
        type: "spring",
        duration: 0.1,
      },
    });
  };
  const handleThemeChange = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 flex justify-center items-center h-16 border-b border-border bg-background/70 backdrop-blur-md shadow-md py-2`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Logo />
        <div className="flex flex-row gap-2">
          {/* <motion.div
            animate={controls}
            initial={{ y: 0 }}
            onClick={handleThemeChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => isPressed && handleMouseUp()}
          >
            <Button variant="outline" className="hover:bg-muted/60">
              <Lamp className="w-4 h-4" />
            </Button>
          </motion.div> */}
          <div className="flex flex-col">
            <kbd className="w-fit pointer-events-none h-5 select-none items-center gap-1 rounded border bg-background p-2 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <p className="text-xs">Press L to Light</p>{" "}
              <Sun className="w-4 h-4" />
            </kbd>
            <span className="text-xs text-muted flex flex-row gap-1 items-center mt-1">
              (Some themes may have only <Sun className="h-3 w-3" /> or{" "}
              <Moon className="h-3 w-3" /> mode)
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
