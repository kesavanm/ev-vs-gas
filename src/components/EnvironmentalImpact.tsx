import React from 'react';
import type { CalculationResults } from '../types/calculator';
import { Leaf, Trees, Droplet, CloudOff } from 'lucide-react';

interface EnvironmentalImpactProps {
  results: CalculationResults;
  annualMiles: number;
  gasMpg: number;
}

export const EnvironmentalImpact: React.FC<EnvironmentalImpactProps> = ({
  results,
  annualMiles,
  gasMpg,
}) => {
  const gallonsSavedPerYear = annualMiles / Math.max(1, gasMpg);
  const gallonsSaved5Years = gallonsSavedPerYear * 5;

  return (
    <div className="glass-card p-5 sm:p-6 mb-8 border-emerald-500/20 bg-emerald-950/10">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-4 mb-6">
        <Leaf className="w-5 h-5 text-emerald-400" />
        <div>
          <h3 className="font-display font-bold text-lg text-white">
            Environmental & Sustainability Impact
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            5-Year Ecological footprint comparison between Electric & Gasoline power
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Metric 1: CO2 Avoided */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/20 flex items-start space-x-3">
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0">
            <CloudOff className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">5-Year CO₂ Tailpipe Avoided</span>
            <div className="text-2xl font-bold font-display text-emerald-300 mt-1">
              {results.total5YearCo2SavedTons.toFixed(1)} <span className="text-xs font-normal text-slate-400">Metric Tons</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              ~{(results.annualCo2SavedTons).toFixed(1)} tons of greenhouse gas saved annually.
            </p>
          </div>
        </div>

        {/* Metric 2: Equivalent Trees */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/20 flex items-start space-x-3">
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0">
            <Trees className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Tree Absorption Equivalent</span>
            <div className="text-2xl font-bold font-display text-emerald-300 mt-1">
              {results.equivalentTreesPlanted.toLocaleString()} <span className="text-xs font-normal text-slate-400">Trees</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Equivalent CO₂ absorption of mature urban trees planted over 5 years.
            </p>
          </div>
        </div>

        {/* Metric 3: Gallons of Gasoline Saved */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/20 flex items-start space-x-3">
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0">
            <Droplet className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Gasoline Never Burned</span>
            <div className="text-2xl font-bold font-display text-emerald-300 mt-1">
              {Math.round(gallonsSaved5Years).toLocaleString()} <span className="text-xs font-normal text-slate-400">Gallons</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Eliminates ~{Math.round(gallonsSavedPerYear)} gallons of fuel consumption each year.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
