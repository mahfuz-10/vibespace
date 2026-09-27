import React from 'react';

// Subtle distinct color palette for soundscapes
const MIX_COLORS = [
  '#A8B69A', // Sage
  '#D6B887', // Champagne
  '#C5B9CD', // Soft Lavender
  '#E0BBE4', // Light Mauve
  '#FFDFD3', // Soft Peach
  '#D4A5A5', // Dusty Rose
  '#957DAD', // Muted Purple
  '#88D8B0', // Mint
  '#FFEEAD', // Soft Yellow
];

export const LiveMixBar = ({ activeLayers = [] }) => {
  const activeMix = activeLayers.filter(layer => layer.volume > 0 && !layer.isMuted);
  const totalVolume = activeMix.reduce((sum, item) => sum + item.volume, 0);

  return (
    <div 
      className="mb-8 p-4 rounded-2xl border transition-all duration-300"
      style={{ 
        backgroundColor: 'var(--surface-primary)', 
        borderColor: 'var(--border-subtle, rgba(244,240,230,0.08))' 
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--text-muted)' }}>
          Live Mix Preview
        </span>
        <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
          {activeMix.length} active soundscape{activeMix.length === 1 ? '' : 's'}
        </span>
      </div>

      {activeMix.length === 0 ? (
        <div className="py-3 text-center text-xs italic opacity-50" style={{ color: 'var(--text-muted)' }}>
          No active mix — adjust sliders below
        </div>
      ) : (
        <>
          <div 
            className="w-full h-3 rounded-md overflow-hidden flex mb-3"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            {activeMix.map((layer, index) => {
              const proportion = totalVolume > 0 ? (layer.volume / totalVolume) * 100 : 0;
              const barColor = MIX_COLORS[index % MIX_COLORS.length];

              return (
                <div
                  key={layer.id}
                  style={{
                    width: `${proportion}%`,
                    backgroundColor: barColor,
                    transition: 'width 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  title={`${layer.name}: ${Math.round(layer.volume * 100)}%`}
                />
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px]">
            {activeMix.map((layer, index) => {
              const percentage = Math.round(layer.volume * 100);
              const dotColor = MIX_COLORS[index % MIX_COLORS.length];

              return (
                <div key={layer.id} className="flex items-center space-x-1.5">
                  <span 
                    className="w-2 h-2 rounded-full inline-block flex-shrink-0" 
                    style={{ backgroundColor: dotColor }} 
                  />
                  <span style={{ color: 'var(--text-primary)' }} className="font-medium">
                    {layer.name}
                  </span>
                  <span className="font-mono opacity-60" style={{ color: 'var(--text-muted)' }}>
                    {percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default LiveMixBar;