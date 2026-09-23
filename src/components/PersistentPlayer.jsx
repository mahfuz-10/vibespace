import React, { useState } from 'react';
import { useAudio } from './AudioManager';
import { Play, Pause, SkipBack, SkipForward, Volume2, Moon } from 'lucide-react';

export const PersistentPlayer = () => {
  const {
    currentTrack, isPlaying, togglePlayPause, nextTrack, prevTrack,
    currentTime, duration, seekTo, volume, setVolume
  } = useAudio();

  const [showTimer, setShowTimer] = useState(false);
  const [timerMins, setTimerMins] = useState(null);

  React.useEffect(() => {
    if (!timerMins) return;
    const timer = setTimeout(() => {
      if (isPlaying) togglePlayPause();
      setTimerMins(null);
    }, timerMins * 60 * 1000);
    return () => clearTimeout(timer);
  }, [timerMins, isPlaying]);

  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const mins = Math.floor(secs / 60);
    const remain = Math.floor(secs % 60);
    return `${mins}:${remain < 10 ? '0' : ''}${remain}`;
  };

  // Helper for dynamic gradient fill on range sliders
  const getSliderBg = (val, max = 100) => {
    const pct = max > 0 ? (val / max) * 100 : 0;
    return `linear-gradient(to right, var(--sage) ${pct}%, var(--border-subtle, rgba(244,240,230,0.15)) ${pct}%)`;
  };

  if (!currentTrack) return null;

  const isSpinning = isPlaying;

  return (
    <>
      <div className="fixed bottom-6 left-6 right-6 max-w-3xl mx-auto z-50">
        <div 
          className="border rounded-2xl p-3.5 shadow-2xl flex items-center justify-between gap-4 backdrop-blur-md" 
          style={{ 
            backgroundColor: 'var(--bg-primary)', 
            borderColor: 'var(--border-subtle)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div className="flex items-center space-x-3 min-w-0">
            <div 
              className="w-10 h-10 overflow-hidden flex-shrink-0 transition-all duration-300"
              style={{ borderRadius: isSpinning ? '50%' : '8px' }}
            >
              <img 
                src={currentTrack.artwork} 
                alt="" 
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isSpinning ? 'vinyl-spinning' : ''
                }`}
                style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
              />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{currentTrack.title}</h4>
              <p className="text-[10px] opacity-50 truncate" style={{ color: 'var(--text-muted)' }}>{currentTrack.artist}</p>
            </div>
          </div>

          <div className="flex flex-col items-center flex-grow max-w-xs">
            <div className="flex items-center space-x-4 mb-1">
              <button onClick={prevTrack} className="opacity-50 hover:opacity-100 transition" style={{ color: 'var(--text-primary)' }}>
                <SkipBack className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={togglePlayPause}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-105 transition shadow-sm"
                style={{ backgroundColor: 'var(--sage)', color: 'var(--bg-primary)' }}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>
              <button onClick={nextTrack} className="opacity-50 hover:opacity-100 transition" style={{ color: 'var(--text-primary)' }}>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Progress Bar with Dynamic Gradient Fill */}
            <div className="flex items-center space-x-2 w-full text-[9px] opacity-60 font-mono" style={{ color: 'var(--text-muted)' }}>
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                className="w-full h-1 rounded appearance-none cursor-pointer studio-slider"
                style={{
                  background: getSliderBg(currentTime, duration || 100),
                  accentColor: 'var(--sage)'
                }}
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-3.5 h-3.5 opacity-50" style={{ color: 'var(--text-muted)' }} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 rounded appearance-none cursor-pointer studio-slider"
                style={{
                  background: getSliderBg(volume * 100, 100),
                  accentColor: 'var(--sage)'
                }}
              />
            </div>
            <button onClick={() => setShowTimer(!showTimer)} className="opacity-50 hover:opacity-100 transition" style={{ color: 'var(--text-primary)' }}>
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {showTimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="border rounded-2xl p-6 w-64 text-center shadow-2xl" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-subtle)' }}>
            <h3 className="text-xs font-medium mb-3" style={{ color: 'var(--text-primary)' }}>Session Sleep Timer</h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[30, 60, 90, 120].map(mins => (
                <button
                  key={mins}
                  onClick={() => { setTimerMins(mins); setShowTimer(false); }}
                  className="py-2 rounded-xl text-[11px] border transition hover:bg-opacity-10 hover:bg-white"
                  style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                >
                  {mins} mins
                </button>
              ))}
            </div>
            <button onClick={() => setShowTimer(false)} className="text-[10px] opacity-50 hover:opacity-100" style={{ color: 'var(--text-muted)' }}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PersistentPlayer;