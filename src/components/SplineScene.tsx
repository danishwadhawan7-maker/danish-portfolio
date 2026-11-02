import { Application } from '@splinetool/runtime';
import React, { useEffect, useRef, useState } from 'react';

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export const SplineScene: React.FC<SplineSceneProps> = ({ scene, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isMounted = true;
    setLoading(true);
    setError(false);

    const app = new Application(canvas);
    app
      .load(scene)
      .then(() => {
        if (isMounted) {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Spline scene load error:', err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
      try {
        app.dispose();
      } catch {
        // ignore dispose cleanup errors
      }
    };
  }, [scene]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-transparent z-10 pointer-events-none">
          <div className="w-7 h-7 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.25em] text-neutral-400">
            LOADING 3D SPLINE ENGINE...
          </span>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-10">
          <span className="font-mono-tech text-xs text-neutral-400">
            3D Scene Ready (Check network or custom .splinecode URL)
          </span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-500 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
