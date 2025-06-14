
// Cloudflare Edge Function Middleware
import { cloudflareConfig } from '../cloudflare.config';
import { getCloudflareSecurityHeaders } from '../src/lib/cloudflare/headers';

interface Env {
  CACHE: KVNamespace;
  ENVIRONMENT: string;
  AUTH0_DOMAIN: string;
  AUTH0_CLIENT_ID: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Security headers
  const securityHeaders = getCloudflareSecurityHeaders();

  // Rate limiting
  const rateLimitKey = `rate_limit:${getClientIP(request)}`;
  const rateLimitCount = await env.CACHE.get(rateLimitKey);
  
  if (rateLimitCount && parseInt(rateLimitCount) > 100) {
    return new Response('Rate limit exceeded', { 
      status: 429,
      headers: securityHeaders 
    });
  }

  // Increment rate limit counter
  await env.CACHE.put(rateLimitKey, (parseInt(rateLimitCount || '0') + 1).toString(), {
    expirationTtl: 3600 // 1 hour
  });

  // Bot protection
  if (isSuspiciousBot(request)) {
    return new Response('Access denied', { 
      status: 403,
      headers: securityHeaders 
    });
  }

  // Geo-blocking (if needed)
  const country = request.cf?.country as string;
  const blockedCountries = ['XX']; // Add blocked countries if needed
  
  if (blockedCountries.includes(country)) {
    return new Response('Access denied from your location', { 
      status: 403,
      headers: securityHeaders 
    });
  }

  // Cache optimization
  if (url.pathname.startsWith('/api/')) {
    // API caching logic
    const cacheKey = new Request(url.toString(), request);
    const cache = caches.default;
    let response = await cache.match(cacheKey);

    if (!response) {
      response = await next();
      
      if (response.status === 200) {
        const headers = new Headers(response.headers);
        headers.set('Cache-Control', 'public, max-age=300'); // 5 minutes
        
        response = new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers
        });
        
        context.waitUntil(cache.put(cacheKey, response.clone()));
      }
    }

    // Add security headers to API responses
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

  // Static asset optimization
  if (isStaticAsset(url.pathname)) {
    const response = await next();
    
    if (response.status === 200) {
      const headers = new Headers(response.headers);
      
      // Long-term caching for static assets
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      headers.set('Vary', 'Accept-Encoding');
      
      // Add security headers
      Object.entries(securityHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }
  }

  // Default response with security headers
  const response = await next();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
};

function getClientIP(request: Request): string {
  return request.headers.get('CF-Connecting-IP') || 
         request.headers.get('X-Forwarded-For') || 
         'unknown';
}

function isSuspiciousBot(request: Request): boolean {
  const userAgent = request.headers.get('User-Agent') || '';
  const suspiciousPatterns = [
    /curl/i,
    /wget/i,
    /python/i,
    /bot.*bot/i // Aggressive bots
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(userAgent));
}

function isStaticAsset(pathname: string): boolean {
  const extensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.woff', '.woff2', '.ttf'];
  return extensions.some(ext => pathname.endsWith(ext));
}
