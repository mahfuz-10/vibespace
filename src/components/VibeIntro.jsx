import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export const VibeIntro = ({ onEnter }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [timeStr, setTimeStr] = useState("");
  const [isEntering, setIsEntering] = useState(false);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);

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
     MOBILE-COMPLIANT SYNTHESIZER (EXPLICIT RESUME)
  ========================================================= */
  const playHarmonicEntranceChord = async () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;

      // Crucial for Android / iOS: Resume suspended audio context on touch
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      const freqs = [108, 216, 432, 648];
      const masterGain = ctx.createGain();
      const startTime = ctx.currentTime;

      masterGain.gain.setValueAtTime(0.001, startTime);
      masterGain.gain.exponentialRampToValueAtTime(0.35, startTime + 0.25);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);
      masterGain.connect(ctx.destination);

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        oscGain.gain.setValueAtTime(0.28 / (idx + 1), startTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start(startTime);
        osc.stop(startTime + 1.9);
      });
    } catch (e) {
      console.warn("Audio init failed:", e);
    }
  };

  /* =========================================================
     ENTER EXPERIENCE TRIGGER
  ========================================================= */
  const handleEnterClick = async () => {
    if (isEntering) return;
    setIsEntering(true);

    if (typeof window !== "undefined" && window.navigator?.vibrate) {
      window.navigator.vibrate(30);
    }

    // Play mobile-safe sound
    await playHarmonicEntranceChord();

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
      className={`fixed inset-0 z-[120] bg-[#141512] text-[#F3EFE6] overflow-hidden select-none flex flex-col justify-between p-4 sm:p-10 transition-all duration-700 ${
        isEntering
          ? "opacity-0 scale-[1.02] blur-md pointer-events-none"
          : "opacity-100"
      }`}
    >
      {/* =====================================================
          BACKGROUND AMBIENT GLOWS
      ===================================================== */}
      <div
        className="absolute inset-x-0 -top-24 h-96 pointer-events-none opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 0%, rgba(168, 182, 154, 0.25), transparent 75%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(214, 184, 135, 0.08), rgba(168, 182, 154, 0.04) 40%, transparent 75%)`,
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] h-[350px] pointer-events-none rounded-full blur-[130px] opacity-20"
        style={{
          background: "var(--champagne, rgba(214, 184, 135, 0.25))",
        }}
      />

      {/* =====================================================
          TOP HEADER (MOBILE RESPONSIVE FIXED)
      ===================================================== */}
      <header className="relative z-10 flex items-center justify-between gap-2 text-[8px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.2em] uppercase font-mono text-[#8C9083]">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
            style={{ backgroundColor: "var(--sage, #A8B69A)" }}
          />
          <span className="truncate sm:hidden" style={{ color: "var(--sage, #A8B69A)" }}>
            SPATIAL AUDIO
          </span>
          <span className="hidden sm:inline" style={{ color: "var(--sage, #A8B69A)" }}>
            SPATIAL ARCHITECTURE & SOUND ENGINE
          </span>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden sm:inline opacity-60">ACOUSTIC WORLD</span>
          <span
            className="font-medium tracking-widest px-2 py-0.5 rounded-md border text-[8px] sm:text-[10px]"
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
          CENTER HERO CONTENT
      ===================================================== */}
      <main className="relative z-10 max-w-3xl mx-auto text-center px-2 sm:px-4 my-auto">
        <div
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border mb-5 sm:mb-8 backdrop-blur-md"
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
            className="text-[8px] sm:text-[10px] font-semibold tracking-[0.14em] sm:tracking-[0.16em] uppercase leading-tight"
            style={{ color: "var(--sage, #A8B69A)" }}
          >
            VibeSpace Acoustic World
          </span>
        </div>

        <h1
          className="text-3xl sm:text-6xl md:text-7xl font-light tracking-tight leading-[1.1] sm:leading-[1.08] mb-4 sm:mb-6"
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

        <p
          className="text-[11px] sm:text-sm font-light leading-relaxed max-w-sm sm:max-w-lg mx-auto mb-7 sm:mb-10 opacity-60"
          style={{ color: "var(--text-muted, #94988B)" }}
        >
          Immerse your senses in generative soundscapes tuned precisely to your current coordinates, actions, and inner rhythm.
        </p>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleEnterClick}
            className="group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl font-semibold uppercase tracking-wider text-[10px] sm:text-xs transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, var(--sage, #A8B69A), var(--champagne, #D6B887))",
              color: "#151713",
              boxShadow: "0 12px 35px rgba(168, 182, 154, 0.2)",
            }}
          >
            <span>Enter Experience</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </main>

      {/* =====================================================
          BOTTOM FOOTER (MOBILE RESPONSIVE FIXED)
      ===================================================== */}
      <footer className="relative z-10 flex items-center justify-between gap-2 text-[7px] sm:text-[9px] tracking-[0.16em] sm:tracking-[0.2em] uppercase font-mono text-[#7D8175]">
        <div>
          <span className="sm:hidden">STUDIO READY</span>
          <span className="hidden sm:inline">LIVE STUDIO // COORDINATES READY</span>
        </div>

        <div className="text-right">
          <span>96.0 KHZ // LOSSLESS</span>
        </div>
      </footer>
    </div>
  );
};

export default VibeIntro;