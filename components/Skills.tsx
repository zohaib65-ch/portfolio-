'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Server, Database, Settings, ShieldCheck, Zap, Globe, Smartphone, RefreshCw } from 'lucide-react';

type Skill = {
  name: string;
  level: number; // percentage
  years: number;
};

type DbSkill = {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'workflow';
  level: number;
  years: number;
};

type SkillCategory = {
  id: string;
  title: string;
  icon: any;
  description: string;
  businessValue: string; // What Freelance Clients actually care about!
  skills: Skill[];
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');
  const [dbSkills, setDbSkills] = useState<DbSkill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('/api/skills');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setDbSkills(data.data);
        }
      } catch (err) {
        console.error("Failed to load backend dynamic skills, utilizing default dataset.", err);
      }
    };
    fetchSkills();
  }, []);

  const categories: SkillCategory[] = [
    {
      id: 'frontend',
      title: 'Frontend Architecture',
      icon: Code2,
      description: 'Building interactive, highly optimized, client-facing interfaces with state-of-the-art styling frameworks.',
      businessValue: 'Ensures lightning-fast initial load times (<1.5s), flawless mobile responsive layouts, and modern SEO structures that place your brand at the top of search rankings.',
      skills: dbSkills.filter(s => s.category === 'frontend').length > 0
        ? dbSkills.filter(s => s.category === 'frontend').map(s => ({ name: s.name, level: s.level, years: s.years }))
        : [
            { name: 'React / Next.js (App Router)', level: 95, years: 4 },
            { name: 'TypeScript', level: 90, years: 3 },
            { name: 'Tailwind CSS', level: 98, years: 4 },
            { name: 'Redux Toolkit / Zustand', level: 88, years: 3 },
            { name: 'Framer Motion (Animations)', level: 85, years: 2 },
          ],
    },
    {
      id: 'backend',
      title: 'Backend Operations',
      icon: Server,
      description: 'Designing modular servers, secure microservices, API integrations, and robust database controllers.',
      businessValue: 'Guarantees reliable, highly protected user data flow. Leverages asynchronous controllers keeping request pings under 150ms even under bulk traffic.',
      skills: dbSkills.filter(s => s.category === 'backend').length > 0
        ? dbSkills.filter(s => s.category === 'backend').map(s => ({ name: s.name, level: s.level, years: s.years }))
        : [
            { name: 'Node.js', level: 92, years: 4 },
            { name: 'Express.js', level: 94, years: 4 },
            { name: 'REST APIs & Webhooks', level: 96, years: 4 },
            { name: 'GraphQL / Apollo', level: 78, years: 2 },
            { name: 'JWT, OAuth & Auth Security', level: 90, years: 3 },
          ],
    },
    {
      id: 'database',
      title: 'Data & Databases',
      icon: Database,
      description: 'Analyzing, seeding, and administering relational & document-oriented query collections securely.',
      businessValue: 'Protects critical business insights. Builds highly indexed, redundant, relational data models that scale effortlessly from 1 to 100,000+ records without data loss.',
      skills: dbSkills.filter(s => s.category === 'database').length > 0
        ? dbSkills.filter(s => s.category === 'database').map(s => ({ name: s.name, level: s.level, years: s.years }))
        : [
            { name: 'MongoDB / Mongoose ODM', level: 93, years: 4 },
            { name: 'PostgreSQL / Prisma', level: 85, years: 2 },
            { name: 'Redis Caching', level: 80, years: 2 },
            { name: 'Firebase Firestore', level: 88, years: 3 },
          ],
    },
    {
      id: 'workflow',
      title: 'Deployment & Workflow',
      icon: Settings,
      description: 'Deploying servers seamlessly, automating builds, containerization, and configuring secure pipelines.',
      businessValue: 'Eliminates developer downtime. Seamless transfers from local build directly to enterprise hosting platforms (AWS, Vercel, VPS) with 99.9% uptime guarantees.',
      skills: dbSkills.filter(s => s.category === 'workflow').length > 0
        ? dbSkills.filter(s => s.category === 'workflow').map(s => ({ name: s.name, level: s.level, years: s.years }))
        : [
            { name: 'Git & Multi-Branch Workflows', level: 95, years: 5 },
            { name: 'Docker Containerization', level: 80, years: 2 },
            { name: 'Linux Servers & SSH Control', level: 82, years: 2 },
            { name: 'Vercel, Railway & Heroku Deploy', level: 94, years: 4 },
            { name: 'Postman, Jest & Testing', level: 88, years: 3 },
          ],
    },
  ];

  const currentCategory = categories.find((cat) => cat.id === activeCategory) || categories[0];

  return (
    <section id="skills" className="py-24 bg-[#0A0A0C] border-y border-zinc-900/80 relative">
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-emerald-500/5 blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-teal-500/5 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-teal-400 uppercase bg-teal-950/30 px-3 py-1.5 rounded-full border border-teal-500/20">
            Skills & Abilities
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mt-4 mb-5">
            Technical Superpowers
          </h2>
          <p className="text-zinc-400 text-lg">
            I specialize in the MERN Stack and Next.js ecosystem, but more than writing code, I design architectures that drive conversion and business growth.
          </p>
        </div>

        {/* Tab Controls for Categories */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = category.id === activeCategory;
            return (
              <button
                id={`skill-tab-${category.id}`}
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-start gap-4 p-5 rounded-2xl text-left border transition-all duration-200 outline-none select-none ${
                  isActive
                    ? 'bg-zinc-900/80 border-teal-500/50 shadow-md shadow-teal-500/5'
                    : 'bg-zinc-900/20 border-zinc-800/60 hover:bg-zinc-900/40 hover:border-zinc-700/80'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? 'bg-teal-500 text-zinc-950' : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm tracking-wide ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                    {category.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{category.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Details & Meters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-zinc-900/20 border border-zinc-800/60 rounded-3xl p-6 md:p-10 backdrop-blur-sm">
          {/* Detailed explanation column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-teal-400 font-semibold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Production Standard code</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-4">
                {currentCategory.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {currentCategory.description}
              </p>
            </div>

            {/* Client Business-oriented checklist */}
            <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-teal-400" />
                FREELANCE VALUE ADDED
              </h4>
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                {currentCategory.businessValue}
              </p>
            </div>
          </div>

          {/* Progress Bars column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {currentCategory.skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-zinc-200">{skill.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-zinc-500">{skill.years} {skill.years === 1 ? 'Year' : 'Years'}</span>
                        <span className="font-mono text-teal-400 font-semibold">{skill.level}%</span>
                      </div>
                    </div>
                    {/* Meter bar */}
                    <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/40">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Lower trust indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-zinc-900/50 text-center">
          <div className="flex flex-col items-center gap-2">
            <RefreshCw className="w-5 h-5 text-teal-400" />
            <h4 className="text-white text-sm font-semibold mt-1">SEO Optimized</h4>
            <p className="text-xs text-zinc-500">Perfect semantics & tags</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-5 h-5 text-teal-400" />
            <h4 className="text-white text-sm font-semibold mt-1">Performance Match</h4>
            <p className="text-xs text-zinc-500">Lightweight client bundles</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Globe className="w-5 h-5 text-teal-400" />
            <h4 className="text-white text-sm font-semibold mt-1">Cross-Platform</h4>
            <p className="text-xs text-zinc-500">Works across all browsers</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Smartphone className="w-5 h-5 text-teal-400" />
            <h4 className="text-white text-sm font-semibold mt-1">Responsive First</h4>
            <p className="text-xs text-zinc-500">Tailored screens for any size</p>
          </div>
        </div>
      </div>
    </section>
  );
}
