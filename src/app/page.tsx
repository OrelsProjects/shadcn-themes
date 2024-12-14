"use client";

import { BottomNavbar } from "@/components/bottom-navbar";
import ThemePreviewer from "@/components/demo/theme-previewer";
import Header from "@/components/header";
import Image from "next/image";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background text-foreground relative flex flex-col space-y-8">
      <Header />
      <div className="w-full h-full flex flex-col gap-12 pt-16 pb-32">
        <div className="container h-48 flex flex-col justify-start items-center gap-10">
          <h1 className="text-6xl font-semibold flex justify-center">
            {" "}
            Beautiful themes for Shadcn
          </h1>
          <div className="flex gap-6">
          <Image
            src="/working-with/daisy-ui.png"
            alt="Daisy UI"
            width={200}
            height={100}
          />
          <Image
            src="/working-with/shadcn.png"
            alt="Shadcn"
            width={230}
            height={100}
          />
          </div>
        </div>
        <div className="w-full h-full">
          <ThemePreviewer />
        </div>
      </div>
      <BottomNavbar />
    </main>
  );
}
