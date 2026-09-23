import React from 'react';
import { PRESET_MIXES } from './presetData';
import { VolumeX } from 'lucide-react';

const PresetMixes = ({ ambientLayers, setAmbientVolume }) => {
  const isPresetActive = (presetMix) => {
    return ambientLayers.every(layer => {
      const targetVol = presetMix[layer.id] || 0;
      const currentVol = layer.isMuted ? 0 : layer.volume;
      return Math.abs(currentVol - targetVol) < 0.05;
    });
  };

  const handleApplyPreset = (mix) => {
    ambientLayers.forEach(layer => {
      const targetVol = mix[layer.id] || 0;
      setAmbientVolume(layer.id, targetVol);
    });
  };

  // Helper to pause/clear all active ambient sounds
  const handleClearMix = () => {
    ambientLayers.forEach(layer => {
      setAmbientVolume(layer.id, 0);
    });
  };

  // Check if any ambience is currently playing
  const isAnyActive = ambientLayers.some(layer => layer.volume > 0 && !layer.isMuted);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[10px] uppercase tracking-widest font-medium" style={{ color: 'var(--text-muted)' }}>
          Quick Mixes
        </h2>
        {isAnyActive && (
          <button
            onClick={handleClearMix}
            type="button"
            className="flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded-lg border transition-all duration-200 hover:opacity-100 opacity-60 cursor-pointer"
            style={{ 
              backgroundColor: 'var(--surface-primary)',
              borderColor: 'var(--border-subtle, rgba(244,240,230,0.08))',
              color: 'var(--text-primary)'
            }}
          >
            <VolumeX className="w-3 h-3" />
            <span>Pause All</span>
          </button>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {PRESET_MIXES.map(preset => {
          const active = isPresetActive(preset.mix);

          return (
            <button
              key={preset.id}
              onClick={() => handleApplyPreset(preset.mix)}
              type="button"
              className="flex-shrink-0 p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer min-w-[155px] hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--surface-primary)',
                borderColor: active ? 'var(--sage)' : 'var(--border-subtle, rgba(244,240,230,0.08))',
                boxShadow: active ? '0 0 0 1px var(--sage), 0 4px 16px rgba(168,182,154,0.12)' : 'none',
                background: active ? 'linear-gradient(135deg, rgba(168, 182, 154, 0.14), rgba(214, 184, 135, 0.04))' : 'var(--surface-primary)'
              }}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-base">{preset.emoji}</span>
                <span className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                  {preset.title}
                </span>
              </div>
              <p className="text-[10px] opacity-60" style={{ color: 'var(--text-muted)' }}>
                {preset.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PresetMixes;