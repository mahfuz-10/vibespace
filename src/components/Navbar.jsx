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

  // Ensure DOM updates data-theme attribute whenever isDarkMode changes
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

  const handleThemeToggle = () => {
    if (typeof setIsDarkMode === 'function') {
      setIsDarkMode((previous) => !previous);
    } else {
      console.error(
        'setIsDarkMode is not available in AudioContext'
      );
    }
  };

  const handleHome = () => {
    setCurrentTab('builder');
    setHasSubmittedSituation(false);
  };

  return (
    <>
      {/* =====================================================
          DESKTOP / TOP NAVBAR
          PC VERSION UNCHANGED
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
              PC UNCHANGED
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
              PC UNCHANGED
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
      </header>


      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
          
          IMPORTANT:
          - ONLY MOBILE
          - NO top: 50%
          - NO translateY
          - Fixed at bottom
          - Sits ABOVE player
          - Does NOT stay in middle while scrolling
      ===================================================== */}

      <div
        className="
          fixed
          left-1/2
          -translate-x-1/2
          bottom-[96px]
          z-40
          flex
          md:hidden
          items-center
          gap-1.5
          p-1.5
          rounded-full
          border
          backdrop-blur-2xl
          shadow-2xl
        "
        style={{
          width: 'max-content',
          maxWidth: 'calc(100vw - 32px)',
          backgroundColor:
            'color-mix(in srgb, var(--surface-primary) 96%, transparent)',
          borderColor:
            'var(--border-subtle)',
          boxShadow:
            '0 12px 35px rgba(0, 0, 0, 0.35)'
        }}
      >

        {/* =================================================
            BUILDER
        ================================================= */}

        <button
          type="button"
          onClick={handleHome}
          className="
            flex
            items-center
            gap-2
            px-5
            py-2.5
            rounded-full
            text-xs
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
          <Home size={14} />

          <span>
            Builder
          </span>
        </button>


        {/* =================================================
            STUDIO
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            setCurrentTab('studio')
          }
          className="
            flex
            items-center
            gap-2
            px-5
            py-2.5
            rounded-full
            text-xs
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
          <SlidersHorizontal size={14} />

          <span>
            Studio
          </span>
        </button>

      </div>
    </>
  );
};

export default Navbar;