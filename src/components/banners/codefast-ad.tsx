"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, X } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Link from "next/link";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { EventTracker } from "@/eventTracker";

interface CodeFastAdBannerProps {
  isVertical?: boolean;
  className?: string;
}

export default function CodeFastAdBanner({
  isVertical = false,
  className,
}: CodeFastAdBannerProps) {
  const [userId] = useLocalStorage("shadcn-themes-user-id", "");
  const [isHidden, setIsHidden] = useLocalStorage("codefast-ad-hidden", false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // check every 2 seconds, while localStorage was not set or false, check if it changed.
    let themeClicked = false;

    const interval = setInterval(() => {
      themeClicked = !!localStorage.getItem("theme-clicked");
      if (themeClicked) {
        setShouldRender(themeClicked);
        clearInterval(interval);
      }
    }, 2000);

    setShouldRender(themeClicked);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lastHiddenTime = localStorage.getItem("codefast-ad-hidden-time");
    if (lastHiddenTime) {
      const timeDiff = Date.now() - parseInt(lastHiddenTime, 10);
      if (timeDiff < 365 * 24 * 60 * 60 * 10000) {
        // Less than a year
        setIsHidden(true);
      } else {
        setIsHidden(false);
        localStorage.removeItem("codefast-ad-hidden-time");
      }
    }
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isHidden, shouldRender]);

  const handleClose = () => {
    EventTracker.track("codefast_ad_closed", { userId });
    controls.start({ y: "-100%", transition: { duration: 0.3 } }).then(() => {
      setIsHidden(true);
      localStorage.setItem("codefast-ad-hidden-time", Date.now().toString());
    });
  };

  if (!shouldRender || isHidden) {
    return null;
  }

  if (isMobile) {
    return (
      <AnimatePresence>
        {!isHidden && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 5,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y < -50) {
                handleClose();
              }
            }}
            className={cn("fixed top-0 left-0 right-0 z-50 p-2", className)}
          >
            <Card className="overflow-hidden shadow-lg max-w-sm mx-auto">
              <CardContent className="p-3 flex items-center space-x-3">
                <button
                  onClick={handleClose}
                  className="absolute top-1 right-1 bg-background rounded-full p-1 shadow-md border border-foreground/30 hover:bg-muted"
                  aria-label="Close ad"
                >
                  <X className="w-3 h-3 text-foreground/70" />
                </button>
                <div className="relative flex-shrink-0">
                  <Image
                    src="/marc.webp"
                    alt="Marc Lou"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-foreground/60"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-sm mb-1">
                    Code Like an Entrepreneur
                  </h3>
                  <p className="text-xs text-foreground/80 font-light mb-2">
                    Build projects, earn your first $
                    <span className="text-primary"> in 14 days</span>
                  </p>
                  <Button
                    size="sm"
                    className="bg-primary/90 hover:bg-primary text-foreground text-xs py-1 h-7"
                    asChild
                  >
                    <Link
                      href="https://codefa.st/?via=orel"
                      target="_blank"
                      onClick={() =>
                        EventTracker.track("codefast_ad_clicked", { userId })
                      }
                    >
                      <div className="flex items-center">
                        Learn More
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 5 }}
        >
          <Card
            className={`mx-auto overflow-hidden ${
              isVertical ? "max-w-[300px]" : "max-w-[728px]"
            } ${className || ""}`}
          >
            <CardContent
              className={`p-4 ${
                isVertical
                  ? "flex flex-col items-center space-y-4"
                  : "flex items-center space-x-4"
              }`}
            >
              <button
                onClick={(e: any) => {
                  // stop propagation to prevent the card from closing
                  e.stopPropagation();
                  handleClose();
                }}
                className="absolute top-2 right-2 bg-background rounded-full p-1 shadow-md border border-foreground/30 hover:bg-muted"
                aria-label="Close ad"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>
              <div className="relative">
                <Image
                  src="/marc.webp"
                  alt="Marc Lou"
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-foreground/60"
                />
              </div>
              <div className={`${isVertical ? "text-center" : "flex-grow"}`}>
                <h3 className="font-bold text-lg mb-1">
                  Learn to Code Like an Entrepreneur
                </h3>
                <p className="text-sm text-foreground font-light mb-2">
                  Learn how to build real-world projects and make your first $
                  <span className="text-primary"> in 14 days</span>
                  <br /> with Marc Lou.
                </p>
              </div>
              <div>
                <Button
                  size="sm"
                  className="bg-primary/90 hover:bg-primary text-foreground"
                  asChild
                >
                  <Link
                    href="https://codefa.st/?via=orel"
                    target="_blank"
                    onClick={() => EventTracker.track("codefast_ad_clicked")}
                  >
                    <div className="flex">
                      I want to code!
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
