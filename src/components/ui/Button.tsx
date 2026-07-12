import type { ButtonHTMLAttributes, ReactNode } from "react";
import Spinner from "./Spinner";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  children,
  loading = false,
  fullWidth = false,
  variant = "primary",
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",

    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",

    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-medium transition",
        variants[variant],
        fullWidth && "w-full",
        (disabled || loading) && "cursor-not-allowed opacity-60",
        className,
      )}
      {...props}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
