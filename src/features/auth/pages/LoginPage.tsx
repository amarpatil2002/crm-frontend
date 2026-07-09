import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import type { AxiosError } from "axios";

import AuthLayout from "../components/AuthLayout";
import Label from "../../../components/ui/Label";
import Input from "../../../components/ui/Input";
import ErrorText from "../../../components/ui/ErrorText";
import Button from "../../../components/ui/Button";
import PasswordInput from "../components/PasswordInput";

import { loginSchema, type LoginFormValues } from "../schema/auth.schema";
import { loginApi } from "../../../features/auth/api/auth.api";
import { setCredentials } from "../../../app/authSlice";
import type { AppDispatch } from "../../../app/store";

type LoginLocationState = {
  email?: string;
  verified?: boolean;
  from?: string;
} | null;

type ApiErrorResponse = {
  message?: string;
};

function getErrorMessage(error: unknown): string {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  return (
    axiosError?.response?.data?.message ||
    axiosError?.message ||
    "Login failed. Please try again."
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const [apiError, setApiError] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const locationState = location.state as LoginLocationState;

  const defaultEmail = useMemo(
    () => locationState?.email?.trim() || "",
    [locationState?.email],
  );

  const redirectTo = useMemo(
    () => locationState?.from || "/dashboard",
    [locationState?.from],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: defaultEmail,
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setApiError("");

      const response = await loginApi(values);
      const { user, accessToken } = response.data;

      dispatch(
        setCredentials({
          user,
          accessToken,
        }),
      );

      if (rememberMe) {
        localStorage.setItem("crm_remember_email", values.email);
      } else {
        localStorage.removeItem("crm_remember_email");
      }

      navigate(redirectTo, { replace: true });
    } catch (error: unknown) {
      setApiError(getErrorMessage(error));
    }
  };

  return (
    <AuthLayout
      variant="login"
      title="Welcome back"
      subtitle="Sign in to continue to your account."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {apiError ? (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600"
          >
            {apiError}
          </div>
        ) : null}

        <div>
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="patilamarjit2002@gmail.com"
            autoComplete="email"
            error={Boolean(errors.email)}
            {...register("email")}
          />
          <ErrorText message={errors.email?.message} />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="password" className="mb-0">
              Password
            </Label>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-[#6b5cff] transition hover:text-[#5748ff]"
            >
              Forgot password?
            </Link>
          </div>

          <PasswordInput
            id="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            error={Boolean(errors.password)}
            {...register("password")}
          />
          <ErrorText message={errors.password?.message} />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-3 text-sm text-[#6b7280]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-[#d1d5db] text-[#6b5cff] focus:ring-[#6b5cff]"
            />
            Remember me
          </label>
        </div>

        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          Sign in
        </Button>

        <p className="text-center text-sm text-[#6b7280]">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#6b5cff] transition hover:text-[#5748ff]"
          >
            Create account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
