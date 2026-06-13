'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
    { name: 'Admin', href: '/admin/dashboard' },
  ];

  return (
    <header
      id="main-nav-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0C]/80 backdrop-blur-md border-b border-zinc-800/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav id="nav-container" className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a id="nav-logo" href="#home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-zinc-950 font-display transition-transform group-hover:scale-105">
            M
          </div>
          <span className="font-display font-bold tracking-tight text-xl text-white group-hover:text-teal-400 transition-colors">
            Muhammad<span className="text-teal-500 font-sans">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div id="desktop-links" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              id={`nav-link-${link.name.toLowerCase()}`}
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative py-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Button & Socials */}
        <div id="nav-actions" className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-3 border-r border-zinc-800 pr-4">
            <a
              id="header-social-github"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-teal-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="header-social-linkedin"
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-teal-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <a
            id="nav-cta-button"
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-teal-500/50 hover:bg-zinc-800/80 text-teal-400 font-medium text-xs tracking-wide uppercase transition-all"
          >
            Hire Developer
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-trigger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 text-zinc-400 hover:text-white md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0C0C0E]/95 border-b border-zinc-800/80 px-6 py-5"
          >
            <div id="mobile-links-container" className="flex flex-col gap-4 mb-6">
              {navLinks.map((link) => (
                <a
                  id={`mobile-link-${link.name.toLowerCase()}`}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-zinc-400 hover:text-white py-1 block transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div id="mobile-drawer-footer" className="flex items-center justify-between border-t border-zinc-800/60 pt-4">
              <div className="flex gap-4">
                <a
                  id="mobile-social-github"
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-teal-400"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  id="mobile-social-linkedin"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-teal-400"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  id="mobile-social-mail"
                  href="mailto:mzohaibch.07@gmail.com"
                  className="text-zinc-400 hover:text-teal-400"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <a
                id="mobile-nav-cta-button"
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-[#0A0A0C] font-semibold text-xs transition-colors"
              >
                Hire Muhammad
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
