
// Auth0 Security Integration
import { AuditLogger } from './auditLogger';
import { RateLimiter } from './rateLimiter';
import { sanitizeInput } from './sanitization';

export const logAuth0Event = (action: string, userId?: string, details?: Record<string, any>) => {
  AuditLogger.log({
    action: `auth0_${action}`,
    userId,
    details: {
      ...details,
      timestamp: new Date().toISOString(),
      source: 'auth0'
    }
  });
};

export const validateAuth0Action = (action: 'login' | 'signup' | 'logout', userId?: string): boolean => {
  const identifier = userId || 'anonymous';
  
  // Apply rate limiting based on action type
  switch (action) {
    case 'login':
    case 'signup':
      return RateLimiter.check('formSubmission', identifier);
    case 'logout':
      return true; // No rate limiting for logout
    default:
      return false;
  }
};

export const sanitizeAuth0UserData = (userData: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};
  
  Object.keys(userData).forEach(key => {
    if (typeof userData[key] === 'string') {
      sanitized[key] = sanitizeInput(userData[key]);
    } else {
      sanitized[key] = userData[key];
    }
  });
  
  return sanitized;
};
