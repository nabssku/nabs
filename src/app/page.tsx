import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutExperience from '@/components/AboutExperience';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import SkillsGrid from '@/components/SkillsGrid';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { sql, initDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  await initDatabase();

  const projects = await sql`
    SELECT * FROM projects 
    WHERE is_published = true 
    ORDER BY sort_order ASC, created_at DESC;
  `;

  const skills = await sql`
    SELECT * FROM skills 
    ORDER BY category ASC, proficiency_level DESC;
  `;

  const experiences = await sql`
    SELECT * FROM experiences 
    ORDER BY sort_order ASC, start_year DESC;
  `;

  const profile = {
    name: 'Nabil Sahsada Suratno',
    handle: '@nabssku',
    title: 'Full-Stack Web & AI Developer',
    location: 'Malang, Jawa Timur, Indonesia',
    status: '🟢 Available for Freelance & Full-time',
    socials: {
      github: 'https://github.com/nabssku',
      instagram: 'https://instagram.com/nabsskun',
      linkedin: 'https://linkedin.com',
      email: 'nabilsahsadabisnis@gmail.com',
    },
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero profile={profile} />
        <AboutExperience experiences={experiences} />
        <ProjectsShowcase projects={projects} />
        <SkillsGrid skills={skills} />
        <ContactSection profile={profile} />
      </main>
      <Footer />
    </div>
  );
}
