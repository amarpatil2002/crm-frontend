import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function Button({
  children,
  className,
  loading,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(
        "inline-flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#6b5cff] to-[#5c4fff] px-4 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(107,92,255,0.28)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70",
        className,
      )}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
    </button>
  );
}
