import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Check,
  Compass,
  Volume2
} from 'lucide-react';

import { useAudio, MUSIC_DATABASE } from './AudioManager';


/* ============================================================
   OPTIONS
   ============================================================ */

const ACTIVITIES = [
  { name: 'Studying', icon: '📚' },
  { name: 'Coding', icon: '💻' },
  { name: 'Working', icon: '⚡' },
  { name: 'Reading', icon: '📖' },
  { name: 'Sleeping', icon: '🌙' },
  { name: 'Relaxing', icon: '🍵' },
  { name: 'Creating', icon: '✨' },
  { name: 'Driving', icon: '🚗' },
  { name: 'Chilling', icon: '🛋️' }
];

const FEELINGS = [
  { name: 'Calm', desc: 'Serene & still' },
  { name: 'Deep Focus', desc: 'Uninterrupted flow' },
  { name: 'Dreamy', desc: 'Floating away' },
  { name: 'Cozy', desc: 'Warm & safe' },
  { name: 'Energetic', desc: 'Uplifting pulse' },
  { name: 'Romantic', desc: 'Cinematic mood' },
  { name: 'Melancholic', desc: 'Deep reflection' },
  { name: 'Peaceful', desc: 'Soft breathing' }
];

const ENVIRONMENTS = [
  { name: 'Rainy Window', tag: 'Weather' },
  { name: 'Coffee Shop', tag: 'Ambiance' },
  { name: 'Midnight City', tag: 'Urban' },
  { name: 'Forest Cabin', tag: 'Nature' },
  { name: 'Quiet Library', tag: 'Acoustic' },
  { name: 'Ocean', tag: 'Waves' },
  { name: 'Fireplace', tag: 'Warmth' },
  { name: 'Rooftop', tag: 'Breeze' }
];

const INTENSITIES = [
  { name: 'Quiet', desc: 'Subtle background' },
  { name: 'Balanced', desc: 'Harmonic blend' },
  { name: 'Immersive', desc: 'Full spatial envelopment' }
];


/* ============================================================
   COMPONENT
   ============================================================ */

