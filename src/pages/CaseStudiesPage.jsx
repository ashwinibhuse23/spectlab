import React from 'react';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import CaseStudies from '../components/CaseStudies';
import AppointmentCTA from '../components/AppointmentCTA';

export default function CaseStudiesPage() {
  return (
    <>
      <SEO
        title="Clinical Case Studies | Spect lab Nuclear Medicine Services"
        description="Review clinical case studies and real diagnostic outcomes demonstrating precision nuclear imaging and PET-CT applications at Spect lab Nuclear Medicine Services."
        keywords="nuclear medicine case studies, PET-CT clinical cases, patient outcomes, oncology case reports, Spect lab Nuclear Medicine Services"
        canonical="/case-studies"
      />
      <PageHeader title="Case Studies" subtitle="Real Stories, Real Outcomes" breadcrumbs={[{ label: 'Case Studies' }]} />
      <CaseStudies />
      <AppointmentCTA />
    </>
  );
}
