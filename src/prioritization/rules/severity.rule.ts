import { PrioritizationRule } from './prioritization.rule';

export class SeverityRule extends PrioritizationRule {
  evaluate(request: any, personData?: any): number {
    const severity = request?.severity || 0;

    // Severity is on 1-10 scale, convert to 0-20
    // severity * 2 = 0-20 points
    return Math.min(severity * 2, 20);
  }

  getMaxScore(): number {
    return 20;
  }

  getDescription(): string {
    return 'Evaluates the severity of the assistance need (1-10 scale)';
  }
}
