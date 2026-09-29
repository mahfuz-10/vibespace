import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export const VibeIntro = ({ onEnter }) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [timeStr, setTimeStr] = useState("");
  const [isEntering, setIsEntering] = useState(false);
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);

  /* =========================================================
     LIVE STUDIO TIME (KEEPING THE CLEAN WATCH)
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
     MOBILE & PC COMPLIANT HARMONIC ENTRANCE AUDIO
  ========================================================= */
  const playHarmonicEntranceChord = async () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;

      // Unlocks mobile sound restrictions
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      const freqs = [108, 216, 432, 648];
      const masterGain = ctx.createGain();
      const startTime = ctx.currentTime;

      masterGain.gain.setValueAtTime(0.001, startTime);
      masterGain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.2);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);
      masterGain.connect(ctx.destination);

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        oscGain.gain.setValueAtTime(0.25 / (idx + 1), startTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start(startTime);
        osc.stop(startTime + 1.9);
      });
    } catch (e) {
      console.warn("AudioContext error:", e);
    }
  };

  /* =========================================================
     TRIGGER ENTRY
  ========================================================= */
  const handleEnterClick = async () => {
    if (isEntering) return;
    setIsEntering(true);

    if (typeof window !== "undefined" && window.navigator?.vibrate) {
      window.navigator.vibrate(25);
    }

    await playHarmonicEntranceChord();

    setTimeout(() => {
      if (typeof onEnter === "function") {
        onEnter();
      }
    }, 600);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-[120] bg-[#141512] text-[#F3EFE6] overflow-hidden select-none flex flex-col justify-between p-5 sm:p-10 transition-all duration-700 ${
        isEntering
          ? "opacity-0 scale-[1.02] blur-md pointer-events-none"
          : "opacity-100"
      }`}
    >
      {/* =====================================================
          CINEMATIC BACKGROUND AURA
      ===================================================== */}
      {/* Top subtle ambient glow */}
      <div
        className="absolute inset-x-0 -top-24 h-96 pointer-events-none opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(168, 182, 154, 0.3), transparent 75%)",
        }}
      />

      {/* Interactive cursor light */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(214, 184, 135, 0.08), rgba(168, 182, 154, 0.03) 40%, transparent 75%)`,
        }}
      />

      {/* Center soft bloom behind main text */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] h-[360px] pointer-events-none rounded-full blur-[140px] opacity-20"
        style={{
          background: "var(--champagne, rgba(214, 184, 135, 0.3))",
        }}
      />

      {/* =====================================================
          TOP HEADER: BALANCED & PROFESSIONAL
      ===================================================== */}
      <header className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto">
        {/* Brand spec label */}
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--sage, #A8B69A)" }}
          />
          <span
            className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em]"
            style={{ color: "var(--sage, #A8B69A)" }}
          >
            Acoustic World
          </span>
        </div>

        {/* Studio Watch */}
        <div className="flex items-center">
          <span
            className="font-mono text-[9px] sm:text-[11px] font-medium tracking-[0.18em] px-2.5 py-1 rounded-lg border backdrop-blur-md"
            style={{
              color: "var(--champagne, #D6B887)",
              borderColor: "rgba(214, 184, 135, 0.2)",
              backgroundColor: "rgba(214, 184, 135, 0.04)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            {timeStr || "00:00:00"}
          </span>
        </div>
      </header>

      {/* =====================================================
          MAIN HERO SECTION: REFINED LUXURY TYPOGRAPHY
      ===================================================== */}
      <main className="relative z-10 max-w-3xl mx-auto text-center px-4 my-auto w-full">
        {/* Logo Icon Badge */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6 sm:mb-8 backdrop-blur-md"
          style={{
            backgroundColor: "rgba(168, 182, 154, 0.05)",
            borderColor: "rgba(168, 182, 154, 0.18)",
          }}
        >
          <img
            src="/vibespace-logo-icon.png"
            alt="VibeSpace"
            className="w-3.5 h-3.5 object-contain"
            style={{
              filter:
                "drop-shadow(0 0 6px rgba(168, 182, 154, 0.35)) drop-shadow(0 0 12px rgba(214, 184, 135, 0.15))",
            }}
          />
          <span
            className="text-[8px] sm:text-[9px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: "var(--sage, #A8B69A)" }}
          >
            Spatial Sound Engine
          </span>
        </div>

        {/* Title */}
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

        {/* Description */}
        <p
          className="text-xs sm:text-sm font-light leading-relaxed max-w-sm sm:max-w-md mx-auto mb-8 sm:mb-11 opacity-60"
          style={{ color: "var(--text-muted, #94988B)" }}
        >
          Music, ambience, and atmosphere — shaped dynamically around where you are right now.
        </p>

        {/* Premium Enter Button with Live Waveform Icon */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold uppercase tracking-wider text-[10px] sm:text-xs transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, var(--sage, #A8B69A), var(--champagne, #D6B887))",
              color: "#151713",
              boxShadow: "0 10px 30px rgba(168, 182, 154, 0.22)",
            }}
          >
            {/* Ambient Idle Waveform */}
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-[#151713] rounded-full animate-pulse [animation-duration:0.6s]" />
              <span className="w-0.5 h-3 bg-[#151713] rounded-full animate-pulse [animation-duration:0.4s]" />
              <span className="w-0.5 h-1.5 bg-[#151713] rounded-full animate-pulse [animation-duration:0.8s]" />
            </div>

            <span className="font-semibold tracking-[0.16em]">
              Enter Experience
            </span>

            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </main>

      {/* =====================================================
          BOTTOM SPEC FOOTER: MINIMAL & CLEAN
      ===================================================== */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-mono text-[#6E7266]">
        <div>
          <span>LIVE ARCHITECTURE</span>
        </div>

        <div className="text-right">
          <span>96.0 KHZ // LOSSLESS</span>
        </div>
      </footer>
    </div>
  );
};

export default VibeIntro;