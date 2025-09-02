/*
  # Portfolio Database Schema

  1. New Tables
    - `personal_info` - Stores personal information and contact details
    - `timeline` - Stores education and work experience timeline
    - `skills` - Stores technical skills with proficiency levels
    - `languages` - Stores language proficiencies
    - `projects` - Stores project portfolio (updated with category)
    - `certificates` - Stores certificates and achievements

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
    - Public read access for portfolio display

  3. Storage
    - Create images bucket for file uploads
    - Set up proper policies for image management
*/

-- Personal Information Table
CREATE TABLE IF NOT EXISTS personal_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Ousama Abou Khalil',
  title text NOT NULL DEFAULT 'Mobile Developer',
  location text NOT NULL DEFAULT 'Beirut, Lebanon',
  phone text NOT NULL DEFAULT '+96181238678',
  email text NOT NULL DEFAULT 'ousamaaboukhalil@gmail.com',
  summary text NOT NULL DEFAULT 'Experienced mobile developer creating user-friendly and reliable apps, adept at troubleshooting and teamwork, passionate about learning new technologies and best practices.',
  linkedin_url text,
  github_url text,
  portfolio_url text,
  profile_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Timeline Table
CREATE TABLE IF NOT EXISTS timeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('education', 'experience')),
  title text NOT NULL,
  organization text NOT NULL,
  location text NOT NULL,
  period text NOT NULL,
  description text[] NOT NULL DEFAULT '{}',
  technologies text[],
  created_at timestamptz DEFAULT now()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  level integer NOT NULL CHECK (level >= 0 AND level <= 100),
  category text NOT NULL CHECK (category IN ('mobile', 'backend', 'frontend', 'tools', 'design')),
  created_at timestamptz DEFAULT now()
);

-- Languages Table
CREATE TABLE IF NOT EXISTS languages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  proficiency text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Update Projects Table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'category'
  ) THEN
    ALTER TABLE projects ADD COLUMN category text DEFAULT 'mobile' CHECK (category IN ('mobile', 'web', 'game'));
  END IF;
END $$;

-- Enable RLS
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read personal info"
  ON personal_info
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read timeline"
  ON timeline
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read skills"
  ON skills
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read languages"
  ON languages
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read projects"
  ON projects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read certificates"
  ON certificates
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin management policies
CREATE POLICY "Authenticated users can manage personal info"
  ON personal_info
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage timeline"
  ON timeline
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage skills"
  ON skills
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage languages"
  ON languages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage certificates"
  ON certificates
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial data
INSERT INTO personal_info (name, title, location, phone, email, summary) VALUES (
  'Ousama Abou Khalil',
  'Mobile Developer',
  'Beirut, Lebanon',
  '+96181238678',
  'ousamaaboukhalil@gmail.com',
  'Experienced mobile developer creating user-friendly and reliable apps, adept at troubleshooting and teamwork, passionate about learning new technologies and best practices.'
) ON CONFLICT DO NOTHING;

-- Insert timeline data
INSERT INTO timeline (type, title, organization, location, period, description, technologies) VALUES
(
  'experience',
  'Mobile Development Tutor',
  'Warshe961',
  'Lebanon, Remote',
  'July 2025 – Present',
  ARRAY[
    'Designed and delivered hands-on lessons in mobile app development using Flutter and Firebase for college and university students.',
    'Mentored students through building real-world apps, from UI/UX design to API integration and state management.',
    'Guided learners on best practices for performance optimization, secure authentication, and app deployment to Google Play & App Store.'
  ],
  ARRAY['Flutter', 'Firebase', 'UI/UX Design', 'API Integration', 'State Management']
),
(
  'experience',
  'Mobile App Developer',
  'Swift Go – Infinite Realm',
  'Lebanon',
  'September 2023 – September 2025',
  ARRAY[
    'Spearheaded development of Swift Go, a platform of ride-hailing, food delivery, and client apps.',
    'Engineered and deployed production-grade mobile apps using Kotlin, Java, and Flutter with Firebase backend.',
    'Designed intuitive, responsive UIs with real-time updates and localization support.',
    'Ensured compliance with Google Play and App Store guidelines for seamless deployment and updates.',
    'Collaborated closely with design, marketing, and operations teams to launch new features based on user feedback.',
    'Led internships in Game Development and Mobile App Development (Kotlin, Java, Flutter).'
  ],
  ARRAY['Kotlin', 'Java', 'Flutter', 'Firebase', 'UI/UX Design', 'Real-time Updates']
),
(
  'experience',
  'Mobile App Developer Intern',
  'Cedars Byte',
  'Beirut, Lebanon',
  'June 2023 - September 2023',
  ARRAY[
    'Assisted in the development of mobile applications for various platforms using native and cross-platform technologies.',
    'Worked with back-end team to integrate RESTful APIs and Firebase services.',
    'Conducted testing and debugging to ensure high-quality and bug-free applications.'
  ],
  ARRAY['Native Development', 'Cross-platform', 'RESTful APIs', 'Firebase', 'Testing', 'Debugging']
),
(
  'experience',
  'Software Engineer Intern',
  'Dolly Soft',
  'Tyr, Lebanon',
  'March 2020 - February 2021',
  ARRAY[
    'Improved project performance by collaborating with the back-end team and implementing best practices in API development.',
    'Documented technical workflows and conducted code reviews to ensure streamlined and efficient project development.'
  ],
  ARRAY['API Development', 'Code Reviews', 'Technical Documentation', 'Performance Optimization']
),
(
  'education',
  'B.S. in Computer Science',
  'Lebanese International University',
  'Lebanon',
  '2020 – 2024',
  ARRAY[
    'Transferred from Computer Engineering to Computer Science',
    'Focused on software development and mobile computing',
    'Completed various projects in mobile app development',
    'Gained comprehensive knowledge in programming fundamentals and software engineering principles'
  ],
  ARRAY['Computer Science', 'Software Engineering', 'Mobile Computing', 'Programming']
);

-- Insert skills data
INSERT INTO skills (name, level, category) VALUES
('React Native', 95, 'mobile'),
('Flutter', 90, 'mobile'),
('Kotlin', 88, 'mobile'),
('Java', 85, 'mobile'),
('Dart', 90, 'mobile'),
('Swift', 75, 'mobile'),
('Firebase', 92, 'backend'),
('Node.js', 80, 'backend'),
('PHP', 75, 'backend'),
('MySQL', 80, 'backend'),
('RESTful APIs', 90, 'backend'),
('React', 85, 'frontend'),
('HTML5', 90, 'frontend'),
('CSS3', 88, 'frontend'),
('JavaScript', 90, 'frontend'),
('jQuery', 80, 'frontend'),
('Git', 90, 'tools'),
('Visual Studio Code', 95, 'tools'),
('Android Studio', 90, 'tools'),
('Xcode', 85, 'tools'),
('Jetpack Compose', 85, 'mobile');

-- Insert languages data
INSERT INTO languages (name, proficiency) VALUES
('English', 'Business Fluent'),
('Arabic', 'Native');

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Public can view images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can update images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'images');