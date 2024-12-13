"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { ThemePalette } from "@/models/palette";
import { getThemeColor } from "@/lib/utils";
import { useState } from "react";

interface CalendarCardProps {
  theme: ThemePalette;
}

export function CalendarCard({ theme }: CalendarCardProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card
      style={{
        backgroundColor: getThemeColor("card", theme),
        color: getThemeColor("card-foreground", theme),
      }}
    >
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full"
          styles={{
            head_cell: {
              width: "100%",
              color: getThemeColor("muted-foreground", theme),
            },
            cell: {
              width: "100%",
              color: getThemeColor("foreground", theme),
            },
            day: {
              width: "100%",
              color: getThemeColor("foreground", theme),
              backgroundColor: "transparent",
            },
            // day_selected: {
            //   backgroundColor: getThemeColor("primary", theme),
            //   color: getThemeColor("primary-foreground", theme),
            // },
            // day_today: {
            //   color: getThemeColor("accent", theme),
            // },
          }}
        />
      </CardContent>
    </Card>
  );
}
