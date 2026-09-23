import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './VibeIntro.css';

const INTRO_KEY = 'vibespace-intro-seen';

export default function VibeIntro({ onEnter }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);

  const handleEnter = () => {
    setLeaving(true);

    setTimeout(() => {
      sessionStorage.setItem(INTRO_KEY, 'true');

      if (onEnter) {
        onEnter();
      }
    }, 850);
  };

  return (
    <div
      className={`vibe-intro ${
        visible ? 'is-visible' : ''
      } ${leaving ? 'is-leaving' : ''}`}
    >
      {/* Cinematic Ambient Glow */}
      <div className="vibe-intro-glow vibe-intro-glow-one" />
      <div className="vibe-intro-glow vibe-intro-glow-two" />

      <div className="vibe-intro-grain" />

      <main className="vibe-intro-content flex flex-col items-center text-center">

        {/* Editorial Sub-heading / Manifesto Eyebrow */}
        <div className="tracking-[0.25em] font-mono text-[9px] uppercase mb-5 opacity-60" style={{ color: 'var(--champagne)' }}>
          [ SOUND & ARCHITECTURE ]
        </div>

        <div className="vibe-intro-brand tracking-[0.4em] font-light text-xs sm:text-sm mb-6" style={{ color: 'var(--text-primary)' }}>
          V I B E S P A C E
        </div>

        <div className="vibe-intro-line" />

        <h1 className="tracking-tight font-light max-w-2xl">
          Find the sound
          <br />
          for your <em className="font-normal italic" style={{ color: 'var(--champagne)' }}>moment.</em>
        </h1>

        <p className="opacity-60 leading-relaxed max-w-md mt-4 text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
          Music, ambience, and atmosphere — shaped around where you are right now.
        </p>

        {/* Ultra-Clean Editorial Enter Button */}
        <button
          type="button"
          className="group relative mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-full border transition-all duration-500 cursor-pointer overflow-hidden"
          onClick={handleEnter}
          style={{
            borderColor: 'rgba(244, 240, 230, 0.15)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Subtle Hover fill background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--sage)] to-[var(--champagne)] opacity-0 group-hover:opacity-15 transition-opacity duration-500" />

          <span className="relative z-10 text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--text-primary)' }}>
            Enter Experience
          </span>

          <span className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" 
               style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)', color: 'var(--champagne)' }}>
            <ArrowUpRight size={13} />
          </span>
        </button>

      </main>

      <div className="vibe-intro-footer opacity-40 font-mono text-[9px] tracking-[0.3em] uppercase">
        <span>GENERATIVE ACOUSTIC ENVIRONMENT</span>
      </div>

    </div>
  );
}