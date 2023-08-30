import { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../utils/functions";

const inputVariant = cva("outline-none p-2 rounded-sm w-full shadow-sm", {
  variants: {
    variant: {
      default: "border-none",
      outline: "border-2",
      transparent: "bg-transparent",
    },
    size: {
      sm: {
        fontSize: "sm",
      },
      md: {
        fontSize: "md",
      },
      lg: {
        fontSize: "lg",
      },
      xl: {
        fontSize: "xl",
      },
    },
    bgColor: {
      primary: "bg-input-primary",
      secondary: "bg-input-secondary",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    bgColor: "primary",
  },
});

type InputProps = {
  label?: string;
  children?: React.ReactNode;
} & React.ComponentProps<"input"> &
  VariantProps<typeof inputVariant>;

const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  ({ size, variant, label, children, className, id, ...props }, ref) => {
    return (
      <>
        {label && <label htmlFor={id}>{label}</label>}
        <div className="relative">
          <input
            ref={ref}
            className={cn(inputVariant({ size, variant, className }))}
            id={id}
            {...props}
          />
          {children}
        </div>
      </>
    );
  }
);

export default SearchInput;
