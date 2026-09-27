import React from 'react';
import type { CalculationResults, CalculatorInputs } from '../types/calculator';
import { Table, Fuel, ShieldCheck, DollarSign, Zap, Bot, MapPin, Percent, Cpu } from 'lucide-react';

interface DetailedBreakdownTableProps {
  results: CalculationResults;
  inputs: CalculatorInputs;
}

export const DetailedBreakdownTable: React.FC<DetailedBreakdownTableProps> = ({
  results,
  inputs,
}) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="glass-card p-5 sm:p-6 mb-8">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-4 mb-6">
        <Table className="w-5 h-5 text-cyan-400" />
        <h3 className="font-display font-bold text-lg text-white">
          Detailed Side-by-Side 5-Year Financial Comparison
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Cost / Revenue Line Item</th>
              <th className="py-3 px-4 text-amber-400">Gas ({inputs.gasVehicleName})</th>
              <th className="py-3 px-4 text-cyan-400">Electric ({inputs.evVehicleName})</th>
              <th className="py-3 px-4 text-emerald-400 text-right">Net Savings Delta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-200">
            {/* Purchase Price */}
            <tr>
              <td className="py-3 px-4 font-medium flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-slate-400" />
                <span>MSRP Base Purchase Price</span>
              </td>
              <td className="py-3 px-4 font-mono">{formatCurrency(inputs.gasVehiclePrice)}</td>
              <td className="py-3 px-4 font-mono">{formatCurrency(inputs.evVehiclePrice)}</td>
              <td className="py-3 px-4 font-mono text-right text-slate-400">
                {formatCurrency(inputs.evVehiclePrice - inputs.gasVehiclePrice)}
              </td>
            </tr>

            {/* State & Federal Incentives */}
            <tr>
              <td className="py-3 px-4 font-medium flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Federal & State Clean Vehicle Incentives</span>
              </td>
              <td className="py-3 px-4 font-mono text-slate-400">-$0</td>
              <td className="py-3 px-4 font-mono text-emerald-400 font-bold">-{formatCurrency(inputs.evTaxCredit)}</td>
              <td className="py-3 px-4 font-mono text-right text-emerald-400 font-bold">
                +{formatCurrency(inputs.evTaxCredit)}
              </td>
            </tr>

            {/* Net Upfront Price */}
            <tr className="bg-slate-900/50 font-bold">
              <td className="py-3 px-4 text-white">Net Upfront Vehicle Price</td>
              <td className="py-3 px-4 font-mono text-amber-300">{formatCurrency(results.netUpfrontGasPrice)}</td>
              <td className="py-3 px-4 font-mono text-cyan-300">{formatCurrency(results.netUpfrontEvPrice)}</td>
              <td className="py-3 px-4 font-mono text-right">
                {results.upfrontPriceDifference > 0 
                  ? `${formatCurrency(results.upfrontPriceDifference)} EV premium` 
                  : `${formatCurrency(Math.abs(results.upfrontPriceDifference))} EV cheaper`}
              </td>
            </tr>

            {/* Loan Interest Paid over 60 Months */}
            <tr className="bg-cyan-950/20">
              <td className="py-3 px-4 font-medium flex items-center space-x-2">
                <Percent className="w-4 h-4 text-cyan-400" />
                <span>60-Month Loan Bank Interest ({inputs.gasLoanInterestRate}% Gas vs {inputs.evLoanInterestRate}% Tesla)</span>
              </td>
              <td className="py-3 px-4 font-mono text-amber-400">{formatCurrency(results.gas5YearTotalInterest)}</td>
              <td className="py-3 px-4 font-mono text-emerald-400 font-bold">{formatCurrency(results.ev5YearTotalInterest)}</td>
              <td className="py-3 px-4 font-mono text-right text-emerald-400 font-bold">
                +{formatCurrency(results.interestSavingsWithEv)}
              </td>
            </tr>

            {/* Fuel / Power Cost */}
            <tr>
              <td className="py-3 px-4 font-medium flex items-center space-x-2">
                <Fuel className="w-4 h-4 text-amber-400" />
                <span>5-Year Fuel & Electricity Spending</span>
              </td>
              <td className="py-3 px-4 font-mono">
                {formatCurrency(results.yearlyBreakdowns.reduce((acc, curr) => acc + curr.gasFuelCost, 0))}
              </td>
              <td className="py-3 px-4 font-mono">
                {formatCurrency(results.yearlyBreakdowns.reduce((acc, curr) => acc + curr.evElectricityCost, 0))}
              </td>
              <td className="py-3 px-4 font-mono text-right text-emerald-400 font-bold">
                +{formatCurrency(
                  results.yearlyBreakdowns.reduce((acc, curr) => acc + curr.gasFuelCost - curr.evElectricityCost, 0)
                )}
              </td>
            </tr>

            {/* Utility Free Plan Savings Callout */}
            {results.utilityPlanAnnualSavings > 0 && (
              <tr className="text-emerald-300 text-xs">
                <td className="py-2.5 px-4 pl-8 font-medium flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Free Electricity Utility Plan Bonus (5-Yr)</span>
                </td>
                <td className="py-2.5 px-4 font-mono text-slate-500">—</td>
                <td className="py-2.5 px-4 font-mono text-emerald-400 font-semibold">
                  Saved {formatCurrency(results.utilityPlanAnnualSavings * 5)}
                </td>
                <td className="py-2.5 px-4 font-mono text-right text-emerald-400">Included above</td>
              </tr>
            )}

            {/* Auto Insurance */}
            <tr>
              <td className="py-3 px-4 font-medium flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>5-Year Auto Insurance Premiums</span>
              </td>
              <td className="py-3 px-4 font-mono">
                {formatCurrency(results.yearlyBreakdowns.reduce((acc, curr) => acc + curr.gasInsuranceCost, 0))}
              </td>
              <td className="py-3 px-4 font-mono">
                {formatCurrency(results.yearlyBreakdowns.reduce((acc, curr) => acc + curr.evInsuranceCost, 0))}
              </td>
              <td className="py-3 px-4 font-mono text-right text-slate-400">
                {formatCurrency(
                  results.yearlyBreakdowns.reduce((acc, curr) => acc + curr.gasInsuranceCost - curr.evInsuranceCost, 0)
                )}
              </td>
            </tr>

            {/* Maintenance */}
            <tr>
              <td className="py-3 px-4 font-medium flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>5-Year Scheduled Maintenance & Service</span>
              </td>
              <td className="py-3 px-4 font-mono">
                {formatCurrency(results.yearlyBreakdowns.reduce((acc, curr) => acc + curr.gasMaintenanceCost, 0))}
              </td>
              <td className="py-3 px-4 font-mono">
                {formatCurrency(results.yearlyBreakdowns.reduce((acc, curr) => acc + curr.evMaintenanceCost, 0))}
              </td>
              <td className="py-3 px-4 font-mono text-right text-emerald-400 font-bold">
                +{formatCurrency(
                  results.yearlyBreakdowns.reduce((acc, curr) => acc + curr.gasMaintenanceCost - curr.evMaintenanceCost, 0)
                )}
              </td>
            </tr>

            {/* Full Self-Driving Subscription */}
            {inputs.fsdSubscriptionEnabled && (
              <tr>
                <td className="py-3 px-4 font-medium flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>5-Year Full Self-Driving ($99/mo) Subscription</span>
                </td>
                <td className="py-3 px-4 font-mono text-slate-500">$0</td>
                <td className="py-3 px-4 font-mono text-slate-300">{formatCurrency(results.total5YearFsdCost)}</td>
                <td className="py-3 px-4 font-mono text-right text-amber-400">
                  -{formatCurrency(results.total5YearFsdCost)}
                </td>
              </tr>
            )}

            {/* RoboTaxi Passive Revenue */}
            {inputs.roboTaxi.enabled && (
              <tr className="bg-amber-950/20 font-bold text-amber-300">
                <td className="py-3 px-4 font-medium flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-amber-400" />
                  <span>5-Year RoboTaxi Idle Monetization Revenue</span>
                </td>
                <td className="py-3 px-4 font-mono text-slate-500">$0</td>
                <td className="py-3 px-4 font-mono text-amber-400">
                  +{formatCurrency(results.total5YearRoboTaxiRevenue)}
                </td>
                <td className="py-3 px-4 font-mono text-right text-amber-400 font-bold">
                  +{formatCurrency(results.total5YearRoboTaxiRevenue)}
                </td>
              </tr>
            )}

            {/* Total 5-Year TCO */}
            <tr className="bg-slate-900/90 font-extrabold text-base border-t-2 border-white/10">
              <td className="py-4 px-4 text-white">Net 5-Year Total Cost of Ownership</td>
              <td className="py-4 px-4 font-mono text-amber-400">{formatCurrency(results.total5YearGasCost)}</td>
              <td className="py-4 px-4 font-mono text-cyan-400">{formatCurrency(results.total5YearEvCost)}</td>
              <td className={`py-4 px-4 font-mono text-right ${results.net5YearSavings > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {results.net5YearSavings > 0 
                  ? `+${formatCurrency(results.net5YearSavings)} Net EV Savings`
                  : `${formatCurrency(Math.abs(results.net5YearSavings))} Gas Cheaper`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
