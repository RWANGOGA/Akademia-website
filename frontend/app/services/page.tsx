"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const [approachIndex, setApproachIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    function updateVisibleCount() {
      setVisibleCount(window.innerWidth < 640 ? 1 : 3);
    }
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const techStack = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", 
    "Go", "Flutter", "Swift", "Kotlin", "AWS", 
    "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Redis",
    "TailwindCSS", "Framer Motion", "GraphQL", "Firebase"
  ];

  // Core service offerings, customised for Dyna Wisdom / Akademia
  const coreServices = [
    {
      title: "Web Development",
      description:
        "We blend creativity, technology, and strategy to build engaging, high-performance websites that elevate your digital presence. Working closely with our clients, we craft custom solutions that deliver seamless, responsive, user-friendly experiences that drive engagement and conversions.",
      link: true,
    },
    {
      title: "iOS & Android Mobile Development",
      description:
        "With a focus on user experience, performance, and scalability, we build intuitive, feature-rich mobile apps that cater to the evolving needs of your users. We collaborate closely with our clients to craft custom mobile solutions that thrive in the competitive app marketplace.",
      link: true,
    },
    {
      title: "Custom Software Development",
      description:
        "Embracing state-of-the-art technologies and Akademia&apos;s Japanese engineering standards, we build flexible, secure, and high-performing software that optimises business processes and solves unique problems for fast-growing businesses.",
      link: true,
    },
    {
      title: "AI & Data Solutions",
      description:
        "Leveraging machine learning and deep analytics, we transform raw data into intelligent, actionable systems &mdash; from AI-powered products and consulting to data governance and human-centred AI integration.",
      link: false,
    },
    {
      title: "System Integration & APIs",
      description:
        "Our integration experts connect disparate systems, applications, and data sources for smooth data exchange. We design and implement powerful APIs that reduce manual effort, minimise errors, and streamline workflows.",
      link: false,
    },
    {
      title: "Cloud & DevOps Engineering",
      description:
        "We streamline the software development lifecycle by fostering collaboration between development and operations, with automated builds, tests, and deployments &mdash; backed by Akademia&apos;s private cloud infrastructure in Tokyo.",
      link: false,
    },
    {
      title: "Content Management Systems (CMS)",
      description:
        "We develop intuitive, flexible, and secure CMS platforms that give our clients complete control over their digital content, from creation and management to publishing.",
      link: false,
    },
    {
      title: "Database Design & Management",
      description:
        "We create and maintain efficient, scalable, and secure databases that form the backbone of your digital solutions, tailored to optimise storage, retrieval, and processing.",
      link: false,
    },
  ];

  // Checklist of how Dyna Wisdom helps businesses navigate challenges
  const challenges = [
    {
      title: "Custom Software Development Solutions",
      description:
        "We ensure that every digital solution is a perfect fit for your operational requirements and growth aspirations.",
    },
    {
      title: "Strategic Consultation and Planning",
      description:
        "We partner with you to understand your vision and challenges, and create a strategic roadmap that aligns with your long-term objectives.",
    },
    {
      title: "Agile Development and Integration",
      description:
        "Our agile approach to development ensures flexibility, rapid delivery, and seamless integration with your existing systems.",
    },
    {
      title: "Continuous Support and Innovation",
      description:
        "Beyond initial development, we offer ongoing support and are committed to continually innovating, so your digital solutions evolve in tandem with your business and the broader tech landscape &mdash; backed by Akademia&apos;s Japanese engineering standards.",
    },
  ];

  const steps = [
    { title: "Discovery", desc: "A rigorous diagnostic phase involving technical audits and stakeholder alignment to define precise project requirements.", step: "01" },
    { title: "Design", desc: "Architecting high-performance technical blueprints that align structural design with long-term business objectives.", step: "02" },
    { title: "Engineering", desc: "Precision-driven execution using agile methodologies to build resilient, scalable, enterprise-grade infrastructure.", step: "03" },
    { title: "Maintenance", desc: "Ensuring operational continuity through proactive monitoring, security patching, and high-availability systems management.", step: "04" },
    { title: "Optimization", desc: "Applying data-driven insight to accelerate performance, maximize throughput, and drive continuous growth.", step: "05" }
  ];

  // Show 1 card on mobile, 2 on tablet, 3 on desktop
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

      {/* SECTION 2: Core Services */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 mb-4">
            Core Services
          </h2>
          <div className="w-16 h-1.5 bg-yellow-400 mb-6 md:mb-8"></div>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl mb-10 md:mb-16">
            Dyna Wisdom&apos;s core services include database design, custom software development, mobile app
            development,{" "}
            <Link href="/services" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
              web application development
            </Link>
            , system integration, as well as API development and integration. This means that regardless of the
            complexity or scale of your project, backed by Akademia&apos;s Japanese engineering standards, we deliver
            bespoke solutions that align with your strategic goals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {coreServices.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 flex flex-col"
              >
                <h3 className="text-xl md:text-2xl font-bold text-slate-950 mb-3">{service.title}</h3>
                <div className="w-10 h-1 bg-yellow-400 mb-4"></div>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-grow">
                  {service.description}
                </p>
                {service.link && (
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium mt-6 text-sm md:text-base"
                  >
                    Find out more <span>›</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2b: How Dyna Wisdom's development services help businesses navigate challenges */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 mb-4">
          How Dyna Wisdom&apos;s development services help businesses navigate challenges
        </h2>
        <div className="w-16 h-1.5 bg-yellow-400 mb-6 md:mb-8"></div>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl mb-10 md:mb-16">
          The digital landscape is shifting rapidly. Don&apos;t get left behind. Dyna Wisdom&apos;s robust development
          solutions and integrated management systems, backed by Akademia Company Ltd, Japan, are tailored to
          meet the unique challenges of your business.
        </p>

        <div className="relative max-w-4xl">
          {challenges.map((item, index) => (
            <div key={index} className="relative flex gap-4 md:gap-6 pb-8 md:pb-10 last:pb-0">
              {/* connector line */}
              {index !== challenges.length - 1 && (
                <div className="absolute left-[15px] md:left-[19px] top-8 md:top-10 bottom-0 w-0.5 bg-slate-200"></div>
              )}
              <div
                className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center z-10 ${
                  index < 2 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                ✓
              </div>
              <div className="bg-slate-50 rounded-lg p-5 md:p-6 flex-1">
                <h3 className="text-lg md:text-xl font-bold text-slate-950 mb-2">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
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
          Dyna Wisdom&apos;s proven approach
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
            {steps.slice(approachIndex, approachIndex + visibleCount).map((item, index) => (
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