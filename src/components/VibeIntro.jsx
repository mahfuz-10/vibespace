import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

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

      const freqs = [108, 216, 432, 648];
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 0.35);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.0);
      masterGain.connect(ctx.destination);

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.22 / (idx + 1), ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
        osc.stop(ctx.currentTime + 2.1);
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

    if (typeof window !== "undefined" && window.navigator?.vibrate) {
      window.navigator.vibrate(20);
    }

    playHarmonicEntranceChord();

    setTimeout(() => {
      if (typeof onEnter === "function") {
        onEnter();
      }
    }, 650);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-[120] bg-[#11120E] text-[#E5E2D9] overflow-hidden select-none flex flex-col justify-between p-6 sm:p-10 transition-all duration-700 ${
        isEntering ? "opacity-0 scale-[1.02] blur-md pointer-events-none" : "opacity-100"
      }`}
    >
      {/* =====================================================
          INTERACTIVE SUBTLE LIGHT SOURCE
      ===================================================== */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(circle 650px at ${mousePos.x}% ${mousePos.y}%, rgba(168, 182, 154, 0.08), rgba(214, 184, 135, 0.035) 40%, transparent 75%)`,
        }}
      />

      {/* Ultra-subtle Architectural Studio Grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* =====================================================
          TOP CORNER HUD (PROFESSIONAL SPEC)
      ===================================================== */}
      <header className="relative z-10 flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-mono text-[#7D8175]">
        {/* Top Left */}
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A8B69A] animate-pulse" />
          <span>VIBESPACE LABS // SYSTEM ACTIVE</span>
        </div>

        {/* Top Right */}
        <div className="flex items-center gap-5">
          <span className="hidden sm:inline">CALIBRATION: 96.0 KHZ / 24-BIT</span>
          <span className="text-[#D6B887] font-semibold">{timeStr || "00:00:00"}</span>
        </div>
      </header>

      {/* =====================================================
          CENTER HERO CONTENT
      ===================================================== */}
      <main className="relative z-10 max-w-3xl mx-auto text-center px-4 my-auto">
        {/* Architecture Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md mb-6 sm:mb-8 animate-fade-up">
          <img
            src="/vibespace-logo-icon.png"
            alt=""
            className="w-3.5 h-3.5 object-contain"
            style={{
              filter: "drop-shadow(0 0 8px rgba(168,182,154,0.35))",
            }}
          />
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.24em] font-semibold text-[#A8B69A]">
            Spatial Sound & Atmosphere
          </span>
        </div>

        {/* Brand Text */}
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.38em] text-[#D6B887]/85 mb-3 sm:mb-4">
          V I B E S P A C E
        </p>

        {/* Center Accent Dash */}
        <div className="w-6 h-px bg-white/20 mx-auto mb-6 sm:mb-8" />

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] text-[#F3EFE6] mb-5 sm:mb-6">
          Find the sound <br />
          <span className="font-normal italic text-[#D6B887]">for your moment.</span>
        </h1>

        {/* Subtext */}
        <p className="text-xs sm:text-sm text-[#94988B] font-light max-w-lg mx-auto leading-relaxed mb-8 sm:mb-10 opacity-75">
          Music, ambience, and atmosphere — shaped dynamically around where you are right now.
        </p>

        {/* Shimmer Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border border-[rgba(214,184,135,0.25)] bg-[rgba(24,26,21,0.85)] hover:bg-[rgba(31,34,27,0.95)] hover:border-[#A8B69A] backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_12px_40px_rgba(0,0,0,0.5)] cursor-pointer"
          >
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
          BOTTOM CORNER HUD (PROFESSIONAL SPEC)
      ===================================================== */}
      <footer className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] tracking-[0.22em] uppercase font-mono text-[#666A5D]">
        {/* Bottom Left */}
        <div>
          <span>MODULE // GENERATIVE ACOUSTICS</span>
        </div>

        {/* Bottom Right */}
        <div className="text-right">
          <span>COORDINATES // DYNAMIC RES_01</span>
        </div>
      </footer>
    </div>
  );
};

export default VibeIntro;