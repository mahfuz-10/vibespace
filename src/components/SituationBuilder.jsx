import React, { useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Check,
  Compass,
  Layers,
  Flame,
  Volume2
} from 'lucide-react';

import { useAudio, MUSIC_DATABASE } from './AudioManager';


/* ============================================================
   OPTIONS WITH ICON VIBES
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
    playTrack,
    setIsPlaying
  } = useAudio();


  /* ==========================================================
     FIND RECOMMENDED TRACK
     ========================================================== */

  const recommendedTrack = useMemo(() => {
    if (!MUSIC_DATABASE || MUSIC_DATABASE.length === 0) return null;

    const exactMatch = MUSIC_DATABASE.find(track =>
      track.situations?.includes(activity) &&
      track.mood === feeling &&
      track.environment === environment
    );
    if (exactMatch) return exactMatch;

    const activityFeelingMatch = MUSIC_DATABASE.find(track =>
      track.situations?.includes(activity) &&
      track.mood === feeling
    );
    if (activityFeelingMatch) return activityFeelingMatch;

    const activityMatch = MUSIC_DATABASE.find(track =>
      track.situations?.includes(activity)
    );
    if (activityMatch) return activityMatch;

    return MUSIC_DATABASE[0];
  }, [activity, feeling, environment]);


  /* ==========================================================
     ACTIONS
     ========================================================== */

  const handleEnterAtmosphere = () => {
    if (recommendedTrack) {
      playTrack(recommendedTrack);
      setIsPlaying(true);
    }
    setHasSubmittedSituation(true);
  };

  const handleSurpriseMe = () => {
    setActivity(ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)].name);
    setFeeling(FEELINGS[Math.floor(Math.random() * FEELINGS.length)].name);
    setEnvironment(ENVIRONMENTS[Math.floor(Math.random() * ENVIRONMENTS.length)].name);
    setIntensity(INTENSITIES[Math.floor(Math.random() * INTENSITIES.length)].name);
  };


  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <main className="min-h-screen px-6 pt-32 pb-40 max-w-7xl mx-auto animate-fade-up">

      {/* ======================================================
          WOW HERO HEADER
      ====================================================== */}
      <section className="text-center max-w-3xl mx-auto mb-20 relative">
        <div className="absolute inset-0 -top-10 bg-radial from-emerald-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border mb-6 backdrop-blur-md"
             style={{ backgroundColor: 'rgba(168, 182, 154, 0.05)', borderColor: 'rgba(168, 182, 154, 0.2)' }}>
          <Sparkles size={13} style={{ color: 'var(--sage)' }} />
          <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'var(--sage)' }}>
            Spatial Architecture & Sound Engine
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-light tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
          Sculpt your <span className="font-normal italic" style={{ color: 'var(--champagne)' }}>atmosphere.</span>
        </h1>

        <p className="text-sm opacity-60 leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
          Immerse your senses in generative soundscapes tuned precisely to your current coordinates, actions, and inner rhythm.
        </p>
      </section>


      {/* ======================================================
          LAYOUT: FLOATING HUD PANEL + CONFIG GRID
      ====================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* ====================================================
            LEFT: LIVE AMBIENT HUD (STICKY PANEL)
        ==================================================== */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div 
            className="p-6 rounded-3xl border relative overflow-hidden transition-all duration-500 hover:shadow-2xl"
            style={{ 
              background: 'linear-gradient(145deg, rgba(37, 38, 32, 0.9), rgba(20, 21, 17, 0.95))',
              borderColor: 'rgba(214, 184, 135, 0.2)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Ambient Pulse Glow in Background */}
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
                 style={{ backgroundColor: 'var(--sage)' }} />

            <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--sage)' }} />
                <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  Live Studio State
                </span>
              </div>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md" style={{ color: 'var(--champagne)', backgroundColor: 'rgba(214, 184, 135, 0.1)' }}>
                Active Session
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-[9px] uppercase tracking-wider block mb-1 opacity-50" style={{ color: 'var(--text-muted)' }}>Primary Focus</span>
                <h3 className="text-2xl font-light tracking-tight" style={{ color: 'var(--champagne)' }}>
                  {activity}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-xl border bg-black/20" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <span className="text-[9px] uppercase tracking-wider block opacity-40 mb-1" style={{ color: 'var(--text-muted)' }}>Vibe</span>
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{feeling}</p>
                </div>
                <div className="p-3 rounded-xl border bg-black/20" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  <span className="text-[9px] uppercase tracking-wider block opacity-40 mb-1" style={{ color: 'var(--text-muted)' }}>Environment</span>
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{environment}</p>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[9px] uppercase tracking-wider opacity-50" style={{ color: 'var(--text-muted)' }}>Spatial Depth</span>
                  <span className="text-[10px] font-mono font-medium" style={{ color: 'var(--sage)' }}>{intensity}</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full transition-all duration-500 rounded-full" 
                       style={{ 
                         width: intensity === 'Quiet' ? '33%' : intensity === 'Balanced' ? '66%' : '100%',
                         backgroundColor: 'var(--sage)' 
                       }} />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/5 flex items-center gap-3 text-[10px]" style={{ color: 'var(--text-muted)' }}>
              <Compass size={13} style={{ color: 'var(--sage)' }} />
              <span>Multi-channel spatial audio calibration ready.</span>
            </div>
          </div>
        </div>


        {/* ====================================================
            RIGHT: SELECTORS & INTERACTIVE CARDS
        ==================================================== */}
        <div className="lg:col-span-8 space-y-14">

          {/* SECTION 01: ACTIVITY */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ color: 'var(--champagne)', backgroundColor: 'rgba(214,184,135,0.1)' }}>01</span>
              <div>
                <h2 className="text-lg font-medium tracking-tight" style={{ color: 'var(--text-primary)' }}>What are you doing?</h2>
                <p className="text-xs opacity-50" style={{ color: 'var(--text-muted)' }}>Select your primary workflow or task state.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ACTIVITIES.map(item => {
                const selected = item.name === activity;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActivity(item.name)}
                    className="p-4 rounded-2xl border text-left transition-all duration-300 group relative flex items-center justify-between overflow-hidden cursor-pointer"
                    style={{
                      backgroundColor: selected ? 'rgba(168, 182, 154, 0.12)' : 'var(--surface-primary)',
                      borderColor: selected ? 'var(--sage)' : 'var(--border-subtle, rgba(244,240,230,0.08))',
                      boxShadow: selected ? '0 8px 30px rgba(168, 182, 154, 0.15)' : '0 4px 20px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-xs font-medium" style={{ color: selected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {item.name}
                      </span>
                    </div>
                    {selected && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center relative z-10" style={{ backgroundColor: 'var(--sage)' }}>
                        <Check size={11} className="text-black font-bold" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>


          {/* SECTION 02: FEELING */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ color: 'var(--champagne)', backgroundColor: 'rgba(214,184,135,0.1)' }}>02</span>
              <div>
                <h2 className="text-lg font-medium tracking-tight" style={{ color: 'var(--text-primary)' }}>How should it feel?</h2>
                <p className="text-xs opacity-50" style={{ color: 'var(--text-muted)' }}>Define the emotional resonance of your soundscape.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEELINGS.map(item => {
                const selected = item.name === feeling;
                return (
                  <button
                    key={item.name}
                    onClick={() => setFeeling(item.name)}
                    className="p-4 rounded-2xl border text-left transition-all duration-300 group relative flex items-center justify-between cursor-pointer"
                    style={{
                      backgroundColor: selected ? 'rgba(168, 182, 154, 0.12)' : 'var(--surface-primary)',
                      borderColor: selected ? 'var(--sage)' : 'var(--border-subtle, rgba(244,240,230,0.08))',
                      boxShadow: selected ? '0 8px 30px rgba(168, 182, 154, 0.15)' : 'none'
                    }}
                  >
                    <div>
                      <h4 className="text-xs font-medium mb-0.5" style={{ color: selected ? 'var(--text-primary)' : 'var(--text-primary)' }}>
                        {item.name}
                      </h4>
                      <p className="text-[10px] opacity-50" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                    </div>
                    {selected && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--sage)' }}>
                        <Check size={11} className="text-black font-bold" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </section>


          {/* SECTION 03: ENVIRONMENT */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ color: 'var(--champagne)', backgroundColor: 'rgba(214,184,135,0.1)' }}>03</span>
              <div>
                <h2 className="text-lg font-medium tracking-tight" style={{ color: 'var(--text-primary)' }}>Where would you rather be?</h2>
                <p className="text-xs opacity-50" style={{ color: 'var(--text-muted)' }}>Anchor your acoustic environment.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ENVIRONMENTS.map(item => {
                const selected = item.name === environment;
                return (
                  <button
                    key={item.name}
                    onClick={() => setEnvironment(item.name)}
                    className="p-3.5 rounded-2xl border text-center transition-all duration-300 cursor-pointer flex flex-col justify-between h-20"
                    style={{
                      backgroundColor: selected ? 'rgba(168, 182, 154, 0.12)' : 'var(--surface-primary)',
                      borderColor: selected ? 'var(--sage)' : 'var(--border-subtle, rgba(244,240,230,0.08))',
                      boxShadow: selected ? '0 8px 30px rgba(168, 182, 154, 0.15)' : 'none'
                    }}
                  >
                    <span className="text-[9px] uppercase tracking-widest opacity-40 font-mono" style={{ color: 'var(--text-muted)' }}>{item.tag}</span>
                    <span className="text-xs font-medium" style={{ color: selected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>


          {/* SECTION 04: INTENSITY */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ color: 'var(--champagne)', backgroundColor: 'rgba(214,184,135,0.1)' }}>04</span>
              <div>
                <h2 className="text-lg font-medium tracking-tight" style={{ color: 'var(--text-primary)' }}>How immersive?</h2>
                <p className="text-xs opacity-50" style={{ color: 'var(--text-muted)' }}>Control sound pressure density.</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {INTENSITIES.map(item => {
                const selected = item.name === intensity;
                return (
                  <button
                    key={item.name}
                    onClick={() => setIntensity(item.name)}
                    className="p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer"
                    style={{
                      backgroundColor: selected ? 'rgba(168, 182, 154, 0.12)' : 'var(--surface-primary)',
                      borderColor: selected ? 'var(--sage)' : 'var(--border-subtle, rgba(244,240,230,0.08))',
                      boxShadow: selected ? '0 8px 30px rgba(168, 182, 154, 0.15)' : 'none'
                    }}
                  >
                    <h4 className="text-xs font-medium mb-1" style={{ color: selected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {item.name}
                    </h4>
                    <p className="text-[9px] opacity-40 hidden sm:block" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </section>


          {/* ====================================================
              ACTION BUTTONS & LIVE PREVIEW CARD
          ==================================================== */}
          <div className="pt-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                className="surprise-button flex-1 py-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase cursor-pointer transition-all duration-300"
                onClick={handleSurpriseMe}
                style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'rgba(255,255,255,0.02)' }}
              >
                <RefreshCw size={14} />
                Surprise Me
              </button>

              <button
                type="button"
                className="enter-button flex-[2] py-4 rounded-xl flex items-center justify-center gap-3 text-xs font-bold tracking-wider uppercase cursor-pointer transition-all duration-300 shadow-xl"
                onClick={handleEnterAtmosphere}
                style={{ 
                  background: 'linear-gradient(135deg, var(--sage), var(--accent-color))',
                  color: 'var(--bg-primary)',
                  boxShadow: '0 12px 35px rgba(168, 182, 154, 0.2)'
                }}
              >
                <span>Enter Atmosphere</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* CURATED MATCH PREVIEW CARD */}
            {recommendedTrack && (
              <div
                className="p-4 rounded-2xl border flex items-center justify-between gap-4 backdrop-blur-xl animate-fade-up"
                style={{
                  background: 'linear-gradient(145deg, rgba(37, 38, 32, 0.95), rgba(20, 21, 17, 0.98))',
                  borderColor: 'rgba(168, 182, 154, 0.3)',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.4)'
                }}
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-lg relative group">
                    <img src={recommendedTrack.artwork} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Volume2 size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded" style={{ color: 'var(--champagne)', backgroundColor: 'rgba(214,184,135,0.1)' }}>
                        AI Matched
                      </span>
                    </div>
                    <h4 className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{recommendedTrack.title}</h4>
                    <p className="text-[10px] opacity-50 truncate" style={{ color: 'var(--text-muted)' }}>{recommendedTrack.artist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 px-3 py-1.5 rounded-xl border text-[10px] font-medium" 
                     style={{ borderColor: 'rgba(168, 182, 154, 0.2)', backgroundColor: 'rgba(168, 182, 154, 0.05)', color: 'var(--sage)' }}>
                  <Sparkles size={12} />
                  <span>Ready to Play</span>
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