import Theme from "@/app/resources/Theme";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Resources",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Theme>
      {children}
    </Theme>
  );
}
