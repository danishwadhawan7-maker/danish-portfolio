import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Sparkles } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactFooterSection } from './components/ContactFooterSection';
import { CustomCursor } from './components/CustomCursor';
import { CVDossierSection } from './components/CVDossierSection';
import { HeroSection } from './components/HeroSection';
import { Interactive3DLabSection } from './components/Interactive3DLabSection';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { ProjectsHorizontalSection } from './components/ProjectsHorizontalSection';
import { Scene3DCanvas } from './components/Scene3DCanvas';
import {
  DEFAULT_CERTIFICATES,
  DEFAULT_CV_ACHIEVEMENTS,
  DEFAULT_CV_EDUCATION,
  DEFAULT_CV_EXPERIENCE,
  DEFAULT_PROFILE_DATA,
  DEFAULT_PROJECTS,
} from './data/defaultPortfolioData';
import type { CertificateItem, ProfileData } from './types/portfolio';
import {
  loadPortfolioState,
  savePortfolioState,
} from './utils/storage';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE_DATA);
  const [projects] = useState(DEFAULT_PROJECTS);
  const [certificates] = useState<CertificateItem[]>(DEFAULT_CERTIFICATES);
  const [experience] = useState(DEFAULT_CV_EXPERIENCE);
  const [education] = useState(DEFAULT_CV_EDUCATION);
  const [achievements] = useState(DEFAULT_CV_ACHIEVEMENTS);
  const [hydrated, setHydrated] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [toastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadPortfolioState().then((loaded) => {
      setProfile(loaded.profile);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    savePortfolioState({
      profile,
      projects,
      certificates,
      experience,
      education,
      achievements,
    });
  }, [hydrated, profile, projects, certificates, experience, education, achievements]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', (e: { progress: number; velocity: number }) => {
      setScrollProgress(e.progress || 0);
      setScrollVelocity(e.velocity || 0);
      ScrollTrigger.update();
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  const handleUpdateProfile = useCallback((partial: Partial<ProfileData>) => {
    setProfile((prev) => ({ ...prev, ...partial }));
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030305] text-white selection:bg-white/20 selection:text-white">
      <CustomCursor />

      {!booted && <Preloader name={profile.name} onComplete={() => setBooted(true)} />}

      <Scene3DCanvas
        profile={profile}
        scrollProgress={scrollProgress}
        scrollVelocity={scrollVelocity}
      />

      <Navbar
        profile={profile}
        scrollProgress={scrollProgress}
      />

      {/* Right-Edge Vertical Scroll Progress HUD (Desktop) */}
      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 pointer-events-none">
        <span className="font-mono-tech text-[10px] text-white tracking-widest">01</span>
        <div className="w-1 h-40 rounded-full bg-white/10 overflow-hidden">
          <div
            className="w-full bg-white transition-all duration-100"
            style={{ height: `${Math.min(100, Math.max(4, scrollProgress * 100))}%` }}
          />
        </div>
        <span className="font-mono-tech text-[10px] text-neutral-400 tracking-widest">06</span>
      </div>

      <main className="relative z-10">
        <HeroSection profile={profile} />

        <Interactive3DLabSection
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
        />

        <ProjectsHorizontalSection projects={projects} />

        <CertificatesSection
          certificates={certificates}
        />

        <CVDossierSection
          profile={profile}
          experience={experience}
          education={education}
          achievements={achievements}
          certificates={certificates}
        />

        <ContactFooterSection profile={profile} />
      </main>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[300] glass-monolith px-5 py-3.5 rounded-2xl border border-white/35 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-2.5 font-mono-tech text-xs text-white">
          <Sparkles className="w-4 h-4 text-white shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default App;
