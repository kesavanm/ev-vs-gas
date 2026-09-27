import React from 'react';
import { PRESET_PROFILES } from '../utils/calculator';
import type { CalculatorInputs } from '../types/calculator';
import { Car, Zap, Sun, Flame, Sparkles } from 'lucide-react';

interface PresetBarProps {
  onSelectPreset: (presetInputs: Partial<CalculatorInputs>) => void;
  activePresetId: string | null;
}

export const PresetBar: React.FC<PresetBarProps> = ({ onSelectPreset, activePresetId }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap': return <Zap className="w-4 h-4 text-cyan-400" />;
      case 'sun': return <Sun className="w-4 h-4 text-amber-300" />;
      case 'flame': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'car':
      default: return <Car className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="w-full mb-6">
      <div className="flex items-center space-x-2 mb-3">
        <Sparkles className="w-4 h-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Quick Preset Drivers
        </h3>
        <span className="text-xs text-slate-500">(Click to load scenario)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PRESET_PROFILES.map((preset) => {
          const isActive = activePresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.inputs)}
              className={`p-3.5 rounded-xl text-left transition-all relative overflow-hidden border ${
                isActive
                  ? 'bg-slate-800/90 border-cyan-400/80 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/50'
                  : 'bg-slate-900/60 hover:bg-slate-800/60 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-slate-800 border border-white/10">
                    {getIcon(preset.iconName)}
                  </div>
                  <div className="font-display font-bold text-sm text-slate-100">
                    {preset.name}
                  </div>
                </div>
                {isActive && (
                  <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/30">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {preset.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
