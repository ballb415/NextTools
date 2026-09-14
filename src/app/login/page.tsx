"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CheckCircle2, ArrowRight, Lock, Mail, User, AlertCircle, Sparkles } from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      await signIn("google", { callbackUrl });
    } catch (err) {
      setErrorMessage("ไม่สามารถเชื่อมต่อ Google OAuth ได้ในขณะนี้ กรุณาลองใช้อีเมลหรือบัญชีทดสอบ");
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (mode === "signup") {
      // Register New Account
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorMessage(data.error || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
          setIsLoading(false);
          return;
        }

        // Auto login after successful registration
        const loginRes = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (loginRes?.error) {
          setSuccessMessage("สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบด้วยรหัสผ่านของคุณ");
          setMode("signin");
          setIsLoading(false);
        } else {
          router.push(callbackUrl);
          router.refresh();
        }
      } catch (err) {
        setErrorMessage("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
        setIsLoading(false);
      }
    } else {
      // Sign In with Credentials
      try {
        const res = await signIn("credentials", {
          email: email.trim(),
          password,
          redirect: false,
        });

        if (res?.error) {
          setErrorMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
          setIsLoading(false);
        } else {
          router.push(callbackUrl);
          router.refresh();
        }
      } catch (err) {
        setErrorMessage("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        setIsLoading(false);
      }
    }
  };

  const handleQuickLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await signIn("credentials", {
        email: demoEmail,
        password: "password123",
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage("ไม่สามารถเข้าสู่ระบบด้วยบัญชีทดสอบได้");
        setIsLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setErrorMessage("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      {/* Background ambient warm glows */}
      <div className="ambient-glow top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#E8DAC8]/45" />
      <div className="ambient-glow top-1/4 right-10 w-[300px] h-[220px] bg-[#F5D4CD]/35" />
      <div className="ambient-glow bottom-10 left-10 w-[280px] h-[200px] bg-[#E2D9CC]/35" />

      <div className="max-w-md w-full space-y-6 bg-white/85 backdrop-blur-2xl border border-white/90 rounded-3xl p-7 sm:p-9 shadow-card relative z-10">
        {/* Brand Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-10 h-10 rounded-full bg-brand-charcoal flex items-center justify-center text-white font-extrabold text-sm shadow-md group-hover:scale-105 transition-all">
              N
            </div>
            <div className="flex items-center text-xl font-black font-english text-text-primary tracking-tight">
              NEXT<span className="text-text-muted font-normal">TOOLS</span>
            </div>
          </Link>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary font-thai tracking-tight">
            {mode === "signin" ? "เข้าสู่ระบบ NEXT TOOLS" : "สร้างบัญชีผู้ใช้ใหม่"}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-text-secondary font-thai">
            {mode === "signin"
              ? "รวมทุกเครื่องมือจัดการไฟล์ & AI อัจฉริยะไว้ในที่เดียว"
              : "สมัครสมาชิกวันนี้ รับฟรี 10 เครดิตเริ่มต้นทันที"}
          </p>
        </div>

        {/* Mode Segmented Tab Switcher */}
        <div className="p-1 bg-stone-100/90 rounded-full flex items-center border border-black/[0.04] text-xs font-semibold font-thai">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className={`flex-1 py-2 rounded-full transition-all duration-200 ${
              mode === "signin"
                ? "bg-white text-text-primary shadow-xs font-bold"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            เข้าสู่ระบบ (Sign In)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className={`flex-1 py-2 rounded-full transition-all duration-200 ${
              mode === "signup"
                ? "bg-white text-text-primary shadow-xs font-bold"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            สมัครสมาชิก (Sign Up)
          </button>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-600 text-xs font-thai flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-xs font-thai flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Google OAuth Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-full bg-[#181716] hover:bg-[#2C2B28] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-60 font-thai group"
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>
          )}
          <span className="tracking-wide">
            {mode === "signin" ? "เข้าสู่ระบบด้วย Google" : "สมัครสมาชิกด้วย Google"}
          </span>
        </button>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-black/[0.08] w-full" />
          <span className="bg-white/90 px-3 text-[11px] text-text-muted font-thai shrink-0 uppercase tracking-wider">
            {mode === "signin" ? "หรือเข้าสู่ระบบด้วยอีเมล" : "หรือลงทะเบียนด้วยอีเมล"}
          </span>
          <div className="border-t border-black/[0.08] w-full" />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleFormSubmit} className="space-y-3.5">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-text-secondary font-thai mb-1.5">
                ชื่อของคุณ (ไม่บังคับ)
              </label>
              <Input
                type="text"
                placeholder="สมชาย ใจดี"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<User className="w-4 h-4 text-text-muted" />}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-text-secondary font-thai mb-1.5">
              อีเมล
            </label>
            <Input
              type="email"
              placeholder="user@nexttools.co"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              leftIcon={<Mail className="w-4 h-4 text-text-muted" />}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-secondary font-thai mb-1.5">
              รหัสผ่าน
            </label>
            <Input
              type="password"
              placeholder={mode === "signup" ? "อย่างน้อย 6 ตัวอักษร" : "••••••••"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={mode === "signup" ? 6 : undefined}
              leftIcon={<Lock className="w-4 h-4 text-text-muted" />}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            className="w-full font-thai mt-3 shadow-pill"
          >
            {mode === "signin" ? "เข้าสู่ระบบ" : "สมัครสมาชิก & รับ 10 เครดิตฟรี"}
          </Button>
        </form>

        {/* Demo Fast Login Shortcuts (Show in Sign In Mode) */}
        {mode === "signin" && (
          <div className="bg-[#FAF9F6] border border-black/[0.06] rounded-2xl p-3.5 space-y-2">
            <span className="text-[11px] font-bold text-text-muted font-thai block">
              กดเข้าสู่ระบบด่วน 1-Click (Demo Accounts):
            </span>
            <div className="grid grid-cols-3 gap-2 text-[11px] font-thai">
              <button
                type="button"
                onClick={() => handleQuickLogin("user@nexttools.co")}
                disabled={isLoading}
                className="py-1.5 px-2 rounded-full bg-white border border-black/[0.08] hover:border-brand-charcoal text-text-secondary hover:text-brand-charcoal transition-all shadow-xs"
              >
                ผู้ใช้ฟรี
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("pro@nexttools.co")}
                disabled={isLoading}
                className="py-1.5 px-2 rounded-full bg-white border border-black/[0.08] hover:border-brand-charcoal text-text-secondary hover:text-brand-charcoal transition-all shadow-xs"
              >
                สมาชิก Pro
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("admin@nexttools.co")}
                disabled={isLoading}
                className="py-1.5 px-2 rounded-full bg-brand-charcoal text-white hover:bg-neutral-800 font-semibold transition-all shadow-xs"
              >
                แอดมิน
              </button>
            </div>
          </div>
        )}

        {/* Benefits list */}
        <div className="bg-[#FAF9F6] border border-black/[0.06] rounded-2xl p-3.5 space-y-2 text-xs font-thai text-text-secondary">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>รับฟรี 10 เครดิตต่อวันทุกวัน</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>ความปลอดภัยระดับมาตรฐาน ไม่เก็บไฟล์ถาวร</span>
          </div>
        </div>

        {/* Guest CTA */}
        <div className="text-center pt-2 border-t border-black/[0.06]">
          <Link
            href="/tools"
            className="text-xs text-text-secondary hover:text-brand-charcoal transition-colors font-thai inline-flex items-center gap-1.5"
          >
            <span>ต้องการใช้งานทันทีโดยไม่ต้องเข้าสู่ระบบ?</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
