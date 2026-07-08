import { useEffect, useMemo, useRef } from "react";
import Input from "../../../components/ui/Input";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: boolean;
}

export default function OtpInput({
  value,
  onChange,
  length = 6,
  error,
}: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const digits = useMemo(() => {
    const arr = Array.from({ length }, (_, index) => value[index] || "");
    return arr;
  }, [value, length]);

  useEffect(() => {
    refs.current = refs.current.slice(0, length);
  }, [length]);

  const updateAt = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join(""));
  };

  const handleChange = (index: number, inputValue: string) => {
    const clean = inputValue.replace(/\D/g, "");

    if (!clean) {
      updateAt(index, "");
      return;
    }

    if (clean.length > 1) {
      const merged = [...digits];
      let cursor = index;

      for (const char of clean) {
        if (cursor >= length) break;
        merged[cursor] = char;
        cursor += 1;
      }

      onChange(merged.join(""));

      const nextFocusIndex = Math.min(cursor, length - 1);
      refs.current[nextFocusIndex]?.focus();
      return;
    }

    updateAt(index, clean);
    if (index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace") {
      if (digits[index]) {
        updateAt(index, "");
        return;
      }

      if (index > 0) {
        refs.current[index - 1]?.focus();
        updateAt(index - 1, "");
      }
    }

    if (event.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    onChange(pasted.slice(0, length));
    const focusIndex = Math.min(pasted.length, length - 1);
    refs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          value={digit}
          error={error}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={length}
          className="h-12 w-12 px-0 text-center text-lg font-semibold sm:h-14 sm:w-14"
        />
      ))}
    </div>
  );
}
