import React, { useState } from 'react';
import type { YearBreakdown } from '../types/calculator';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { LineChart, BarChart3, TrendingUp, Info } from 'lucide-react';

interface ForecastChartProps {
  yearlyBreakdowns: YearBreakdown[];
  gasVehicleName: string;
  evVehicleName: string;
}

export const ForecastChart: React.FC<ForecastChartProps> = ({
  yearlyBreakdowns,
  gasVehicleName,
  evVehicleName,
}) => {
  const [chartMode, setChartMode] = useState<'cumulative' | 'yearly'>('cumulative');

  const chartData = yearlyBreakdowns.map((item) => ({
    name: `Year ${item.year}`,
    GasCumulative: Math.round(item.cumulativeGasCost),
    EvCumulative: Math.round(item.cumulativeEvCost),
    GasYearly: Math.round(item.gasTotalYearCost),
    EvYearly: Math.round(item.evTotalYearCost),
    GasFuel: Math.round(item.gasFuelCost),
    EvPower: Math.round(item.evElectricityCost),
    Savings: Math.round(item.cumulativeSavings),
  }));

  const formatCurrencyTooltip = (value: any) => {
    if (value === undefined || value === null) return '$0';
    return `$${Number(value).toLocaleString()}`;
  };

  return (
    <div className="glass-card p-5 sm:p-6 mb-8">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h3 className="font-display font-bold text-lg text-white">
              5-Year Financial Forecast Trajectory
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Compare cumulative total ownership costs over time (Purchase + Fuel + Maintenance + Insurance)
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center space-x-1 p-1 rounded-lg bg-slate-950 border border-white/10">
          <button
            onClick={() => setChartMode('cumulative')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              chartMode === 'cumulative'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LineChart className="w-3.5 h-3.5" />
            <span>Cumulative Cost</span>
          </button>

          <button
            onClick={() => setChartMode('yearly')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              chartMode === 'yearly'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Annual Running Cost</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartMode === 'cumulative' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="gasGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="evGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00f2fe" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis 
                stroke="#64748b" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} 
              />
              <Tooltip 
                formatter={formatCurrencyTooltip}
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }} 
                formatter={(value) => (
                  <span className="text-xs text-slate-300 font-medium">{value}</span>
                )}
              />
              <Area 
                type="monotone" 
                dataKey="GasCumulative" 
                name={`Gas: ${gasVehicleName}`} 
                stroke="#f59e0b" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#gasGradient)" 
              />
              <Area 
                type="monotone" 
                dataKey="EvCumulative" 
                name={`EV: ${evVehicleName}`} 
                stroke="#00f2fe" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#evGradient)" 
              />
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis 
                stroke="#64748b" 
                tick={{ fontSize: 12 }} 
                tickFormatter={(val) => `$${val}`} 
              />
              <Tooltip 
                formatter={formatCurrencyTooltip}
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: 'rgba(255,255,255,0.15)',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }} 
                formatter={(value) => (
                  <span className="text-xs text-slate-300 font-medium">{value}</span>
                )}
              />
              <Bar dataKey="GasYearly" name="Gas Annual Cost" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              <Bar dataKey="EvYearly" name="EV Annual Cost" fill="#00f2fe" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer Note */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center space-x-2 text-xs text-slate-400">
        <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
        <span>
          Cumulative cost includes upfront net price, fuel/power inflation, maintenance, and insurance over 5 years.
        </span>
      </div>
    </div>
  );
};
