export interface Project {
  id: string | number;
  title: string;
  slug: string;
  summary: string;
  content_markdown?: string;
  thumbnail_url: string;
  cloudinary_public_id?: string;
  category: string;
  demo_url?: string;
  repo_url?: string;
  is_featured?: boolean;
  is_published?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Skill {
  id: string | number;
  name: string;
  category: string;
  icon_url?: string;
  proficiency_level: number;
}

export interface Experience {
  id: string | number;
  title: string;
  institution: string;
  location?: string;
  start_year: string;
  end_year: string;
  description: string;
  type: 'education' | 'work' | string;
  sort_order?: number;
}

export interface ContactMessage {
  id: string | number;
  sender_name: string;
  sender_email: string;
  message: string;
  is_read?: boolean;
  created_at?: string;
}

export interface Profile {
  name: string;
  handle: string;
  title: string;
  location: string;
  status: string;
  bio: string;
  avatarUrl: string;
  resumeUrl: string;
  socials: {
    github: string;
    instagram: string;
    linkedin: string;
    email: string;
  };
}

export interface AdminUser {
  id: string | number;
  email: string;
  name: string;
  role: string;
}
