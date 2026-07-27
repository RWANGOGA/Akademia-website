"use client"; // Required for state management and animations

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header"; // Import your new Header component

// Structure definition for our capabilities matrix
interface Capability {
  id: string;
  title: string;
  description: string;
  imagePath?: string; // Optional path if image is assigned
}

export default function HomePage() {
  const companies = [
    "Dyna Wisdom Uganda",
    "Akademia Company LTD (Japan)",
    "Dyna Wisdom Uganda",
    "Akademia Company LTD (Japan)",
    "Dyna Wisdom Uganda",
    "Akademia Company LTD (Japan)",
    "Dyna Wisdom Uganda",
    "Akademia Company LTD (Japan)",
  ];

  // Core Capabilities dataset
  const capabilities: Capability[] = [
    {
      id: "ai-data",
      title: "AI & Data Science",
      description: "Leveraging state-of-the-art machine learning algorithms and deep analytics to transform raw datasets into intelligent, actionable execution systems.",
      imagePath: "/images/image copy 6.png", 
    },
    {
      id: "mobile",
      title: "Mobile Development",
      description: "Engineering lightweight, ultra-responsive native and cross-platform mobile environments structured for high-performance scale.",
      imagePath: "/images/image copy 3.png", 
    },
    {
      id: "software",
      title: "Software Development",
      description: "Crafting robust, bespoke enterprise systems using strict engineering standards to build reliable architecture for fast-growing businesses.",
      imagePath: "/images/image copy 5.png",
    },
    {
      id: "embedded",
      title: "Embedded Systems",
      description: "Writing highly optimized, bare-metal low-level machine code designed for extreme micro-controller hardware reliability.",
    },
    {
      id: "iot",
      title: "IoT Solutions",
      description: "Architecting connected end-to-end device ecosystems with seamless telemetry processing pipelines and real-time operational sync.",
    },
    {
      id: "cloud",
      title: "Cloud Computing",
      description: "To guarantee unbeatable uptime and ironclad performance metrics, Dyna Wisdom leverages our parent company Akademia's own custom cluster of private dedicated bare-metal cloud servers, hosted directly in Tokyo, Japan.",
      imagePath: "/images/image copy 7.png", 
    },
  ];

  const [activeTab, setActiveTab] = useState<string>("ai-data");
  const currentCapability = capabilities.find((c) => c.id === activeTab) || capabilities[0];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      {/* ================= NAVIGATION (Replaced with Header Component) ================= */}
      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-slate-900 min-h-[90vh] flex items-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{
            backgroundImage: "url('/images/image.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.45, 
            filter: "grayscale(100%) contrast(125%) brightness(140%)" 
          }}
        ></div>

        <div className="absolute inset-0 opacity-5 text-xs text-white font-mono overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="whitespace-nowrap">
              const DynaWisdom = {`{`} parentCompany: "Akademia Japan", bridging: "Japan-Uganda", excellence: true {`}`}
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-md">
              Dyna Wisdom<br />
              Uganda
            </h1>

            <p className="text-lg md:text-xl text-yellow-400 font-medium mb-4 max-w-2xl drop-shadow-sm">
              A Ugandan technology company, proudly backed by Akademia Company Ltd, Japan
            </p>

            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl drop-shadow-sm">
              Fostering Innovation and Creativity
            </p>

            {/* Routes straight to the Contact page, where the inquiry is sent
                directly to the Director via pre-filled email / WhatsApp */}
            <Link 
              href="/contact"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-8 py-4 rounded-sm transition-colors duration-300 text-lg shadow-lg"
            >
              Let's discuss your project
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-slate-800/60 backdrop-blur-sm border-t border-slate-700/50 py-6 overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {companies.concat(companies).map((company, index) => (
              <div key={index} className="flex items-center text-gray-300 text-sm mx-10 font-medium">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-4 opacity-80"></div>
                {company}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= REST OF YOUR PAGE CONTENT REMAINS UNCHANGED ================= */}
      <section className="bg-white text-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight text-slate-900">
                Our digital solutions are a direct result of engineering precision and cross-cultural dedication cultivated over the years.
              </h2>
            </div>
            <div className="flex items-center space-x-6 lg:border-l lg:border-slate-200 lg:pl-12">
              <div className="bg-slate-900 text-white p-4 font-bold text-center text-xs tracking-wider rounded-none uppercase flex flex-col justify-center items-center h-20 w-24 relative border border-slate-700">
                <span className="text-[9px] opacity-60">Global</span>
                <span className="text-sm font-black text-yellow-400">Tech</span>
                <span className="text-[8px] opacity-60">Rating</span>
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900">4.9 ON CLUTCH</div>
                <div className="flex text-yellow-400 my-1 text-lg">★★★★★</div>
                <div className="text-gray-500 text-sm">100+ global reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Dyna Wisdom, powered by Akademia Japan
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Dyna Wisdom is a Ugandan technology company built in close partnership with Akademia Company Ltd, a well-established Japanese software development firm. Together, we extend elite Japanese technical standards into robust, locally-rooted operations in Uganda.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Our combined teams seamlessly analyze your objectives to architect enterprise-grade IT solutions. By merging strict Japanese engineering principles with energetic East African tech talent, this shared partnership and track record are your guarantee of success.
              </p>
              <div className="pt-4">
                <Link 
                  href="/contact"
                  className="inline-block bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-8 py-4 rounded-sm transition-colors duration-300 text-base"
                >
                  Request consultation
                </Link>
              </div>
            </div>
            <div 
              className="relative rounded-lg border border-slate-800/80 min-h-[400px] bg-cover bg-center bg-no-repeat overflow-hidden shadow-2xl"
              style={{ backgroundImage: "url('/images/image copy.png')" }}
            >
              <div className="absolute inset-0 bg-slate-950/20 mix-blend-multiply pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CORE CAPABILITIES (UPDATED FOR MOBILE IMAGE PLACEMENT) ================= */}
      <section className="bg-white text-slate-900 py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16 tracking-tight">
            Our core capabilities
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col space-y-4">
              {capabilities.map((capability) => {
                const isSelected = activeTab === capability.id;
                return (
                  <div key={capability.id} className="group">
                    <button
                      onClick={() => setActiveTab(capability.id)}
                      className={`w-full text-left font-bold text-2xl md:text-3xl transition-all duration-300 py-2 border-b border-transparent ${
                        isSelected ? "text-slate-950 tracking-wide" : "text-gray-400 hover:text-slate-600"
                      }`}
                    >
                      {capability.title}
                    </button>

                    {isSelected && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-2 pb-4 pr-4 max-w-xl"
                      >
                        {/* Mobile-only image: appears immediately under the clicked capability, before the text */}
                        <div className="lg:hidden w-full aspect-video max-w-sm bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center p-4 overflow-hidden shadow-sm mb-4">
                          {capability.imagePath ? (
                            <div
                              className="w-full h-full bg-contain bg-center bg-no-repeat"
                              style={{ backgroundImage: `url('${capability.imagePath}')` }}
                            />
                          ) : (
                            <div className="text-center p-4 border border-dashed border-slate-200 rounded-md">
                              <div className="text-yellow-500 text-2xl mb-1">✦</div>
                              <p className="text-xs font-semibold text-slate-800">{capability.title}</p>
                              <p className="text-[10px] text-slate-400 mt-1 font-mono">Architecture Node Ready</p>
                            </div>
                          )}
                        </div>

                        <div className="text-gray-600 text-base md:text-lg leading-relaxed">
                          {capability.description}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
              <div className="pt-8">
                <Link 
                  href="/services"
                  className="inline-flex items-center font-bold text-slate-950 border-b-2 border-slate-950 pb-1 hover:text-yellow-600 hover:border-yellow-600 transition-colors duration-200"
                >
                  All capabilities <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            {/* Desktop-only side panel image (hidden on mobile, where inline image above is used instead) */}
            <div className="hidden lg:flex relative w-full aspect-square max-w-[500px] mx-auto lg:ml-auto bg-slate-50 border border-slate-100 rounded-lg items-center justify-center p-6 overflow-hidden shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCapability.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full p-8 flex items-center justify-center"
                >
                  {currentCapability.imagePath ? (
                    <div 
                      className="w-full h-full bg-contain bg-center bg-no-repeat"
                      style={{ backgroundImage: `url('${currentCapability.imagePath}')` }}
                    />
                  ) : (
                    <div className="text-center p-6 border border-dashed border-slate-200 rounded-md">
                      <div className="text-yellow-500 text-3xl mb-2">✦</div>
                      <p className="text-sm font-semibold text-slate-800">{currentCapability.title}</p>
                      <p className="text-xs text-slate-400 mt-1 font-mono">Architecture Node Ready</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT OUR DEVELOPMENT SERVICES ================= */}
      <section className="bg-white text-slate-900 py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-lg overflow-hidden shadow-lg order-2 lg:order-1">
              <img
                src="https://realmdigital.com/app/uploads/2023/03/Development.webp"
                alt="Dyna Wisdom development team at work"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                About Our Development Services
              </h2>

              <div className="w-16 h-1 bg-yellow-400 mb-8"></div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Dyna Wisdom is a leading Ugandan software development company, specialising in custom digital
                solutions backed by the technical expertise and engineering discipline of our parent company,
                Akademia Company Ltd, Japan. Our authority in the digital development sector is built on
                delivering tailored, future-proof solutions that drive growth and operational excellence for our
                clients.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                By combining the latest advancements in technology with innovative thinking and deep industry
                expertise, our team of skilled developers, designers, and strategists work hand-in-hand with our
                clients to understand their unique requirements, goals, and challenges &mdash; enabling us to
                create tailored digital products that empower businesses and foster growth.
              </p>

              <p className="text-gray-600 text-lg leading-relaxed">
                We prioritise building future-proof solutions that can adapt and grow with your business in the
                ever-evolving digital landscape. Our comprehensive services span everything from web and mobile
                app development to system integrations and infrastructure optimisation, ensuring your technology
                investments are aligned with your strategic objectives and built to last.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="bg-white text-slate-900 py-20 sm:py-24 md:py-28 border-t border-slate-200 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0B1E3D] leading-tight tracking-tight mb-6 sm:mb-8">
            Ready to build, integrate, and deploy with confidence?
          </h2>

          <p className="text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10">
            Partner with Dyna Wisdom and unlock the full potential of your projects. Backed by
            Akademia Japan's engineering standards, we guide you from initial concept to final
            deployment, every step of the way. Start your journey towards digital excellence today.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-6 sm:px-10 py-4 sm:py-5 rounded-md transition-colors duration-300 text-sm sm:text-base md:text-lg shadow-lg w-full sm:w-auto max-w-sm sm:max-w-none"
          >
            Let's build something remarkable together!
          </Link>
        </div>
      </section>
    </div>
  );
}