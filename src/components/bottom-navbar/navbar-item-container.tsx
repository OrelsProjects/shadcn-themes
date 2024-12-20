import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NavbarItemContainerProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label?: string;
  children?: React.ReactNode;
}

export default function NavbarItemContainer({
  Icon,
  label,
  children,
}: NavbarItemContainerProps) {
  return (
    <Button variant="outline">
      <Icon className={cn("h-4 w-4")} />
      {label && <span className="hidden sm:inline">{label}</span>}
      {children}
    </Button>
  );
}
