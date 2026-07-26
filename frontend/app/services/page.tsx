"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("AI & Data");
  const [approachIndex, setApproachIndex] = useState(0);

  const techStack = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", 
    "Go", "Flutter", "Swift", "Kotlin", "AWS", 
    "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Redis",
    "TailwindCSS", "Framer Motion", "GraphQL", "Firebase"
  ];

  const serviceCategories = {
    "AI & Data": [
      "AI-Powered Products & Business Services",
      "AI Consulting & Strategy",
      "Data Science & Analytics",
      "Database Design & Management",
      "AI Engineering Talent",
      "Human-Centred AI Integration",
      "AI Across the Software Lifecycle",
      "Data Governance Consulting"
    ],
    "Application Development": ["Native Mobile Apps", "Cross-Platform Apps", "Web Applications", "API Development"],
    "Cloud": ["Cloud Migration", "Managed Cloud Services", "Infrastructure as Code", "Serverless Architecture"],
    "Cybersecurity": ["Security Audits", "Managed Security Services", "Compliance Consulting", "Penetration Testing"],
    "Digital Transformation": ["Strategy Consulting", "Process Automation", "Legacy Modernization"],
    "Software Engineering": ["Custom Software Development", "DevOps Engineering", "QA & Testing"],
    "Enterprise Applications": ["ERP Solutions", "CRM Development", "Enterprise Integration"]
  };

  const steps = [
    { title: "Discovery", desc: "A rigorous diagnostic phase involving technical audits and stakeholder alignment to define precise project requirements.", step: "01" },
    { title: "Design", desc: "Architecting high-performance technical blueprints that align structural design with long-term business objectives.", step: "02" },
    { title: "Engineering", desc: "Precision-driven execution using agile methodologies to build resilient, scalable, enterprise-grade infrastructure.", step: "03" },
    { title: "Maintenance", desc: "Ensuring operational continuity through proactive monitoring, security patching, and high-availability systems management.", step: "04" },
    { title: "Optimization", desc: "Applying data-driven insight to accelerate performance, maximize throughput, and drive continuous growth.", step: "05" }
  ];

  // Show 1 card on mobile, 2 on tablet, 3 on desktop
  const [visibleCount, setVisibleCount] = useState(3);

  const nextStep = () => setApproachIndex((prev) => (prev < steps.length - visibleCount ? prev + 1 : prev));
  const prevStep = () => setApproachIndex((prev) => (prev > 0 ? prev - 1 : prev));

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* SECTION 1: Hero */}
      <section className="relative w-full min-h-[45vh] md:h-[60vh] flex items-center justify-center px-6 py-16 md:p-12 overflow-hidden border-b border-slate-200 text-center">
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
          <Link href="/" className="text-white/80 hover:text-white font-medium flex items-center gap-2 text-sm md:text-lg">
            Home <span className="opacity-50">/</span> <span className="text-yellow-400">Services</span>
          </Link>
        </div>
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/image copy 8.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full text-white">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight">Diverse IT Services</h1>
        </div>
      </section>

      {/* SECTION 2: Services We Provide */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 mb-10 md:mb-16 text-center">
          Services we provide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4 flex flex-wrap md:flex-col gap-2 md:gap-4 md:space-y-0 md:border-r border-slate-200 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {Object.keys(serviceCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`flex-shrink-0 md:block md:w-full text-left text-sm sm:text-base md:text-xl font-semibold px-4 py-2 md:p-4 rounded-full md:rounded-none transition-colors ${
                  activeTab === category
                    ? "text-yellow-600 bg-slate-50 md:border-r-2 md:border-yellow-600"
                    : "text-slate-600 hover:text-slate-950 bg-slate-100 md:bg-transparent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {serviceCategories[activeTab as keyof typeof serviceCategories].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 md:p-6 bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors cursor-pointer group">
                    <span className="font-semibold text-sm md:text-base text-slate-900">{service}</span>
                    <span className="text-slate-400 group-hover:text-yellow-600 transition-colors">→</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 3: Dyna Wisdom Makes It Possible To */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 mb-12 md:mb-20 text-center">
          Dyna Wisdom makes it possible to
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Run</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Keep operations seamless through managed support, round-the-clock security, and comprehensive
              infrastructure maintenance.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Grow</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Enhance systems with new IT solutions, legacy modernization, and scalable on-demand resources.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Transform</h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Support business evolution with AI expertise, technology consulting, and digital transformation
              strategy.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Dyna Wisdom's Proven Approach */}
      <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto border-t border-slate-100 text-center overflow-hidden">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 mb-10 md:mb-16">
          Dyna Wisdom's proven approach
        </h2>
        <div className="relative flex items-center justify-center gap-2 md:gap-4">
          <button
            onClick={prevStep}
            disabled={approachIndex === 0}
            className="flex-shrink-0 p-2 md:p-4 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="text-lg md:text-2xl text-slate-400">{'<'}</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
            {steps.slice(approachIndex, approachIndex + 3).slice(0, typeof window !== "undefined" && window.innerWidth < 640 ? 1 : 3).map((item, index) => (
              <div key={index} className="bg-slate-50 p-6 md:p-8 border border-slate-100 h-full flex flex-col text-left">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-8 md:mb-12 flex-grow font-medium">{item.desc}</p>
                <div className="mt-auto border-t border-slate-200 pt-4 text-sm font-bold text-slate-400">{item.step}</div>
              </div>
            ))}
          </div>

          <button
            onClick={nextStep}
            disabled={approachIndex >= steps.length - 3}
            className="flex-shrink-0 p-2 md:p-4 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="text-lg md:text-2xl text-slate-400">{'>'}</span>
          </button>
        </div>
      </section>

      {/* SECTION 5: Advanced Tech Stack */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 mb-6 md:mb-8">
            Advanced tech stack
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            Partner with <span className="font-bold text-slate-950">Dyna Wisdom</span>, a Ugandan technology
            company built on the engineering standards of{" "}
            <span className="font-bold text-slate-950">Akademia Company Ltd, Japan</span>. Our team specializes
            in <span className="underline decoration-yellow-400 underline-offset-4 font-semibold">web</span> and{" "}
            <span className="underline decoration-yellow-400 underline-offset-4 font-semibold">mobile</span>{" "}
            development, delivering powerful, efficient{" "}
            <span className="underline decoration-yellow-400 underline-offset-4 font-semibold">back-end</span>{" "}
            architecture and intuitive{" "}
            <span className="underline decoration-yellow-400 underline-offset-4 font-semibold">UI/UX</span>.
          </p>
        </div>
        <div className="relative flex overflow-x-hidden py-6 md:py-10 bg-slate-50">
          <motion.div className="flex gap-8 md:gap-16 whitespace-nowrap" initial={{ x: 0 }} animate={{ x: "-50%" }} transition={{ ease: "linear", duration: 30, repeat: Infinity }}>
            {techStack.concat(techStack).map((tech, index) => (
              <div key={index} className="text-base sm:text-xl md:text-2xl font-bold text-slate-950 uppercase tracking-tighter opacity-40 hover:opacity-100 transition-opacity">
                {tech}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}