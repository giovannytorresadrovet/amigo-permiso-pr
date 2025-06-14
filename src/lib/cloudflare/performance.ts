
// Cloudflare Performance Optimization Utilities
export class CloudflarePerformance {
  private static instance: CloudflarePerformance;

  public static getInstance(): CloudflarePerformance {
    if (!CloudflarePerformance.instance) {
      CloudflarePerformance.instance = new CloudflarePerformance();
    }
    return CloudflarePerformance.instance;
  }

  // Preload critical resources
  public preloadCriticalResources(): void {
    const criticalResources = [
      { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2' },
      { href: '/api/user/profile', as: 'fetch' },
      { href: '/images/logo.webp', as: 'image' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.as === 'font') link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // Optimize images for Cloudflare
  public getOptimizedImageUrl(originalUrl: string, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'auto';
  } = {}): string {
    const { width, height, quality = 85, format = 'auto' } = options;
    
    // Use Cloudflare Image Resizing if available
    const baseUrl = 'https://permitpr.com/cdn-cgi/image';
    const params = new URLSearchParams();
    
    if (width) params.set('width', width.toString());
    if (height) params.set('height', height.toString());
    params.set('quality', quality.toString());
    params.set('format', format);
    
    return `${baseUrl}/${params.toString()}/${originalUrl}`;
  }

  // Web Vitals tracking with Cloudflare Analytics
  public trackWebVitals(): void {
    if (typeof window === 'undefined') return;

    // Core Web Vitals
    this.trackLCP();
    this.trackFID();
    this.trackCLS();
    this.trackFCP();
    this.trackTTFB();
  }

  private trackLCP(): void {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.sendMetric('LCP', lastEntry.startTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  }

  private trackFID(): void {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        this.sendMetric('FID', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });
  }

  private trackCLS(): void {
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.sendMetric('CLS', clsValue);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  private trackFCP(): void {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        this.sendMetric('FCP', entry.startTime);
      });
    }).observe({ entryTypes: ['paint'] });
  }

  private trackTTFB(): void {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const ttfb = navigation.responseStart - navigation.fetchStart;
      this.sendMetric('TTFB', ttfb);
    }
  }

  private sendMetric(name: string, value: number): void {
    // Send to Cloudflare Analytics
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const data = JSON.stringify({
        metric: name,
        value: Math.round(value),
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent
      });

      navigator.sendBeacon('/api/analytics/web-vitals', data);
    }
  }

  // Service Worker for caching strategy
  public registerServiceWorker(): void {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }
}

// Cache strategies
export const cacheStrategies = {
  // Static assets - cache first with fallback
  staticAssets: {
    cacheName: 'static-assets-v1',
    strategy: 'CacheFirst',
    maxAgeSeconds: 31536000, // 1 year
  },

  // API responses - network first with cache fallback
  apiResponses: {
    cacheName: 'api-responses-v1',
    strategy: 'NetworkFirst',
    maxAgeSeconds: 300, // 5 minutes
  },

  // HTML pages - stale while revalidate
  htmlPages: {
    cacheName: 'html-pages-v1',
    strategy: 'StaleWhileRevalidate',
    maxAgeSeconds: 86400, // 1 day
  }
};
