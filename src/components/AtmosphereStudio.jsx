import React from "react";
import { useAudio, MUSIC_DATABASE } from "./AudioManager";

import {
  Volume2,
  VolumeX,
  CloudRain,
  Coffee,
  Flame,
  Wind,
  Waves,
  Trees,
  Bird,
  CloudLightning,
  Car,
  Radio,
  Sliders,
  Sparkles,
} from "lucide-react";

import { LiveMixBar } from "./LiveMixBar";
import PresetMixes from "./PresetMixes";

/* =========================================================
   AMBIENCE ICONS
========================================================= */

const AMBIENCE_ICONS = {
  rain: CloudRain,
  coffee: Coffee,
  fireplace: Flame,
  wind: Wind,
  ocean: Waves,
  forest: Trees,
  birds: Bird,
  thunder: CloudLightning,
  city: Car,
};

/* =========================================================
   COMPONENT
========================================================= */

export const AtmosphereStudio = () => {
  const {
    currentTrack,
    playTrack,
    isPlaying,

    ambientLayers,
    setAmbientVolume,
    toggleAmbientMute,

    masterVolume,
    setMasterVolume,
  } = useAudio();

  /* =======================================================
     SLIDER BACKGROUND
  ======================================================= */

  const getSliderBackground = (value, max = 1) => {
    const percentage = Math.min(
      100,
      Math.max(0, (value / max) * 100)
    );

    return `linear-gradient(
      to right,
      var(--sage) 0%,
      var(--sage) ${percentage}%,
      rgba(244,240,230,0.10) ${percentage}%,
      rgba(244,240,230,0.10) 100%
    )`;
  };

  /* =======================================================
     AMBIENCE ANIMATION
  ======================================================= */

  const getAnimationClass = (id) => {
    switch (id) {
      case "rain":
        return "anim-rain";

      case "fireplace":
        return "anim-fire";

      case "wind":
        return "anim-wind";

      case "ocean":
        return "anim-waves";

      default:
        return "";
    }
  };

  /* =======================================================
     ACTIVE LAYERS
  ======================================================= */

  const activeLayerCount = (ambientLayers || []).filter(
    (layer) => layer.volume > 0 && !layer.isMuted
  ).length;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main
      className="
        relative
        w-full
        max-w-7xl
        mx-auto

        px-4
        sm:px-6
        lg:px-8

        pt-3
        sm:pt-20
        lg:pt-28

        pb-28
        sm:pb-36
        lg:pb-44

        animate-fade-up
      "
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Main radial glow */}
        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2

            -top-48

            w-[520px]
            sm:w-[700px]

            h-[520px]
            sm:h-[700px]

            rounded-full
            blur-[130px]

            opacity-[0.10]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(168,182,154,0.8), transparent 68%)",
          }}
        />

        {/* Champagne glow */}
        <div
          className="
            absolute
            right-[-180px]
            top-[35%]

            w-[400px]
            h-[400px]

            rounded-full
            blur-[130px]

            opacity-[0.06]
          "
          style={{
            background:
              "radial-gradient(circle, rgba(214,184,135,0.8), transparent 70%)",
          }}
        />
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          relative

          text-center
          max-w-2xl
          mx-auto

          mb-7
          sm:mb-12
          lg:mb-14

          px-1
        "
      >
        {/* Header glow */}
        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2

            -top-12

            w-64
            sm:w-96

            h-44
            sm:h-56

            rounded-full
            blur-[80px]

            pointer-events-none
          "
          style={{
            background:
              "radial-gradient(circle, rgba(168,182,154,0.12), transparent 70%)",
          }}
        />

        {/* Badge */}

        <div
          className="
            relative

            inline-flex
            items-center
            justify-center
            gap-2

            px-3
            sm:px-4

            py-1.5
            sm:py-2

            rounded-full

            border

            mb-3
            sm:mb-5

            backdrop-blur-xl
          "
          style={{
            background:
              "linear-gradient(120deg, rgba(168,182,154,0.07), rgba(214,184,135,0.035))",
            borderColor: "rgba(168,182,154,0.18)",
          }}
        >
          <img
            src="/vibespace-logo-icon.png"
            alt="VibeSpace"
            className="
              w-3
              h-3
              sm:w-3.5
              sm:h-3.5

              object-contain
            "
            style={{
              filter:
                "drop-shadow(0 0 6px rgba(168,182,154,0.35))",
            }}
          />

          <span
            className="
              text-[7px]
              xs:text-[8px]
              sm:text-[9px]

              uppercase
              tracking-[0.18em]
              sm:tracking-[0.22em]

              font-semibold
              whitespace-nowrap
            "
            style={{
              color: "var(--sage)",
            }}
          >
            Spatial Acoustic Laboratory
          </span>
        </div>

        {/* Title */}

        <h1
          className="
            relative

            text-[29px]
            xs:text-[32px]

            sm:text-5xl
            lg:text-[54px]

            leading-[0.98]

            font-light
            tracking-[-0.035em]

            mb-3
            sm:mb-5
          "
          style={{
            color: "var(--text-primary)",
          }}
        >
          Atmosphere{" "}
          <span
            className="italic font-normal"
            style={{
              color: "var(--champagne)",
            }}
          >
            Studio
          </span>
        </h1>

        {/* Description */}

        <p
          className="
            relative

            max-w-[310px]
            sm:max-w-lg

            mx-auto

            text-[10px]
            sm:text-xs

            leading-[1.65]
          "
          style={{
            color: "var(--text-muted)",
            opacity: 0.68,
          }}
        >
          Shape your soundscape with independent control over music,
          ambience, and the space between them.
        </p>

        {/* Active layers indicator */}

        <div
          className="
            relative

            mt-4
            sm:mt-6

            inline-flex
            items-center
            gap-2

            text-[8px]
            sm:text-[9px]

            uppercase
            tracking-[0.16em]
          "
          style={{
            color: "var(--text-muted)",
          }}
        >
          <span
            className="
              w-1.5
              h-1.5

              rounded-full

              animate-pulse
            "
            style={{
              backgroundColor:
                activeLayerCount > 0
                  ? "var(--sage)"
                  : "rgba(255,255,255,0.25)",
            }}
          />

          {activeLayerCount} active layer
          {activeLayerCount !== 1 ? "s" : ""}
        </div>
      </header>

      {/* =====================================================
          MASTER + LIVE MIX
      ===================================================== */}

      <section
        className="
          grid
          grid-cols-1
          lg:grid-cols-12

          gap-3
          sm:gap-5
          lg:gap-6

          mb-8
          sm:mb-11
        "
      >
        {/* MASTER VOLUME */}

        <div
          className="
            relative
            overflow-hidden

            lg:col-span-5

            p-4
            sm:p-6

            rounded-[22px]
            sm:rounded-[26px]

            border

            backdrop-blur-xl

            transition-all
            duration-500

            hover:-translate-y-0.5
          "
          style={{
            background:
              "linear-gradient(145deg, rgba(42,45,38,0.88), rgba(24,26,22,0.94))",

            borderColor:
              "rgba(214,184,135,0.16)",

            boxShadow:
              "0 24px 70px rgba(0,0,0,0.28)",
          }}
        >
          {/* Decorative glow */}

          <div
            className="
              absolute
              -right-24
              -top-24

              w-48
              h-48

              rounded-full
              blur-[80px]

              pointer-events-none
            "
            style={{
              background:
                "rgba(214,184,135,0.09)",
            }}
          />

          <div
            className="
              relative

              flex
              items-center
              justify-between

              gap-3

              mb-6
            "
          >
            {/* Icon + title */}

            <div
              className="
                flex
                items-center
                gap-3

                min-w-0
              "
            >
              <div
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10

                  rounded-xl

                  flex
                  items-center
                  justify-center

                  border

                  flex-shrink-0
                "
                style={{
                  backgroundColor:
                    "rgba(168,182,154,0.08)",

                  borderColor:
                    "rgba(168,182,154,0.17)",
                }}
              >
                <Volume2
                  size={16}
                  style={{
                    color: "var(--sage)",
                  }}
                />
              </div>

              <div className="min-w-0">
                <h2
                  className="
                    text-[10px]
                    sm:text-xs

                    font-medium
                    tracking-tight
                  "
                  style={{
                    color:
                      "var(--text-primary)",
                  }}
                >
                  Master Output
                </h2>

                <p
                  className="
                    mt-0.5

                    text-[8px]
                    sm:text-[9px]
                  "
                  style={{
                    color:
                      "var(--text-muted)",
                    opacity: 0.55,
                  }}
                >
                  Overall experience volume
                </p>
              </div>
            </div>

            {/* Percentage */}

            <span
              className="
                px-2.5
                py-1.5

                rounded-lg

                text-[9px]
                sm:text-[10px]

                font-mono
                font-semibold

                flex-shrink-0
              "
              style={{
                color: "var(--champagne)",
                backgroundColor:
                  "rgba(214,184,135,0.08)",
              }}
            >
              {Math.round(masterVolume * 100)}%
            </span>
          </div>

          {/* Slider */}

          <div className="relative">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={masterVolume}
              onChange={(e) =>
                setMasterVolume(
                  parseFloat(e.target.value)
                )
              }
              aria-label="Master volume"
              className="
                w-full

                h-1.5
                sm:h-2

                rounded-full

                appearance-none

                cursor-pointer

                studio-slider
              "
              style={{
                background:
                  getSliderBackground(
                    masterVolume
                  ),

                accentColor:
                  "var(--sage)",
              }}
            />
          </div>

          <div
            className="
              flex
              justify-between

              mt-2.5

              text-[7px]
              sm:text-[8px]

              uppercase
              tracking-[0.14em]
            "
            style={{
              color: "var(--text-muted)",
              opacity: 0.35,
            }}
          >
            <span>Silent</span>
            <span>Full</span>
          </div>
        </div>

        {/* LIVE MIX */}

        <div
          className="
            lg:col-span-7

            min-w-0
          "
        >
          <LiveMixBar
            activeLayers={ambientLayers}
          />
        </div>
      </section>

      {/* =====================================================
          PRESET MIXES
      ===================================================== */}

      <section className="mb-8 sm:mb-12">
        <PresetMixes
          ambientLayers={ambientLayers}
          setAmbientVolume={
            setAmbientVolume
          }
        />
      </section>

      {/* =====================================================
          MAIN STUDIO
      ===================================================== */}

      <div className="space-y-7 sm:space-y-10 lg:space-y-12">

        {/* ===================================================
            HERO TRACK
        =================================================== */}

        <section
          className="
            relative
            overflow-hidden

            p-4
            sm:p-6
            lg:p-8

            rounded-[24px]
            sm:rounded-[28px]

            border

            backdrop-blur-xl
          "
          style={{
            background:
              "linear-gradient(160deg, rgba(38,41,35,0.82), rgba(22,24,20,0.92))",

            borderColor:
              "rgba(244,240,230,0.075)",

            boxShadow:
              "0 25px 70px rgba(0,0,0,0.25)",
          }}
        >
          {/* Section glow */}

          <div
            className="
              absolute
              -right-32
              -top-32

              w-72
              h-72

              rounded-full
              blur-[100px]

              opacity-30

              pointer-events-none
            "
            style={{
              background:
                "rgba(214,184,135,0.12)",
            }}
          />

          {/* Header */}

          <div
            className="
              relative

              flex
              flex-col

              sm:flex-row
              sm:items-center
              sm:justify-between

              gap-3

              mb-5
              sm:mb-7

              pb-4
              sm:pb-5

              border-b
              border-white/5
            "
          >
            <div
              className="
                flex
                items-center
                gap-2.5
              "
            >
              <div
                className="
                  w-8
                  h-8

                  rounded-xl

                  flex
                  items-center
                  justify-center
                "
                style={{
                  backgroundColor:
                    "rgba(214,184,135,0.07)",
                }}
              >
                <Radio
                  size={14}
                  style={{
                    color:
                      "var(--champagne)",
                  }}
                />
              </div>

              <div>
                <h2
                  className="
                    text-[10px]
                    sm:text-xs

                    uppercase
                    tracking-[0.16em]

                    font-semibold
                  "
                  style={{
                    color:
                      "var(--text-primary)",
                  }}
                >
                  Hero Track Selection
                </h2>

                <p
                  className="
                    hidden
                    sm:block

                    mt-1

                    text-[8px]
                  "
                  style={{
                    color:
                      "var(--text-muted)",
                    opacity: 0.45,
                  }}
                >
                  Choose the musical center of your atmosphere
                </p>
              </div>
            </div>

            <span
              className="
                self-start
                sm:self-auto

                px-2.5
                py-1.5

                rounded-lg

                border

                text-[8px]
                sm:text-[9px]

                font-mono
              "
              style={{
                color:
                  "var(--text-muted)",

                borderColor:
                  "rgba(244,240,230,0.08)",

                backgroundColor:
                  "rgba(255,255,255,0.02)",
              }}
            >
              {MUSIC_DATABASE.length} tracks
            </span>
          </div>

          {/* Tracks */}

          <div
            className="
              relative

              grid

              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3

              gap-2.5
              sm:gap-3.5
            "
          >
            {MUSIC_DATABASE.map(
              (track) => {
                const isCurrent =
                  currentTrack?.id ===
                  track.id;

                const isPlayingCurrent =
                  isCurrent && isPlaying;

                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() =>
                      playTrack(track)
                    }
                    className="
                      w-full
                      text-left

                      p-2.5
                      sm:p-3.5

                      rounded-xl
                      sm:rounded-2xl

                      border

                      cursor-pointer

                      flex
                      items-center

                      gap-3
                      sm:gap-3.5

                      transition-all
                      duration-300

                      group

                      active:scale-[0.985]
                      hover:-translate-y-0.5
                    "
                    style={{
                      backgroundColor:
                        isCurrent
                          ? "rgba(168,182,154,0.075)"
                          : "rgba(255,255,255,0.018)",

                      borderColor:
                        isCurrent
                          ? "rgba(168,182,154,0.38)"
                          : "rgba(244,240,230,0.065)",

                      boxShadow:
                        isCurrent
                          ? "0 12px 35px rgba(168,182,154,0.09)"
                          : "none",
                    }}
                  >
                    {/* Artwork */}

                    <div
                      className="
                        relative
                        overflow-hidden

                        w-11
                        h-11

                        sm:w-13
                        sm:h-13

                        flex-shrink-0

                        shadow-lg

                        transition-all
                        duration-500
                      "
                      style={{
                        width:
                          undefined,
                        borderRadius:
                          isPlayingCurrent
                            ? "50%"
                            : "11px",
                      }}
                    >
                      <img
                        src={track.artwork}
                        alt=""
                        className={`
                          w-full
                          h-full
                          object-cover

                          transition-transform
                          duration-500

                          group-hover:scale-110

                          ${
                            isPlayingCurrent
                              ? "vinyl-spinning"
                              : ""
                          }
                        `}
                        style={{
                          animationPlayState:
                            isPlayingCurrent
                              ? "running"
                              : "paused",
                        }}
                      />

                      {/* Current overlay */}

                      {isCurrent && (
                        <div
                          className="
                            absolute
                            inset-0

                            flex
                            items-center
                            justify-center

                            bg-black/15
                          "
                        >
                          <div
                            className="
                              w-1.5
                              h-1.5

                              rounded-full
                            "
                            style={{
                              backgroundColor:
                                "var(--sage)",
                              boxShadow:
                                "0 0 10px rgba(168,182,154,0.8)",
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Info */}

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >
                      <h3
                        className="
                          text-[10px]
                          sm:text-xs

                          truncate

                          font-medium
                        "
                        style={{
                          color:
                            isCurrent
                              ? "var(--sage)"
                              : "var(--text-primary)",
                        }}
                      >
                        {track.title}
                      </h3>

                      <p
                        className="
                          mt-1

                          text-[8px]
                          sm:text-[9px]

                          truncate
                        "
                        style={{
                          color:
                            "var(--text-muted)",
                          opacity: 0.55,
                        }}
                      >
                        {track.artist}
                      </p>
                    </div>

                    {/* Playing bars */}

                    {isPlayingCurrent && (
                      <div
                        className="
                          flex
                          items-end
                          gap-[2px]

                          h-4

                          flex-shrink-0
                        "
                      >
                        <span
                          className="
                            w-[2px]
                            h-2

                            rounded-full
                            animate-pulse
                          "
                          style={{
                            backgroundColor:
                              "var(--sage)",
                            animationDuration:
                              "0.55s",
                          }}
                        />

                        <span
                          className="
                            w-[2px]
                            h-4

                            rounded-full
                            animate-pulse
                          "
                          style={{
                            backgroundColor:
                              "var(--sage)",
                            animationDuration:
                              "0.35s",
                          }}
                        />

                        <span
                          className="
                            w-[2px]
                            h-3

                            rounded-full
                            animate-pulse
                          "
                          style={{
                            backgroundColor:
                              "var(--sage)",
                            animationDuration:
                              "0.45s",
                          }}
                        />
                      </div>
                    )}
                  </button>
                );
              }
            )}
          </div>
        </section>

        {/* ===================================================
            AMBIENCE SOUNDSCAPES
        =================================================== */}

        <section
          className="
            relative
            overflow-hidden

            p-4
            sm:p-6
            lg:p-8

            rounded-[24px]
            sm:rounded-[28px]

            border

            backdrop-blur-xl
          "
          style={{
            background:
              "linear-gradient(160deg, rgba(38,41,35,0.82), rgba(22,24,20,0.92))",

            borderColor:
              "rgba(244,240,230,0.075)",

            boxShadow:
              "0 25px 70px rgba(0,0,0,0.25)",
          }}
        >
          {/* Section glow */}

          <div
            className="
              absolute
              -left-32
              -top-32

              w-72
              h-72

              rounded-full
              blur-[100px]

              opacity-25

              pointer-events-none
            "
            style={{
              background:
                "rgba(168,182,154,0.11)",
            }}
          />

          {/* Header */}

          <div
            className="
              relative

              flex
              flex-col

              sm:flex-row
              sm:items-center
              sm:justify-between

              gap-3

              mb-5
              sm:mb-7

              pb-4
              sm:pb-5

              border-b
              border-white/5
            "
          >
            <div
              className="
                flex
                items-center
                gap-2.5
              "
            >
              <div
                className="
                  w-8
                  h-8

                  rounded-xl

                  flex
                  items-center
                  justify-center
                "
                style={{
                  backgroundColor:
                    "rgba(214,184,135,0.07)",
                }}
              >
                <Sliders
                  size={14}
                  style={{
                    color:
                      "var(--champagne)",
                  }}
                />
              </div>

              <div>
                <h2
                  className="
                    text-[10px]
                    sm:text-xs

                    uppercase
                    tracking-[0.16em]

                    font-semibold
                  "
                  style={{
                    color:
                      "var(--text-primary)",
                  }}
                >
                  Ambience Soundscapes
                </h2>

                <p
                  className="
                    hidden
                    sm:block

                    mt-1

                    text-[8px]
                  "
                  style={{
                    color:
                      "var(--text-muted)",
                    opacity: 0.45,
                  }}
                >
                  Blend individual environmental layers
                </p>
              </div>
            </div>

            <span
              className="
                self-start
                sm:self-auto

                inline-flex
                items-center
                gap-1.5

                px-2.5
                py-1.5

                rounded-lg

                border

                text-[8px]
                sm:text-[9px]

                font-mono
              "
              style={{
                color:
                  "var(--text-muted)",

                borderColor:
                  "rgba(244,240,230,0.08)",

                backgroundColor:
                  "rgba(255,255,255,0.02)",
              }}
            >
              <Sparkles
                size={10}
                style={{
                  color:
                    "var(--champagne)",
                }}
              />

              Multi-Layer Engine
            </span>
          </div>

          {/* Ambience cards */}

          <div
            className="
              relative

              grid

              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3

              gap-2.5
              sm:gap-4
            "
          >
            {(ambientLayers || []).map(
              (layer) => {
                const percentage =
                  Math.round(
                    layer.volume * 100
                  );

                const isActive =
                  layer.volume > 0 &&
                  !layer.isMuted;

                const IconComponent =
                  AMBIENCE_ICONS[
                    layer.id
                  ] || Volume2;

                const animationClass =
                  getAnimationClass(
                    layer.id
                  );

                const sliderValue =
                  layer.isMuted
                    ? 0
                    : layer.volume;

                return (
                  <div
                    key={layer.id}
                    className="
                      relative

                      p-3.5
                      sm:p-4.5

                      rounded-xl
                      sm:rounded-2xl

                      border

                      flex
                      flex-col

                      transition-all
                      duration-300

                      hover:-translate-y-0.5

                      group
                    "
                    style={{
                      background:
                        isActive
                          ? "linear-gradient(145deg, rgba(168,182,154,0.055), rgba(255,255,255,0.015))"
                          : "rgba(255,255,255,0.018)",

                      borderColor:
                        isActive
                          ? "rgba(168,182,154,0.28)"
                          : "rgba(244,240,230,0.065)",

                      boxShadow:
                        isActive
                          ? "0 12px 30px rgba(168,182,154,0.055)"
                          : "none",
                    }}
                  >
                    {/* Top */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between

                        gap-3

                        mb-5
                      "
                    >
                      {/* Name */}

                      <div
                        className="
                          flex
                          items-center
                          gap-2.5

                          min-w-0
                        "
                      >
                        <div
                          className="
                            w-9
                            h-9

                            rounded-xl

                            flex
                            items-center
                            justify-center

                            flex-shrink-0

                            transition-all
                            duration-300
                          "
                          style={{
                            backgroundColor:
                              isActive
                                ? "rgba(168,182,154,0.09)"
                                : "rgba(255,255,255,0.025)",
                          }}
                        >
                          <IconComponent
                            size={16}
                            className={
                              animationClass
                            }
                            style={{
                              color:
                                isActive
                                  ? "var(--sage)"
                                  : "var(--text-muted)",

                              animationPlayState:
                                isActive
                                  ? "running"
                                  : "paused",
                            }}
                          />
                        </div>

                        <div className="min-w-0">
                          <span
                            className="
                              block

                              text-[10px]
                              sm:text-[11px]

                              font-medium

                              truncate
                            "
                            style={{
                              color:
                                isActive
                                  ? "var(--sage)"
                                  : "var(--text-primary)",
                            }}
                          >
                            {layer.name}
                          </span>

                          <span
                            className="
                              block

                              mt-0.5

                              text-[7px]
                              sm:text-[8px]

                              uppercase
                              tracking-[0.12em]
                            "
                            style={{
                              color:
                                "var(--text-muted)",
                              opacity: 0.38,
                            }}
                          >
                            {isActive
                              ? "Active"
                              : layer.isMuted
                              ? "Muted"
                              : "Standby"}
                          </span>
                        </div>
                      </div>

                      {/* Mute */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleAmbientMute(
                            layer.id
                          )
                        }
                        className="
                          w-8
                          h-8

                          rounded-lg

                          flex
                          items-center
                          justify-center

                          border

                          transition-all
                          duration-200

                          hover:scale-105
                          active:scale-90

                          flex-shrink-0
                        "
                        style={{
                          backgroundColor:
                            layer.isMuted
                              ? "rgba(248,113,113,0.07)"
                              : "rgba(255,255,255,0.025)",

                          borderColor:
                            layer.isMuted
                              ? "rgba(248,113,113,0.18)"
                              : "rgba(255,255,255,0.06)",

                          color:
                            layer.isMuted
                              ? "#f87171"
                              : isActive
                              ? "var(--sage)"
                              : "var(--text-muted)",
                        }}
                        aria-label={
                          layer.isMuted
                            ? `Unmute ${layer.name}`
                            : `Mute ${layer.name}`
                        }
                      >
                        {layer.isMuted ? (
                          <VolumeX size={14} />
                        ) : (
                          <Volume2 size={14} />
                        )}
                      </button>
                    </div>

                    {/* Slider */}

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                      "
                    >
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={sliderValue}
                        onChange={(e) =>
                          setAmbientVolume(
                            layer.id,
                            parseFloat(
                              e.target.value
                            )
                          )
                        }
                        aria-label={`${layer.name} volume`}
                        className="
                          w-full

                          h-1.5
                          sm:h-2

                          rounded-full

                          appearance-none

                          cursor-pointer

                          studio-slider
                        "
                        style={{
                          background:
                            getSliderBackground(
                              sliderValue
                            ),

                          accentColor:
                            "var(--sage)",
                        }}
                      />

                      <span
                        className="
                          w-8

                          text-right

                          text-[8px]
                          sm:text-[9px]

                          font-mono

                          flex-shrink-0
                        "
                        style={{
                          color:
                            isActive
                              ? "var(--sage)"
                              : "var(--text-muted)",

                          opacity:
                            isActive
                              ? 0.9
                              : 0.55,
                        }}
                      >
                        {percentage}%
                      </span>
                    </div>

                    {/* Bottom progress detail */}

                    <div
                      className="
                        mt-3

                        flex
                        items-center
                        justify-between

                        text-[7px]
                        uppercase
                        tracking-[0.12em]
                      "
                      style={{
                        color:
                          "var(--text-muted)",
                        opacity: 0.3,
                      }}
                    >
                      <span>Low</span>

                      <span>Spatial Layer</span>

                      <span>High</span>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AtmosphereStudio;