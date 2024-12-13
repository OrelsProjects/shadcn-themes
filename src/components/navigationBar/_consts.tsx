import { ElementType } from "react";
import { GoHomeFill as HomeActive, GoHome as Home } from "react-icons/go";
import {
  MdOutlinePayments as Payments,
  MdPayment as PaymentsActive,
} from "react-icons/md";
import {
  MdOutlineWorkspacePremium as Plans,
  MdWorkspacePremium as PlansActive,
} from "react-icons/md";

export interface NavigationBarItem {
  icon: ElementType;
  iconActive: ElementType;
  label: "Home" | "Payment" | "Premium";
  href: string;
}

const className = "w-6 h-6 fill-muted-foreground/40 text-muted-foreground/40";
const classNameActive = "w-6 h-6 fill-muted-foreground";

export const BottomBarItems: NavigationBarItem[] = [
  {
    icon: () => <Home className={className} />,
    iconActive: () => <HomeActive className={classNameActive} />,
    label: "Home",
    href: "/home",
  },
  {
    icon: () => <Payments className={className} />,
    iconActive: () => <PaymentsActive className={classNameActive} />,
    label: "Payment",
    href: "/payment",
  },
  {
    icon: () => <Plans className={className} />,
    iconActive: () => <PlansActive className={classNameActive} />,
    label: "Premium",
    href: "/pricing",
  },
];
