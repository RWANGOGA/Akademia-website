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
  };

  const heroWord = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#0a1120] text-white">
      {/* SITE-WIDE HEADER */}
      <header className="fixed top-0 w-full z-50 bg-[#0a1120]/90 backdrop-blur-md border-b border-white/10 p-6">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-yellow-500">DYNA WISDOM</Link>
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
    </div>
  );
}