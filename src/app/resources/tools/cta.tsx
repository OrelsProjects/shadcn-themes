"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA({className}: {className?: string}) {
  return (
    <Card className={cn("container mt-8 bg-gradient-to-r from-secondary/15 via-secondary/10 to-secondary/5", className)}>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold text-secondary">
          <Logo />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-lg">
          Discover a collection of beautifully crafted themes prepared in the
          ShadCN structure. Find and customize themes that fit your project in
          just two clicks.
        </p>
        <ul className="ml-6 list-disc space-y-2">
          <li>Wide variety of themes from popular sources</li>
          <li>Quick and easy exploration</li>
          <li>Free to use for all your projects</li>
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href={"/"}>
            Explore Themes Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Link
          href={"/resources"}
          className="text-sm text-muted-foreground font-thin hover:underline"
        >
          Learn more about {process.env.NEXT_PUBLIC_APP_NAME}
        </Link>
      </CardFooter>
    </Card>
  );
}
