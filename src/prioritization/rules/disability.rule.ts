import { PrioritizationRule } from './prioritization.rule';

export class DisabilityRule extends PrioritizationRule {
  evaluate(request: any, personData?: any): number {
    // If person has disability, add 20 points
    if (personData?.hasDisability) {
      return 20;
    }
    return 0;
  }

  getMaxScore(): number {
    return 20;
  }

  getDescription(): string {
    return 'Evaluates if the affected person has a disability';
  }
}
