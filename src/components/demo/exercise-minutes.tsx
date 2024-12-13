"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { ThemePalette } from "@/models/palette";
import { getThemeColor } from "@/lib/utils";

const data = [
  { day: "Mon", actual: 150, goal: 200 },
  { day: "Tue", actual: 230, goal: 200 },
  { day: "Wed", actual: 224, goal: 200 },
  { day: "Thu", actual: 218, goal: 200 },
  { day: "Fri", actual: 235, goal: 200 },
  { day: "Sat", actual: 247, goal: 200 },
  { day: "Sun", actual: 190, goal: 200 },
];

interface ExerciseMinutesProps {
  theme: ThemePalette;
}

export function ExerciseMinutes({ theme }: ExerciseMinutesProps) {
  return (
    <Card
      style={{
        backgroundColor: getThemeColor("card", theme),
        color: getThemeColor("card-foreground", theme),
      }}
    >
      <CardHeader>
        <CardTitle className="text-sm font-medium">Exercise Minutes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">247 minutes</div>
        <div
          className="text-xs"
          style={{ color: getThemeColor("muted-foreground", theme) }}
        >
          Your exercise minutes are ahead of where you normally are.
        </div>
        <div className="h-[80px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="actual"
                stroke={getThemeColor("chart4", theme)}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="goal"
                stroke={getThemeColor("chart5", theme)}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
