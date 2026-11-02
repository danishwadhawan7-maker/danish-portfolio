import {
  ArrowDownRight,
  Award,
  Box,
  FileText,
  Sparkles,
  User,
} from 'lucide-react';
import React, { useState } from 'react';
import type { ProfileData } from '../types/portfolio';
import { SplineScene } from './SplineScene';
import { Spotlight, SpotlightCard } from './Spotlight';

interface HeroSectionProps {
  profile: ProfileData;
  onOpenStudio: (tab: 'identity' | '3d' | 'certificates' | 'cv') => void;
}

const DEFAULT_SPLINE_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenStudio,
}) => {
  const [stageMode, setStageMode] = useState<'spline' | 'portrait'>('spline');

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 px-4 sm:px-8 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full space-y-6 relative z-10">
        {/* Main Spline Spotlight Card (Exact Inspiration from 615b9422-9985-43f6-8593-d7d7bc3b0be1) */}
        <div className="w-full min-h-[560px] lg:min-h-[610px] bg-black/[0.96] rounded-3xl border border-white/[0.14] relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9)] flex flex-col lg:flex-row">
          {/* Volumetric White Spotlight Beam */}
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

          {/* Top Spaceship Telemetry Header Strip inside Card */}
          <div className="absolute top-4 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.14] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-neutral-300">
                {profile.availability}
              </span>
            </div>

            {/* Stage Mode Switcher (Interactive 3D Spline vs Danish Portrait) */}
            <div className="pointer-events-auto inline-flex items-center gap-1 p-1 rounded-full bg-black/80 border border-white/15 backdrop-blur-md">
              <button
                onClick={() => setStageMode('spline')}
                className={`px-3 py-1 rounded-full font-mono-tech text-[10px] uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                  stageMode === 'spline'
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Interactive 3D</span>
              </button>
              <button
                onClick={() => setStageMode('portrait')}
                className={`px-3 py-1 rounded-full font-mono-tech text-[10px] uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                  stageMode === 'portrait'
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <User className="w-3 h-3" />
                <span>Portrait View</span>
              </button>
            </div>
          </div>

          {/* Left Content Column */}
          <div className="flex-1 p-8 sm:p-12 lg:p-14 pt-16 lg:pt-20 relative z-10 flex flex-col justify-center space-y-6">
            {/* Permanent Spaceship Identity Badge featuring Danish's Photo */}
            <div className="inline-flex items-center gap-3.5 p-2 pr-4 rounded-2xl bg-white/[0.04] border border-white/15 w-fit">
              <img
                src="/danish-photo.png"
                alt={profile.name}
                className="w-12 h-12 rounded-xl object-cover object-top border border-white/30"
              />
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                  [ 01 // CREATIVE TECHNOLOGIST &amp; 3D ARCHITECT ]
                </div>
                <div className="font-grotesk text-sm font-semibold text-white mt-0.5">
                  {profile.name} • {profile.location}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Crisp, Normal-Width, 100% Visible White-to-Silver Gradient Typography */}
              <h1 className="font-grotesk text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
                <span className="block">{profile.name}</span>
                <span className="block">SPATIAL WEB</span>
                <span className="block">&amp; AI SYSTEMS</span>
              </h1>
            </div>

            <p className="text-neutral-300 text-sm sm:text-base max-w-lg leading-relaxed font-normal">
              {profile.subTagline}
            </p>

            {/* Spaceship Action Bar (Zero Growing Elements) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#works"
                data-cursor="WORKS"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-grotesk font-semibold text-sm tracking-wide transition-colors duration-200"
              >
                <span>Explore Works</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href="#certificates"
                data-cursor="VAULT"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/35 text-white font-grotesk font-medium text-sm transition-colors duration-200"
              >
                <Award className="w-4 h-4 text-neutral-300" />
                <span>Certificates</span>
              </a>

              <a
                href="#cv-dossier"
                data-cursor="RESUME"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/35 text-white font-grotesk font-medium text-sm transition-colors duration-200"
              >
                <FileText className="w-4 h-4 text-neutral-300" />
                <span>CV &amp; Resume</span>
              </a>

              <button
                onClick={() => onOpenStudio('3d')}
                className="px-4 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-neutral-200 font-mono-tech text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Box className="w-3.5 h-3.5 text-white" />
                <span>Upload 3D (.GLB)</span>
              </button>
            </div>
          </div>

          {/* Right Content Column: Live Interactive 3D Spline Scene OR Danish's Portrait */}
          <div className="flex-1 relative min-h-[420px] lg:min-h-[580px] flex items-center justify-center">
            {stageMode === 'spline' ? (
              <SplineScene scene={DEFAULT_SPLINE_SCENE} className="w-full h-full" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 pt-16">
                <div className="relative w-full max-w-sm aspect-[4/4.8] rounded-2xl overflow-hidden bg-neutral-950 border border-white/20 shadow-2xl">
                  <img
                    src="/danish-photo.png"
                    alt={profile.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                    <div>
                      <div className="font-mono-tech text-[10px] uppercase tracking-widest text-neutral-400">
                        COMMANDER IDENTITY // VERIFIED
                      </div>
                      <div className="font-grotesk text-xl font-bold text-white">
                        {profile.name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom 4-Column Non-Growing Spotlight Telemetry Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'EXPERIENCE', value: profile.yearsOfExperience, sub: 'Production Years' },
            { label: 'SHIPMENTS', value: profile.projectsCompleted, sub: 'Flagship Builds' },
            { label: 'CREDENTIALS', value: profile.certificatesCount, sub: 'Verified Certs' },
            { label: '3D ENGINE', value: '120 FPS', sub: 'Spline + WebGL 2.0' },
          ].map((stat, idx) => (
            <SpotlightCard key={idx} className="p-5">
              <div className="font-mono-tech text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                {stat.label}
              </div>
              <div className="font-grotesk text-2xl sm:text-3xl font-bold text-spline-white mt-1">
                {stat.value}
              </div>
              <div className="text-[11px] text-neutral-400 font-mono-tech mt-0.5">{stat.sub}</div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};
