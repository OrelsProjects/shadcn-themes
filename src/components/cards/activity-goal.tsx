"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart } from "recharts";

import { Button } from "@/components/ui-demo/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui-demo/card";
import { ChartConfig, ChartContainer } from "@/components/ui-demo/chart";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui-demo/dialog";
import { Slider } from "@/components/ui-demo/slider";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

const chartConfig = {
  goal: {
    label: "Goal",
    theme: {
      light: "hsl(var(--primary-demo))",
      dark: "hsl(var(--primary-demo))",
    },
  },
} satisfies ChartConfig;

export function CardsActivityGoal() {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Move Goal</CardTitle>
        <CardDescription>Set your daily activity goal.</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(-10)}
            disabled={goal <= 200}
          >
            <Minus />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-5xl font-bold tracking-tighter">{goal}</div>
            <div className="text-[0.70rem] uppercase text-muted-demo-foreground">
              Calories/day
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(10)}
            disabled={goal >= 400}
          >
            <Plus />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <div className="my-3 h-[60px]">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-full w-full"
          >
            <BarChart data={data}>
              <Bar dataKey="goal" radius={4} fill="var(--color-goal)" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger className="w-full">Set Goal</DialogTrigger>
          <DialogContent>
            <DialogHeader className="w-full flex justify-center text-xl">
              <DialogTitle>Goal: {goal}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <Slider
                value={[goal]}
                max={400}
                step={10}
                min={200}
                className="w-full"
                onValueChange={(value: number[]) => {
                  setGoal(value[0]);
                }}
              />
              <div className="flex justify-between flex-col items-center mt-4 gap-2">
                <DialogClose asChild>
                  <Button onClick={() => setGoal(goal)} className="w-1/2">
                    Save
                  </Button>
                </DialogClose>
                <Button
                  variant="outline"
                  onClick={() => setGoal(350)}
                  className="w-1/2"
                >
                  Reset
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
