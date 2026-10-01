import { PrioritizationRule } from './prioritization.rule';

export class IncomeRule extends PrioritizationRule {
  evaluate(request: any, personData?: any): number {
    const monthlyIncome = personData?.monthlyIncome || 0;

    // Lower income = higher priority
    if (monthlyIncome <= 250000) {
      // ~$250 USD
      return 20;
    }
    if (monthlyIncome <= 500000) {
      // ~$500 USD
      return 15;
    }
    if (monthlyIncome <= 1000000) {
      // ~$1000 USD
      return 10;
    }
    return 0;
  }

  getMaxScore(): number {
    return 20;
  }

  getDescription(): string {
    return 'Prioritizes persons with lower monthly income (economic vulnerability)';
  }
}
