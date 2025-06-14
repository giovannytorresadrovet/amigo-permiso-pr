
// Cloudflare Security Headers Configuration
export const getCloudflareSecurityHeaders = () => ({
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.auth0.com https://js.stripe.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co https://*.auth0.com https://api.cloudflare.com",
    "frame-src 'self' https://js.stripe.com https://*.auth0.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; '),

  // HSTS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // Additional security headers
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': [
    'geolocation=()',
    'microphone=()',
    'camera=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'speaker=()',
    'fullscreen=(self)',
    'sync-xhr=()'
  ].join(', '),

  // Cache control for different content types
  'Cache-Control': 'public, max-age=31536000, immutable',
  'Vary': 'Accept-Encoding, Accept',

  // Security reporting
  'Report-To': JSON.stringify({
    group: 'default',
    max_age: 10886400,
    endpoints: [{ url: 'https://reports.permisoria.com/csp' }]
  }),

  // Cross-Origin policies
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin'
});

// Environment-specific header adjustments
export const getEnvironmentHeaders = (environment: string) => {
  const baseHeaders = getCloudflareSecurityHeaders();

  if (environment === 'development') {
    // Relax CSP for development
    baseHeaders['Content-Security-Policy'] = baseHeaders['Content-Security-Policy']
      .replace("'unsafe-inline'", "'unsafe-inline' 'unsafe-eval'")
      .replace('https:', 'https: http: ws: wss:');
  }

  return baseHeaders;
};
