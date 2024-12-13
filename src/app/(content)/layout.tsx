import React from "react";
import ContentLayout from "@/app/layouts/contentLayout";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: RootLayoutProps) {
  return <ContentLayout>{children}</ContentLayout>;
}
