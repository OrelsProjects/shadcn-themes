"use client";

import { BottomNavbar } from "@/components/bottom-navbar";
import { CardsDemoContainer } from "@/app/CardsDemo";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";

export default function Dashboard() {
  console.log("Rendered at dashbaord: ", new Date());

  return (
    <main className="min-h-screen w-full bg-background text-foreground relative flex flex-col space-y-8 scroll-y-auto sm:scroll-auto">
      <Header />
      <div className="w-full h-full flex flex-col gap-12 px-2 sm:px-0">
        <Hero />
        <CardsDemoContainer />
      </div>
      <BottomNavbar />
      <Footer />
    </main>
  );
}
