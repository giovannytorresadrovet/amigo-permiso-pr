
import { useEffect, ReactNode } from 'react';
import { CloudflarePerformance } from '@/lib/cloudflare/performance';
import { cloudflareAuth0 } from '@/lib/cloudflare/auth0Integration';
import { useAuth } from '@/lib/auth0';

interface CloudflareProviderProps {
  children: ReactNode;
}

export const CloudflareProvider = ({ children }: CloudflareProviderProps) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const cloudflarePerf = CloudflarePerformance.getInstance();
    
    // Initialize performance monitoring
    cloudflarePerf.trackWebVitals();
    cloudflarePerf.preloadCriticalResources();
    cloudflarePerf.registerServiceWorker();

    // Initialize Auth0 security monitoring
    cloudflareAuth0.monitorSecurityEvents();

    // Log initialization
    console.log('Cloudflare integration initialized');

    // Cleanup function
    return () => {
      console.log('Cloudflare integration cleanup');
    };
  }, []);

  useEffect(() => {
    // Enhanced analytics for authenticated users
    if (isAuthenticated) {
      // Track authenticated user metrics
      if (typeof window !== 'undefined' && 'sendBeacon' in navigator) {
        navigator.sendBeacon('/api/analytics/auth-status', JSON.stringify({
          authenticated: true,
          timestamp: Date.now(),
          userAgent: navigator.userAgent
        }));
      }
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};
