import Theme from "@/app/blogs/Theme";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import React from "react";

export const metadata: Metadata = {
  title: "Blogs",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Theme>
      {children}
    </Theme>
  );
}
