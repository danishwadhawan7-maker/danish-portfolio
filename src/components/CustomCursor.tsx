import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const customLabelEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (customLabelEl) {
        setCursorLabel(customLabelEl.getAttribute('data-cursor') || '');
        setIsHoveringInteractive(true);
      } else if (target.closest('a, button, input, textarea, select, [role="button"]')) {
        setCursorLabel('');
        setIsHoveringInteractive(true);
      } else {
        setCursorLabel('');
        setIsHoveringInteractive(false);
      }
    };

    let rafId = 0;
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#ffffff] transition-opacity duration-200"
        style={{ opacity: cursorLabel ? 0 : 1 }}
      />

      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-200 ${
          cursorLabel
            ? 'px-3 py-1 h-7 w-auto bg-white text-black font-mono-tech text-[10px] font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(255,255,255,0.4)]'
            : isHoveringInteractive
              ? 'w-9 h-9 border border-white/80 bg-white/10'
              : 'w-9 h-9 border border-white/25 bg-white/[0.02]'
        }`}
      >
        {cursorLabel && <span>{cursorLabel}</span>}
      </div>
    </div>
  );
};
