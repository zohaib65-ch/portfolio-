'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Github, Linkedin, Briefcase, DollarSign, Calendar, MessageSquare, CornerDownRight, CheckCircle2, Send, ShieldCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  timestamp: string;
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('saas-app');
  const [budget, setBudget] = useState('3k-5k');
  const [timeline, setTimeline] = useState('1-2-months');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedInquiries, setSubmittedInquiries] = useState<Inquiry[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('muhammad_leads');
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);

    // Simulate reliable API endpoint ingestion delay
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: 'inq-' + Math.random().toString(36).substr(2, 9),
        name,
        email,
        projectType,
        budget,
        timeline,
        message,
        timestamp: new Date().toLocaleString()
      };

      const updated = [newInquiry, ...submittedInquiries];
      setSubmittedInquiries(updated);
      
      try {
        localStorage.setItem('muhammad_leads', JSON.stringify(updated));
      } catch (err) {
        console.error('LocalStorage write failed:', err);
      }

      setSubmitting(false);
      setSuccess(true);

      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  const clearTestLeads = () => {
    setSubmittedInquiries([]);
    try {
      localStorage.removeItem('muhammad_leads');
    } catch (_) {}
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0A0C]/95 relative overflow-hidden">
      <div className="absolute -top-1/4 right-0 w-96 h-96 rounded-full bg-teal-500/5 blur-[120px] -z-10" />
      <div className="absolute -bottom-1/4 left-0 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="text-xs font-semibold tracking-widest text-teal-400 uppercase bg-teal-950/30 px-3 py-1.5 rounded-full border border-teal-500/20 hover:bg-teal-950/40">
            Intake form
          </Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mt-4 mb-5">
            Start Your Project
          </h2>
          <p className="text-zinc-400 text-lg">
            Ready to bring your ideas to life? Complete the structured project spec sheet below, and receive a professional tech stack audit and timeline proposal within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (Direct information, links, availability metrics) */}
          <div className="lg:col-span-4 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-display font-semibold text-xl text-white">
                Direct Channels
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Prefer direct correspondence? Connect with me directly through secure developer channels or email.
              </p>

              {/* Direct links list */}
              <div id="direct-links-list" className="space-y-4">
                <a
                  id="direct-channel-mail"
                  href="mailto:mzohaibch.07@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-850/60 hover:border-teal-500/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-zinc-950 transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">Direct Email</span>
                    <p className="text-white text-sm font-semibold truncate">mzohaibch.07@gmail.com</p>
                  </div>
                </a>

                <a
                  id="direct-channel-linkedin"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-850/60 hover:border-teal-500/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-zinc-950 transition-all">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold text-left block">Professional Network</span>
                    <p className="text-white text-sm font-semibold">linkedin.com/in/muhammad</p>
                  </div>
                </a>

                <a
                  id="direct-channel-github"
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-850/60 hover:border-teal-500/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:text-zinc-950 transition-all">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold text-left block">Open Source Portals</span>
                    <p className="text-white text-sm font-semibold">github.com/muhammad</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Availability meter cards */}
            <div className="bg-zinc-900/30 border border-zinc-850/60 rounded-3xl p-6 space-y-4">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-teal-400" />
                FREELANCE AVAILABILITY
              </h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Current Slot Allocation</span>
                <span className="font-semibold text-teal-400">2 open slots left</span>
              </div>
              <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-850">
                <div className="w-2/3 h-full bg-teal-500 rounded-full" />
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Currently booking projects starting next week. Standard project turnarounds typically span 3-5 weeks depending on database scale.
              </p>
            </div>
          </div>

          {/* Right Column (Form / Wizard) */}
          <div className="lg:col-span-8">
            <div className="bg-zinc-900/20 border border-zinc-850/60 rounded-3xl p-6 md:p-8 backdrop-blur-sm relative">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    id="freelance-wizard-form"
                    onSubmit={handleSubmit}
                    key="contact-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-left"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider animate-pulse-slow" htmlFor="client-name">
                          Your Full Name *
                        </label>
                        <Input
                          id="client-name"
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-11 bg-zinc-950/60 border-zinc-800 text-white focus:border-teal-400 focus:ring-teal-500/10 placeholder:text-zinc-600 text-sm focus-visible:border-teal-400 focus-visible:ring-3 focus-visible:ring-teal-500/10"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider" htmlFor="client-email">
                          Your Email Address *
                        </label>
                        <Input
                          id="client-email"
                          type="email"
                          required
                          placeholder="e.g. john@yourcompany.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-11 bg-zinc-950/60 border-zinc-800 text-white focus:border-teal-400 focus:ring-teal-500/10 placeholder:text-zinc-600 text-sm focus-visible:border-teal-400 focus-visible:ring-3 focus-visible:ring-teal-500/10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Project Type Selection */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5" htmlFor="project-type">
                          <Briefcase className="w-3.5 h-3.5 text-teal-400" />
                          Project Scope
                        </label>
                        <Select value={projectType} onValueChange={(val) => { if (val) setProjectType(val); }}>
                          <SelectTrigger id="project-type" className="h-11 w-full bg-zinc-950/60 border-zinc-800 text-white focus-visible:border-teal-400 focus-visible:ring-teal-500/10 text-sm">
                            <SelectValue placeholder="Full-Stack SaaS App" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-950 border border-zinc-850/80 text-white max-h-60 rounded-xl overflow-hidden shadow-2xl">
                            <SelectItem value="saas-app" className="hover:bg-teal-500/10 hover:text-white">Full-Stack SaaS App</SelectItem>
                            <SelectItem value="ecom" className="hover:bg-teal-500/10 hover:text-white">E-Commerce Storefront</SelectItem>
                            <SelectItem value="custom-api" className="hover:bg-teal-500/10 hover:text-white">Custom Server/APIs</SelectItem>
                            <SelectItem value="landing-pg" className="hover:bg-teal-500/10 hover:text-white">Premium Landing Page</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Budget Selection */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5" htmlFor="project-budget">
                          <DollarSign className="w-3.5 h-3.5 text-teal-400" />
                          Est. Budget
                        </label>
                        <Select value={budget} onValueChange={(val) => { if (val) setBudget(val); }}>
                          <SelectTrigger id="project-budget" className="h-11 w-full bg-zinc-950/60 border-zinc-800 text-white focus-visible:border-teal-400 focus-visible:ring-teal-500/10 text-sm">
                            <SelectValue placeholder="Select Budget" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-950 border border-zinc-850/80 text-white max-h-60 rounded-xl overflow-hidden shadow-2xl">
                            <SelectItem value="1k-3k" className="hover:bg-teal-500/10 hover:text-white">$1,000 - $3,000</SelectItem>
                            <SelectItem value="3k-5k" className="hover:bg-teal-500/10 hover:text-white">$3,000 - $5,000</SelectItem>
                            <SelectItem value="5k-10k" className="hover:bg-teal-500/10 hover:text-white">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10k-plus" className="hover:bg-teal-500/10 hover:text-white">$10,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Timeline Selection */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5" htmlFor="project-timeline">
                          <Calendar className="w-3.5 h-3.5 text-teal-400" />
                          Timeline Goal
                        </label>
                        <Select value={timeline} onValueChange={(val) => { if (val) setTimeline(val); }}>
                          <SelectTrigger id="project-timeline" className="h-11 w-full bg-zinc-950/60 border-zinc-800 text-white focus-visible:border-teal-400 focus-visible:ring-teal-500/10 text-sm">
                            <SelectValue placeholder="Select Timeline" />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-950 border border-zinc-850/80 text-white max-h-60 rounded-xl overflow-hidden shadow-2xl">
                            <SelectItem value="under-month" className="hover:bg-teal-500/10 hover:text-white">Under 1 Month</SelectItem>
                            <SelectItem value="1-2-months" className="hover:bg-teal-500/10 hover:text-white">1 - 2 Months</SelectItem>
                            <SelectItem value="3-plus-months" className="hover:bg-teal-500/10 hover:text-white">3+ Months</SelectItem>
                            <SelectItem value="negotiable" className="hover:bg-teal-500/10 hover:text-white">Negotiable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Detailed message area */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5" htmlFor="project-message">
                          <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
                          Project Scope & Requirements *
                        </label>
                        <span className="text-[10px] text-zinc-500">Min. 20 words helps technical scoping</span>
                      </div>
                      <Textarea
                        id="project-message"
                        required
                        placeholder="Please describe what your software does, who your core users are, and any technical demands (e.g. Third-party integrations, auth flow, analytics dashboards)."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full min-h-32 px-4 py-3 rounded-xl bg-zinc-950/60 border border-zinc-805/60 text-white focus:border-teal-500 focus:outline-none transition-colors text-sm resize-none focus-visible:border-teal-400 focus-visible:ring-3 focus-visible:ring-teal-500/10"
                      />
                    </div>

                    {/* Information accuracy note */}
                    <div className="flex gap-2.5 items-start bg-zinc-900/40 p-4 rounded-xl border border-zinc-850/60">
                      <ShieldCheck className="w-4.5 h-4.5 text-teal-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        Confidentiality assured. Project details, files, and email telemetry shared under this intake catalog adhere strictly to standard NDA practices.
                      </p>
                    </div>

                    {/* Actions button row */}
                    <Button
                      id="contact-form-submit-btn"
                      type="submit"
                      disabled={submitting}
                      className="w-full cursor-pointer inline-flex items-center justify-center gap-2 px-6 h-14 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:bg-teal-800 text-zinc-950 hover:text-[#0C0C0E] font-bold text-sm tracking-wide transition-all uppercase"
                    >
                      {submitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                          Scoping Deliverables...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Project Specs & Get Estimate
                        </>
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  /* Success Screen layout */
                  <motion.div
                    id="contact-success-screen"
                    key="success-screen"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-white">
                        Specification Intake Received!
                      </h3>
                      <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-lg mx-auto leading-relaxed">
                        Thank you! Muhammad will review your details, map out initial database structures, estimate timelines, and email you a free proposal shortly.
                      </p>
                    </div>

                    {/* Standard Freelancer SLA timeline tracker */}
                    <div className="max-w-md mx-auto bg-zinc-950 border border-zinc-850 rounded-2xl p-5 text-left space-y-4">
                      <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                        <CornerDownRight className="w-3.5 h-3.5 text-teal-400" />
                        Next Actions Roadmap
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2.5 text-xs">
                          <span className="w-5 h-5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold shrink-0">1</span>
                          <p className="text-zinc-300 font-medium">Muhammad completes technical requirements analysis based on target stack models.</p>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs">
                          <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-semibold shrink-0">2</span>
                          <p className="text-zinc-400">Formal PDF scope, timeline estimates, and draft architecture delivered to your inbox.</p>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs">
                          <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-semibold shrink-0">3</span>
                          <p className="text-zinc-400">30-min discovery call scheduled to align deliverables and lock milestones.</p>
                        </div>
                      </div>
                    </div>

                    <button
                      id="reset-form-btn"
                      onClick={() => setSuccess(false)}
                      className="px-5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wide transition-colors"
                    >
                      Fill another intake form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Local leads storage demonstration panel (highly valuable for active code inspecting & QA testing) */}
        {submittedInquiries.length > 0 && (
          <div id="test-leads-viewer" className="mt-16 bg-zinc-950/80 border border-zinc-850 rounded-3xl p-6 md:p-8 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h4 className="text-white font-bold text-sm">
                  Active Freelance Leads Log (Simulated localStorage Persistence)
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  This section catalogs leads submitted locally in this browser. Perfect for testing and validation.
                </p>
              </div>
              <button
                id="clear-leads-log-btn"
                onClick={clearTestLeads}
                className="px-3 py-1.5 rounded bg-red-950/50 border border-red-500/30 hover:bg-red-900/60 text-red-400 text-[10px] font-bold uppercase transition-colors"
              >
                Clear Leads Log
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
              {submittedInquiries.map((inq) => (
                <div key={inq.id} className="p-4 rounded-xl bg-zinc-900 border border-zinc-850 text-xs space-y-2 relative">
                  <span className="absolute top-4 right-4 text-[9px] text-zinc-500">{inq.timestamp}</span>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Prospective Client</span>
                    <span className="text-white font-bold">{inq.name}</span> <span className="text-teal-400">({inq.email})</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 py-1 border-y border-zinc-800/60 my-2">
                    <div>
                      <span className="text-[9px] text-zinc-500 block">Scope</span>
                      <span className="text-zinc-300 font-semibold uppercase">{inq.projectType}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block">Est. Budget</span>
                      <span className="text-teal-400 font-bold uppercase">{inq.budget}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block">Goal</span>
                      <span className="text-zinc-300 font-semibold uppercase">{inq.timeline}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] text-zinc-500 block font-semibold mb-0.5">Project Brief</span>
                    <p className="text-zinc-400 leading-relaxed italic truncate">&quot;{inq.message}&quot;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
