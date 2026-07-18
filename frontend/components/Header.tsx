"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = {
    "Services": {
      path: "/services",
      subItems: {
        "AI & Data Science": {
          desc: "Intelligent systems and predictive modeling.",
          links: ["AI Consulting", "Data Governance", "Robotics Integration", "AI-powered SDLC"]
        },
        "Software Engineering": {
          desc: "Robust architecture for enterprise growth.",
          links: ["Enterprise Apps", "Digital Transformation", "Cloud Infrastructure", "Database Management"]
        },
        "Industrial Systems": {
          desc: "Hardware-level engineering and optimization.",
          links: ["Vehicle Software", "Embedded Systems", "Industry Machine Controls", "IoT Pipelines"]
        }
      }
    },
    "Tech Stack": {
      path: "/tech-stack",
      subItems: {
        "Web & Cloud": { 
          desc: "Modern, high-performance web and backend.", 
          links: ["Next.js (React)", "TypeScript", "Node.js", "Cloud Clusters"] 
        },
        "Mobile & Native": { 
          desc: "Cross-platform and hardware-integrated mobile.", 
          links: ["Flutter", "Swift/Kotlin", "Embedded C++", "Bare-metal Firmware"] 
        },
        "Design & UX": { 
          desc: "User-centric interface and system design.", 
          links: ["Vehicle UI/UX", "Machine Interfaces", "Prototyping", "Design Systems"] 
        }
      }
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-6 relative">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">AKADEMIA</Link>
        
        <div className="flex gap-8 text-sm font-medium text-white">
          {Object.entries(menuItems).map(([label, data]) => (
            <div key={label} className="relative" onMouseEnter={() => setActiveMenu(label)}>
              <Link href={data.path} className="hover:text-yellow-400 transition-colors">
                {label} ▾
              </Link>
            </div>
          ))}
          <Link href="/about" className="hover:text-yellow-400 transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link>
        </div>

        {/* Mega Menu Dropdown */}
        {activeMenu && (
          <div 
            className="absolute top-full left-0 w-full bg-white text-slate-900 p-12 shadow-2xl border-t border-slate-200 grid grid-cols-3 gap-8"
            onMouseLeave={() => setActiveMenu(null)}
          >
            {Object.entries(menuItems[activeMenu as keyof typeof menuItems].subItems).map(([key, data]) => (
              <div key={key} className="group p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <h4 className="font-bold text-lg mb-2 text-slate-950 border-b border-slate-100 pb-2">{key}</h4>
                <p className="text-slate-500 text-sm mb-4">{data.desc}</p>
                <ul className="space-y-2">
                  {data.links.map((link) => (
                    <li key={link} className="text-xs font-bold text-yellow-600 hover:text-slate-950 cursor-pointer flex items-center transition-colors">
                      <span className="mr-2 opacity-50">→</span> {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <Link href="/dashboard" className="bg-yellow-400 text-slate-900 px-6 py-2 rounded-sm font-bold text-sm hover:bg-yellow-500 transition-colors">
          Dashboard
        </Link>
      </nav>
    </header>
  );
}