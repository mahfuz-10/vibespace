import React, { useEffect, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Moon,
  Music2,
  Sparkles,
  X,
} from "lucide-react";
import { useAudio } from "./AudioManager";

export const PersistentPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    nextTrack,
    prevTrack,
    currentTime,
    duration,
    seekTo,
    volume,
    setVolume,
  } = useAudio();

  const [showTimer, setShowTimer] = useState(false);
  const [timerMins, setTimerMins] = useState(null);

  /* =========================================================
     SLEEP TIMER
  ========================================================= */

  useEffect(() => {
    if (!timerMins) return;

    const timer = setTimeout(() => {
      if (isPlaying) {
        togglePlayPause();
      }

      setTimerMins(null);
    }, timerMins * 60 * 1000);

    return () => clearTimeout(timer);
  }, [timerMins, isPlaying, togglePlayPause]);

  /* =========================================================
     FORMAT TIME
  ========================================================= */

  const formatTime = (secs) => {
    if (!Number.isFinite(secs) || secs < 0) {
      return "0:00";
    }

    const mins = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);

    return `${mins}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  /* =========================================================
     SLIDER BACKGROUND
  ========================================================= */

  const getSliderBg = (value, max = 100) => {
    const safeMax = max > 0 ? max : 100;

    const pct = Math.max(
      0,
      Math.min(100, (value / safeMax) * 100)
    );

    return `linear-gradient(
      to right,
      var(--sage) ${pct}%,
      rgba(255,255,255,0.09) ${pct}%
    )`;
  };

  /* =========================================================
     EMPTY PLAYER
     ========================================================= */

  if (!currentTrack) {
    return (
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[720px] z-50">
        <div
          className="relative overflow-hidden rounded-2xl border backdrop-blur-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(32,35,30,0.97), rgba(19,21,18,0.98))",
            borderColor:
              "rgba(214,184,135,0.16)",
            boxShadow:
              "0 24px 70px rgba(0,0,0,0.45)",
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full blur-3xl pointer-events-none opacity-30"
            style={{
              background:
                "radial-gradient(circle, var(--champagne), transparent 70%)",
            }}
          />

          <div className="relative px-5 py-4 flex items-center justify-between gap-4">
            {/* Icon */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center border flex-shrink-0"
              style={{
                background:
                  "linear-gradient(145deg, rgba(168,182,154,0.10), rgba(214,184,135,0.08))",
                borderColor:
                  "rgba(255,255,255,0.07)",
              }}
            >
              <Music2
                size={17}
                style={{
                  color: "var(--champagne)",
                }}
              />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Sparkles
                  size={11}
                  style={{
                    color: "var(--sage)",
                  }}
                />

                <p
                  className="text-[10px] uppercase tracking-[0.16em] font-semibold"
                  style={{
                    color: "var(--text-primary)",
                  }}
                >
                  Your Atmosphere
                </p>
              </div>

              <p
                className="text-[9px] mt-1 opacity-45"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                Select a situation to begin your experience
              </p>
            </div>

            {/* Decorative status */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full border"
              style={{
                backgroundColor:
                  "rgba(168,182,154,0.05)",
                borderColor:
                  "rgba(168,182,154,0.10)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor:
                    "var(--sage)",
                }}
              />

              <span
                className="text-[8px] uppercase tracking-[0.14em]"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     PLAYER
  ========================================================= */

  return (
    <>
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] sm:w-[calc(100%-32px)] max-w-[820px] z-50">
        <div
          className="relative overflow-hidden rounded-2xl border backdrop-blur-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(31,34,29,0.97), rgba(17,19,16,0.98))",
            borderColor:
              "rgba(214,184,135,0.15)",
            boxShadow:
              "0 25px 80px rgba(0,0,0,0.48)",
          }}
        >
          {/* =================================================
              PREMIUM GLOW
          ================================================= */}

          <div
            className="absolute -top-24 left-1/3 w-72 h-40 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(circle, var(--champagne), transparent 70%)",
            }}
          />

          <div className="relative px-4 sm:px-5 py-3">
            <div className="flex items-center gap-4">
              {/* =================================================
                  ARTWORK
              ================================================= */}

              <div className="flex items-center gap-3 min-w-0 w-[170px] sm:w-[210px]">
                <div
                  className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 border"
                  style={{
                    borderColor:
                      "rgba(255,255,255,0.08)",
                    boxShadow:
                      isPlaying
                        ? "0 0 22px rgba(168,182,154,0.16)"
                        : "none",
                  }}
                >
                  {currentTrack.artwork ? (
                    <img
                      src={currentTrack.artwork}
                      alt=""
                      className={`w-full h-full object-cover ${
                        isPlaying
                          ? "vinyl-spinning"
                          : ""
                      }`}
                      style={{
                        animationPlayState:
                          isPlaying
                            ? "running"
                            : "paused",
                      }}
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background:
                          "rgba(255,255,255,0.04)",
                      }}
                    >
                      <Music2
                        size={17}
                        style={{
                          color:
                            "var(--champagne)",
                        }}
                      />
                    </div>
                  )}

                  {/* Playing glow */}
                  {isPlaying && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow:
                          "inset 0 0 18px rgba(168,182,154,0.18)",
                      }}
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <h4
                    className="text-[11px] font-medium truncate"
                    style={{
                      color:
                        "var(--text-primary)",
                    }}
                  >
                    {currentTrack.title}
                  </h4>

                  <p
                    className="text-[8px] mt-1 truncate opacity-45"
                    style={{
                      color:
                        "var(--text-muted)",
                    }}
                  >
                    {currentTrack.artist ||
                      "VibeSpace"}
                  </p>

                  <div className="flex items-center gap-1.5 mt-1.5">
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
                      className="text-[7px] uppercase tracking-[0.13em]"
                      style={{
                        color:
                          isPlaying
                            ? "var(--sage)"
                            : "var(--text-muted)",
                      }}
                    >
                      {isPlaying
                        ? "Playing"
                        : "Paused"}
                    </span>
                  </div>
                </div>
              </div>

              {/* =================================================
                  CENTER CONTROLS
              ================================================= */}

              <div className="flex flex-col items-center flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-1.5">
                  <button
                    type="button"
                    onClick={prevTrack}
                    className="opacity-45 hover:opacity-100 hover:scale-110 transition-all"
                    style={{
                      color:
                        "var(--text-primary)",
                    }}
                    aria-label="Previous track"
                  >
                    <SkipBack
                      size={13}
                      fill="currentColor"
                    />
                  </button>

                  <button
                    type="button"
                    onClick={togglePlayPause}
                    className="
                      w-9
                      h-9
                      rounded-full
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300
                      hover:scale-105
                      active:scale-95
                    "
                    style={{
                      backgroundColor:
                        "var(--sage)",
                      color: "#151713",
                      boxShadow: isPlaying
                        ? "0 0 24px rgba(168,182,154,0.20)"
                        : "0 5px 18px rgba(0,0,0,0.20)",
                    }}
                    aria-label={
                      isPlaying
                        ? "Pause"
                        : "Play"
                    }
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
                        className="ml-0.5"
                      />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={nextTrack}
                    className="opacity-45 hover:opacity-100 hover:scale-110 transition-all"
                    style={{
                      color:
                        "var(--text-primary)",
                    }}
                    aria-label="Next track"
                  >
                    <SkipForward
                      size={13}
                      fill="currentColor"
                    />
                  </button>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 w-full max-w-[330px]">
                  <span
                    className="text-[7px] font-mono opacity-40 w-7 text-right"
                    style={{
                      color:
                        "var(--text-muted)",
                    }}
                  >
                    {formatTime(currentTime)}
                  </span>

                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    step="0.1"
                    value={currentTime}
                    onChange={(e) =>
                      seekTo(
                        parseFloat(
                          e.target.value
                        )
                      )
                    }
                    className="w-full h-[3px] rounded-full appearance-none cursor-pointer studio-slider"
                    style={{
                      background:
                        getSliderBg(
                          currentTime,
                          duration || 100
                        ),
                    }}
                  />

                  <span
                    className="text-[7px] font-mono opacity-40 w-7"
                    style={{
                      color:
                        "var(--text-muted)",
                    }}
                  >
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* =================================================
                  RIGHT CONTROLS
              ================================================= */}

              <div className="hidden sm:flex items-center gap-4 w-[145px] justify-end">
                {/* Volume */}
                <div className="flex items-center gap-2">
                  <Volume2
                    size={12}
                    style={{
                      color:
                        "var(--text-muted)",
                    }}
                  />

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) =>
                      setVolume(
                        parseFloat(
                          e.target.value
                        )
                      )
                    }
                    className="w-16 h-[3px] rounded-full appearance-none cursor-pointer studio-slider"
                    style={{
                      background:
                        getSliderBg(
                          volume * 100,
                          100
                        ),
                    }}
                  />
                </div>

                {/* Timer */}
                <button
                  type="button"
                  onClick={() =>
                    setShowTimer(true)
                  }
                  className="w-7 h-7 rounded-lg flex items-center justify-center border transition-all hover:scale-105"
                  style={{
                    backgroundColor:
                      timerMins
                        ? "rgba(168,182,154,0.10)"
                        : "rgba(255,255,255,0.025)",
                    borderColor:
                      timerMins
                        ? "rgba(168,182,154,0.20)"
                        : "rgba(255,255,255,0.06)",
                    color:
                      timerMins
                        ? "var(--sage)"
                        : "var(--text-muted)",
                  }}
                  aria-label="Sleep timer"
                >
                  <Moon size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Active timer indicator */}
          {timerMins && (
            <div
              className="absolute top-1 right-4 text-[7px] uppercase tracking-[0.12em]"
              style={{
                color: "var(--sage)",
              }}
            >
              Sleep timer · {timerMins}m
            </div>
          )}
        </div>
      </div>

      {/* =======================================================
          SLEEP TIMER MODAL
      ======================================================= */}

      {showTimer && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          style={{
            backgroundColor:
              "rgba(5,6,5,0.58)",
            backdropFilter: "blur(12px)",
          }}
          onClick={() => setShowTimer(false)}
        >
          <div
            className="relative w-full max-w-[330px] rounded-3xl border p-6 shadow-2xl"
            style={{
              background:
                "linear-gradient(145deg, rgba(35,38,32,0.98), rgba(17,19,16,0.99))",
              borderColor:
                "rgba(214,184,135,0.16)",
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* Close */}
            <button
              type="button"
              onClick={() =>
                setShowTimer(false)
              }
              className="absolute top-4 right-4 opacity-40 hover:opacity-100 transition"
              style={{
                color:
                  "var(--text-primary)",
              }}
            >
              <X size={15} />
            </button>

            {/* Icon */}
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 border"
              style={{
                backgroundColor:
                  "rgba(168,182,154,0.07)",
                borderColor:
                  "rgba(168,182,154,0.12)",
              }}
            >
              <Moon
                size={18}
                style={{
                  color: "var(--champagne)",
                }}
              />
            </div>

            <h3
              className="text-base font-light"
              style={{
                color:
                  "var(--text-primary)",
              }}
            >
              Sleep Timer
            </h3>

            <p
              className="text-[10px] mt-1.5 mb-5 opacity-50 leading-relaxed"
              style={{
                color:
                  "var(--text-muted)",
              }}
            >
              Your atmosphere will gently stop
              after the selected time.
            </p>

            <div className="grid grid-cols-2 gap-2">
              {[30, 60, 90, 120].map(
                (mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => {
                      setTimerMins(mins);
                      setShowTimer(false);
                    }}
                    className="py-3 rounded-xl border text-[10px] transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor:
                        timerMins === mins
                          ? "rgba(168,182,154,0.10)"
                          : "rgba(255,255,255,0.025)",
                      borderColor:
                        timerMins === mins
                          ? "rgba(168,182,154,0.24)"
                          : "rgba(255,255,255,0.07)",
                      color:
                        timerMins === mins
                          ? "var(--sage)"
                          : "var(--text-primary)",
                    }}
                  >
                    {mins} minutes
                  </button>
                )
              )}
            </div>

            {timerMins && (
              <button
                type="button"
                onClick={() => {
                  setTimerMins(null);
                  setShowTimer(false);
                }}
                className="w-full mt-3 py-2.5 rounded-xl text-[9px] uppercase tracking-[0.14em] border"
                style={{
                  borderColor:
                    "rgba(255,255,255,0.06)",
                  color:
                    "var(--text-muted)",
                }}
              >
                Cancel Active Timer
              </button>
            )}

            {!timerMins && (
              <button
                type="button"
                onClick={() =>
                  setShowTimer(false)
                }
                className="w-full mt-4 text-[9px] opacity-40 hover:opacity-80 transition"
                style={{
                  color:
                    "var(--text-muted)",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PersistentPlayer;