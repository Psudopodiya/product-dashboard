import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "h-4 w-7", // Small size
  md: "h-[1.15rem] w-8", // Medium size (default)
  lg: "h-6 w-12", // Large size
};

const thumbSizeClasses = {
  sm: "size-3", // Small thumb
  md: "size-4", // Medium thumb (default)
  lg: "size-5", // Large thumb
};

function Switch({
  className,
  size = "md", // Default size is medium
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "md" | "lg";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        sizeClasses[size],
        "peer data-[state=checked]:bg-teal-500 data-[state=unchecked]:bg-gray-500 focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          thumbSizeClasses[size],
          "bg-white dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
