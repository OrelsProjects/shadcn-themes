"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeType } from "@/models/palette";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { getThemeColor } from "@/lib/utils";
import { selectPalette } from "@/lib/features/theme/paletteSlice";

export default function ThemePreviewer() {
  const {
    selectedPalette,
    selectedPaletteName,
    selectedThemeType,
    allPalettes,
  } = useAppSelector(state => state.palette);

  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen flex flex-col">
      {/* shadcn Components Section (3/5 of the screen) */}
      <div className="flex-grow min-h-[60vh] p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">shadcn Components Preview</h1>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Update your account information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@shadcn" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Theme Preview Section (2/5 of the screen) */}
      <div className="h-[40vh] bg-muted p-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Theme Previews</h2>
        <div className="flex space-x-4">
          {Object.entries(allPalettes).map(([paletteName, palette]) => (
            <Card key={paletteName} className="w-64 flex-shrink-0">
              <CardHeader>
                <CardTitle>
                  {paletteName
                    .split("-")
                    .map(x => x[0].toUpperCase() + x.slice(1))
                    .join(" ")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <div
                      className="w-full h-8 rounded"
                      style={{
                        backgroundColor: getThemeColor(
                          "foreground",
                          palette[selectedThemeType],
                        ),
                      }}
                    />
                    <p className="text-xs">Primary</p>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="w-full h-8 rounded"
                      style={{
                        backgroundColor: getThemeColor(
                          "secondary",
                          palette[selectedThemeType],
                        ),
                      }}
                    />
                    <p className="text-xs">Secondary</p>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="w-full h-8 rounded"
                      style={{
                        backgroundColor: getThemeColor(
                          "background",
                          palette[selectedThemeType],
                        ),
                      }}
                    />
                    <p className="text-xs">Background</p>
                  </div>
                  <div className="space-y-2">
                    <div
                      className="w-full h-8 rounded"
                      style={{
                        backgroundColor: getThemeColor(
                          "accent",
                          palette[selectedThemeType],
                        ),
                      }}
                    />
                    <p className="text-xs">Accent</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => dispatch(selectPalette({ name: paletteName }))}
                >
                  Select Theme
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      {/* <div className="fixed top-4 right-4">
        <Select
          value={currentTheme}
          onValueChange={(value: ThemeType) => setCurrentTheme(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
    </div>
  );
}
