import type { 
  CalculatorInputs, 
  CalculationResults, 
  YearBreakdown, 
  PresetProfile,
  StateIncentive,
  UtilityRatePlan 
} from '../types/calculator';

export const TESLA_MODEL_Y_2026_TRIMS = [
  {
    id: 'tesla-y-2026-rwd',
    name: 'Tesla Model Y 2026 RWD (Standard)',
    price: 44990,
    efficiency: 3.9,
    range: '321 miles',
    description: 'Rear-Wheel Drive, updated 2026 "Juniper" styling & silent cabin.',
  },
  {
    id: 'tesla-y-2026-lr',
    name: 'Tesla Model Y 2026 Long Range AWD',
    price: 48990,
    efficiency: 3.8,
    range: '327 miles',
    description: 'Dual Motor All-Wheel Drive, top pick for cold climates & road trips.',
  },
  {
    id: 'tesla-y-2026-perf',
    name: 'Tesla Model Y 2026 Performance AWD',
    price: 57490,
    efficiency: 3.5,
    range: '306 miles',
    description: '0-60 mph in 3.3s, lowered suspension & performance brakes.',
  },
];

export const STATE_INCENTIVES: StateIncentive[] = [
  { code: 'NONE', name: 'No State Credit ($0)', amount: 0, description: 'Standard federal incentives only' },
  { code: 'CO', name: 'Colorado ($5,000)', amount: 5000, description: 'Innovative Motor Vehicle Credit ($5,000 refundable)' },
  { code: 'NJ', name: 'New Jersey ($4,000)', amount: 4000, description: 'Charge Up NJ point-of-sale rebate' },
  { code: 'IL', name: 'Illinois ($4,000)', amount: 4000, description: 'Illinois EPA EV Rebate Program' },
  { code: 'CT', name: 'Connecticut ($4,250)', amount: 4250, description: 'CHEAPR program rebate' },
  { code: 'MA', name: 'Massachusetts ($3,500)', amount: 3500, description: 'MOR-EV rebate for purchase/lease' },
  { code: 'WA', name: 'Washington (~$3,800)', amount: 3800, description: 'Exemption from state retail sales tax' },
  { code: 'CA', name: 'California ($2,000 - $7,500)', amount: 2000, description: 'Clean Cars 4 All / localized air district grants' },
  { code: 'OR', name: 'Oregon ($2,500)', amount: 2500, description: 'Clean Vehicle Rebate Project' },
  { code: 'NY', name: 'New York ($2,000)', amount: 2000, description: 'Drive Clean Rebate point-of-sale' },
  { code: 'CUSTOM', name: 'Custom State Credit', amount: 0, description: 'Manually specify your local city or state rebate' },
];

export const UTILITY_RATE_PLANS: UtilityRatePlan[] = [
  {
    id: 'flat',
    name: 'Standard Flat Rate',
    description: 'Same electricity cost regardless of time of day.',
    freeWindowDescription: 'No free windows',
    defaultFreePercentage: 0,
    offPeakRatePerKwh: 0.16,
  },
  {
    id: 'weekend-free',
    name: 'Free Weekends Plan (Fri 6p – Sun 11:59p)',
    description: '100% Free home charging during entire weekend window.',
    freeWindowDescription: 'Friday 6:00 PM to Sunday 11:59 PM (100% Free)',
    defaultFreePercentage: 85,
    offPeakRatePerKwh: 0.00,
  },
  {
    id: 'night-owl',
    name: 'Night Owl Plan (6p – 6a Free / Off-Peak)',
    description: '100% Free or ultra-discounted overnight home charging.',
    freeWindowDescription: 'Every night 6:00 PM to 6:00 AM (100% Free)',
    defaultFreePercentage: 90,
    offPeakRatePerKwh: 0.00,
  },
  {
    id: 'custom-tou',
    name: 'Custom Time-of-Use Schedule',
    description: 'Configure your custom off-peak rate and scheduled charging share.',
    freeWindowDescription: 'Custom off-peak window',
    defaultFreePercentage: 70,
    offPeakRatePerKwh: 0.04,
  },
];

