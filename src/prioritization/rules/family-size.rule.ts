import { PrioritizationRule } from './prioritization.rule';

export class FamilySizeRule extends PrioritizationRule {
  evaluate(request: any, personData?: any): number {
    const familySize = personData?.familySize || 1;

    // Larger families have more needs
    if (familySize >= 5) {
      return 20;
    }
    if (familySize >= 3) {
      return 15;
    }
    if (familySize >= 2) {
      return 10;
    }
    return 0;
  }

  getMaxScore(): number {
    return 20;
  }

  getDescription(): string {
    return 'Evaluates family size to prioritize larger families with more needs';
  }
}
