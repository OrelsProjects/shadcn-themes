"use client";

import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemePalette } from "@/models/palette";
import { getThemeColor } from "@/lib/utils";

const data = [
  { value: 2300 },
  { value: 2100 },
  { value: 2400 },
  { value: 2000 },
  { value: 2500 },
  { value: 2200 },
  { value: 2350 },
];

interface SubscriptionsProps {
  theme: ThemePalette;
}

export function Subscriptions({ theme }: SubscriptionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+2350</div>
        <div
          className="text-xs"
          style={{ color: getThemeColor("muted-foreground", theme) }}
        >
          +180.1% from last month
        </div>
        <div className="h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar
                dataKey="value"
                fill={getThemeColor("chart2", theme)}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
