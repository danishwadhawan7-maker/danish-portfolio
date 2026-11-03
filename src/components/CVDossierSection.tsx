import {
  Award,
  Briefcase,
  Cpu,
  Download,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Printer,
} from 'lucide-react';
import React, { useState } from 'react';
import { DEFAULT_SKILL_GROUPS } from '../data/defaultPortfolioData';
import type {
  CertificateItem,
  CVAchievementItem,
  CVEducationItem,
  CVExperienceItem,
  ProfileData,
} from '../types/portfolio';
import { SpotlightCard } from './Spotlight';

interface CVDossierSectionProps {
  profile: ProfileData;
  experience: CVExperienceItem[];
  education: CVEducationItem[];
  achievements: CVAchievementItem[];
  certificates: CertificateItem[];
}

export const CVDossierSection: React.FC<CVDossierSectionProps> = ({
  profile,
  experience,
  education,
  achievements,
  certificates,
}) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'skills' | 'education'>('experience');

  const handleDownloadOrPrint = () => {
    if (profile.cvPdfUrl) {
      const a = document.createElement('a');
      a.href = profile.cvPdfUrl;
      a.download = profile.cvFileName || `${profile.name}_CV.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.print();
    }
  };

  return (
    <section
      id="cv-dossier"
      className="relative py-24 px-4 sm:px-8 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Top Section Header & Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-[0.28em] text-neutral-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-white" />
              <span>[ 05 // EXECUTIVE CURRICULUM VITAE &amp; TECHNICAL DOSSIER ]</span>
            </div>
            <h2 className="font-grotesk text-4xl sm:text-5xl font-bold text-spline-white tracking-tight mt-2">
              INTERACTIVE CV &amp; RESUME
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadOrPrint}
              data-cursor="DOWNLOAD CV"
              className="px-6 py-3 rounded-full bg-white hover:bg-neutral-200 text-black font-mono-tech text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 stroke-[2.5]" />
              <span>Export / Print Executive CV</span>
            </button>
          </div>
        </div>

        {/* Main 12-Column Split Dossier Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Interactive Career & Skill Matrix */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl glass-monolith border border-white/15">
              {[
                { id: 'experience', label: '01. Experience', icon: Briefcase },
                { id: 'skills', label: '02. Tech Arsenal', icon: Cpu },
                { id: 'education', label: '03. Education & Awards', icon: GraduationCap },
              ].map((t) => {
                const Icon = t.icon;
                const active = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as typeof activeTab)}
                    className={`flex-1 min-w-[135px] py-2.5 px-3.5 rounded-xl font-mono-tech text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      active
                        ? 'bg-white text-black font-bold'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {activeTab === 'experience' && (
              <div className="space-y-5">
                {experience.map((exp, idx) => (
                  <SpotlightCard key={exp.id} className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono-tech text-xs font-bold">
                        {exp.period}
                      </span>
                      <span className="font-mono-tech text-xs text-neutral-400">
                        0{idx + 1} // {exp.type}
                      </span>
                    </div>

                    <h3 className="font-grotesk text-xl sm:text-2xl font-bold text-spline-white">
                      {exp.role}
                    </h3>
                    <div className="font-mono-tech text-xs text-neutral-400 mt-1">
                      {exp.company} • {exp.location}
                    </div>

                    <p className="text-sm text-neutral-300 mt-3 leading-relaxed">{exp.summary}</p>

                    <ul className="mt-4 space-y-2">
                      {exp.highlights.map((item, hIdx) => (
                        <li
                          key={hIdx}
                          className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono-tech text-[11px] text-neutral-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-5">
                {DEFAULT_SKILL_GROUPS.map((group) => (
                  <SpotlightCard key={group.code} className="p-6 sm:p-7 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="font-mono-tech text-xs font-bold uppercase tracking-widest text-white">
                        {group.category}
                      </span>
                      <span className="font-mono-tech text-xs text-neutral-500">{group.code}</span>
                    </div>

                    <div className="space-y-3.5">
                      {group.skills.map((sk) => (
                        <div key={sk.name} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-grotesk font-semibold text-white">
                              {sk.name}
                            </span>
                            <div className="flex items-center gap-2 font-mono-tech">
                              <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-neutral-400">
                                {sk.tag}
                              </span>
                              <span className="text-white font-bold">{sk.level}%</span>
                            </div>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-white to-neutral-400"
                              style={{ width: `${sk.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-5">
                {education.map((edu) => (
                  <SpotlightCard key={edu.id} className="p-6 sm:p-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono-tech text-xs font-bold">
                        {edu.period}
                      </span>
                      <span className="font-mono-tech text-xs text-neutral-300">
                        {edu.gpaOrHonors}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-grotesk text-xl sm:text-2xl font-bold text-spline-white">
                        {edu.degree}
                      </h3>
                      <div className="text-sm text-neutral-400 font-mono-tech mt-1">
                        {edu.institution} • {edu.location}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {edu.coursework.map((cw) => (
                        <span
                          key={cw}
                          className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 font-mono-tech text-xs text-neutral-200"
                        >
                          {cw}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                ))}

                <SpotlightCard className="p-6 sm:p-7 space-y-4">
                  <div className="font-mono-tech text-xs uppercase tracking-widest text-white flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>KEY HONORS &amp; RECOGNITION</span>
                  </div>
                  <div className="space-y-4">
                    {achievements.map((ach) => (
                      <div
                        key={ach.id}
                        className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs font-mono-tech">
                          <span className="text-neutral-300">{ach.organization}</span>
                          <span className="text-white">{ach.year}</span>
                        </div>
                        <div className="font-grotesk font-bold text-base text-white">
                          {ach.title}
                        </div>
                        <p className="text-xs text-neutral-400">{ach.detail}</p>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </div>
            )}
          </div>

          {/* Right 5 Columns: Live Printable / Executive Resume Sheet */}
          <div className="lg:col-span-5">
            <SpotlightCard id="printable-cv-sheet" className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-4">
                  <img
                    src="/danish-photo.png"
                    alt={profile.name}
                    className="w-16 h-20 rounded-2xl object-cover object-top border border-white/25 bg-neutral-950 shrink-0"
                  />
                  <div>
                    <div className="font-mono-tech text-[10px] uppercase tracking-widest text-neutral-400">
                      EXECUTIVE CV DOSSIER
                    </div>
                    <h3 className="font-grotesk text-2xl font-bold text-spline-white tracking-wide">
                      {profile.name}
                    </h3>
                    <div className="text-xs text-neutral-300 font-mono-tech mt-0.5">
                      {profile.role}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono-tech text-neutral-300 bg-white/[0.03] p-3.5 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>
                    {profile.location} ({profile.timezone})
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="font-mono-tech text-[10px] uppercase tracking-widest text-neutral-400">
                  01 // EXECUTIVE SUMMARY
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">{profile.bio}</p>
              </div>

              <div className="space-y-3">
                <div className="font-mono-tech text-[10px] uppercase tracking-widest text-neutral-400">
                  02 // CAREER SNAPSHOT
                </div>
                {experience.slice(0, 3).map((e) => (
                  <div
                    key={e.id}
                    className="border-l-2 border-white/40 pl-3 py-0.5 space-y-0.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{e.role}</span>
                      <span className="font-mono-tech text-[10px] text-neutral-400">
                        {e.period}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono-tech text-neutral-300">{e.company}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5">
                <div className="font-mono-tech text-[10px] uppercase tracking-widest text-neutral-400">
                  03 // TOP VERIFIED CERTIFICATIONS ({certificates.length})
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {certificates.slice(0, 4).map((c) => (
                    <div
                      key={c.id}
                      className="px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="text-neutral-200 font-medium truncate">{c.title}</span>
                      <span className="font-mono-tech text-[10px] text-neutral-400 shrink-0">
                        {c.issuerLogoText} • {c.issueDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end">
                <button
                  onClick={handleDownloadOrPrint}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono-tech text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Print CV PDF</span>
                </button>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
};
