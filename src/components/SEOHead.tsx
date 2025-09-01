import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead: React.FC = () => {
  return (
    <Helmet>
      <title>Ousama Abou Khalil - Mobile Developer | React Native & Flutter Expert</title>
      <meta name="description" content="Experienced mobile developer specializing in React Native, Flutter, and native iOS/Android development. 5+ years of experience building innovative mobile applications." />
      <meta name="keywords" content="mobile developer, react native, flutter, ios, android, app development, ousama abou khalil, mobile apps, cross-platform development" />
      <meta name="author" content="Ousama Abou Khalil" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://ousamaaboukhalil.com/" />
      <meta property="og:title" content="Ousama Abou Khalil - Mobile Developer" />
      <meta property="og:description" content="Experienced mobile developer specializing in React Native, Flutter, and native iOS/Android development." />
      <meta property="og:image" content="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://ousamaaboukhalil.com/" />
      <meta property="twitter:title" content="Ousama Abou Khalil - Mobile Developer" />
      <meta property="twitter:description" content="Experienced mobile developer specializing in React Native, Flutter, and native iOS/Android development." />
      <meta property="twitter:image" content="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <link rel="canonical" href="https://ousamaaboukhalil.com/" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Ousama Abou Khalil",
          "jobTitle": "Mobile Developer",
          "description": "Experienced mobile developer specializing in React Native, Flutter, and native iOS/Android development",
          "url": "https://ousamaaboukhalil.com",
          "sameAs": [
            "https://github.com/ousamaaboukhalil",
            "https://linkedin.com/in/ousamaaboukhalil"
          ],
          "knowsAbout": [
            "React Native",
            "Flutter",
            "iOS Development",
            "Android Development",
            "Mobile App Development",
            "Cross-platform Development"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;