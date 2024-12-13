import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  textUnder?: string;
  chidren?: React.ReactNode;
  containerClassName?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(
  (
    {
      className,
      checkedIcon,
      uncheckedIcon,
      textUnder,
      containerClassName,
      ...props
    },
    ref,
  ) => {
    // Internal state to track checked status
    const [isChecked, setIsChecked] = React.useState(
      props.defaultChecked || props.checked,
    );

    return (
      <div
        className={cn(
          "w-fit flex flex-col gap-0 justify-center items-center",
          containerClassName,
        )}
      >
        <SwitchPrimitives.Root
          {...props}
          ref={ref}
          className={cn(
            "peer inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            isChecked ? "bg-primary" : "bg-input",
            className,
          )}
          onCheckedChange={checked => {
            setIsChecked(checked);
            props.onCheckedChange?.(checked);
          }}
        >
          <SwitchPrimitives.Thumb
            className={cn(
              "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform",
              isChecked ? "translate-x-5" : "translate-x-0",
            )}
          >
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center text-2xs font-medium",
              )}
            >
              {isChecked ? checkedIcon : uncheckedIcon}
            </span>
          </SwitchPrimitives.Thumb>
        </SwitchPrimitives.Root>
        {textUnder && (
          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 self-center">
            {textUnder}
          </div>
        )}
        {props.children}
      </div>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
