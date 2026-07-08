import type { LabelHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn("mb-2 block text-sm font-medium text-slate-200", className)}
      {...props}
    />
  );
}
