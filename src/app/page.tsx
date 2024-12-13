"use client";

import { useMemo } from "react";
import { RevenueChart } from "@/components/demo/revenue-chart";
import { Subscriptions } from "@/components/demo/subscriptions";
import { CalendarCard } from "@/components/demo/calendar";
import { MoveGoal } from "@/components/demo/move-goal";
import { TeamMembers } from "@/components/demo/team-members";
import { Chat } from "@/components/demo/chat";
import { ExerciseMinutes } from "@/components/demo/exercise-minutes";
import { Payments } from "@/components/demo/payments";
import { DashboardLayout } from "@/app/layouts/DashboardLayout";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { selectPalette } from "@/lib/features/theme/paletteSlice";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import ThemePreviewer from "@/components/demo/theme-previewer";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { selectedPalette, selectedPaletteName, allPalettes } = useAppSelector(
    state => state.palette,
  );

  const paletteNames = useMemo(() => Object.keys(allPalettes), [allPalettes]);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ThemePreviewer />
      {/* <DashboardLayout>
        <RevenueChart theme={selectedPalette} />
        <Subscriptions theme={selectedPalette} />
        <CalendarCard theme={selectedPalette} />
        <MoveGoal theme={selectedPalette} />
        <TeamMembers theme={selectedPalette} />
        <Chat theme={selectedPalette} />
        <ExerciseMinutes theme={selectedPalette} />
        <Payments theme={selectedPalette} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{selectedPaletteName}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Change palette</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {paletteNames.map(paletteName => (
                <DropdownMenuItem
                  key={paletteName}
                  onClick={() => dispatch(selectPalette({ name: paletteName }))}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  <span>
                    {paletteName
                      .split("-")
                      .map(x => x[0].toUpperCase() + x.slice(1))
                      .join(" ")}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </DashboardLayout> */}
    </div>
  );
}