export const DEFAULT_INPUTS: CalculatorInputs = {
  gasVehicleName: 'Toyota RAV4 / Camry Gasoline',
  gasMpg: 28,
  gasVehiclePrice: 32000,
  
  evVehicleName: 'Tesla Model Y 2026 Long Range AWD',
  evTrimId: 'tesla-y-2026-lr',
  evEfficiency: 3.8,
  evVehiclePrice: 48990,
  
  selectedStateCode: 'CO',
  federalTaxCredit: 0,
  stateTaxCredit: 5000,
  evTaxCredit: 5000,
  gasRebate: 0,
  
  loanTermMonths: 60,
  evLoanInterestRate: 1.0, // 1% Tesla Promo APR!
  gasLoanInterestRate: 5.5, // Standard 5.5% APR
  evDownPayment: 5000,
  gasDownPayment: 5000,

  fsdSubscriptionEnabled: true,
  fsdMonthlyCost: 99,
  
  annualMiles: 13500,
  yearsToForecast: 5,
  
  ratePlanId: 'weekend-free',
  gasPricePerGallon: 3.65,
  electricityRatePerKwh: 0.18,
  offPeakElectricityRatePerKwh: 0.00,
  freeChargingSharePercent: 85,
  
  publicChargingSharePercent: 15,
  publicChargingMultiplier: 2.2,
  homeSolarOffsetPercent: 0,
  
  annualGasInflationPercent: 3.5,
  annualElectricityInflationPercent: 2.0,
  gasAnnualMaintenance: 850,
  evAnnualMaintenance: 350,
  gasAnnualInsurance: 1800,
  evAnnualInsurance: 2200, // Adjusted EV insurance rate

  roboTaxi: {
    enabled: true,
    idleHoursPerDay: 7,
    activeRideHoursPerDay: 3.5,
    activeDaysPerWeek: 5,
    netHourlyEarnings: 22.00,
  },
};

