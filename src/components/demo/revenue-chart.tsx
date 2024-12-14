"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemePalette } from "@/models/palette";
import { getThemeColor } from "@/lib/utils";

const data = [
  { value: 14200 },
  { value: 14750 },
  { value: 14400 },
  { value: 14250 },
  { value: 14300 },
  { value: 14500 },
  { value: 15231.89 },
];

interface RevenueChartProps {
  theme: ThemePalette;
}

export function RevenueChart({ theme }: RevenueChartProps) {
  console.log("rerendering RevenueChart");
  return (
    <Card
      style={{
        backgroundColor: getThemeColor("card", theme),
        color: getThemeColor("card-foreground", theme),
      }}
    >
      <CardHeader>
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$15,231.89</div>
        <div
          className="text-xs"
          style={{ color: getThemeColor("muted-foreground", theme) }}
        >
          +20.1% from last month
        </div>
        <div className="h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={getThemeColor("chart-1", theme)}
                strokeWidth={2}
                dot={{ r: 4, fill: getThemeColor("chart-1", theme) }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
