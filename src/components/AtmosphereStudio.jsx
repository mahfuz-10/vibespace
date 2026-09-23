import React from 'react';
import { useAudio, MUSIC_DATABASE } from './AudioManager';
import { 
  Volume2, 
  VolumeX, 
  CloudRain, 
  Coffee, 
  Flame, 
  Wind, 
  Waves, 
  Trees, 
  Bird, 
  CloudLightning, 
  Car,
  Sparkles,
  Radio,
  Sliders
} from 'lucide-react';
import { LiveMixBar } from './LiveMixBar';
import PresetMixes from './PresetMixes';

/* Ambience card icons mapping */
const AMBIENCE_ICONS = {
  rain: CloudRain,
  coffee: Coffee,
  fireplace: Flame,
  wind: Wind,
  ocean: Waves,
  forest: Trees,
  birds: Bird,
  thunder: CloudLightning,
  city: Car,
};

export const AtmosphereStudio = () => {
  const {
    currentTrack, playTrack, isPlaying,
    ambientLayers, setAmbientVolume, toggleAmbientMute,
    masterVolume, setMasterVolume
  } = useAudio();

  const getSliderBackground = (value, max = 1) => {
    const percentage = (value / max) * 100;
    return `linear-gradient(to right, var(--sage) ${percentage}%, var(--border-subtle, rgba(244,240,230,0.15)) ${percentage}%)`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-40 animate-fade-up">
      
      {/* Wow Header Section */}
      <div className="mb-12 text-center max-w-2xl mx-auto relative">
        <div className="absolute inset-0 -top-6 bg-radial from-emerald-500/10 via-transparent to-transparent blur-2xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border mb-4 backdrop-blur-md"
             style={{ backgroundColor: 'rgba(168, 182, 154, 0.05)', borderColor: 'rgba(168, 182, 154, 0.2)' }}>
          <Sparkles size={12} style={{ color: 'var(--sage)' }} />
          <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'var(--sage)' }}>
            Spatial Acoustic Laboratory
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-light tracking-tight mb-2" style={{ color: 'var(--text-primary)', fontWeight: 300 }}>
          Atmosphere <span className="font-normal italic" style={{ color: 'var(--champagne)' }}>Studio</span>
        </h1>
        <p className="text-xs opacity-60 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Independent control over your hero music track and multi-layered generative ambient soundscapes.
        </p>
      </div>

      {/* Master Volume & Live Preview HUD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        <div 
          className="lg:col-span-5 p-5 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-xl" 
          style={{ 
            background: 'linear-gradient(145deg, rgba(37, 38, 32, 0.9), rgba(20, 21, 17, 0.95))',
            borderColor: 'rgba(214, 184, 135, 0.2)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center border" style={{ backgroundColor: 'rgba(168, 182, 154, 0.1)', borderColor: 'rgba(168, 182, 154, 0.2)' }}>
                <Volume2 className="w-4 h-4" style={{ color: 'var(--sage)' }} />
              </div>
              <div>
                <h3 className="text-xs font-medium tracking-tight" style={{ color: 'var(--text-primary)' }}>Master Output Volume</h3>
                <p className="text-[10px] opacity-50" style={{ color: 'var(--text-muted)' }}>Overall system sound pressure.</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded" style={{ color: 'var(--champagne)', backgroundColor: 'rgba(214, 184, 135, 0.1)' }}>
              {Math.round(masterVolume * 100)}%
            </span>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={masterVolume}
              onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer studio-slider"
              style={{ 
                background: getSliderBackground(masterVolume, 1),
                accentColor: 'var(--sage)' 
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-7 flex items-center">
          <div className="w-full">
            <LiveMixBar activeLayers={ambientLayers} />
          </div>
        </div>
      </div>

      <div className="mb-12">
        <PresetMixes ambientLayers={ambientLayers} setAmbientVolume={setAmbientVolume} />
      </div>

      {/* Main Studio Sections Stacked for Cinematic Focus */}
      <div className="space-y-12">
        
        {/* Hero Track Selection - Pro 3-Column Grid */}
        <div 
          className="p-6 sm:p-8 rounded-3xl border relative overflow-hidden backdrop-blur-md"
          style={{ 
            background: 'linear-gradient(160deg, rgba(30, 31, 27, 0.7), rgba(20, 21, 17, 0.85))',
            borderColor: 'var(--border-subtle, rgba(244,240,230,0.08))',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <Radio size={15} style={{ color: 'var(--champagne)' }} />
              <h2 className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--text-primary)' }}>
                Hero Track Selection
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-md border" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-subtle)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              {MUSIC_DATABASE.length} Cinematic Tracks
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {MUSIC_DATABASE.map(track => {
              const isCurrent = currentTrack?.id === track.id;
              const isSpinning = isCurrent && isPlaying;

              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center space-x-3.5 transition-all duration-300 group hover:-translate-y-0.5 ${
                    isCurrent ? 'font-medium' : ''
                  }`}
                  style={{
                    backgroundColor: isCurrent ? 'rgba(168, 182, 154, 0.08)' : 'var(--surface-primary)',
                    borderColor: isCurrent ? 'var(--sage)' : 'var(--border-subtle, rgba(244,240,230,0.08))',
                    opacity: isCurrent ? 1 : 0.8,
                    boxShadow: isCurrent ? '0 8px 25px rgba(168,182,154,0.15)' : '0 4px 15px rgba(0,0,0,0.05)'
                  }}
                >
                  <div 
                    className="w-11 h-11 overflow-hidden flex-shrink-0 transition-all duration-500 shadow-lg relative group"
                    style={{ borderRadius: isSpinning ? '50%' : '10px' }}
                  >
                    <img 
                      src={track.artwork} 
                      alt="" 
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                        isSpinning ? 'vinyl-spinning' : ''
                      }`}
                      style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                    />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <h4 className="text-xs truncate font-medium mb-0.5" style={{ color: isCurrent ? 'var(--sage)' : 'var(--text-primary)' }}>
                      {track.title}
                    </h4>
                    <p className="text-[10px] truncate opacity-50" style={{ color: 'var(--text-muted)' }}>{track.artist}</p>
                  </div>

                  {isCurrent && isPlaying && (
                    <div className="flex items-end space-x-0.5 h-3.5 flex-shrink-0 px-1">
                      <span className="w-0.5 h-full animate-pulse rounded-full" style={{ backgroundColor: 'var(--sage)', animationDuration: '0.6s' }} />
                      <span className="w-0.5 h-2/3 animate-pulse rounded-full" style={{ backgroundColor: 'var(--sage)', animationDuration: '0.4s' }} />
                      <span className="w-0.5 h-4/5 animate-pulse rounded-full" style={{ backgroundColor: 'var(--sage)', animationDuration: '0.5s' }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ambience Soundscapes */}
        <div 
          className="p-6 sm:p-8 rounded-3xl border relative overflow-hidden backdrop-blur-md"
          style={{ 
            background: 'linear-gradient(160deg, rgba(30, 31, 27, 0.7), rgba(20, 21, 17, 0.85))',
            borderColor: 'var(--border-subtle, rgba(244,240,230,0.08))',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <Sliders size={15} style={{ color: 'var(--champagne)' }} />
              <h2 className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--text-primary)' }}>
                Ambience Soundscapes
              </h2>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-md border" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-subtle)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
              Multi-Layer Spatial Engine
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ambientLayers.map(layer => {
              const percentage = Math.round(layer.volume * 100);
              const isActive = layer.volume > 0 && !layer.isMuted;
              const IconComponent = AMBIENCE_ICONS[layer.id] || Volume2;

              const getAnimationClass = (id) => {
                switch (id) {
                  case 'rain': return 'anim-rain';
                  case 'fireplace': return 'anim-fire';
                  case 'wind': return 'anim-wind';
                  case 'ocean': return 'anim-waves';
                  default: return '';
                }
              };
              const animationClass = getAnimationClass(layer.id);

              return (
                <div 
                  key={layer.id} 
                  className="p-4 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/30" 
                  style={{ 
                    backgroundColor: isActive ? 'rgba(168, 182, 154, 0.04)' : 'var(--surface-primary)', 
                    borderColor: isActive ? 'rgba(168, 182, 154, 0.4)' : 'var(--border-subtle, rgba(244,240,230,0.08))',
                    boxShadow: isActive ? '0 8px 25px rgba(168,182,154,0.08)' : 'none'
                  }}
                >
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center space-x-2.5">
                      <div className="inline-block">
                        <IconComponent 
                          className={`w-4 h-4 ${animationClass}`}
                          style={{ 
                            color: isActive ? 'var(--sage)' : 'var(--text-muted)',
                            animationPlayState: isActive ? 'running' : 'paused'
                          }} 
                        />
                      </div>
                      <span className="text-xs font-medium" style={{ color: isActive ? 'var(--sage)' : 'var(--text-primary)' }}>
                        {layer.name}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleAmbientMute(layer.id)}
                      className="p-1.5 rounded-lg text-xs transition-all duration-200 cursor-pointer hover:bg-white/5"
                      style={{ 
                        color: layer.isMuted ? '#f87171' : (isActive ? 'var(--sage)' : 'var(--text-muted)'),
                        opacity: layer.isMuted ? 1 : 0.7 
                      }}
                    >
                      {layer.isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={layer.isMuted ? 0 : layer.volume}
                      onChange={(e) => setAmbientVolume(layer.id, parseFloat(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer studio-slider"
                      style={{ 
                        background: getSliderBackground(layer.isMuted ? 0 : layer.volume, 1),
                        accentColor: 'var(--sage)' 
                      }}
                    />
                    <span className="text-[10px] font-mono w-8 text-right opacity-70" style={{ color: 'var(--text-muted)' }}>
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AtmosphereStudio;