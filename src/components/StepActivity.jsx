import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function StepActivity({ selected, onSelect, onBack }) {
  const activities = [
    { name: 'Studying', icon: '📚' },
    { name: 'Coding', icon: '💻' },
    { name: 'Writing', icon: '✍️' },
    { name: 'Designing', icon: '🎨' },
    { name: 'Sleeping', icon: '😴' },
    { name: 'Relaxing', icon: '🧘' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'Just Chilling', icon: '☕' }
  ];

  return (
    <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition"><ArrowLeft size={16} /></button>
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Step 03 of 03</span>
        <div className="w-8"></div>
      </div>

      <div className="text-center -mt-2">
        <h1 className="text-2xl font-bold">What are you doing? 🧠</h1>
        <p className="text-xs text-gray-400 mt-1">We will generate the best recipe for you</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {activities.map((a) => (
          <button
            key={a.name}
            onClick={() => onSelect(a.name)}
            className={`p-4 rounded-2xl text-sm font-medium flex items-center space-x-3 border transition ${
              selected === a.name 
                ? 'bg-emerald-600/50 border-emerald-400 shadow-lg scale-[1.02]' 
                : 'bg-black/20 border-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            <span className="text-xl">{a.icon}</span>
            <span>{a.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}