import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code2, Cpu, Layers, Sparkles, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import type { ProjectItem } from '../types/portfolio';
import { SpotlightCard } from './Spotlight';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsHorizontalSectionProps {
  projects: ProjectItem[];
}

export const ProjectsHorizontalSection: React.FC<ProjectsHorizontalSectionProps> = ({
  projects,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-showcase-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            delay: (i % 2) * 0.08,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-8 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-mono-tech text-xs uppercase tracking-[0.28em] text-neutral-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>[ 03 // SELECTED ENGINEERING &amp; 3D CASE STUDIES ]</span>
            </div>
            <h2 className="font-grotesk text-4xl sm:text-5xl font-bold text-spline-white tracking-tight mt-2">
              FLAGSHIP WORKS
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-normal">
            Production systems engineered with real-time 3D WebGL scenes, sub-20ms data pipelines,
            and spacecraft-grade UI precision.
          </p>
        </div>

        {/* 2-Column Non-Growing Spotlight Case Study Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="project-showcase-card">
              <SpotlightCard
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer h-full flex flex-col justify-between"
              >
                {/* Top Visual Window (No scale/grow on hover) */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950 border-b border-white/10">
                  <img
                    src={project.previewImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-mono-tech font-semibold uppercase bg-black/80 border border-white/20 text-white backdrop-blur-md">
                      {project.number} // {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/80 border border-white/15 font-mono-tech text-xs text-neutral-300">
                      {project.year}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xl">
                    <ArrowUpRight className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="font-mono-tech text-xs text-neutral-400 uppercase tracking-widest">
                      {project.subtitle}
                    </div>
                    <h3 className="font-grotesk text-2xl sm:text-3xl font-bold text-spline-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="grid grid-cols-3 gap-2.5">
                      {project.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="rounded-xl bg-white/[0.03] border border-white/10 px-3 py-2"
                        >
                          <div className="text-[10px] font-mono-tech uppercase text-neutral-400">
                            {m.label}
                          </div>
                          <div className="font-grotesk font-bold text-sm sm:text-base text-white mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono-tech text-[11px] text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Deep-Dive Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-monolith max-w-3xl w-full rounded-3xl border border-white/25 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="relative aspect-[16/9] w-full bg-neutral-950">
              <img
                src={selectedProject.previewImage}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/80 border border-white/25 text-white flex items-center justify-center hover:border-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono-tech text-xs uppercase tracking-widest text-neutral-300">
                  CASE STUDY // {selectedProject.number} — {selectedProject.category}
                </span>
                <span className="font-mono-tech text-xs text-neutral-400">
                  {selectedProject.year}
                </span>
              </div>

              <div>
                <h3 className="font-grotesk text-3xl font-bold text-spline-white">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-neutral-400 font-mono-tech mt-1">
                  {selectedProject.subtitle}
                </p>
              </div>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 space-y-1.5">
                <div className="text-xs font-mono-tech uppercase text-white flex items-center gap-2 font-bold">
                  <Cpu className="w-4 h-4" />
                  <span>SYSTEM ARCHITECTURE &amp; RENDER PIPELINE</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300">
                  {selectedProject.architectureNote}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {selectedProject.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center"
                  >
                    <div className="text-[10px] font-mono-tech text-neutral-400 uppercase">
                      {m.label}
                    </div>
                    <div className="font-grotesk text-xl font-bold text-white mt-1">{m.value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono-tech text-xs text-neutral-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl glass-pill text-xs font-mono-tech text-white hover:border-white/50 flex items-center gap-2"
                  >
                    <Code2 className="w-4 h-4 text-white" />
                    <span>Source Architecture</span>
                  </a>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 rounded-xl bg-white text-black font-mono-tech text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Done Inspecting</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
