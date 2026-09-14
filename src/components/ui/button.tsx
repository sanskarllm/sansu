import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] min-h-11 px-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-fg hover:opacity-90",
        ink: "bg-ink text-bg-elevated hover:opacity-90",
        outline: "border border-border bg-bg-elevated text-fg hover:bg-surface",
        ghost: "text-fg hover:bg-surface",
        link: "text-primary underline-offset-4 hover:underline min-h-0 px-0",
      },
      size: {
        default: "h-11",
        sm: "h-9 min-h-9 px-3 text-sm",
        lg: "h-12 px-5",
        icon: "size-11 px-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }
>(function Button({ className, variant, size, asChild = false, ...props }, ref) {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
});
