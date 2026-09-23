import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, CloudRain, Coffee, Flame, Music, Timer } from 'lucide-react';

export default function PlayerDashboard({ vibe, onReset }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volumes, setVolumes] = useState(vibe?.volumes || { rain: 0.5, coffee: 0.5, fire: 0, lofi: 0.6 });
  const [timerMinutes, setTimerMinutes] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const audioRefs = {
    rain: useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/1255/1255-preview.mp3')),
    coffee: useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/realizations/preview/mixkit-coffee-shop-ambience-441.mp3')),
    fire: useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/preview/mixkit-campfire-crackles-1330.mp3')),
    lofi: useRef(new Audio('https://assets.mixkit.co/music/preview/mixkit-spirit-in-the-woods-139.mp3'))
  };

  useEffect(() => {
    Object.keys(audioRefs).forEach(key => {
      audioRefs[key].current.loop = true;
      audioRefs[key].current.volume = volumes[key] || 0;
      if (volumes[key] > 0) audioRefs[key].current.play().catch(() => {});
    });

    return () => {
      Object.keys(audioRefs).forEach(key => audioRefs[key].current.pause());
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      Object.keys(audioRefs).forEach(key => audioRefs[key].current.pause());
    } else {
      Object.keys(audioRefs).forEach(key => {
        if (volumes[key] > 0) audioRefs[key].current.play().catch(() => {});
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (sound, val) => {
    setVolumes(prev => ({ ...prev, [sound]: val }));
    audioRefs[sound].current.volume = val;
    if (val > 0 && !isPlaying) {
      audioRefs[sound].current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl flex flex-col items-center space-y-6">
      <div className="w-full flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {vibe?.place} • {vibe?.mood}
          </h1>
          <p className="text-xs text-gray-400">Activity: {vibe?.activity}</p>
        </div>
        <button 
          onClick={onReset}
          className="flex items-center space-x-1 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl border border-white/10 transition"
        >
          <RotateCcw size={12} />
          <span>New Vibe</span>
        </button>
      </div>

      {/* Play/Pause Center Button */}
      <button 
        onClick={togglePlay}
        className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-105 transition transform duration-200"
      >
        {isPlaying ? <Pause size={26} /> : <Play size={26} className="translate-x-0.5" />}
      </button>

      {/* Advanced Sound Mixers */}
      <div className="w-full space-y-3 pt-2">
        <div className="flex items-center justify-between bg-black/20 p-3 rounded-2xl border border-white/5">
          <div className="flex items-center space-x-3">
            <CloudRain className="text-blue-400" size={18} />
            <span className="text-xs font-medium">Cozy Rain</span>
          </div>
          <input 
            type="range" min="0" max="1" step="0.05" 
            value={volumes.rain} 
            onChange={(e) => handleVolumeChange('rain', parseFloat(e.target.value))}
            className="w-32 accent-purple-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between bg-black/20 p-3 rounded-2xl border border-white/5">
          <div className="flex items-center space-x-3">
            <Coffee className="text-amber-400" size={18} />
            <span className="text-xs font-medium">Coffee Shop</span>
          </div>
          <input 
            type="range" min="0" max="1" step="0.05" 
            value={volumes.coffee} 
            onChange={(e) => handleVolumeChange('coffee', parseFloat(e.target.value))}
            className="w-32 accent-purple-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between bg-black/20 p-3 rounded-2xl border border-white/5">
          <div className="flex items-center space-x-3">
            <Flame className="text-orange-400" size={18} />
            <span className="text-xs font-medium">Fireplace</span>
          </div>
          <input 
            type="range" min="0" max="1" step="0.05" 
            value={volumes.fire} 
            onChange={(e) => handleVolumeChange('fire', parseFloat(e.target.value))}
            className="w-32 accent-purple-500 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between bg-black/20 p-3 rounded-2xl border border-white/5">
          <div className="flex items-center space-x-3">
            <Music className="text-purple-400" size={18} />
            <span className="text-xs font-medium">Lo-Fi Beats</span>
          </div>
          <input 
            type="range" min="0" max="1" step="0.05" 
            value={volumes.lofi} 
            onChange={(e) => handleVolumeChange('lofi', parseFloat(e.target.value))}
            className="w-32 accent-purple-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}