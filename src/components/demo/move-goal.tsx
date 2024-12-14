"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Minus, Plus } from "lucide-react";
import { ThemePalette } from "@/models/palette";
import { getThemeColor } from "@/lib/utils";
import { useState } from "react";

const data = [
  { goal: 300 },
  { goal: 250 },
  { goal: 400 },
  { goal: 350 },
  { goal: 300 },
  { goal: 350 },
  { goal: 350 },
  { goal: 400 },
  { goal: 300 },
  { goal: 350 },
  { goal: 300 },
  { goal: 350 },
];

interface MoveGoalProps {
  theme: ThemePalette;
}

export function MoveGoal({ theme }: MoveGoalProps) {
  const [currentCalories, setCurrentCalories] = useState(350);

  return (
    <Card
      style={{
        backgroundColor: getThemeColor("card", theme),
        color: getThemeColor("card-foreground", theme),
      }}
    >
      <CardHeader>
        <CardTitle className="text-sm font-medium">Move Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="text-sm"
          style={{ color: getThemeColor("muted-foreground", theme) }}
        >
          Set your daily activity goal:
        </div>
        <div className="flex items-center justify-between my-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentCalories(currentCalories - 50)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="text-4xl font-bold">{currentCalories}</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentCalories(currentCalories + 50)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div
          className="text-xs text-center mb-4"
          style={{ color: getThemeColor("muted-foreground", theme) }}
        >
          CALORIES/DAY
        </div>
        <div className="h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar
                dataKey="goal"
                fill={getThemeColor("chart-3", theme)}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Button className="w-full mt-4" variant="default">
          Set Goal
        </Button>
      </CardContent>
    </Card>
  );
}
