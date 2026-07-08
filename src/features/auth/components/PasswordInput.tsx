import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import Input from "../../../components/ui/Input";

interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  error?: boolean;
}

export default function PasswordInput({ error, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        error={error}
        className="pr-20"
        {...props}
      />

      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 transition hover:text-slate-200"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}
