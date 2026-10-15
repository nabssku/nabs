import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutExperience from '@/components/AboutExperience';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import SkillsGrid from '@/components/SkillsGrid';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { sql, initDatabase } from '@/lib/db';
import { PROFILE } from '@/lib/profile';
import { Project, Skill, Experience } from '@/types';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  await initDatabase();

  const projectsRaw = await sql`
    SELECT * FROM projects 
    WHERE is_published = true 
    ORDER BY sort_order ASC, created_at DESC;
  `;

  const skillsRaw = await sql`
    SELECT * FROM skills 
    ORDER BY category ASC, proficiency_level DESC;
  `;

  const experiencesRaw = await sql`
    SELECT * FROM experiences 
    ORDER BY sort_order ASC, start_year DESC;
  `;

  const projects = projectsRaw as unknown as Project[];
  const skills = skillsRaw as unknown as Skill[];
  const experiences = experiencesRaw as unknown as Experience[];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero profile={PROFILE} />
        <AboutExperience experiences={experiences} />
        <ProjectsShowcase projects={projects} />
        <SkillsGrid skills={skills} />
        <ContactSection profile={PROFILE} />
      </main>
      <Footer />
    </div>
  );
}
