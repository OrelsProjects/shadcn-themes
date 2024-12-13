import type { Viewport } from "next";
import AuthProvider from "@/app/providers/AuthProvider";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: RootLayoutProps) {
  return (
    <main>
      <AuthProvider>{children}</AuthProvider>
    </main>
  );
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};
