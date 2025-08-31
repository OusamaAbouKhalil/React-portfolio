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
  name: string;
  level: number;
  category: 'mobile' | 'backend' | 'tools' | 'design';
}