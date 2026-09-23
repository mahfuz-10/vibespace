import React, { useState } from 'react';
import { Play, Pause, Heart, Volume2, CloudRain, Coffee, Flame, Wind, Waves, Trees, Car, Radio, Sparkles } from 'lucide-react';

export default function ExploreView({ currentSong, isPlaying, onPlaySong, volumes, onVolumeChange, onSaveVibe }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Lo-Fi', 'Piano', 'Ambient', 'Jazz', 'Acoustic', 'Classical', 'Sleep', 'Focus', 'Chill', 'Nature'];

  const songs = [
    { id: 1, title: 'Midnight Coffee', artist: 'VibeSpace Originals', category: 'Lo-Fi', duration: '3:45', url: 'https://assets.mixkit.co/music/preview/mixkit-spirit-in-the-woods-139.mp3' },
    { id: 2, title: 'Rain on Glass', artist: 'Atmospheric Labs', category: 'Ambient', duration: '4:12', url: 'https://assets.mixkit.co/music/preview/mixkit-deep-urban-623.mp3' },
    { id: 3, title: 'Neon Dreams', artist: 'Cyber Chill', category: 'Lo-Fi', duration: '3:20', url: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3' },
    { id: 4, title: 'Quiet Pages', artist: 'Library Sessions', category: 'Acoustic', duration: '5:01', url: 'https://assets.mixkit.co/music/preview/mixkit-delightful-5.mp3' },
    { id: 5, title: 'Moonlit Piano', artist: 'Classical Vibe', category: 'Piano', duration: '4:30', url: 'https://assets.mixkit.co/music/preview/mixkit-a-very-happy-christmas-897.mp3' },
    { id: 6, title: 'Late Night Drive', artist: 'Night Owl', category: 'Chill', duration: '3:55', url: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3' }
  ];

  const filteredSongs = selectedCategory === 'All' ? songs : songs.filter(s => s.category === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Explore Library</h1>
        <p className="text-gray-400 text-sm">Browse curated music streams and fine-tune your atmosphere mixer.</p>
      </div>

      {/* Music Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Radio className="text-purple-400" size={24} /> Music for your mood
          </h2>
          {/* Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Songs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSongs.map((song) => {
            const isCurrent = currentSong?.id === song.id;
            return (
              <div 
                key={song.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center justify-between hover:bg-white/10 transition group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition">
                    {song.title[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{song.title}</h3>
                    <p className="text-xs text-gray-400">{song.artist} • {song.duration}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => onPlaySong(song)}
                    className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-md transition"
                  >
                    {isCurrent && isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Atmosphere Mixer Section */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl space-y-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CloudRain className="text-blue-400" size={24} /> Atmosphere Mixer
            </h2>
            <p className="text-xs text-gray-400 mt-1">Blend multiple ambient sound layers simultaneously</p>
          </div>
          <button
            onClick={onSaveVibe}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-blue-500/20 transition"
          >
            Save as Vibe 💾
          </button>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { key: 'rain', name: 'Rain', icon: CloudRain, color: 'text-blue-400' },
            { key: 'coffee', name: 'Coffee Shop', icon: Coffee, color: 'text-amber-400' },
            { key: 'fire', name: 'Fireplace', icon: Flame, color: 'text-orange-400' },
            { key: 'wind', name: 'Wind', icon: Wind, color: 'text-teal-400' },
            { key: 'ocean', name: 'Ocean Waves', icon: Waves, color: 'text-cyan-400' },
            { key: 'forest', name: 'Forest Birds', icon: Trees, color: 'text-emerald-400' },
            { key: 'traffic', name: 'Night Drive', icon: Car, color: 'text-purple-400' },
          ].map((item) => {
            const Icon = item.icon;
            const val = volumes[item.key] || 0;
            return (
              <div key={item.key} className="bg-black/30 border border-white/5 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Icon className={item.color} size={18} />
                    <span className="text-xs font-medium">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400">{Math.round(val * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={val}
                  onChange={(e) => onVolumeChange(item.key, parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}