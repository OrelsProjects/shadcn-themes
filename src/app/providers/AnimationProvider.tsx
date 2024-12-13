"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface ProviderProps {
  children?: React.ReactNode;
}

const AnimationProvider: React.FC<ProviderProps> = ({ children }) => {
  const previousPathame = useRef<string>("");
  const pathname = usePathname();

  useEffect(() => {
    if (previousPathame.current !== pathname) {
      previousPathame.current = pathname;
    }
  }, []);

  return (
    <motion.div
      key={pathname}
      initial="pageInitial"
      animate="pageAnimate"
      exit="pageExit"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
        pageExit: {
          opacity: 0,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationProvider;
