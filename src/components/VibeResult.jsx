import React, { useEffect, useState } from "react";
import {
  Play,
  Pause,
  BookmarkCheck,
  ArrowRight,
  ArrowLeft,
  Music2,
  Volume2,
  Sparkles,
  SlidersHorizontal,
  Waves,
} from "lucide-react";

import { useAudio } from "./AudioManager";

/* =========================================================
   ENVIRONMENT VISUALS
========================================================= */

const ENVIRONMENT_VISUALS = {
  "Rainy Window": {
    image:
      "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1800&q=90",
    glow: "rgba(125,160,155,0.32)",
  },

  "Coffee Shop": {
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1800&q=90",
    glow: "rgba(214,184,135,0.30)",
  },

  "Midnight City": {
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=90",
    glow: "rgba(116,130,170,0.32)",
  },

  "Forest Cabin": {
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90",
    glow: "rgba(135,160,125,0.32)",
  },

  Ocean: {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90",
    glow: "rgba(105,155,165,0.32)",
  },

  "Quiet Library": {
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1800&q=90",
    glow: "rgba(190,165,125,0.26)",
  },

  Fireplace: {
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1800&q=90",
    glow: "rgba(220,145,85,0.30)",
  },

  Rooftop: {
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=90",
    glow: "rgba(145,135,175,0.28)",
  },
};

/* =========================================================
   COMPONENT
========================================================= */

