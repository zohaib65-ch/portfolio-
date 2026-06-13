import { MongoClient, Db } from 'mongodb';
import * as fs from 'fs';
import * as path from 'path';

// Define Interface structures
export interface Project {
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

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'workflow';
  level: number;
  years: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  projectScope: string;
  avatar: string;
}

// Initial Data seeds
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

const defaultSkills: Skill[] = [
  // Frontend
  { id: 'fe-1', name: 'React / Next.js (App Router)', category: 'frontend', level: 95, years: 4 },
  { id: 'fe-2', name: 'TypeScript', category: 'frontend', level: 90, years: 3 },
  { id: 'fe-3', name: 'Tailwind CSS', category: 'frontend', level: 98, years: 4 },
  { id: 'fe-4', name: 'Redux Toolkit / Zustand', category: 'frontend', level: 88, years: 3 },
  { id: 'fe-5', name: 'Framer Motion (Animations)', category: 'frontend', level: 85, years: 2 },
  // Backend
  { id: 'be-1', name: 'Node.js', category: 'backend', level: 92, years: 4 },
  { id: 'be-2', name: 'Express.js', category: 'backend', level: 94, years: 4 },
  { id: 'be-3', name: 'REST APIs & Webhooks', category: 'backend', level: 96, years: 4 },
  { id: 'be-4', name: 'GraphQL / Apollo', category: 'backend', level: 78, years: 2 },
  { id: 'be-5', name: 'JWT, OAuth & Auth Security', category: 'backend', level: 90, years: 3 },
  // Database
  { id: 'db-1', name: 'MongoDB / Mongoose ODM', category: 'database', level: 93, years: 4 },
  { id: 'db-2', name: 'PostgreSQL / Prisma', category: 'database', level: 85, years: 2 },
  { id: 'db-3', name: 'Redis Caching', category: 'database', level: 80, years: 2 },
  { id: 'db-4', name: 'Firebase Firestore', category: 'database', level: 88, years: 3 },
  // Workflow
  { id: 'wf-1', name: 'Git & Multi-Branch Workflows', category: 'workflow', level: 95, years: 5 },
  { id: 'wf-2', name: 'Docker Containerization', category: 'workflow', level: 80, years: 2 },
  { id: 'wf-3', name: 'Linux Servers & SSH Control', category: 'workflow', level: 82, years: 2 },
  { id: 'wf-4', name: 'Vercel, Railway & Heroku Deploy', category: 'workflow', level: 94, years: 4 },
  { id: 'wf-5', name: 'Postman, Jest & Testing', category: 'workflow', level: 88, years: 3 }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Jenkins',
    role: 'SaaS Founder',
    company: 'GrowthForge LLC',
    text: "Muhammad is an absolute master of his craft. He turned our slow Node.js app into a fast, highly optimized system in under three weeks. Database query response times plummeted from 3.2s to barely 120ms! Hiring him earned us an immediate 25% increase in active trial signups.",
    rating: 5,
    projectScope: 'Custom SaaS API Refactoring',
    avatar: 'https://picsum.photos/seed/sarah/150/150'
  },
  {
    id: 'testimonial-2',
    name: 'Alejandro Gomez',
    role: 'CTO',
    company: 'PropTech Venture Group',
    text: "Outstanding implementation of our Next.js web application. Muhammad configured everything perfectly—custom routing, secure dynamic metadata, optimized CDN asset transforms, and Stripe hooks. His attention to responsive layout details is second to none.",
    rating: 5,
    projectScope: 'Next.js Frontend & Payment Engine',
    avatar: 'https://picsum.photos/seed/alejandro/150/150'
  },
  {
    id: 'testimonial-3',
    name: 'David Miller',
    role: 'Product Director',
    company: 'Financier Automation',
    text: "Muhammad brought an extraordinary mix of technical skills and business communication. He provided detailed weekly video logs explaining his database schema, participated actively on Slack, and pushed code on time. I can't recommend him enough for any complex SaaS project.",
    rating: 5,
    projectScope: 'Full-Stack Analytical Console',
    avatar: 'https://picsum.photos/seed/david/150/150'
  }
];

// Helper to write/read local JSON file
const DB_FILE_PATH = path.join(process.cwd(), 'data', 'portfolio-db.json');

