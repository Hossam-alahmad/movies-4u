import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../utils/functions";

// eslint-disable-next-line react-refresh/only-export-components
export const buttonVariant = cva(
  "active:scale-95 p-2 outline-none inline-flx item-center justify-center text-sm rounded-md transition-all",
  {
    variants: {
      variant: {
        default: "border-none",
        outline: "border-2",
        transparent: "bg-transparent",
        gradient: "bg-gradient-to-l",
      },
      size: {
        sm: "px-4 py-2",
        md: "px-6 py-3",
        lg: "px-8 py-4",
        xl: "px-10 py-5",
      },
      bgColor: {
        default: "",
        primary: "bg-primary hover:bg-primary/90",
        secondary: "bg-secondary hover:bg-secondary/90",
        third: "bg-third hover:bg-third/90",

        "primary-light": "bg-primary-light hover:bg-primary-light/90",
        "secondary-light": "bg-secondary-light hover:bg-secondary-light/90",
        "third-light": "bg-third-light hover:bg-third-light/90",

        "gradient-primary": "from-primary to-primary-light",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      bgColor: "default",
    },
  }
);
interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariant> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, bgColor, size, className, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariant({ variant, bgColor, size, className }))}
        {...props}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
