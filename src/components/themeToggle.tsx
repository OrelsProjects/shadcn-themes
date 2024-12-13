"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { EventTracker } from "@/eventTracker";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, theme, systemTheme } = useTheme();

  return (
    <Switch
      // className={cn("w-10", className)}
      defaultChecked={
        theme === "system" ? systemTheme === "dark" : theme === "dark"
      }
      // checkedIcon={<Moon className="h-4 w-4" />}
      // uncheckedIcon={<Sun className="h-4 w-4" />}
      onCheckedChange={checked => {
        setTheme(checked ? "dark" : "light");
        EventTracker.track("theme_toggle", {
          theme: checked ? "dark" : "light",
        });
      }}
    />
  );
}
