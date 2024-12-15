"use client";

import * as React from "react";
import { Minus, Moon, Plus, Send, Sun } from "lucide-react";

// Upper Section: Import components from /ui-demo
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui-demo/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui-demo/card";
import { cn, getThemeColor } from "@/lib/utils";
import { selectPalette } from "@/lib/features/theme/paletteSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/redux";
import { ParsedPalette } from "@/models/palette";
import { Button } from "@/components/ui-demo/button";

const moveGoalBarHeights = Array.from({ length: 12 }).map(
  () => Math.random() * 100,
);

const subscriptionsData = Array.from({ length: 8 }).map(
  () => Math.random() * 100,
);

// Lower Section: Import components from /ui
import {
  Card as UiCard,
  CardContent as UiCardContent,
  CardHeader as UiCardHeader,
  CardTitle as UiCardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui-demo/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui-demo/select";
import { Input } from "@/components/ui-demo/input";
import { AreaChartComponent } from "@/components/ui-demo/area-chart";
import { Switch } from "@/components/ui-demo/switch";
import { Label } from "@/components/ui-demo/label";
import { useEffect, useRef } from "react";

function CookieSettings() {
  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle>Cookie Settings</CardTitle>
        <p className="text-sm text-muted-foreground">
          Manage your cookie settings here.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <Label
            htmlFor="strictly-necessary"
            className="flex flex-col space-y-1"
          >
            <span>Strictly Necessary</span>
            <span className="text-sm font-normal text-muted-foreground">
              These cookies are essential to use the website and its features.
            </span>
          </Label>
          <Switch id="strictly-necessary" defaultChecked />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="functional" className="flex flex-col space-y-1">
            <span>Functional Cookies</span>
            <span className="text-sm font-normal text-muted-foreground">
              These cookies allow the website to provide personalized
              functionality.
            </span>
          </Label>
          <Switch id="functional" />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="performance" className="flex flex-col space-y-1">
            <span>Performance Cookies</span>
            <span className="text-sm font-normal text-muted-foreground">
              These cookies help to improve the performance of the website.
            </span>
          </Label>
          <Switch id="performance" />
        </div>
        <Button className="w-full">Save preferences</Button>
      </CardContent>
    </Card>
  );
}

