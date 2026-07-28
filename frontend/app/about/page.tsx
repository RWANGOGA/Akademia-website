"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutUsPage() {
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

  // --- DYNA WISDOM CONTENT ---
  const objectives = [
    {
      title: "Technology Innovation",
      items: [
        "Design AI applications that solve real business problems.",
        "Develop software that enhances human decision-making rather than replacing it.",
        "Explore new ways for AI and human intelligence to work together.",
      ],
    },
    {
      title: "Global Competitiveness",
      items: [
        "Build products in Uganda for international markets.",
        "Deliver world-class quality at competitive pricing.",
        "Create scalable Software-as-a-Service (SaaS) and AI solutions.",
      ],
    },
    {
      title: "Human Development",
      items: [
        "Create meaningful employment opportunities for Ugandan professionals.",
        "Provide continuous training in AI, software engineering, and digital business.",
        "Develop future technology leaders through mentoring and practical experience.",
      ],
    },
    {
      title: "Business Growth",
      items: [
        "Build long-term partnerships with businesses around the world.",
        "Expand into multiple industries through AI-powered services.",
        "Continuously innovate as AI technologies evolve.",
      ],
    },
    {
      title: "Social Impact",
      items: [
        "Contribute to Uganda's digital economy.",
        "Demonstrate that African innovation can compete globally.",
        "Encourage responsible and ethical use of AI technologies.",
      ],
    },
  ];

  const coreValues = [
    { title: "Dynamic Wisdom", text: "Technology should amplify human wisdom, not replace it. We believe the greatest innovations emerge when intelligent machines and thoughtful people work together." },
    { title: "Innovation", text: "We continually explore new ideas, technologies, and opportunities to create better solutions for our customers." },
    { title: "Responsibility", text: "We build AI that is ethical, transparent, and designed to improve lives." },
    { title: "Excellence", text: "We pursue the highest standards in software development, customer service, and business practice." },
    { title: "Continuous Learning", text: "Both people and technology evolve. We invest in learning, experimentation, and lifelong development." },
    { title: "Empowerment", text: "We believe Uganda's greatest resource is its people. We invest in local talent and create opportunities for individuals to grow into world-class professionals." },
    { title: "Global Mindset", text: "Although proudly Ugandan, we design products and services that meet international standards and serve customers worldwide." },
  ];

  // --- WHY CHOOSE DYNA WISDOM CONTENT ---
  const whyChooseUs = [
    {
      title: "Expertise",
      text: "Our teams combine Japanese engineering discipline from Akademia with hands-on Ugandan talent across AI, software, mobile, and cloud development.",
    },
    {
      title: "Customised Solutions",
      text: "Every engagement is shaped around your unique goals, ensuring outcomes that are aligned with what actually moves your business forward.",
    },
    {
      title: "Innovation",
      text: "We invest continuously in AI, machine learning, and emerging technologies so our clients stay ahead rather than catching up.",
    },
    {
      title: "Quality",
      text: "We are committed to delivering solutions that are reliable, secure, and built to last, so you can trust what we build for you.",
    },
    {
      title: "Partnership",
      text: "We invest in long-term relationships built on trust and transparency, working closely with you as your needs evolve.",
    },
    {
      title: "Agile",
      text: "Our agile approach breaks projects into measurable milestones, letting us adapt quickly and deliver successful outcomes on time.",
    },
  ];

  // --- HERO WORD ANIMATION ---
  const heroWords = ["Get", "to", "Know", "Your", "Software", "Experts"];

  const heroContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  } as const; // Added as const for strict TypeScript compatibility

  const heroWord = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }, // <-- FIXED: Added "as const"
    },
  } as const; // Added as const for strict TypeScript compatibility

  return (
    <div className="min-h-screen bg-[#0a1120] text-white">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center p-12 overflow-hidden pt-32">
        <video
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-40"
          src="https://www.thoughtworks.com/content/dam/thoughtworks/multimedia/video/what-we-do/play-on-loop-video/Whatwedo_Glowycompressed.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
          <motion.h1
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="text-6xl md:text-8xl font-bold tracking-tight mb-8 flex flex-wrap justify-center gap-x-5"
          >
            {heroWords.map((word, i) => (
              <motion.span key={i} variants={heroWord} className="inline-block">
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </section>

      {/* CORPORATE CONTENT — Company Profile & Location */}
      <section className="py-20 md:py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4">Company Profile</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Who we are, where we're based, and what we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-white mb-6 uppercase tracking-wide">
                Overview
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <span className="text-white font-bold block md:inline">President:</span>{" "}
                  Gen Suzuki
                </p>
                <p>
                  <span className="text-white font-bold block md:inline">Company Address:</span>{" "}
                  Plot 2133, Tank Hill Road, Muyenga, Kampala, Uganda
                </p>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-white mb-6 uppercase tracking-wide">
                Business Contents
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start justify-center md:justify-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span className="text-left">
                    Development of AI-powered products and intelligent business services that combine
                    artificial intelligence with human judgement and creativity.
                  </span>
                </li>
                <li className="flex items-start justify-center md:justify-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span className="text-left">
                    Design and delivery of scalable Software-as-a-Service (SaaS) and AI solutions for
                    global markets.
                  </span>
                </li>
                <li className="flex items-start justify-center md:justify-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span className="text-left">
                    Software engineering, web and mobile application development, and digital
                    transformation services.
                  </span>
                </li>
                <li className="flex items-start justify-center md:justify-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                  <span className="text-left">
                    Training and mentorship programs in AI, software engineering, and digital business
                    for Ugandan talent.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS CTA SECTION */}
      <section className="relative w-full h-[480px] md:h-[560px] overflow-hidden">
        <Link href="/products" className="group block w-full h-full">
          {/* Background image, cropped from the top so the plain/empty bottom part is hidden */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-top transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: "url('/images/image%20copy%2022.png')" }}
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-black/55 group-hover:bg-black/65 transition-colors duration-500" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Products
            </h2>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
              Explore the AI-powered platforms and solutions we've built.
            </p>
            <span className="inline-block bg-yellow-500 text-black px-8 py-3 rounded font-bold group-hover:bg-yellow-400 transition-all">
              View All Products
            </span>
          </div>
        </Link>
      </section>

      {/* DYNA WISDOM ADVANTAGES */}
      <section className="bg-slate-50 py-24 px-12 text-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">Dyna Wisdom's advantages</h2>
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

      {/* ================= DYNA WISDOM SECTIONS ================= */}

      {/* COMPANY MOTTO */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-12 text-center">
          <p className="text-yellow-500 font-bold uppercase tracking-widest mb-4">Dyna Wisdom</p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Build Uganda. <span className="text-yellow-500">Market Global.</span>
          </h2>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-12 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-yellow-500 mb-6">Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              To develop intelligent AI-powered products and business services that combine the speed and capability
              of evolving artificial intelligence with the judgement, creativity, and responsibility of human wisdom.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mt-4">
              We empower Ugandan talent to create world-class technology solutions that serve customers around the
              globe while contributing to sustainable economic growth in Uganda.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-yellow-500 mb-6">Vision</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              To become a global leader in human-centred AI innovation by demonstrating that the future belongs not
              to artificial intelligence alone, but to the dynamic partnership between evolving intelligence and
              human wisdom.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mt-4">
              We envision Uganda becoming a recognised centre for internationally competitive AI products, technology
              services, and digital innovation.
            </p>
          </div>
        </div>
      </section>

      {/* OBJECTIVES (numbered, matches "The values we share" style) */}
      <section className="py-24 bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="text-5xl font-bold mb-16">Objectives</h2>
          <div className="space-y-10">
            {objectives.map((obj, idx) => (
              <div key={idx} className="flex gap-8 items-start">
                <span className="text-5xl font-bold text-yellow-500 leading-none w-16 flex-shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{obj.title}</h3>
                  <ul className="space-y-2">
                    {obj.items.map((item, i) => (
                      <li key={i} className="flex items-start text-slate-600 text-lg">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-4 mt-3 flex-shrink-0"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES (circle badge style like "Why work with us") */}
      <section className="py-24 bg-white text-slate-900">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="text-5xl font-bold mb-16">Core Values</h2>
          <div className="space-y-16">
            {coreValues.map((val, idx) => (
              <div key={idx} className="flex items-start gap-8">
                <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-slate-900">{idx + 1}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{val.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{val.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANY PHILOSOPHY */}
      <section className="py-24 bg-slate-50 text-slate-900">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="text-5xl font-bold mb-16 border-l-4 border-yellow-500 pl-6">
            Company <span className="text-slate-500">Philosophy</span>
          </h2>

          <div className="mb-20">
            <h3 className="text-3xl font-bold text-yellow-500 mb-6">Evolved Intelligence</h3>
            <blockquote className="text-xl italic text-slate-700 border-l-4 border-yellow-500 pl-6 mb-6">
              "Evolved Intelligence is the collaborative intelligence that emerges when artificial intelligence and
              human wisdom continuously learn from one another to solve problems that neither could address as
              effectively alone."
            </blockquote>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              As AI becomes increasingly capable, the future will not be defined by machines replacing people, but by
              people and intelligent systems evolving together.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              At Dyna Wisdom, we call this Evolved Intelligence—the dynamic integration of computational intelligence
              with human judgement, ethics, creativity, and experience.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-yellow-500 mb-6">Why "Dyna Wisdom"?</h3>
            <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
              <p><span className="font-bold text-slate-900">"Dyna"</span> represents Dynamic—continuous movement, learning, and adaptation.</p>
              <p><span className="font-bold text-slate-900">"Wisdom"</span> represents the uniquely human ability to exercise judgement, responsibility, empathy, and ethical decision-making.</p>
              <p>While information creates knowledge, wisdom determines how knowledge should be used.</p>
              <p>As artificial intelligence evolves, human wisdom becomes more—not less—important.</p>
              <p>Dyna Wisdom exists to bring these two forms of intelligence together, creating technology that is not only powerful, but purposeful.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE DYNA WISDOM ================= */}
      <section className="py-20 sm:py-24 bg-slate-100 text-slate-900 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B1E3D] mb-4 sm:mb-6">
            Why Choose Dyna Wisdom?
          </h2>
          <div className="w-16 h-1 bg-yellow-500 rounded-full mb-10 sm:mb-14"></div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-md border border-slate-200 p-6 sm:p-8"
              >
                <div className="border-l-4 border-[#0B1E3D] pl-4 sm:pl-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B1E3D] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}