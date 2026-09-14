"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Zap,
  Menu,
  X,
  User,
  ShieldAlert,
  ArrowRight,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveBalance, setLiveBalance] = useState<number | null>(null);

  const isLoggedIn = status === "authenticated" && !!session?.user;
  const user = session?.user;
  const isPro = user?.plan === "PRO";
  const isAdmin = user?.role === "ADMIN";

  // Fetch real-time balance
  useEffect(() => {
    if (isLoggedIn) {
      fetch("/api/credits/balance")
        .then((res) => res.json())
        .then((data) => {
          if (data && typeof data.balance === "number") {
            setLiveBalance(data.balance);
          }
        })
        .catch(() => {});
    }
  }, [isLoggedIn, pathname]);

  const displayCredits = liveBalance !== null ? liveBalance : user?.credits ?? 10;

  const navLinks = [
    { href: "/tools", label: "เครื่องมือทั้งหมด", labelEn: "All Tools" },
    { href: "/pricing", label: "ราคา & แพ็กเกจ", labelEn: "Pricing" },
    { href: "/dashboard", label: "แดชบอร์ด", labelEn: "Dashboard" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/[0.06] bg-[#F2F1ED]/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-brand-charcoal flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform duration-200">
            N
          </div>
          <div className="flex items-center">
            <span className="font-extrabold text-lg tracking-tight font-english text-text-primary">
              NEXT
            </span>
            <span className="font-extrabold text-lg tracking-tight font-english text-brand-charcoal ml-1 opacity-80">
              TOOLS
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-charcoal ml-1 opacity-50" />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all font-thai",
                  isActive
                    ? "bg-white text-text-primary font-semibold shadow-xs border border-black/[0.04]"
                    : "text-text-secondary hover:text-text-primary hover:bg-black/[0.04]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Area */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Credit Balance Badge */}
          <Link
            href="/pricing"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-black/[0.06] hover:bg-white text-xs text-text-secondary hover:text-text-primary transition-all duration-200 shadow-xs group"
            title="คลิกเพื่อดูแพ็กเกจหรือเติมเครดิต"
          >
            <Zap className="w-3.5 h-3.5 text-brand-charcoal group-hover:scale-110 transition-transform" />
            <span className="font-medium font-thai">เครดิต:</span>
            <span className="font-bold text-text-primary font-english">{displayCredits}</span>
            <Badge variant={isPro ? "yellow" : "purple"} size="sm" className="ml-1 text-[10px] py-0 px-1.5">
              {isPro ? "PRO" : "FREE"}
            </Badge>
          </Link>

          {/* Admin Link (visible if admin) */}
          {isAdmin && (
            <Link
              href="/admin"
              className="p-2 text-text-primary hover:bg-black/[0.04] rounded-full transition-colors text-xs flex items-center gap-1"
              title="ระบบแอดมิน"
            >
              <ShieldAlert className="w-4 h-4 text-brand-charcoal" />
              <span className="font-thai text-[11px] font-bold">แอดมิน</span>
            </Link>
          )}

          {/* Authentication State */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-black/[0.06] hover:bg-white text-xs text-text-primary font-thai transition-colors shadow-xs"
              >
                <div className="w-5 h-5 rounded-full bg-brand-charcoal flex items-center justify-center text-[10px] font-bold text-white">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
                </div>
                <span className="max-w-[100px] truncate font-medium">{user?.name || user?.email}</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-2 text-text-muted hover:text-red-500 rounded-full hover:bg-black/[0.04] transition-colors"
                title="ออกจากระบบ"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<User className="w-3.5 h-3.5 text-text-secondary" />}
                className="font-thai"
              >
                เข้าสู่ระบบ
              </Button>
            </Link>
          )}

          {/* Pro Upgrade Action */}
          {!isPro && (
            <Link href="/pricing">
              <Button
                variant="yellow"
                size="sm"
                className="font-thai"
              >
                อัปเกรด Pro
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            href="/pricing"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/80 border border-black/[0.06] text-xs text-text-secondary"
          >
            <Zap className="w-3 h-3 text-brand-charcoal" />
            <span className="font-bold text-text-primary">{displayCredits}</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-text-secondary hover:text-text-primary rounded-full hover:bg-black/[0.04] focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-text-primary" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-black/[0.06] bg-white/95 backdrop-blur-xl px-4 py-4 space-y-3 animate-fade-in">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-colors font-thai flex items-center justify-between",
                  pathname === link.href
                    ? "bg-black/[0.05] text-text-primary font-semibold"
                    : "text-text-secondary hover:text-text-primary hover:bg-black/[0.02]"
                )}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-2xl text-sm font-medium text-text-primary hover:bg-black/[0.04] font-thai flex items-center justify-between"
              >
                <span>ระบบแอดมิน (Admin)</span>
                <ShieldAlert className="w-3.5 h-3.5 text-brand-charcoal" />
              </Link>
            )}
          </nav>

          <div className="pt-3 border-t border-black/[0.06] flex flex-col gap-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-sm font-thai"
              >
                <LogOut className="w-4 h-4" />
                <span>ออกจากระบบ ({user?.name || user?.email})</span>
              </button>
            ) : (
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="outline" size="md" className="w-full font-thai">
                  เข้าสู่ระบบ
                </Button>
              </Link>
            )}
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button variant="yellow" size="md" className="w-full font-thai">
                อัปเกรดเป็น Pro (PromptPay)
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
