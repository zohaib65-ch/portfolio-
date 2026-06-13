'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, FolderClosed, Filter, Code2, Database, Layout, ShieldCheck, CheckCircle2, X } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  tagline: string;
  category: 'full-stack' | 'nextjs-saas' | 'frontend';
  categoryLabel: string;
  image: string;
  stack: string[];
  metrics: string; // Business-focused result for freelance clients
  challenge: string;
  deliverables: string[];
  githubUrl: string;
  liveUrl: string;
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'full-stack' | 'nextjs-saas' | 'frontend'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const defaultProjects: Project[] = [
    {
      id: 'bizportal-crm',
      title: 'BizPortal - Custom Client CRM',
      tagline: 'Custom CRM platform that helps mid-sized businesses track pipelines, generate auto-invoices, and manage client communications.',
      category: 'full-stack',
      categoryLabel: 'Full Stack MERN',
      image: 'https://picsum.photos/seed/crm-system/1200/800',
      stack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'ChartJS', 'TailwindCSS'],
      metrics: '+40% team sales efficiency & reduced billing tracking dispute rates to zero.',
      challenge: 'The client spent 15+ hours weekly manual copy-pasting client emails into spreadsheets. They needed an automated central workspace matching MERN stack speed.',
      deliverables: [
        'Responsive Kanban pipelines representing sales stages.',
        'Asynchronous Node.js cron scheduler driving recurring automated email invoices.',
        'Mongoose aggregate data indexes allowing multi-parameter aggregate reports in under 120ms.',
        'Secure multi-tier Auth token validation logic preventing cross-tenant access.'
      ],
      githubUrl: 'https://github.com',
      liveUrl: 'https://picsum.photos'
    },
    {
      id: 'swiftshop-saas',
      title: 'SwiftShop - Multi-Vendor E-Commerce',
      tagline: 'A fast multi-vendor storefront platform featuring server-side rendered categories, lightning fast cart logic, and advanced stripe webhooks.',
      category: 'nextjs-saas',
      categoryLabel: 'Next.js 15 / Stripe',
      image: 'https://picsum.photos/seed/swiftshop/1200/800',
      stack: ['Next.js (App Router)', 'Tailwind CSS', 'Redux', 'MongoDB', 'Stripe API'],
      metrics: 'Under 1.2s page paint speed, resulting in average cart conversions boosting by 28%.',
      challenge: 'E-commerce users leave on slower loads. Legacy client sites took 4.5+ seconds to paint products. They needed a high SEO score static/dynamic hybrided storefront.',
      deliverables: [
        'Next.js Incremental Static Regeneration cache-building high-frequency store listings.',
        'Optimized Next.js <Image> configuration utilizing no-referrer policies perfectly.',
        'Stripe webhooks synchronizing live inventory levels across MongoDB databases instantly.',
        'Advanced category custom filtering combining responsive client state and server routing.'
      ],
      githubUrl: 'https://github.com',
      liveUrl: 'https://picsum.photos'
    },
    {
      id: 'tasksync-agile',
      title: 'TaskSync - Real-Time Kanban',
      tagline: 'Interactive team collaboration board where remote units can map agile tasks, collaborate in real time, and inspect velocities.',
      category: 'frontend',
      categoryLabel: 'Interactive UI',
      image: 'https://picsum.photos/seed/kanban/1200/800',
      stack: ['React', 'Zustand State', 'Framer Motion', 'MongoDB API', 'CSS Grid'],
      metrics: 'Streamlined communication for 15+ daily teams, driving active task loops under budget bounds.',
      challenge: 'Remote workflows get messy. Traditional spreadsheets fail at visual agile drag actions. Team requested an ultra-fluid viewport board with instant state.',
      deliverables: [
        'Fluid HTML5 drag handlers backed by motion smooth physical drop guides.',
        'Ultra-fast Zustand local storage slice synchronizers capturing instant offline edit saves.',
        'Beautiful progress bars utilizing recharts visualizations displaying agile sprints.',
        'Responsive vertical drawer layouts enabling micro task details edits.'
      ],
      githubUrl: 'https://github.com',
      liveUrl: 'https://picsum.photos'
    },
    {
      id: 'prop-advisor',
      title: 'PropAdvisor - Real Estate Engine',
      tagline: 'Sleek custom dashboard enabling real estate agencies to lists properties, parse geospatial coordinates, and ingest customer leads.',
      category: 'full-stack',
      categoryLabel: 'Full-Stack Node',
      image: 'https://picsum.photos/seed/real-estate/1200/800',
      stack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Cloudinary API'],
      metrics: 'Over 800+ captured warm local property listings leads in the first active test month.',
      challenge: 'Agency properties layout was chaotic and slow to load, frustrating mobile buyers. They wanted automated asset optimization and instant contact routing.',
      deliverables: [
        'Responsive image rendering with automated sizing transformations via Cloudinary CDN integrations.',
        'Optimized MongoDB geo-spatial queries retrieving regional listings under 45ms.',
        'Custom clean contact wizards routing prospect profiles to admin panels immediately.',
        'Complete analytical charts mapping regional pricing indexes for buyers.'
      ],
      githubUrl: 'https://github.com',
      liveUrl: 'https://picsum.photos'
    }
  ];

  useEffect(() => {
    const fetchProjectsList = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setProjects(data.data);
        } else {
          setProjects(defaultProjects);
        }
      } catch (err) {
        console.error("API error, loading pristine fallback portfolio projects.", err);
        setProjects(defaultProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectsList();
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-[#0A0A0C]/90 relative">
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-teal-500/5 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-semibold tracking-widest text-teal-400 uppercase bg-teal-950/30 px-3 py-1.5 rounded-full border border-teal-500/20">
              Selected Creations
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mt-4">
              Case Studies & Portfolio
            </h2>
          </div>
          <p className="text-zinc-400 text-sm md:text-base max-w-md leading-relaxed md:text-right">
            Explore web applications built from scratch, combining modern responsive user interfaces with powerful backend databases.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 md:gap-3 flex-wrap mb-10 border-b border-zinc-800 pb-5">
          <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mr-2">
            <Filter className="w-3.5 h-3.5" />
            Filter by:
          </span>
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'full-stack', label: 'MERN Full-Stack' },
            { id: 'nextjs-saas', label: 'Next.js & APIs' },
            { id: 'frontend', label: 'Interactives' }
          ].map((tab) => (
            <button
              id={`filter-tab-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                activeFilter === tab.id
                  ? 'bg-teal-500 text-zinc-950 font-bold'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                id={`project-card-${project.id}`}
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-zinc-900/40 border border-zinc-80/60 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-all flex flex-col justify-between"
              >
                {/* Media frame */}
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[10px] font-bold text-teal-400 bg-zinc-950/90 border border-zinc-800/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {project.categoryLabel}
                    </span>
                  </div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover visual overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-xs font-bold text-teal-400 inline-flex items-center gap-1">
                      Read In-Depth Case Study
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-display font-semibold text-lg md:text-xl text-white group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Badges footer */}
                  <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-[10px] bg-zinc-900 border border-zinc-800/80 text-zinc-400 px-2.5 py-0.5 rounded-md font-mono">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="text-[10px] bg-zinc-900 border border-zinc-800/80 text-zinc-500 px-2 py-0.5 rounded-md font-mono">
                        +{project.stack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Project Details Deep Dive Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div id="project-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backing sheet */}
              <motion.div
                id="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Modal sheet card */}
              <motion.div
                id="modal-card"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative bg-zinc-950 border border-zinc-800 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-y-auto z-10 flex flex-col shadow-2xl"
              >
                {/* Visual Header Banner */}
                <div className="relative aspect-video sm:aspect-21/9 w-full bg-zinc-900">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  <button
                    id="modal-close-button"
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-zinc-950/80 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors border border-zinc-800 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[10px] font-bold text-teal-400 bg-zinc-950/90 border border-zinc-800/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {selectedProject.categoryLabel}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight mt-3">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Content body split layout */}
                <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                  {/* Left Column (Challange, Deliverables) */}
                  <div className="lg:col-span-8 space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <FolderClosed className="w-4 h-4 text-teal-500" />
                        The Challenge & Context
                      </h4>
                      <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                        {selectedProject.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-teal-500" />
                        Key Engineering Deliverables
                      </h4>
                      <ul className="space-y-2.5">
                        {selectedProject.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column (Stack, Outcomes, Actions) */}
                  <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-zinc-800/80 lg:pl-8">
                    {/* Trust outcome */}
                    <div className="bg-teal-950/20 border border-teal-500/20 rounded-2xl p-5">
                      <h4 className="text-[10px] font-bold text-teal-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        Business Outcome
                      </h4>
                      <p className="text-zinc-200 text-xs md:text-sm font-semibold leading-relaxed">
                        {selectedProject.metrics}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Database className="w-3.5 h-3.5 text-zinc-500" />
                        Full Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.stack.map((tech) => (
                          <span key={tech} className="text-xs bg-zinc-900 border border-zinc-800/80 text-zinc-300 px-3 py-1 rounded-lg font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links row */}
                    <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
                      <a
                        id="modal-link-live"
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-xs uppercase tracking-wide transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Launch Live Demo
                      </a>
                      <a
                        id="modal-link-github"
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wide transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Examine Codebase
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
