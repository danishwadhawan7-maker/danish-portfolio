import confetti from 'canvas-confetti';
import {
  ArrowUp,
  Check,
  Copy,
  ExternalLink,
  Mail,
  Send,
  Sparkles,
} from 'lucide-react';
import React, { useState } from 'react';
import type { ProfileData } from '../types/portfolio';
import { SpotlightCard } from './Spotlight';

interface ContactFooterSectionProps {
  profile: ProfileData;
}

export const ContactFooterSection: React.FC<ContactFooterSectionProps> = ({
  profile,
}) => {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMsg, setSenderMsg] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    confetti({
      particleCount: 45,
      spread: 55,
      origin: { y: 0.8 },
      colors: ['#ffffff', '#d4d4d8', '#71717a'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim()) return;
    setSentSuccess(true);
    confetti({
      particleCount: 55,
      spread: 65,
      origin: { y: 0.75 },
      colors: ['#ffffff', '#d4d4d8', '#71717a'],
    });
    setSenderName('');
    setSenderEmail('');
    setSenderMsg('');
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <footer
      id="contact"
      className="relative pt-24 pb-16 px-4 sm:px-8 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 7 Columns: Clean White-to-Silver Call-to-Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="font-mono-tech text-xs uppercase tracking-[0.28em] text-neutral-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>[ 06 // INITIATE TRANSMISSION &amp; COLLABORATION ]</span>
            </div>

            <h2 className="font-grotesk text-4xl sm:text-6xl font-bold text-spline-white leading-[1.06] tracking-tight">
              LET’S BUILD <br />
              THE ICONIC.
            </h2>

            <p className="text-neutral-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Available for full-time engineering leadership, flagship interactive 3D builds, and
              high-impact AI product architecture.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleCopyEmail}
                data-cursor="COPY EMAIL"
                className="group glass-monolith px-6 py-4 rounded-2xl border border-white/20 hover:border-white/50 flex items-center gap-3.5 transition-colors cursor-pointer"
              >
                <Mail className="w-5 h-5 text-white" />
                <span className="font-mono-tech text-sm sm:text-base text-white font-bold">
                  {profile.email}
                </span>
                {copied ? (
                  <span className="px-2.5 py-1 rounded-lg bg-white/15 text-white font-mono-tech text-xs flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Copied!
                  </span>
                ) : (
                  <Copy className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                )}
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              {[
                { label: 'GITHUB', url: profile.socials.github },
                { label: 'LINKEDIN', url: profile.socials.linkedin },
                { label: 'X / TWITTER', url: profile.socials.twitter },
                { label: 'DRIBBBLE', url: profile.socials.dribbble },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-full glass-pill hover:border-white/50 font-mono-tech text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>{soc.label}</span>
                  <ExternalLink className="w-3 h-3 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Right 5 Columns: Direct Transmission Form */}
          <SpotlightCard className="lg:col-span-5 p-6 sm:p-8">
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div className="font-mono-tech text-xs uppercase tracking-widest text-neutral-400 mb-2">
                DIRECT DISPATCH TERMINAL
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Alex Mercer"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech uppercase text-neutral-400 mb-1">
                  Project Brief or Role Details
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell Danish about your flagship project, timeline, or engineering role..."
                  value={senderMsg}
                  onChange={(e) => setSenderMsg(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-sm text-white focus:border-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono-tech text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{sentSuccess ? 'Transmission Dispatched ✓' : 'Transmit Message'}</span>
              </button>
            </form>
          </SpotlightCard>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-neutral-500">
          <div>
            © {new Date().getFullYear()} {profile.name} — ENGINEERED WITH SPLINE 3D, THREE.JS WEBGL
            2.0 &amp; LENIS
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-4 py-2 rounded-full glass-pill text-neutral-300 hover:text-white flex items-center gap-2 cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
