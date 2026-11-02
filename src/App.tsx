import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Sparkles } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactFooterSection } from './components/ContactFooterSection';
import { CreatorStudioDrawer } from './components/CreatorStudioDrawer';
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
  fileToDataUrl,
  loadPortfolioState,
  resetPortfolioState,
  savePortfolioState,
} from './utils/storage';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE_DATA);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [certificates, setCertificates] = useState<CertificateItem[]>(DEFAULT_CERTIFICATES);
  const [experience, setExperience] = useState(DEFAULT_CV_EXPERIENCE);
  const [education, setEducation] = useState(DEFAULT_CV_EDUCATION);
  const [achievements, setAchievements] = useState(DEFAULT_CV_ACHIEVEMENTS);
  const [hydrated, setHydrated] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  const [studioOpen, setStudioOpen] = useState(false);
  const [studioTab, setStudioTab] = useState<'identity' | '3d' | 'certificates' | 'cv'>('3d');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3600);
  }, []);

  useEffect(() => {
    loadPortfolioState().then((loaded) => {
      setProfile(loaded.profile);
      setProjects(loaded.projects);
      setCertificates(loaded.certificates);
      setExperience(loaded.experience);
      setEducation(loaded.education);
      setAchievements(loaded.achievements);
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

  const handleUploadGlb = useCallback(
    async (file: File) => {
      const dataUrl = await fileToDataUrl(file);
      setProfile((prev) => ({
        ...prev,
        customModelUrl: dataUrl,
        customModelName: file.name,
        active3DPreset: 'custom-glb',
      }));
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#ffffff', '#d4d4d8', '#71717a'],
      });
      showToast(`3D Model "${file.name}" Mounted in WebGL Stage!`);
    },
    [showToast]
  );

  const handleUploadCvPdf = useCallback(
    async (file: File) => {
      const dataUrl = await fileToDataUrl(file);
      setProfile((prev) => ({
        ...prev,
        cvPdfUrl: dataUrl,
        cvFileName: file.name,
      }));
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#ffffff', '#d4d4d8', '#71717a'],
      });
      showToast(`Official CV "${file.name}" Saved & Ready for Download!`);
    },
    [showToast]
  );

  const handleAddCertificate = useCallback(
    (cert: CertificateItem) => {
      setCertificates((prev) => [cert, ...prev]);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ffffff', '#d4d4d8', '#71717a'],
      });
      showToast(`Certificate "${cert.title}" Added to Vault!`);
    },
    [showToast]
  );

  const handleRemoveCertificate = useCallback(
    (id: string) => {
      setCertificates((prev) => prev.filter((c) => c.id !== id));
      showToast('Certificate Removed from Vault.');
    },
    [showToast]
  );

  const handleResetAll = useCallback(async () => {
    const fresh = await resetPortfolioState();
    setProfile(fresh.profile);
    setProjects(fresh.projects);
    setCertificates(fresh.certificates);
    setExperience(fresh.experience);
    setEducation(fresh.education);
    setAchievements(fresh.achievements);
    showToast('Portfolio Reset to Studio Defaults.');
  }, [showToast]);

  const openStudioWithTab = useCallback(
    (tab: 'identity' | '3d' | 'certificates' | 'cv' = '3d') => {
      setStudioTab(tab);
      setStudioOpen(true);
    },
    []
  );

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
        onOpenStudio={openStudioWithTab}
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
        <HeroSection profile={profile} onOpenStudio={openStudioWithTab} />

        <Interactive3DLabSection
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          onUploadGlb={handleUploadGlb}
        />

        <ProjectsHorizontalSection projects={projects} />

        <CertificatesSection
          certificates={certificates}
          onAddCertificate={handleAddCertificate}
          onRemoveCertificate={handleRemoveCertificate}
        />

        <CVDossierSection
          profile={profile}
          experience={experience}
          education={education}
          achievements={achievements}
          certificates={certificates}
          onUploadCvPdf={handleUploadCvPdf}
        />

        <ContactFooterSection profile={profile} onOpenStudio={openStudioWithTab} />
      </main>

      <CreatorStudioDrawer
        isOpen={studioOpen}
        activeTab={studioTab}
        onTabChange={setStudioTab}
        onClose={() => setStudioOpen(false)}
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
        onUploadGlb={handleUploadGlb}
        onUploadCvPdf={handleUploadCvPdf}
        onResetAll={handleResetAll}
      />

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
