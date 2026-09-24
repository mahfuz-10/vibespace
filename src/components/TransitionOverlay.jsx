import React from 'react';
import { Sparkles } from 'lucide-react';

export const TransitionOverlay = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300"
      style={{
        backgroundColor: 'rgba(14, 15, 12, 0.85)',
        backdropFilter: 'blur(12px)',
        opacity: isActive ? 1 : 0
      }}
    >
      <div className="absolute w-64 h-64 rounded-full blur-3xl opacity-30 animate-pulse"
           style={{ backgroundColor: 'var(--sage)' }} />
      
      <div className="relative z-10 flex flex-col items-center space-y-4 animate-fade-up">
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/40 shadow-2xl">
          <Sparkles size={18} style={{ color: 'var(--sage)' }} className="animate-spin" />
        </div>
        <p className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--champagne)' }}>
          Curating your atmosphere...
        </p>
      </div>
    </div>
  );
};

export default TransitionOverlay;