export const SituationBuilder = () => {

  const {
    activity,
    setActivity,

    feeling,
    setFeeling,

    environment,
    setEnvironment,

    intensity,
    setIntensity,

    setHasSubmittedSituation,

    playTrack
  } = useAudio();


  /* ============================================================
     SCROLL PROGRESS
     ============================================================ */

  const [activeSection, setActiveSection] = useState(0);

  const sectionRefs = useRef([]);


  useEffect(() => {

    let ticking = false;

    const updateProgress = () => {

      const viewportPoint = window.innerHeight * 0.35;

      let currentSection = 0;

      sectionRefs.current.forEach((section, index) => {

        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= viewportPoint) {
          currentSection = index;
        }

      });

      setActiveSection(currentSection);

      ticking = false;
    };


    const handleScroll = () => {

      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }

    };


    updateProgress();

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    window.addEventListener('resize', updateProgress);


    return () => {

      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateProgress);

    };

  }, []);


  /* ============================================================
     RECOMMENDATION ENGINE
     ============================================================ */

  const recommendedTrack = useMemo(() => {

    if (!Array.isArray(MUSIC_DATABASE) || MUSIC_DATABASE.length === 0) {
      return null;
    }

    const scoredTracks = MUSIC_DATABASE.map((track) => {

      let score = 0;

      const situations = Array.isArray(track.situations)
        ? track.situations
        : [];

      const title = String(track.title || '').toLowerCase();
      const mood = String(track.mood || '').toLowerCase();

      const trackEnvironment = String(
        track.environment || ''
      ).toLowerCase();

      const selectedActivity = String(
        activity || ''
      ).toLowerCase();

      const selectedFeeling = String(
        feeling || ''
      ).toLowerCase();

      const selectedEnvironment = String(
        environment || ''
      ).toLowerCase();


      /* Activity match */

      if (
        situations.some(
          item =>
            String(item).toLowerCase() === selectedActivity
        )
      ) {
        score += 10;
      }


      /* Feeling / mood match */

      if (mood === selectedFeeling) {
        score += 10;
      }


      /* Environment match */

      if (trackEnvironment === selectedEnvironment) {
        score += 10;
      }


      /* Title keyword matching */

      if (
        selectedActivity &&
        title.includes(selectedActivity)
      ) {
        score += 4;
      }

      if (
        selectedFeeling &&
        title.includes(selectedFeeling)
      ) {
        score += 4;
      }

      if (
        selectedEnvironment &&
        title.includes(selectedEnvironment)
      ) {
        score += 4;
      }


      /* Activity keyword matching */

      if (
        selectedActivity === 'studying' ||
        selectedActivity === 'coding' ||
        selectedActivity === 'reading'
      ) {

        if (
          title.includes('focus') ||
          title.includes('study') ||
          title.includes('coding') ||
          title.includes('deep')
        ) {
          score += 3;
        }

      }


      if (selectedActivity === 'driving') {

        if (
          title.includes('drive') ||
          title.includes('driving') ||
          title.includes('night') ||
          title.includes('city') ||
          title.includes('car')
        ) {
          score += 5;
        }

      }


      if (selectedActivity === 'sleeping') {

        if (
          title.includes('sleep') ||
          title.includes('dream') ||
          title.includes('night')
        ) {
          score += 5;
        }

      }


      if (selectedActivity === 'relaxing') {

        if (
          title.includes('relax') ||
          title.includes('calm') ||
          title.includes('peace') ||
          title.includes('chill')
        ) {
          score += 5;
        }

      }


      if (selectedActivity === 'chilling') {

        if (
          title.includes('chill') ||
          title.includes('lofi') ||
          title.includes('lounge')
        ) {
          score += 5;
        }

      }


      /* Environment keywords */

      if (selectedEnvironment === 'rainy window') {

        if (
          title.includes('rain') ||
          trackEnvironment.includes('rain')
        ) {
          score += 5;
        }

      }


      if (selectedEnvironment === 'coffee shop') {

        if (
          title.includes('coffee') ||
          title.includes('cafe') ||
          trackEnvironment.includes('coffee')
        ) {
          score += 5;
        }

      }


      if (selectedEnvironment === 'midnight city') {

        if (
          title.includes('midnight') ||
          title.includes('city') ||
          title.includes('night')
        ) {
          score += 5;
        }

      }


      if (selectedEnvironment === 'forest cabin') {

        if (
          title.includes('forest') ||
          title.includes('cabin') ||
          title.includes('nature')
        ) {
          score += 5;
        }

      }


      if (selectedEnvironment === 'ocean') {

        if (
          title.includes('ocean') ||
          title.includes('sea') ||
          title.includes('wave')
        ) {
          score += 5;
        }

      }


      if (selectedEnvironment === 'fireplace') {

        if (
          title.includes('fire') ||
          title.includes('fireplace') ||
          title.includes('warm')
        ) {
          score += 5;
        }

      }


      if (selectedEnvironment === 'rooftop') {

        if (
          title.includes('rooftop') ||
          title.includes('wind') ||
          title.includes('breeze')
        ) {
          score += 5;
        }

      }


      return {
        track,
        score
      };

    });


    scoredTracks.sort(
      (a, b) => b.score - a.score
    );


    const bestMatch = scoredTracks[0];

    if (bestMatch && bestMatch.score > 0) {
      return bestMatch.track;
    }


    const neutralTrack = MUSIC_DATABASE.find(track => {

      const title = String(
        track.title || ''
      ).toLowerCase();

      return (
        title.includes('chill') ||
        title.includes('ambient') ||
        title.includes('lofi') ||
        title.includes('relax')
      );

    });


    return neutralTrack || MUSIC_DATABASE[0] || null;

  }, [activity, feeling, environment]);


  /* ============================================================
     ENTER ATMOSPHERE
     ============================================================ */

  const handleEnterAtmosphere = () => {

    if (!recommendedTrack) {

      console.warn(
        'VibeSpace: No recommended track found for this situation.'
      );

      return;
    }


    try {

      console.log(
        'VibeSpace recommendation:',
        {
          activity,
          feeling,
          environment,
          intensity,
          track: recommendedTrack
        }
      );


      playTrack(recommendedTrack);

      setHasSubmittedSituation(true);

    } catch (error) {

      console.error(
        'VibeSpace: Failed to start recommended track.',
        error
      );

    }

  };


  /* ============================================================
     SURPRISE ME
     ============================================================ */

  const handleSurpriseMe = () => {

    const randomActivity =
      ACTIVITIES[
        Math.floor(
          Math.random() * ACTIVITIES.length
        )
      ];

    const randomFeeling =
      FEELINGS[
        Math.floor(
          Math.random() * FEELINGS.length
        )
      ];

    const randomEnvironment =
      ENVIRONMENTS[
        Math.floor(
          Math.random() * ENVIRONMENTS.length
        )
      ];

    const randomIntensity =
      INTENSITIES[
        Math.floor(
          Math.random() * INTENSITIES.length
        )
      ];


    setActivity(randomActivity.name);
    setFeeling(randomFeeling.name);
    setEnvironment(randomEnvironment.name);
    setIntensity(randomIntensity.name);

  };


  /* ============================================================
     PROGRESS CALCULATION
  ============================================================ */

  /*
    Completion based progress:
    Activity    = 25%
    Feeling     = 50%
    Environment = 75%
    Intensity   = 100%
  */

  const completedSections = [
    Boolean(activity),
    Boolean(feeling),
    Boolean(environment),
    Boolean(intensity)
  ].filter(Boolean).length;


  const completionProgress =
    (completedSections / 4) * 100;


  /*
    Scroll based progress:
    Section 01 = 0%
    Section 02 = 33%
    Section 03 = 66%
    Section 04 = 100%
  */

  const scrollProgress =
    (activeSection / 3) * 100;


  /*
    Use whichever progress is further ahead.
    This means the line reacts naturally to both
    scrolling and making selections.
  */

  const progressPercentage = Math.min(
    100,
    Math.max(
      completionProgress,
      scrollProgress
    )
  );


  /* ============================================================
     RENDER
     ============================================================ */

  return (

    <main className="min-h-screen px-6 pt-32 pb-40 max-w-7xl mx-auto animate-fade-up">


      {/* ========================================================
          LOCAL ANIMATION SYSTEM
      ======================================================== */}

      <style>{`

        /* ========================================================
           SECTION NUMBER BADGE
           Premium glowing ring
        ======================================================== */

        .section-number-badge {
          position: relative;
          isolation: isolate;

          min-width: 32px;
          height: 28px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          border: 1px solid var(--sage);

          box-shadow:
            0 0 12px rgba(168, 182, 154, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.035);

          background:
            rgba(168, 182, 154, 0.025);

          color: var(--champagne);

          transition:
            box-shadow 300ms ease,
            border-color 300ms ease,
            background-color 300ms ease;
        }

        .section-number-badge::before {
          content: "";

          position: absolute;
          inset: -4px;

          border-radius: inherit;

          border: 1px solid rgba(168, 182, 154, 0.08);

          box-shadow:
            0 0 16px rgba(168, 182, 154, 0.08);

          pointer-events: none;
        }

        .section-number-badge:hover {
          border-color: var(--champagne);

          box-shadow:
            0 0 16px rgba(168, 182, 154, 0.28),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }


        /* ========================================================
           SELECTED CHECKMARK — SPRING
        ======================================================== */

        @keyframes checkPop {

          0% {
            transform: scale(0);
            opacity: 0;
          }

          60% {
            transform: scale(1.2);
            opacity: 1;
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }

        }

        .checkmark-spring {
          animation:
            checkPop 350ms
            cubic-bezier(
              0.34,
              1.56,
              0.64,
              1
            );
          transform-origin: center;
        }


        /* ========================================================
           SELECTED CARD — TACTILE SETTLE
        ======================================================== */

        @keyframes cardSettle {

          0% {
            transform: scale(0.98);
          }

          100% {
            transform: scale(1);
          }

        }

        .situation-option-selected {
          animation:
            cardSettle 200ms
            ease-out;
        }


        /* ========================================================
           OPTION CARD
           ======================================================== */

        .situation-option {
          position: relative;

          transition:
            transform 200ms ease-out,
            border-color 300ms ease,
            background-color 300ms ease,
            box-shadow 300ms ease;

          will-change: transform, box-shadow;
        }


        /*
          Glass-like hairline reflection.
          This is intentionally extremely subtle.
        */

        .situation-option:hover {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 6px 22px rgba(0, 0, 0, 0.08);
        }

        .situation-option:active {
          transform: scale(0.985);
        }


        /*
          Selected cards keep their green glow
          while also receiving the inner reflection.
        */

        .situation-option.selected:hover {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 8px 30px rgba(168, 182, 154, 0.15);
        }


        /* ========================================================
           PROGRESS LINE
        ======================================================== */

        .studio-progress-line {
          position: absolute;

          left: 9px;
          top: 86px;
          bottom: 82px;

          width: 1px;

          background:
            var(--border-subtle, rgba(244, 240, 230, 0.08));

          overflow: hidden;

          pointer-events: none;
        }


        .studio-progress-fill {
          width: 100%;

          background:
            linear-gradient(
              to bottom,
              var(--sage),
              var(--champagne)
            );

          box-shadow:
            0 0 8px rgba(168, 182, 154, 0.18);

          transition:
            height 500ms
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );
        }


        /* ========================================================
           PROGRESS DOT
        ======================================================== */

        .studio-progress-dot {
          position: absolute;

          left: 4px;

          width: 11px;
          height: 11px;

          border-radius: 999px;

          background:
            var(--sage);

          box-shadow:
            0 0 0 4px rgba(168, 182, 154, 0.08),
            0 0 18px rgba(168, 182, 154, 0.45);

          transform: translateY(-50%);

          transition:
            top 500ms
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );

          pointer-events: none;
        }


        /* ========================================================
           LIVE STUDIO STATE
        ======================================================== */

        @keyframes studioBorderSweep {

          0% {
            background-position: 200% 50%;
          }

          100% {
            background-position: -200% 50%;
          }

        }


        .studio-border-shell {
          position: relative;

          border-radius: 24px;

          padding: 1px;

          overflow: hidden;

          background:
            linear-gradient(
              110deg,
              transparent 0%,
              transparent 30%,
              var(--sage) 45%,
              var(--champagne) 50%,
              var(--sage) 55%,
              transparent 70%,
              transparent 100%
            );

          background-size: 300% 100%;

          animation:
            studioBorderSweep 9s linear infinite;
        }


        /* ========================================================
           IDLE WAVEFORM
        ======================================================== */

        @keyframes idleWaveOne {

          0%,
          100% {
            transform: scaleY(0.45);
            opacity: 0.55;
          }

          50% {
            transform: scaleY(1);
            opacity: 1;
          }

        }


        @keyframes idleWaveTwo {

          0%,
          100% {
            transform: scaleY(0.7);
            opacity: 0.65;
          }

          50% {
            transform: scaleY(0.35);
            opacity: 0.9;
          }

        }


        @keyframes idleWaveThree {

          0%,
          100% {
            transform: scaleY(0.35);
            opacity: 0.6;
          }

          50% {
            transform: scaleY(0.9);
            opacity: 1;
          }

        }


        @keyframes idleWaveFour {

          0%,
          100% {
            transform: scaleY(0.8);
            opacity: 0.7;
          }

          50% {
            transform: scaleY(0.4);
            opacity: 0.95;
          }

        }


        .idle-wave-bar {
          width: 3px;
          height: 15px;

          border-radius: 999px;

          background:
            var(--sage);

          transform-origin: center;
        }


        .idle-wave-1 {
          animation:
            idleWaveOne 2.4s ease-in-out infinite;
        }


        .idle-wave-2 {
          animation:
            idleWaveTwo 2.1s ease-in-out infinite;

          animation-delay: 180ms;
        }


        .idle-wave-3 {
          animation:
            idleWaveThree 2.6s ease-in-out infinite;

          animation-delay: 320ms;
        }


        .idle-wave-4 {
          animation:
            idleWaveFour 2.2s ease-in-out infinite;

          animation-delay: 120ms;
        }


        /* ========================================================
           REDUCED MOTION
        ======================================================== */

        @media (prefers-reduced-motion: reduce) {

          .studio-border-shell,
          .checkmark-spring,
          .situation-option-selected,
          .idle-wave-1,
          .idle-wave-2,
          .idle-wave-3,
          .idle-wave-4 {
            animation: none !important;
          }

          .studio-progress-fill,
          .studio-progress-dot,
          .situation-option,
          .section-number-badge {
            transition: none !important;
          }

        }

      `}</style>


      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="text-center max-w-3xl mx-auto mb-20 relative">

        <div
          className="absolute inset-0 -top-10 bg-radial from-emerald-500/10 via-transparent to-transparent blur-3xl pointer-events-none"
        />


        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border mb-6 backdrop-blur-md"
          style={{
            backgroundColor:
              'rgba(168, 182, 154, 0.05)',

            borderColor:
              'rgba(168, 182, 154, 0.2)'
          }}
        >

          <Sparkles
            size={13}
            style={{
              color: 'var(--sage)'
            }}
          />


          <span
            className="text-[10px] font-semibold tracking-widest uppercase"
            style={{
              color: 'var(--sage)'
            }}
          >
            Spatial Architecture & Sound Engine
          </span>

        </div>


        <h1
          className="text-4xl sm:text-6xl font-light tracking-tight mb-6"
          style={{
            color: 'var(--text-primary)'
          }}
        >

          Sculpt your{' '}

          <span
            className="font-normal italic"
            style={{
              color: 'var(--champagne)'
            }}
          >
            atmosphere.
          </span>

        </h1>


        <p
          className="text-sm opacity-60 leading-relaxed max-w-xl mx-auto"
          style={{
            color: 'var(--text-muted)'
          }}
        >
          Immerse your senses in generative soundscapes tuned precisely
          to your current coordinates, actions, and inner rhythm.
        </p>

      </section>


      {/* ========================================================
          MAIN GRID
      ======================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">


        {/* ======================================================
            LEFT HUD
        ====================================================== */}

        <div className="lg:col-span-4 lg:sticky lg:top-28">

          <div className="studio-border-shell">

            <div
              className="p-6 rounded-3xl relative overflow-hidden transition-all duration-500 hover:shadow-2xl"
              style={{
                background:
                  'linear-gradient(145deg, rgba(37, 38, 32, 0.96), rgba(20, 21, 17, 0.98))',

                boxShadow:
                  '0 25px 60px rgba(0, 0, 0, 0.5)'
              }}
            >


              {/* -----------------------------------------------
                  SCROLL PROGRESS
              ----------------------------------------------- */}

              <div className="studio-progress-line">

                <div
                  className="studio-progress-fill"
                  style={{
                    height: `${progressPercentage}%`
                  }}
                />

              </div>


              {/* FIX:
                  Previously this used this?.activeSection.
                  React function components don't have `this`.
              */}

              <div
                className="studio-progress-dot"
                style={{
                  top:
                    `${86 +
                      (progressPercentage / 100) *
                      150}px`
                }}
              />


              {/* -----------------------------------------------
                  DECORATIVE GLOW
              ----------------------------------------------- */}

              <div
                className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
                style={{
                  backgroundColor:
                    'var(--sage)'
                }}
              />


              {/* -----------------------------------------------
                  HEADER
              ----------------------------------------------- */}

              <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/5">

                <div className="flex items-center gap-2">

                  <div
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{
                      backgroundColor:
                        'var(--sage)'
                    }}
                  />

                  <span
                    className="text-[10px] uppercase font-bold tracking-widest"
                    style={{
                      color:
                        'var(--text-muted)'
                    }}
                  >
                    Live Studio State
                  </span>

                </div>


                <span
                  className="text-xs font-mono font-medium px-2 py-0.5 rounded-md"
                  style={{
                    color:
                      'var(--champagne)',

                    backgroundColor:
                      'rgba(214, 184, 135, 0.1)'
                  }}
                >
                  Active Session
                </span>

              </div>


              {/* -----------------------------------------------
                  STATE CONTENT
              ----------------------------------------------- */}

              <div className="space-y-6">

                <div>

                  <span
                    className="text-[9px] uppercase tracking-wider block mb-1 opacity-50"
                    style={{
                      color:
                        'var(--text-muted)'
                    }}
                  >
                    Primary Focus
                  </span>

                  <h3
                    className="text-2xl font-light tracking-tight"
                    style={{
                      color:
                        'var(--champagne)'
                    }}
                  >
                    {activity}
                  </h3>

                </div>


                <div className="grid grid-cols-2 gap-4 pt-2">

                  <div
                    className="p-3 rounded-xl border bg-black/20"
                    style={{
                      borderColor:
                        'rgba(255,255,255,0.04)'
                    }}
                  >

                    <span
                      className="text-[9px] uppercase tracking-wider block opacity-40 mb-1"
                      style={{
                        color:
                          'var(--text-muted)'
                      }}
                    >
                      Vibe
                    </span>

                    <p
                      className="text-xs font-medium truncate"
                      style={{
                        color:
                          'var(--text-primary)'
                      }}
                    >
                      {feeling}
                    </p>

                  </div>


                  <div
                    className="p-3 rounded-xl border bg-black/20"
                    style={{
                      borderColor:
                        'rgba(255,255,255,0.04)'
                    }}
                  >

                    <span
                      className="text-[9px] uppercase tracking-wider block opacity-40 mb-1"
                      style={{
                        color:
                          'var(--text-muted)'
                      }}
                    >
                      Environment
                    </span>

                    <p
                      className="text-xs font-medium truncate"
                      style={{
                        color:
                          'var(--text-primary)'
                      }}
                    >
                      {environment}
                    </p>

                  </div>

                </div>


                <div className="pt-2">

                  <div className="flex justify-between items-center mb-1.5">

                    <span
                      className="text-[9px] uppercase tracking-wider opacity-50"
                      style={{
                        color:
                          'var(--text-muted)'
                      }}
                    >
                      Spatial Depth
                    </span>

                    <span
                      className="text-[10px] font-mono font-medium"
                      style={{
                        color:
                          'var(--sage)'
                      }}
                    >
                      {intensity}
                    </span>

                  </div>


                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">

                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width:
                          intensity === 'Quiet'
                            ? '33%'
                            : intensity === 'Balanced'
                              ? '66%'
                              : '100%',

                        backgroundColor:
                          'var(--sage)'
                      }}
                    />

                  </div>

                </div>

              </div>


              {/* -----------------------------------------------
                  FOOTER
              ----------------------------------------------- */}

              <div
                className="mt-8 pt-5 border-t border-white/5 flex items-center gap-3 text-[10px]"
                style={{
                  color:
                    'var(--text-muted)'
                }}
              >

                <Compass
                  size={13}
                  style={{
                    color:
                      'var(--sage)'
                  }}
                />

                <span>
                  Multi-channel spatial audio calibration ready.
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ======================================================
            RIGHT CONTENT
        ====================================================== */}

        <div className="lg:col-span-8 space-y-14">


          {/* ====================================================
              ACTIVITY — 01
          ==================================================== */}

          <section
            ref={el => {
              sectionRefs.current[0] = el;
            }}
            className="space-y-4"
          >

            <div className="flex items-center gap-3">


              {/* SECTION NUMBER */}

              <span
                className="section-number-badge text-xs font-mono font-bold rounded"
              >
                01
              </span>


              <div>

                <h2
                  className="text-lg font-medium tracking-tight"
                  style={{
                    color:
                      'var(--text-primary)'
                  }}
                >
                  What are you doing?
                </h2>

                <p
                  className="text-xs opacity-50"
                  style={{
                    color:
                      'var(--text-muted)'
                  }}
                >
                  Select your primary workflow or task state.
                </p>

              </div>

            </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

              {ACTIVITIES.map(item => {

                const selected =
                  item.name === activity;

                return (

                  <button
                    key={item.name}
                    onClick={() =>
                      setActivity(item.name)
                    }
                    className={`
                      situation-option
                      ${selected ? 'selected situation-option-selected' : ''}
                      p-4 rounded-2xl border text-left
                      group relative flex items-center
                      justify-between overflow-hidden
                      cursor-pointer
                    `}
                    style={{

                      backgroundColor:
                        selected
                          ? 'rgba(168, 182, 154, 0.12)'
                          : 'var(--surface-primary)',

                      borderColor:
                        selected
                          ? 'var(--sage)'
                          : 'var(--border-subtle, rgba(244,240,230,0.08))'

                    }}
                  >

                    <div className="flex items-center gap-3 relative z-10">

                      <span className="text-base">
                        {item.icon}
                      </span>

                      <span
                        className="text-xs font-medium"
                        style={{
                          color:
                            selected
                              ? 'var(--text-primary)'
                              : 'var(--text-secondary)'
                        }}
                      >
                        {item.name}
                      </span>

                    </div>


                    {selected && (

                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center relative z-10 checkmark-spring"
                        style={{
                          backgroundColor:
                            'var(--sage)'
                        }}
                      >

                        <Check
                          size={11}
                          style={{
                            color:
                              'var(--bg-primary)'
                          }}
                        />

                      </div>

                    )}

                  </button>

                );

              })}

            </div>

          </section>


          {/* ====================================================
              FEELING — 02
          ==================================================== */}

          <section
            ref={el => {
              sectionRefs.current[1] = el;
            }}
            className="space-y-4"
          >

            <div className="flex items-center gap-3">

              <span
                className="section-number-badge text-xs font-mono font-bold rounded"
              >
                02
              </span>


              <div>

                <h2
                  className="text-lg font-medium tracking-tight"
                  style={{
                    color:
                      'var(--text-primary)'
                  }}
                >
                  How should it feel?
                </h2>

                <p
                  className="text-xs opacity-50"
                  style={{
                    color:
                      'var(--text-muted)'
                  }}
                >
                  Define the emotional resonance of your soundscape.
                </p>

              </div>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {FEELINGS.map(item => {

                const selected =
                  item.name === feeling;

                return (

                  <button
                    key={item.name}
                    onClick={() =>
                      setFeeling(item.name)
                    }
                    className={`
                      situation-option
                      ${selected ? 'selected situation-option-selected' : ''}
                      p-4 rounded-2xl border text-left
                      group relative flex items-center
                      justify-between cursor-pointer
                    `}
                    style={{

                      backgroundColor:
                        selected
                          ? 'rgba(168, 182, 154, 0.12)'
                          : 'var(--surface-primary)',

                      borderColor:
                        selected
                          ? 'var(--sage)'
                          : 'var(--border-subtle, rgba(244,240,230,0.08))'

                    }}
                  >

                    <div>

                      <h4
                        className="text-xs font-medium mb-0.5"
                        style={{
                          color:
                            selected
                              ? 'var(--text-primary)'
                              : 'var(--text-secondary)'
                        }}
                      >
                        {item.name}
                      </h4>

                      <p
                        className="text-[10px] opacity-50"
                        style={{
                          color:
                            'var(--text-muted)'
                        }}
                      >
                        {item.desc}
                      </p>

                    </div>


                    {selected && (

                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center checkmark-spring"
                        style={{
                          backgroundColor:
                            'var(--sage)'
                        }}
                      >

                        <Check
                          size={11}
                          style={{
                            color:
                              'var(--bg-primary)'
                          }}
                        />

                      </div>

                    )}

                  </button>

                );

              })}

            </div>

          </section>


          {/* ====================================================
              ENVIRONMENT — 03
          ==================================================== */}

          <section
            ref={el => {
              sectionRefs.current[2] = el;
            }}
            className="space-y-4"
          >

            <div className="flex items-center gap-3">

              <span
                className="section-number-badge text-xs font-mono font-bold rounded"
              >
                03
              </span>


              <div>

                <h2
                  className="text-lg font-medium tracking-tight"
                  style={{
                    color:
                      'var(--text-primary)'
                  }}
                >
                  Where would you rather be?
                </h2>

                <p
                  className="text-xs opacity-50"
                  style={{
                    color:
                      'var(--text-muted)'
                  }}
                >
                  Anchor your acoustic environment.
                </p>

              </div>

            </div>


            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

              {ENVIRONMENTS.map(item => {

                const selected =
                  item.name === environment;

                return (

                  <button
                    key={item.name}
                    onClick={() =>
                      setEnvironment(item.name)
                    }
                    className={`
                      situation-option
                      ${selected ? 'selected situation-option-selected' : ''}
                      p-3.5 rounded-2xl border text-center
                      cursor-pointer flex flex-col
                      justify-between h-20
                    `}
                    style={{

                      backgroundColor:
                        selected
                          ? 'rgba(168, 182, 154, 0.12)'
                          : 'var(--surface-primary)',

                      borderColor:
                        selected
                          ? 'var(--sage)'
                          : 'var(--border-subtle, rgba(244,240,230,0.08))'

                    }}
                  >

                    <span
                      className="text-[9px] uppercase tracking-widest opacity-40 font-mono"
                      style={{
                        color:
                          'var(--text-muted)'
                      }}
                    >
                      {item.tag}
                    </span>


                    <span
                      className="text-xs font-medium"
                      style={{
                        color:
                          selected
                            ? 'var(--text-primary)'
                            : 'var(--text-secondary)'
                      }}
                    >
                      {item.name}
                    </span>

                  </button>

                );

              })}

            </div>

          </section>


          {/* ====================================================
              INTENSITY — 04
          ==================================================== */}

          <section
            ref={el => {
              sectionRefs.current[3] = el;
            }}
            className="space-y-4"
          >

            <div className="flex items-center gap-3">

              <span
                className="section-number-badge text-xs font-mono font-bold rounded"
              >
                04
              </span>


              <div>

                <h2
                  className="text-lg font-medium tracking-tight"
                  style={{
                    color:
                      'var(--text-primary)'
                  }}
                >
                  How immersive?
                </h2>

                <p
                  className="text-xs opacity-50"
                  style={{
                    color:
                      'var(--text-muted)'
                  }}
                >
                  Control sound pressure density.
                </p>

              </div>

            </div>


            <div className="grid grid-cols-3 gap-3">

              {INTENSITIES.map(item => {

                const selected =
                  item.name === intensity;

                return (

                  <button
                    key={item.name}
                    onClick={() =>
                      setIntensity(item.name)
                    }
                    className={`
                      situation-option
                      ${selected ? 'selected situation-option-selected' : ''}
                      p-4 rounded-2xl border text-center
                      cursor-pointer
                    `}
                    style={{

                      backgroundColor:
                        selected
                          ? 'rgba(168, 182, 154, 0.12)'
                          : 'var(--surface-primary)',

                      borderColor:
                        selected
                          ? 'var(--sage)'
                          : 'var(--border-subtle, rgba(244,240,230,0.08))'

                    }}
                  >

                    <h4
                      className="text-xs font-medium mb-1"
                      style={{
                        color:
                          selected
                            ? 'var(--text-primary)'
                            : 'var(--text-secondary)'
                      }}
                    >
                      {item.name}
                    </h4>

                    <p
                      className="text-[9px] opacity-40 hidden sm:block"
                      style={{
                        color:
                          'var(--text-muted)'
                      }}
                    >
                      {item.desc}
                    </p>

                  </button>

                );

              })}

            </div>

          </section>


          {/* ====================================================
              ACTIONS
          ==================================================== */}

          <div className="pt-6 space-y-6">

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">


              <button
                type="button"
                className="surprise-button flex-1 py-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase cursor-pointer transition-all duration-300"
                onClick={handleSurpriseMe}
                style={{
                  borderColor:
                    'var(--border-subtle)',

                  backgroundColor:
                    'rgba(255,255,255,0.02)'
                }}
              >

                <RefreshCw
                  size={14}
                />

                Surprise Me

              </button>


              <button
                type="button"
                className="enter-button flex-[2] py-4 rounded-xl flex items-center justify-center gap-3 text-xs font-bold tracking-wider uppercase cursor-pointer transition-all duration-300 shadow-xl"
                onClick={handleEnterAtmosphere}
                style={{
                  background:
                    'linear-gradient(135deg, var(--sage), var(--accent-color))',

                  color:
                    'var(--bg-primary)',

                  boxShadow:
                    '0 12px 35px rgba(168, 182, 154, 0.2)'
                }}
              >

                <span>
                  Enter Atmosphere
                </span>

                <ArrowRight
                  size={16}
                />

              </button>

            </div>


            {/* ==================================================
                RECOMMENDED TRACK
            ================================================== */}

            {recommendedTrack && (

              <div
                className="p-4 rounded-2xl border flex items-center justify-between gap-4 backdrop-blur-xl animate-fade-up"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(37, 38, 32, 0.95), rgba(20, 21, 17, 0.98))',

                  borderColor:
                    'rgba(168, 182, 154, 0.3)',

                  boxShadow:
                    '0 15px 40px rgba(0,0,0,0.4)'
                }}
              >


                <div className="flex items-center space-x-3.5 min-w-0">

                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-lg relative group">

                    <img
                      src={recommendedTrack.artwork}
                      alt=""
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">

                      <Volume2
                        size={16}
                        className="text-white"
                      />

                    </div>

                  </div>


                  <div className="min-w-0">

                    <div className="flex items-center gap-2 mb-0.5">

                      <span
                        className="text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded"
                        style={{
                          color:
                            'var(--champagne)',

                          backgroundColor:
                            'rgba(214,184,135,0.1)'
                        }}
                      >
                        AI Matched
                      </span>

                    </div>


                    <h4
                      className="text-xs font-medium truncate"
                      style={{
                        color:
                          'var(--text-primary)'
                      }}
                    >
                      {recommendedTrack.title}
                    </h4>


                    <p
                      className="text-[10px] opacity-50 truncate"
                      style={{
                        color:
                          'var(--text-muted)'
                      }}
                    >
                      {recommendedTrack.artist}
                    </p>

                  </div>

                </div>


                {/* ==================================================
                    IDLE WAVEFORM
                ================================================== */}

                <div
                  className="flex items-center gap-1 flex-shrink-0 px-3 py-2 rounded-xl border"
                  style={{
                    borderColor:
                      'rgba(168, 182, 154, 0.2)',

                    backgroundColor:
                      'rgba(168, 182, 154, 0.05)'
                  }}
                  title="Ready to play"
                >

                  <span className="idle-wave-bar idle-wave-1" />
                  <span className="idle-wave-bar idle-wave-2" />
                  <span className="idle-wave-bar idle-wave-3" />
                  <span className="idle-wave-bar idle-wave-4" />

                </div>


              </div>

            )}

          </div>

        </div>

      </div>

    </main>

  );

};


export default SituationBuilder;