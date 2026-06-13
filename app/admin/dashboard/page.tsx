'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderKanban,
  Wrench,
  MessageSquare,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  RefreshCw,
  Loader2,
  Sparkles,
  Award,
  CheckCircle,
  HelpCircle,
  Star,
  Layers,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

// Type declarations
interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'full-stack' | 'nextjs-saas' | 'frontend';
  categoryLabel: string;
  image: string;
  stack: string[];
  metrics: string;
  challenge: string;
  deliverables: string[];
  githubUrl: string;
  liveUrl: string;
}

interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'workflow';
  level: number;
  years: number;
}

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

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'testimonials'>('projects');
  const [loading, setLoading] = useState(true);

  // Lists state
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Dialog Controls
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'project' | 'skill' | 'testimonial'>('project');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Project Form States
  const [pId, setPId] = useState('');
  const [pTitle, setPTitle] = useState('');
  const [pTagline, setPTagline] = useState('');
  const [pCategory, setPCategory] = useState<'full-stack' | 'nextjs-saas' | 'frontend'>('full-stack');
  const [pCategoryLabel, setPCategoryLabel] = useState('');
  const [pImage, setPImage] = useState('');
  const [pStack, setPStack] = useState(''); // Comma-separated
  const [pMetrics, setPMetrics] = useState('');
  const [pChallenge, setPChallenge] = useState('');
  const [pDeliverables, setPDeliverables] = useState(''); // Line-by-line
  const [pGithubUrl, setPGithubUrl] = useState('');
  const [pLiveUrl, setPLiveUrl] = useState('');

  // Skill Form States
  const [sId, setSId] = useState('');
  const [sName, setSName] = useState('');
  const [sCategory, setSCategory] = useState<'frontend' | 'backend' | 'database' | 'workflow'>('frontend');
  const [sLevel, setSLevel] = useState(90);
  const [sYears, setSYears] = useState(2);

  // Testimonial Form States
  const [tId, setTId] = useState('');
  const [tName, setTName] = useState('');
  const [tRole, setTRole] = useState('');
  const [tCompany, setTCompany] = useState('');
  const [tText, setTText] = useState('');
  const [tRating, setTRating] = useState(5);
  const [tProjectScope, setTProjectScope] = useState('');
  const [tAvatar, setTAvatar] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, skillRes, testRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/testimonials')
      ]);

      const projData = await projRes.json();
      const skillData = await skillRes.json();
      const testData = await testRes.json();

      if (projData.success) {
        setProjects(projData.data);
      }
      if (skillData.success) {
        setSkills(skillData.data);
      }
      if (testData.success) {
        setTestimonials(testData.data);
      }
    } catch (err) {
      console.error("Failed to load dashboard collections", err);
    } finally {
      setLoading(false);
    }
  };

  // Auto check auth
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const res = await fetch('/api/auth/status');
        const data = await res.json();
        if (!data.authenticated) {
          router.replace('/admin/login');
        } else {
          setAuthorized(true);
          fetchData();
        }
      } catch (err) {
        console.error("Dashboard check session error", err);
        router.replace('/admin/login');
      }
    };
    fetchAuthStatus();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (err) {
      console.error(err);
    }
  };

  // Open Form modal
  const openCreateDialog = (type: 'project' | 'skill' | 'testimonial') => {
    setEditingId(null);
    setDialogType(type);
    setIsDialogOpen(true);

    if (type === 'project') {
      const randomId = `proj-${Math.random().toString(36).substr(2, 9)}`;
      setPId(randomId);
      setPTitle('');
      setPTagline('');
      setPCategory('full-stack');
      setPCategoryLabel('Full Stack MERN');
      setPImage('https://picsum.photos/seed/' + Math.floor(Math.random() * 1000) + '/1200/800');
      setPStack('React.js, Node.js, Express, MongoDB, TailwindCSS');
      setPMetrics('+30% business metric improvement');
      setPChallenge('');
      setPDeliverables('Deliverable item 1\nDeliverable item 2');
      setPGithubUrl('https://github.com');
      setPLiveUrl('https://picsum.photos');
    } else if (type === 'skill') {
      const randomId = `skill-${Math.random().toString(36).substr(2, 9)}`;
      setSId(randomId);
      setSName('');
      setSCategory('frontend');
      setSLevel(90);
      setSYears(3);
    } else {
      const randomId = `test-${Math.random().toString(36).substr(2, 9)}`;
      setTId(randomId);
      setTName('');
      setTRole('SaaS Founder');
      setTCompany('Acme Inc.');
      setTText('');
      setTRating(5);
      setTProjectScope('Full Stack MERN Project');
      setTAvatar('https://picsum.photos/seed/avatar-' + Math.floor(Math.random() * 1000) + '/150/150');
    }
  };

  // Open edit modal
  const openEditDialog = (type: 'project' | 'skill' | 'testimonial', record: any) => {
    setEditingId(record.id);
    setDialogType(type);
    setIsDialogOpen(true);

    if (type === 'project') {
      const p = record as Project;
      setPId(p.id);
      setPTitle(p.title);
      setPTagline(p.tagline);
      setPCategory(p.category);
      setPCategoryLabel(p.categoryLabel);
      setPImage(p.image);
      setPStack(p.stack.join(', '));
      setPMetrics(p.metrics);
      setPChallenge(p.challenge);
      setPDeliverables(p.deliverables.join('\n'));
      setPGithubUrl(p.githubUrl);
      setPLiveUrl(p.liveUrl);
    } else if (type === 'skill') {
      const s = record as Skill;
      setSId(s.id);
      setSName(s.name);
      setSCategory(s.category);
      setSLevel(s.level);
      setSYears(s.years);
    } else {
      const t = record as Testimonial;
      setTId(t.id);
      setTName(t.name);
      setTRole(t.role);
      setTCompany(t.company);
      setTText(t.text);
      setTRating(t.rating);
      setTProjectScope(t.projectScope);
      setTAvatar(t.avatar);
    }
  };

  // Submit operations
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let url = '/api/projects';
    let bodyData: any = {};

    if (dialogType === 'project') {
      url = '/api/projects';
      bodyData = {
        id: pId,
        title: pTitle,
        tagline: pTagline,
        category: pCategory,
        categoryLabel: pCategoryLabel,
        image: pImage,
        stack: pStack.split(',').map((s) => s.trim()).filter(Boolean),
        metrics: pMetrics,
        challenge: pChallenge,
        deliverables: pDeliverables.split('\n').map((d) => d.trim()).filter(Boolean),
        githubUrl: pGithubUrl,
        liveUrl: pLiveUrl,
      };
    } else if (dialogType === 'skill') {
      url = '/api/skills';
      bodyData = {
        id: sId,
        name: sName,
        category: sCategory,
        level: sLevel,
        years: sYears,
      };
    } else {
      url = '/api/testimonials';
      bodyData = {
        id: tId,
        name: tName,
        role: tRole,
        company: tCompany,
        text: tText,
        rating: tRating,
        projectScope: tProjectScope,
        avatar: tAvatar,
      };
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (data.success) {
        setIsDialogOpen(false);
        fetchData();
      } else {
        alert(data.error || 'Check fields and write settings.');
      }
    } catch (err) {
      console.error(err);
      alert('Network transmission failed.');
    }
  };

  // Delete handlers
  const handleDelete = async (type: 'project' | 'skill' | 'testimonial', id: string) => {
    if (!confirm('Are you absolute certain you want to eradicate this database record permanently?')) {
      return;
    }

    const url = `/api/${type === 'project' ? 'projects' : type === 'skill' ? 'skills' : 'testimonials'}?id=${id}`;

    try {
      const res = await fetch(url, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        alert(data.error || 'Failed to remove asset.');
      }
    } catch (err) {
      console.error(err);
      alert('Delete request timed out.');
    }
  };

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-400" />
        <span className="text-xs font-mono text-zinc-500 mt-3 uppercase tracking-widest">Warden Verification Check...</span>
      </div>
    );
  }

  return (
    <main id="admin-dashboard-root" className="min-h-screen bg-[#0A0A0C] text-[#E4E4E7] flex flex-col relative pb-16">
      {/* Visual backdrops */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none -z-20" />
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-teal-500/5 blur-[120px] -z-10" />

      {/* Header bar */}
      <header className="border-b border-zinc-850 bg-zinc-950/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-white font-medium text-base tracking-tight flex items-center gap-1.5 font-display">
                MERN Admin Central <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0 animate-pulse" />
              </h1>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Secure database console</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              id="dash-btn-return-landing"
              variant="outline"
              onClick={() => router.push('/')}
              className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-colors text-xs cursor-pointer"
            >
              Public Portfolio
            </Button>
            <Button
              id="dash-btn-logout"
              variant="destructive"
              onClick={handleLogout}
              className="bg-red-950/40 hover:bg-red-900 border border-red-500/20 text-red-400 hover:text-white transition-colors h-9 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Log Out
            </Button>
          </div>
        </div>
      </header>

      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto px-6 w-full pt-10 flex-grow grid grid-cols-1 gap-8">
        
        {/* Welcome Block + Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Welcome Panel */}
          <Card id="card-welcome" className="bg-zinc-905/30 border-zinc-850/60 relative overflow-hidden flex flex-col justify-between p-6 col-span-1 md:col-span-1">
            <div className="space-y-2 text-left">
              <span className="text-[10px] bg-teal-500/10 border border-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">SYSTEM ACTIVE</span>
              <h3 className="text-lg font-display text-white mt-1.5 font-semibold">
                Welcome, Admin
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Directly manage portfolio assets across document matrices.
              </p>
            </div>
            <Button
              id="btn-sync-all"
              variant="default"
              onClick={fetchData}
              className="w-full mt-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 h-9 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Force Refetch
            </Button>
          </Card>

          {/* Stat Projects */}
          <Card className="bg-zinc-900/20 border-zinc-850/60 flex flex-col justify-between p-6 text-left relative overflow-hidden">
            <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-teal-500/5 text-teal-400 flex items-center justify-center">
              <FolderKanban className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Catalog Items</p>
              <h2 className="text-4xl font-semibold text-white mt-2 font-display">{projects.length}</h2>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500">Global case studies</span>
              <Badge className="bg-teal-950/40 border-teal-500/20 text-teal-400 text-[9px] font-bold">LIVE IN CLOUD</Badge>
            </div>
          </Card>

          {/* Stat Skills */}
          <Card className="bg-zinc-900/20 border-zinc-850/60 flex flex-col justify-between p-6 text-left relative overflow-hidden">
            <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-teal-500/5 text-teal-400 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Competencies</p>
              <h2 className="text-4xl font-semibold text-white mt-2 font-display">{skills.length}</h2>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500">Meters & meters mapped</span>
              <Badge className="bg-teal-950/40 border-teal-500/20 text-teal-400 text-[9px] font-bold font-mono">+100% INDEXED</Badge>
            </div>
          </Card>

          {/* Stat Testimonials */}
          <Card className="bg-zinc-900/20 border-zinc-850/60 flex flex-col justify-between p-6 text-left relative overflow-hidden">
            <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-teal-500/5 text-teal-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Client Endorsements</p>
              <h2 className="text-4xl font-semibold text-white mt-2 font-display">{testimonials.length}</h2>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500">Verified recommendations</span>
              <Badge className="bg-emerald-950/40 border-emerald-500/20 text-emerald-400 text-[9px] font-bold font-mono">AUTO SLIDER</Badge>
            </div>
          </Card>
        </section>

        {/* Manager Workspace Split */}
        <section className="bg-zinc-900/20 border border-zinc-850/60 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
          
          {/* Workspace side-menu navigation */}
          <nav id="workspace-sidebar" className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-850 p-4 bg-zinc-950/40 shrink-0 text-left flex flex-row md:flex-col gap-2.5 overflow-x-auto">
            <span className="hidden md:block text-[9px] font-bold text-zinc-500 uppercase tracking-widest px-3 mb-2 font-mono">WORKSPACE TABS</span>
            
            {[
              { id: 'projects', label: 'Projects Manager', icon: FolderKanban, count: projects.length },
              { id: 'skills', label: 'Skills Database', icon: Wrench, count: skills.length },
              { id: 'testimonials', label: 'Client Feedback', icon: MessageSquare, count: testimonials.length }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  id={`tab-selector-${tab.id}`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-between gap-3 px-3 py-3 rounded-xl text-xs font-semibold cursor-pointer w-full transition-all shrink-0 ${
                    isActive
                      ? 'bg-teal-500 text-zinc-950 font-bold'
                      : 'bg-zinc-900/10 hover:bg-zinc-900/50 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0" />
                    {tab.label}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isActive ? 'bg-zinc-950 text-teal-400' : 'bg-zinc-900/60 text-zinc-400'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* List panel workspace content */}
          <div id="workspace-viewport" className="flex-grow p-6 md:p-8 flex flex-col text-left">
            {/* Context bar */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-display font-medium text-white tracking-tight capitalize">
                  {activeTab} Collection
                </h3>
                <p className="text-zinc-500 text-xs">Create, read, update, or remove credentials in real-time.</p>
              </div>
              <Button
                id={`add-btn-${activeTab}`}
                onClick={() => openCreateDialog(activeTab as any)}
                className="bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer h-10 px-4 rounded-xl"
              >
                <Plus className="w-4 h-4" />
                Add {activeTab}
              </Button>
            </div>

            {/* List entries renderer */}
            {loading ? (
              <div className="flex-grow flex flex-col items-center justify-center p-12">
                <Loader2 className="w-6 h-6 animate-spin text-teal-400 mb-3" />
                <span className="text-xs text-zinc-500 font-mono">Ingesting storage index...</span>
              </div>
            ) : (
              <div className="flex-grow">
                {activeTab === 'projects' && (
                  <div className="space-y-3.5">
                    {projects.length === 0 ? (
                      <div className="text-center p-12 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-xl">
                        <p className="text-zinc-500 text-sm">No project case studies recorded. Add a new container metric.</p>
                      </div>
                    ) : (
                      projects.map((p) => (
                        <div key={p.id} className="p-4 bg-zinc-900/20 border border-zinc-850/60 rounded-xl flex items-center justify-between gap-4 flex-wrap md:flex-nowrap hover:border-teal-500/20 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 bg-zinc-900 border border-zinc-850 rounded-lg overflow-hidden shrink-0">
                              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h4 className="text-white text-sm font-semibold flex items-center gap-2">
                                {p.title}
                                <Badge className="text-[9px] bg-teal-950/30 text-teal-400 border-none capitalize">{p.category}</Badge>
                              </h4>
                              <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">{p.tagline}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-auto shrink-0">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditDialog('project', p)}
                              className="border-zinc-800 hover:bg-zinc-800 text-zinc-300 h-8 w-8 cursor-pointer"
                              aria-label="Edit project"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDelete('project', p.id)}
                              className="border border-red-500/10 bg-red-950/20 hover:bg-red-950 text-red-400 h-8 w-8 cursor-pointer"
                              aria-label="Delete project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'skills' && (
                  <div className="space-y-3.5">
                    {skills.length === 0 ? (
                      <div className="text-center p-12 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-xl">
                        <p className="text-zinc-500 text-sm">Skills directory empty.</p>
                      </div>
                    ) : (
                      skills.map((s) => (
                        <div key={s.id} className="p-4 bg-zinc-900/20 border border-zinc-850/60 rounded-xl flex items-center justify-between gap-4 flex-wrap md:flex-nowrap hover:border-teal-500/20 transition-all">
                          <div className="flex items-center gap-4 w-full">
                            <div className="w-9 h-9 rounded-lg bg-zinc-90 w bg-teal-500/5 text-teal-400 border border-teal-500/10 flex items-center justify-center shrink-0">
                              <span className="text-[10px] uppercase font-mono font-bold tracking-tight">{s.category.slice(0, 2)}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-grow">
                              <div>
                                <h4 className="text-white text-sm font-semibold">{s.name}</h4>
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider mt-0.5">{s.category}</p>
                              </div>
                              <div className="flex flex-col justify-center">
                                <span className="text-xs text-zinc-400">Rating level</span>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-xs font-mono font-bold text-teal-400">{s.level}%</span>
                                  <div className="w-24 h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                                    <div className="h-full bg-teal-500" style={{ width: `${s.level}%` }} />
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col justify-center">
                                <span className="text-xs text-zinc-400">Experience</span>
                                <span className="text-xs text-white font-medium mt-0.5">{s.years} {s.years === 1 ? 'Year' : 'Years'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditDialog('skill', s)}
                              className="border-zinc-800 hover:bg-zinc-800 text-zinc-300 h-8 w-8 cursor-pointer"
                              aria-label="Edit skill"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDelete('skill', s.id)}
                              className="border border-red-500/10 bg-red-950/20 hover:bg-red-950 text-red-400 h-8 w-8 cursor-pointer"
                              aria-label="Delete skill"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeTab === 'testimonials' && (
                  <div className="space-y-3.5">
                    {testimonials.length === 0 ? (
                      <div className="text-center p-12 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-xl">
                        <p className="text-zinc-500 text-sm">Testimonials directory empty.</p>
                      </div>
                    ) : (
                      testimonials.map((t) => (
                        <div key={t.id} className="p-4 bg-zinc-900/20 border border-zinc-850/60 rounded-xl flex items-center justify-between gap-4 flex-wrap md:flex-nowrap hover:border-teal-500/20 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="relative w-11 h-11 bg-zinc-950 border border-zinc-850 rounded-full overflow-hidden shrink-0">
                              <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h4 className="text-white text-sm font-semibold flex items-center gap-2">
                                {t.name}
                                <div className="flex items-center shrink-0">
                                  {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-teal-400 text-teal-400" />
                                  ))}
                                </div>
                              </h4>
                              <p className="text-xs text-zinc-500">{t.role} at <span className="text-zinc-400 font-medium">{t.company}</span></p>
                              <p className="text-xs text-zinc-400 italic mt-1.5 line-clamp-1">&ldquo;{t.text}&rdquo;</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-auto shrink-0">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditDialog('testimonial', t)}
                              className="border-zinc-800 hover:bg-zinc-800 text-zinc-300 h-8 w-8 cursor-pointer"
                              aria-label="Edit testimonial"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDelete('testimonial', t.id)}
                              className="border border-red-500/10 bg-red-950/20 hover:bg-red-950 text-red-400 h-8 w-8 cursor-pointer"
                              aria-label="Delete testimonial"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modern, unified modal drawer for CRUD additions/edits */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-950 border border-zinc-850 text-white max-h-[85vh] overflow-y-auto max-w-lg rounded-2xl p-6">
          <DialogHeader className="text-left">
            <DialogTitle className="text-lg font-display font-medium text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
              {editingId ? 'Modify Record Details' : 'Store New Asset'}
            </DialogTitle>
            <DialogDescription className="text-zinc-500 text-xs mt-0.5">
              Strict schema validators are armed. Populate required values completely.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-left">
            
            {/* PROJECT CRUD PANELS */}
            {dialogType === 'project' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Unique Identifier (slug)</label>
                  <Input
                    required
                    disabled={!!editingId}
                    placeholder="e.g. tracking-dashboard"
                    value={pId}
                    onChange={(e) => setPId(e.target.value)}
                    className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Project Name Title</label>
                  <Input
                    required
                    placeholder="e.g. BizPortal - Client Platform"
                    value={pTitle}
                    onChange={(e) => setPTitle(e.target.value)}
                    className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Short Tagline Description</label>
                  <Input
                    required
                    placeholder="e.g. A fast multi-vendor CRM storefront tailored for digital brands."
                    value={pTagline}
                    onChange={(e) => setPTagline(e.target.value)}
                    className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Category</label>
                    <Select value={pCategory} onValueChange={(val: any) => setPCategory(val)}>
                      <SelectTrigger className="bg-zinc-950 border-zinc-800 text-sm h-10 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                        <SelectItem value="full-stack">MERN Full-Stack</SelectItem>
                        <SelectItem value="nextjs-saas">Next.js & APIs</SelectItem>
                        <SelectItem value="frontend">Interactives</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Category Label</label>
                    <Input
                      required
                      placeholder="e.g. Next.js 15 / Stripe"
                      value={pCategoryLabel}
                      onChange={(e) => setPCategoryLabel(e.target.value)}
                      className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Representative Image URL</label>
                  <Input
                    required
                    placeholder="https://picsum.photos/seed/crm/1200/800"
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Tech Stack (comma separated)</label>
                  <Input
                    required
                    placeholder="React, Node.js, MongoDB, Expess"
                    value={pStack}
                    onChange={(e) => setPStack(e.target.value)}
                    className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Freelance Client Core Impact Metrics</label>
                  <Input
                    required
                    placeholder="e.g. +30% sales conversion & query pings under 120ms"
                    value={pMetrics}
                    onChange={(e) => setPMetrics(e.target.value)}
                    className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">The Client Challenge</label>
                  <Textarea
                    required
                    placeholder="What manual process needed automation or optimization?"
                    value={pChallenge}
                    onChange={(e) => setPChallenge(e.target.value)}
                    className="bg-zinc-950 border-zinc-805 text-sm resize-none min-h-16"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Deliverables / Feats (one per line)</label>
                  <Textarea
                    required
                    placeholder="Deliverable feat 1&#10;Deliverable feat 2"
                    value={pDeliverables}
                    onChange={(e) => setPDeliverables(e.target.value)}
                    className="bg-zinc-950 border-zinc-805 text-sm resize-none min-h-20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Repository URL</label>
                    <Input
                      required
                      placeholder="https://github.com"
                      value={pGithubUrl}
                      onChange={(e) => setPGithubUrl(e.target.value)}
                      className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Live Demo URL</label>
                    <Input
                      required
                      placeholder="https://picsum.photos"
                      value={pLiveUrl}
                      onChange={(e) => setPLiveUrl(e.target.value)}
                      className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SKILL CRUD PANELS */}
            {dialogType === 'skill' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Skill Slug ID</label>
                  <Input
                    required
                    disabled={!!editingId}
                    placeholder="e.g. node-js"
                    value={sId}
                    onChange={(e) => setSId(e.target.value)}
                    className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Skill Name</label>
                  <Input
                    required
                    placeholder="e.g. Express.js Server Control"
                    value={sName}
                    onChange={(e) => setSName(e.target.value)}
                    className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Category Layer</label>
                  <Select value={sCategory} onValueChange={(val: any) => setSCategory(val)}>
                    <SelectTrigger className="bg-zinc-950 border-zinc-800 text-sm h-10 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                      <SelectItem value="frontend">Frontend Architecture</SelectItem>
                      <SelectItem value="backend">Backend Operations</SelectItem>
                      <SelectItem value="database">Data & Databases</SelectItem>
                      <SelectItem value="workflow">Deployment & Workflow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Internal Index Level (%)</label>
                    <Input
                      required
                      type="number"
                      min={0}
                      max={100}
                      placeholder="95"
                      value={sLevel}
                      onChange={(e) => setSLevel(Number(e.target.value))}
                      className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Active Years</label>
                    <Input
                      required
                      type="number"
                      min={0}
                      max={20}
                      placeholder="4"
                      value={sYears}
                      onChange={(e) => setSYears(Number(e.target.value))}
                      className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TESTIMONIAL CRUD PANELS */}
            {dialogType === 'testimonial' && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Record ID Key</label>
                  <Input
                    required
                    disabled={!!editingId}
                    placeholder="e.g. client-alejandro"
                    value={tId}
                    onChange={(e) => setTId(e.target.value)}
                    className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Client Name</label>
                    <Input
                      required
                      placeholder="e.g. Alejandro Gomez"
                      value={tName}
                      onChange={(e) => setTName(e.target.value)}
                      className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Rating (Stars)</label>
                    <Select value={String(tRating)} onValueChange={(val) => setTRating(Number(val))}>
                      <SelectTrigger className="bg-zinc-950 border-zinc-800 text-sm h-10 text-white font-semibold">
                        <SelectValue placeholder="5 Stars" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                        <SelectItem value="5">⭐⭐⭐⭐⭐ (5 Stars)</SelectItem>
                        <SelectItem value="4">⭐⭐⭐⭐ (4 Stars)</SelectItem>
                        <SelectItem value="3">⭐⭐⭐ (3 Stars)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Client Role</label>
                    <Input
                      required
                      placeholder="e.g. Chief Technology Officer"
                      value={tRole}
                      onChange={(e) => setTRole(e.target.value)}
                      className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Client Company</label>
                    <Input
                      required
                      placeholder="e.g. PropTech Venture"
                      value={tCompany}
                      onChange={(e) => setTCompany(e.target.value)}
                      className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Project Scope</label>
                  <Input
                    required
                    placeholder="e.g. Next.js Frontend & Stripe Engine"
                    value={tProjectScope}
                    onChange={(e) => setTProjectScope(e.target.value)}
                    className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Avatar Image URL</label>
                  <Input
                    required
                    placeholder="https://picsum.photos/seed/alejandro/150/150"
                    value={tAvatar}
                    onChange={(e) => setTAvatar(e.target.value)}
                    className="bg-zinc-950 border-zinc-800 focus:border-teal-400 text-sm h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Endorsement text review</label>
                  <Textarea
                    required
                    placeholder="Muhammad built an absolutely extraordinary backend implementation..."
                    value={tText}
                    onChange={(e) => setTText(e.target.value)}
                    className="bg-zinc-950 border-zinc-805 text-sm resize-none min-h-24 leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* Modal actions */}
            <div className="pt-4 border-t border-zinc-900 flex justify-end gap-3">
              <Button
                id="btn-cancel-modal"
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-zinc-800 hover:bg-zinc-900 font-bold text-zinc-400 hover:text-white text-xs uppercase"
              >
                Cancel
              </Button>
              <Button
                id="btn-save-modal"
                type="submit"
                className="bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-xs uppercase cursor-pointer"
              >
                Commit Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
