import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Ensure this path matches where you saved the file
import ChatWidget from "@/components/ChatWidget";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akademia",
  description: "Welcome to Akademia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex-1 flex flex-col">{children}</div>

        {/* ================= FOOTER (inline, renders on every page) ================= */}
        <footer className="w-full bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center">
              <span className="text-slate-600 font-semibold text-sm sm:text-base">
                Dyna Wisdom &copy; {currentYear}
              </span>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                <Link
                  href="/privacy"
                  className="text-slate-600 hover:text-slate-900 font-semibold text-sm sm:text-base transition-colors"
                >
                  Privacy &amp; Legal
                </Link>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-slate-900 font-semibold text-sm sm:text-base transition-colors"
                >
                  Locations
                </Link>
                
                {/* FIXED: Added the missing <a tag here */}
                <a
                  href="https://www.akademia.co.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 font-semibold text-sm sm:text-base transition-colors"
                >
                  Akademia Japan
                </a>
              </div>
            </div>
          </div>
        </footer>

        <ChatWidget />
      </body>
    </html>
  );
}