import React from 'react';
import { X, Sparkles, Play } from 'lucide-react';

export default function SurpriseModal({ onClose, onApplySurprise }) {
  const surprise = {
    mood: 'Dreamy',
    environment: 'Starry Rooftop',
    music: 'Moonlit Piano',
    ambient: 'Rain + Wind'
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/20 p-8 rounded-3xl max-w-md w-full relative space-y-6 shadow-2xl text-center">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X size={20} /></button>
        
        <div className="inline-flex p-3 bg-purple-600/20 border border-purple-400/30 rounded-2xl text-purple-400">
          <Sparkles size={28} />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold">Tonight's Random Vibe</h2>
          <p className="text-xs text-gray-400 mt-1">Generated exclusively for your current mood.</p>
        </div>

        <div className="bg-black/40 p-5 rounded-2xl border border-white/10 text-left space-y-2 text-xs text-gray-300">
          <p>🌙 Environment: <span className="font-semibold text-white">{surprise.environment}</span></p>
          <p>🎧 Featured Track: <span className="font-semibold text-white">{surprise.music}</span></p>
          <p>🍃 Ambient Mix: <span className="font-semibold text-white">{surprise.ambient}</span></p>
          <p>✨ Mood: <span className="font-semibold text-white">{surprise.mood}</span></p>
        </div>

        <button
          onClick={() => {
            onApplySurprise(surprise);
            onClose();
          }}
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:opacity-90 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-xl shadow-purple-600/30 transition"
        >
          <Play size={16} className="fill-white" />
          <span>Enter This Vibe ✦</span>
        </button>
      </div>
    </div>
  );
}