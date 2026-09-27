import React, { useState } from 'react';
import type { CalculatorInputs } from '../types/calculator';
import { 
  TESLA_MODEL_Y_2026_TRIMS, 
  STATE_INCENTIVES, 
  UTILITY_RATE_PLANS 
} from '../utils/calculator';
import { 
  Car, 
  Zap, 
  Fuel, 
  Sliders, 
  ShieldCheck, 
  Bot, 
  MapPin, 
  Sparkles,
  Percent,
  Cpu
} from 'lucide-react';

interface InputPanelProps {
  inputs: CalculatorInputs;
  onChange: (updatedInputs: CalculatorInputs) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({ inputs, onChange }) => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'financing' | 'rates' | 'robotaxi' | 'driving' | 'maintenance'>('vehicles');

  const updateField = <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
    onChange({
      ...inputs,
      [key]: value,
    });
  };

  const handleSelectTeslaTrim = (trimId: string) => {
    const trim = TESLA_MODEL_Y_2026_TRIMS.find((t) => t.id === trimId);
    if (!trim) return;

    onChange({
      ...inputs,
      evVehicleName: trim.name,
      evTrimId: trim.id,
      evVehiclePrice: trim.price,
      evEfficiency: trim.efficiency,
    });
  };

  const handleSelectStateIncentive = (stateCode: string) => {
    const stateObj = STATE_INCENTIVES.find((s) => s.code === stateCode);
    const amount = stateObj ? stateObj.amount : 0;
    const combined = inputs.federalTaxCredit + amount;

    onChange({
      ...inputs,
      selectedStateCode: stateCode,
      stateTaxCredit: amount,
      evTaxCredit: combined,
    });
  };

  const handleSelectUtilityPlan = (planId: 'flat' | 'weekend-free' | 'night-owl' | 'custom-tou') => {
    const plan = UTILITY_RATE_PLANS.find((p) => p.id === planId);
    if (!plan) return;

    onChange({
      ...inputs,
      ratePlanId: planId,
      freeChargingSharePercent: plan.defaultFreePercentage,
      offPeakElectricityRatePerKwh: plan.offPeakRatePerKwh,
    });
  };

  const updateRoboTaxi = (key: keyof CalculatorInputs['roboTaxi'], value: any) => {
    onChange({
      ...inputs,
      roboTaxi: {
        ...inputs.roboTaxi,
        [key]: value,
      },
    });
  };

  return (
    <div className="glass-card p-5 sm:p-6 mb-8">
      {/* Category Tabs */}
      <div className="flex items-center space-x-1 border-b border-white/10 pb-4 mb-6 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('vehicles')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'vehicles'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Car className="w-4 h-4 text-cyan-400" />
          <span>1. Tesla Y & State Credits</span>
        </button>

        <button
          onClick={() => setActiveTab('financing')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'financing'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Percent className="w-4 h-4 text-cyan-300" />
          <span>2. 1% APR & FSD $99/mo</span>
        </button>

        <button
          onClick={() => setActiveTab('rates')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'rates'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>3. Free Utility Plans</span>
        </button>

        <button
          onClick={() => setActiveTab('robotaxi')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'robotaxi'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Bot className="w-4 h-4 text-amber-400" />
          <span>4. RoboTaxi Idle Revenue</span>
        </button>

        <button
          onClick={() => setActiveTab('driving')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'driving'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>5. Mileage</span>
        </button>

        <button
          onClick={() => setActiveTab('maintenance')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'maintenance'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>6. Insurance & Service</span>
        </button>
      </div>

      {/* TAB 1: Tesla Model Y & State Incentives */}
      {activeTab === 'vehicles' && (
        <div className="space-y-6">
          {/* Quick Tesla Model Y 2026 Presets */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Tesla Model Y 2026 Trim Selection ("Juniper" Refresh)
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TESLA_MODEL_Y_2026_TRIMS.map((trim) => {
                const isSelected = inputs.evTrimId === trim.id;
                return (
                  <button
                    key={trim.id}
                    onClick={() => handleSelectTeslaTrim(trim.id)}
                    className={`p-3.5 rounded-xl text-left border transition ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 text-white ring-1 ring-cyan-400/50'
                        : 'bg-slate-900/60 border-white/5 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <div className="font-display font-bold text-sm text-cyan-300">{trim.name}</div>
                    <div className="text-lg font-extrabold font-display text-white mt-1">
                      ${trim.price.toLocaleString()}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-white/5">
                      <span>{trim.range}</span>
                      <span>{trim.efficiency} mi/kWh</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* State Tax Credits & Rebates Database */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-200 font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>State EV Tax Credits & Cash Rebates</span>
              </div>
              <span className="text-xs font-bold text-emerald-400 font-display">
                Combined Credits: ${inputs.evTaxCredit.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Select Your State Incentive</label>
                <select
                  value={inputs.selectedStateCode}
                  onChange={(e) => handleSelectStateIncentive(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {STATE_INCENTIVES.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.name}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  {STATE_INCENTIVES.find((s) => s.code === inputs.selectedStateCode)?.description}
                </p>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Federal Clean Vehicle Credit ($)</label>
                <input
                  type="number"
                  step={500}
                  value={inputs.federalTaxCredit}
                  onChange={(e) => {
                    const fed = Number(e.target.value);
                    onChange({
                      ...inputs,
                      federalTaxCredit: fed,
                      evTaxCredit: fed + inputs.stateTaxCredit,
                    });
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Comparison Line-Up */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-3">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase">
                <Fuel className="w-4 h-4" />
                <span>Gas Vehicle Comparison Specs</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">Model Name</label>
                  <input
                    type="text"
                    value={inputs.gasVehicleName}
                    onChange={(e) => updateField('gasVehicleName', e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-md bg-slate-900 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">MSRP ($)</label>
                  <input
                    type="number"
                    step={500}
                    value={inputs.gasVehiclePrice}
                    onChange={(e) => updateField('gasVehiclePrice', Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-md bg-slate-900 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">Fuel Economy (MPG)</label>
                <input
                  type="number"
                  value={inputs.gasMpg}
                  onChange={(e) => updateField('gasMpg', Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-md bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-3">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase">
                <Zap className="w-4 h-4" />
                <span>Selected EV Specs Summary</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400">EV Model:</span>
                  <div className="font-bold text-white mt-0.5">{inputs.evVehicleName}</div>
                </div>
                <div>
                  <span className="text-slate-400">Base Price:</span>
                  <div className="font-bold text-white mt-0.5">${inputs.evVehiclePrice.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-slate-400">Combined Credits:</span>
                  <div className="font-bold text-emerald-400 mt-0.5">-${inputs.evTaxCredit.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-slate-400">Net EV Price:</span>
                  <div className="font-bold text-cyan-300 mt-0.5">
                    ${Math.max(0, inputs.evVehiclePrice - inputs.evTaxCredit).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Financing APR & Software Subscriptions */}
      {activeTab === 'financing' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-4">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <Percent className="w-4 h-4" />
              <span>Loan Interest Rate Comparison Engine (60 Months)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Tesla 1% APR Promo */}
              <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-cyan-300">Tesla Promotional APR</label>
                  <span className="text-xs font-extrabold text-emerald-400 font-display">
                    {inputs.evLoanInterestRate.toFixed(1)}% APR
                  </span>
                </div>
                <input
                  type="range"
                  min={0.0}
                  max={8.0}
                  step={0.1}
                  value={inputs.evLoanInterestRate}
                  onChange={(e) => updateField('evLoanInterestRate', Number(e.target.value))}
                  className="accent-cyan-400"
                />
                <p className="text-[11px] text-slate-400">
                  Tesla's promotional 1.0% APR option dramatically lowers bank interest over 60 months.
                </p>
              </div>

              {/* Gas 5.5% APR */}
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-amber-300">Gas Vehicle Auto Loan APR</label>
                  <span className="text-xs font-extrabold text-amber-400 font-display">
                    {inputs.gasLoanInterestRate.toFixed(1)}% APR
                  </span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={12.0}
                  step={0.1}
                  value={inputs.gasLoanInterestRate}
                  onChange={(e) => updateField('gasLoanInterestRate', Number(e.target.value))}
                  className="accent-amber-400"
                />
                <p className="text-[11px] text-slate-400">
                  Standard national average credit union/bank rate for internal combustion vehicles.
                </p>
              </div>
            </div>
          </div>

          {/* FSD Subscription Option */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-display font-bold text-sm text-white">
                    Full Self-Driving (Supervised) Subscription
                  </h4>
                  <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    $99 / month
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Include $99/mo FSD software subscription cost in 5-year EV running costs.
                </p>
              </div>
            </div>

            <button
              onClick={() => updateField('fsdSubscriptionEnabled', !inputs.fsdSubscriptionEnabled)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                inputs.fsdSubscriptionEnabled
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {inputs.fsdSubscriptionEnabled ? 'FSD $99/mo Active' : 'Enable FSD'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: Utility Rates & Special Time-of-Use Plans */}
      {activeTab === 'rates' && (
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
              Select Your Electric Utility Rate Plan
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {UTILITY_RATE_PLANS.map((plan) => {
                const isSelected = inputs.ratePlanId === plan.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => handleSelectUtilityPlan(plan.id)}
                    className={`p-4 rounded-xl text-left border transition ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-400 text-white ring-1 ring-emerald-400/50'
                        : 'bg-slate-900/60 border-white/5 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-display font-bold text-sm text-emerald-300">{plan.name}</div>
                      {isSelected && (
                        <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/30">
                          Active Plan
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{plan.description}</p>
                    <div className="text-[11px] text-cyan-300 font-semibold mt-2 pt-2 border-t border-white/5">
                      ⚡ {plan.freeWindowDescription}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">Standard / Peak Electricity Rate</label>
                  <span className="text-xs font-bold text-cyan-400">${inputs.electricityRatePerKwh.toFixed(2)} / kWh</span>
                </div>
                <input
                  type="range"
                  min={0.05}
                  max={0.50}
                  step={0.01}
                  value={inputs.electricityRatePerKwh}
                  onChange={(e) => updateField('electricityRatePerKwh', Number(e.target.value))}
                  className="accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">Free / Off-Peak Rate</label>
                  <span className="text-xs font-bold text-emerald-400">${inputs.offPeakElectricityRatePerKwh.toFixed(2)} / kWh</span>
                </div>
                <input
                  type="range"
                  min={0.00}
                  max={0.20}
                  step={0.01}
                  value={inputs.offPeakElectricityRatePerKwh}
                  onChange={(e) => updateField('offPeakElectricityRatePerKwh', Number(e.target.value))}
                  className="accent-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3 border-t border-white/10">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">Charging Scheduled During Free Window</label>
                  <span className="text-xs font-bold text-emerald-400">{inputs.freeChargingSharePercent}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={inputs.freeChargingSharePercent}
                  onChange={(e) => updateField('freeChargingSharePercent', Number(e.target.value))}
                  className="accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-300">Local Gas Price ($/gallon)</label>
                  <span className="text-xs font-bold text-amber-400">${inputs.gasPricePerGallon.toFixed(2)} / gal</span>
                </div>
                <input
                  type="range"
                  min={2.00}
                  max={7.00}
                  step={0.05}
                  value={inputs.gasPricePerGallon}
                  onChange={(e) => updateField('gasPricePerGallon', Number(e.target.value))}
                  className="accent-amber-400"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: RoboTaxi / Idle Autonomous Monetization */}
      {activeTab === 'robotaxi' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-amber-300">
                  Autonomous Fleet Sharing / RoboTaxi Mode
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Monetize your Tesla Model Y during office idle hours (9:30 AM – 4:30 PM).
                </p>
              </div>
            </div>

            <button
              onClick={() => updateRoboTaxi('enabled', !inputs.roboTaxi.enabled)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                inputs.roboTaxi.enabled
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {inputs.roboTaxi.enabled ? 'RoboTaxi Enabled' : 'Enable RoboTaxi'}
            </button>
          </div>

          {inputs.roboTaxi.enabled && (
            <div className="p-5 rounded-xl bg-slate-900/80 border border-white/10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-slate-950 border border-white/5">
                  <span className="text-[11px] text-slate-400 block">Idle Commute Window</span>
                  <span className="text-sm font-bold text-amber-400 font-display mt-0.5 block">
                    9:30 AM – 4:30 PM (7 Hrs)
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-white/5">
                  <span className="text-[11px] text-slate-400 block">Active Ride Hours / Day</span>
                  <span className="text-sm font-bold text-cyan-300 font-display mt-0.5 block">
                    {inputs.roboTaxi.activeRideHoursPerDay} Hours / Day
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-white/5">
                  <span className="text-[11px] text-slate-400 block">Net Hourly Earnings</span>
                  <span className="text-sm font-bold text-emerald-400 font-display mt-0.5 block">
                    ${inputs.roboTaxi.netHourlyEarnings.toFixed(2)} / Hr
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-300">Active Fleet Hours per Commute Day</label>
                    <span className="text-xs font-bold text-amber-400">{inputs.roboTaxi.activeRideHoursPerDay} hrs</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={7}
                    step={0.5}
                    value={inputs.roboTaxi.activeRideHoursPerDay}
                    onChange={(e) => updateRoboTaxi('activeRideHoursPerDay', Number(e.target.value))}
                    className="accent-amber-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-300">Net Hourly Revenue ($/hr)</label>
                    <span className="text-xs font-bold text-emerald-400">${inputs.roboTaxi.netHourlyEarnings.toFixed(2)}/hr</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    step={1}
                    value={inputs.roboTaxi.netHourlyEarnings}
                    onChange={(e) => updateRoboTaxi('netHourlyEarnings', Number(e.target.value))}
                    className="accent-emerald-400"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: Annual Driving Distance */}
      {activeTab === 'driving' && (
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-200">Annual Driving Distance</label>
              <span className="text-sm font-bold text-cyan-400 font-display">
                {inputs.annualMiles.toLocaleString()} miles / year
              </span>
            </div>
            <input
              type="range"
              min={3000}
              max={35000}
              step={500}
              value={inputs.annualMiles}
              onChange={(e) => updateField('annualMiles', Number(e.target.value))}
              className="accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* TAB 6: Insurance & Service */}
      {activeTab === 'maintenance' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Annual Auto Insurance Premiums</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Gas Vehicle Insurance ($/yr)</label>
                <input
                  type="number"
                  step={50}
                  value={inputs.gasAnnualInsurance}
                  onChange={(e) => updateField('gasAnnualInsurance', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Tesla EV Insurance ($/yr)</label>
                <input
                  type="number"
                  step={50}
                  value={inputs.evAnnualInsurance}
                  onChange={(e) => updateField('evAnnualInsurance', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Annual Maintenance</h4>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Gas Maintenance ($/yr)</label>
                <input
                  type="number"
                  step={50}
                  value={inputs.gasAnnualMaintenance}
                  onChange={(e) => updateField('gasAnnualMaintenance', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">EV Maintenance ($/yr)</label>
                <input
                  type="number"
                  step={50}
                  value={inputs.evAnnualMaintenance}
                  onChange={(e) => updateField('evAnnualMaintenance', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Inflation Rates</h4>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Gas Price Inflation (% / yr)</label>
                <input
                  type="number"
                  step={0.5}
                  value={inputs.annualGasInflationPercent}
                  onChange={(e) => updateField('annualGasInflationPercent', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Electricity Inflation (% / yr)</label>
                <input
                  type="number"
                  step={0.5}
                  value={inputs.annualElectricityInflationPercent}
                  onChange={(e) => updateField('annualElectricityInflationPercent', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
