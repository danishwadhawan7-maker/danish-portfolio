import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  CheckCircle2,
  Layers,
  RotateCw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import type { PortraitFrameStyle, Preset3DId, ProfileData } from '../types/portfolio';
import { SpotlightCard } from './Spotlight';

gsap.registerPlugin(ScrollTrigger);

interface Interactive3DLabSectionProps {
  profile: ProfileData;
  onUpdateProfile: (partial: Partial<ProfileData>) => void;
}

const PRESETS: { id: Preset3DId; name: string; desc: string; polyCount: string }[] = [
  {
    id: 'gyro-core',
    name: 'Orbital Gyroscope + Portrait Core',
    desc: 'Counter-rotating orbital rings framing your 3D floating biometric portrait card.',
    polyCount: '28,400 TRIS',
  },
  {
    id: 'liquid-knot',
    name: 'Silver Chrome Torus Knot',
    desc: 'Dual-layer metallic + wireframe topological knot with studio rim reflections.',
    polyCount: '42,000 TRIS',
  },
  {
    id: 'quantum-icosa',
    name: 'Quantum Geodesic Matrix',
    desc: 'Nested icosahedron crystal core inside a geodesic wireframe containment shell.',
    polyCount: '18,200 TRIS',
  },
  {
    id: 'dna-helix',
    name: 'Architectural DNA Lattice',
    desc: '48-node glowing double-helix molecular lattice rotating in 3D space.',
    polyCount: '31,600 TRIS',
  },
  {
    id: 'cyber-portal',
    name: 'Hexagonal Singularity Portal',
    desc: '6-stage concentric hexagonal dimensional tunnel with depth parallax.',
    polyCount: '14,800 TRIS',
  },
];

export const Interactive3DLabSection: React.FC<Interactive3DLabSectionProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const manifestoRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (manifestoRef.current) {
        const words = manifestoRef.current.querySelectorAll('.scrub-word');
        gsap.fromTo(
          words,
          { opacity: 0.25 },
          {
            opacity: 1,
            stagger: 0.04,
            ease: 'none',
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: 'top 84%',
              end: 'bottom 50%',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [profile.bio]);

  const bioWords = profile.bio.split(' ');

  return (
    <section
      id="lab-3d"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-8 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Part 1: Scroll-Scrubbed Manifesto */}
        <div className="max-w-4xl">
          <div className="font-mono-tech text-xs uppercase tracking-[0.28em] text-neutral-400 mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>[ 02 // IDENTITY MANIFESTO &amp; 3D WEBGL LAB ]</span>
          </div>

          <p
            ref={manifestoRef}
            className="font-grotesk text-2xl sm:text-3xl md:text-4xl font-semibold leading-[1.35] tracking-tight text-white flex flex-wrap gap-x-2 gap-y-1"
          >
            {bioWords.map((word, idx) => (
              <span key={idx} className="scrub-word inline-block text-white">
                {word}
              </span>
            ))}
          </p>

          <div className="mt-6 pl-4 border-l-2 border-white/30 text-sm sm:text-base text-neutral-400 max-w-2xl">
            “{profile.philosophy}”
          </div>
        </div>

        {/* Part 2: Interactive 3D Elements Control Deck + Official Portrait Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 7 Cols: 3D Sculpture Switcher */}
          <SpotlightCard className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                  REAL-TIME WEBGL SCENE CONTROLLER
                </div>
                <h2 className="font-grotesk text-2xl sm:text-3xl font-bold text-spline-white mt-1">
                  Interactive 3D Geometry Presets
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PRESETS.map((preset) => {
                const active = profile.active3DPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => onUpdateProfile({ active3DPreset: preset.id })}
                    className={`text-left p-4 rounded-2xl border transition-colors duration-200 cursor-pointer ${
                      active
                        ? 'bg-white/[0.1] border-white text-white'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/30 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono-tech text-[10px] uppercase tracking-widest text-neutral-400">
                        {preset.polyCount}
                      </span>
                      {active && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                    <div className="font-grotesk font-bold text-base text-white mt-1">
                      {preset.name}
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{preset.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => onUpdateProfile({ wireframeMode: !profile.wireframeMode })}
                className={`p-3.5 rounded-xl border font-mono-tech text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  profile.wireframeMode
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-white/30'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>WIREFRAME SHADER</span>
                </span>
                <span className="font-bold">{profile.wireframeMode ? 'ON' : 'OFF'}</span>
              </button>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-center">
                <div className="flex items-center justify-between text-[11px] font-mono-tech text-neutral-400 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5 text-white" />
                    <span>ORBIT VELOCITY</span>
                  </span>
                  <span className="text-white">{profile.autoRotateSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.2"
                  value={profile.autoRotateSpeed}
                  onChange={(e) =>
                    onUpdateProfile({ autoRotateSpeed: parseFloat(e.target.value) })
                  }
                  className="w-full accent-white cursor-pointer"
                />
              </div>
            </div>
          </SpotlightCard>

          {/* Right 5 Cols: Official Portrait Card */}
          <SpotlightCard className="lg:col-span-5 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                  COMMANDER PROFILE // VERIFIED
                </div>
                <h3 className="font-grotesk text-2xl font-bold text-spline-white mt-0.5">
                  {profile.name}
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 font-mono-tech text-[10px] text-white">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ACTIVE</span>
              </div>
            </div>

            {/* Official Portrait Display */}
            <div className="relative aspect-[4/4.6] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-white/15">
              <img
                src="/danish-photo.png"
                alt={profile.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-neutral-300">
                    {profile.role}
                  </div>
                  <div className="font-grotesk text-xl font-bold text-white mt-0.5">
                    {profile.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400">
                3D HOLOGRAM FRAME MATERIAL
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {(
                  [
                    { id: 'hologram', label: 'Orbital Glass' },
                    { id: 'monolith', label: 'Obsidian Monolith' },
                    { id: 'neon-ring', label: 'Chrome Pulse' },
                    { id: 'minimal', label: 'Stealth Carbon' },
                  ] as { id: PortraitFrameStyle; label: string }[]
                ).map((style) => (
                  <button
                    key={style.id}
                    onClick={() => onUpdateProfile({ portraitFrameStyle: style.id })}
                    className={`px-3.5 py-2.5 rounded-xl border text-xs font-mono-tech text-left transition-colors cursor-pointer ${
                      profile.portraitFrameStyle === style.id
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-white/30'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
