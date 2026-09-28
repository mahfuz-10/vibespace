import React from 'react';
import { useAudio, MUSIC_DATABASE } from './AudioManager';
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
  Sliders
} from 'lucide-react';
import { LiveMixBar } from './LiveMixBar';
import PresetMixes from './PresetMixes';

/* Ambience card icons mapping */
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

export const AtmosphereStudio = () => {
  const {
    currentTrack,
    playTrack,
    isPlaying,
    ambientLayers,
    setAmbientVolume,
    toggleAmbientMute,
    masterVolume,
    setMasterVolume
  } = useAudio();

  const getSliderBackground = (value, max = 1) => {
    const percentage = (value / max) * 100;

    return `linear-gradient(
      to right,
      var(--sage) ${percentage}%,
      var(--border-subtle, rgba(244,240,230,0.15)) ${percentage}%
    )`;
  };

  return (
    <div
      className="
        w-full
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8

        pt-2
        sm:pt-24
        lg:pt-32

        pb-24
        sm:pb-32
        lg:pb-40

        animate-fade-up
      "
    >

      {/* =========================================================
          HEADER
      ========================================================= */}
      <div
        className="
          mb-4
          sm:mb-10
          lg:mb-12

          text-center
          max-w-2xl
          mx-auto
          relative
          px-1
        "
      >

        {/* Subtle Header Glow */}
        <div
          className="
            absolute
            inset-x-0
            -top-6
            sm:-top-10

            h-40
            sm:h-52

            bg-radial
            from-emerald-500/10
            via-transparent
            to-transparent

            blur-2xl
            pointer-events-none
          "
        />

        {/* Badge */}
        <div
          className="
            relative
            inline-flex
            items-center
            gap-1.5
            sm:gap-2

            px-2.5
            sm:px-3.5

            py-1
            sm:py-1.5

            rounded-full
            border
            mb-2
            sm:mb-4

            backdrop-blur-md
            max-w-full
          "
          style={{
            backgroundColor: 'rgba(168, 182, 154, 0.05)',
            borderColor: 'rgba(168, 182, 154, 0.2)'
          }}
        >
          <img
            src="/vibespace-logo-icon.png"
            alt=""
            style={{
              height: '11px',
              width: 'auto',
              objectFit: 'contain',
              flexShrink: 0,
              filter:
                'drop-shadow(0 0 6px rgba(168, 182, 154, 0.3)) drop-shadow(0 0 12px rgba(214, 184, 135, 0.15))'
            }}
          />

          <span
            className="
              text-[7px]
              xs:text-[8px]
              sm:text-[10px]

              font-semibold
              tracking-[0.13em]
              sm:tracking-widest

              uppercase
              whitespace-nowrap
            "
            style={{
              color: 'var(--sage)'
            }}
          >
            Spatial Acoustic Laboratory
          </span>
        </div>

        {/* Title */}
        <h1
          className="
            relative

            text-[26px]
            xs:text-[28px]

            sm:text-4xl
            lg:text-[42px]

            leading-[1.05]
            font-light
            tracking-tight

            mb-1.5
            sm:mb-3
          "
          style={{
            color: 'var(--text-primary)',
            fontWeight: 300
          }}
        >
          Atmosphere{' '}
          <span
            className="font-normal italic"
            style={{
              color: 'var(--champagne)'
            }}
          >
            Studio
          </span>
        </h1>

        {/* Description */}
        <p
          className="
            relative

            text-[10px]
            sm:text-xs

            leading-[1.55]
            sm:leading-[1.7]

            max-w-[300px]
            sm:max-w-md

            mx-auto
          "
          style={{
            color: 'var(--text-muted)',
            opacity: 0.62
          }}
        >
          Independent control over your hero music track and multi-layered
          generative ambient soundscapes.
        </p>
      </div>


      {/* =========================================================
          MASTER VOLUME + LIVE MIX
      ========================================================= */}
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-12

          gap-3
          sm:gap-5
          lg:gap-6

          mb-7
          sm:mb-10
        "
      >

        {/* Master Volume */}
        <div
          className="
            lg:col-span-5

            p-3.5
            sm:p-5

            rounded-[20px]
            sm:rounded-3xl

            border

            flex
            flex-col
            justify-between

            transition-all
            duration-300

            relative
            overflow-hidden
            shadow-xl
          "
          style={{
            background:
              'linear-gradient(145deg, rgba(37, 38, 32, 0.9), rgba(20, 21, 17, 0.95))',
            borderColor: 'rgba(214, 184, 135, 0.2)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)'
          }}
        >

          {/* subtle glow */}
          <div
            className="
              absolute
              -right-16
              -top-16
              w-32
              h-32
              rounded-full
              blur-3xl
              pointer-events-none
            "
            style={{
              background: 'rgba(214, 184, 135, 0.06)'
            }}
          />

          <div className="relative flex items-center justify-between mb-4 sm:mb-5">

            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">

              <div
                className="
                  w-8
                  h-8
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
                  backgroundColor: 'rgba(168, 182, 154, 0.1)',
                  borderColor: 'rgba(168, 182, 154, 0.2)'
                }}
              >
                <Volume2
                  className="w-3.5 h-3.5 sm:w-[17px] sm:h-[17px]"
                  style={{
                    color: 'var(--sage)'
                  }}
                />
              </div>

              <div className="min-w-0">

                <h3
                  className="
                    text-[10px]
                    sm:text-xs

                    font-medium
                    tracking-tight
                    truncate
                  "
                  style={{
                    color: 'var(--text-primary)'
                  }}
                >
                  Master Output Volume
                </h3>

                <p
                  className="
                    text-[8px]
                    sm:text-[10px]

                    opacity-50
                    mt-0.5
                  "
                  style={{
                    color: 'var(--text-muted)'
                  }}
                >
                  Overall system sound pressure.
                </p>

              </div>
            </div>

            <span
              className="
                text-[9px]
                sm:text-xs

                font-mono
                font-bold

                px-2
                py-1

                rounded-lg

                flex-shrink-0
                ml-3
              "
              style={{
                color: 'var(--champagne)',
                backgroundColor: 'rgba(214, 184, 135, 0.1)'
              }}
            >
              {Math.round(masterVolume * 100)}%
            </span>

          </div>

          <div className="relative pt-1">

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={masterVolume}
              onChange={(e) =>
                setMasterVolume(parseFloat(e.target.value))
              }
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
                background: getSliderBackground(masterVolume, 1),
                accentColor: 'var(--sage)'
              }}
            />

          </div>
        </div>


        {/* Live Mix */}
        <div
          className="
            lg:col-span-7
            flex
            items-center
            min-w-0
          "
        >
          <div className="w-full min-w-0">
            <LiveMixBar activeLayers={ambientLayers} />
          </div>
        </div>

      </div>


      {/* =========================================================
          PRESET MIXES
      ========================================================= */}
      <div className="mb-7 sm:mb-12">
        <PresetMixes
          ambientLayers={ambientLayers}
          setAmbientVolume={setAmbientVolume}
        />
      </div>


      {/* =========================================================
          MAIN STUDIO SECTIONS
      ========================================================= */}
      <div className="space-y-6 sm:space-y-10 lg:space-y-12">


        {/* =======================================================
            HERO TRACK SELECTION
        ======================================================= */}
        <div
          className="
            p-3.5
            sm:p-6
            lg:p-8

            rounded-[22px]
            sm:rounded-3xl

            border

            relative
            overflow-hidden
            backdrop-blur-md
          "
          style={{
            background:
              'linear-gradient(160deg, rgba(30, 31, 27, 0.7), rgba(20, 21, 17, 0.85))',
            borderColor:
              'var(--border-subtle, rgba(244,240,230,0.08))',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}
        >

          {/* Section Header */}
          <div
            className="
              flex
              flex-col

              gap-2.5
              sm:gap-3

              sm:flex-row
              sm:items-center
              sm:justify-between

              mb-4
              sm:mb-6

              pb-3
              sm:pb-4

              border-b
              border-white/5
            "
          >

            <div className="flex items-center gap-2">

              <div
                className="
                  w-7
                  h-7

                  sm:w-8
                  sm:h-8

                  rounded-lg

                  flex
                  items-center
                  justify-center
                "
                style={{
                  backgroundColor:
                    'rgba(214, 184, 135, 0.06)'
                }}
              >
                <Radio
                  size={14}
                  style={{
                    color: 'var(--champagne)'
                  }}
                />
              </div>

              <h2
                className="
                  text-[9px]
                  sm:text-xs

                  uppercase
                  tracking-[0.15em]
                  sm:tracking-[0.17em]

                  font-semibold
                "
                style={{
                  color: 'var(--text-primary)'
                }}
              >
                Hero Track Selection
              </h2>

            </div>

            <span
              className="
                self-start
                sm:self-auto

                text-[8px]
                sm:text-[10px]

                font-mono

                px-2
                sm:px-2.5

                py-1

                rounded-md
                border
              "
              style={{
                color: 'var(--text-muted)',
                borderColor: 'var(--border-subtle)',
                backgroundColor: 'rgba(255,255,255,0.02)'
              }}
            >
              {MUSIC_DATABASE.length} Cinematic Tracks
            </span>

          </div>


          {/* Tracks */}
          <div
            className="
              grid

              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3

              gap-2
              sm:gap-3.5
            "
          >

            {MUSIC_DATABASE.map((track) => {

              const isCurrent =
                currentTrack?.id === track.id;

              const isSpinning =
                isCurrent && isPlaying;

              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`
                    p-2.5
                    sm:p-3.5

                    rounded-xl
                    sm:rounded-2xl

                    border
                    cursor-pointer

                    flex
                    items-center

                    gap-2.5
                    sm:gap-3.5

                    transition-all
                    duration-300

                    group

                    active:scale-[0.985]
                    hover:-translate-y-0.5

                    ${isCurrent ? 'font-medium' : ''}
                  `}
                  style={{
                    backgroundColor: isCurrent
                      ? 'rgba(168, 182, 154, 0.08)'
                      : 'var(--surface-primary)',

                    borderColor: isCurrent
                      ? 'var(--sage)'
                      : 'var(--border-subtle, rgba(244,240,230,0.08))',

                    opacity: isCurrent ? 1 : 0.82,

                    boxShadow: isCurrent
                      ? '0 8px 25px rgba(168,182,154,0.15)'
                      : '0 4px 15px rgba(0,0,0,0.05)'
                  }}
                >

                  {/* Artwork */}
                  <div
                    className="
                      w-10
                      h-10

                      sm:w-12
                      sm:h-12

                      overflow-hidden
                      flex-shrink-0

                      transition-all
                      duration-500

                      shadow-lg
                      relative
                    "
                    style={{
                      borderRadius:
                        isSpinning ? '50%' : '10px'
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
                        duration-300

                        group-hover:scale-105

                        ${isSpinning ? 'vinyl-spinning' : ''}
                      `}
                      style={{
                        animationPlayState: isPlaying
                          ? 'running'
                          : 'paused'
                      }}
                    />
                  </div>


                  {/* Track Info */}
                  <div className="flex-grow min-w-0">

                    <h4
                      className="
                        text-[10px]
                        sm:text-xs

                        truncate
                        font-medium

                        mb-0.5
                      "
                      style={{
                        color: isCurrent
                          ? 'var(--sage)'
                          : 'var(--text-primary)'
                      }}
                    >
                      {track.title}
                    </h4>

                    <p
                      className="
                        text-[8px]
                        sm:text-[10px]

                        truncate
                        opacity-50
                      "
                      style={{
                        color: 'var(--text-muted)'
                      }}
                    >
                      {track.artist}
                    </p>

                  </div>


                  {/* Playing Indicator */}
                  {isCurrent && isPlaying && (
                    <div
                      className="
                        flex
                        items-end
                        space-x-0.5

                        h-3.5
                        flex-shrink-0

                        px-0.5
                        sm:px-1
                      "
                    >
                      <span
                        className="
                          w-0.5
                          h-full
                          animate-pulse
                          rounded-full
                        "
                        style={{
                          backgroundColor: 'var(--sage)',
                          animationDuration: '0.6s'
                        }}
                      />

                      <span
                        className="
                          w-0.5
                          h-2/3
                          animate-pulse
                          rounded-full
                        "
                        style={{
                          backgroundColor: 'var(--sage)',
                          animationDuration: '0.4s'
                        }}
                      />

                      <span
                        className="
                          w-0.5
                          h-4/5
                          animate-pulse
                          rounded-full
                        "
                        style={{
                          backgroundColor: 'var(--sage)',
                          animationDuration: '0.5s'
                        }}
                      />
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        </div>


        {/* =======================================================
            AMBIENCE SOUNDSCAPES
        ======================================================= */}
        <div
          className="
            p-3.5
            sm:p-6
            lg:p-8

            rounded-[22px]
            sm:rounded-3xl

            border
            relative
            overflow-hidden
            backdrop-blur-md
          "
          style={{
            background:
              'linear-gradient(160deg, rgba(30, 31, 27, 0.7), rgba(20, 21, 17, 0.85))',
            borderColor:
              'var(--border-subtle, rgba(244,240,230,0.08))',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}
        >

          {/* Section Header */}
          <div
            className="
              flex
              flex-col
              gap-2.5

              sm:flex-row
              sm:items-center
              sm:justify-between

              mb-4
              sm:mb-6

              pb-3
              sm:pb-4

              border-b
              border-white/5
            "
          >

            <div className="flex items-center gap-2">

              <div
                className="
                  w-7
                  h-7
                  sm:w-8
                  sm:h-8

                  rounded-lg

                  flex
                  items-center
                  justify-center
                "
                style={{
                  backgroundColor:
                    'rgba(214, 184, 135, 0.06)'
                }}
              >
                <Sliders
                  size={14}
                  style={{
                    color: 'var(--champagne)'
                  }}
                />
              </div>

              <h2
                className="
                  text-[9px]
                  sm:text-xs

                  uppercase
                  tracking-[0.15em]
                  sm:tracking-[0.17em]

                  font-semibold
                "
                style={{
                  color: 'var(--text-primary)'
                }}
              >
                Ambience Soundscapes
              </h2>

            </div>

            <span
              className="
                self-start
                sm:self-auto

                text-[8px]
                sm:text-[10px]

                font-mono

                px-2
                sm:px-2.5

                py-1

                rounded-md
                border
              "
              style={{
                color: 'var(--text-muted)',
                borderColor: 'var(--border-subtle)',
                backgroundColor: 'rgba(255,255,255,0.02)'
              }}
            >
              Multi-Layer Spatial Engine
            </span>

          </div>


          {/* Ambience Cards */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3

              gap-2.5
              sm:gap-4
            "
          >

            {ambientLayers.map((layer) => {

              const percentage =
                Math.round(layer.volume * 100);

              const isActive =
                layer.volume > 0 && !layer.isMuted;

              const IconComponent =
                AMBIENCE_ICONS[layer.id] || Volume2;


              const getAnimationClass = (id) => {
                switch (id) {
                  case 'rain':
                    return 'anim-rain';

                  case 'fireplace':
                    return 'anim-fire';

                  case 'wind':
                    return 'anim-wind';

                  case 'ocean':
                    return 'anim-waves';

                  default:
                    return '';
                }
              };


              const animationClass =
                getAnimationClass(layer.id);


              return (
                <div
                  key={layer.id}
                  className="
                    p-3
                    sm:p-4

                    rounded-xl
                    sm:rounded-2xl

                    border

                    flex
                    flex-col
                    justify-between

                    transition-all
                    duration-300

                    hover:border-emerald-500/30
                    active:scale-[0.99]
                  "
                  style={{
                    backgroundColor: isActive
                      ? 'rgba(168, 182, 154, 0.04)'
                      : 'var(--surface-primary)',

                    borderColor: isActive
                      ? 'rgba(168, 182, 154, 0.4)'
                      : 'var(--border-subtle, rgba(244,240,230,0.08))',

                    boxShadow: isActive
                      ? '0 8px 25px rgba(168,182,154,0.08)'
                      : 'none'
                  }}
                >

                  {/* Ambience Header */}
                  <div
                    className="
                      flex
                      items-center
                      justify-between

                      mb-3
                      sm:mb-4
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-2

                        min-w-0
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

                          flex-shrink-0
                        "
                        style={{
                          backgroundColor: isActive
                            ? 'rgba(168,182,154,0.08)'
                            : 'rgba(255,255,255,0.025)'
                        }}
                      >
                        <IconComponent
                          className={`
                            w-4
                            h-4
                            ${animationClass}
                          `}
                          style={{
                            color: isActive
                              ? 'var(--sage)'
                              : 'var(--text-muted)',

                            animationPlayState:
                              isActive
                                ? 'running'
                                : 'paused'
                          }}
                        />
                      </div>

                      <span
                        className="
                          text-[10px]
                          sm:text-xs

                          font-medium
                          truncate
                        "
                        style={{
                          color: isActive
                            ? 'var(--sage)'
                            : 'var(--text-primary)'
                        }}
                      >
                        {layer.name}
                      </span>

                    </div>


                    {/* Mute */}
                    <button
                      onClick={() =>
                        toggleAmbientMute(layer.id)
                      }
                      className="
                        p-1.5
                        sm:p-2

                        rounded-xl
                        text-xs

                        transition-all
                        duration-200

                        cursor-pointer

                        hover:bg-white/5
                        active:scale-90

                        flex-shrink-0
                      "
                      style={{
                        color: layer.isMuted
                          ? '#f87171'
                          : isActive
                            ? 'var(--sage)'
                            : 'var(--text-muted)',

                        opacity: layer.isMuted
                          ? 1
                          : 0.7
                      }}
                      aria-label={
                        layer.isMuted
                          ? `Unmute ${layer.name}`
                          : `Mute ${layer.name}`
                      }
                    >
                      {layer.isMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                  </div>


                  {/* Slider */}
                  <div
                    className="
                      flex
                      items-center
                      gap-2.5
                    "
                  >

                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={
                        layer.isMuted
                          ? 0
                          : layer.volume
                      }
                      onChange={(e) =>
                        setAmbientVolume(
                          layer.id,
                          parseFloat(e.target.value)
                        )
                      }
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
                            layer.isMuted
                              ? 0
                              : layer.volume,
                            1
                          ),

                        accentColor:
                          'var(--sage)'
                      }}
                    />

                    <span
                      className="
                        text-[8px]
                        sm:text-[10px]

                        font-mono

                        w-8
                        text-right

                        opacity-70

                        flex-shrink-0
                      "
                      style={{
                        color: 'var(--text-muted)'
                      }}
                    >
                      {percentage}%
                    </span>

                  </div>

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </div>
  );
};

export default AtmosphereStudio;