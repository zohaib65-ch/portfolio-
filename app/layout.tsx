import type {Metadata} from 'next';
import { Inter, Space_Grotesk, Geist } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

export const metadata: Metadata = {
  title: 'Muhammad | MERN Stack & Next.js Developer',
  description: 'Experienced MERN Stack Developer specializing in React, Node.js, Express, MongoDB, and Next.js. Building ultra-fast, user-centric web applications and landing pages for freelance clients.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={cn("scroll-smooth", spaceGrotesk.variable, "font-sans", geist.variable, "dark")}>
      <body className="bg-[#0A0A0C] text-[#E4E4E7] font-sans antialiased selection:bg-[#2DD4BF] selection:text-[#0A0A0C]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
