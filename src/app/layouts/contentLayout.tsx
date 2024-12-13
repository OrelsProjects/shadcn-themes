"use client";

import React from "react";
import "@/../firebase.config";
import type { Viewport } from "next";

import AuthProvider from "@/app/providers/AuthProvider";
import TopLoaderProvider from "@/app/providers/TopLoaderProvider";
import AnimationProvider from "@/app/providers/AnimationProvider";
import HeightProvider from "@/app/providers/HeightProvider";
import ContentProvider from "@/app/providers/ContentProvider";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function ContentLayout({ children }: RootLayoutProps) {
  return (
    <main>
      <AuthProvider>
        <HeightProvider>
          <ContentProvider>
            <TopLoaderProvider />
            <AnimationProvider>{children}</AnimationProvider>
          </ContentProvider>
        </HeightProvider>
      </AuthProvider>
    </main>
  );
}

export const viewport: Viewport = {
  themeColor: "#121212",
};
