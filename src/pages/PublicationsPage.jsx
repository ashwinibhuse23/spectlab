import React from 'react';
import { Thermometer, Eye, TestTubes, HeartPulse, ScanSearch, Bone, Activity, Dna, FlaskConical, Droplets, Microscope, Library, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const publicationsData = [
  {
    title: "FDG PET/CT in Evaluation of Pyrexia of Unknown Origin",
    journal: "Clinical Nuclear Medicine",
    details: "Volume 36, Number 8, August 2011",
    icon: Thermometer,
    link: "/pdf/1 FDG PETCT in Evaluation of Pyrexia of Unknown Origin.pdf"
  },
  {
    title: "Choroidal metastasis from carcinoma of breast detected on F18-FDG PET CT scan: A case report and review of literature",
    journal: "Indian Journal of Nuclear Medicine",
    details: "October-December-2010 Volume 25: Issue 4",
    icon: Eye,
    link: "/pdf/2 Choroidal metastasis from carcinoma of breast detected on F18-FDG PET CT scan A case report and review of literature.pdf"
  },
  {
    title: "Genital Lymphoma Presenting as Pyrexia of Unknown Origin",
    journal: "Clinical Nuclear Medicine",
    details: "Volume 35, Number 11, November 2010",
    icon: TestTubes
  },
  {
    title: "Serendipitous Diagnosis of Achalasia Cardia on a Radionuclide Study",
    journal: "Clinical Nuclear Medicine",
    details: "Volume 35, Number 11, November 2010",
    icon: HeartPulse,
    link: "/pdf/3 Serendipitous Diagnosis of Achalasia Cardia on a Radionuclide Study.pdf"
  },
  {
    title: "Two Occult Primaries Discovered on PET/CT in a Patient With Paraparesis",
    journal: "Clinical Nuclear Medicine",
    details: "Volume 35, Number 8, August 2010",
    icon: ScanSearch,
    link: "/pdf/4 Two Occult Primaries Discovered on PETCT in a Patient With Paraparesis.pdf"
  },
  {
    title: "Skeletal Scintigraphy Manifestations Of Hematologic Disorders",
    journal: "Indian Journal of Nuclear Medicine",
    details: "Volume 27:Issue 1 April-June 2012",
    icon: Bone,
    link: "/pdf/7 Skeletal Scintigraphy Manifestations Of Hematologic Disorders.pdf"
  },
  {
    title: "Lack of hypervascularity on three phase bone scan : Osteoid osteoma revisited.",
    journal: "World Journal of Nuclear Medicine",
    details: "Volume 5, Number 1 January 2006",
    icon: Bone,
    link: "/pdf/8 Lack of hypervascularity on three phase bone scan  Osteoid osteoma revisited.pdf"
  },
  {
    title: "Bone scintiscanning in Orthopedics",
    journal: "Journal of Maharashtra Orthopaedic Association",
    details: "Volume 7:Issue 2 2009",
    icon: Bone,
    link: "/pdf/9 Bone scintiscanning in Orthopedics.pdf"
  },
  {
    title: "Bone Scintiscanning in Osteolytic Lesions",
    journal: "Clinical Nuclear Medicine",
    details: "Volume 29, Number 1,January 2004",
    icon: Bone,
    link: "/pdf/11 Bone Scintiscanning in Osteolytic Lesions.pdf"
  },
  {
    title: "Mycotic pseudoaneurysm mimicking carotid body tumor",
    journal: "International Journal of Otorhinolaryngology and Head and Neck Surgery",
    details: "Vol 4:Issue 4, July-August 2018",
    icon: Activity,
    link: "/pdf/Mycotic pseudoaneurysm mimicking carotid body tumor.pdf"
  },
  {
    title: "Correlative Imaging in Skeletal Tuberculosis with Special emphasis on Radionuclide Bone Scintigraphy: A Pictorial Essay",
    journal: "World Journal of Nuclear Medicine",
    details: "Volume 6, Number 1,January 2007",
    icon: Microscope,
    link: "/pdf/5 Correlative Imaging in Skeletal Tuberculosis with Special emphasis on Radionuclide Bone Scintigraphy A Pictorial Essay.pdf"
  },
  {
    title: "False-positive FDG PET CT Scan in Vertebral Hemangioma",
    journal: "Asia Ocean J Nucl Med Biol",
    details: "2019; 7(1)",
    icon: ScanSearch,
    link: "/pdf/15 False-positive FDG PET CT Scan in Vertebral Hemangioma.pdf"
  },
  {
    title: "Scintigraphy in Functional Neuroendocrine Tumors with Review of Literature",
    journal: "J Neuroendocrinol Res, an open access journal",
    details: "Volume 1 • Issue 1 • 1000102",
    icon: Dna
  },
  {
    title: "Radionuclide Liver-Spleen Scan to Detect Splenosis",
    journal: "Indian Journal of Surgery",
    details: "Received: 30 January 2019 /Accepted: 20 June 2019",
    icon: FlaskConical
  },
  {
    title: "Pericardial sarcoidosis presenting as PUO diagnosed on FDG PET CT scan",
    journal: "Asia Ocean J Nucl Med Biol",
    details: "2020; 8(1) 2019; 7(1)",
    icon: HeartPulse
  },
  {
    title: "Localization of acute pyelonephritis in pyrexia of unknown origin using FDG PET/CT",
    journal: "Nucl Med Biol",
    details: "2020; 8(1)79-83. doi: 10.22038/aojnmb.2019.14242",
    icon: Droplets
  }
];

export default function PublicationsPage() {
  return (
    <>
      <PageHeader title="Publications" subtitle="Real Stories, Real Outcomes" breadcrumbs={[{ label: 'Publications' }]} image="/Images/publicationHero.jpg" />

      <section className="pt-10 pb-20 lg:pt-16 lg:pb-28 bg-[#f8f9fa]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center gap-2 text-[#3b7a24] font-display font-semibold mb-4">
              <span className="w-10 h-px bg-[#3b7a24]" />
              Our Research & Case Studies
              <span className="w-10 h-px bg-[#3b7a24]" />
            </div>
            <h2 className="font-display font-extrabold text-navy text-2xl lg:text-4xl leading-tight mb-6">
              Research Publications & Scientific Contributions
            </h2>
            <p className="text-navy/70 leading-relaxed text-lg">
              Published research and case reports reflecting our dedication to clinical excellence, scientific inquiry, and evidence-based patient care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-12">
            {publicationsData.map((pub, index) => {
              const Icon = pub.icon;
              return (
                <div
                  key={index}
                  onClick={() => pub.link && window.open(pub.link, '_blank')}
                  className="group rounded-2xl border border-gray-100 hover:border-[#3b7a24]/30 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden cursor-pointer bg-white"
                >
                  {/* Blurred Background Layer */}
                  <div className="absolute inset-0 z-0">
                    <img src="/aboutback.jpg" alt="Background" className="w-full h-full object-cover blur-xl opacity-60 scale-110 group-hover:scale-125 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-lg group-hover:bg-white/50 transition-colors duration-500" />
                  </div>

                  {/* Left animated accent border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#3b7a24] opacity-0 group-hover:opacity-100 transition-all duration-300 z-20" />

                  <div className="p-7 pl-9 flex flex-col h-full relative z-10">

                    {/* Top Meta info */}
                    <div className="flex items-center justify-between mb-5 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#f3f8f1] border border-[#3b7a24]/10 flex items-center justify-center text-[#3b7a24]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#3b7a24] bg-[#3b7a24]/10 px-3 py-1 rounded-full">
                          Research
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#3b7a24] group-hover:text-white transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-navy text-[16px] leading-[1.5] mb-6 group-hover:text-[#3b7a24] transition-colors relative z-10">
                      {pub.title}
                    </h3>

                    <div className="mt-auto relative z-10">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-[#3b7a24]/20 transition-all duration-300 shadow-sm group-hover:shadow-md">
                        <div className="flex items-start gap-2.5 mb-1.5">
                          <Library className="w-4 h-4 text-[#3b7a24]/60 mt-0.5 group-hover:text-[#3b7a24] transition-colors flex-shrink-0" />
                          <p className="text-navy font-bold text-[13px] leading-tight">{pub.journal}</p>
                        </div>
                        <p className="text-navy/60 text-[12px] leading-relaxed pl-6.5">{pub.details}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
