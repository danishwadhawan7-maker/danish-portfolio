import { Award, Box, FileText, Mail, Sparkles, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { ProfileData } from '../types/portfolio';

interface NavbarProps {
  profile: ProfileData;
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  scrollProgress,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Brand Spaceship Module with Danish's Real Portrait */}
        <button
          onClick={() => scrollToSection('hero')}
          data-cursor="HOME"
          className="pointer-events-auto glass-pill px-4 py-2.5 rounded-full flex items-center gap-3 hover:border-white/40 transition-colors duration-200 cursor-pointer"
        >
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/40 bg-neutral-900 flex items-center justify-center">
            <img
              src="/danish-photo.png"
              alt={profile.name}
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-white ring-2 ring-black" />
          </div>
          <div className="text-left">
            <div className="font-display font-bold text-sm tracking-wider text-white flex items-center gap-1.5">
              <span>{profile.name}</span>
              <span className="text-neutral-400 text-xs font-mono-tech">// 3D.SYS</span>
            </div>
          </div>
        </button>

        {/* Center Spaceship Navigation Dock (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 pointer-events-auto glass-pill px-2.5 py-1.5 rounded-full shadow-2xl">
          {[
            { id: 'hero', label: '01. Identity', icon: User },
            { id: 'lab-3d', label: '02. 3D Lab', icon: Box },
            { id: 'works', label: '03. Works', icon: Sparkles },
            { id: 'certificates', label: '04. Certificates', icon: Award },
            { id: 'cv-dossier', label: '05. CV Dossier', icon: FileText },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono-tech text-neutral-300 hover:text-white hover:bg-white/10 transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-white/80" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Telemetry + Contact Button */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          <div className="hidden xl:flex items-center gap-2 glass-pill px-3.5 py-2 rounded-full text-[11px] font-mono-tech text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span>{timeStr}</span>
            <span className="text-neutral-600">|</span>
            <span className="text-white font-semibold">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          <button
            onClick={() => scrollToSection('contact')}
            data-cursor="CONTACT"
            className="rounded-full px-5 py-2.5 bg-white hover:bg-neutral-200 text-black font-mono-tech text-xs font-bold tracking-wider uppercase shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Contact</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden glass-pill px-3 py-2.5 rounded-full text-xs font-mono-tech text-neutral-200"
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto mt-3 glass-monolith rounded-2xl p-4 flex flex-col gap-2 max-w-md ml-auto">
          {[
            { id: 'hero', label: '01 // Identity & 3D Hero' },
            { id: 'lab-3d', label: '02 // 3D Elements Lab' },
            { id: 'works', label: '03 // Selected Case Studies' },
            { id: 'certificates', label: '04 // Verified Certificates Vault' },
            { id: 'cv-dossier', label: '05 // Interactive CV & Resume' },
            { id: 'contact', label: '06 // Initiate Contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left px-4 py-2.5 rounded-xl font-mono-tech text-xs text-neutral-200 hover:bg-white/10 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
