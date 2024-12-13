import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export default function Loading({ className }: { className?: string }) {
  return <Loader className={cn("animate-spin", className)} />;
}
