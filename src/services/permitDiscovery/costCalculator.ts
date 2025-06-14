
import { DiscoveredPermit } from './types';

export class CostCalculator {
  static calculateTimeline(permits: DiscoveredPermit[]): string {
    // Calculate based on critical path and dependencies
    const maxDays = permits.reduce((max, permit) => {
      const days = this.parseDays(permit.processingTime);
      return Math.max(max, days);
    }, 0);

    const totalDays = maxDays + (permits.length * 5); // Add buffer for sequential processing
    
    if (totalDays <= 30) return '2-4 semanas';
    if (totalDays <= 60) return '1-2 meses';
    if (totalDays <= 90) return '2-3 meses';
    return '3-6 meses';
  }

  static calculateCosts(permits: DiscoveredPermit[]): string {
    const costs = permits.map(permit => this.parseCost(permit.estimatedCost));
    const minTotal = costs.reduce((sum, cost) => sum + cost.min, 0);
    const maxTotal = costs.reduce((sum, cost) => sum + cost.max, 0);
    
    return `$${minTotal.toLocaleString()} - $${maxTotal.toLocaleString()}`;
  }

  private static parseDays(timeString: string): number {
    const match = timeString.match(/(\d+)/);
    return match ? parseInt(match[1]) : 30;
  }

  private static parseCost(costString: string): { min: number; max: number } {
    const matches = costString.match(/\$(\d+(?:,\d+)?)-?(\d+(?:,\d+)?)?/);
    if (!matches) return { min: 0, max: 0 };
    
    const min = parseInt(matches[1].replace(',', ''));
    const max = matches[2] ? parseInt(matches[2].replace(',', '')) : min;
    
    return { min, max };
  }
}
