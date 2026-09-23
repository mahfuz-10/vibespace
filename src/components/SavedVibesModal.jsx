import React from 'react';
import { useAudio } from './AudioManager';
import { Compass, Clock, Play } from 'lucide-react';

export const SavedVibesView = () => {
  const { savedVibes, setSelectedMood, setSelectedActivity, setSelectedEnvironment } = useAudio();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-24">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">My Saved Vibes</h2>
        <p className="text-sm text-slate-400">Quickly restore your custom atmospheric settings saved in localStorage.</p>
      </div>

      {savedVibes.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center border border-white/5">
          <Compass className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-1">No Saved Vibes Yet</h3>
          <p className="text-xs text-slate-400">Go to the Home page, build your atmosphere, and click [ ENTER VIBE ] to save.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedVibes.map(vibe => (
            <div key={vibe.id} className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-white">{vibe.name}</h3>
                <span className="text-[10px] text-slate-500 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{vibe.timestamp}</span>
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-300 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">Mood:</span>
                  <span className="font-medium text-cyan-400">{vibe.mood}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Activity:</span>
                  <span className="font-medium text-violet-400">{vibe.activity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Environment:</span>
                  <span className="font-medium text-white">{vibe.environment}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedMood(vibe.mood);
                  setSelectedActivity(vibe.activity);
                  setSelectedEnvironment(vibe.environment);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs font-semibold flex items-center justify-center space-x-2 hover:bg-cyan-500/30 transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Restore Vibe</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};