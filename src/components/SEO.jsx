import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_PROJECT_NAME = 'Spect lab Nuclear Medicine Services';
const DEFAULT_DESCRIPTION = 'Spect lab Nuclear Medicine Services - Leading provider of advanced Nuclear Medicine, PET-CT, SPECT-CT scans, and radionuclide therapy in Pune since 2001.';
const DEFAULT_IMAGE = '/Spectlab-1.svg';

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
}) {
  // If title already includes the project name, don't duplicate it
  const fullTitle = title
    ? title.includes(DEFAULT_PROJECT_NAME)
      ? title
      : `${title} | ${DEFAULT_PROJECT_NAME}`
    : `${DEFAULT_PROJECT_NAME} | Advanced Nuclear Medicine & PET-CT Center`;

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://spectlab.com';
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={DEFAULT_PROJECT_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Favicon Tags */}
      <link rel="icon" type="image/x-icon" href="/favicon_io/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
      <link rel="manifest" href="/favicon_io/site.webmanifest" />

      {/* Canonical Link */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
}
