export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url?: string;
  demo_url?: string;
  app_store_url?: string;
  play_store_url?: string;
  image_url: string;
  featured: boolean;
  category: 'mobile' | 'web' | 'game';
  created_at: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credential_url?: string;
  image_url: string;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: 'mobile' | 'backend' | 'frontend' | 'tools' | 'design';
  created_at: string;
}

export interface TimelineItem {
  id: string;
  type: 'education' | 'experience';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
  created_at: string;
}

export interface PersonalInfo {
  id: string;
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  summary: string;
  linkedin_url?: string;
  github_url?: string;
  portfolio_url?: string;
  profile_image?: string;
  created_at: string;
  updated_at: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
  created_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}