const ensureLocalDirectory = () => {
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const readLocalDB = (): { projects: Project[]; skills: Skill[]; testimonials: Testimonial[] } => {
  ensureLocalDirectory();
  if (!fs.existsSync(DB_FILE_PATH)) {
    const initial = { projects: defaultProjects, skills: defaultSkills, testimonials: defaultTestimonials };
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
  try {
    const content = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error("Failed to read local DB file, reverting to default defaults.", err);
    return { projects: defaultProjects, skills: defaultSkills, testimonials: defaultTestimonials };
  }
};

const writeLocalDB = (data: { projects: Project[]; skills: Skill[]; testimonials: Testimonial[] }) => {
  ensureLocalDirectory();
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

// Global Mongo Client cache
let mongoClient: MongoClient | null = null;
let mongoDb: Db | null = null;

const getMongoClient = async (): Promise<Db | null> => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return null;
  }

  if (mongoDb) {
    return mongoDb;
  }

  try {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
    mongoDb = mongoClient.db();
    
    // Seed MongoDB if it's empty
    const collections = await mongoDb.listCollections().toArray();
    const hasProjects = collections.some(c => c.name === 'projects');
    const hasSkills = collections.some(c => c.name === 'skills');
    const hasTestimonials = collections.some(c => c.name === 'testimonials');

    if (!hasProjects) {
      await mongoDb.collection('projects').insertMany(defaultProjects);
    }
    if (!hasSkills) {
      await mongoDb.collection('skills').insertMany(defaultSkills);
    }
    if (!hasTestimonials) {
      await mongoDb.collection('testimonials').insertMany(defaultTestimonials);
    }

    return mongoDb;
  } catch (err) {
    console.error("MongoDB Connection/Seeding Error:", err);
    return null;
  }
};

export const getProjects = async (): Promise<Project[]> => {
  const db = await getMongoClient();
  if (db) {
    const records = await db.collection('projects').find({}).toArray();
    return records.map(r => {
      const { _id, ...rest } = r;
      return rest as any;
    });
  } else {
    return readLocalDB().projects;
  }
};

export const saveProject = async (project: Project): Promise<void> => {
  const db = await getMongoClient();
  if (db) {
    await db.collection('projects').updateOne(
      { id: project.id },
      { $set: project },
      { upsert: true }
    );
  } else {
    const local = readLocalDB();
    const idx = local.projects.findIndex(p => p.id === project.id);
    if (idx >= 0) {
      local.projects[idx] = project;
    } else {
      local.projects.push(project);
    }
    writeLocalDB(local);
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  const db = await getMongoClient();
  if (db) {
    await db.collection('projects').deleteOne({ id });
  } else {
    const local = readLocalDB();
    local.projects = local.projects.filter(p => p.id !== id);
    writeLocalDB(local);
  }
};

export const getSkills = async (): Promise<Skill[]> => {
  const db = await getMongoClient();
  if (db) {
    const records = await db.collection('skills').find({}).toArray();
    return records.map(r => {
      const { _id, ...rest } = r;
      return rest as any;
    });
  } else {
    return readLocalDB().skills;
  }
};

export const saveSkill = async (skill: Skill): Promise<void> => {
  const db = await getMongoClient();
  if (db) {
    await db.collection('skills').updateOne(
      { id: skill.id },
      { $set: skill },
      { upsert: true }
    );
  } else {
    const local = readLocalDB();
    const idx = local.skills.findIndex(s => s.id === skill.id);
    if (idx >= 0) {
      local.skills[idx] = skill;
    } else {
      local.skills.push(skill);
    }
    writeLocalDB(local);
  }
};

export const deleteSkill = async (id: string): Promise<void> => {
  const db = await getMongoClient();
  if (db) {
    await db.collection('skills').deleteOne({ id });
  } else {
    const local = readLocalDB();
    local.skills = local.skills.filter(s => s.id !== id);
    writeLocalDB(local);
  }
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const db = await getMongoClient();
  if (db) {
    const records = await db.collection('testimonials').find({}).toArray();
    return records.map(r => {
      const { _id, ...rest } = r;
      return rest as any;
    });
  } else {
    return readLocalDB().testimonials;
  }
};

export const saveTestimonial = async (testimonial: Testimonial): Promise<void> => {
  const db = await getMongoClient();
  if (db) {
    await db.collection('testimonials').updateOne(
      { id: testimonial.id },
      { $set: testimonial },
      { upsert: true }
    );
  } else {
    const local = readLocalDB();
    const idx = local.testimonials.findIndex(t => t.id === testimonial.id);
    if (idx >= 0) {
      local.testimonials[idx] = testimonial;
    } else {
      local.testimonials.push(testimonial);
    }
    writeLocalDB(local);
  }
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  const db = await getMongoClient();
  if (db) {
    await db.collection('testimonials').deleteOne({ id });
  } else {
    const local = readLocalDB();
    local.testimonials = local.testimonials.filter(t => t.id !== id);
    writeLocalDB(local);
  }
};
