import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main id="portfolio-main-layout" className="relative min-h-screen bg-[#0A0A0C] text-[#E4E4E7] overflow-x-hidden">
      {/* Global overlay grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none -z-20" />

      {/* Modern Developer Portfolio Modules */}
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
