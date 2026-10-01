import { Injectable } from '@nestjs/common';
import { DisabilityRule } from './rules/disability.rule';
import { AgeRule } from './rules/age.rule';
import { FamilySizeRule } from './rules/family-size.rule';
import { IncomeRule } from './rules/income.rule';
import { SeverityRule } from './rules/severity.rule';

@Injectable()
export class PrioritizationService {
  private rules = [
    new DisabilityRule(),
    new AgeRule(),
    new FamilySizeRule(),
    new IncomeRule(),
    new SeverityRule(),
  ];

  /**
   * Calculate priority score for an assistance request
   * Score range: 0-100
   * Higher score = Higher priority
   */
  calculatePriority(request: any, personData?: any): number {
    let totalScore = 0;

    for (const rule of this.rules) {
      const ruleScore = rule.evaluate(request, personData);
      totalScore += ruleScore;
    }

    // Normalize to 0-100 scale
    const normalizedScore = Math.min(totalScore, 100);
    return Math.round(normalizedScore);
  }

  /**
   * Get priority level based on score
   */
  getPriorityLevel(score: number): string {
    if (score >= 80) return 'CRITICAL';
    if (score >= 60) return 'HIGH';
    if (score >= 40) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Get all scoring rules for transparency
   */
  getAvailableRules() {
    return this.rules.map(rule => ({
      name: rule.constructor.name,
      maxScore: rule.getMaxScore(),
      description: rule.getDescription(),
    }));
  }
}
