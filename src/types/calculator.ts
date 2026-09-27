export interface StateIncentive {
  code: string;
  name: string;
  amount: number;
  description: string;
}

export interface UtilityRatePlan {
  id: 'flat' | 'weekend-free' | 'night-owl' | 'custom-tou';
  name: string;
  description: string;
  freeWindowDescription: string;
  defaultFreePercentage: number;
  offPeakRatePerKwh: number;
}

export interface RoboTaxiSettings {
  enabled: boolean;
  idleHoursPerDay: number;
  activeRideHoursPerDay: number;
  activeDaysPerWeek: number;
  netHourlyEarnings: number;
}

export interface CalculatorInputs {
  // Vehicle Comparison Specs
  gasVehicleName: string;
  gasMpg: number;
  gasVehiclePrice: number;
  
  evVehicleName: string;
  evTrimId?: string;
  evEfficiency: number;
  evVehiclePrice: number;
  
  // Incentives
  selectedStateCode: string;
  federalTaxCredit: number;
  stateTaxCredit: number;
  evTaxCredit: number;
  gasRebate: number;
  
  // Financing APR Comparison
  loanTermMonths: number;
  evLoanInterestRate: number; // e.g. 1.0% APR (Tesla promo)
  gasLoanInterestRate: number; // e.g. 5.5% APR (Standard auto loan)
  evDownPayment: number;
  gasDownPayment: number;

  // Additional Software Subscriptions
  fsdSubscriptionEnabled: boolean;
  fsdMonthlyCost: number; // default $99/month
  
  // Usage Profile
  annualMiles: number;
  yearsToForecast: number;
  
  // Energy Rates & Utility Plans
  ratePlanId: 'flat' | 'weekend-free' | 'night-owl' | 'custom-tou';
  gasPricePerGallon: number;
  electricityRatePerKwh: number;
  offPeakElectricityRatePerKwh: number;
  freeChargingSharePercent: number;
  
  publicChargingSharePercent: number;
  publicChargingMultiplier: number;
  homeSolarOffsetPercent: number;
  
  // Service & Insurance
  annualGasInflationPercent: number;
  annualElectricityInflationPercent: number;
  gasAnnualMaintenance: number;
  evAnnualMaintenance: number;
  gasAnnualInsurance: number;
  evAnnualInsurance: number; // Includes EV insurance adjustment

  // RoboTaxi / Autonomous Fleet Sharing
  roboTaxi: RoboTaxiSettings;
}

export interface YearBreakdown {
  year: number;
  gasFuelCost: number;
  evElectricityCost: number;
  gasMaintenanceCost: number;
  evMaintenanceCost: number;
  gasInsuranceCost: number;
  evInsuranceCost: number;
  evFsdCostYear: number;
  gasLoanPaymentYear: number;
  evLoanPaymentYear: number;
  roboTaxiRevenueYear: number;
  gasTotalYearCost: number;
  evTotalYearCost: number;
  cumulativeGasCost: number;
  cumulativeEvCost: number;
  cumulativeSavings: number;
  co2GasTons: number;
  co2EvTons: number;
  cumulativeCo2SavedTons: number;
}

export interface CalculationResults {
  yearlyBreakdowns: YearBreakdown[];
  
  // Summary Stats
  total5YearGasCost: number;
  total5YearEvCost: number;
  net5YearSavings: number;
  
  // Monthly Averages (Year 1)
  monthlyGasFuel: number;
  monthlyEvElectricity: number;
  monthlyFuelSavings: number;

  // Loan Financing Results
  evMonthlyLoanPayment: number;
  gasMonthlyLoanPayment: number;
  ev5YearTotalInterest: number;
  gas5YearTotalInterest: number;
  interestSavingsWithEv: number;
  
  // Subscriptions & Utility Plan Savings
  total5YearFsdCost: number;
  effectiveHomeRatePerKwh: number;
  utilityPlanAnnualSavings: number;
  
  // RoboTaxi Metrics
  monthlyRoboTaxiRevenue: number;
  total5YearRoboTaxiRevenue: number;
  
  // Total Vehicle Upfront Delta
  netUpfrontGasPrice: number;
  netUpfrontEvPrice: number;
  upfrontPriceDifference: number;
  
  // Payback & ROI
  paybackMonth: number | null;
  paybackYearsFormatted: string;
  fiveYearRoiPercent: number;
  
  // Environmental Impact
  annualCo2SavedTons: number;
  total5YearCo2SavedTons: number;
  equivalentTreesPlanted: number;
  
  // Equivalent Cost Math
  effectiveEvCostPerMile: number;
  effectiveGasCostPerMile: number;
  gallonEquivalentPrice: number;

  // Final Decision AI Recommendation
  verdictRecommendation: 'STRONG_EV_RECOMMENDED' | 'MODERATE_EV_RECOMMENDED' | 'GAS_RECOMMENDED';
  verdictTitle: string;
  verdictSummary: string;
  evPros: string[];
  evCons: string[];
  gasPros: string[];
  gasCons: string[];
}

export interface PresetProfile {
  id: string;
  name: string;
  description: string;
  iconName: string;
  inputs: Partial<CalculatorInputs>;
}
