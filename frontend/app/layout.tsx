import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";
import Header from "@/components/Header";
import { GoogleAnalytics } from '@next/third-parties/google';
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// =============================================================
// ADVANCED SEO METADATA (Open Graph, Twitter, Keywords)
// =============================================================
export const metadata: Metadata = {
  title: {
    default: "DYNA WISDOM | Modern High-Tech Software Development & AI Solutions",
    template: "%s | DYNA WISDOM",
  },
  description: "DYNA WISDOM develops and sells cutting-edge software applications, driven by our modern, high-tech engineers. Backed by a rich heritage of Japanese and Ugandan expertise, we deliver AI-oriented, world-class digital projects and enterprise solutions.",
  keywords: [
    "modern high-tech engineers", "software development", "sell software applications", 
    "AI-backed solutions", "AI-oriented projects", "Japanese engineers", "Ugandan engineers", 
    "cloud hosting", "AI avatars", "translation API", "AI daily reporting", "virtual workspace", 
    "AI recruiter", "enterprise software", "Uganda tech", "Japan tech", "digital transformation", 
    "DYNA WISDOM", "Akademia"
  ],
  authors: [{ name: "DYNA WISDOM" }],
  creator: "DYNA WISDOM",
  publisher: "DYNA WISDOM",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-pod.net",
    siteName: "DYNA WISDOM",
    title: "DYNA WISDOM | Modern High-Tech Software Development & AI Solutions",
    description: "Driven by modern, high-tech engineers, we develop and sell cutting-edge software applications. Backed by a rich heritage of Japanese and Ugandan expertise, delivering AI-oriented, world-class digital projects.",
    images: [
      {
        url: "https://ai-pod.net/images/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "DYNA WISDOM - Modern High-Tech Software Development and AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DYNA WISDOM | Modern High-Tech Software Development & AI Solutions",
    description: "Driven by modern, high-tech engineers, we develop and sell cutting-edge software applications. Backed by a rich heritage of Japanese and Ugandan expertise.",
    images: ["https://ai-pod.net/images/og-preview.jpg"],
  },
};

// =============================================================
// JSON-LD SCHEMA MARKUP (For Google Search Ranking & Knowledge Graph)
// =============================================================
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DYNA WISDOM",
  "alternateName": "Akademia Group",
  "url": "https://ai-pod.net",
  "logo": "https://ai-pod.net/images/logo.png",
  "description": "DYNA WISDOM develops and sells modern, high-tech software applications. Powered by a rich heritage of expert Japanese and Ugandan engineers, we deliver AI-backed, AI-oriented, and world-class digital projects including translation APIs, AI avatars, and virtual workspaces.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Plot 2133, Tank Hill Road, Muyenga",
    "addressLocality": "Kampala",
    "addressCountry": "UG"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+81-90-5756-3969",
    "contactType": "customer service",
    "areaServed": ["UG", "JP"],
    "availableLanguage": ["English", "Japanese"]
  },
  "sameAs": [
    "https://www.akademia.co.jp/",
    "https://ai-dojo-opal.vercel.app/",
    "https://uj-tc-api.akademia.co.jp/",
    "https://ai-daily-report.akademia.co.jp/",
    "https://ai-avatar.akademia.co.jp/",
    "https://vf.akademia.co.jp/",
    "https://ai-recruiter.akademia.co.jp/"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        {/* ================= PWA META TAGS ================= */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0B1E3D" />

        {/* Inject JSON-LD Schema for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white">
        {/* ================= HEADER ================= */}
        <Header />

        <div className="flex-1 flex flex-col">{children}</div>

        {/* ================= PROFESSIONAL FOOTER ================= */}
        <footer className="w-full bg-[#0B1E3D] text-slate-300 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
              
              {/* Column 1: Brand & Core */}
              <div>
                <h3 className="text-white font-bold text-xl mb-4 tracking-tight">DYNA WISDOM</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Bridging innovation between Japan and Uganda. Our modern, high-tech engineers develop and sell cutting-edge software applications, delivering wonderful, AI-backed digital projects and immersive enterprise experiences.
                </p>
                <Link 
                  href="/contact" 
                  className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors flex items-center gap-2 group"
                >
                  Get in touch 
                  <span className="group-hover:translate-x-1 transition-transform" aria-hidden>→</span>
                </Link>
              </div>

              {/* Column 2: Our Ecosystem */}
              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Our Ecosystem</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="https://www.akademia.co.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span> Akademia Japan</a></li>
                  <li><a href="https://ai-dojo-opal.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span> AI DOJO Team</a></li>
                  <li><a href="https://uj-tc-api.akademia.co.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span> Makerere Translation API</a></li>
                  <li><a href="https://ai-daily-report.akademia.co.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span> AI-POD Reporting</a></li>
                  <li><a href="https://ai-avatar.akademia.co.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span> AI Avatar Platform</a></li>
                  <li><a href="https://vf.akademia.co.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span> Virtual Workspace</a></li>
                  <li><a href="https://ai-recruiter.akademia.co.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></span> UICT AI Recruiter</a></li>
                </ul>
              </div>

              {/* Column 3: Important Links */}
              <div>
                <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-5">Important Links</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/contact" className="hover:text-yellow-400 transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Locations & Contact</Link></li>
                  <li><Link href="/privacy" className="hover:text-yellow-400 transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Privacy & Legal</Link></li>
                  <li><Link href="/activities" className="hover:text-yellow-400 transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> Company Activities</Link></li>
                  <li className="pt-4 mt-4 border-t border-slate-800">
                    <Link href="/admin" className="text-slate-500 hover:text-slate-300 transition-colors text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-3" title="System Access">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Internal Admin Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">Dyna Wisdom &copy; {currentYear}. All rights reserved.</span>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <span className="text-xs text-slate-600 hidden sm:inline">Built with precision in Kampala & Shizuoka.</span>
                <Link href="/admin" className="bg-slate-900/60 border border-slate-800 text-slate-600 font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-sm hover:border-slate-600 hover:text-slate-400 transition-all duration-500" title="System Access">
                  System Login
                </Link>
              </div>
            </div>
          </div>
        </footer>

        <ChatWidget />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}

        {/* ================= PWA SERVICE WORKER REGISTRATION ================= */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => console.log('SW registered:', registration.scope))
                    .catch((error) => console.log('SW registration failed:', error));
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}