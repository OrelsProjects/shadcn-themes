import React from "react";
import Logo from "@/components/logo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <nav
      className={`w-full transition-all duration-300 flex justify-center items-center h-16 border-b border-border bg-background/70 backdrop-blur-md shadow-md py-2`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Logo />
        <div className="flex flex-row gap-2 items-center">
          <motion.div whileHover={{ x: 5 }} className="flex flex-col">
            <Link
              href="/blogs"
              className="text-foreground/60 hover:text-foreground/80"
            >
              <span className="flex">
                Read more
                <span>
                  <ArrowRight className="ml-2" />
                </span>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
