import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-xl border bg-slate-900 px-4 text-sm text-slate-100 outline-none transition",
          "placeholder:text-slate-500",
          "focus:ring-2",
          error
            ? "border-rose-500/70 focus:border-rose-500 focus:ring-rose-500/20"
            : "border-slate-800 focus:border-blue-500 focus:ring-blue-500/20",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
