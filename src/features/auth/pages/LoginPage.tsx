import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";

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

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [apiError, setApiError] = useState("");

  const defaultEmail =
    (location.state as { email?: string; verified?: boolean } | null)?.email ||
    "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
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
      console.log(response);

      dispatch(
        setCredentials({
          user,
          accessToken: accessToken,
        }),
      );

      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      setApiError(message);
    }
  };

  return (
    <AuthLayout
      title="Sign in to your CRM"
      subtitle="Access your organization dashboard, leads, pipeline, and customer data."
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
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            placeholder="Enter your password"
            error={Boolean(errors.password)}
            {...register("password")}
          />
          <ErrorText message={errors.password?.message} />
        </div>

        <Button type="submit" loading={isSubmitting}>
          Sign in
        </Button>

        <p className="text-center text-sm text-slate-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-400 transition hover:text-blue-300"
          >
            Create account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
