
import { SECURITY_CONFIG } from './constants';

// Rate Limiting Storage (using localStorage for demo - in production use Redis/database)
export class RateLimiter {
  private static getKey(action: string, identifier: string): string {
    return `rate_limit_${action}_${identifier}`;
  }
  
  static check(action: keyof typeof SECURITY_CONFIG.RATE_LIMITS, identifier: string = 'anonymous'): boolean {
    const key = this.getKey(action, identifier);
    const limit = SECURITY_CONFIG.RATE_LIMITS[action];
    const now = Date.now();
    const windowStart = now - 60000; // 1 minute window
    
    try {
      const stored = localStorage.getItem(key);
      const attempts = stored ? JSON.parse(stored) : [];
      
      // Filter attempts within current window
      const recentAttempts = attempts.filter((timestamp: number) => timestamp > windowStart);
      
      if (recentAttempts.length >= limit) {
        return false; // Rate limit exceeded
      }
      
      // Add current attempt and store
      recentAttempts.push(now);
      localStorage.setItem(key, JSON.stringify(recentAttempts));
      
      return true;
    } catch (error) {
      console.error('Rate limiting error:', error);
      return true; // Fail open for localStorage errors
    }
  }
}
