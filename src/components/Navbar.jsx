import React, { useEffect } from 'react';
import {
  Sun,
  Moon
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
          TOP NAVBAR
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
            px-3
            sm:px-8
            h-20
            flex
            items-center
            justify-between
            relative
          "
        >

          {/* =================================================
              LOGO / BRAND
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-2
              sm:gap-4
              min-w-0
              flex-shrink-0
              z-20
            "
          >

            <button
              type="button"
              onClick={handleHome}
              className="
                relative
                flex
                items-center
                gap-2.5
                sm:gap-3.5
                cursor-pointer
                group
                bg-transparent
                border-0
                text-left
                min-w-0
                flex-shrink-0
                pb-1
                sm:pb-2
              "
              aria-label="Go to VibeSpace home"
            >

              {/* =============================================
                  ACTUAL VIBESPACE LOGO IMAGE
              ============================================= */}

              <img
                src="/vibespace-logo-transparent.png"
                alt="VibeSpace"
                draggable="false"
                className="
                  h-9
                  sm:h-12
                  w-auto
                  object-contain
                  flex-shrink-0
                  transition-all
                  duration-500
                  ease-out
                  group-hover:scale-105
                "
                style={{
                  filter:
                    'drop-shadow(0 0 10px rgba(168, 182, 154, 0.25)) drop-shadow(0 0 20px rgba(214, 184, 135, 0.12))'
                }}
              />


              {/* =============================================
                  BRAND TEXT (Hidden on mobile to prevent overlap, visible on sm+ screens)
              ============================================= */}

              <div
                className="
                  hidden
                  sm:flex
                  flex-col
                  items-start
                  min-w-0
                "
              >

                <span
                  className="
                    font-light
                    tracking-tight
                    text-sm
                    transition-colors
                    duration-300
                    whitespace-nowrap
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
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    font-mono
                    opacity-60
                    whitespace-nowrap
                  "
                  style={{
                    color:
                      'var(--text-muted)'
                  }}
                >
                  Acoustic World
                </span>

              </div>


              {/* =============================================
                  BOTTOM ANCHOR LINE
              ============================================= */}

              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-px
                  transition-all
                  duration-500
                  group-hover:opacity-70
                "
                style={{
                  width: '90%',
                  opacity: 0.4,
                  background:
                    'linear-gradient(90deg, transparent, var(--champagne), transparent)'
                }}
              />

            </button>


            {/* =================================================
                VERTICAL SEPARATOR
            ================================================= */}

            <span
              className="
                hidden
                md:block
                flex-shrink-0
              "
              style={{
                width: '1px',
                height: '28px',
                background: 'var(--border-subtle)'
              }}
            />

          </div>


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

            {/* BUILDER */}

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


            {/* STUDIO */}

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
              w-9
              h-9
              sm:w-10
              sm:h-10
              rounded-xl
              border
              flex
              items-center
              justify-center
              transition-all
              duration-300
              hover:scale-105
              active:scale-95
              flex-shrink-0
              z-20
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
            z-10
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
                px-2.5
                py-1.5
                sm:px-3
                sm:py-2
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
                px-2.5
                py-1.5
                sm:px-3
                sm:py-2
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