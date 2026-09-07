import React, { useState, useEffect, useRef } from 'react';

interface StartupLoadingScreenProps {
  onComplete: () => void;
  durationSeconds?: number;
}

export const StartupLoadingScreen: React.FC<StartupLoadingScreenProps> = ({
  onComplete,
  durationSeconds = 2.4
}) => {
  const [progress, setProgress] = useState<number>(10);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const hasFinishedRef = useRef<boolean>(false);

  // Lock body scroll while the full-screen loading screen is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
    };
  }, []);

  const handleFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  useEffect(() => {
    const startTime = Date.now();
    const durationMs = durationSeconds * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressRatio = Math.min(elapsed / durationMs, 1);

      // Smooth progress curve advancing from 10% to 100%
      const newProgress = Math.min(100, Math.round(10 + 90 * Math.pow(progressRatio, 0.85)));
      setProgress(newProgress);

      if (progressRatio >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          handleFinish();
        }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [durationSeconds]);

  return (
    <div
      id="startup-loading-screen"
      className={`fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen min-h-screen z-[99999] bg-[#f8faff] text-slate-800 font-sans antialiased flex flex-col items-center justify-center select-none overflow-hidden transition-opacity duration-600 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient Light Atmosphere */}
      <div className="absolute inset-0 pattern-grid opacity-60 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] blur-glow-blue pointer-events-none rounded-full"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100/70 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-50/80 rounded-full blur-3xl pointer-events-none"></div>

      {/* Central Loading Stage */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 py-8 w-full max-w-md mx-auto my-auto text-center">
        {/* Refined Logo Emblem with Soft Subtle Ripple */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full border border-blue-200 animate-ripple"></div>
          <div
            className="absolute inset-3 rounded-full border border-blue-300/40 animate-ripple"
            style={{ animationDelay: '1.5s' }}
          ></div>
          <div className="absolute inset-0 rounded-full border border-dashed border-blue-200 animate-orbit-slow">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-md shadow-blue-400/50 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-500 border-2 border-white shadow-md shadow-cyan-400/40"></div>
          </div>
          <div className="relative z-10 w-24 h-24 rounded-2xl bg-white border border-blue-100 shadow-xl shadow-blue-500/10 flex flex-col items-center justify-center p-3 animate-pulse-subtle group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-600/30 mb-1">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v18M6 8h12M4 14l2-6 2 6a2.5 2.5 0 0 1-4 0zM16 14l2-6 2 6a2.5 2.5 0 0 1-4 0z"></path>
              </svg>
            </div>
            <span className="text-[11px] font-extrabold text-blue-900 tracking-tight">
              IP-SAKTI
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
          IP-Sakti Sahayak
        </h1>

        {/* Sleek Loading Line Animation */}
        <div className="w-64 sm:w-72 h-1.5 bg-blue-100 rounded-full overflow-hidden relative">
          <div
            id="progress-bar"
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600 rounded-full relative overflow-hidden transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer"></div>
          </div>
        </div>

        {/* Dynamic Percentage Readout */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono font-medium text-slate-400">
          <span>{progress}%</span>
          {progress === 100 && (
            <span className="text-emerald-600 font-sans text-[11px] font-semibold animate-pulse">
              • Ready
            </span>
          )}
        </div>
      </main>
    </div>
  );
};
