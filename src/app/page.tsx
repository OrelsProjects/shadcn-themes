"use client";

import { BottomNavbar } from "@/components/bottom-navbar";
import { CardsDemo } from "@/app/CardsDemo";
import Header from "@/components/header";
import Image from "next/image";
import Hero from "@/components/hero";
import Footer from "@/components/footer";

export default function Dashboard() {
  console.log("Rendered at dashbaord: ", new Date());

  return (
    <main className="min-h-screen bg-background text-foreground relative flex flex-col space-y-8 overscroll-none">
      <Header />
      <div className="w-full h-full flex flex-col gap-12 px-2 sm:px-0">
        <Hero />
        <CardsDemo />
      </div>
      <BottomNavbar />
      <Footer />
    </main>
  );
}
