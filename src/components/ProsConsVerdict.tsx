import React from 'react';
import type { CalculationResults, CalculatorInputs } from '../types/calculator';
import { 
  CheckCircle2, 
  XCircle, 
  ThumbsUp, 
  Percent, 
  Car, 
  Zap, 
  HelpCircle
} from 'lucide-react';

interface ProsConsVerdictProps {
  results: CalculationResults;
  inputs: CalculatorInputs;
}

export const ProsConsVerdict: React.FC<ProsConsVerdictProps> = ({ results, inputs }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-8 mb-8">
      
      {/* 1. Final Recommendation Verdict Hero Banner */}
      <div className={`glass-card p-6 md:p-8 relative overflow-hidden border ${
        results.net5YearSavings > 0
          ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/30 via-slate-900/90 to-cyan-950/30'
          : 'border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-slate-900/90 to-slate-950/90'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                results.net5YearSavings > 0
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}>
                <ThumbsUp className="w-3.5 h-3.5 mr-1" />
                <span>Executive Decision Recommendation</span>
              </span>

              {inputs.evLoanInterestRate < inputs.gasLoanInterestRate && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/30">
                  <Percent className="w-3 h-3 text-cyan-400" />
                  <span>1.0% Promo Financing Advantage</span>
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              {results.verdictTitle}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              {results.verdictSummary}
            </p>
          </div>

          {/* Quick Key Advantage Callout */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 w-full md:w-72 shrink-0 space-y-2">
            <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">
              Financing Interest Savings
            </div>
            <div className="text-2xl font-extrabold font-display text-emerald-400">
              +{formatCurrency(results.interestSavingsWithEv)}
            </div>
            <p className="text-[11px] text-slate-400">
              Saved in bank interest by choosing Tesla's 1.0% APR promo over 5.5% gas vehicle loan.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Side-by-Side Financing APR Engine */}
      <div className="glass-card p-5 sm:p-6">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-4 mb-5">
          <Percent className="w-5 h-5 text-cyan-400" />
          <h3 className="font-display font-bold text-lg text-white">
            60-Month Auto Financing APR & Loan Interest Comparison
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tesla 1% APR Loan */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-cyan-300">{inputs.evVehicleName}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-extrabold border border-cyan-500/40">
                {inputs.evLoanInterestRate.toFixed(1)}% Promo APR
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400">Monthly Loan Payment:</span>
                <div className="text-lg font-bold text-white font-display mt-0.5">
                  ${Math.round(results.evMonthlyLoanPayment).toLocaleString()}/mo
                </div>
              </div>
              <div>
                <span className="text-slate-400">5-Year Bank Interest:</span>
                <div className="text-lg font-bold text-emerald-400 font-display mt-0.5">
                  ${Math.round(results.ev5YearTotalInterest).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Gas 5.5% APR Loan */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-sm text-amber-300">{inputs.gasVehicleName}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold border border-amber-500/40">
                {inputs.gasLoanInterestRate.toFixed(1)}% Standard APR
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400">Monthly Loan Payment:</span>
                <div className="text-lg font-bold text-white font-display mt-0.5">
                  ${Math.round(results.gasMonthlyLoanPayment).toLocaleString()}/mo
                </div>
              </div>
              <div>
                <span className="text-slate-400">5-Year Bank Interest:</span>
                <div className="text-lg font-bold text-amber-400 font-display mt-0.5">
                  ${Math.round(results.gas5YearTotalInterest).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Tabular Pros & Cons Matrix */}
      <div className="glass-card p-5 sm:p-6">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-4 mb-6">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <h3 className="font-display font-bold text-lg text-white">
            Comprehensive Pros & Cons Comparison Matrix
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Tesla Model Y Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h4 className="font-display font-bold text-cyan-300 text-base">
                Tesla Model Y 2026 (Electric)
              </h4>
            </div>

            {/* EV Pros */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Key Advantages (Pros)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {results.evPros.map((pro, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span className="leading-relaxed">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* EV Cons */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-1">
                <XCircle className="w-4 h-4" />
                <span>Trade-offs & Considerations (Cons)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {results.evCons.map((con, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span className="leading-relaxed">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Gas Vehicle Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Car className="w-5 h-5 text-amber-400" />
              <h4 className="font-display font-bold text-amber-300 text-base">
                Internal Combustion (Gasoline)
              </h4>
            </div>

            {/* Gas Pros */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Key Advantages (Pros)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {results.gasPros.map((pro, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span className="leading-relaxed">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gas Cons */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center space-x-1">
                <XCircle className="w-4 h-4" />
                <span>Trade-offs & Considerations (Cons)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {results.gasCons.map((con, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span className="leading-relaxed">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
