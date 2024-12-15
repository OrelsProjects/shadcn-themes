"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import CopyCode from "@/components/copy-code";
import { ThemesDialog } from "@/components/themes-dialog";

export function BottomNavbar() {
  return (
    <div className="fixed bottom-8 left-0 w-full flex justify-center items-center">
      <Card className="w-fit h-16 bg-background/80 backdrop-blur-md border border-border/20 px-6 py-2 flex items-center gap-4">
        <CopyCode />
        <ThemesDialog />
      </Card>
    </div>
  );
}
