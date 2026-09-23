import React from 'react';
import { useAudio } from './AudioManager';
import { CloudRain, Coffee, Flame, Wind, Waves, Trees, Zap, Car, VolumeX, Volume2 } from 'lucide-react';

const iconMap = { CloudRain, Coffee, Flame, Wind, Waves, Trees, Zap, Car };

export const AtmosphereMixer = () => {
  const { ambientLayers, setAmbientVolume, toggleAmbientMute, masterVolume, setMasterVolume } = useAudio();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
      <div className="glass-panel p-8 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-wide text-white">Atmosphere Studio</h2>
            <p className="text-sm text-slate-400 mt-1">Blend multiple ambient soundscapes simultaneously with live volume control.</p>
          </div>
          
          {/* Master Volume */}
          <div className="flex items-center space-x-3 bg-slate-950/60 px-4 py-2.5 rounded-2xl border border-white/10">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-medium text-slate-300">Master Volume: {Math.round(masterVolume * 100)}%</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={masterVolume}
              onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
              className="w-24 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ambientLayers.map(layer => {
            const IconComponent = iconMap[layer.icon] || CloudRain;
            const percentage = Math.round(layer.volume * 100);

            return (
              <div key={layer.id} className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col justify-between hover:border-white/20 transition">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${layer.volume > 0 && !layer.isMuted ? 'bg-cyan-500/20 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.2)]' : 'bg-slate-900 text-slate-500'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white">{layer.name}</span>
                      <p className="text-xs text-cyan-400">{percentage}%</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleAmbientMute(layer.id)}
                    className={`p-2 rounded-lg text-xs transition-colors ${layer.isMuted ? 'text-pink-400 bg-pink-500/10' : 'text-slate-400 hover:text-white'}`}
                  >
                    {layer.isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={layer.isMuted ? 0 : layer.volume}
                  onChange={(e) => setAmbientVolume(layer.id, parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};