"use client";

import * as React from "react";
import {
  Check,
  ChevronsUpDown,
  GalleryVerticalEnd,
  Search,
  X,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui-demo/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui-demo/dropdown-menu";
import { Label } from "@/components/ui-demo/label";
import { Separator } from "@/components/ui-demo/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui-demo/sidebar";
import { Button } from "@/components/ui-demo/button";

const versions = ["1.0.0", "1.1.0", "2.0.0-beta"];

const navItems = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", url: "#introduction" },
      { title: "Installation", url: "#installation" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Button", url: "#button" },
      { title: "Dropdown", url: "#dropdown" },
      { title: "Sidebar", url: "#sidebar", isActive: true },
    ],
  },
  {
    title: "Customization",
    items: [
      { title: "Theming", url: "#theming" },
      { title: "Configuration", url: "#configuration" },
    ],
  },
];

export function DemoSidebar({
  children,
  onClose,
}: {
  children?: React.ReactNode;
  onClose: () => void;
}) {
  const [selectedVersion, setSelectedVersion] = React.useState(versions[0]);

  const toggleSidebar = () => onClose();

  return (
    <SidebarProvider className="relative !px-0 hidden md:flex">
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="w-full flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={toggleSidebar}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close sidebar</span>
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-demo-accent data-[state=open]:text-sidebar-demo-accent-foreground"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-demo-primary text-sidebar-demo-primary-foreground">
                      <GalleryVerticalEnd className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">Demo UI</span>
                      <span className="">v{selectedVersion}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width]"
                  align="start"
                >
                  {versions.map(version => (
                    <DropdownMenuItem
                      key={version}
                      onSelect={() => setSelectedVersion(version)}
                    >
                      v{version}{" "}
                      {version === selectedVersion && (
                        <Check className="ml-auto" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {navItems.map(section => (
            <SidebarGroup key={section.title}>
              <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map(item => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.isActive}>
                        <a href={item.url}>{item.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="flex shrink-0 items-center gap-2 p-4 h-0">
          <SidebarTrigger className="hidden" />
        </div>
        <div className="px-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
