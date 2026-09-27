import React from 'react';
import type { CalculationResults } from '../types/calculator';
import { Clock, DollarSign, Fuel, Sparkles, CheckCircle2, AlertCircle, Bot, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SummaryHeroProps {
  results: CalculationResults;
  isRoboTaxiActive: boolean;
  ratePlanName: string;
}

export const SummaryHero: React.FC<SummaryHeroProps> = ({ 
  results, 
  isRoboTaxiActive,
  ratePlanName,
}) => {
  const isEvWinner = results.net5YearSavings > 0;

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#10b981', '#38bdf8', '#fbbf24']
    });
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="w-full mb-8">
      {/* Primary Banner */}
      <div className={`glass-card p-6 md:p-8 relative overflow-hidden ${
        isEvWinner 
          ? 'border-emerald-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-emerald-950/30 glow-savings'
          : 'border-amber-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-amber-950/30 glow-gas'
      }`}>

        {/* Ambient background glow */}
        <div className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
          isEvWinner ? 'bg-emerald-500/10' : 'bg-amber-500/10'
        }`} />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          
          {/* Main Advantage & Callout */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                isEvWinner
                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
              }`}>
                {isEvWinner ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                <span>{isEvWinner ? 'Electric Advantage Confirmed' : 'Gas Vehicle Cheaper Overall'}</span>
              </span>

              {ratePlanName && ratePlanName.includes('Free') && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                  <Zap className="w-3 h-3 text-emerald-400" />
                  <span>Free Utility Power Active</span>
                </span>
              )}

              {isRoboTaxiActive && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/30">
                  <Bot className="w-3 h-3 text-amber-400" />
                  <span>RoboTaxi Earnings Active</span>
                </span>
              )}

              {isEvWinner && (
                <button
                  onClick={triggerConfetti}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-medium border border-cyan-500/30 transition"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Celebrate!</span>
                </button>
              )}
            </div>

            <div>
              <p className="text-xs uppercase font-bold tracking-widest text-slate-400">
                5-Year Total Net Financial Forecast
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white mt-1">
                {isEvWinner ? (
                  <span className="text-gradient-savings">{formatCurrency(results.net5YearSavings)} Net Savings</span>
                ) : (
                  <span className="text-gradient-gas">{formatCurrency(Math.abs(results.net5YearSavings))} Gas Advantage</span>
                )}
              </h1>
            </div>

            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              {isEvWinner ? (
                <>
                  Switching saves <strong className="text-emerald-400">{formatCurrency(results.monthlyFuelSavings)}/month</strong> in fuel. {isRoboTaxiActive && <>RoboTaxi adds <strong className="text-amber-300">{formatCurrency(results.monthlyRoboTaxiRevenue)}/month</strong> in passive revenue. </>}Break-even achieved in <strong className="text-cyan-300">{results.paybackYearsFormatted}</strong>.
                </>
              ) : (
                <>
                  Under current parameters, staying with Gas yields lower total costs. Enable RoboTaxi mode or a Free Utility Plan to boost EV ROI!
                </>
              )}
            </p>
          </div>

          {/* Key Stat Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            
            {/* Monthly Fuel Savings */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col justify-between">
              <div className="flex items-center text-slate-400 text-xs font-medium space-x-1 mb-2">
                <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                <span>Monthly Power Savings</span>
              </div>
              <div className="text-xl font-bold font-display text-white">
                {formatCurrency(results.monthlyFuelSavings)}
                <span className="text-xs text-slate-400 font-normal">/mo</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                ${results.monthlyGasFuel.toFixed(0)} gas vs ${results.monthlyEvElectricity.toFixed(0)} power
              </div>
            </div>

            {/* RoboTaxi Passive Earnings */}
            {isRoboTaxiActive ? (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-amber-500/30 flex flex-col justify-between">
                <div className="flex items-center text-amber-300 text-xs font-medium space-x-1 mb-2">
                  <Bot className="w-3.5 h-3.5 text-amber-400" />
                  <span>RoboTaxi Revenue</span>
                </div>
                <div className="text-xl font-bold font-display text-amber-400">
                  +{formatCurrency(results.monthlyRoboTaxiRevenue)}
                  <span className="text-xs text-slate-400 font-normal">/mo</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  +{formatCurrency(results.total5YearRoboTaxiRevenue)} over 5 yrs
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center text-slate-400 text-xs font-medium space-x-1 mb-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Break-Even Horizon</span>
                </div>
                <div className="text-xl font-bold font-display text-cyan-300">
                  {results.paybackYearsFormatted}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {results.upfrontPriceDifference > 0 
                    ? `${formatCurrency(results.upfrontPriceDifference)} EV upfront delta`
                    : 'EV cheaper upfront'}
                </div>
              </div>
            )}

            {/* Gallon Equivalent */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 flex flex-col justify-between col-span-2 sm:col-span-1">
              <div className="flex items-center text-slate-400 text-xs font-medium space-x-1 mb-2">
                <Fuel className="w-3.5 h-3.5 text-emerald-400" />
                <span>eGallon Cost</span>
              </div>
              <div className="text-xl font-bold font-display text-emerald-400">
                ${results.gallonEquivalentPrice.toFixed(2)}
                <span className="text-xs text-slate-400 font-normal">/gal eq</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Feels like driving on ${results.gallonEquivalentPrice.toFixed(2)} gas
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
