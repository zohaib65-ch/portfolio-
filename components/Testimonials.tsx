"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Star, ArrowLeft, ArrowRight, Award, BadgeAlert, ExternalLink, ShoppingBag, Loader2, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  projectScope: string;
  avatar: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const defaultTestimonials: Testimonial[] = [
    {
      id: "testimonial-1",
      name: "Sarah Jenkins",
      role: "SaaS Founder",
      company: "GrowthForge LLC",
      text: "Muhammad is an absolute master of his craft. He turned our slow Node.js app into a fast, highly optimized system in under three weeks. Database query response times plummeted from 3.2s to barely 120ms! Hiring him earned us an immediate 25% increase in active trial signups.",
      rating: 5,
      projectScope: "Custom SaaS API Refactoring",
      avatar: "https://picsum.photos/seed/sarah/150/150",
    },
    {
      id: "testimonial-2",
      name: "Alejandro Gomez",
      role: "CTO",
      company: "PropTech Venture Group",
      text: "Outstanding implementation of our Next.js web application. Muhammad configured everything perfectly—custom routing, secure dynamic metadata, optimized CDN asset transforms, and Stripe hooks. His attention to responsive layout details is second to none.",
      rating: 5,
      projectScope: "Next.js Frontend & Payment Engine",
      avatar: "https://picsum.photos/seed/alejandro/150/150",
    },
    {
      id: "testimonial-3",
      name: "David Miller",
      role: "Product Director",
      company: "Financier Automation",
      text: "Muhammad brought an extraordinary mix of technical skills and business communication. He provided detailed weekly video logs explaining his database schema, participated actively on Slack, and pushed code on time. I can't recommend him enough for any complex SaaS project.",
      rating: 5,
      projectScope: "Full-Stack Analytical Console",
      avatar: "https://picsum.photos/seed/david/150/150",
    },
  ];

  // Dynamic Fetch
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setTestimonials(data.data);
        } else {
          setTestimonials(defaultTestimonials);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials from database route, loading default reviews.", err);
        setTestimonials(defaultTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Autoplay effect
  useEffect(() => {
    if (testimonials.length <= 1) return;

    const startAutoplay = () => {
      stopAutoplay();
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6050);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };

    startAutoplay();
    return () => stopAutoplay();
  }, [testimonials]);

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Mock Fiverr Gigs data (Showcase)
  const fiverrGigs = [
    {
      title: "Build full-stack MERN Web Applications",
      description: "Fast, production-ready fullstack app leveraging React, Express, Node.js and MongoDB under secure API parameters.",
      img: "https://picsum.photos/seed/fullstackgig/600/400",
      price: "$150",
      rating: "5.0",
      delivery: "Express delivery support",
    },
    {
      title: "Develop high-speed Next.js 15 SaaS Platforms",
      description: "Lightning-optimized Next.js pages utilising Server Components, App Router directories, and advanced API middleware.",
      img: "https://picsum.photos/seed/nextgig/600/400",
      price: "$120",
      rating: "5.0",
      delivery: "Includes Stripe & Webhooks",
    },
    {
      title: "Custom MongoDB schema design & API integration",
      description: "Secure relational document mappings, optimized aggregates and modular express routes with rapid 120ms latencies.",
      img: "https://picsum.photos/seed/mongodb/600/400",
      price: "$85",
      rating: "5.0",
      delivery: "Full-scale indexing included",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-[#0A0A0C] border-t border-zinc-900/80 relative overflow-hidden text-left">
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-teal-500/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-teal-400 uppercase bg-teal-950/30 px-3 py-1.5 rounded-full border border-teal-500/20">Client Success</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mt-4 mb-5">What Clients Say</h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            I help teams worldwide deploy complex database systems, design blazing fast APIs, and ship polished responsive interfaces.
          </p>
        </div>

        {/* Dynamic Slider/Carousel Panel */}
        <div id="testimonials-slider-workspace" className="relative max-w-4xl mx-auto mb-20 bg-zinc-900/10 border border-zinc-850/60 p-6 md:p-12 rounded-3xl backdrop-blur-sm">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-teal-400" />
              <span className="text-xs font-mono text-zinc-500 mt-2 uppercase tracking-widest">Awaiting endorsement roll...</span>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-6 text-zinc-500 text-sm">No client reviews registered.</div>
          ) : (
            <div className="relative">
              {/* Main quote mark decoration */}
              <div className="absolute -top-6 -left-4 text-zinc-800/20 font-serif text-8xl pointer-events-none select-none select-none">“</div>

              {/* Slide frame with transition */}
              <div className="min-h-[220px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="space-y-6"
                  >
                    <div>
                      {/* Rating + Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-teal-400 text-teal-400" />
                          ))}
                        </div>
                        <span className="text-[10px] bg-teal-950/30 border border-teal-500/10 text-teal-400 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono font-medium">
                          {testimonials[currentIndex].projectScope}
                        </span>
                      </div>

                      {/* Review body */}
                      <p className="text-zinc-200 text-base md:text-lg leading-relaxed italic font-medium mt-6">&ldquo;{testimonials[currentIndex].text}&rdquo;</p>
                    </div>

                    {/* Author Profile */}
                    <div className="flex items-center gap-4 pt-6 mt-6 border-t border-zinc-900">
                      <div className="relative w-12 h-12 bg-zinc-800 border border-zinc-700 rounded-full overflow-hidden shrink-0">
                        <Image src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} fill sizes="48px" className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-semibold">{testimonials[currentIndex].name}</h4>
                        <p className="text-xs text-zinc-500">
                          {testimonials[currentIndex].role} at <span className="text-zinc-300 font-medium">{testimonials[currentIndex].company}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Steppers & Manual controls */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-900/85">
                {/* Positional Dots */}
                <div className="flex gap-1.5">
                  {testimonials.map((_, idx) => (
                    <button
                      id={`dot-${idx}`}
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full cursor-pointer transition-all ${currentIndex === idx ? "w-6 bg-teal-400" : "w-2 bg-zinc-800 hover:bg-zinc-700"}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow Chevrons */}
                <div className="flex gap-2">
                  <button
                    id="slider-prev-trigger"
                    onClick={handlePrev}
                    className="p-2.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 rounded-xl text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    id="slider-next-trigger"
                    onClick={handleNext}
                    className="p-2.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 rounded-xl text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Fiverr Marketplace Showcase Section */}
        <div id="fiverr-showcase" className="mt-28 border-t border-zinc-900/60 pt-20">
          {/* Section banner */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#1dbf73] uppercase bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-500/20 flex items-center gap-1.5 w-fit">
                <ShoppingBag className="w-3.5 h-3.5" />
                Fiverr Marketplace
              </span>
              <h3 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight mt-4">Available Fiverr Gigs & Services</h3>
            </div>
            <p className="text-zinc-500 text-xs md:text-sm max-w-sm leading-relaxed">
              Prefer to collaborate via Fiverr? Order standard development gigs instantly with built-in escrow, stellar revisions, and secure terms.
            </p>
          </div>

          {/* Fiverr profile dashboard widget */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-zinc-950 border border-zinc-85 w bg-zinc-900/20 rounded-3xl p-6 md:p-8 mb-12 items-center">
            <div className="md:col-span-2 flex items-center gap-4 text-left">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#1dbf73]">
                <Image src="https://picsum.photos/seed/muhammad-pic/150/150" alt="Muhammad Fiverr Profile" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="text-white text-lg font-bold flex items-center gap-2">
                  Muhammad
                  <BadgeAlert className="w-4 h-4 text-[#1dbf73]" />
                </h4>
                <p className="text-[#1dbf73] text-xs font-semibold uppercase tracking-wider font-mono">Expert MERN stack seller</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                  <span className="text-xs text-white font-bold font-mono">5.0</span>
                  <span className="text-xs text-zinc-500">(15+ positive outcomes)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:col-span-1 border-y md:border-y-0 md:border-x border-zinc-900 py-4 md:py-0 md:px-6">
              <div>
                <span className="text-[10px] text-zinc-500 font-mono uppercase block">Success Rate</span>
                <span className="text-white text-base font-bold mt-1 block">100% On-Time</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-500 font-mono uppercase block">Response rate</span>
                <span className="text-[#1dbf73] text-base font-bold mt-1 block">Under 1 Hour</span>
              </div>
            </div>

            <div className="md:col-span-1 flex justify-center md:justify-end">
              <a
                id="fiverr-profile-cta"
                href="https://fiverr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1dbf73] hover:bg-[#10a85e] shadow-lg shadow-emerald-950/20 hover:scale-[1.02] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer w-full"
              >
                Hire Me on Fiverr
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </div>

          {/* Gigs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fiverrGigs.map((gig, idx) => (
              <div
                id={`fiverr-gig-card-${idx}`}
                key={idx}
                className="group bg-zinc-950 border border-zinc-850/60 rounded-2xl overflow-hidden hover:border-[#1dbf73]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video w-full bg-zinc-900 border-b border-zinc-900">
                    <Image
                      src={gig.img}
                      alt={gig.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 opacity-90 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-bold text-white bg-[#1dbf73] px-2.5 py-1 rounded-md uppercase tracking-wider">POPULAR</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-white text-base font-semibold group-hover:text-[#1dbf73] transition-colors leading-snug">{gig.title}</h4>
                    <p className="text-zinc-500 text-xs mt-3 leading-relaxed">{gig.description}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="border-t border-zinc-900 pt-4 flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <span className="text-[10px] text-teal-400 capitalize bg-teal-950/30 px-2 py-0.5 rounded-full border border-teal-500/10">{gig.delivery}</span>
                    <div className="flex items-center gap-1 text-white">
                      <span>Rating:</span>
                      <span className="text-amber-400 font-bold">{gig.rating} ★</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">Starting at</span>
                      <span className="text-white text-lg font-bold font-mono">{gig.price}</span>
                    </div>
                    <a
                      id={`btn-order-gig-${idx}`}
                      href="https://fiverr.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-[#1dbf73]/50 text-white hover:text-[#1dbf73] transition-all text-xs font-bold uppercase rounded-lg cursor-pointer"
                    >
                      Order Gig
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
