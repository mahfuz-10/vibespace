import React from 'react';
import { Smile } from 'lucide-react';

export default function StepMood({ selected, onSelect }) {
  const moods = [
    { name: 'Chill', icon: '😌' },
    { name: 'Deep Focus', icon: '🎯' },
    { name: 'Sleepy', icon: '😴' },
    { name: 'Melancholic', icon: '🌧️' },
    { name: 'Energetic', icon: '⚡' },
    { name: 'Romantic', icon: '❤️' },
    { name: 'Peaceful', icon: '🌙' },
    { name: 'Study Mode', icon: '📚' }
  ];

  return (
    <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl flex flex-col space-y-6">
      <div className="text-center">
        <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">Step 01 of 03</span>
        <h1 className="text-2xl font-bold mt-1">How do you feel? 🧠</h1>
        <p className="text-xs text-gray-400 mt-1">Select your current mood</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {moods.map((m) => (
          <button
            key={m.name}
            onClick={() => onSelect(m.name)}
            className={`p-4 rounded-2xl text-sm font-medium flex items-center space-x-3 border transition ${
              selected === m.name 
                ? 'bg-purple-600/50 border-purple-400 shadow-lg scale-[1.02]' 
                : 'bg-black/20 border-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <span className="text-xl">{m.icon}</span>
            <span>{m.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}