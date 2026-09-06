"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const menuItems = {
    "Services": {
      path: "/services",
      subItems: {
        "AI & Data Science": {
          desc: "Intelligent systems and predictive modeling.",
          href: "/services"
        },
        "Software Engineering": {
          desc: "Robust architecture for enterprise growth.",
          href: "/services"
        },
        "Industrial Systems": {
          desc: "Hardware-level engineering and optimization.",
          href: "/services"
        }
      }
    },
    "Tech Stack": {
      path: "/tech-stack",
      subItems: {
        "Web & Cloud": {
          desc: "Modern, high-performance web and backend.",
          href: "/tech-stack"
        },
        "Mobile & Native": {
          desc: "Cross-platform and hardware-integrated mobile.",
          href: "/tech-stack"
        },
        "Design & UX": {
          desc: "User-centric interface and system design.",
          href: "/tech-stack"
        }
      }
    }
  };

  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileExpanded(null);
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative">
        <Link
          href="/"
          className="text-lg sm:text-xl font-bold tracking-tight text-white"
          onClick={closeMobileMenu}
        >
          DYNA WISDOM
        </Link>

        {/* Desktop nav (hidden on mobile) */}
        <div className="hidden lg:flex gap-8 text-sm font-medium text-white">
          {Object.entries(menuItems).map(([label, data]) => (
            <div key={label} className="relative" onMouseEnter={() => setActiveMenu(label)}>
              <Link href={data.path} className="hover:text-yellow-400 transition-colors">
                {label} ▾
              </Link>
            </div>
          ))}
          <Link href="/products" className="hover:text-yellow-400 transition-colors">Products</Link>
          <Link href="/activities" className="hover:text-yellow-400 transition-colors">Activities</Link>
          <Link href="/about" className="hover:text-yellow-400 transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link>
        </div>

        {/* Desktop mega menu dropdown */}
        {activeMenu && (
          <div
            className="hidden lg:grid absolute top-full left-0 w-full bg-white text-slate-900 p-12 shadow-2xl border-t border-slate-200 grid-cols-3 gap-8"
            onMouseLeave={() => setActiveMenu(null)}
          >
            {Object.entries(menuItems[activeMenu as keyof typeof menuItems].subItems).map(([key, data]) => (
              <div key={key} className="group p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h4 className="font-bold text-lg mb-2 text-slate-950 border-b border-slate-100 pb-2">{key}</h4>
                <p className="text-slate-500 text-sm mb-4">{data.desc}</p>
                <ul className="space-y-2">
                  <li key={data.href} className="text-xs font-bold text-yellow-600 hover:text-slate-950 cursor-pointer flex items-center transition-colors">
                    <Link href={data.href} className="flex items-center">
                      <span className="mr-2 opacity-50">→</span> View {key}
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden text-white p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-slate-950 border-t border-slate-800 max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 sm:px-6 py-4 space-y-1">
            {Object.entries(menuItems).map(([label, data]) => {
              const isExpanded = mobileExpanded === label;
              return (
                <div key={label} className="border-b border-slate-800/60">
                  <div className="flex items-center justify-between py-3">
                    <Link
                      href={data.path}
                      onClick={closeMobileMenu}
                      className="text-white font-medium text-base"
                    >
                      {label}
                    </Link>
                    <button
                      onClick={() => setMobileExpanded(isExpanded ? null : label)}
                      className="p-2 text-slate-400"
                      aria-label={`Expand ${label} submenu`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="pb-3 space-y-4">
                      {Object.entries(data.subItems).map(([key, sub]) => (
                        <div key={key} className="pl-2">
                          <h5 className="text-yellow-400 font-bold text-sm mb-1">{key}</h5>
                          <p className="text-slate-400 text-xs mb-2">{sub.desc}</p>
                          <ul className="space-y-1.5">
                            <li className="text-slate-300 text-sm flex items-center">
                              <Link href={sub.href} onClick={closeMobileMenu} className="flex items-center">
                                <span className="mr-2 text-yellow-500 opacity-70">→</span> View {key}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/products"
              onClick={closeMobileMenu}
              className="block py-3 text-white font-medium text-base border-b border-slate-800/60"
            >
              Products
            </Link>
            <Link
              href="/activities"
              onClick={closeMobileMenu}
              className="block py-3 text-white font-medium text-base border-b border-slate-800/60"
            >
              Activities
            </Link>
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="block py-3 text-white font-medium text-base border-b border-slate-800/60"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="block py-3 text-white font-medium text-base border-b border-slate-800/60"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}