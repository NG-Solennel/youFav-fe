import cn from "@/utils/className";
import { VariantProps, cva } from "class-variance-authority";
import React, { ButtonHTMLAttributes, FC } from "react";

const buttonVariants = cva("text-white font-semibold w-full py-2 rounded-md", {
  variants: {
    variant: {
      default: "bg-primary hover:bg-header",
      error: "bg-error hover:bg-error",
    },
  },
  defaultVariants: { variant: "default" },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button: FC<ButtonProps> = ({
  className,
  variant,
  children,
  ...props
}) => {
  return (
    <button className={cn(buttonVariants({ className, variant }))} {...props}>
      {children}
    </button>
  );
};

export { buttonVariants, Button };
