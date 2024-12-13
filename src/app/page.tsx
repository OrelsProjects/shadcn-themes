"use client";

import { useEffect } from "react";
import { useCustomRouter } from "@/lib/hooks/useCustomRouter";

export default function Home() {
  const router = useCustomRouter();
  useEffect(() => {
    router.push("/login", { preserveQuery: true });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
