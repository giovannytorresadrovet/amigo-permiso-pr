
import { z } from 'zod';
import { SECURITY_CONFIG } from './constants';
import { sanitizeInput, sanitizeFileName } from './sanitization';

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
