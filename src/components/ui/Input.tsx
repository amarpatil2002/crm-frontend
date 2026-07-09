import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#111827] outline-none transition placeholder:text-[#9ca3af]",
          error
            ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
            : "border-[#e5e7eb] focus:border-[#6b5cff] focus:ring-4 focus:ring-[#6b5cff]/10",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
export default Input;
