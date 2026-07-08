import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        <div className="hidden border-r border-slate-900 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
              CRM Platform
            </div>

            <h1 className="mt-8 max-w-xl text-4xl font-bold tracking-tight text-white">
              Manage leads, sales pipelines, customers, and teams from one CRM.
            </h1>

            <p className="mt-4 max-w-lg text-base leading-7 text-slate-300">
              Production-ready authentication flow for your CRM: organization
              signup, email verification, and secure login with clean UX.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-sm leading-7 text-slate-300">
              “Centralize customer operations, team collaboration, and sales
              workflows with a secure CRM foundation.”
            </p>
          </div>
        </div>

        <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur sm:p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                {title}
              </h2>
              <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
