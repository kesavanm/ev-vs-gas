import { useState, useMemo, useEffect } from 'react';
import type { CalculatorInputs } from './types/calculator';
import { DEFAULT_INPUTS, calculateEvVsGas, UTILITY_RATE_PLANS } from './utils/calculator';
import { Header } from './components/Header';
import { PresetBar } from './components/PresetBar';
import { SummaryHero } from './components/SummaryHero';
import { InputPanel } from './components/InputPanel';
import { ForecastChart } from './components/ForecastChart';
import { DetailedBreakdownTable } from './components/DetailedBreakdownTable';
import { EnvironmentalImpact } from './components/EnvironmentalImpact';
import { ProsConsVerdict } from './components/ProsConsVerdict';
import { Zap } from 'lucide-react';

export function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [activePresetId, setActivePresetId] = useState<string | null>('tesla-y-2026-weekend-free');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Synchronize theme class on body
  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Real-time calculation memoization
  const results = useMemo(() => {
    return calculateEvVsGas(inputs);
  }, [inputs]);

  const activeRatePlan = UTILITY_RATE_PLANS.find((p) => p.id === inputs.ratePlanId);

  const handleSelectPreset = (presetInputs: Partial<CalculatorInputs>) => {
    setInputs((prev) => ({
      ...prev,
      ...presetInputs,
    }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setActivePresetId('tesla-y-2026-weekend-free');
  };

  return (
    <div className={`min-h-screen flex flex-col selection:bg-cyan-500 selection:text-slate-950 transition-colors ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Top Sticky Header */}
      <Header 
        onReset={handleReset} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Quick Scenario Preset Selector */}
        <PresetBar 
          onSelectPreset={handleSelectPreset} 
          activePresetId={activePresetId} 
        />

        {/* Hero Summary Card */}
        <SummaryHero 
          results={results} 
          isRoboTaxiActive={inputs.roboTaxi.enabled} 
          ratePlanName={activeRatePlan?.name || ''} 
        />

        {/* Executive Recommendation & Pros/Cons Matrix */}
        <ProsConsVerdict results={results} inputs={inputs} />

        {/* Input Parameters Controls */}
        <InputPanel inputs={inputs} onChange={setInputs} />

        {/* 5-Year Forecast Chart */}
        <ForecastChart 
          yearlyBreakdowns={results.yearlyBreakdowns}
          gasVehicleName={inputs.gasVehicleName}
          evVehicleName={inputs.evVehicleName}
        />

        {/* Side-by-Side Breakdown Table */}
        <DetailedBreakdownTable results={results} inputs={inputs} />

        {/* Environmental Impact */}
        <EnvironmentalImpact 
          results={results} 
          annualMiles={inputs.annualMiles} 
          gasMpg={inputs.gasMpg} 
        />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span className="font-display font-semibold text-slate-800 dark:text-slate-300">VoltvsGas Advisor</span>
            <span>— Free Open-Source Tesla Y & EV vs. Gas Decision Engine</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-500 dark:text-slate-500">Built with React, Vite & Tailwind</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
