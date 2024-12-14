"use client";

import { useMemo, useState } from "react";
import { Button as ButtonDemo } from "@/components/ui-demo/button";
import { Input } from "@/components/ui-demo/input";
import { Label } from "@/components/ui-demo/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui-demo/tabs";
import {
  Card as CardDemo,
  CardContent as CardContentDemo,
  CardDescription as CardDescriptionDemo,
  CardFooter as CardFooterDemo,
  CardHeader as CardHeaderDemo,
  CardTitle as CardTitleDemo,
} from "@/components/ui-demo/card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { cn, getThemeColor } from "@/lib/utils";
import { selectPalette } from "@/lib/features/theme/paletteSlice";
import { ParsedPalette } from "@/models/palette";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui-demo/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui-demo/dropdown-menu";

export default function ThemePreviewer() {
  const { selectedPaletteName, selectedThemeType, allPalettes } =
    useAppSelector(state => state.palette);

  const dispatch = useAppDispatch();

  const ownerToPalettes = useMemo(() => {
    const ownerToPalettesMap = new Map<string, ParsedPalette[]>();
    allPalettes.forEach(palette => {
      const owner = palette.owner;
      if (ownerToPalettesMap.has(owner)) {
        ownerToPalettesMap.get(owner)?.push(palette);
      } else {
        ownerToPalettesMap.set(owner, [palette]);
      }
    });
    console.log(ownerToPalettesMap);
    return ownerToPalettesMap;
  }, [allPalettes]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* shadcn Components Section (3/5 of the screen) */}
      <div className="flex-grow max-h-[50vh] p-6 overflow-y-auto bg-background-demo text-foreground-demo">
        <h1 className="text-3xl font-bold mb-6">shadcn Components Preview</h1>

        <div className="space-y-8 grid  grid-cols-1 md:grid-cols-3 gap-2 ">
          <CardDemo>
            <CardHeaderDemo>
              <CardTitleDemo>Account Settings</CardTitleDemo>
              <CardDescriptionDemo>
                Update your account information.
              </CardDescriptionDemo>
            </CardHeaderDemo>
            <CardContentDemo className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
            </CardContentDemo>
            <CardFooterDemo>
              <Dialog>
                <DialogTrigger asChild>
                  <ButtonDemo>Save Changes</ButtonDemo>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <p className="text-lg font-bold">Are you sure?</p>
                  </DialogHeader>
                  <ButtonDemo>Yes</ButtonDemo>
                  <ButtonDemo variant="outline">No</ButtonDemo>
                </DialogContent>
              </Dialog>
            </CardFooterDemo>
          </CardDemo>

          <Tabs defaultValue="account" className="w-full h-full">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <CardDemo>
                <CardHeaderDemo>
                  <CardTitleDemo>Account</CardTitleDemo>
                  <CardDescriptionDemo>
                    Make changes to your account here. Click save when
                    you&apos;re done.
                  </CardDescriptionDemo>
                </CardHeaderDemo>
                <CardContentDemo className="space-y-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <ButtonDemo variant={"outline"}>Accounts</ButtonDemo>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem> User </DropdownMenuItem>
                      <DropdownMenuItem> Admin </DropdownMenuItem>
                      <DropdownMenuItem> Superadmin </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContentDemo>
                <CardFooterDemo>
                  <ButtonDemo>Save changes</ButtonDemo>
                </CardFooterDemo>
              </CardDemo>
            </TabsContent>
            <TabsContent value="password">
              <CardDemo>
                <CardHeaderDemo>
                  <CardTitleDemo>Password</CardTitleDemo>
                  <CardDescriptionDemo>
                    Change your password here. After saving, you&apos;ll be
                    logged out.
                  </CardDescriptionDemo>
                </CardHeaderDemo>
                <CardContentDemo className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContentDemo>
                <CardFooterDemo>
                  <ButtonDemo>Save password</ButtonDemo>
                </CardFooterDemo>
              </CardDemo>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Theme Preview Section (2/5 of the screen) */}
      <div className="fixed bottom-0 w-full h-[50vh] bg-background p-6 overflow-x-auto space-y-10 border-t-2 border-primary">
        {/* Make sections by palette.owner */}
        {Array.from(ownerToPalettes.keys()).map(owner => (
          <div key={owner} className="flex flex-col space-y-4">
            <h2 className="text-2xl text-white font-bold">{owner}</h2>
            <div className="grid grid-cols-8 gap-10 space-x-4">
              {ownerToPalettes.get(owner)!.map(palette => (
                <Card
                  key={palette.name}
                  onClick={() =>
                    dispatch(selectPalette({ name: palette.name }))
                  }
                  className={cn("w-40 flex-shrink-0 hover:cursor-pointer", {
                    "border-primary": palette.name === selectedPaletteName,
                  })}
                >
                  <CardHeader>
                    <CardTitle>
                      {palette.name
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
                              "primary",
                              palette.colors[selectedThemeType],
                              true,
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
                              palette.colors[selectedThemeType],
                              true,
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
                              palette.colors[selectedThemeType],
                              true,
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
                              "card",
                              palette.colors[selectedThemeType],
                              true,
                            ),
                          }}
                        />
                        <p className="text-xs">Card</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
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