const Chat = () => {
  const chatRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [chatValues, setChatValues] = React.useState<any[]>([
    {
      name: "Sofia Davis",
      email: "m@example.com",
      role: "Member",
      message: "Hi, how can I help you today?",
    },
    {
      name: "Jackson Lee",
      email: "p@example.com",
      role: "Owner",
      message: "Hey, I'm having trouble with my account.",
    },
    {
      name: "Isabella Nguyen",
      email: "i@example.com",
      role: "Member",
      message: "I can't log in.",
    },
  ]);

  return (
    <Card className="h-fit w-full">
      <CardContent className="p-0">
        <div className="border-b border-border-demo p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Sofia Davis</div>
              <div className="text-sm text-muted-demo-foreground">
                m@example.com
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[300px] flex-col">
          <div ref={chatRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {chatValues.map(({ message, role }) => (
              <div
                key={message}
                className={cn(
                  {
                    "ml-auto w-fit max-w-[75%] rounded-lg bg-primary-demo px-3 py-2 text-primary-demo-foreground":
                      role === "Owner",
                  },
                  {
                    "w-fit max-w-[75%] rounded-lg bg-muted px-3 py-2":
                      role === "Member",
                  },
                )}
              >
                {message}
              </div>
            ))}
          </div>
          <div className="border-t border-border-demo p-4">
            <form
              className="flex gap-2"
              onSubmit={(e: any) => {
                e.preventDefault();
                const message = e.target?.[0]?.value || "";
                if (!message) return;
                setChatValues([
                  ...chatValues,
                  {
                    name: "You",
                    email: "Love@shadcn.studio",
                    role: "Owner",
                    message,
                  },
                ]);
                // clear the input
                inputRef.current!.value = "";
                setTimeout(() => {
                  chatRef.current?.scrollTo({
                    top: chatRef.current.scrollHeight,
                    behavior: "smooth",
                  });
                }, 50);
              }}
            >
              <Input
                placeholder="Type your message..."
                className="flex-1"
                ref={inputRef}
              />
              <Button size="icon" type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CalendarComponent = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  return (
    <Card className="h-fit w-full">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={date => date && setDate(date)}
          className="w-full"
        />
      </CardContent>
    </Card>
  );
};

const SubscriptionsCard = () => (
  <Card className="h-full w-full">
    <CardHeader>
      <CardTitle className="flex items-baseline justify-between">
        <div>
          <div className="text-sm text-muted-demo-foreground">
            Subscriptions
          </div>
          <div className="text-2xl font-bold">+2350</div>
        </div>
        <div className="text-xs text-secondary-demo">
          +180.1% from last month
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent className="h-full w-full">
      <div className="flex h-[90%] items-end gap-2 pb-16">
        {subscriptionsData.map((height, i) => (
          <div
            key={i}
            className="h-full w-full bg-primary-demo"
            style={{
              height: `${height}%`,
            }}
          />
        ))}
      </div>
    </CardContent>
  </Card>
);

const MoveGoalCard = () => (
  <Card className="h-fit w-full">
    <CardHeader>
      <CardTitle>
        <div className="text-lg font-semibold text-foreground-demo">
          Move Goal
        </div>
        <div className="text-sm text-muted-demo-foreground">
          Set your daily activity goal.
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon">
          <Minus className="h-4 w-4" />
        </Button>
        <div className="text-center">
          <div className="text-5xl font-bold text-foreground-demo">350</div>
          <div className="text-xs text-muted-demo-foreground">CALORIES/DAY</div>
        </div>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4 flex h-[60px] items-end gap-1">
        {moveGoalBarHeights.map((height, i) => (
          <div
            key={i}
            className="w-full bg-primary-demo"
            style={{
              height: `${height}%`,
            }}
          />
        ))}
      </div>
      <Button className="mt-4 w-full">Set Goal</Button>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const { selectedPalette, selectedThemeType } = useAppSelector(
    state => state.palette,
  );

  const hasDarkTheme = Object.keys(selectedPalette.colors.dark).length > 0;
  const hasLightTheme = Object.keys(selectedPalette.colors.light).length > 0;

  return (
    <div className="relative container w-full h-full bg-background-demo rounded-lg border border-foreground/30 p-2">
      <div className="absolute space-x-1 -top-5 right-2 flex gap-1">
        {hasLightTheme && (
          <Sun
            className={cn("w-3.5 h-3.5 text-foreground/50", {
              "text-foreground": selectedThemeType === "light" || !hasDarkTheme,
            })}
          />
        )}
        {hasDarkTheme && (
          <Moon
            className={cn("w-3.5 h-3.5 text-foreground/50", {
              "text-foreground": selectedThemeType === "dark" || !hasLightTheme,
            })}
          />
        )}
      </div>
      <div className="w-full grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto">
        <div className="flex flex-col justify-start items-center w-full gap-6">
          {/* Revenue Card */}
          <Card className="h-fit w-full">
            <CardHeader>
              <CardTitle className="flex items-baseline justify-between">
                <div>
                  <div className="text-sm text-muted-demo-foreground">
                    Total Revenue
                  </div>
                  <div className="text-2xl font-bold">$15,231.89</div>
                </div>
                <div className="text-xs text-secondary-demo">
                  +20.1% from last month
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-full w-full relative">
                <AreaChartComponent />
              </div>
            </CardContent>
          </Card>

          {/* Subscriptions Card */}
          <SubscriptionsCard />

          {/* Calendar Card */}
          <CalendarComponent />
        </div>
        <div className="flex flex-col justify-start items-center w-full gap-6">
          {/* Goal Setting Card */}
          <MoveGoalCard />

          {/* Chat Card */}
          <Chat />

          {/* Team Members Card */}
          <Card className="h-fit w-full">
            <CardHeader>
              <CardTitle>
                <div className="text-lg font-semibold text-muted-demo-foreground">
                  Team Members
                </div>
                <div className="text-sm text-muted-demo-foreground">
                  Invite your team members to collaborate.
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Sofia Davis",
                  email: "m@example.com",
                  role: "Owner",
                },
                {
                  name: "Jackson Lee",
                  email: "p@example.com",
                  role: "Member",
                },
                {
                  name: "Isabella Nguyen",
                  email: "i@example.com",
                  role: "Member",
                },
              ].map(member => (
                <div
                  key={member.email}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32`}
                      />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map(n => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground-demo">
                        {member.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {member.email}
                      </div>
                    </div>
                  </div>
                  <Select defaultValue={member.role.toLowerCase()}>
                    <SelectTrigger className="w-[110px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col justify-start items-center w-full gap-6">
          {/* Exercise Minutes Card */}
          <Card className="h-fit w-full">
            <CardHeader>
              <CardTitle>
                <div className="text-lg font-semibold">Exercise Minutes</div>
                <div className="text-sm text-muted-demo-foreground">
                  Your exercise minutes are ahead of where you normally are.
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                {/* Simple line representation */}
                <div className="relative h-full w-full">
                  <div className="absolute bottom-0 left-0 h-[2px] w-full bg-border-demo" />
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-border-demo" />
                  {/* First line */}
                  <div className="absolute bottom-[20%] left-[10%] h-2 w-2 rounded-full bg-primary-demo" />
                  <div className="absolute bottom-[40%] left-[30%] h-2 w-2 rounded-full bg-primary-demo" />
                  <div className="absolute bottom-[60%] left-[50%] h-2 w-2 rounded-full bg-primary-demo" />
                  <div className="absolute bottom-[30%] left-[70%] h-2 w-2 rounded-full bg-primary-demo" />
                  <div className="absolute bottom-[45%] left-[90%] h-2 w-2 rounded-full bg-primary-demo" />
                  {/* Second line */}
                  <div className="absolute bottom-[30%] left-[10%] h-2 w-2 rounded-full bg-muted-demo-foreground" />
                  <div className="absolute bottom-[50%] left-[30%] h-2 w-2 rounded-full bg-muted-demo-foreground" />
                  <div className="absolute bottom-[80%] left-[50%] h-2 w-2 rounded-full bg-muted-demo-foreground" />
                  <div className="absolute bottom-[40%] left-[70%] h-2 w-2 rounded-full bg-muted-demo-foreground" />
                  <div className="absolute bottom-[55%] left-[90%] h-2 w-2 rounded-full bg-muted-demo-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Settings Card */}
          <div
            id="colors"
            className="w-full h-fit flex flex-row gap-2 overflow-x-auto pb-2"
          >
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <CookieSettings />
        </div>
      </div>

      {/* Bottom Palettes section */}
      {/* <PalettesSection onHeightChange={onHeightChange} /> */}
    </div>
  );
}
