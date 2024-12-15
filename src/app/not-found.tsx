"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>404</div>
      <Button asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </main>
  );
};

export default NotFound;
