import { sql } from './db';
import { Profile } from '@/types';
import { PROFILE } from './profile'; // fallback

export async function getSiteProfile(): Promise<Profile> {
  try {
    const rows = await sql`SELECT key, value FROM site_settings WHERE key LIKE 'profile_%' OR key LIKE 'social_%';`;
    const map: Record<string, string> = {};
    for (const row of rows) {
      map[row.key as string] = row.value as string;
    }
    return {
      name: map['profile_name'] || PROFILE.name,
      handle: map['profile_handle'] || PROFILE.handle,
      title: map['profile_title'] || PROFILE.title,
      location: map['profile_location'] || PROFILE.location,
      status: map['profile_status'] || PROFILE.status,
      bio: map['profile_bio'] || PROFILE.bio,
      avatarUrl: map['profile_avatar_url'] || PROFILE.avatarUrl,
      resumeUrl: map['profile_resume_url'] || PROFILE.resumeUrl,
      socials: {
        github: map['social_github'] || PROFILE.socials.github,
        instagram: map['social_instagram'] || PROFILE.socials.instagram,
        linkedin: map['social_linkedin'] || PROFILE.socials.linkedin,
        email: map['social_email'] || PROFILE.socials.email,
      },
    };
  } catch {
    return PROFILE; // fallback to static if DB fails
  }
}
