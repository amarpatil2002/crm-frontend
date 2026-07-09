import type { ReactNode } from "react";
import {
  BarChart3,
  Building2,
  PieChart,
  ShieldCheck,
  UserRound,
  Users,
  Check,
  Send,
} from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  variant?: "login" | "register" | "verify";
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  variant = "login",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f6f7fb] p-4 md:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl items-center justify-center">
        <div className="grid w-full max-w-[1180px] grid-cols-1 overflow-hidden rounded-[28px] border border-[#e8ebf5] bg-white shadow-[0_24px_80px_rgba(107,92,255,0.08)] lg:grid-cols-2">
          {/* Left form panel */}
          <div className="flex items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="w-full max-w-[460px]">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7d70ff] to-[#5b4fff] text-white shadow-lg shadow-[#6b5cff]/20">
                  <Building2 size={20} />
                </div>
                <span className="text-xl font-bold tracking-tight text-[#111827]">
                  AI CRM
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-[32px] font-bold leading-tight tracking-tight text-[#111827] sm:text-[36px]">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#6b7280] sm:text-[15px]">
                  {subtitle}
                </p>
              </div>

              {children}
            </div>
          </div>

          {/* Right illustration panel */}
          <div className="relative hidden min-h-[720px] overflow-hidden bg-white lg:block">
            <div className="absolute inset-0">
              <div className="absolute left-16 top-16 h-72 w-72 rounded-full bg-[#6b5cff]/10 blur-3xl" />
              <div className="absolute bottom-16 right-16 h-72 w-72 rounded-full bg-[#8b80ff]/10 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(107,92,255,0.07),transparent_58%)]" />
            </div>

            {variant === "login" && <LoginIllustration />}
            {variant === "register" && <RegisterIllustration />}
            {variant === "verify" && <VerifyIllustration />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Login Illustration ---------------- */

function LoginIllustration() {
  return (
    <div className="relative flex h-full items-center justify-center px-10">
      <div className="absolute top-[19%] z-20 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#8d85ff] to-[#6b5cff] shadow-[0_20px_60px_rgba(107,92,255,0.35)]">
        <ShieldCheck className="text-white" size={34} />
      </div>

      <div className="relative h-[330px] w-[500px] rounded-[28px] border border-[#e9edf7] bg-white shadow-[0_24px_70px_rgba(107,92,255,0.12)]">
        <div className="absolute left-[-18px] top-[110px] w-[180px] rounded-2xl border border-[#edf1f8] bg-white p-4 shadow-[0_16px_40px_rgba(107,92,255,0.10)]">
          {[1, 2].map((i) => (
            <div key={i} className="mb-4 flex items-center gap-3 last:mb-0">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#f6c9a4] to-[#ef9f74]" />
              <div className="flex-1">
                <div className="h-2.5 w-20 rounded-full bg-[#e6eaf4]" />
                <div className="mt-2 h-2 w-14 rounded-full bg-[#eff3f9]" />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute right-10 top-14 w-[250px]">
          <div className="mb-6 flex items-end gap-3">
            {[55, 82, 72, 95, 60, 88].map((h, i) => (
              <div
                key={i}
                className={`w-6 rounded-t-xl ${
                  i === 4 ? "bg-[#ff6b6b]" : "bg-[#6b5cff]"
                }`}
                style={{ height: `${h}px` }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex h-24 items-center justify-center rounded-2xl border border-[#edf1f8] bg-white shadow-sm">
              <PieChart className="text-[#6b5cff]" size={40} />
            </div>
            <div className="flex h-24 items-center justify-center rounded-2xl border border-[#edf1f8] bg-white shadow-sm">
              <BarChart3 className="text-[#6b5cff]" size={40} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[18%] right-[24%] flex h-24 w-24 items-center justify-center rounded-2xl border border-[#edf1f8] bg-white shadow-[0_16px_40px_rgba(107,92,255,0.10)]">
        <BarChart3 className="text-[#6b5cff]" size={34} />
      </div>

      <div className="absolute left-[18%] top-[30%] h-2 w-2 rounded-full bg-[#d8d2ff]" />
      <div className="absolute right-[14%] top-[33%] h-2 w-2 rounded-full bg-[#d8d2ff]" />
      <div className="absolute bottom-[28%] right-[20%] h-2 w-2 rounded-full bg-[#d8d2ff]" />
    </div>
  );
}

/* ---------------- Register Illustration ---------------- */

function RegisterIllustration() {
  const items = [
    {
      icon: <UserRound size={22} className="text-[#6b5cff]" />,
      top: "10%",
      left: "50%",
    },
    {
      icon: <BarChart3 size={22} className="text-[#ff9f43]" />,
      top: "30%",
      right: "10%",
    },
    {
      icon: <Users size={22} className="text-[#6b5cff]" />,
      bottom: "20%",
      right: "16%",
    },
    {
      icon: <PieChart size={22} className="text-[#6b5cff]" />,
      bottom: "24%",
      left: "18%",
    },
    {
      icon: <ShieldCheck size={22} className="text-[#8d85ff]" />,
      top: "34%",
      left: "12%",
    },
  ];

  return (
    <div className="relative flex h-full items-center justify-center">
      <div className="relative h-[480px] w-[480px]">
        <div className="absolute left-1/2 top-1/2 z-20 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#9a93ff] to-[#6b5cff] shadow-[0_24px_70px_rgba(107,92,255,0.25)]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
            <UserRound className="text-white" size={40} />
          </div>
        </div>

        <div className="absolute left-1/2 top-[69%] z-20 -translate-x-1/2">
          <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#7f75ff] to-[#5c4fff] shadow-[0_16px_40px_rgba(107,92,255,0.25)]">
            <ShieldCheck className="text-white" size={34} />
          </div>
        </div>

        <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#d8d8ff]" />

        {items.map((item, idx) => (
          <div
            key={idx}
            className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[#eaeafd] bg-white shadow-[0_12px_30px_rgba(77,87,180,0.08)]"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              transform: item.left === "50%" ? "translateX(-50%)" : undefined,
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Verify Illustration ---------------- */

function VerifyIllustration() {
  return (
    <div className="relative flex h-full items-center justify-center px-10">
      <div className="relative flex h-[380px] w-[520px] items-center justify-center">
        <div className="relative flex h-[240px] w-[300px] items-center justify-center rounded-[28px] border border-[#eceeff] bg-white shadow-[0_30px_80px_rgba(77,87,180,0.12)]">
          <div className="absolute inset-0 overflow-hidden rounded-[28px]">
            <div className="absolute left-0 top-0 h-1/2 w-full bg-[#ece9ff]" />
            <div className="absolute bottom-0 left-0 h-1/2 w-full bg-[#d9d3ff]" />

            <div className="absolute inset-0">
              <div className="absolute left-0 top-0 h-0 w-0 border-l-[150px] border-r-[150px] border-t-[110px] border-l-transparent border-r-transparent border-t-[#d7d1ff]" />
              <div className="absolute bottom-0 left-0 h-0 w-0 border-b-[110px] border-l-[150px] border-r-[150px] border-l-transparent border-r-transparent border-b-[#c8c0ff]" />
            </div>
          </div>

          <div className="relative z-20 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#8d85ff] to-[#6b5cff] shadow-[0_12px_30px_rgba(107,92,255,0.28)]">
            <Check className="text-white" size={34} />
          </div>
        </div>

        <div className="absolute right-6 top-8">
          <Send className="rotate-12 text-[#c4bfff]" size={34} />
        </div>

        <svg
          className="absolute right-12 top-16"
          width="120"
          height="140"
          viewBox="0 0 120 140"
          fill="none"
        >
          <path
            d="M10 20 C 90 40, 100 100, 70 130"
            stroke="#D9D4FF"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            fill="none"
          />
        </svg>

        <div className="absolute left-[12%] top-[22%] h-2 w-2 rounded-full bg-[#d9d4ff]" />
        <div className="absolute left-[20%] bottom-[18%] h-2 w-2 rounded-full bg-[#d9d4ff]" />
        <div className="absolute right-[20%] bottom-[26%] h-2 w-2 rounded-full bg-[#d9d4ff]" />
      </div>
    </div>
  );
}
