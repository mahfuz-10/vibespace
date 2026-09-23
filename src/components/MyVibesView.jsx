import React, { useState, useEffect } from 'react';
import { Play, Trash2, Bookmark, Sparkles } from 'lucide-react';

export default function MyVibesView({ onPlayVibe }) {
  const [savedVibes, setSavedVibes] = useState([]);

  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem('vibespace_saved_vibes') || '[]');
    if (loaded.length === 0) {
      // Default sample vibe
      const defaults = [
        { id: 1, name: 'Rainy Coding', mood: 'Focus', environment: 'Rainy Window', music: 'Midnight Coffee' },
        { id: 2, name: 'Morning Coffee', mood: 'Calm', environment: 'Cozy Coffee Shop', music: 'Quiet Pages' }
      ];
      setSavedVibes(defaults);
      localStorage.setItem('vibespace_saved_vibes', JSON.stringify(defaults));
    } else {
      setSavedVibes(loaded);
    }
  }, []);

  const deleteVibe = (id) => {
    const updated = savedVibes.filter(v => v.id !== id);
    setSavedVibes(updated);
    localStorage.setItem('vibespace_saved_vibes', JSON.stringify(updated));
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-24">
      <div className="flex items-center space-x-3">
        <Bookmark className="text-purple-400" size={28} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Saved Vibes</h1>
          <p className="text-gray-400 text-sm">Your custom atmospheric combinations stored locally.</p>
        </div>
      </div>

      {savedVibes.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 space-y-4">
          <Sparkles className="mx-auto text-gray-500" size={36} />
          <p className="text-gray-400 text-sm">No custom vibes saved yet. Create and save your first vibe from the Explore mixer!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedVibes.map((vibe) => (
            <div key={vibe.id} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-4 shadow-xl hover:border-purple-400/50 transition">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-semibold text-purple-400 uppercase tracking-widest">{vibe.mood} Vibe</span>
                  <h3 className="text-xl font-bold mt-1">{vibe.name}</h3>
                </div>
                <button 
                  onClick={() => deleteVibe(vibe.id)}
                  className="text-gray-500 hover:text-red-400 transition p-2"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="bg-black/30 p-3 rounded-xl text-xs space-y-1 text-gray-300">
                <p>🌍 Environment: <span className="font-semibold text-white">{vibe.environment}</span></p>
                <p>🎧 Featured Track: <span className="font-semibold text-white">{vibe.music}</span></p>
              </div>

              <button
                onClick={() => onPlayVibe(vibe)}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/20 transition"
              >
                <Play size={14} className="fill-white" />
                <span>Play This Vibe</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}