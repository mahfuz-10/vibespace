import React from 'react';
import { Sparkles, Radio } from 'lucide-react';

export default function PlayerView({ currentSong, currentMood, currentEnv }) {
  return (
    <div className="w-full max-w-4xl mx-auto text-center space-y-8 pb-24">
      <div className="relative w-64 h-64 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 shadow-2xl shadow-purple-600/30 flex items-center justify-center border border-white/20 animate-pulse">
        <Radio className="text-white" size={64} />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest flex items-center justify-center gap-1">
          <Sparkles size={14} /> Active Atmosphere Session
        </span>
        <h1 className="text-4xl font-extrabold">{currentSong?.title || 'Midnight Coffee'}</h1>
        <p className="text-gray-400 text-sm">{currentSong?.artist || 'VibeSpace Originals'} • Mood: {currentMood || 'Calm'} • Env: {currentEnv || 'Rainy Window'}</p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl max-w-md mx-auto text-xs text-gray-300">
        <p>Use the persistent player at the bottom to control audio playback, volume levels, and ambient mixing layers.</p>
      </div>
    </div>
  );
}