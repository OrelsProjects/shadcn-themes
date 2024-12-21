import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "Terms of service for Shadcn Themes.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
