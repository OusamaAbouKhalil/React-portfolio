import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePersonalInfo } from '../hooks/usePersonalInfo';

const SEOHead: React.FC = () => {
  const { personalInfo } = usePersonalInfo();

  const name = personalInfo?.name || 'Ousama Abou Khalil';
  const title = personalInfo?.title || 'Mobile Developer';
  const summary = personalInfo?.summary || 'Experienced mobile developer creating user-friendly and reliable apps, adept at troubleshooting and teamwork, passionate about learning new technologies and best practices.';
  const location = personalInfo?.location || 'Beirut, Lebanon';
  const email = personalInfo?.email || 'ousamaaboukhalil@gmail.com';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{name} - {title} | React Native & Flutter Expert</title>
      <meta name="title" content={`${name} - ${title} | React Native & Flutter Expert`} />
      <meta name="description" content={summary} />
      <meta name="keywords" content="mobile developer, react native, flutter, ios, android, app development, ousama abou khalil, mobile apps, cross-platform development, kotlin, java, swift, firebase, lebanon developer" />
      <meta name="author" content={name} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#0891b2" />
      
      {/* Canonical URL */}
      <link rel="canonical" href="https://ousamaaboukhalil.com/" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ousamaaboukhalil.com/" />
      <meta property="og:title" content={`${name} - ${title}`} />
      <meta property="og:description" content={summary} />
      <meta property="og:image" content={personalInfo?.profile_image || "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg"} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={`${name} Portfolio`} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://ousamaaboukhalil.com/" />
      <meta property="twitter:title" content={`${name} - ${title}`} />
      <meta property="twitter:description" content={summary} />
      <meta property="twitter:image" content={personalInfo?.profile_image || "https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg"} />
      <meta property="twitter:creator" content="@ousamaaboukhalil" />

      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="LB" />
      <meta name="geo.placename" content={location} />
      <meta name="contact" content={email} />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="referrer" content="no-referrer-when-downgrade" />

      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.pexels.com" />

      {/* Structured Data - Person */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": name,
          "jobTitle": title,
          "description": summary,
          "url": "https://ousamaaboukhalil.com",
          "email": email,
          "telephone": personalInfo?.phone,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Beirut",
            "addressCountry": "Lebanon"
          },
          "sameAs": [
            personalInfo?.github_url,
            personalInfo?.linkedin_url,
            personalInfo?.portfolio_url
          ].filter(Boolean),
          "knowsAbout": [
            "React Native",
            "Flutter",
            "iOS Development",
            "Android Development",
            "Mobile App Development",
            "Cross-platform Development",
            "Kotlin",
            "Java",
            "Swift",
            "Firebase",
            "UI/UX Design"
          ],
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Lebanese International University"
          },
          "worksFor": {
            "@type": "Organization",
            "name": "Freelance Mobile Developer"
          },
          "image": personalInfo?.profile_image
        })}
      </script>

      {/* Structured Data - Website */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": `${name} Portfolio`,
          "description": `Professional portfolio of ${name}, ${title}`,
          "url": "https://ousamaaboukhalil.com",
          "author": {
            "@type": "Person",
            "name": name
          },
          "inLanguage": "en-US",
          "copyrightYear": "2025",
          "copyrightHolder": {
            "@type": "Person",
            "name": name
          }
        })}
      </script>

      {/* Structured Data - Professional Service */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": `${name} - Mobile Development Services`,
          "description": "Professional mobile app development services specializing in React Native, Flutter, and native iOS/Android development",
          "provider": {
            "@type": "Person",
            "name": name,
            "jobTitle": title
          },
          "areaServed": {
            "@type": "Place",
            "name": "Worldwide"
          },
          "serviceType": [
            "Mobile App Development",
            "React Native Development",
            "Flutter Development",
            "iOS Development",
            "Android Development",
            "Cross-platform Development"
          ],
          "url": "https://ousamaaboukhalil.com"
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;