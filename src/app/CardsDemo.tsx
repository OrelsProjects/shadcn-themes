import { BottomNavbar } from "@/components/bottom-navbar";
import { CardsActivityGoal } from "@/components/cards/activity-goal";
import { CardsCalendar } from "@/components/cards/calendar";
import { CardsChat } from "@/components/cards/chat";
import { CardsCookieSettings } from "@/components/cards/cookie-settings";
import { CardsCreateAccount } from "@/components/cards/create-account";
import { CardsDataTable } from "@/components/cards/data-table";
import { CardsMetric } from "@/components/cards/metric";
import { CardsPaymentMethod } from "@/components/cards/payment-method";
import { CardsReportIssue } from "@/components/cards/report-issue";
import { CardsShare } from "@/components/cards/share";
import { CardsStats } from "@/components/cards/stats";
import { CardsTeamMembers } from "@/components/cards/team-members";
import { Button } from "@/components/ui-demo/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { changeBaseThemeType } from "@/lib/features/theme/paletteSlice";
import { cn } from "@/lib/utils";
import { useAnimation, motion } from "framer-motion";
import { LampDesk, Moon, Sun } from "lucide-react";
import { useMemo, useState } from "react";

const TIME_TO_CHANGE_THEME = 200;

export function CardsDemo() {
  const { baseThemeType, selectedThemeType } = useAppSelector(
    state => state.palette,
  );

  const lightDarkText = useMemo(() => {
    if (baseThemeType === "light") {
      return "Dark";
    }
    return "Light";
  }, [baseThemeType]);

  const dispatch = useAppDispatch();
  const [isPressed, setIsPressed] = useState(false);
  const [currentY, setCurrentY] = useState(0); // Track the current Y position
  const [timeToChangeTheme, setTimeToChangeTheme] = useState(new Date());
  const controls = useAnimation();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (new Date() < timeToChangeTheme) return;
    setIsPressed(true);
    const newY = currentY + 6; // Incrementally increase the downward movement
    setCurrentY(newY); // Update the state
    controls.start({
      y: newY,
      transition: {
        type: "spring",
        duration: 0.1,
      },
    });
  };

  const handleMouseUp = () => {
    if (new Date() < timeToChangeTheme) return;
    setIsPressed(false);
    controls.start({
      y: [currentY, 0], // Overshoot and return to the initial position
      transition: {
        type: "spring",
        duration: 0.2,
      },
    });
    setCurrentY(0); // Reset position to 0
  };

  const handleThemeChange = () => {
    if (new Date() < timeToChangeTheme) return;
    setTimeToChangeTheme(new Date(Date.now() + TIME_TO_CHANGE_THEME));
    dispatch(changeBaseThemeType());
  };

  return (
    <div className="relative md:container w-full h-full bg-background-demo rounded-lg border border-foreground/10 sm:border-foreground/30 px-0 pb-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full h-full flex flex-col gap-4 relative"
      >
        <div className="sticky top-4 sm:top-0 w-full flex justify-center sm:justify-between bg-background-demo items-center p-4 px-8 rounded-t-lg border-b border-foreground-demo/80 z-10">
          <motion.div
            id="header"
            animate={controls}
            initial={{ y: 0 }}
            onClick={handleThemeChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => isPressed && handleMouseUp()}
          >
            <Button
              variant={"outline"}
              className="shadow-lg ring-foreground-demo/0"
            >
              <LampDesk className="!w-7 !h-7 !sm:w-5 sm:!h-5 text-foreground-demo" />
            </Button>
          </motion.div>
          <div
            className={cn(
              "w-fit p-4 pointer-events-none h-5 select-none items-center gap-1 rounded border border-foreground-demo/20 bg-background-demo font-mono text-[10px] font-medium opacity-100 hidden sm:flex",
              {
                "border-foreground-demo/60": baseThemeType === "light",
              },
            )}
          >
            <p className="text-sm text-foreground-demo">
              Hold <kbd className="border border-border p-1 px-2">L</kbd> to{" "}
              {lightDarkText}
            </p>{" "}
            {baseThemeType === "dark" && (
              <Sun className="w-4 h-4 text-foreground-demo" />
            )}
            {baseThemeType === "light" && (
              <Moon className="w-4 h-4 text-foreground-demo" />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center md:grid md:grids-col-2 md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4 px-8">
          <div className="space-y-4 lg:col-span-4 xl:col-span-6 xl:space-y-4">
            <CardsStats />
            <div className="grid gap-1 sm:grid-cols-[260px_1fr] md:hidden">
              <CardsCalendar />
              <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-4">
                <CardsActivityGoal />
              </div>
              <div className="pt-3 sm:col-span-2 xl:pt-4">
                <CardsMetric />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="space-y-4 xl:space-y-4">
                <CardsTeamMembers />
                <CardsCookieSettings />
                <CardsPaymentMethod />
              </div>
              <div className="space-y-4 xl:space-y-4">
                <CardsChat />
                <CardsCreateAccount />
                <div className="hidden xl:block">
                  <CardsReportIssue />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
            <div className="hidden gap-1 sm:grid-cols-[260px_1fr] md:grid">
              <CardsCalendar />
              <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-3">
                <CardsActivityGoal />
              </div>
              <div className="pt-3 sm:col-span-2 xl:pt-3">
                <CardsMetric />
              </div>
            </div>
            <div className="hidden md:block">
              <CardsDataTable />
            </div>
            <CardsShare />
            <div className="xl:hidden">
              <CardsReportIssue />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
