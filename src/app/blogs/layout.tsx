import Header from "@/components/header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs",
};

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug?: string };
}) {
  return (
    <div className="w-screen h-screen bg-background text-foreground overflow-x-clip overflow-y-auto">
      <Header size="md" sticky />
      <div className="p-4 space-y-8 relative">
        <div className="container py-12 space-y-8">{children}</div>
      </div>
    </div>
  );
}
