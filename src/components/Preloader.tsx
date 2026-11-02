import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  name: string;
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ name, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 1100;

    let raf = 0;
    const step = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 400);
        }, 150);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.95 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9990] bg-[#030305] flex flex-col justify-between p-6 sm:p-12 overflow-hidden border-b border-white/20"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-white/[0.05] blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between text-xs font-mono-tech text-neutral-400 tracking-widest">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>SYS.BOOT // {name.toUpperCase()}.ORBITAL.V4</span>
            </div>
            <span className="hidden sm:inline text-neutral-300">
              SPLINE 3D + THREE.JS WEBGL 2.0
            </span>
          </div>

          <div className="relative z-10 my-auto flex flex-col items-center text-center">
            <div className="text-[11px] font-mono-tech uppercase tracking-[0.35em] text-neutral-400 mb-3">
              INITIALIZING INTERACTIVE 3D ENVIRONMENT
            </div>
            <h1 className="font-grotesk text-5xl sm:text-7xl font-bold tracking-tight text-spline-white">
              {name}
            </h1>
            <div className="mt-6 w-64 sm:w-80 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-white via-neutral-200 to-neutral-400 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 font-mono-tech text-[11px] text-neutral-400 tracking-widest">
              {progress < 40
                ? 'MOUNTING SPLINE 3D SCENE & SPOTLIGHT...'
                : progress < 80
                  ? 'LOADING CERTIFICATES VAULT & CV DOSSIER...'
                  : 'SYSTEM ONLINE'}
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-between">
            <div className="text-xs font-mono-tech text-neutral-500 space-y-1">
              <div>FRAME TARGET: 120 FPS</div>
              <div>STORAGE ENGINE: INDEXED-DB READY</div>
            </div>
            <div className="font-grotesk text-6xl sm:text-8xl font-bold tracking-tighter text-spline-white">
              {String(progress).padStart(3, '0')}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
