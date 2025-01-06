import CTA from "@/app/resources/tools/cta";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MobileSidebar } from "./mobile-sidebar";
import Header from "@/app/resources/tools/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full fixed top-0 py-4 z-50 flex justify-start items-center bg-background/30 backdrop-blur-lg px-8">
        <div className="absolute inset-0 transition-transform duration-300 z-10 flex justify-center items-center h-14">
          <Header />
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
      {/* Mobile Sidebar */}
      <div className="fixed top-2 left-2 z-50 md:hidden">
        <MobileSidebar />
      </div>
      <main className="mt-12">{children}</main>
      <CTA className="max-md:hidden mb-8" />
    </>
  );
}
