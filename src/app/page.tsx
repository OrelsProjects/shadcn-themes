"use client";

import { BottomNavbar } from "@/components/bottom-navbar/bottom-navbar";
import { CardsDemoContainer } from "@/components/CardsDemo";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import CodeFastAdBanner from "@/components/banners/codefast-ad";

export default function Dashboard() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground relative flex flex-col space-y-8 scroll-y-auto sm:scroll-auto">
      <Header />
      <div className="w-full h-full flex flex-col gap-12 px-2 sm:px-0">
        <Hero />
        <CardsDemoContainer />
      </div>
      <CodeFastAdBanner
        isVertical
        className="fixed -top-8 sm:top-20 right-4 mx-auto z-50 w-full sm:max-w-48"
      />
      {/* <ReviewPopup /> */}
      <BottomNavbar />
      <Footer />
    </main>
  );
}
