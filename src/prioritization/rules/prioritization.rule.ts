/**
 * Base class for prioritization rules
 * Each rule evaluates a specific criterion and assigns a score
 */
export abstract class PrioritizationRule {
  /**
   * Evaluate the rule and return a score (0-20)
   */
  abstract evaluate(request: any, personData?: any): number;

  /**
   * Get the maximum score this rule can assign
   */
  abstract getMaxScore(): number;

  /**
   * Get a description of what this rule evaluates
   */
  abstract getDescription(): string;
}
