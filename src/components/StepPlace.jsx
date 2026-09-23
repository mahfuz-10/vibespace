import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function StepPlace({ selected, onSelect, onBack }) {
  const places = [
    { name: 'Coffee Shop', icon: '☕' },
    { name: 'Rainy Window', icon: '🌧️' },
    { name: 'Dhaka Night', icon: '🌃' },
    { name: 'Forest Cabin', icon: '🌲' },
    { name: 'Ocean Beach', icon: '🌊' },
    { name: 'Midnight Bedroom', icon: '🌙' },
    { name: 'Quiet Library', icon: '📚' },
    { name: 'Night Drive', icon: '🚗' },
    { name: 'Cozy Fireplace', icon: '🔥' },
    { name: 'Starry Rooftop', icon: '🌌' }
  ];

  return (
    <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl flex flex-col space-y-6 max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition"><ArrowLeft size={16} /></button>
        <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Step 02 of 03</span>
        <div className="w-8"></div>
      </div>

      <div className="text-center -mt-2">
        <h1 className="text-2xl font-bold">Where do you want to be? 🌍</h1>
        <p className="text-xs text-gray-400 mt-1">Choose your cinematic environment</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {places.map((p) => (
          <button
            key={p.name}
            onClick={() => onSelect(p.name)}
            className={`p-3.5 rounded-2xl text-xs font-medium flex items-center space-x-3 border transition ${
              selected === p.name 
                ? 'bg-blue-600/50 border-blue-400 shadow-lg scale-[1.02]' 
                : 'bg-black/20 border-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <span className="text-lg">{p.icon}</span>
            <span className="truncate">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}