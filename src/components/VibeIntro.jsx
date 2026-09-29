import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/* =========================================================
   DESIGN TOKENS
========================================================= */
const SAGE = "#A8B69A";
const CHAMPAGNE = "#D6B887";
const IVORY = "#F3EFE6";
const MUTED = "#94988B";
const BASE = "#141512";

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const EQ_BARS = [
  { delay: "0s", dur: "0.9s" },
  { delay: "0.15s", dur: "0.7s" },
  { delay: "0.3s", dur: "1.1s" },
  { delay: "0.05s", dur: "0.8s" },
];

export const VibeIntro = ({ onEnter }) => {
  const [timeStr, setTimeStr] = useState("");
  const [isEntering, setIsEntering] = useState(false);

  const containerRef = useRef(null);
  const spotRef = useRef(null);
  const magnetRef = useRef(null);
  const audioCtxRef = useRef(null);
  const enterTimerRef = useRef(null);
  const rafRef = useRef(0);
  const target = useRef({ x: 50, y: 42 });
  const current = useRef({ x: 50, y: 42 });

  /* =========================================================
     LIVE STUDIO TIME
  ========================================================= */
  useEffect(() => {
    const updateTime = () => {
      setTimeStr(
        new Date().toLocaleTimeString("en-US", {
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
     SMOOTH SPOTLIGHT (no React re-render per mouse move)
  ========================================================= */
  useEffect(() => {
    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.07;
      c.y += (t.y - c.y) * 0.07;
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(circle 620px at ${c.x}% ${c.y}%, rgba(214,184,135,0.09), rgba(168,182,154,0.035) 42%, transparent 75%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handlePointerMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    target.current = {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  };

  /* =========================================================
     MAGNETIC BUTTON
  ========================================================= */
  const handleMagnetMove = (e) => {
    if (e.pointerType === "touch") return;
    const el = magnetRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate3d(${dx * 0.12}px, ${dy * 0.2}px, 0)`;
  };
  const handleMagnetLeave = () => {
    if (magnetRef.current) magnetRef.current.style.transform = "translate3d(0,0,0)";
  };

  /* =========================================================
     SYNTHESIZED ENTRANCE CHORD (phone + desktop safe)
     soft sine stack -> lowpass -> subtle echo tail
  ========================================================= */
  const playEntranceChord = useCallback(async () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") await ctx.resume();

      const t0 = ctx.currentTime;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, t0);
      master.gain.exponentialRampToValueAtTime(0.26, t0 + 0.22);
      master.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.2);

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(600, t0);
      lowpass.frequency.exponentialRampToValueAtTime(2400, t0 + 0.5);
      lowpass.frequency.exponentialRampToValueAtTime(900, t0 + 2.0);

      // echo tail
      const delay = ctx.createDelay(1);
      delay.delayTime.value = 0.24;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.32;
      const wet = ctx.createGain();
      wet.gain.value = 0.28;

      master.connect(lowpass);
      lowpass.connect(ctx.destination);
      lowpass.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(wet);
      wet.connect(ctx.destination);

      const freqs = [108, 216, 432, 648];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, t0);
        osc.detune.setValueAtTime(idx % 2 === 0 ? -4 : 4, t0);
        g.gain.setValueAtTime(0.26 / (idx + 1), t0);
        osc.connect(g);
        g.connect(master);
        osc.start(t0);
        osc.stop(t0 + 2.3);
      });
    } catch (e) {
      console.warn("AudioContext error:", e);
    }
  }, []);

  /* =========================================================
     ENTRY TRIGGER
  ========================================================= */
  const handleEnter = useCallback(async () => {
    if (isEntering) return;
    setIsEntering(true);

    if (typeof window !== "undefined" && window.navigator?.vibrate) {
      window.navigator.vibrate(25);
    }

    playEntranceChord();

    enterTimerRef.current = setTimeout(() => {
      if (typeof onEnter === "function") onEnter();
    }, 650);
  }, [isEntering, onEnter, playEntranceChord]);

  // Enter key shortcut + cleanup
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" && !e.repeat) handleEnter();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [handleEnter]);

  useEffect(() => {
    return () => {
      clearTimeout(enterTimerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        // let the tail finish before releasing the audio device
        const ctx = audioCtxRef.current;
        setTimeout(() => ctx.close().catch(() => {}), 2500);
      }
    };
  }, []);

  /* =========================================================
     RENDER
  ========================================================= */
  const rise = (delay) => ({ animationDelay: `${delay}ms` });

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className={`fixed inset-0 z-[120] overflow-hidden select-none flex flex-col justify-between py-6 px-6 sm:py-9 sm:px-12 transition-all duration-700 ease-out ${
        isEntering
          ? "opacity-0 scale-[1.02] blur-md pointer-events-none"
          : "opacity-100"
      }`}
      style={{ backgroundColor: BASE, color: IVORY }}
    >
      <style>{`
        @keyframes vs-rise {
          from { opacity: 0; transform: translate3d(0, 16px, 0); filter: blur(8px); }
          to   { opacity: 1; transform: translate3d(0, 0, 0);    filter: blur(0); }
        }
        @keyframes vs-fade {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes vs-eq {
          0%, 100% { transform: scaleY(0.35); }
          50%      { transform: scaleY(1); }
        }
        @keyframes vs-shimmer {
          0%   { transform: translateX(-140%) skewX(-18deg); }
          60%, 100% { transform: translateX(340%) skewX(-18deg); }
        }
        @keyframes vs-breathe {
          0%, 100% { opacity: 0.22; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 0.34; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes vs-ring {
          0%   { transform: scale(0.9); opacity: 0.45; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        .vs-rise  { opacity: 0; animation: vs-rise 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .vs-fade  { opacity: 0; animation: vs-fade 1.6s ease forwards; }
        .vs-eq    { transform-origin: center; animation: vs-eq ease-in-out infinite; }
        .vs-shimmer { animation: vs-shimmer 4.2s ease-in-out 1.6s infinite; }
        .vs-breathe { animation: vs-breathe 9s ease-in-out infinite; }
        .vs-ring  { animation: vs-ring 3.2s ease-out infinite; }
        .vs-btn:focus-visible { outline: 2px solid ${CHAMPAGNE}; outline-offset: 4px; }
        @media (prefers-reduced-motion: reduce) {
          .vs-rise, .vs-fade { animation-duration: 0.01ms; animation-delay: 0ms !important; }
          .vs-eq, .vs-shimmer, .vs-breathe, .vs-ring { animation: none; }
        }
      `}</style>

      {/* ---------- BACKGROUND LAYERS ---------- */}
      <div
        className="absolute inset-x-0 -top-32 h-[440px] pointer-events-none opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(168,182,154,0.30), transparent 75%)",
        }}
      />

      <div ref={spotRef} className="absolute inset-0 pointer-events-none" />

      <div
        className="vs-breathe absolute left-1/2 top-1/2 w-[440px] sm:w-[680px] h-[400px] pointer-events-none rounded-full blur-[140px]"
        style={{ background: "rgba(214,184,135,0.35)", transform: "translate(-50%, -50%)" }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 45%, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* film grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }}
      />

      {/* ---------- HEADER ---------- */}
      <header
        className="vs-fade relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between"
        style={rise(200)}
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex w-1.5 h-1.5">
            <span
              className="vs-ring absolute inset-0 rounded-full"
              style={{ backgroundColor: SAGE }}
            />
            <span
              className="relative w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: SAGE }}
            />
          </span>
          <span
            className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.24em]"
            style={{ color: SAGE }}
          >
            Acoustic World
          </span>
        </div>

        <span
          className="font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.2em] px-3 py-1 rounded-full border backdrop-blur-md tabular-nums"
          style={{
            color: CHAMPAGNE,
            borderColor: "rgba(214,184,135,0.22)",
            backgroundColor: "rgba(214,184,135,0.045)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
          aria-label="Local time"
        >
          {timeStr || "00:00:00"}
        </span>
      </header>

      {/* ---------- HERO ---------- */}
      <main className="relative z-10 max-w-2xl mx-auto text-center px-4 my-auto w-full">
        <div
          className="vs-rise inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-7 sm:mb-9 backdrop-blur-md"
          style={{
            ...rise(350),
            backgroundColor: "rgba(168,182,154,0.05)",
            borderColor: "rgba(168,182,154,0.2)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <img
            src="/vibespace-logo-icon.png"
            alt=""
            aria-hidden="true"
            className="w-3.5 h-3.5 object-contain"
            style={{
              filter:
                "drop-shadow(0 0 6px rgba(168,182,154,0.4)) drop-shadow(0 0 12px rgba(214,184,135,0.18))",
            }}
          />
          <span
            className="text-[8px] sm:text-[9px] font-semibold tracking-[0.24em] uppercase"
            style={{ color: SAGE }}
          >
            Spatial Sound Engine
          </span>
        </div>

        <h1
          className="text-[2.6rem] sm:text-6xl md:text-7xl font-extralight tracking-[-0.03em] leading-[1.06] mb-5 sm:mb-7"
          style={{ color: IVORY }}
        >
          <span className="vs-rise block" style={rise(500)}>
            Find the sound
          </span>
          <span
            className="vs-rise block font-light italic pr-2"
            style={{
              ...rise(680),
              backgroundImage: `linear-gradient(100deg, #E8D3A8 0%, ${CHAMPAGNE} 45%, #C9A46B 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 28px rgba(214,184,135,0.18))",
            }}
          >
            for your moment.
          </span>
        </h1>

        <p
          className="vs-rise text-xs sm:text-[15px] font-light leading-relaxed max-w-md mx-auto mb-9 sm:mb-11"
          style={{ ...rise(880), color: MUTED }}
        >
          Music, ambience, and atmosphere — shaped dynamically around where you are right now.
        </p>

        {/* ---------- CTA ---------- */}
        <div className="vs-rise flex justify-center" style={rise(1050)}>
          <div
            ref={magnetRef}
            onPointerMove={handleMagnetMove}
            onPointerLeave={handleMagnetLeave}
            className="transition-transform duration-300 ease-out p-4 -m-4"
          >
            <button
              type="button"
              onClick={handleEnter}
              aria-label="Enter experience"
              className="vs-btn group relative inline-flex items-center gap-3.5 pl-7 pr-7 sm:pl-9 sm:pr-9 py-3.5 sm:py-4 rounded-full overflow-hidden font-semibold uppercase tracking-[0.2em] text-[10px] sm:text-[11px] transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] cursor-pointer"
              style={{
                color: "#1A1B16",
                backgroundImage: `linear-gradient(105deg, ${SAGE} 0%, #C4C08F 52%, ${CHAMPAGNE} 100%)`,
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.16) inset, 0 1px 0 rgba(255,255,255,0.45) inset, 0 12px 40px rgba(214,184,135,0.28), 0 4px 14px rgba(0,0,0,0.5)",
              }}
            >
              {/* shimmer sweep */}
              <span
                aria-hidden="true"
                className="vs-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                }}
              />

              {/* equalizer */}
              <span className="relative flex items-center gap-[2px] h-3.5" aria-hidden="true">
                {EQ_BARS.map((b, i) => (
                  <span
                    key={i}
                    className="vs-eq w-[2px] h-full rounded-full"
                    style={{
                      backgroundColor: "#1A1B16",
                      animationDelay: b.delay,
                      animationDuration: b.dur,
                    }}
                  />
                ))}
              </span>

              <span className="relative">Enter Experience</span>

              <ArrowUpRight
                size={14}
                strokeWidth={2.4}
                className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>

        <p
          className="vs-fade mt-6 hidden sm:block text-[9px] tracking-[0.2em] uppercase font-mono"
          style={{ ...rise(1500), color: "#6E7266" }}
        >
          Headphones recommended
        </p>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer
        className="vs-fade relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-mono"
        style={{ ...rise(1300), color: "#6E7266" }}
      >
        <span>Live Architecture</span>
        <span className="text-right">96.0 kHz // Lossless</span>
      </footer>
    </div>
  );
};

export default VibeIntro;
