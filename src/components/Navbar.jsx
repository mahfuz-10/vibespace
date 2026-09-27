import React, { useEffect } from 'react';
import {
  Sun,
  Moon,
  SlidersHorizontal,
  Home
} from 'lucide-react';

import { useAudio } from './AudioManager';

export const Navbar = ({
  currentTab,
  setCurrentTab
}) => {
  const {
    isDarkMode,
    setIsDarkMode,
    setHasSubmittedSituation
  } = useAudio();

  /* =========================================================
     THEME
  ========================================================= */

  useEffect(() => {
    const themeValue = isDarkMode ? 'dark' : 'light';

    document.documentElement.setAttribute(
      'data-theme',
      themeValue
    );

    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  /* =========================================================
     THEME TOGGLE
  ========================================================= */

  const handleThemeToggle = () => {
    if (typeof setIsDarkMode === 'function') {
      setIsDarkMode((previous) => !previous);
    } else {
      console.error(
        'setIsDarkMode is not available in AudioContext'
      );
    }
  };

  /* =========================================================
     HOME
  ========================================================= */

  const handleHome = () => {
    setCurrentTab('builder');
    setHasSubmittedSituation(false);
  };

  return (
    <>
      {/* =====================================================
          DESKTOP / TOP NAVBAR
      ===================================================== */}

      <header
        className="
          fixed
          top-0
          left-0
          right-0
          z-50
          border-b
          backdrop-blur-xl
          transition-all
          duration-500
        "
        style={{
          backgroundColor:
            'color-mix(in srgb, var(--bg-primary) 88%, transparent)',
          borderColor:
            'var(--border-subtle)'
        }}
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            h-20
            flex
            items-center
            justify-between
          "
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <button
            type="button"
            onClick={handleHome}
            className="
              flex
              items-center
              gap-3.5
              cursor-pointer
              group
              bg-transparent
              border-0
              text-left
            "
            aria-label="Go to VibeSpace home"
          >

            <div
              className="
                w-10
                h-10
                rounded-2xl
                flex
                items-center
                justify-center
                transition-all
                duration-500
                group-hover:scale-105
                group-hover:rotate-3
                relative
                overflow-hidden
                shadow-lg
              "
              style={{
                background:
                  'linear-gradient(145deg, var(--sage), var(--surface-soft))',

                border:
                  '1px solid rgba(255, 255, 255, 0.2)',

                boxShadow:
                  '0 10px 30px rgba(168, 182, 154, 0.25)'
              }}
            >

              {/* Ambient hover glow */}

              <div
                className="
                  absolute
                  inset-0
                  bg-white/10
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-500
                "
              />

              {/* VIBE WAVE + ENHANCED MUSIC FREQUENCY LOGO SVG */}

              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                {/* Circular Open Arc / Sound Orbit */}
                <path d="M19.07 4.93C21.9 7.76 22.1 12.3 19.6 15.3M4.93 19.07C2.1 16.24 1.9 11.7 4.4 8.7M17.66 6.34C19.55 8.23 19.68 11.23 18.02 13.28" stroke="url(#paint_arc)" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
                
                {/* Enhanced Music Frequency / Audio Wave Lines */}
                <path d="M7 14V10" stroke="url(#paint_waves)" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M10 17V7" stroke="url(#paint_waves)" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M13 15V9" stroke="url(#paint_waves)" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M16 16V8" stroke="url(#paint_waves)" strokeWidth="1.8" strokeLinecap="round" />

                {/* Micro Sound Node / Beat Dot */}
                <circle cx="10" cy="19" r="0.8" fill="var(--champagne, #D6B887)" />
                <circle cx="16" cy="18" r="0.8" fill="var(--champagne, #D6B887)" />

                <defs>
                  <linearGradient id="paint_arc" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--sage, #A8B69A)" />
                    <stop offset="1" stopColor="var(--champagne, #D6B887)" />
                  </linearGradient>
                  <linearGradient id="paint_waves" x1="7" y1="7" x2="16" y2="17" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--sage, #A8B69A)" />
                    <stop offset="1" stopColor="var(--champagne, #D6B887)" />
                  </linearGradient>
                </defs>
              </svg>

            </div>


            <div className="flex flex-col items-start">

              <span
                className="
                  font-light
                  tracking-tight
                  text-sm
                  transition-colors
                  duration-300
                "
                style={{
                  color:
                    'var(--text-primary)'
                }}
              >
                Vibe
                <span
                  className="font-normal italic"
                  style={{
                    color:
                      'var(--champagne)'
                  }}
                >
                  Space
                </span>
              </span>


              <span
                className="
                  hidden
                  sm:block
                  text-[8px]
                  uppercase
                  tracking-[0.25em]
                  font-mono
                  opacity-60
                "
                style={{
                  color:
                    'var(--text-muted)'
                }}
              >
                Acoustic World
              </span>

            </div>

          </button>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav
            className="
              hidden
              md:flex
              items-center
              gap-1
              p-1
              rounded-full
              border
            "
            style={{
              borderColor:
                'var(--border-subtle)',

              backgroundColor:
                'var(--surface-primary)'
            }}
          >

            <button
              type="button"
              onClick={() =>
                setCurrentTab('builder')
              }
              className={`
                px-4
                py-2
                rounded-full
                text-xs
                transition-all
                duration-300

                ${
                  currentTab === 'builder'
                    ? 'font-medium'
                    : 'opacity-55 hover:opacity-100'
                }
              `}
              style={
                currentTab === 'builder'
                  ? {
                      backgroundColor:
                        'var(--text-primary)',

                      color:
                        'var(--bg-primary)'
                    }
                  : {
                      color:
                        'var(--text-muted)'
                    }
              }
            >
              Situation Builder
            </button>


            <button
              type="button"
              onClick={() =>
                setCurrentTab('studio')
              }
              className={`
                px-4
                py-2
                rounded-full
                text-xs
                transition-all
                duration-300

                ${
                  currentTab === 'studio'
                    ? 'font-medium'
                    : 'opacity-55 hover:opacity-100'
                }
              `}
              style={
                currentTab === 'studio'
                  ? {
                      backgroundColor:
                        'var(--text-primary)',

                      color:
                        'var(--bg-primary)'
                    }
                  : {
                      color:
                        'var(--text-muted)'
                    }
              }
            >
              Atmosphere Studio
            </button>

          </nav>


          {/* =================================================
              THEME SWITCHER
          ================================================= */}

          <button
            type="button"
            onClick={handleThemeToggle}
            className="
              relative
              w-10
              h-10
              rounded-xl
              border
              flex
              items-center
              justify-center
              transition-all
              duration-300
              hover:scale-105
              active:scale-95
            "
            style={{
              borderColor:
                'var(--border-subtle)',

              backgroundColor:
                'var(--surface-primary)'
            }}
            aria-label={
              isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >

            <span className="relative z-10">

              {isDarkMode ? (
                <Sun
                  className="w-4 h-4"
                  style={{
                    color:
                      'var(--champagne)'
                  }}
                />
              ) : (
                <Moon
                  className="w-4 h-4"
                  style={{
                    color:
                      'var(--sage)'
                  }}
                />
              )}

            </span>

          </button>

        </div>


        {/* =====================================================
            MOBILE NAVIGATION
        ===================================================== */}

        <div
          className="
            md:hidden
            absolute
            inset-y-0
            left-1/2
            -translate-x-1/2
            flex
            items-center
            pointer-events-none
          "
        >

          <nav
            className="
              pointer-events-auto
              flex
              items-center
              gap-0.5
              p-1
              rounded-full
              border
              backdrop-blur-xl
              whitespace-nowrap
            "
            style={{
              backgroundColor:
                'color-mix(in srgb, var(--surface-primary) 94%, transparent)',

              borderColor:
                'var(--border-subtle)',

              boxShadow:
                '0 8px 24px rgba(0, 0, 0, 0.14)'
            }}
          >

            <button
              type="button"
              onClick={handleHome}
              className="
                px-3
                py-2
                rounded-full
                text-[10px]
                transition-all
                duration-300
                whitespace-nowrap
              "
              style={
                currentTab === 'builder' ||
                currentTab === 'result'
                  ? {
                      backgroundColor:
                        'var(--text-primary)',

                      color:
                        'var(--bg-primary)',

                      fontWeight: 500
                    }
                  : {
                      color:
                        'var(--text-muted)',

                      backgroundColor:
                        'transparent'
                    }
              }
            >
              Builder
            </button>


            <button
              type="button"
              onClick={() =>
                setCurrentTab('studio')
              }
              className="
                px-3
                py-2
                rounded-full
                text-[10px]
                transition-all
                duration-300
                whitespace-nowrap
              "
              style={
                currentTab === 'studio'
                  ? {
                      backgroundColor:
                        'var(--text-primary)',

                      color:
                        'var(--bg-primary)',

                      fontWeight: 500
                    }
                  : {
                      color:
                        'var(--text-muted)',

                      backgroundColor:
                        'transparent'
                    }
              }
            >
              Studio
            </button>

          </nav>

        </div>

      </header>
    </>
  );
};

export default Navbar;