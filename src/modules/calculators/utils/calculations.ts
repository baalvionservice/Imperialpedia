/**
 * @fileOverview Precision financial calculation logic for the platform's tools.
 */

export const financialMath = {
  /**
   * Calculates compound interest with periodic contributions.
   * Formula: A = P(1 + r/n)^(nt) + PMT * (((1 + r/n)^(nt) - 1) / (r/n))
   */
  calculateCompoundInterest: (
    principal: number,
    annualRate: number,
    years: number,
    monthlyContribution: number = 0,
    compoundingPeriods: number = 12
  ): number => {
    const r = annualRate / 100;
    const n = compoundingPeriods;
    const t = years;
    
    const principalCompounded = principal * Math.pow(1 + r / n, n * t);
    
    if (r === 0) return principal + (monthlyContribution * 12 * t);
    
    const contributionsCompounded = monthlyContribution * 
      ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
      
    return principalCompounded + contributionsCompounded;
  },

  /**
   * Calculates monthly loan payment (EMI).
   * Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
   */
  calculateMonthlyLoanPayment: (
    principal: number,
    annualRate: number,
    years: number
  ): number => {
    const i = (annualRate / 100) / 12;
    const n = years * 12;
    
    if (i === 0) return principal / n;
    if (n === 0) return principal;
    
    const factor = Math.pow(1 + i, n);
    return principal * (i * factor) / (factor - 1);
  },

  /**
   * Provides a full breakdown of loan costs.
   */
  getLoanSummary: (principal: number, annualRate: number, years: number) => {
    const monthlyPayment = financialMath.calculateMonthlyLoanPayment(principal, annualRate, years);
    const totalRepayment = monthlyPayment * (years * 12);
    const totalInterest = totalRepayment - principal;
    
    return {
      monthlyPayment,
      totalRepayment,
      totalInterest
    };
  },

  /**
   * Calculates future value adjusted for inflation.
   */
  calculateInflationImpact: (
    currentValue: number,
    inflationRate: number,
    years: number
  ): number => {
    return currentValue * Math.pow(1 + (inflationRate / 100), years);
  }
};
