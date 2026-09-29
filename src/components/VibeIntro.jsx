import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Compass, Radio, Sparkles } from "lucide-react";

export const VibeIntro = ({ onEnter }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [timeStr, setTimeStr] = useState("");
  const [isEntering, setIsEntering] = useState(false);
  const containerRef = useRef(null);

  /* =========================================================
     LIVE STUDIO CLOCK
  ========================================================= */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  /* =========================================================
     SMOOTH 3D SPOTLIGHT TRACKING
  ========================================================= */
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  /* =========================================================
     SYNTHESIZED BESPOKE AUDIO CHORD (432Hz WARM HARMONIC)
  ========================================================= */
  const playHarmonicEntranceChord = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Warm ambient chord: 108Hz, 216Hz, 432Hz sine harmony
      const freqs = [108, 216, 432, 648];
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.4);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);
      masterGain.connect(ctx.destination);

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.25 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        osc.stop(ctx.currentTime + 2.3);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  };

  /* =========================================================
     ENTER EXPERIENCE TRIGGER
  ========================================================= */
  const handleEnterClick = () => {
    if (isEntering) return;
    setIsEntering(true);

    // Subtle tactile haptic on mobile
    if (typeof window !== "undefined" && window.navigator?.vibrate) {
      window.navigator.vibrate(25);
    }

    // Play ultra-warm entrance sound
    playHarmonicEntranceChord();

    // Smooth portal transition
    setTimeout(() => {
      if (typeof onEnter === "function") {
        onEnter();
      }
    }, 750);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-[120] bg-[#12130F] text-[#E5E2D9] overflow-hidden select-none flex flex-col justify-between p-6 sm:p-10 transition-all duration-700 ${
        isEntering ? "opacity-0 scale-[1.03] blur-md pointer-events-none" : "opacity-100"
      }`}
    >
      {/* =====================================================
          INTERACTIVE SPOTLIGHT & BREATHING ACOUSTIC RING
      ===================================================== */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle 580px at ${mousePos.x}% ${mousePos.y}%, rgba(168, 182, 154, 0.12), rgba(214, 184, 135, 0.05) 45%, transparent 75%)`,
        }}
      />

      {/* Center Breathing Aura */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
        <div className="w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] rounded-full border border-white/[0.035] animate-ping [animation-duration:8s]" />
        <div className="absolute w-[220px] h-[220px] sm:w-[380px] sm:h-[380px] rounded-full border border-[var(--sage,rgba(168,182,154,0.12))] animate-pulse [animation-duration:5s]" />
      </div>

      {/* Subtle Studio Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* =====================================================
          TOP HUD BAR
      ===================================================== */}
      <header className="relative z-10 flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-mono text-[#8C9083]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A8B69A] animate-pulse" />
          <span>VibeSpace Acoustic Architecture</span>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          <span>SPATIAL AUDIO // 96.0 KHZ</span>
          <span className="text-[#D6B887]">{timeStr || "00:00:00"}</span>
        </div>
      </header>

      {/* =====================================================
          CENTER HERO CONTENT
      ===================================================== */}
      <main className="relative z-10 max-w-3xl mx-auto text-center px-4 my-auto">
        {/* Architecture Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.025] backdrop-blur-md mb-6 sm:mb-8 animate-fade-up">
          <img
            src="/vibespace-logo-icon.png"
            alt=""
            className="w-3.5 h-3.5 object-contain"
            style={{
              filter: "drop-shadow(0 0 8px rgba(168,182,154,0.4))",
            }}
          />
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.24em] font-semibold text-[#A8B69A]">
            Sound & Atmosphere Engine
          </span>
        </div>

        {/* Brand Subtitle */}
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-[#D6B887]/80 mb-3 sm:mb-4">
          V I B E S P A C E
        </p>

        {/* Minimal Divider Accent */}
        <div className="w-8 h-px bg-white/20 mx-auto mb-6 sm:mb-8" />

        {/* Main Title */}
        <h1 className="text-4xl sm:text-7xl font-light tracking-tight leading-[1.05] sm:leading-[1] text-[#F3EFE6] mb-5 sm:mb-6">
          Find the sound <br />
          <span className="font-normal italic text-[#D6B887]">for your moment.</span>
        </h1>

        {/* Subtext */}
        <p className="text-xs sm:text-sm text-[#94988B] font-light max-w-lg mx-auto leading-relaxed mb-8 sm:mb-10 opacity-75">
          Music, ambience, and atmosphere — shaped dynamically around where you are right now.
        </p>

        {/* Magnetic Ultra CTA Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full border border-[rgba(214,184,135,0.25)] bg-[rgba(25,27,22,0.85)] hover:bg-[rgba(32,35,28,0.95)] hover:border-[#A8B69A] backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_12px_40px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            {/* Button Shimmer Ray */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent group-hover:translate-x-full duration-1000 transition-transform" />
            </div>

            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#F3EFE6] group-hover:text-[#D6B887] transition-colors">
              Enter Experience
            </span>

            <ArrowUpRight
              size={15}
              className="text-[#A8B69A] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </main>

      {/* =====================================================
          BOTTOM HUD
      ===================================================== */}
      <footer className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] tracking-[0.22em] uppercase font-mono text-[#6E7266]">
        <div className="flex items-center gap-2">
          <Compass size={11} className="text-[#A8B69A]" />
          <span>Generative Acoustic Environment</span>
        </div>

        <div className="text-right">
          <span>LATITUDE // AUTO-CALIBRATED</span>
        </div>
      </footer>
    </div>
  );
};

export default VibeIntro;