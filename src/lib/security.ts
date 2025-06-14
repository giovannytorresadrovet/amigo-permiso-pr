import { z } from 'zod';

// Security Constants
export const SECURITY_CONFIG = {
  MAX_FILE_SIZE: 25 * 1024 * 1024, // 25MB
  ALLOWED_MIME_TYPES: [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ],
  MAX_INPUT_LENGTH: {
    businessName: 100,
    address: 200,
    description: 1000,
    fileName: 255
  },
  RATE_LIMITS: {
    fileUpload: 5, // per minute
    aiQuery: 10, // per minute
    formSubmission: 20 // per minute
  }
};

// Input Sanitization
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove potential XSS vectors
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

// Sanitize filename for safe storage
export const sanitizeFileName = (fileName: string): string => {
  if (!fileName) return 'untitled';
  
  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace unsafe chars with underscore
    .replace(/_{2,}/g, '_') // Replace multiple underscores with single
    .substring(0, SECURITY_CONFIG.MAX_INPUT_LENGTH.fileName);
};

// Schema Definitions for Validation
export const businessDataSchema = z.object({
  name: z.string()
    .min(1, 'Business name is required')
    .max(SECURITY_CONFIG.MAX_INPUT_LENGTH.businessName, 'Business name too long')
    .refine(val => sanitizeInput(val) === val, 'Invalid characters in business name'),
  
  businessType: z.enum(['restaurant', 'retail', 'services', 'manufacturing', 'tech', 'healthcare', 'education', 'other']),
  
  employees: z.enum(['1', '2-5', '6-10', '11-20', '21+']),
  
  revenue: z.enum(['under50k', '50k-100k', '100k-500k', '500k-1m', 'over1m']),
  
  address: z.object({
    street: z.string().max(SECURITY_CONFIG.MAX_INPUT_LENGTH.address),
    city: z.string().max(50),
    state: z.string().max(50),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
    municipality: z.string().max(50)
  }).optional()
});

export const fileValidationSchema = z.object({
  name: z.string().min(1, 'File name required'),
  size: z.number()
    .max(SECURITY_CONFIG.MAX_FILE_SIZE, 'File too large (max 25MB)'),
  type: z.string()
    .refine(type => SECURITY_CONFIG.ALLOWED_MIME_TYPES.includes(type), 'File type not allowed')
});

// File Security Validation
export const validateFile = (file: File): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Validate file size
  if (file.size > SECURITY_CONFIG.MAX_FILE_SIZE) {
    errors.push('File size exceeds 25MB limit');
  }
  
  // Validate MIME type
  if (!SECURITY_CONFIG.ALLOWED_MIME_TYPES.includes(file.type)) {
    errors.push('File type not allowed. Please use PDF, JPG, PNG, or DOC files');
  }
  
  // Validate filename
  const sanitizedName = sanitizeFileName(file.name);
  if (sanitizedName !== file.name) {
    errors.push('Filename contains unsafe characters');
  }
  
  // Check for potential malicious extensions
  const extension = file.name.split('.').pop()?.toLowerCase();
  const dangerousExtensions = ['exe', 'bat', 'cmd', 'scr', 'pif', 'vbs', 'js', 'jar'];
  if (extension && dangerousExtensions.includes(extension)) {
    errors.push('File extension not allowed for security reasons');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// CSP Headers Configuration
export const getSecurityHeaders = () => ({
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: In production, remove unsafe-inline and unsafe-eval
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.openai.com https://*.supabase.co",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
});

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

// Audit Logging
export interface AuditEvent {
  action: string;
  userId?: string;
  timestamp: number;
  ip?: string;
  userAgent?: string;
  details?: Record<string, any>;
}

export class AuditLogger {
  static log(event: Omit<AuditEvent, 'timestamp'>): void {
    const auditEvent: AuditEvent = {
      ...event,
      timestamp: Date.now()
    };
    
    // In production, send to secure logging service
    console.log('AUDIT:', auditEvent);
    
    // Store locally for offline capability
    try {
      const logs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
      logs.push(auditEvent);
      
      // Keep only last 1000 entries to prevent storage overflow
      if (logs.length > 1000) {
        logs.splice(0, logs.length - 1000);
      }
      
      localStorage.setItem('audit_logs', JSON.stringify(logs));
    } catch (error) {
      console.error('Audit logging error:', error);
    }
  }
}
