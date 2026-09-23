import React, { useState } from 'react';
import { X, Moon, Heart } from 'lucide-react';

export default function SleepModal({ onClose }) {
  const [selectedDuration, setSelectedDuration] = useState(60);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/20 p-8 rounded-3xl max-w-md w-full relative space-y-6 shadow-2xl text-center">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X size={20} /></button>
        
        <Moon className="mx-auto text-indigo-400 animate-pulse" size={36} />
        <div>
          <h2 className="text-2xl font-bold">Sleep Mode & Fade Out</h2>
          <p className="text-xs text-gray-400 mt-1">Audio volume will gradually fade out before stopping.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[30, 60, 90, 120].map((mins) => (
            <button
              key={mins}
              onClick={() => setSelectedDuration(mins)}
              className={`p-3 rounded-xl text-xs font-semibold border transition ${
                selectedDuration === mins
                  ? 'bg-indigo-600/50 border-indigo-400 text-white shadow-lg'
                  : 'bg-black/20 border-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {mins} minutes
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            alert(`Sleep timer set for ${selectedDuration} minutes with Auto Fade Out.`);
            onClose();
          }}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 transition"
        >
          Enable Sleep Session 🌙
        </button>
      </div>
    </div>
  );
}