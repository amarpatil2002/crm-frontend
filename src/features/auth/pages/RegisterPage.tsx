import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AuthLayout from "../components/AuthLayout";
import Label from "../../../components/ui/Label";
import Input from "../../../components/ui/Input";
import ErrorText from "../../../components/ui/ErrorText";
import Button from "../../../components/ui/Button";
import PasswordInput from "../components/PasswordInput";

import { registerSchema, type RegisterFormValues } from "../schema/auth.schema";
import { registerApi } from "../../../features/auth/api/auth.api";
import { storage } from "../../../utils/storage";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      organizationName: "",
      phone: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setApiError("");

      const response = await registerApi(values);
      const email =
        response.data?.user?.email || response.data?.email || values.email;

      storage.setPendingVerifyEmail(email);
      navigate("/verify-email", {
        replace: true,
        state: { email },
      });
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";
      setApiError(message);
    }
  };

  return (
    <AuthLayout
      title="Create your CRM account"
      subtitle="Register your organization, verify your email, and start managing your sales workflow."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {apiError ? (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
            {apiError}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="Amarjit"
              error={Boolean(errors.firstName)}
              {...register("firstName")}
            />
            <ErrorText message={errors.firstName?.message} />
          </div>

          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              placeholder="Patil"
              error={Boolean(errors.lastName)}
              {...register("lastName")}
            />
            <ErrorText message={errors.lastName?.message} />
          </div>
        </div>

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
          <Label htmlFor="organizationName">Organization name</Label>
          <Input
            id="organizationName"
            placeholder="AI CRM Solutions Pvt Ltd"
            error={Boolean(errors.organizationName)}
            {...register("organizationName")}
          />
          <ErrorText message={errors.organizationName?.message} />
        </div>

        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input
            id="phone"
            placeholder="9876543210"
            error={Boolean(errors.phone)}
            {...register("phone")}
          />
          <ErrorText message={errors.phone?.message} />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            id="password"
            placeholder="Create a strong password"
            error={Boolean(errors.password)}
            {...register("password")}
          />
          <ErrorText message={errors.password?.message} />
          <p className="mt-2 text-xs text-slate-500">
            Use at least 8 characters with uppercase, lowercase, number, and
            special character.
          </p>
        </div>

        <Button type="submit" loading={isSubmitting}>
          Create account
        </Button>

        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 transition hover:text-blue-300"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
