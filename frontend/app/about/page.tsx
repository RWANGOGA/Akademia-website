"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutUsPage() {
  const products = [
    { name: "AI AVATAR AKADEMIA", link: "https://ai-avatar.akademia.co.jp", desc: "Interactive AI-driven avatar solutions.", image: "/images/image copy 10.png" },
    { name: "VIRTUAL WORLD", link: "https://vf.akademia.co.jp/", desc: "Immersive cyberspace environments.", image: "/images/image copy 11.png" },
    { name: "AIPOD", link: "https://ai-daily-report.akademia.co.jp/", desc: "AI-powered daily reporting systems.", image: "/images/image copy 13.png" },
    { name: "TRANSLATION", link: "https://uj-tc-api.akademia.co.jp/", desc: "Advanced linguistic translation services.", image: "/images/image copy 12.png" },
    { name: "AI DOJO", link: "https://ai-dojo-opal.vercel.app/", desc: "Skill development and training platform.", image: "/images/image copy 15.png" },
    { name: "AI RECRUITER", link: "https://ai-recruiter.akademia.co.jp", desc: "Automated AI talent acquisition.", image: "/images/image copy 14.png" },
  ];

  const solutions = [
    "Artificial Intelligence", "Machine Learning", "Computer Vision", 
    "Deep Learning", "Cryptocurrency projects", "Big Data", 
    "Blockchain", "Information Retrieval", "High-load systems", 
    "DevOps", "Natural Language Processing", "Salesforce"
  ];

  const industries = [
    { title: "Finance", tagline: "High-Velocity Systems" },
    { title: "Internet of things", tagline: "Connected Ecosystems" },
    { title: "Healthcare", tagline: "Life-Saving Analytics" },
    { title: "Automotive", tagline: "Next-Gen Driving Tech" },
    { title: "Startups", tagline: "Rapid Scaling Solutions" },
    { title: "iGaming", tagline: "Immersive Experiences" },
    { title: "Multimedia", tagline: "Dynamic Media Engines" },
    { title: "Travel & Hospitality", tagline: "Global Booking Engines" },
    { title: "Universities & Learning", tagline: "Advanced EdTech" },
    { title: "Local Government", tagline: "Smart Administration" },
    { title: "Tourism & Leisure", tagline: "Interactive Experiences" },
    { title: "Transport Sector", tagline: "Optimized Logistics" },
  ];

  return (
    <div className="min-h-screen bg-[#0a1120] text-white">
      {/* SITE-WIDE HEADER */}
      <header className="fixed top-0 w-full z-50 bg-[#0a1120]/90 backdrop-blur-md border-b border-white/10 p-6">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-yellow-500">AKADEMIA</Link>
          <div className="flex gap-8 font-medium">
            <Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link>
            <Link href="/services" className="hover:text-yellow-500 transition-colors">Services</Link>
            <Link href="/about" className="text-yellow-500">About Us</Link>
          </div>
          <Link href="/dashboard" className="bg-yellow-500 text-black px-6 py-2 rounded font-bold hover:bg-yellow-400 transition-all">
            Dashboard
          </Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-end p-12 overflow-hidden pt-32">
        <video
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-40"
          src="https://www.thoughtworks.com/content/dam/thoughtworks/multimedia/video/what-we-do/play-on-loop-video/Whatwedo_Glowycompressed.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full mb-12">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            Get to Know Your<br />Software Experts
          </motion.h1>
        </div>
      </section>

      {/* CORPORATE CONTENT */}
      <main className="max-w-7xl mx-auto p-12 grid md:grid-cols-2 gap-16 py-20">
        <section>
          <h2 className="text-3xl font-bold text-yellow-500 mb-6">Company Profile</h2>
          <div className="space-y-4 text-gray-300">
            <p><span className="text-white font-bold">Established:</span> June 30th, 2003</p>
            <p><span className="text-white font-bold">President:</span> Gen Suzuki</p>
            <div className="pt-4">
              <h3 className="text-xl font-semibold text-white mb-2">Business Contents</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Development and provision of remote education, video-conference, and other online conference systems.</li>
                <li>Smartphone application development (iPhone/Android), Web page editing, and WEB system architecture.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-yellow-500 mb-6">Locations</h2>
          <div className="space-y-6 text-gray-300">
            <div><h3 className="font-bold text-white">Head Office</h3><p className="text-sm">NTT Teramachi Building, 1st Bldg. 3floor, 50 Teramachi, Tottori, Japan</p></div>
            <div><h3 className="font-bold text-white">Tokyo Office</h3><p className="text-sm">5th floor, FPG Links Jinnan, 1-11-4 Jinnan, Shibuya-ku, Tokyo 150-0041, Japan</p></div>
          </div>
        </section>
      </main>

      {/* PRODUCTS SECTION */}
      <section className="py-24 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="text-5xl font-bold mb-16 text-center">Our Products</h2>
          <div className="space-y-24">
            {products.map((product, idx) => (
              <div key={idx} className={`flex flex-col md:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2">
                  <h3 className="text-4xl font-bold mb-6">{product.name}</h3>
                  <p className="text-lg text-slate-600 mb-8">{product.desc}</p>
                  <Link href={product.link} target="_blank" className="inline-block bg-slate-900 text-white px-8 py-3 rounded font-bold hover:bg-yellow-500 transition-all">
                    View Project
                  </Link>
                </div>
                <div className="md:w-1/2 w-full">
                  <div className="w-full h-[350px] bg-gray-100 rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AKADEMIA ADVANTAGES */}
      <section className="bg-slate-50 py-24 px-12 text-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">Akademia's advantages</h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { title: "Cross-Cultural Expertise", text: "Bridging Japanese engineering precision with East African technical talent." },
              { title: "Global Reach", text: "Strategically positioned in Japan and Uganda for round-the-clock support." },
              { title: "Robust Tech Ecosystem", text: "Masters of a diverse stack—from IoT to mobile apps and cloud computing." },
              { title: "Precision-Driven Delivery", text: "Synergy of skilled professionals and efficient processes ensuring reliability." }
            ].map((adv, i) => (
              <div key={i}>
                <h3 className="text-2xl font-bold mb-4">{adv.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed">{adv.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES WE WORK WITH */}
      <section className="py-24 bg-gray-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="text-5xl font-bold mb-16 border-l-4 border-yellow-500 pl-6">
            Industries <span className="text-slate-500">we work with</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="col-span-1 border-r border-gray-200">
              <h3 className="text-xl font-bold uppercase tracking-wider mb-8">Solutions</h3>
              <ul className="space-y-4">
                {solutions.map((item, idx) => (
                  <li key={idx} className="flex items-center text-slate-700 font-medium">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-4"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 grid md:grid-cols-2 gap-6">
              {industries.map((industry, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                  <h4 className="text-lg font-bold text-slate-900">{industry.title}</h4>
                  <p className="text-yellow-600 font-semibold text-sm">{industry.tagline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}