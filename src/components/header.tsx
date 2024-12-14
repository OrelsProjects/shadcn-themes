import React, { useState, useEffect } from "react";
import { Menu, Sun, X } from "lucide-react";
import Logo from "@/components/logo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Why Me", href: "#why-me" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Plans", href: "#plans" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#plans" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 flex justify-center items-center h-16 border-b border-border bg-background/70 backdrop-blur-md shadow-md py-2`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Logo />
        <div className="flex flex-col">
          <kbd className="w-fit pointer-events-none h-5 select-none items-center gap-1 rounded border bg-background p-2 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <p className="text-xs">Press L to Light</p>{" "}
            <Sun className="w-4 h-4" />
          </kbd>
          <span className="text-xs text-muted">
            (Some themes may not support light mode)
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
