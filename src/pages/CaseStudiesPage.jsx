import React from 'react';
import PageHeader from '../components/PageHeader';
import CaseStudies from '../components/CaseStudies';
import AppointmentCTA from '../components/AppointmentCTA';

export default function CaseStudiesPage() {
  return (
    <>
      <PageHeader title="Case Studies" subtitle="Real Stories, Real Outcomes" breadcrumbs={[{ label: 'Case Studies' }]} />
      <CaseStudies />
      <AppointmentCTA />
    </>
  );
}
