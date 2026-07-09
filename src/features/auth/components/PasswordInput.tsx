import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../../lib/utils";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, error, ...props }, ref) => {
    const [show, setShow] = React.useState(false);

    return (
      <div className="relative">
        <input
          ref={ref}
          type={show ? "text" : "password"}
          className={cn(
            "h-12 w-full rounded-xl border bg-white px-4 pr-12 text-sm text-[#111827] outline-none transition placeholder:text-[#9ca3af]",
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
              : "border-[#e5e7eb] focus:border-[#6b5cff] focus:ring-4 focus:ring-[#6b5cff]/10",
            className,
          )}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] transition hover:text-[#6b5cff]"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
