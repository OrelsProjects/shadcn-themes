"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
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
