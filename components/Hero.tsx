'use client';

import { ArrowRight, Code, MessageSquare, Terminal, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Dynamic Background Glowing Blobs */}
      <div 
        id="hero-glow-teal"
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full bg-teal-500/10 blur-[80px] -z-10 animate-pulse duration-[8000ms]" 
      />
      <div 
        id="hero-glow-blue"
        className="absolute bottom-1/4 right-1/4 translate-x-1/4 translate-y-1/4 w-80 h-80 md:w-[450px] md:h-[450px] rounded-full bg-blue-500/10 blur-[100px] -z-10 animate-pulse duration-[12000ms]" 
      />

      <div id="hero-contain" className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column info */}
        <div id="hero-left" className="lg:col-span-7 flex flex-col items-start text-left z-10">
          
          {/* Availability Badge */}
          <motion.div
            id="availability-badge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950/40 border border-teal-500/30 text-teal-400 text-xs font-semibold tracking-wide uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            Available for New Projects
          </motion.div>

          {/* Main Display Headline */}
          <motion.h1
            id="hero-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] mb-6"
          >
            I Build High-Performance <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-teal-300 to-blue-500">
              MERN & Next.js
            </span>{" "}
            Web Solutions.
          </motion.h1>

          {/* Subheading focusing on freelance value */}
          <motion.p
            id="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mb-8"
          >
            {"Hi, I'm "}<span className="text-white font-semibold">Muhammad</span>{". I'm a Senior Full-Stack Developer on a mission to build secure, ultra-fast, and custom-designed web systems that turn your visitors into paying customers. Let's work together to grow your business."}
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            id="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12"
          >
            <a
              id="cta-hire"
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-teal-500/10 hover:shadow-teal-500/20 active:scale-98"
            >
              Get Free Estimate
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              id="cta-projects"
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white font-semibold text-sm transition-all duration-200 active:scale-98"
            >
              <Eye className="w-4 h-4" />
              Examine Work
            </a>
          </motion.div>

          {/* Simple Metrics Panel */}
          <motion.div
            id="hero-metrics"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 sm:gap-10 border-t border-zinc-800/80 pt-8 w-full max-w-lg"
          >
            <div id="stat-experience" className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-display font-bold text-white">5+</span>
              <span className="text-[11px] sm:text-xs text-zinc-500 font-medium tracking-wider uppercase mt-1">Years Coding</span>
            </div>
            <div id="stat-projects" className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-display font-bold text-teal-400">45+</span>
              <span className="text-[11px] sm:text-xs text-zinc-500 font-medium tracking-wider uppercase mt-1">Done Projects</span>
            </div>
            <div id="stat-rating" className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-display font-bold text-white">4.9/5</span>
              <span className="text-[11px] sm:text-xs text-zinc-500 font-medium tracking-wider uppercase mt-1">Client Rating</span>
            </div>
          </motion.div>
        </div>

        {/* Right column: Futuristic layout representing MERN stack */}
        <div id="hero-right" className="lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            id="hero-tech-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-sm md:max-w-md bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden"
          >
            {/* Window dot bar */}
            <div className="flex items-center gap-2 mb-6 border-b border-zinc-800 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-zinc-500 font-mono ml-2">muhammad-profile.json</span>
            </div>

            {/* Profile code snippet representation */}
            <div className="font-mono text-sm leading-relaxed text-zinc-300">
              <p className="text-teal-400 font-semibold mb-1">
                <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = <span className="text-yellow-400">{"{"}</span>
              </p>
              <div className="pl-4 space-y-1">
                <p><span className="text-zinc-500">name:</span> <span className="text-emerald-400">{'"Muhammad"'}</span>,</p>
                <p><span className="text-zinc-500">role:</span> <span className="text-emerald-400">{'"MERN & Next.js Specialist"'}</span>,</p>
                <p><span className="text-zinc-500">freelancing:</span> <span className="text-teal-400">true</span>,</p>
                <p>
                  <span className="text-zinc-500">skills:</span> <span className="text-yellow-300">{"["}</span>
                </p>
                <div className="pl-4 text-emerald-400/90 grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs">
                  <p>{'"React / NextJS"'}</p>
                  <p>{'"Node.js"'}</p>
                  <p>{'"Express.js"'}</p>
                  <p>{'"MongoDB"'}</p>
                  <p>{'"Tailwind CSS"'}</p>
                  <p>{'"API Integrations"'}</p>
                </div>
                <p><span className="text-yellow-300">{"]"}</span>,</p>
                <p className="text-zinc-500">motto: <span className="text-amber-400">{'"Scale, Speed, Clean Architecture"'}</span></p>
              </div>
              <p className="text-yellow-400">{"}"};</p>
            </div>

            {/* Bottom mini-banner */}
            <div id="service-ticker" className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
              <div className="flex items-center gap-1.5 text-teal-400 font-medium">
                <Terminal className="w-4 h-4" />
                <span>Ready to deploy</span>
              </div>
              <span>v2.1.0</span>
            </div>
          </motion.div>

          {/* Absolute absolute design elements */}
          <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-zinc-800/50 rounded-lg -z-10" />
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full -z-10 blur-xl" />
        </div>
      </div>
    </section>
  );
}
