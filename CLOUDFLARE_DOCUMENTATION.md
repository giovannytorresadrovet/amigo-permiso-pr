
# Cloudflare Integration - Technical Documentation

**Current Date:** 2025-06-15

## 1. Overview

Permitoria leverages Cloudflare's full suite of services to enhance performance, security, and reliability. This integration is not just about CDN and DNS; it utilizes Cloudflare Pages for hosting, Edge Functions for middleware logic, and various performance and security features to deliver a fast and robust user experience.

This document outlines the key components of the Cloudflare integration, from deployment and configuration to edge-side logic and front-end implementation.

---

## 2. Key Configuration & Deployment

### `wrangler.toml`
This is the primary configuration file for the Cloudflare Pages project. It defines:
- **Project Name:** `permisoria`
- **Environments:** `production` and `staging` with custom routes.
- **Build Command:** `npm run build` to create the static assets.
- **Edge Functions:** Specifies the path pattern (`/api/*`) that will trigger edge functions.
- **KV Namespaces:** Configures a Key-Value store named `CACHE` for rate limiting and other caching purposes.

### `cloudflare.config.ts`
This is a custom, application-level configuration file that provides a structured way to manage Cloudflare settings within the codebase. It defines settings for:
- **Pages:** Project name, build command, and output directory.
- **Performance:** Minification, compression (Brotli/Gzip), and caching rules for static assets, HTML, and API responses.
- **Security:** SSL mode, HSTS, and other security headers.
- **Edge Functions:** Compatibility settings.
- **Analytics:** Configuration for Web Analytics and Real User Monitoring (RUM).

The `getCloudflareConfig` function allows for environment-specific overrides (e.g., relaxing caching in development).

### Deployment (`scripts/deploy-cloudflare.sh`)
This shell script automates the deployment process to Cloudflare Pages.
- It checks for Wrangler CLI and user authentication.
- It runs the build command (`npm run build`).
- It deploys to different environments (`production`, `staging`, `preview`) based on the script argument.
- It provides helpful links and commands for monitoring the deployment.

---

## 3. Edge Middleware (`functions/_middleware.ts`)

This is a powerful Cloudflare Edge Function that intercepts all incoming requests to the application. It acts as a security and optimization gateway before the request hits the application or its assets.

### Key Responsibilities:
1.  **Security Headers:** Injects a comprehensive set of security headers (CSP, HSTS, XSS Protection, etc.) on every response. The headers are defined in `src/lib/cloudflare/headers.ts`.
2.  **Rate Limiting:** Uses the `CACHE` KV namespace to implement a simple IP-based rate limiter. It blocks IPs that make more than 100 requests per hour.
3.  **Bot Protection:** Implements a basic bot detection mechanism based on User-Agent strings to block suspicious requests from common tools like `curl` and `wget`.
4.  **Geo-Blocking:** Contains a placeholder for blocking requests from specific countries.
5.  **Cache Optimization:**
    -   **API Caching:** For requests to `/api/*`, it implements a cache-then-network strategy, caching successful responses for 5 minutes.
    -   **Static Asset Caching:** For static files (JS, CSS, images), it sets long-term cache headers (`max-age=31536000`) to ensure they are served from the browser cache whenever possible.

---

## 4. Frontend Integration & Performance

### `src/components/CloudflareProvider.tsx`
This React component is a central hub for initializing Cloudflare's client-side features. It wraps the main application and is responsible for:
- **Performance Monitoring:** It initializes the `CloudflarePerformance` singleton, which tracks Core Web Vitals (LCP, FID, CLS) and sends the metrics to a custom analytics endpoint (`/api/analytics/web-vitals`).
- **Resource Preloading:** It calls `preloadCriticalResources` to hint to the browser to fetch essential assets like fonts and key API data early.
- **Service Worker Registration:** It registers the `/sw.js` service worker in production to enable advanced caching strategies.
- **Authenticated User Analytics:** It sends a beacon to track when authenticated users are active, enabling deeper analysis of user engagement.

### `src/lib/cloudflare/performance.ts`
This class encapsulates all client-side performance optimizations:
- **`trackWebVitals`**: Sets up `PerformanceObserver`s to measure and report on LCP, FID, CLS, FCP, and TTFB.
- **`getOptimizedImageUrl`**: A utility function to construct URLs for Cloudflare Image Resizing, allowing for on-the-fly image optimization (though currently points to a placeholder domain).
- **`registerServiceWorker`**: Handles the registration logic for the service worker.
- **`cacheStrategies`**: Defines caching strategies (CacheFirst, NetworkFirst, StaleWhileRevalidate) that can be used by the service worker.

---

## 5. Security Enhancements

### `src/lib/cloudflare/headers.ts`
This file centralizes the definition of the `Content-Security-Policy` (CSP) and other security headers applied by the edge middleware. The CSP is carefully configured to be strict, allowing resources only from trusted domains like `auth0.com` and `stripe.com`.

### `src/lib/cloudflare/auth0Integration.ts`
This module demonstrates how Cloudflare's capabilities can be integrated with third-party services like Auth0 for enhanced security.
- **`enhancedLogin`**: Before triggering Auth0 login, it fetches geolocation data (simulated via `/api/geo`). This data could be used to implement risk-based authentication (e.g., challenge users from unusual locations).
- **`processUserData`**: Enriches user data from Auth0 with Cloudflare-specific metadata like the user's country and timezone.
- **`enhancedLogout`**: Logs logout events and performs a thorough cleanup of sensitive data from `sessionStorage` and `localStorage`.

This tight integration showcases a modern, secure architecture where the edge network plays an active role in the application's security posture.

