import React, { useState } from 'react';
import { MUSIC_DB, useAudio } from './AudioManager';
import { Play, Pause, Heart } from 'lucide-react';

export const MusicLibrary = () => {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useAudio();
  const [activeMoodTab, setActiveMoodTab] = useState('Focused');

  // Safe check to ensure tracks is always an array
  const tracks = (MUSIC_DB && MUSIC_DB[activeMoodTab]) ? MUSIC_DB[activeMoodTab] : (MUSIC_DB?.Focused || []);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-wide">Music Library</h2>
          <p className="text-sm text-slate-400 mt-1">Explore cinematic audio tracks categorized by mood.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {MUSIC_DB && Object.keys(MUSIC_DB).map(mood => (
            <button
              key={mood}
              onClick={() => setActiveMoodTab(mood)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${activeMoodTab === mood ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'glass-panel text-slate-300 hover:text-white'}`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map(track => {
          const isCurrent = currentTrack?.id === track.id;

          return (
            <div
              key={track.id}
              onClick={() => isCurrent ? togglePlayPause() : playTrack(track)}
              className="group glass-panel-interactive p-4 rounded-2xl flex items-center space-x-4 cursor-pointer"
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-900">
                <img src={track.artwork} alt={track.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${isCurrent && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {isCurrent && isPlaying ? (
                    <Pause className="w-6 h-6 text-cyan-400" />
                  ) : (
                    <Play className="w-6 h-6 text-cyan-400 fill-current ml-0.5" />
                  )}
                </div>
              </div>

              <div className="flex-grow min-w-0">
                <h4 className={`text-sm font-medium truncate ${isCurrent ? 'text-cyan-400' : ''}`}>
                  {track.title}
                </h4>
                <p className="text-xs text-slate-400 truncate mt-0.5">{track.artist}</p>
                <span className="text-[10px] text-slate-500 mt-1 block">{track.duration}</span>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); }}
                className="p-2 text-slate-400 hover:text-pink-500 transition-colors"
              >
                <Heart className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};