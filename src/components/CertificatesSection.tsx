import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Eye,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import type { CertificateCategory, CertificateItem } from '../types/portfolio';
import { fileToDataUrl } from '../utils/storage';
import { SpotlightCard } from './Spotlight';

gsap.registerPlugin(ScrollTrigger);

interface CertificatesSectionProps {
  certificates: CertificateItem[];
  onAddCertificate: (cert: CertificateItem) => void;
  onRemoveCertificate: (id: string) => void;
}

const CATEGORIES: CertificateCategory[] = [
  'All',
  'Cloud & AI',
  'Full-Stack & WebGL',
  'UI/UX & Product',
  'Cybersecurity & Architecture',
];

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
  onAddCertificate,
  onRemoveCertificate,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>('All');
  const [inspectedCert, setInspectedCert] = useState<CertificateItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newIssuer, setNewIssuer] = useState('');
  const [newDate, setNewDate] = useState('2026');
  const [newCredId, setNewCredId] = useState('');
  const [newCategory, setNewCategory] =
    useState<Exclude<CertificateCategory, 'All'>>('Cloud & AI');
  const [newSkills, setNewSkills] = useState('Three.js, Cloud Architecture, TypeScript');
  const [newVerifyUrl, setNewVerifyUrl] = useState('https://');
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const certFileInputRef = useRef<HTMLInputElement | null>(null);

  const filteredCerts =
    activeCategory === 'All'
      ? certificates
      : certificates.filter((c) => c.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.cert-vault-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory, certificates.length]);

  const handleCertImageUpload = async (file: File) => {
    const dataUrl = await fileToDataUrl(file);
    setNewImageUrl(dataUrl);
  };

  const handleCreateCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newIssuer.trim()) return;

    const fallbackSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="800" height="560">
        <rect width="800" height="560" rx="20" fill="#09090B" />
        <rect x="24" y="24" width="752" height="512" rx="14" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" />
        <text x="72" y="110" fill="#D4D4D8" font-family="monospace" font-size="15" letter-spacing="4">VERIFIED CERTIFICATE // ${newIssuer.toUpperCase()}</text>
        <text x="72" y="230" fill="#FFFFFF" font-family="sans-serif" font-size="40" font-weight="bold">DANISH</text>
        <text x="72" y="310" fill="#E4E4E7" font-family="sans-serif" font-size="25" font-weight="bold">${newTitle}</text>
        <text x="72" y="450" fill="#A1A1AA" font-family="monospace" font-size="14">ID: ${newCredId || 'VERIFIED-2026'} // ISSUED: ${newDate}</text>
      </svg>
    `)}`;

    const created: CertificateItem = {
      id: `cert-custom-${Date.now()}`,
      title: newTitle.trim(),
      issuer: newIssuer.trim(),
      issuerLogoText: newIssuer.trim().slice(0, 4).toUpperCase(),
      issueDate: newDate.trim() || '2026',
      credentialId: newCredId.trim() || `DN-${Math.floor(10000 + Math.random() * 90000)}`,
      verifyUrl: newVerifyUrl.trim() || '#',
      category: newCategory,
      skills: newSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      accentColor: '#FFFFFF',
      imageUrl: newImageUrl || fallbackSvg,
      description: `Official certification issued by ${newIssuer.trim()} validating advanced proficiency in ${newTitle.trim()}.`,
      verified: true,
      isCustomUploaded: true,
    };

    onAddCertificate(created);
    setNewTitle('');
    setNewIssuer('');
    setNewCredId('');
    setNewImageUrl('');
    setShowAddModal(false);
  };

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-8 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Section Header + Add Certificate Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-[0.28em] text-neutral-400 flex items-center gap-2">
              <Award className="w-4 h-4 text-white" />
              <span>[ 04 // VERIFIED CREDENTIALS &amp; LICENSES VAULT ]</span>
            </div>
            <h2 className="font-grotesk text-4xl sm:text-5xl font-bold text-spline-white tracking-tight mt-2">
              CERTIFICATES &amp; HONORS
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAddModal(true)}
              data-cursor="ADD CERT"
              className="px-5 py-3 rounded-full bg-white hover:bg-neutral-200 text-black font-mono-tech text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Upload / Add Certificate</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-mono-tech text-xs whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? 'bg-white text-black font-bold'
                    : 'glass-pill text-neutral-300 hover:text-white hover:border-white/35'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Non-Growing Spotlight Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div key={cert.id} className="cert-vault-card">
              <SpotlightCard
                onClick={() => setInspectedCert(cert)}
                className="group cursor-pointer h-full flex flex-col justify-between"
              >
                {/* Certificate Preview Image Header */}
                <div className="relative aspect-[16/11] w-full bg-neutral-950 overflow-hidden border-b border-white/10">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-65" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono-tech text-[10px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    <span>VERIFIED // {cert.issueDate}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/85 border border-white/25 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Certificate Metadata Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono-tech">
                      <span className="text-neutral-300 font-bold uppercase tracking-wider">
                        {cert.issuer}
                      </span>
                      <span className="text-neutral-500 text-[11px]">{cert.credentialId}</span>
                    </div>

                    <h3 className="font-grotesk text-lg sm:text-xl font-bold text-spline-white leading-snug">
                      {cert.title}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.slice(0, 3).map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 font-mono-tech text-[10px] text-neutral-300"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>

                    {cert.isCustomUploaded && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveCertificate(cert.id);
                        }}
                        title="Delete Certificate"
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Inspector Modal */}
      {inspectedCert && (
        <div
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setInspectedCert(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-monolith max-w-3xl w-full rounded-3xl border border-white/25 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="relative bg-neutral-950 p-4 sm:p-6 border-b border-white/10">
              <img
                src={inspectedCert.imageUrl}
                alt={inspectedCert.title}
                className="w-full max-h-[420px] object-contain mx-auto rounded-2xl border border-white/10"
              />
              <button
                onClick={() => setInspectedCert(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/80 border border-white/25 text-white flex items-center justify-center hover:border-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/25 text-white font-mono-tech text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>AUTHENTIC CREDENTIAL // {inspectedCert.credentialId}</span>
                </div>
                <span className="font-mono-tech text-xs text-neutral-300">
                  ISSUED: {inspectedCert.issueDate}
                </span>
              </div>

              <div>
                <div className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400">
                  {inspectedCert.issuer} — {inspectedCert.category}
                </div>
                <h3 className="font-grotesk text-2xl sm:text-3xl font-bold text-spline-white mt-1">
                  {inspectedCert.title}
                </h3>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {inspectedCert.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {inspectedCert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/15 font-mono-tech text-xs text-neutral-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <a
                  href={inspectedCert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono-tech text-xs font-bold uppercase transition-colors"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setInspectedCert(null)}
                  className="px-5 py-2.5 rounded-xl glass-pill text-xs font-mono-tech text-neutral-200 hover:text-white cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload / Add New Certificate Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-[210] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowAddModal(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleCreateCert}
            className="glass-monolith max-w-xl w-full rounded-3xl border border-white/25 p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="font-mono-tech text-[11px] text-neutral-400 uppercase tracking-widest">
                  VAULT UPLOADER
                </div>
                <h3 className="font-grotesk text-2xl font-bold text-spline-white">
                  Add / Upload Certificate
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <input
              ref={certFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleCertImageUpload(f);
              }}
            />

            <div
              onClick={() => certFileInputRef.current?.click()}
              className="cursor-pointer rounded-2xl border border-dashed border-white/30 hover:border-white bg-white/[0.03] p-5 text-center space-y-2 transition-colors"
            >
              {newImageUrl ? (
                <img
                  src={newImageUrl}
                  alt="Preview"
                  className="max-h-40 mx-auto rounded-xl object-contain"
                />
              ) : (
                <>
                  <Upload className="w-7 h-7 text-white mx-auto" />
                  <div className="font-mono-tech text-xs font-bold text-white">
                    Click to Upload Certificate Image (PNG / JPG / WEBP)
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    Or leave blank to auto-generate a monochrome SHA-256 certificate card!
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                  Certificate Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Solutions Architect"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amazon Web Services"
                  value={newIssuer}
                  onChange={(e) => setNewIssuer(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(e.target.value as Exclude<CertificateCategory, 'All'>)
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/15 text-sm text-white focus:border-white outline-none"
                >
                  <option value="Cloud & AI">Cloud &amp; AI</option>
                  <option value="Full-Stack & WebGL">Full-Stack &amp; WebGL</option>
                  <option value="UI/UX & Product">UI/UX &amp; Product</option>
                  <option value="Cybersecurity & Architecture">
                    Cybersecurity &amp; Architecture
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                  Issue Year / Date
                </label>
                <input
                  type="text"
                  placeholder="2026"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                  Credential ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. CERT-99281-DN"
                  value={newCredId}
                  onChange={(e) => setNewCredId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                  Verification URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={newVerifyUrl}
                  onChange={(e) => setNewVerifyUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                Skills Validated (Comma separated)
              </label>
              <input
                type="text"
                value={newSkills}
                onChange={(e) => setNewSkills(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
              />
            </div>

            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 rounded-xl glass-pill text-xs font-mono-tech text-neutral-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono-tech text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Save to Vault</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
