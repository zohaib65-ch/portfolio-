'use client';

import { ArrowUp, Terminal, ShieldAlert, BadgeCheck } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Structured SEO Metadata JSON-LD
  const schemaJsonLD = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Muhammad | MERN Stack Developer Portfolio',
    'description': 'Experienced Full-Stack Developer specializing in MERN (React, Node.js, Express, MongoDB) and Next.js development for custom freelance web projects.',
    'image': 'https://picsum.photos/seed/crm-system/1200/800',
    'email': 'mzohaibch.07@gmail.com',
    'url': 'https://mzohaibch.07.github.io',
    'knowsAbout': [
      'React.js',
      'Next.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'TypeScript',
      'Tailwind CSS',
      'SaaS Development',
      'Stripe Integration',
      'Database Indexing'
    ],
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'Pakistan'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'reviewCount': '45',
      'bestRating': '5'
    }
  };

  return (
    <footer id="portfolio-footer" className="bg-[#08080A] py-12 border-t border-zinc-900/40 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left trademark info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-display font-medium text-xs text-zinc-400">
            ©
          </div>
          <div>
            <p className="text-zinc-400 text-xs md:text-sm font-semibold">
              Muhammad Portfolio<span className="text-teal-400 font-sans">.</span> All rights reserved.
            </p>
            <p className="text-zinc-650 text-[10px] mt-0.5">
              Expertly tuned with high score responsive core setups.
            </p>
          </div>
        </div>

        {/* Middle trust badges */}
        <div className="flex items-center gap-5 text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <BadgeCheck className="w-4 h-4 text-teal-400" />
            <span>100% Client Satisfaction</span>
          </div>
          <div className="flex items-center gap-1 border-l border-zinc-900 pl-5">
            <Terminal className="w-3.5 h-3.5" />
            <span>W3C Compliant Docs</span>
          </div>
        </div>

        {/* Back to top click trigger */}
        <button
          id="back-to-top-button"
          onClick={handleScrollToTop}
          className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-teal-500/30 text-zinc-400 hover:text-white transition-all cursor-pointer group"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLD) }}
      />
    </footer>
  );
}