// Loan Monthly Payment Helper Formula
function calculateMonthlyLoanPayment(principal: number, annualInterestRatePercent: number, loanTermMonths: number): number {
  if (principal <= 0 || loanTermMonths <= 0) return 0;
  const monthlyRate = annualInterestRatePercent / 100 / 12;
  if (monthlyRate === 0) return principal / loanTermMonths;
  
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / 
         (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
}

export function calculateEvVsGas(inputs: CalculatorInputs): CalculationResults {
  const {
    annualMiles,
    gasMpg,
    evEfficiency,
    gasPricePerGallon,
    electricityRatePerKwh,
    offPeakElectricityRatePerKwh,
    freeChargingSharePercent,
    publicChargingSharePercent,
    publicChargingMultiplier,
    homeSolarOffsetPercent,
    annualGasInflationPercent,
    annualElectricityInflationPercent,
    gasAnnualMaintenance,
    evAnnualMaintenance,
    gasAnnualInsurance,
    evAnnualInsurance,
    gasVehiclePrice,
    evVehiclePrice,
    evTaxCredit,
    gasRebate,
    loanTermMonths,
    evLoanInterestRate,
    gasLoanInterestRate,
    evDownPayment,
    gasDownPayment,
    fsdSubscriptionEnabled,
    fsdMonthlyCost,
    yearsToForecast = 5,
    roboTaxi,
  } = inputs;

  const netUpfrontGasPrice = Math.max(0, gasVehiclePrice - gasRebate);
  const netUpfrontEvPrice = Math.max(0, evVehiclePrice - evTaxCredit);
  const upfrontPriceDifference = netUpfrontEvPrice - netUpfrontGasPrice;

  // Loan Financing Calculations
  const gasFinancedPrincipal = Math.max(0, netUpfrontGasPrice - gasDownPayment);
  const evFinancedPrincipal = Math.max(0, netUpfrontEvPrice - evDownPayment);

  const gasMonthlyLoanPayment = calculateMonthlyLoanPayment(gasFinancedPrincipal, gasLoanInterestRate, loanTermMonths);
  const evMonthlyLoanPayment = calculateMonthlyLoanPayment(evFinancedPrincipal, evLoanInterestRate, loanTermMonths);

  const gas5YearTotalInterest = (gasMonthlyLoanPayment * Math.min(60, loanTermMonths)) - gasFinancedPrincipal;
  const ev5YearTotalInterest = (evMonthlyLoanPayment * Math.min(60, loanTermMonths)) - evFinancedPrincipal;
  const interestSavingsWithEv = Math.max(0, gas5YearTotalInterest - ev5YearTotalInterest);

  // FSD Subscription Cost
  const monthlyFsd = fsdSubscriptionEnabled ? fsdMonthlyCost : 0;
  const annualFsd = monthlyFsd * 12;
  const total5YearFsdCost = annualFsd * yearsToForecast;

  // RoboTaxi Monthly & Annual Revenue Calculation
  let monthlyRoboTaxiRevenue = 0;
  if (roboTaxi && roboTaxi.enabled) {
    const weeklyRideHours = roboTaxi.activeRideHoursPerDay * roboTaxi.activeDaysPerWeek;
    const monthlyRideHours = weeklyRideHours * 4.33;
    monthlyRoboTaxiRevenue = monthlyRideHours * roboTaxi.netHourlyEarnings;
  }
  const annualRoboTaxiRevenue = monthlyRoboTaxiRevenue * 12;
  const total5YearRoboTaxiRevenue = annualRoboTaxiRevenue * yearsToForecast;

  // Effective Home Electricity Rate Calculation
  const homeFraction = 1 - (publicChargingSharePercent / 100);
  const freeFraction = (freeChargingSharePercent / 100);
  const peakFraction = 1 - freeFraction;

  const effectiveHomeRatePerKwh = 
    (peakFraction * electricityRatePerKwh + freeFraction * offPeakElectricityRatePerKwh) * 
    (1 - homeSolarOffsetPercent / 100);

  const flatHomeCostAnnual = (annualMiles / Math.max(0.5, evEfficiency)) * homeFraction * electricityRatePerKwh;
  const touHomeCostAnnual = (annualMiles / Math.max(0.5, evEfficiency)) * homeFraction * effectiveHomeRatePerKwh;
  const utilityPlanAnnualSavings = Math.max(0, flatHomeCostAnnual - touHomeCostAnnual);

  const yearlyBreakdowns: YearBreakdown[] = [];
  let cumulativeGasCost = gasDownPayment;
  let cumulativeEvCost = evDownPayment;

  const METRIC_TONS_CO2_PER_GALLON = 0.008887;
  const METRIC_TONS_CO2_PER_KWH_GRID = 0.0003855;
  const METRIC_TONS_CO2_PER_TREE_PER_YEAR = 0.02177;

  const annualGallonsNeeded = annualMiles / Math.max(1, gasMpg);
  const annualKwhNeeded = annualMiles / Math.max(0.5, evEfficiency);

  for (let year = 1; year <= yearsToForecast; year++) {
    const gasInflationFactor = Math.pow(1 + annualGasInflationPercent / 100, year - 1);
    const evInflationFactor = Math.pow(1 + annualElectricityInflationPercent / 100, year - 1);

    // Fuel costs
    const currentGasPrice = gasPricePerGallon * gasInflationFactor;
    const gasFuelCost = annualGallonsNeeded * currentGasPrice;

    // EV Electricity rates with TOU
    const currentPeakHomeRate = electricityRatePerKwh * evInflationFactor;
    const currentOffPeakHomeRate = offPeakElectricityRatePerKwh * evInflationFactor;
    const currentPublicRate = currentPeakHomeRate * publicChargingMultiplier;

    const currentEffectiveHomeRate = 
      (peakFraction * currentPeakHomeRate + freeFraction * currentOffPeakHomeRate) * 
      (1 - homeSolarOffsetPercent / 100);

    const publicKwh = annualKwhNeeded * (publicChargingSharePercent / 100);
    const homeKwh = annualKwhNeeded * homeFraction;

    const evElectricityCost = (homeKwh * currentEffectiveHomeRate) + (publicKwh * currentPublicRate);

    // Maintenance & Insurance
    const gasMaint = gasAnnualMaintenance * Math.pow(1.02, year - 1);
    const evMaint = evAnnualMaintenance * Math.pow(1.02, year - 1);
    const gasIns = gasAnnualInsurance * Math.pow(1.025, year - 1);
    const evIns = evAnnualInsurance * Math.pow(1.025, year - 1);

    // Loan Payments for this year
    const gasLoanPaymentYear = year <= (loanTermMonths / 12) ? gasMonthlyLoanPayment * 12 : 0;
    const evLoanPaymentYear = year <= (loanTermMonths / 12) ? evMonthlyLoanPayment * 12 : 0;

    // Software FSD Cost
    const evFsdCostYear = annualFsd;

    // Total Year Costs
    const gasTotalYearCost = gasFuelCost + gasMaint + gasIns + gasLoanPaymentYear;
    const evTotalYearCostBeforeRobo = evElectricityCost + evMaint + evIns + evLoanPaymentYear + evFsdCostYear;
    const roboTaxiRevenueYear = annualRoboTaxiRevenue * Math.pow(1.01, year - 1);
    const evTotalYearCost = evTotalYearCostBeforeRobo - roboTaxiRevenueYear;

    cumulativeGasCost += gasTotalYearCost;
    cumulativeEvCost += evTotalYearCost;
    const cumulativeSavings = cumulativeGasCost - cumulativeEvCost;

    // CO2 emissions
    const co2GasTons = annualGallonsNeeded * METRIC_TONS_CO2_PER_GALLON;
    const gridKwhUsed = homeKwh * (1 - homeSolarOffsetPercent / 100) + publicKwh;
    const co2EvTons = gridKwhUsed * METRIC_TONS_CO2_PER_KWH_GRID;
    const co2SavedYear = co2GasTons - co2EvTons;

    const prevCo2Saved = year > 1 ? yearlyBreakdowns[year - 2].cumulativeCo2SavedTons : 0;
    const cumulativeCo2SavedTons = prevCo2Saved + co2SavedYear;

    yearlyBreakdowns.push({
      year,
      gasFuelCost,
      evElectricityCost,
      gasMaintenanceCost: gasMaint,
      evMaintenanceCost: evMaint,
      gasInsuranceCost: gasIns,
      evInsuranceCost: evIns,
      evFsdCostYear,
      gasLoanPaymentYear,
      evLoanPaymentYear,
      roboTaxiRevenueYear,
      gasTotalYearCost,
      evTotalYearCost,
      cumulativeGasCost,
      cumulativeEvCost,
      cumulativeSavings,
      co2GasTons,
      co2EvTons,
      cumulativeCo2SavedTons,
    });
  }

  // Monthly Averages for Year 1
  const year1 = yearlyBreakdowns[0];
  const monthlyGasFuel = year1 ? year1.gasFuelCost / 12 : 0;
  const monthlyEvElectricity = year1 ? year1.evElectricityCost / 12 : 0;
  const monthlyFuelSavings = monthlyGasFuel - monthlyEvElectricity;

  const total5YearGasCost = cumulativeGasCost;
  const total5YearEvCost = cumulativeEvCost;
  const net5YearSavings = total5YearGasCost - total5YearEvCost;

  // Payback Month calculation
  let paybackMonth: number | null = null;
  let runningGas = gasDownPayment;
  let runningEv = evDownPayment;

  if (netUpfrontEvPrice <= netUpfrontGasPrice) {
    paybackMonth = 0;
  } else {
    for (let m = 1; m <= 120; m++) {
      const yearIdx = Math.min(yearsToForecast - 1, Math.floor((m - 1) / 12));
      const breakdown = yearlyBreakdowns[yearIdx] || yearlyBreakdowns[yearlyBreakdowns.length - 1];
      const monthlyGasRun = breakdown.gasTotalYearCost / 12;
      const monthlyEvRun = breakdown.evTotalYearCost / 12;

      runningGas += monthlyGasRun;
      runningEv += monthlyEvRun;

      if (runningEv <= runningGas) {
        paybackMonth = m;
        break;
      }
    }
  }

  let paybackYearsFormatted = 'N/A (> 10 Yrs)';
  if (paybackMonth === 0) {
    paybackYearsFormatted = 'Immediate (Cheaper upfront)';
  } else if (paybackMonth !== null) {
    const yrs = (paybackMonth / 12).toFixed(1);
    paybackYearsFormatted = `${yrs} Years (${paybackMonth} Months)`;
  }

  const fiveYearRoiPercent = upfrontPriceDifference > 0
    ? ((net5YearSavings / upfrontPriceDifference) * 100)
    : 100;

  const annualCo2SavedTons = year1 ? year1.co2GasTons - year1.co2EvTons : 0;
  const total5YearCo2SavedTons = yearlyBreakdowns.length > 0 
    ? yearlyBreakdowns[yearlyBreakdowns.length - 1].cumulativeCo2SavedTons 
    : 0;

  const equivalentTreesPlanted = Math.round(total5YearCo2SavedTons / METRIC_TONS_CO2_PER_TREE_PER_YEAR);

  // Gallon Equivalent Math
  const effectiveEvCostPerMile = year1 ? year1.evElectricityCost / Math.max(1, annualMiles) : 0;
  const effectiveGasCostPerMile = year1 ? year1.gasFuelCost / Math.max(1, annualMiles) : 0;
  const gallonEquivalentPrice = effectiveEvCostPerMile * gasMpg;

  // Decision Recommendation Synthesis
  let verdictRecommendation: 'STRONG_EV_RECOMMENDED' | 'MODERATE_EV_RECOMMENDED' | 'GAS_RECOMMENDED' = 'STRONG_EV_RECOMMENDED';
  let verdictTitle = '';
  let verdictSummary = '';

  if (net5YearSavings > 5000) {
    verdictRecommendation = 'STRONG_EV_RECOMMENDED';
    verdictTitle = 'YES! Switching to Tesla Model Y 2026 is an Outstanding Financial Decision.';
    verdictSummary = `By taking advantage of Tesla's 1.0% APR promotional financing, Free Utility Energy rates, and low maintenance, switching saves an estimated $${net5YearSavings.toLocaleString()} over 5 years compared to a gas vehicle.`;
  } else if (net5YearSavings > 0) {
    verdictRecommendation = 'MODERATE_EV_RECOMMENDED';
    verdictTitle = 'YES — EV Yields Net Savings & Premium Technology Benefits.';
    verdictSummary = `Switching yields a net 5-year savings of $${net5YearSavings.toLocaleString()}. Lower interest rates (1% APR) and zero fuel spending outweigh higher insurance rates.`;
  } else {
    verdictRecommendation = 'GAS_RECOMMENDED';
    verdictTitle = 'SLIGHT GAS ADVANTAGE under current parameters.';
    verdictSummary = `Due to lower annual mileage or high initial purchase price delta, the gas vehicle incurs $${Math.abs(net5YearSavings).toLocaleString()} less in total costs over 5 years. Enabling RoboTaxi or taking state credits can tip the balance to EV!`;
  }

  const evPros = [
    `Tesla 1.0% Promotional APR saves ~$${Math.round(interestSavingsWithEv).toLocaleString()} in loan interest vs 5.5% gas financing.`,
    `Free Utility Plans reduce home charging energy costs down to $${gallonEquivalentPrice.toFixed(2)}/gallon equivalent.`,
    `Minimal scheduled maintenance (no oil changes, spark plugs, or frequent brake jobs due to regenerative braking).`,
    roboTaxi.enabled ? `RoboTaxi passive monetization generates ~$${Math.round(monthlyRoboTaxiRevenue).toLocaleString()}/month during office idle commute.` : `Autonomous hardware ready for future RoboTaxi fleet updates.`,
    `Zero tailpipe emissions, saving ~${total5YearCo2SavedTons.toFixed(1)} metric tons of CO2 over 5 years.`,
  ];

  const evCons = [
    `Higher upfront purchase price ($${evVehiclePrice.toLocaleString()} vs $${gasVehiclePrice.toLocaleString()}).`,
    `Auto insurance premium is ~$${Math.round(evAnnualInsurance - gasAnnualInsurance)}/yr higher for EVs.`,
    fsdSubscriptionEnabled ? `Full Self-Driving subscription adds $${fsdMonthlyCost}/mo ($${total5YearFsdCost.toLocaleString()} over 5 yrs).` : `FSD hardware present but subscription optional.`,
  ];

  const gasPros = [
    `Lower initial purchase price ($${gasVehiclePrice.toLocaleString()} MSRP).`,
    `Slightly lower annual auto insurance premiums (~$${gasAnnualInsurance}/yr).`,
    `Fast 2-minute gas station refueling for long road trips.`,
  ];

  const gasCons = [
    `Higher 5.5% loan interest rate costs $${Math.round(gas5YearTotalInterest).toLocaleString()} in bank interest over 60 months.`,
    `High recurring fuel spending ($${Math.round(monthlyGasFuel).toLocaleString()}/month at $${gasPricePerGallon.toFixed(2)}/gal).`,
    `Frequent mechanical maintenance (engine oil, transmission fluids, brake pads).`,
    `Zero opportunity for passive revenue or utility off-peak free charging.`,
  ];

  return {
    yearlyBreakdowns,
    total5YearGasCost,
    total5YearEvCost,
    net5YearSavings,
    monthlyGasFuel,
    monthlyEvElectricity,
    monthlyFuelSavings,
    evMonthlyLoanPayment,
    gasMonthlyLoanPayment,
    ev5YearTotalInterest,
    gas5YearTotalInterest,
    interestSavingsWithEv,
    total5YearFsdCost,
    effectiveHomeRatePerKwh,
    utilityPlanAnnualSavings,
    monthlyRoboTaxiRevenue,
    total5YearRoboTaxiRevenue,
    netUpfrontGasPrice,
    netUpfrontEvPrice,
    upfrontPriceDifference,
    paybackMonth,
    paybackYearsFormatted,
    fiveYearRoiPercent,
    annualCo2SavedTons,
    total5YearCo2SavedTons,
    equivalentTreesPlanted,
    effectiveEvCostPerMile,
    effectiveGasCostPerMile,
    gallonEquivalentPrice,
    verdictRecommendation,
    verdictTitle,
    verdictSummary,
    evPros,
    evCons,
    gasPros,
    gasCons,
  };
}

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: 'tesla-y-2026-weekend-free',
    name: 'Tesla Model Y 2026 (1% APR + Weekend Free)',
    description: '1% Promo APR, Free Weekend charging + $5,000 State Incentive.',
    iconName: 'zap',
    inputs: {
      evVehicleName: 'Tesla Model Y 2026 Long Range AWD',
      evTrimId: 'tesla-y-2026-lr',
      evVehiclePrice: 48990,
      evEfficiency: 3.8,
      evLoanInterestRate: 1.0,
      gasLoanInterestRate: 5.5,
      ratePlanId: 'weekend-free',
      freeChargingSharePercent: 85,
      offPeakElectricityRatePerKwh: 0.00,
      selectedStateCode: 'CO',
      stateTaxCredit: 5000,
      evTaxCredit: 5000,
      fsdSubscriptionEnabled: true,
      fsdMonthlyCost: 99,
      annualMiles: 13500,
    },
  },
  {
    id: 'tesla-robotaxi-monetized',
    name: 'Tesla Model Y 2026 + RoboTaxi Monetized',
    description: '1% APR, FSD $99/mo + Idle commute active in RoboTaxi fleet ($475+/mo).',
    iconName: 'flame',
    inputs: {
      evVehicleName: 'Tesla Model Y 2026 RWD (Standard)',
      evTrimId: 'tesla-y-2026-rwd',
      evVehiclePrice: 44990,
      evEfficiency: 3.9,
      evLoanInterestRate: 1.0,
      gasLoanInterestRate: 5.5,
      ratePlanId: 'night-owl',
      freeChargingSharePercent: 90,
      offPeakElectricityRatePerKwh: 0.00,
      fsdSubscriptionEnabled: true,
      fsdMonthlyCost: 99,
      roboTaxi: {
        enabled: true,
        idleHoursPerDay: 7,
        activeRideHoursPerDay: 3.5,
        activeDaysPerWeek: 5,
        netHourlyEarnings: 22.00,
      },
    },
  },
  {
    id: 'average-us',
    name: 'Standard Gas vs EV Commuter',
    description: '13,500 mi/yr, $3.65/gal gas, standard $0.16/kWh flat rate.',
    iconName: 'car',
    inputs: {
      annualMiles: 13500,
      gasPricePerGallon: 3.65,
      electricityRatePerKwh: 0.16,
      ratePlanId: 'flat',
      freeChargingSharePercent: 0,
      publicChargingSharePercent: 20,
      gasMpg: 28,
      evEfficiency: 3.8,
      fsdSubscriptionEnabled: false,
      roboTaxi: {
        enabled: false,
        idleHoursPerDay: 7,
        activeRideHoursPerDay: 0,
        activeDaysPerWeek: 5,
        netHourlyEarnings: 20,
      },
    },
  },
];
