import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AuthLayout from "../components/AuthLayout";
import Label from "../../../components/ui/Label";
import Input from "../../../components/ui/Input";
import ErrorText from "../../../components/ui/ErrorText";
import Button from "../../../components/ui/Button";
import OtpInput from "../components/OtpInput";

import {
  verifyEmailSchema,
  type VerifyEmailFormValues,
} from "../schema/auth.schema";
import { verifyEmailApi } from "../../../features/auth/api/auth.api";
import { storage } from "../../../utils/storage";

const OTP_RESEND_SECONDS = 30;

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [apiError, setApiError] = useState("");
  const [countdown, setCountdown] = useState(OTP_RESEND_SECONDS);

  const prefilledEmail = useMemo(() => {
    return (
      (location.state as { email?: string } | null)?.email ||
      storage.getPendingVerifyEmail() ||
      ""
    );
  }, [location.state]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailFormValues>({
    resolver: yupResolver(verifyEmailSchema),
    defaultValues: {
      email: prefilledEmail,
      otp: "",
    },
  });

  const otpValue = watch("otp");
  const emailValue = watch("email");

  useEffect(() => {
    if (!countdown) return;

    const timer = window.setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [countdown]);

  const onSubmit = async (values: VerifyEmailFormValues) => {
    try {
      setApiError("");
      await verifyEmailApi(values);
      storage.removePendingVerifyEmail();
      navigate("/login", {
        replace: true,
        state: { email: values.email, verified: true },
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Email verification failed. Please try again.";
      setApiError(message);
    }
  };

  const handleOtpChange = (nextOtp: string) => {
    setValue("otp", nextOtp, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleResend = () => {
    // Hook your resend OTP API here when backend endpoint is ready.
    // Example:
    // await resendOtpApi({ email: emailValue });
    setCountdown(OTP_RESEND_SECONDS);
  };

  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Enter the 6-digit OTP sent to your email address to activate your CRM account."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {apiError ? (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
            {apiError}
          </div>
        ) : null}

        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="patilamarjit2002@gmail.com"
            error={Boolean(errors.email)}
            {...register("email")}
          />
          <ErrorText message={errors.email?.message} />
        </div>

        <div>
          <Label>Verification code</Label>
          <OtpInput
            value={otpValue || ""}
            onChange={handleOtpChange}
            error={Boolean(errors.otp)}
          />
          <ErrorText message={errors.otp?.message} />
        </div>

        <Button type="submit" loading={isSubmitting}>
          Verify email
        </Button>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-400">
          Didn’t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0 || !emailValue}
            className="font-medium text-blue-400 transition hover:text-blue-300 disabled:cursor-not-allowed disabled:text-slate-600"
          >
            {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
          </button>
        </div>

        <p className="text-center text-sm text-slate-400">
          Already verified?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 transition hover:text-blue-300"
          >
            Go to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
