import { PrioritizationRule } from './prioritization.rule';

export class AgeRule extends PrioritizationRule {
  evaluate(request: any, personData?: any): number {
    const age = personData?.age || 0;

    // Prioritize children (0-12) and elderly (65+)
    if (age <= 12) {
      return 20;
    }
    if (age >= 65) {
      return 18;
    }
    // Youth and adults get lower score
    if (age < 18) {
      return 10;
    }
    return 0;
  }

  getMaxScore(): number {
    return 20;
  }

  getDescription(): string {
    return 'Prioritizes children and elderly persons based on age';
  }
}
