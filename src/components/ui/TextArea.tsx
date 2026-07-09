import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", error = false, disabled = false, ...props }, ref) => {
    const baseClasses =
      "w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400";

    const stateClasses = error
      ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
      : "border-slate-200 focus:border-[#6b5cff] focus:ring-4 focus:ring-[#6b5cff]/10";

    const disabledClasses = disabled
      ? "cursor-not-allowed bg-slate-50 text-slate-400"
      : "";

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={`${baseClasses} ${stateClasses} ${disabledClasses} ${className}`}
        {...props}
      />
    );
  },
);

TextArea.displayName = "TextArea";

export default TextArea;
