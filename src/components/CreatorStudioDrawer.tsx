import {
  Award,
  Box,
  CheckCircle2,
  Download,
  FileText,
  RotateCcw,
  Sparkles,
  Upload,
  User,
  X,
} from 'lucide-react';
import React, { useRef } from 'react';
import type { ProfileData } from '../types/portfolio';

interface CreatorStudioDrawerProps {
  isOpen: boolean;
  activeTab: 'identity' | '3d' | 'certificates' | 'cv';
  onTabChange: (tab: 'identity' | '3d' | 'certificates' | 'cv') => void;
  onClose: () => void;
  profile: ProfileData;
  onUpdateProfile: (partial: Partial<ProfileData>) => void;
  onUploadGlb: (file: File) => void;
  onUploadCvPdf: (file: File) => void;
  onResetAll: () => void;
}

export const CreatorStudioDrawer: React.FC<CreatorStudioDrawerProps> = ({
  isOpen,
  activeTab,
  onTabChange,
  onClose,
  profile,
  onUpdateProfile,
  onUploadGlb,
  onUploadCvPdf,
  onResetAll,
}) => {
  const glbRef = useRef<HTMLInputElement | null>(null);
  const cvRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-md flex justify-end"
      onClick={onClose}
    >
      <input
        ref={glbRef}
        type="file"
        accept=".glb,.gltf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onUploadGlb(f);
        }}
      />
      <input
        ref={cvRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onUploadCvPdf(f);
        }}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#070709] border-l border-white/20 h-full flex flex-col justify-between shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-neutral-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>CREATOR STUDIO // LIVE INDEXED-DB ENGINE</span>
            </div>
            <h2 className="font-grotesk text-2xl font-bold text-spline-white mt-0.5">
              3D Models, CV &amp; Bio Studio
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/15 text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pt-4 grid grid-cols-4 gap-2 border-b border-white/10 pb-4">
          {[
            { id: '3d', label: '3D (.GLB)', icon: Box },
            { id: 'cv', label: 'CV & PDF', icon: FileText },
            { id: 'certificates', label: 'Certs Guide', icon: Award },
            { id: 'identity', label: 'Bio & Info', icon: User },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onTabChange(t.id as typeof activeTab)}
                className={`py-2.5 px-3 rounded-xl font-mono-tech text-xs flex flex-col items-center gap-1 border transition-colors cursor-pointer ${
                  active
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'identity' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => onUpdateProfile({ name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                    Primary Role Title
                  </label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => onUpdateProfile({ role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => onUpdateProfile({ email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => onUpdateProfile({ phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                    Location &amp; Availability Status
                  </label>
                  <input
                    type="text"
                    value={profile.availability}
                    onChange={(e) => onUpdateProfile({ availability: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                    Executive Bio (Scroll-Scrubbed in Manifesto)
                  </label>
                  <textarea
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => onUpdateProfile({ bio: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === '3d' && (
            <div className="space-y-5">
              <div
                onClick={() => glbRef.current?.click()}
                className="cursor-pointer rounded-2xl border border-dashed border-white/35 hover:border-white bg-white/[0.04] p-6 text-center space-y-2 transition-colors"
              >
                <Box className="w-10 h-10 text-white mx-auto" />
                <div className="font-grotesk text-lg font-bold text-white">
                  Upload Custom 3D Asset (.GLB or .GLTF)
                </div>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                  Drop any 3D object or scene exported from Spline, Blender, Meshy, or Polycam.
                </p>
                {profile.customModelName && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white text-white font-mono-tech text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Loaded: {profile.customModelName}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono-tech uppercase text-neutral-400">
                  Or Choose Built-In Procedural 3D Sculpture
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {(
                    [
                      { id: 'gyro-core', label: '01 // Orbital Gyroscope + 3D Portrait Core' },
                      { id: 'liquid-knot', label: '02 // Silver Chrome Torus Knot' },
                      { id: 'quantum-icosa', label: '03 // Quantum Geodesic Icosahedron' },
                      { id: 'dna-helix', label: '04 // Architectural DNA Double-Helix' },
                      { id: 'cyber-portal', label: '05 // Hexagonal Singularity Tunnel' },
                      ...(profile.customModelUrl
                        ? [
                            {
                              id: 'custom-glb',
                              label: `06 // Custom Uploaded 3D (${profile.customModelName})`,
                            },
                          ]
                        : []),
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      onClick={() =>
                        onUpdateProfile({
                          active3DPreset: item.id as ProfileData['active3DPreset'],
                        })
                      }
                      className={`p-3.5 rounded-xl border text-left font-mono-tech text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        profile.active3DPreset === item.id
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-white/30'
                      }`}
                    >
                      <span>{item.label}</span>
                      {profile.active3DPreset === item.id && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cv' && (
            <div className="space-y-5">
              <div
                onClick={() => cvRef.current?.click()}
                className="cursor-pointer rounded-2xl border border-dashed border-white/35 hover:border-white bg-white/[0.04] p-6 text-center space-y-2 transition-colors"
              >
                <Upload className="w-10 h-10 text-white mx-auto" />
                <div className="font-grotesk text-lg font-bold text-white">
                  Upload Your Official CV / Resume (.PDF)
                </div>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                  Once uploaded, visitors can view your embedded PDF directly in the CV Dossier
                  section and download it with 1 click!
                </p>
                {profile.cvFileName && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white text-white font-mono-tech text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active PDF: {profile.cvFileName}</span>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="font-mono-tech text-xs text-white font-bold uppercase">
                  Built-In Printable A4 CV Also Active
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Even without uploading a PDF, the website automatically generates a formatted
                  Executive CV sheet with your photo, bio, skills, and certificates that can be
                  exported to PDF via the Print / Save PDF button!
                </p>
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/20 space-y-3">
                <div className="font-mono-tech text-xs text-white font-bold uppercase flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Managing Your Certificates Vault</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                  Scroll to the <strong>04 // Certificates &amp; Honors</strong> section and click{' '}
                  <span className="text-white font-mono-tech font-bold">
                    + Upload / Add Certificate
                  </span>{' '}
                  to upload images of your real certificates, set their Credential IDs, and filter
                  them by domain!
                </p>
                <a
                  href="#certificates"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-black font-mono-tech text-xs font-bold uppercase"
                >
                  Jump to Certificates Vault
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-white/10 bg-black/50 flex items-center justify-between gap-3">
          <button
            onClick={onResetAll}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-300 font-mono-tech text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(profile, null, 2)], {
                  type: 'application/json',
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'danish-portfolio-config.json';
                a.click();
              }}
              className="px-3.5 py-2 rounded-xl glass-pill text-xs font-mono-tech text-neutral-200 hover:border-white flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Export Config</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white text-black font-mono-tech text-xs font-bold uppercase cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
