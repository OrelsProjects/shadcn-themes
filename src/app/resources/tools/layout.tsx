import CTA from "@/app/resources/tools/cta";
import Navbar from "./navbar";
import { MobileSidebar } from "./mobile-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {/* Mobile Sidebar */}
      <div className="fixed top-2 left-2 z-50 md:hidden">
        <MobileSidebar />
      </div>
      <main className="mt-12">{children}</main>
      <CTA className="max-md:hidden mb-8" />
    </>
  );
}
