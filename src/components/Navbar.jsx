import React, { useEffect } from 'react';
import {
  Sun,
  Moon,
  Sparkles,
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

          PC VERSION KEPT UNCHANGED
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

        {/* =================================================
            DESKTOP NAVBAR
            md+ ONLY
        ================================================= */}

        <div
          className="
            hidden
            md:flex
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            h-20
            items-center
            justify-between
          "
        >

          {/* =================================================
              DESKTOP LOGO
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

              <Sparkles
                className="
                  w-4
                  h-4
                  relative
                  z-10
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
                style={{
                  color: 'var(--bg-primary)'
                }}
              />

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
                  color: 'var(--text-primary)'
                }}
              >
                Vibe
                <span
                  className="font-normal italic"
                  style={{
                    color: 'var(--champagne)'
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
                  color: 'var(--text-muted)'
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
              DESKTOP THEME SWITCHER
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
            MOBILE NAVBAR
           
            MOBILE ONLY
           
            375px → 428px
           
            Layout:
            Logo | Builder/Studio | Theme
           
            IMPORTANT:
            - No absolute centered navigation
            - No bottom navigation
            - No fixed middle pill
            - Logo remains visible
            - PC version unaffected
        ===================================================== */}

        <div
          className="
            flex
            md:hidden
            h-16
            w-full
            items-center
            gap-2
            px-3
            sm:px-4
          "
        >

          {/* =================================================
              MOBILE LOGO
          ================================================= */}

          <button
            type="button"
            onClick={handleHome}
            className="
              flex
              items-center
              gap-2
              min-w-0
              flex-shrink-0
              bg-transparent
              border-0
              cursor-pointer
              group
            "
            aria-label="Go to VibeSpace home"
          >

            {/* Logo Icon */}

            <div
              className="
                w-9
                h-9
                rounded-xl
                flex
                items-center
                justify-center
                relative
                overflow-hidden
                flex-shrink-0
                transition-transform
                duration-300
                group-active:scale-95
              "
              style={{
                background:
                  'linear-gradient(145deg, var(--sage), var(--surface-soft))',

                border:
                  '1px solid rgba(255,255,255,0.18)',

                boxShadow:
                  '0 7px 20px rgba(168,182,154,0.20)'
              }}
            >

              <Sparkles
                size={15}
                style={{
                  color: 'var(--bg-primary)'
                }}
              />

            </div>


            {/* VibeSpace Name */}

            <div
              className="
                flex
                flex-col
                items-start
                leading-none
                min-w-0
              "
            >

              <span
                className="
                  text-[13px]
                  font-light
                  tracking-tight
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
                  mt-1
                  text-[6px]
                  uppercase
                  tracking-[0.22em]
                  whitespace-nowrap
                  opacity-50
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
              MOBILE BUILDER / STUDIO
          ================================================= */}

          <nav
            className="
              flex
              items-center
              gap-0.5
              p-1
              rounded-full
              border
              flex-1
              min-w-0
              justify-center
              mx-1
              backdrop-blur-xl
            "
            style={{
              backgroundColor:
                'color-mix(in srgb, var(--surface-primary) 94%, transparent)',

              borderColor:
                'var(--border-subtle)',

              boxShadow:
                '0 6px 20px rgba(0,0,0,0.12)'
            }}
          >

            {/* Builder */}

            <button
              type="button"
              onClick={handleHome}
              className="
                flex-1
                min-w-0
                px-2
                sm:px-3
                py-2
                rounded-full
                text-[9px]
                sm:text-[10px]
                transition-all
                duration-300
                whitespace-nowrap
                text-center
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


            {/* Studio */}

            <button
              type="button"
              onClick={() =>
                setCurrentTab('studio')
              }
              className="
                flex-1
                min-w-0
                px-2
                sm:px-3
                py-2
                rounded-full
                text-[9px]
                sm:text-[10px]
                transition-all
                duration-300
                whitespace-nowrap
                text-center
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


          {/* =================================================
              MOBILE THEME SWITCHER
          ================================================= */}

          <button
            type="button"
            onClick={handleThemeToggle}
            className="
              w-9
              h-9
              rounded-xl
              border
              flex
              items-center
              justify-center
              flex-shrink-0
              transition-all
              duration-300
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

            {isDarkMode ? (
              <Sun
                size={14}
                style={{
                  color:
                    'var(--champagne)'
                }}
              />
            ) : (
              <Moon
                size={14}
                style={{
                  color:
                    'var(--sage)'
                }}
              />
            )}

          </button>

        </div>

      </header>
    </>
  );
};

export default Navbar;