export const VibeResult = ({ onOpenStudio }) => {
  const {
    activity,
    feeling,
    environment,
    intensity,

    currentTrack,
    isPlaying,
    togglePlayPause,

    ambientLayers,
    saveVibe,
    setHasSubmittedSituation,

    isVibeRevealing,
    vibeRevealData,
  } = useAudio();

  const [savedMessage, setSavedMessage] =
    useState(false);

  const [vibeName, setVibeName] =
    useState(
      `${environment} ${activity}`
    );

  /* =======================================================
     KEEP SAVE NAME UPDATED
  ======================================================= */

  useEffect(() => {
    if (!vibeRevealData) return;

    setVibeName(
      `${vibeRevealData.environment} ${vibeRevealData.activity}`
    );
  }, [vibeRevealData]);

  /* =======================================================
     ACTIVE LAYERS
  ======================================================= */

  const activeLayers =
    (ambientLayers || []).filter(
      (layer) =>
        layer.volume > 0 &&
        !layer.isMuted
    );

  /* =======================================================
     VISUAL
  ======================================================= */

  const visual =
    ENVIRONMENT_VISUALS[
      environment
    ] ||
    ENVIRONMENT_VISUALS[
      "Rainy Window"
    ];

  /* =======================================================
     BACK
  ======================================================= */

  const handleBack = () => {
    setHasSubmittedSituation(false);
  };

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = () => {
    if (!vibeName.trim()) return;

    saveVibe(
      vibeName.trim()
    );

    setSavedMessage(true);

    setTimeout(() => {
      setSavedMessage(false);
    }, 2500);
  };

  /* =======================================================
     CINEMATIC REVEAL
  ======================================================= */

  if (
    isVibeRevealing &&
    vibeRevealData
  ) {
    const revealVisual =
      ENVIRONMENT_VISUALS[
        vibeRevealData.environment
      ] ||
      ENVIRONMENT_VISUALS[
        "Rainy Window"
      ];

    return (
      <main className="fixed inset-0 z-[100] overflow-hidden bg-[#141512]">
        {/* BACKGROUND IMAGE */}

        <div
          className="absolute inset-0 bg-cover bg-center animate-[vibeZoom_7s_ease-out_forwards]"
          style={{
            backgroundImage: `url("${revealVisual.image}")`,
          }}
        />

        {/* DARK CINEMATIC OVERLAY */}

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,11,9,0.40), rgba(10,11,9,0.72))",
          }}
        />

        {/* COLOR GLOW */}

        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-[120px] opacity-70 animate-pulse"
          style={{
            background:
              revealVisual.glow,
          }}
        />

        {/* GRAIN */}

        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
          }}
        />

        {/* CONTENT */}

        <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">

            {/* TOP LINE */}

            <div className="flex items-center justify-center gap-3 mb-8 animate-[vibeFadeUp_1s_ease-out]">
              <span className="w-10 h-px bg-white/25" />

              <span className="text-[10px] uppercase tracking-[0.35em] text-white/60">
                VibeSpace
              </span>

              <span className="w-10 h-px bg-white/25" />
            </div>

            {/* SPARKLE */}

            <div className="flex justify-center mb-8">
              <div className="w-14 h-14 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl flex items-center justify-center animate-[vibePulse_2s_ease-in-out_infinite]">
                <Sparkles
                  size={20}
                  className="text-white"
                />
              </div>
            </div>

            {/* MAIN MESSAGE */}

            <p className="text-[11px] uppercase tracking-[0.32em] text-white/60 mb-5 animate-[vibeFadeUp_1.2s_ease-out]">
              Your atmosphere is ready
            </p>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-light tracking-tight text-white leading-[0.95] animate-[vibeFadeUp_1.35s_ease-out]">
              {vibeRevealData.environment}
            </h1>

            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-light italic text-white/75 animate-[vibeFadeUp_1.5s_ease-out]">
              for {vibeRevealData.activity}
            </h2>

            {/* META */}

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-[vibeFadeUp_1.7s_ease-out]">
              <span className="px-4 py-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl text-[10px] uppercase tracking-[0.16em] text-white/70">
                {vibeRevealData.feeling}
              </span>

              <span className="px-4 py-2 rounded-full border border-white/15 bg-white/10 backdrop-blur-xl text-[10px] uppercase tracking-[0.16em] text-white/70">
                {vibeRevealData.intensity}
              </span>
            </div>

            {/* MUSIC */}

            <div className="mt-12 flex items-center justify-center gap-3 text-white/50 animate-[vibeFadeUp_2s_ease-out]">
              <Waves size={15} />

              <span className="text-[10px] uppercase tracking-[0.2em]">
                Entering your atmosphere
              </span>

              <div className="flex gap-1 items-end h-4">
                <span className="w-[2px] h-2 bg-white/50 animate-pulse" />
                <span className="w-[2px] h-4 bg-white/70 animate-pulse [animation-delay:150ms]" />
                <span className="w-[2px] h-3 bg-white/50 animate-pulse [animation-delay:300ms]" />
                <span className="w-[2px] h-2 bg-white/40 animate-pulse [animation-delay:450ms]" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}

        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
            Close your tabs. Find your space.
          </p>
        </div>

        <style>{`
          @keyframes vibeZoom {
            from {
              transform: scale(1.04);
              opacity: 0;
            }
            to {
              transform: scale(1.12);
              opacity: 1;
            }
          }

          @keyframes vibeFadeUp {
            from {
              opacity: 0;
              transform: translateY(22px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes vibePulse {
            0%,100% {
              transform: scale(1);
              box-shadow: 0 0 0 rgba(255,255,255,0);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 0 45px rgba(255,255,255,0.12);
            }
          }
        `}</style>
      </main>
    );
  }

  /* =======================================================
     NORMAL RESULT
  ======================================================= */

  return (
    <main className="min-h-screen px-5 sm:px-8 pt-24 pb-40 max-w-6xl mx-auto">

      {/* ===================================================
          BACKGROUND ATMOSPHERE
      =================================================== */}

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">

        <div
          className="absolute inset-0 opacity-[0.12] bg-cover bg-center"
          style={{
            backgroundImage: `url("${visual.image}")`,
          }}
        />

        <div className="absolute inset-0 bg-[#141512]/90" />

        <div
          className="absolute left-1/2 -translate-x-1/2 -top-40 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{
            background:
              visual.glow,
          }}
        />
      </div>

      {/* ===================================================
          BACK BUTTON
      =================================================== */}

      <div className="max-w-3xl mx-auto mb-8">

        <button
          type="button"
          onClick={handleBack}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all duration-300 hover:scale-[1.02] hover:bg-white/[0.04]"
          style={{
            backgroundColor:
              "rgba(255,255,255,0.025)",
            borderColor:
              "rgba(255,255,255,0.08)",
            color:
              "var(--text-muted)",
          }}
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />

          <span className="text-[10px] uppercase tracking-[0.16em] font-medium">
            Back to Situation Builder
          </span>
        </button>

      </div>

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="relative text-center max-w-3xl mx-auto mb-12">

        <div
          className="absolute left-1/2 -translate-x-1/2 -top-20 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{
            background:
              `radial-gradient(circle, ${visual.glow}, transparent 70%)`,
          }}
        />

        <div
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
          style={{
            backgroundColor:
              "rgba(168,182,154,0.07)",
            borderColor:
              "rgba(168,182,154,0.22)",
          }}
        >
          <Sparkles
            size={13}
            style={{
              color: "var(--sage)",
            }}
          />

          <span
            className="text-[10px] uppercase tracking-[0.2em] font-semibold"
            style={{
              color: "var(--sage)",
            }}
          >
            Your atmosphere is ready
          </span>
        </div>

        <h1
          className="relative text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-tight"
          style={{
            color:
              "var(--text-primary)",
          }}
        >
          {environment}{" "}
          <em
            className="font-normal"
            style={{
              color:
                "var(--champagne)",
            }}
          >
            {activity}
          </em>
        </h1>

        <p
          className="relative mt-5 text-sm leading-relaxed opacity-60 max-w-xl mx-auto"
          style={{
            color:
              "var(--text-muted)",
          }}
        >
          A carefully selected atmosphere for your{" "}
          <span
            className="font-medium"
            style={{
              color:
                "var(--text-primary)",
            }}
          >
            {feeling.toLowerCase()}
          </span>{" "}
          state.
        </p>

      </section>

      {/* ===================================================
          MAIN CARD
      =================================================== */}

      <section
        className="relative overflow-hidden rounded-[28px] border backdrop-blur-xl"
        style={{
          background:
            "linear-gradient(145deg, rgba(38,40,34,0.94), rgba(22,24,20,0.97))",
          borderColor:
            "rgba(214,184,135,0.14)",
          boxShadow:
            "0 30px 90px rgba(0,0,0,0.35)",
        }}
      >

        {/* ATMOSPHERE ARTWORK */}

        <div className="relative h-52 sm:h-64 overflow-hidden">

          <img
            src={visual.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-105 opacity-55"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#161812] via-[#161812]/40 to-transparent" />

          <div className="absolute bottom-6 left-6 sm:left-8">

            <p className="text-[9px] uppercase tracking-[0.25em] text-white/45 mb-2">
              Atmosphere
            </p>

            <h2 className="text-2xl sm:text-3xl font-light text-white">
              {environment}
            </h2>

          </div>

        </div>

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="relative p-6 sm:p-8 border-b border-white/5">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            <div>

              <div className="flex items-center gap-2 mb-3">

                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    backgroundColor:
                      "var(--sage)",
                  }}
                />

                <span
                  className="text-[9px] uppercase tracking-[0.2em] font-semibold"
                  style={{
                    color:
                      "var(--text-muted)",
                  }}
                >
                  Active Atmosphere
                </span>

              </div>

              <h2
                className="text-2xl sm:text-3xl font-light"
                style={{
                  color:
                    "var(--text-primary)",
                }}
              >
                {environment}{" "}
                <span
                  className="italic"
                  style={{
                    color:
                      "var(--champagne)",
                  }}
                >
                  {activity}
                </span>
              </h2>

              <p
                className="text-xs mt-2 opacity-50"
                style={{
                  color:
                    "var(--text-muted)",
                }}
              >
                {feeling} ·{" "}
                {intensity} ·{" "}
                {activeLayers.length} active
              </p>

            </div>

            {/* PLAY */}

            <button
              type="button"
              onClick={togglePlayPause}
              className="group flex items-center justify-center gap-3 px-5 py-3 rounded-full border transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor:
                  isPlaying
                    ? "rgba(168,182,154,0.14)"
                    : "rgba(255,255,255,0.04)",

                borderColor:
                  isPlaying
                    ? "rgba(168,182,154,0.4)"
                    : "rgba(255,255,255,0.1)",
              }}
            >

              <span
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor:
                    "var(--sage)",
                  color:
                    "#151713",
                }}
              >
                {isPlaying ? (
                  <Pause
                    size={14}
                    fill="currentColor"
                  />
                ) : (
                  <Play
                    size={14}
                    fill="currentColor"
                  />
                )}
              </span>

              <span
                className="text-[10px] uppercase tracking-wider font-semibold"
                style={{
                  color:
                    "var(--text-primary)",
                }}
              >
                {isPlaying
                  ? "Pause Experience"
                  : "Play Experience"}
              </span>

            </button>

          </div>

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="relative p-6 sm:p-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* HERO MUSIC */}

            <div
              className="rounded-2xl border p-5"
              style={{
                backgroundColor:
                  "rgba(255,255,255,0.025)",
                borderColor:
                  "rgba(255,255,255,0.06)",
              }}
            >

              <div className="flex items-center gap-2 mb-5">

                <Music2
                  size={14}
                  style={{
                    color:
                      "var(--champagne)",
                  }}
                />

                <span
                  className="text-[10px] uppercase tracking-[0.18em] font-semibold"
                  style={{
                    color:
                      "var(--text-muted)",
                  }}
                >
                  Hero Music
                </span>

              </div>

              <div className="flex items-center gap-4">

                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0"
                  style={{
                    backgroundColor:
                      "rgba(255,255,255,0.05)",
                  }}
                >
                  {currentTrack?.artwork ? (
                    <img
                      src={currentTrack.artwork}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Music2
                        size={24}
                        style={{
                          color:
                            "var(--text-muted)",
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">

                  <h3
                    className="text-sm font-medium truncate"
                    style={{
                      color:
                        "var(--text-primary)",
                    }}
                  >
                    {currentTrack?.title ||
                      "No track selected"}
                  </h3>

                  <p
                    className="text-[10px] mt-1 opacity-50 truncate"
                    style={{
                      color:
                        "var(--text-muted)",
                    }}
                  >
                    {currentTrack?.artist ||
                      "VibeSpace"}
                  </p>

                  <div className="flex items-center gap-2 mt-3">

                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isPlaying
                          ? "animate-pulse"
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          isPlaying
                            ? "var(--sage)"
                            : "rgba(255,255,255,0.25)",
                      }}
                    />

                    <span
                      className="text-[9px] uppercase tracking-wider"
                      style={{
                        color:
                          isPlaying
                            ? "var(--sage)"
                            : "var(--text-muted)",
                      }}
                    >
                      {isPlaying
                        ? "Playing"
                        : "Ready"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* ACTIVE LAYERS */}

            <div
              className="rounded-2xl border p-5"
              style={{
                backgroundColor:
                  "rgba(255,255,255,0.025)",
                borderColor:
                  "rgba(255,255,255,0.06)",
              }}
            >

              <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-2">

                  <Volume2
                    size={14}
                    style={{
                      color:
                        "var(--champagne)",
                    }}
                  />

                  <span
                    className="text-[10px] uppercase tracking-[0.18em] font-semibold"
                    style={{
                      color:
                        "var(--text-muted)",
                    }}
                  >
                    Active Layers
                  </span>

                </div>

                <span
                  className="text-[9px] px-2 py-1 rounded-full"
                  style={{
                    color:
                      "var(--sage)",
                    backgroundColor:
                      "rgba(168,182,154,0.08)",
                  }}
                >
                  {activeLayers.length} active
                </span>

              </div>

              {activeLayers.length === 0 ? (

                <div
                  className="min-h-[80px] flex flex-col items-center justify-center text-center rounded-xl border border-dashed"
                  style={{
                    borderColor:
                      "rgba(255,255,255,0.08)",
                  }}
                >

                  <Volume2
                    size={18}
                    className="mb-2 opacity-30"
                  />

                  <p
                    className="text-[10px] opacity-60"
                    style={{
                      color:
                        "var(--text-primary)",
                    }}
                  >
                    No ambient layers active
                  </p>

                  <p
                    className="text-[9px] mt-1 opacity-40"
                    style={{
                      color:
                        "var(--text-muted)",
                    }}
                  >
                    Add ambience from Atmosphere Studio
                  </p>

                </div>

              ) : (

                <div className="space-y-2">

                  {activeLayers.map(
                    (layer) => (
                      <div
                        key={layer.id}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl"
                        style={{
                          backgroundColor:
                            "rgba(255,255,255,0.035)",
                        }}
                      >

                        <div className="flex items-center gap-2.5">

                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor:
                                "var(--sage)",
                            }}
                          />

                          <span
                            className="text-[11px]"
                            style={{
                              color:
                                "var(--text-primary)",
                            }}
                          >
                            {layer.name}
                          </span>

                        </div>

                        <span
                          className="text-[9px] font-mono opacity-60"
                          style={{
                            color:
                              "var(--text-muted)",
                          }}
                        >
                          {Math.round(
                            layer.volume * 100
                          )}
                          %
                        </span>

                      </div>
                    )
                  )}

                </div>

              )}

            </div>

          </div>

          {/* STUDIO CTA */}

          <div
            className="mt-6 rounded-2xl border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            style={{
              background:
                "linear-gradient(120deg, rgba(168,182,154,0.07), rgba(214,184,135,0.04))",
              borderColor:
                "rgba(168,182,154,0.12)",
            }}
          >

            <div className="flex items-center gap-3">

              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor:
                    "rgba(168,182,154,0.1)",
                }}
              >
                <SlidersHorizontal
                  size={15}
                  style={{
                    color:
                      "var(--sage)",
                  }}
                />
              </div>

              <div>

                <h3
                  className="text-xs font-medium"
                  style={{
                    color:
                      "var(--text-primary)",
                  }}
                >
                  Fine-tune your atmosphere
                </h3>

                <p
                  className="text-[9px] mt-1 opacity-50"
                  style={{
                    color:
                      "var(--text-muted)",
                  }}
                >
                  Adjust rain, ocean, wind,
                  fireplace and other layers.
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={onOpenStudio}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[10px] uppercase tracking-wider font-semibold transition-all hover:scale-[1.02]"
              style={{
                borderColor:
                  "rgba(168,182,154,0.2)",
                backgroundColor:
                  "rgba(168,182,154,0.08)",
                color:
                  "var(--sage)",
              }}
            >
              Atmosphere Studio
              <ArrowRight size={13} />
            </button>

          </div>

          {/* SAVE */}

          <div className="mt-8 pt-6 border-t border-white/5">

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                value={vibeName}
                onChange={(e) =>
                  setVibeName(
                    e.target.value
                  )
                }
                placeholder="Name this vibe"
                aria-label="Vibe name"
                className="flex-1 px-4 py-3 rounded-xl border outline-none text-xs transition-all"
                style={{
                  backgroundColor:
                    "rgba(255,255,255,0.035)",
                  borderColor:
                    "rgba(255,255,255,0.08)",
                  color:
                    "var(--text-primary)",
                }}
              />

              <button
                type="button"
                onClick={handleSave}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-[10px] uppercase tracking-wider font-semibold transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor:
                    "var(--sage)",
                  color:
                    "#151713",
                }}
              >
                <BookmarkCheck size={14} />
                Save Vibe
              </button>

            </div>

          </div>

        </div>

        {/* SAVED MESSAGE */}

        {savedMessage && (
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-full border backdrop-blur-xl"
            style={{
              backgroundColor:
                "rgba(168,182,154,0.12)",
              borderColor:
                "rgba(168,182,154,0.25)",
              color:
                "var(--sage)",
            }}
          >
            <BookmarkCheck size={13} />

            <span className="text-[10px]">
              Vibe saved successfully.
            </span>
          </div>
        )}

      </section>
    </main>
  );
};

export default VibeResult;