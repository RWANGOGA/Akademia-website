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
      "Artificial Intelligence", "AI Consulting Services", 
      "AI tools for business transformation", "Data Science",
      "Database creation and management", "Hire AI engineers",
      "AI powered Robotics integration", "AI Across the SDLC", "Data Governance Consulting"
    ],
    "Application Development": ["Native Mobile Apps", "Cross-Platform Apps", "Web Apps", "API Development"],
    "Cloud": ["Cloud Migration", "Managed Cloud Services", "Infrastructure as Code", "Serverless Architecture"],
    "Cybersecurity": ["Security Audits", "Managed Security Services", "Compliance Consulting", "Penetration Testing"],
    "Digital Transformation": ["Strategy Consulting", "Process Automation", "Legacy Modernization"],
    "Software Engineering": ["Custom Software Development", "DevOps Engineering", "QA & Testing"],
    "Enterprise Applications": ["ERP Solutions", "CRM Development", "Enterprise Integration"]
  };

  const steps = [
    { title: "Discovery", desc: "Rigorous diagnostic phase involving technical audits and stakeholder alignment to define precise project requirements.", step: "01" },
    { title: "Design", desc: "Architecting high-performance technical blueprints that align structural design with long-term business objectives.", step: "02" },
    { title: "Engineering", desc: "Precision-driven execution utilizing agile methodologies to build resilient, scalable enterprise-grade infrastructure.", step: "03" },
    { title: "Maintenance", desc: "Ensuring operational continuity through proactive monitoring, security patching, and high-availability systems management.", step: "04" },
    { title: "Optimization", desc: "Leveraging AI and data-driven insights to accelerate performance, maximize throughput, and drive continuous growth.", step: "05" }
  ];

  const nextStep = () => setApproachIndex((prev) => (prev < steps.length - 3 ? prev + 1 : prev));
  const prevStep = () => setApproachIndex((prev) => (prev > 0 ? prev - 1 : prev));

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* SECTION 1: Hero */}
      <section className="relative w-full h-[60vh] flex items-center justify-center p-12 overflow-hidden border-b border-slate-200 text-center">
        <div className="absolute top-6 left-6 z-20">
          <Link href="/" className="text-white/80 hover:text-white font-medium flex items-center gap-2 text-lg">
            Home <span className="opacity-50">/</span> <span className="text-yellow-400">Services</span>
          </Link>
        </div>
        <div className="absolute inset-0 z-0" style={{ backgroundImage: "url('/images/image copy 8.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-slate-900/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto w-full text-white">
          <h1 className="text-6xl md:text-7xl font-bold">Diverse IT Services</h1>
        </div>
      </section>

      {/* SECTION 2: Services We Provide */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-slate-950 mb-16 text-center">Services we provide</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 space-y-4 border-r border-slate-200">
            {Object.keys(serviceCategories).map((category) => (
              <button key={category} onClick={() => setActiveTab(category)} className={`block w-full text-left text-xl font-semibold p-4 transition-colors ${activeTab === category ? "text-yellow-600 border-r-2 border-yellow-600 bg-slate-50" : "text-slate-600 hover:text-slate-950"}`}>{category}</button>
            ))}
          </div>
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {serviceCategories[activeTab as keyof typeof serviceCategories].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors cursor-pointer group">
                    <span className="font-semibold text-slate-900">{service}</span>
                    <span className="text-slate-400 group-hover:text-yellow-600 transition-colors">→</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 3: Akademia Makes It Possible To */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <h2 className="text-5xl font-bold text-slate-950 mb-20 text-center">Akademia makes it possible to</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="text-center"><div className="text-4xl mb-6">⚙️</div><h3 className="text-2xl font-bold mb-4">Run</h3><p className="text-gray-600 leading-relaxed">Keep operations seamless through managed support, 24/7 security, and comprehensive infrastructure maintenance.</p></div>
          <div className="text-center"><div className="text-4xl mb-6">📈</div><h3 className="text-2xl font-bold mb-4">Grow</h3><p className="text-gray-600 leading-relaxed">Enhance systems via new IT solutions engineered, legacy modernization, and scalable on-demand resources.</p></div>
          <div className="text-center"><div className="text-4xl mb-6">✨</div><h3 className="text-2xl font-bold mb-4">Transform</h3><p className="text-gray-600 leading-relaxed">Support business evolution with AI expertise, new tech consultations, and digital transformation strategy.</p></div>
        </div>
      </section>

      {/* SECTION 4: Akademia's Proven Approach */}
      <section className="py-24 px-4 max-w-7xl mx-auto border-t border-slate-100 text-center overflow-hidden">
        <h2 className="text-5xl font-bold text-slate-950 mb-16">Akademia's proven approach</h2>
        <div className="relative flex items-center justify-center gap-4">
          <button onClick={prevStep} className="p-4 rounded-full border border-slate-200 hover:bg-slate-50"><span className="text-2xl text-slate-400">{'<'}</span></button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {steps.slice(approachIndex, approachIndex + 3).map((item, index) => (
              <div key={index} className="bg-slate-50 p-8 border border-slate-100 h-full flex flex-col text-left">
                <h3 className="text-2xl font-bold mb-6">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-12 flex-grow font-medium">{item.desc}</p>
                <div className="mt-auto border-t border-slate-200 pt-4 text-sm font-bold text-slate-400">{item.step}</div>
              </div>
            ))}
          </div>
          <button onClick={nextStep} className="p-4 rounded-full border border-slate-200 hover:bg-slate-50"><span className="text-2xl text-slate-400">{'>'}</span></button>
        </div>
      </section>

      {/* SECTION 5: Advanced Tech Stack */}
      <section className="py-24 bg-white border-t border-slate-100 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 mb-16">
          <h2 className="text-5xl font-bold text-slate-950 mb-8">Advanced tech stack</h2>
          <p className="text-lg text-slate-600 leading-relaxed">Partner with Akademia Company Ltd professionals who specialize in <span className="underline decoration-yellow-400 underline-offset-4 font-semibold">web</span> and <span className="underline decoration-yellow-400 underline-offset-4 font-semibold">mobile</span> services. We use modern frameworks to deliver powerful, efficient <span className="underline decoration-yellow-400 underline-offset-4 font-semibold">back-end</span> architecture and intuitive <span className="underline decoration-yellow-400 underline-offset-4 font-semibold">UI/UX</span>.</p>
        </div>
        <div className="relative flex overflow-x-hidden py-10 bg-slate-50">
          <motion.div className="flex gap-16 whitespace-nowrap" initial={{ x: 0 }} animate={{ x: "-50%" }} transition={{ ease: "linear", duration: 30, repeat: Infinity }}>
            {techStack.concat(techStack).map((tech, index) => (
              <div key={index} className="text-2xl font-bold text-slate-950 uppercase tracking-tighter opacity-40 hover:opacity-100 transition-opacity">{tech}</div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}