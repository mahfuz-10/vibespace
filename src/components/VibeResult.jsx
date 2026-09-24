import React, { useState } from "react";
import { useAudio } from "./AudioManager";
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
} from "lucide-react";

export const VibeResult = ({ onOpenStudio }) => {
  const {
    activity,
    feeling,
    environment,
    currentTrack,
    isPlaying,
    togglePlayPause,
    ambientLayers,
    saveVibe,
    setHasSubmittedSituation,
  } = useAudio();

  const [savedMessage, setSavedMessage] = useState(false);

  const [vibeName, setVibeName] = useState(
    `${environment} ${activity}`
  );

  /* =========================================================
     ACTIVE AMBIENT LAYERS
  ========================================================= */

  const activeLayers = (ambientLayers || []).filter(
    (layer) => layer.volume > 0 && !layer.isMuted
  );

  /* =========================================================
     BACK TO SITUATION BUILDER
  ========================================================= */

  const handleBack = () => {
    /*
      This changes the main application state
      back to Situation Builder.
    */
    setHasSubmittedSituation(false);
  };

  /* =========================================================
     SAVE VIBE
  ========================================================= */

  const handleSave = () => {
    if (!vibeName.trim()) return;

    saveVibe(vibeName.trim());

    setSavedMessage(true);

    setTimeout(() => {
      setSavedMessage(false);
    }, 2500);
  };

  return (
    <main className="min-h-screen px-5 sm:px-8 pt-24 pb-40 max-w-6xl mx-auto">

      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <div className="max-w-3xl mx-auto mb-8">
        <button
          type="button"
          onClick={handleBack}
          className="
            group
            inline-flex
            items-center
            gap-2
            px-3.5
            py-2
            rounded-full
            border
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:bg-white/[0.04]
          "
          style={{
            backgroundColor: "rgba(255,255,255,0.025)",
            borderColor: "rgba(255,255,255,0.08)",
            color: "var(--text-muted)",
          }}
        >
          <ArrowLeft
            size={14}
            className="
              transition-transform
              duration-300
              group-hover:-translate-x-0.5
            "
          />

          <span className="text-[10px] uppercase tracking-[0.16em] font-medium">
            Back to Situation Builder
          </span>
        </button>
      </div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative text-center max-w-3xl mx-auto mb-12">

        {/* Glow */}

        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2
            -top-20
            w-72
            h-72
            rounded-full
            blur-3xl
            pointer-events-none
            opacity-20
          "
          style={{
            background:
              "radial-gradient(circle, var(--sage), transparent 70%)",
          }}
        />

        {/* Status */}

        <div
          className="
            relative
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            border
            mb-6
          "
          style={{
            backgroundColor: "rgba(168,182,154,0.07)",
            borderColor: "rgba(168,182,154,0.22)",
          }}
        >
          <Sparkles
            size={13}
            style={{
              color: "var(--sage)",
            }}
          />

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.2em]
              font-semibold
            "
            style={{
              color: "var(--sage)",
            }}
          >
            Your atmosphere is ready
          </span>
        </div>

        {/* Main title */}

        <h1
          className="
            relative
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-light
            tracking-tight
            leading-tight
          "
          style={{
            color: "var(--text-primary)",
          }}
        >
          {environment}{" "}
          <em
            className="font-normal"
            style={{
              color: "var(--champagne)",
            }}
          >
            {activity}
          </em>
        </h1>

        {/* Description */}

        <p
          className="
            relative
            mt-5
            text-sm
            leading-relaxed
            opacity-60
            max-w-xl
            mx-auto
          "
          style={{
            color: "var(--text-muted)",
          }}
        >
          A carefully selected atmosphere for your{" "}
          <span
            className="font-medium"
            style={{
              color: "var(--text-primary)",
            }}
          >
            {feeling.toLowerCase()}
          </span>{" "}
          state.
        </p>
      </section>

      {/* =====================================================
          MAIN ATMOSPHERE CARD
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          backdrop-blur-xl
        "
        style={{
          background:
            "linear-gradient(145deg, rgba(38,40,34,0.94), rgba(22,24,20,0.97))",
          borderColor: "rgba(214,184,135,0.14)",
          boxShadow: "0 30px 90px rgba(0,0,0,0.35)",
        }}
      >

        {/* Top glow */}

        <div
          className="
            absolute
            -top-32
            right-0
            w-80
            h-80
            rounded-full
            blur-3xl
            opacity-10
            pointer-events-none
          "
          style={{
            backgroundColor: "var(--champagne)",
          }}
        />

        {/* =================================================
            CARD HEADER
        ================================================= */}

        <div className="relative p-6 sm:p-8 border-b border-white/5">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            {/* Information */}

            <div>

              <div className="flex items-center gap-2 mb-3">

                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    backgroundColor: "var(--sage)",
                  }}
                />

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    font-semibold
                  "
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  Active Atmosphere
                </span>

              </div>

              <h2
                className="text-2xl sm:text-3xl font-light"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                {environment}{" "}
                <span
                  className="italic"
                  style={{
                    color: "var(--champagne)",
                  }}
                >
                  {activity}
                </span>
              </h2>

              <p
                className="text-xs mt-2 opacity-50"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                {feeling} · {activeLayers.length} active atmosphere
                {activeLayers.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* =================================================
                PLAY BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={togglePlayPause}
              className="
                group
                flex
                items-center
                justify-center
                gap-3
                px-5
                py-3
                rounded-full
                border
                transition-all
                duration-300
                hover:scale-[1.02]
              "
              style={{
                backgroundColor: isPlaying
                  ? "rgba(168,182,154,0.14)"
                  : "rgba(255,255,255,0.04)",

                borderColor: isPlaying
                  ? "rgba(168,182,154,0.4)"
                  : "rgba(255,255,255,0.1)",
              }}
            >

              <span
                className="
                  w-8
                  h-8
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
                style={{
                  backgroundColor: "var(--sage)",
                  color: "#151713",
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
                className="
                  text-[10px]
                  uppercase
                  tracking-wider
                  font-semibold
                "
                style={{
                  color: "var(--text-primary)",
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

            {/* =================================================
                HERO MUSIC
            ================================================= */}

            <div
              className="rounded-2xl border p-5"
              style={{
                backgroundColor: "rgba(255,255,255,0.025)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >

              <div className="flex items-center gap-2 mb-5">

                <Music2
                  size={14}
                  style={{
                    color: "var(--champagne)",
                  }}
                />

                <span
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    font-semibold
                  "
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  Hero Music
                </span>
              </div>

              <div className="flex items-center gap-4">

                {/* Artwork */}

                <div
                  className="
                    w-16
                    h-16
                    sm:w-20
                    sm:h-20
                    rounded-2xl
                    overflow-hidden
                    flex-shrink-0
                  "
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
                          color: "var(--text-muted)",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Track information */}

                <div className="min-w-0 flex-1">

                  <h3
                    className="text-sm font-medium truncate"
                    style={{
                      color: "var(--text-primary)",
                    }}
                  >
                    {currentTrack?.title ||
                      "No track selected"}
                  </h3>

                  <p
                    className="
                      text-[10px]
                      mt-1
                      opacity-50
                      truncate
                    "
                    style={{
                      color: "var(--text-muted)",
                    }}
                  >
                    {currentTrack?.artist ||
                      "VibeSpace"}
                  </p>

                  <div className="flex items-center gap-2 mt-3">

                    <span
                      className={`
                        w-1.5
                        h-1.5
                        rounded-full
                        ${isPlaying ? "animate-pulse" : ""}
                      `}
                      style={{
                        backgroundColor: isPlaying
                          ? "var(--sage)"
                          : "rgba(255,255,255,0.25)",
                      }}
                    />

                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-wider
                      "
                      style={{
                        color: isPlaying
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

            {/* =================================================
                ACTIVE LAYERS
            ================================================= */}

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
                      color: "var(--champagne)",
                    }}
                  />

                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      font-semibold
                    "
                    style={{
                      color: "var(--text-muted)",
                    }}
                  >
                    Active Layers
                  </span>

                </div>

                <span
                  className="
                    text-[9px]
                    px-2
                    py-1
                    rounded-full
                  "
                  style={{
                    color: "var(--sage)",
                    backgroundColor:
                      "rgba(168,182,154,0.08)",
                  }}
                >
                  {activeLayers.length} active
                </span>

              </div>

              {activeLayers.length === 0 ? (

                <div
                  className="
                    min-h-[80px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                    rounded-xl
                    border
                    border-dashed
                  "
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
                    Add ambience from
                    Atmosphere Studio
                  </p>

                </div>

              ) : (

                <div className="space-y-2">

                  {activeLayers.map((layer) => (

                    <div
                      key={layer.id}
                      className="
                        flex
                        items-center
                        justify-between
                        px-3
                        py-2.5
                        rounded-xl
                      "
                      style={{
                        backgroundColor:
                          "rgba(255,255,255,0.035)",
                      }}
                    >

                      <div className="flex items-center gap-2.5">

                        <span
                          className="
                            w-1.5
                            h-1.5
                            rounded-full
                          "
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
                        className="
                          text-[9px]
                          font-mono
                          opacity-60
                        "
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

                  ))}

                </div>
              )}
            </div>
          </div>

          {/* =================================================
              STUDIO CTA
          ================================================= */}

          <div
            className="
              mt-6
              rounded-2xl
              border
              p-5
              flex
              flex-col
              sm:flex-row
              items-start
              sm:items-center
              justify-between
              gap-4
            "
            style={{
              background:
                "linear-gradient(120deg, rgba(168,182,154,0.07), rgba(214,184,135,0.04))",
              borderColor:
                "rgba(168,182,154,0.12)",
            }}
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-9
                  h-9
                  rounded-xl
                  flex
                  items-center
                  justify-center
                "
                style={{
                  backgroundColor:
                    "rgba(168,182,154,0.1)",
                }}
              >
                <SlidersHorizontal
                  size={15}
                  style={{
                    color: "var(--sage)",
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
                  className="
                    text-[9px]
                    mt-1
                    opacity-50
                  "
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
              className="
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                border
                text-[10px]
                uppercase
                tracking-wider
                font-semibold
                transition-all
                hover:scale-[1.02]
              "
              style={{
                borderColor:
                  "rgba(168,182,154,0.2)",
                backgroundColor:
                  "rgba(168,182,154,0.08)",
                color: "var(--sage)",
              }}
            >
              Atmosphere Studio
              <ArrowRight size={13} />
            </button>
          </div>

          {/* =================================================
              SAVE
          ================================================= */}

          <div className="mt-8 pt-6 border-t border-white/5">

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                value={vibeName}
                onChange={(e) =>
                  setVibeName(e.target.value)
                }
                placeholder="Name this vibe"
                aria-label="Vibe name"
                className="
                  flex-1
                  px-4
                  py-3
                  rounded-xl
                  border
                  outline-none
                  text-xs
                  transition-all
                "
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
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  text-[10px]
                  uppercase
                  tracking-wider
                  font-semibold
                  transition-all
                  hover:scale-[1.02]
                "
                style={{
                  backgroundColor:
                    "var(--sage)",
                  color: "#151713",
                }}
              >
                <BookmarkCheck size={14} />
                Save Vibe
              </button>

            </div>
          </div>
        </div>

        {/* =================================================
            SAVED MESSAGE
        ================================================= */}

        {savedMessage && (
          <div
            className="
              absolute
              bottom-5
              left-1/2
              -translate-x-1/2
              flex
              items-center
              gap-2
              px-4
              py-2.5
              rounded-full
              border
              backdrop-blur-xl
            "
            style={{
              backgroundColor:
                "rgba(168,182,154,0.12)",
              borderColor:
                "rgba(168,182,154,0.25)",
              color: "var(--sage)",
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