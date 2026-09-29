import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export const VibeIntro = ({ onEnter }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [timeStr, setTimeStr] = useState("");
  const [isEntering, setIsEntering] = useState(false);
  const containerRef = useRef(null);

  /* =========================================================
     LIVE STUDIO TIME
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
     SMOOTH AURA TRACKING
  ========================================================= */
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  /* =========================================================
     WARM 432Hz HARMONIC SYNTHESIZER
  ========================================================= */
  const playHarmonicEntranceChord = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const freqs = [108, 216, 432, 648];
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.35);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.0);
      masterGain.connect(ctx.destination);

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.2 / (idx + 1), ctx.currentTime);
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
      className={`fixed inset-0 z-[120] bg-[#141512] text-[#F3EFE6] overflow-hidden select-none flex flex-col justify-between p-6 sm:p-12 transition-all duration-700 ${
        isEntering ? "opacity-0 scale-[1.02] blur-md pointer-events-none" : "opacity-100"
      }`}
    >
      {/* =====================================================
          APP MATCHED AMBIENT GLOWS (SAGE & CHAMPAGNE)
      ===================================================== */}
      {/* Top subtle emerald/sage ambient glow */}
      <div
        className="absolute inset-x-0 -top-24 h-96 pointer-events-none opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 0%, rgba(168, 182, 154, 0.25), transparent 75%)",
        }}
      />

      {/* Dynamic interactive light following cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(214, 184, 135, 0.07), rgba(168, 182, 154, 0.04) 40%, transparent 75%)`,
        }}
      />

      {/* Center soft warm bloom */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] pointer-events-none rounded-full blur-[130px] opacity-25"
        style={{
          background: "var(--champagne, rgba(214, 184, 135, 0.25))",
        }}
      />

      {/* =====================================================
          TOP HEADER
      ===================================================== */}
      <header className="relative z-10 flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-mono text-[#8C9083]">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--sage, #A8B69A)" }}
          />
          <span style={{ color: "var(--sage, #A8B69A)" }}>
            SPATIAL ARCHITECTURE & SOUND ENGINE
          </span>
        </div>

        <div className="flex items-center gap-5">
          <span className="hidden sm:inline opacity-60">ACOUSTIC WORLD</span>
          <span
            className="font-medium tracking-widest px-2 py-0.5 rounded-md border"
            style={{
              color: "var(--champagne, #D6B887)",
              borderColor: "rgba(214, 184, 135, 0.15)",
              backgroundColor: "rgba(214, 184, 135, 0.05)",
            }}
          >
            {timeStr || "00:00:00"}
          </span>
        </div>
      </header>

      {/* =====================================================
          CENTER HERO CONTENT (APP MATCHED TYPOGRAPHY)
      ===================================================== */}
      <main className="relative z-10 max-w-3xl mx-auto text-center px-4 my-auto">
        {/* Logo / Badge matching App's exact styling */}
        <div
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border mb-6 sm:mb-8 backdrop-blur-md"
          style={{
            backgroundColor: "rgba(168, 182, 154, 0.05)",
            borderColor: "rgba(168, 182, 154, 0.2)",
          }}
        >
          <img
            src="/vibespace-logo-icon.png"
            alt="VibeSpace"
            className="w-3.5 h-3.5 object-contain"
            style={{
              filter:
                "drop-shadow(0 0 6px rgba(168, 182, 154, 0.3)) drop-shadow(0 0 12px rgba(214, 184, 135, 0.15))",
            }}
          />
          <span
            className="text-[9px] sm:text-[10px] font-semibold tracking-[0.16em] uppercase leading-tight"
            style={{ color: "var(--sage, #A8B69A)" }}
          >
            VibeSpace Acoustic World
          </span>
        </div>

        {/* Main Title */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.08] mb-5 sm:mb-6"
          style={{ color: "var(--text-primary, #F3EFE6)" }}
        >
          Find the sound <br />
          <span
            className="font-normal italic"
            style={{ color: "var(--champagne, #D6B887)" }}
          >
            for your moment.
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto mb-8 sm:mb-10 opacity-60"
          style={{ color: "var(--text-muted, #94988B)" }}
        >
          Immerse your senses in generative soundscapes tuned precisely to your current coordinates, actions, and inner rhythm.
        </p>

        {/* Enter Button matching SituationBuilder styling */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-semibold uppercase tracking-wider text-[10px] sm:text-xs transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, var(--sage, #A8B69A), var(--champagne, #D6B887))",
              color: "#151713",
              boxShadow: "0 12px 35px rgba(168, 182, 154, 0.2)",
            }}
          >
            <span>Enter Experience</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </main>

      {/* =====================================================
          BOTTOM FOOTER HUD
      ===================================================== */}
      <footer className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-mono text-[#7D8175]">
        <div>
          <span>LIVE STUDIO // COORDINATES READY</span>
        </div>

        <div className="text-right">
          <span>CALIBRATED // LOSSLESS</span>
        </div>
      </footer>
    </div>
  );
};

export default VibeIntro;