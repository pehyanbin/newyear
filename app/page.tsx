"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  const [is2026, setIs2026] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTransition = () => {
    // Start the transition animation
    setIsTransitioning(true);

    // After 800ms (to match CSS duration), switch the year state
    setTimeout(() => {
      setIs2026(true);
      setIsTransitioning(false);
      triggerCelebration();
    }, 800);
  };

  const triggerCelebration = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center transition-all duration-1000 ease-in-out overflow-hidden
      ${
        is2026
          ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white"
          : "bg-neutral-900 text-neutral-400"
      }`}
    >
      {/* Background Pattern for 2025 (Grainy/Old feel) */}
      {!is2026 && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      )}

      {/* Background Glow for 2026 */}
      {is2026 && (
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400/20 via-transparent to-transparent animate-pulse"></div>
      )}

      <div className="z-10 flex flex-col items-center text-center">
        {/* The Year Display */}
        <h1
          className={`font-black text-9xl tracking-tighter transition-all duration-1000 transform
          ${isTransitioning ? "scale-50 opacity-0 blur-md" : "scale-100 opacity-100 blur-0"}
          ${is2026 ? "drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]" : "font-mono opacity-80"}
          `}
        >
          {is2026 ? "2026" : "2025"}
        </h1>

        {/* Subtitle / Description */}
        <p
          className={`mt-4 text-xl transition-all duration-1000 delay-300
          ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}
          ${is2026 ? "font-sans font-medium text-yellow-200" : "font-mono italic text-neutral-600"}
          `}
        >
          {is2026
            ? "A New Chapter Begins. Embrace the Future."
            : "The chapter is closing..."}
        </p>

        {/* The Trigger Button */}
        {!is2026 && (
          <button
            onClick={handleTransition}
            className={`mt-12 group relative px-8 py-3 overflow-hidden rounded-full transition-all duration-500
            border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800
            ${isTransitioning ? "opacity-0 scale-90" : "opacity-100 scale-100"}
            `}
          >
            <span className="relative z-10 font-mono text-sm tracking-widest uppercase group-hover:text-white transition-colors">
              Initialize 2026
            </span>
          </button>
        )}

        {/* Reset Button (Optional, appears after transition) */}
        {is2026 && (
          <button
            onClick={() => window.location.reload()}
            className="mt-16 text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest animate-fade-in"
          >
            Replay Transition
          </button>
        )}
      </div>
    </main>
  );
}