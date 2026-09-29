import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/* =========================================================
   TOKENS (matched to the VibeSpace app)
========================================================= */
const C = {
  base: "#141512",
  ink: "#1A1915",
  ivory: "#F3EFE6",
  sage: "#A8B69A",
  champagne: "#D6B887",
  muted: "#94988B",
  dim: "#6E7266",
};

const RINGS = 7;

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const EQ = [
  { d: "0s", t: "0.9s" },
  { d: "0.15s", t: "0.7s" },
  { d: "0.3s", t: "1.1s" },
  { d: "0.08s", t: "0.8s" },
];

/* =========================================================
   SOUND FIELD  (canvas: concentric rings + orbiting sources)
   - rings shift with pointer / finger (spatial parallax)
   - idle drift when nobody is interacting
   - burstRef timestamp triggers the entrance ripple
========================================================= */
const SoundField = ({ burstRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let lastInput = 0;
    const ptr = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const easeOut = (x) => 1 - Math.pow(1 - x, 3);

    const draw = (now) => {
      const t = now / 1000;

      if (now - lastInput > 2500) {
        target.x = Math.sin(t * 0.23) * 0.4;
        target.y = Math.cos(t * 0.19) * 0.3;
      }
      ptr.x += (target.x - ptr.x) * 0.05;
      ptr.y += (target.y - ptr.y) * 0.05;

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h * 0.47;
      const base = Math.min(w, h);
      const rMin = base * 0.22;
      const rMax = base * 1.15;

      const bt = burstRef.current ? (now - burstRef.current) / 1500 : -1;
      const boost = bt >= 0 && bt <= 1 ? 1 - bt : 0;

      const geom = (i) => {
        const f = i / (RINGS - 1);
        return {
          f,
          r:
            rMin +
            (rMax - rMin) * Math.pow(f, 1.1) +
            Math.sin(t * 0.5 + i * 0.9) * (3 + i * 1.4),
          ox: -ptr.x * (4 + i * 5),
          oy: -ptr.y * (3 + i * 4),
        };
      };

      // rings
      ctx.lineWidth = 1;
      for (let i = 0; i < RINGS; i++) {
        const { f, r, ox, oy } = geom(i);
        const a =
          (0.05 + 0.11 * Math.pow(1 - f, 1.3)) * (1 + boost * 1.6);
        ctx.strokeStyle =
          i % 2 === 0
            ? `rgba(214,184,135,${a})`
            : `rgba(168,182,154,${a})`;
        ctx.beginPath();
        ctx.arc(cx + ox, cy + oy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // dashed slow ring
      ctx.save();
      ctx.setLineDash([1.5, 9]);
      ctx.lineDashOffset = -t * 8;
      ctx.strokeStyle = "rgba(243,239,230,0.14)";
      ctx.beginPath();
      ctx.arc(
        cx - ptr.x * 10,
        cy - ptr.y * 8,
        rMin + (rMax - rMin) * 0.42,
        0,
        Math.PI * 2
      );
      ctx.stroke();
      ctx.restore();

      // orbiting sound sources
      const orbiter = (idx, speed, phase, rgb) => {
        const { r, ox, oy } = geom(idx);
        const ang = t * speed + phase;
        const x = cx + ox + Math.cos(ang) * r;
        const y = cy + oy + Math.sin(ang) * r;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 16);
        g.addColorStop(0, `rgba(${rgb},0.55)`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${rgb},0.95)`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      };
      orbiter(2, 0.22, 0.6, "168,182,154");
      orbiter(4, -0.16, 2.4, "214,184,135");
      orbiter(5, 0.12, 4.1, "243,239,230");

      // entrance ripple
      if (boost > 0) {
        [0, 0.15].forEach((delay) => {
          const p = (bt - delay) / 0.85;
          if (p < 0 || p > 1) return;
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = `rgba(214,184,135,${(1 - p) * 0.5})`;
          ctx.beginPath();
          ctx.arc(cx, cy, rMin * 0.3 + rMax * 1.1 * easeOut(p), 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.lineWidth = 1;
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    };

    const onPointer = (e) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
      lastInput = performance.now();
    };

    const loop = (now) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!reduce && !raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [burstRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

/* =========================================================
   VIBE INTRO
========================================================= */
export const VibeIntro = ({ onEnter }) => {
  const [timeStr, setTimeStr] = useState("");
  const [isEntering, setIsEntering] = useState(false);

  const audioCtxRef = useRef(null);
  const enterTimerRef = useRef(null);
  const enteredRef = useRef(false);
  const burstRef = useRef(0);
  const magnetRef = useRef(null);

  /* ---------- live time ---------- */
  useEffect(() => {
    const tick = () =>
      setTimeStr(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ---------- magnetic button (desktop only) ---------- */
  const handleMagnetMove = (e) => {
    if (e.pointerType === "touch") return;
    const el = magnetRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate3d(${dx * 0.12}px, ${dy * 0.2}px, 0)`;
  };
  const handleMagnetLeave = () => {
    if (magnetRef.current)
      magnetRef.current.style.transform = "translate3d(0,0,0)";
  };

  /* ---------- entrance sound ----------
     soft sine stack, spread across the stereo field,
     lowpass sweep + echo tail + a small bell on top */
  const playEntranceChord = useCallback(async () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") await ctx.resume();

      const t0 = ctx.currentTime + 0.02;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, t0);
      master.gain.exponentialRampToValueAtTime(0.28, t0 + 0.22);
      master.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.3);

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(600, t0);
      lowpass.frequency.exponentialRampToValueAtTime(2600, t0 + 0.5);
      lowpass.frequency.exponentialRampToValueAtTime(900, t0 + 2.1);

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

      const voices = [
        { f: 108, pan: 0 },
        { f: 216, pan: -0.45 },
        { f: 432, pan: 0.45 },
        { f: 648, pan: -0.2 },
      ];

      voices.forEach((v, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(v.f, t0);
        osc.detune.setValueAtTime(idx % 2 === 0 ? -4 : 4, t0);
        g.gain.setValueAtTime(0.26 / (idx + 1), t0);
        osc.connect(g);

        if (ctx.createStereoPanner) {
          const p = ctx.createStereoPanner();
          p.pan.value = v.pan;
          g.connect(p);
          p.connect(master);
        } else {
          g.connect(master);
        }

        osc.start(t0);
        osc.stop(t0 + 2.4);
      });

      // small bell
      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bell.type = "sine";
      bell.frequency.setValueAtTime(864, t0);
      bellGain.gain.setValueAtTime(0.0001, t0 + 0.14);
      bellGain.gain.exponentialRampToValueAtTime(0.09, t0 + 0.17);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.9);
      bell.connect(bellGain);
      bellGain.connect(master);
      bell.start(t0 + 0.14);
      bell.stop(t0 + 2);
    } catch (e) {
      console.warn("AudioContext error:", e);
    }
  }, []);

  /* ---------- enter ---------- */
  const handleEnter = useCallback(() => {
    if (enteredRef.current) return;
    enteredRef.current = true;
    setIsEntering(true);
    burstRef.current = performance.now();

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(25);
    }

    // must run inside the tap/click so phones allow audio
    playEntranceChord();

    enterTimerRef.current = setTimeout(() => {
      if (typeof onEnter === "function") onEnter();
    }, 750);
  }, [onEnter, playEntranceChord]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" && !e.repeat) handleEnter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleEnter]);

  useEffect(() => {
    return () => {
      clearTimeout(enterTimerRef.current);
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state !== "closed") {
        setTimeout(() => ctx.close().catch(() => {}), 2500);
      }
    };
  }, []);

  const rise = (ms) => ({ animationDelay: `${ms}ms` });

  return (
    <div
      className={`vs-root fixed inset-0 z-[120] overflow-hidden select-none flex flex-col justify-between px-6 sm:px-12 transition-[opacity,transform] duration-700 ease-out ${
        isEntering
          ? "opacity-0 scale-[1.02] pointer-events-none"
          : "opacity-100"
      }`}
      style={{ backgroundColor: C.base, color: C.ivory }}
    >
      <style>{`
        @keyframes vs-rise {
          from { opacity: 0; transform: translate3d(0, 14px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes vs-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes vs-eq {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        @keyframes vs-shimmer {
          0% { transform: translateX(-160%) skewX(-18deg); }
          55%, 100% { transform: translateX(420%) skewX(-18deg); }
        }
        @keyframes vs-pulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
        .vs-root {
          padding-top: max(1.5rem, env(safe-area-inset-top, 0px));
          padding-bottom: max(1.5rem, env(safe-area-inset-bottom, 0px));
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        @media (min-width: 640px) {
          .vs-root {
            padding-top: max(2.25rem, env(safe-area-inset-top, 0px));
            padding-bottom: max(2.25rem, env(safe-area-inset-bottom, 0px));
          }
        }
        .vs-rise { opacity: 0; animation: vs-rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .vs-fade { opacity: 0; animation: vs-fade 1.6s ease forwards; }
        .vs-eq { transform-origin: center; animation: vs-eq ease-in-out infinite; }
        .vs-shimmer { animation: vs-shimmer 5s ease-in-out 2s infinite; }
        .vs-pulse { animation: vs-pulse 2.4s ease-in-out infinite; }
        .vs-btn:focus-visible { outline: 2px solid ${C.champagne}; outline-offset: 4px; }
        @media (prefers-reduced-motion: reduce) {
          .vs-rise, .vs-fade { animation-duration: 0.01ms; animation-delay: 0ms !important; }
          .vs-eq, .vs-shimmer, .vs-pulse { animation: none; }
        }
      `}</style>

      {/* ---------- BACKGROUND ---------- */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 42% at 50% 0%, rgba(214,184,135,0.10), transparent 70%),
            radial-gradient(ellipse 55% 42% at 50% 46%, rgba(214,184,135,0.085), transparent 72%),
            radial-gradient(ellipse 45% 40% at 12% 100%, rgba(168,182,154,0.06), transparent 70%)
          `,
        }}
      />

      <SoundField burstRef={burstRef} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 46%, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }}
      />

      {/* ---------- HEADER ---------- */}
      <header
        className="vs-fade relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between"
        style={rise(150)}
      >
        <div className="flex items-center gap-3">
          <img
            src="/vibespace-logo-icon.png"
            alt=""
            aria-hidden="true"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
            style={{ filter: "drop-shadow(0 0 10px rgba(214,184,135,0.28))" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="leading-none">
            <div className="text-[15px] sm:text-base font-light tracking-tight">
              Vibe
              <span className="italic" style={{ color: C.champagne }}>
                Space
              </span>
            </div>
            <div
              className="mt-1.5 text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.3em]"
              style={{ color: C.dim }}
            >
              Acoustic World
            </div>
          </div>
        </div>

        <div
          className="flex items-center gap-2 font-mono tabular-nums text-[10px] tracking-[0.18em]"
          style={{ color: C.muted }}
          aria-label="Local time"
        >
          <span
            className="vs-pulse w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: C.sage }}
          />
          {timeStr || "00:00:00"}
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <main className="relative z-10 max-w-2xl mx-auto text-center my-auto w-full">
        <div
          className="vs-rise inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-7 sm:mb-9"
          style={{
            ...rise(300),
            background: "rgba(243,239,230,0.03)",
            borderColor: "rgba(168,182,154,0.22)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <span
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: C.sage }}
          />
          <span
            className="text-[8px] sm:text-[9px] font-medium tracking-[0.22em] uppercase"
            style={{ color: C.sage }}
          >
            Spatial Architecture &amp; Sound Engine
          </span>
        </div>

        <h1
          className="text-[2.15rem] min-[400px]:text-[2.6rem] sm:text-6xl md:text-7xl font-extralight tracking-[-0.03em] leading-[1.06] mb-5 sm:mb-7"
          style={{ color: C.ivory }}
        >
          <span className="vs-rise block whitespace-nowrap" style={rise(480)}>
            Find the sound
          </span>
          <span
            className="vs-rise block whitespace-nowrap font-light italic pr-2"
            style={{
              ...rise(660),
              backgroundImage: `linear-gradient(100deg, #E8D3A8 0%, ${C.champagne} 45%, #C9A46B 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            for your moment.
          </span>
        </h1>

        <p
          className="vs-rise text-[13px] sm:text-[15px] font-light leading-relaxed max-w-md mx-auto mb-10 sm:mb-12"
          style={{ ...rise(850), color: C.muted }}
        >
          Music, ambience, and atmosphere — shaped dynamically around where you
          are right now.
        </p>

        {/* ---------- CTA ---------- */}
        <div
          className="vs-rise flex flex-col items-center"
          style={rise(1000)}
        >
          <div
            ref={magnetRef}
            onPointerMove={handleMagnetMove}
            onPointerLeave={handleMagnetLeave}
            className="transition-transform duration-300 ease-out p-5 -m-5"
          >
            <button
              type="button"
              onClick={handleEnter}
              aria-label="Enter experience"
              className="vs-btn group relative inline-flex items-center gap-4 pl-2.5 pr-6 sm:pr-7 py-2.5 rounded-full overflow-hidden text-[11px] sm:text-xs font-medium tracking-[0.16em] uppercase cursor-pointer transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                color: C.ink,
                background: C.ivory,
                boxShadow:
                  "0 0 0 1px rgba(214,184,135,0.55), 0 14px 44px rgba(214,184,135,0.22), 0 4px 16px rgba(0,0,0,0.5)",
              }}
            >
              <span
                aria-hidden="true"
                className="vs-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/4"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(214,184,135,0.45), transparent)",
                }}
              />

              <span
                aria-hidden="true"
                className="relative flex items-center justify-center w-9 h-9 rounded-full"
                style={{ background: C.ink }}
              >
                <span className="flex items-center gap-[2px] h-3.5">
                  {EQ.map((b, i) => (
                    <span
                      key={i}
                      className="vs-eq w-[2px] h-full rounded-full"
                      style={{
                        backgroundColor: C.champagne,
                        animationDelay: b.d,
                        animationDuration: b.t,
                      }}
                    />
                  ))}
                </span>
              </span>

              <span className="relative">Enter Experience</span>

              <ArrowUpRight
                size={15}
                strokeWidth={2}
                className="relative transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>

          <p
            className="mt-1 text-[11px] font-light tracking-wide"
            style={{ color: C.dim }}
          >
            Opens with sound. Headphones recommended.
          </p>
        </div>
      </main>

      {/* ---------- FOOTER ---------- */}
      <footer
        className="vs-fade relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-mono"
        style={{ ...rise(1300), color: C.dim }}
      >
        <span>Live Architecture</span>
        <span className="text-right">96.0 kHz // Lossless</span>
      </footer>
    </div>
  );
};

export default VibeIntro;