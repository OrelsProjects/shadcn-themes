"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NavigationBarItem, BottomBarItems } from "./_consts";
import { cn } from "@/lib/utils";
import CustomLink from "@/components/customLink";

interface NavigationBar {
  ref?: React.RefObject<HTMLDivElement>;
  className?: string;
}

const NavigationBar: React.FC<NavigationBar> = ({ ...props }) => {
  const [items] = useState([...BottomBarItems]);
  const [activeItem, setActiveItem] = useState<NavigationBarItem | undefined>(
    items[0],
  );

  const pathname = usePathname();

  useEffect(() => {
    setActiveItem(items.find(i => pathname.includes(i.href)));
  }, [pathname]);

  const isItemActive = (item: NavigationBarItem) =>
    item.href === activeItem?.href;

  const Item = ({ item, id }: { item: NavigationBarItem; id: string }) => (
    <CustomLink
      href={item.href}
      className={cn(
        "flex-1 flex items-center justify-center lg:justify-start lg:hover:bg-muted-foreground/20  lg:rounded-lg lg:p-4 cursor-pointer",
        {
          "lg:bg-muted-foreground/20": isItemActive(item),
        },
      )}
      key={item.href}
      // data-onboarding-id={`navigation-bar-item-${item.label}`}
      data-onboarding-id={id}
      preserveQuery
    >
      <div className="flex flex-col lg:flex-row gap-2 justify-center items-center">
        <span className="indicator">
          {isItemActive(item) ? <item.iconActive /> : <item.icon />}
        </span>
        <span className="lg:hidden text-[0.7rem] leading-3 tracking-tight capitalize -mt-0.5 font-medium text-base-content/75">
          {item.label}
        </span>
        <span className="hidden lg:inline tracking-tight uppercase font-semibold text-muted-foreground">
          {item.label}
        </span>
      </div>
    </CustomLink>
  );

  const SideNavigationBar = () => (
    <div
      className={cn(
        "hidden lg:sticky lg:flex lg:w-60 inset-x-0 bottom-0 lg:left-0 z-40 bg-base-200 border-base-content/10 select-none",
        props.className,
      )}
      ref={props.ref}
    >
      <div className="h-16 w-fit flex flex-col gap-2">
        {items.map(item => (
          <Item
            item={item}
            key={item.href}
            id={`navigation-bar-item-${item.label}`}
          />
        ))}
      </div>
    </div>
  );

  const MobileNavigationBar = () => (
    <div
      className="fixed lg:hidden inset-x-0 bottom-0 lg:left-0 z-40 pb-[calc(max(env(safe-area-inset-bottom), 16px) - 16px)] bg-base-200 border-t border-base-content/10 select-none"
      ref={props.ref}
    >
      <div className="h-16 w-full flex flex-row">
        {items.map(item => (
          <Item
            item={item}
            key={item.href}
            id={`navigation-bar-item-${item.label}-mobile`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>
      <SideNavigationBar />
      <MobileNavigationBar />
    </>
  );
};

export default NavigationBar;