import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import Header from "@/components/Header";
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
  title: "DYNA WISDOM",
  description: "Welcome to DYNA WISDOM",
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
      <body className="min-h-full flex flex-col bg-white">
        {/* ================= HEADER (renders on every page) ================= */}
        <Header />

        <div className="flex-1 flex flex-col">{children}</div>

        {/* ================= PROFESSIONAL FOOTER ================= */}
        <footer className="w-full bg-[#0B1E3D] text-slate-300 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            
            {/* Top Section: Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
              
              {/* Column 1: Brand & Core */}
              <div>
                <h3 className="text-white font-bold text-xl mb-4 tracking-tight">DYNA WISDOM</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Bridging innovation between Japan and Uganda. We build intelligent systems, robust software, and immersive digital experiences.
                </p>
                <Link 
                  href="/contact" 
                  className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors flex items-center gap-2 group"
                >
                  Get in touch 
                  <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
                </Link>
              </div>

              {/* Column 2: Our Ecosystem (Projects) */}
              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Our Ecosystem</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <a 
                      href="https://www.akademia.co.jp/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-yellow-400 transition-colors flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span> Akademia Japan
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://ai-dojo-opal.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-yellow-400 transition-colors flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span> AI DOJO Team
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://ai-avatar.akademia.co.jp/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-yellow-400 transition-colors flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span> AI Avatar Platform
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://vf.akademia.co.jp/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-yellow-400 transition-colors flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span> Virtual Workspace
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Important Links */}
              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Important Links</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link href="/contact" className="hover:text-yellow-400 transition-colors flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Locations & Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-yellow-400 transition-colors flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Privacy & Legal
                    </Link>
                  </li>
                  <li>
                    <Link href="/activities" className="hover:text-yellow-400 transition-colors flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Company Activities
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar: Copyright & Camouflaged Login */}
            <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Left: Copyright */}
              <span className="text-xs text-slate-500">
                Dyna Wisdom &copy; {currentYear}. All rights reserved.
              </span>

              {/* Right: Location & Camouflaged Bold Login Badge */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <span className="text-xs text-slate-600 hidden sm:inline">
                  Built with precision in Kampala & Shizuoka.
                </span>
                
                {/* CAMOUFLAGED BUT BOLD LOGIN BADGE */}
                {/* Looks like a standard, sturdy system tag. Bold weight, but muted colors blend into the background. */}
                <Link 
                  href="/admin" 
                  className="bg-slate-900/60 border border-slate-800 text-slate-600 font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-sm hover:border-slate-600 hover:text-slate-400 transition-all duration-500"
                  title="System Access"
                >
                  System Login
                </Link>
              </div>

            </div>
            
          </div>
        </footer>

        <ChatWidget />
      </body>
    </html>
  );
}