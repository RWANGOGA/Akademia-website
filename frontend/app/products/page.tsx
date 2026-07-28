"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const products = [
    {
      name: "AI AVATAR AKADEMIA",
      link: "https://ai-avatar.akademia.co.jp",
      bg: "/images/image copy 17.png",
      desc: "A 3D AI avatar platform bridging Japan and Uganda. Talk to lifelike avatar guides for culture, business etiquette, and Luganda phrases, run live video meetings with real-time speech translation and lip-synced avatar interpreters, or launch an AI-powered interview and recruiter mode — all with your own custom-built avatar characters.",
    },
    {
      name: "VIRTUAL WORLD",
      link: "https://vf.akademia.co.jp/",
      bg: "/images/image copy 18.png",
      desc: "A persistent virtual office and event space built on the WorkAdventure engine. Teams and attendees move around as characters in a 2D map, bumping into colleagues, joining spontaneous video calls, and collaborating the way they would in a real shared space — no scheduled meeting links required.",
    },
    {
      name: "AIPOD",
      link: "https://ai-daily-report.akademia.co.jp/",
      bg: "/images/image copy 19.png",
      desc: "An AI-powered daily reporting dashboard. Teams log in to submit and review structured daily reports, with account registration and secure sign-in built for organizations that need a consistent, automated pulse on daily work.",
    },
    {
      name: "TRANSLATION — UgaJapa",
      link: "https://uj-tc-api.akademia.co.jp/",
      bg: "/images/image copy 20.png",
      desc: "A global translation API and dashboard purpose-built for Mattermost plugins, combining a neural translation engine, a voice engine for speech-to-text and subtitles, a 197-language global engine, text-to-speech, and a resilient always-on fallback bot — with per-user API keys, quality scoring, and usage-based billing.",
    },
    {
      name: "AI DOJO",
      link: "https://ai-dojo-opal.vercel.app/",
      bg: "/images/image copy 21.png",
      desc: "An immersive Japanese language role-play trainer. Learners practice real-time voice conversations with AI characters across 8+ realistic scenario domains — restaurants, travel, business, healthcare, shopping, school life — with instant feedback, XP, and streak tracking to keep learners coming back.",
    },
    {
      name: "AI RECRUITER",
      link: "https://ai-recruiter.akademia.co.jp",
      bg: "/images/image copy 17.png",
      desc: "An enterprise-grade AI recruitment operating system. Automates candidate screening, interview scheduling, and shortlisting, giving hiring teams a faster, more consistent way to evaluate talent at scale.",
    },
  ];

  const heroWords = [
    { text: "WHAT", color: "text-white" },
    { text: "WE", color: "text-white" },
    { text: "BUILD", color: "text-yellow-400" },
    { text: "→", color: "text-yellow-400/60" },
    { text: "OUR", color: "text-white" },
    { text: "PRODUCTS", color: "text-yellow-400" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* SITE-WIDE HEADER */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/90 p-4 sm:p-6 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tighter text-yellow-400">
            DYNA WISDOM
          </Link>
          <div className="hidden md:flex gap-8 font-medium">
            <Link href="/" className="text-white transition-colors hover:text-yellow-400">Home</Link>
            <Link href="/services" className="text-white transition-colors hover:text-yellow-400">Services</Link>
            <Link href="/products" className="text-yellow-400">Products</Link>
            <Link href="/about" className="text-white transition-colors hover:text-yellow-400">About Us</Link>
          </div>
          <Link
            href="/dashboard"
            className="rounded bg-yellow-400 px-4 sm:px-6 py-2 text-sm sm:text-base font-black text-black transition-all hover:bg-white"
          >
            Dashboard
          </Link>
        </nav>
      </header>

      {/* HERO — Full screen background image, very bright and visible */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-24">
        {/* Background image - very bright and visible */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/images/image copy 23.png')",
          }}
        />
        
        {/* Very light overlay - image stays very bright and visible */}
        <div className="absolute inset-0 bg-black/15" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          {/* Organized in 3 lines with continuous fade/pop animation */}
          <div className="mb-8 flex flex-col items-center justify-center space-y-2 sm:space-y-4">
            {/* Line 1: WHAT WE */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3
              }}
              className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight"
            >
              {heroWords.slice(0, 2).map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4 + i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 3
                  }}
                  className={`${word.color} drop-shadow-2xl`}
                >
                  {word.text}
                </motion.span>
              ))}
            </motion.h1>

            {/* Line 2: BUILD → OUR */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3
              }}
              className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight"
            >
              {heroWords.slice(2, 5).map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.8 + i * 0.15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 3
                  }}
                  className={`${word.color} drop-shadow-2xl`}
                >
                  {word.text}
                </motion.span>
              ))}
            </motion.h1>

            {/* Line 3: PRODUCTS */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 1.0,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3
              }}
              className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight"
            >
              {heroWords.slice(5, 6).map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.2 + i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 3
                  }}
                  className={`${word.color} drop-shadow-2xl`}
                >
                  {word.text}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Subtitle with continuous fade animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
            }}
            transition={{ 
              duration: 0.8, 
              delay: 1.6,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 3
            }}
            className="mx-auto max-w-xl text-center text-base sm:text-lg font-medium text-white/90 drop-shadow-lg"
          >
            A closer look at each product — what it does, and where to try it.
          </motion.p>
        </div>
      </section>

      {/* PRODUCTS — full-bleed background image per section, centered content */}
      <div>
        {products.map((product, idx) => (
          <section
            key={idx}
            className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-fixed bg-cover bg-center px-6 py-20 text-center sm:py-28"
            style={{ backgroundImage: `url('${product.bg}')` }}
          >
            {/* Black overlay only — keeps text readable without introducing new colors */}
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
              <h2 className="mb-6 text-3xl sm:text-5xl md:text-6xl font-black uppercase leading-tight tracking-tight text-white">
                {product.name.split(" ").map((word, wi) => (
                  <span
                    key={wi}
                    className={wi % 2 === 0 ? "text-yellow-400" : "text-white"}
                  >
                    {word}{" "}
                  </span>
                ))}
              </h2>

              <p className="mb-10 max-w-2xl text-base sm:text-lg font-medium leading-relaxed text-white/90">
                {product.desc}
              </p>

              <Link
                href={product.link}
                target="_blank"
                className="inline-block rounded bg-yellow-400 px-8 py-3 font-black uppercase tracking-wide text-black transition-all hover:bg-white"
              >
                Visit →
              </Link>
              <span className="mt-4 break-all text-xs sm:text-sm font-medium text-white/50">
                {product.link.replace(/^https?:\/\//, "")}
              </span>
            </div>
          </section>
        ))}
      </div>

      {/* BACK TO ABOUT CTA */}
      <section className="relative flex min-h-[40vh] w-full items-center justify-center bg-black px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 sm:mb-4 font-black uppercase tracking-widest text-yellow-400">
            Dyna Wisdom
          </p>
          <h2 className="mb-8 text-2xl sm:text-4xl font-black uppercase text-white">
            Want to know more about us?
          </h2>
          <Link
            href="/about"
            className="inline-block rounded bg-yellow-400 px-8 py-3 font-black uppercase tracking-wide text-black transition-all hover:bg-white"
          >
            Back to About Us
          </Link>
        </div>
      </section>
    </div>
  );
}