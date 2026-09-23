import React, { useState } from 'react';
import { useAudio, MUSIC_DB } from './AudioManager';
import { Play, Sparkles, Check, Compass } from 'lucide-react';

const MOODS = ['Calm', 'Focused', 'Sleepy', 'Energetic', 'Romantic', 'Melancholic', 'Happy', 'Dreamy'];
const ACTIVITIES = ['Studying', 'Coding', 'Working', 'Reading', 'Relaxing', 'Sleeping', 'Creating', 'Driving', 'Chilling'];
const ENVIRONMENTS = [
  { id: 'coffee', title: 'Cozy Coffee Shop', desc: 'Muffled chatter, warm cups and ambient chords', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop', theme: 'coffee' },
  { id: 'rain', title: 'Rainy Window', desc: 'Gentle raindrops against glass and cozy atmosphere', image: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=800&auto=format&fit=crop', theme: 'rain' },
  { id: 'night-drive', title: 'Night Drive', desc: 'Neon reflections, synth hums and solitude', image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop', theme: 'night-drive' },
  { id: 'forest', title: 'Forest Cabin', desc: 'Rustling pines, distant wildlife and serenity', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop', theme: 'forest' },
  { id: 'ocean', title: 'Ocean Waves', desc: 'Rhythmic tides and crisp coastal breeze', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop', theme: 'ocean' },
  { id: 'fireplace', title: 'Fireplace', desc: 'Crackling embers and hearth warmth', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop', theme: 'fireplace' },
  { id: 'library', title: 'Quiet Library', desc: 'Turning pages and focused silence', image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop', theme: 'sleep' },
  { id: 'rooftop', title: 'Starry Rooftop', desc: 'Open night breeze and distant city lights', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop', theme: 'night-drive' },
];

export const HeroSection = () => {
  const {
    selectedMood, setSelectedMood,
    selectedActivity, setSelectedActivity,
    selectedEnvironment, setSelectedEnvironment,
    setEnvironmentTheme, playTrack, saveCurrentVibe
  } = useAudio();

  const [selectedMusic, setSelectedMusic] = useState(null);
  const [vibeNameInput, setVibeNameInput] = useState('');
  const [vibeActivated, setVibeActivated] = useState(false);

  // Safe fallback to prevent undefined map error
  const availableMusicList = (selectedMood && MUSIC_DB[selectedMood]) ? MUSIC_DB[selectedMood] : (MUSIC_DB.Focused || []);

  const handleEnterVibe = () => {
    if (selectedMusic) {
      playTrack(selectedMusic);
    }
    if (vibeNameInput.trim()) {
      saveCurrentVibe(vibeNameInput.trim());
    } else {
      saveCurrentVibe(`${selectedEnvironment || 'Custom'} Vibe`);
    }
    setVibeActivated(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-28 pb-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Build Your Personal Atmosphere</span>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-4">
          Tailor your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">vibe space.</span>
        </h1>
        <p className="text-slate-400 text-base font-light">
          Manually select your mood, activity, environment, and soundscapes to create your world.
        </p>
      </div>

      {/* STEP 1: MOOD */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">1</span>
          <span>What are you in the mood for?</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MOODS.map(mood => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`p-4 rounded-2xl border text-sm font-medium transition-all duration-300 flex items-center justify-between ${selectedMood === mood ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'glass-panel border-white/5 hover:border-white/20'}`}
            >
              <span>{mood}</span>
              {selectedMood === mood && <Check className="w-4 h-4 text-cyan-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 2: ACTIVITY */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">2</span>
          <span>What are you doing?</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {ACTIVITIES.map(act => (
            <button
              key={act}
              onClick={() => setSelectedActivity(act)}
              className={`p-4 rounded-2xl border text-sm font-medium transition-all duration-300 flex items-center justify-between ${selectedActivity === act ? 'bg-violet-500/20 border-violet-400 text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.2)]' : 'glass-panel border-white/5 hover:border-white/20'}`}
            >
              <span>{act}</span>
              {selectedActivity === act && <Check className="w-4 h-4 text-violet-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 3: ENVIRONMENT */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">3</span>
          <span>Where do you want to be?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ENVIRONMENTS.map(env => (
            <div
              key={env.id}
              onClick={() => {
                setSelectedEnvironment(env.title);
                setEnvironmentTheme(env.theme);
              }}
              className={`group relative h-64 rounded-3xl overflow-hidden cursor-pointer border transition-all duration-500 ${selectedEnvironment === env.title ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)] scale-[1.02]' : 'border-white/10 hover:border-white/30'}`}
            >
              <img src={env.image} alt={env.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-white">{env.title}</h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">{env.desc}</p>
                {selectedEnvironment === env.title && (
                  <span className="mt-3 inline-flex items-center text-xs font-medium text-cyan-400 space-x-1">
                    <Check className="w-3.5 h-3.5" /> <span>Environment Active</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 4: MUSIC */}
      <div className="mb-14">
        <h2 className="text-xl font-semibold mb-2 flex items-center space-x-2">
          <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs">4</span>
          <span>Select Music Track</span>
        </h2>
        <p className="text-xs text-slate-400 mb-4">Recommended based on mood: <strong className="text-cyan-400">{selectedMood || 'Focused'}</strong></p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableMusicList.map(track => {
            const isSelected = selectedMusic?.id === track.id;
            return (
              <div
                key={track.id}
                onClick={() => setSelectedMusic(track)}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center space-x-4 transition-all duration-300 ${isSelected ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'glass-panel border-white/5 hover:border-white/20'}`}
              >
                <img src={track.artwork} alt={track.title} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-grow min-w-0">
                  <h4 className="text-sm font-medium truncate">{track.title}</h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{track.artist}</p>
                  <span className="text-[10px] text-cyan-400 mt-1 block">{track.duration}</span>
                </div>
                {isSelected && <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* VIBE BUILDER SUMMARY */}
      <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/90 to-[#050816]/90 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3">
          <Compass className="w-6 h-6 text-cyan-400" />
          <span>Your Custom Vibe Summary</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-slate-400 text-xs block">Mood</span>
            <span className="font-semibold">{selectedMood || 'Not Selected'}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-slate-400 text-xs block">Activity</span>
            <span className="font-semibold">{selectedActivity || 'Not Selected'}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-slate-400 text-xs block">Environment</span>
            <span className="font-semibold">{selectedEnvironment || 'Not Selected'}</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-slate-400 text-xs block">Track</span>
            <span className="font-semibold truncate block">{selectedMusic?.title || 'None'}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <input
            type="text"
            placeholder="Name your vibe (e.g., Late Night Coding)"
            value={vibeNameInput}
            onChange={(e) => setVibeNameInput(e.target.value)}
            className="w-full sm:w-80 px-4 py-3 rounded-xl bg-slate-950/60 border border-white/10 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition"
          />
          <button
            onClick={handleEnterVibe}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-600 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>ENTER VIBE</span>
          </button>
        </div>

        {vibeActivated && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm text-center">
            ✨ Vibe Activated & Saved successfully! Enjoy your immersive atmosphere.
          </div>
        )}
      </div>
    </div>
  );
};