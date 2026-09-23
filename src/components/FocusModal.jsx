import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Timer } from 'lucide-react';

export default function FocusModal({ onClose }) {
  const [minutes, setMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      alert('Focus session complete! 🎉');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const setTimerPreset = (mins) => {
    setMinutes(mins);
    setTimeLeft(mins * 60);
    setIsActive(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-white/20 p-8 rounded-3xl max-w-md w-full relative space-y-6 shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white"><X size={20} /></button>
        
        <div className="text-center space-y-1">
          <Timer className="mx-auto text-purple-400" size={32} />
          <h2 className="text-2xl font-bold">Focus Timer</h2>
          <p className="text-xs text-gray-400">Stay in the zone with ambient soundscapes</p>
        </div>

        <div className="flex justify-center space-x-2">
          {[25, 50, 90].map((m) => (
            <button
              key={m}
              onClick={() => setTimerPreset(m)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                minutes === m ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {m} min
            </button>
          ))}
        </div>

        <div className="text-5xl font-mono font-bold text-center tracking-wider py-4 bg-black/40 rounded-2xl border border-white/5">
          {formatTime(timeLeft)}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-purple-600/30 transition"
          >
            {isActive ? <Pause size={16} /> : <Play size={16} />}
            <span>{isActive ? 'Pause' : 'Start Focus'}</span>
          </button>
          <button
            onClick={() => setTimerPreset(minutes)}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}