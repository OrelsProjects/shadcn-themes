"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const title = pathname
    .split("/")
    .pop()
    ?.replace(/-/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="w-full fixed top-0 py-4 z-50 flex justify-start items-center bg-background/30 backdrop-blur-lg px-8 max-md:hidden">
      <div className="absolute inset-0 transition-transform duration-300 z-10 flex justify-center items-center h-14">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <Button
        variant="ghost"
        className="relative hidden md:flex justify-center w-fit hover:bg-transparent px-0"
        asChild
      >
        <Link href="/">
          <Logo height={36} width={36} textClassName="text-xl" />
        </Link>
      </Button>
    </div>
  );
}
