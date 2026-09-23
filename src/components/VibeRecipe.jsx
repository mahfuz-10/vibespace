import React from 'react';
import { ArrowLeft, Play, Sparkles } from 'lucide-react';

export default function VibeRecipe({ mood, place, activity, onStart, onBack }) {
  
  const handleStartVibe = () => {
    // Generate custom sound levels based on selections
    const vibeData = {
      mood,
      place,
      activity,
      volumes: {
        rain: place.includes('Rain') ? 0.8 : 0.2,
        coffee: place.includes('Coffee') ? 0.7 : 0.1,
        fire: place.includes('Fire') ? 0.6 : 0,
        lofi: activity === 'Coding' || activity === 'Studying' ? 0.7 : 0.4
      }
    };
    onStart(vibeData);
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition"><ArrowLeft size={16} /></button>
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest flex items-center gap-1">
          <Sparkles size={14} /> Vibe Recipe
        </span>
        <div className="w-8"></div>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-purple-400 bg-clip-text text-transparent">
          {place} + {mood}
        </h1>
        <p className="text-xs text-gray-400 mt-1">Optimized for {activity}</p>
      </div>

      {/* Recipe breakdown card */}
      <div className="bg-black/30 p-5 rounded-2xl border border-white/10 space-y-3 text-sm">
        <div className="flex justify-between text-gray-300">
          <span>🎧 Music Genre:</span>
          <span className="font-semibold text-purple-300">Lo-Fi & Ambient Mix</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>🌧️ Ambient Layers:</span>
          <span className="font-semibold text-blue-300">Rain, Café & Vinyl</span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>🎨 Visual Theme:</span>
          <span className="font-semibold text-emerald-300">Cinematic Dark Glow</span>
        </div>
      </div>

      <button
        onClick={handleStartVibe}
        className="w-full py-4 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition"
      >
        <Play size={18} className="fill-white" />
        <span>Start Vibe Session 🚀</span>
      </button>
    </div>
  );
}