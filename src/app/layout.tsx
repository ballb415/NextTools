import type { Metadata } from "next";
import { Prompt, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NEXT TOOLS — เครื่องมือออนไลน์จัดการ PDF รูปภาพ และงาน AI สำหรับคนไทย",
    template: "%s | NEXT TOOLS",
  },
  description:
    "แพลตฟอร์มเครื่องมือออนไลน์สำหรับจัดการไฟล์ PDF, แปลงและบีบอัดรูปภาพ, และเครื่องมือ AI เพิ่มประสิทธิภาพการทำงาน รวดเร็ว ปลอดภัย ไม่เก็บไฟล์",
  keywords: [
    "NEXT TOOLS",
    "รวม PDF",
    "บีบอัดรูปภาพ",
    "แปลงไฟล์รูปภาพ",
    "AI ภาษาไทย",
    "เครื่องมือออนไลน์",
    "PromptPay",
    "ฟรีแลนซ์",
    "PDF Tools Thailand",
  ],
  authors: [{ name: "NEXT TOOLS Thailand" }],
  creator: "NEXT TOOLS",
  publisher: "NEXT TOOLS",
  metadataBase: new URL("https://nexttools.co"),
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://nexttools.co",
    title: "NEXT TOOLS — ทำเรื่องยุ่งให้เป็นเรื่องง่าย",
    description:
      "เครื่องมือออนไลน์สำหรับจัดการไฟล์ PDF รูปภาพ และงาน AI ในที่เดียว ใช้งานฟรี ไม่เก็บไฟล์ส่วนตัว",
    siteName: "NEXT TOOLS",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXT TOOLS — เครื่องมือออนไลน์ยุคใหม่สำหรับคนไทย",
    description: "บีบอัดรูป รวม PDF และ AI ขัดเกลาภาษาไทย ในที่เดียว",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${prompt.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-bg-dark text-text-primary antialiased font-thai selection:bg-brand-charcoal selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
