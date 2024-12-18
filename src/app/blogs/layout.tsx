import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
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
      <div className="p-4 space-y-8 relative">
        <div className="container py-12 space-y-8">
          <Button variant="outline" asChild>
            <Link
              href={params.slug ? "/blogs" : "/"}
              className="flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {params.slug ? "Back" : "Choose your theme"}
            </Link>
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
}
