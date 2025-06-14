
// Auth0 + Cloudflare Integration
import { logAuth0Event, validateAuth0Action, sanitizeAuth0UserData } from '@/lib/security';

export class CloudflareAuth0Integration {
  private static instance: CloudflareAuth0Integration;

  public static getInstance(): CloudflareAuth0Integration {
    if (!CloudflareAuth0Integration.instance) {
      CloudflareAuth0Integration.instance = new CloudflareAuth0Integration();
    }
    return CloudflareAuth0Integration.instance;
  }

  // Enhanced login with Cloudflare geolocation
  public async enhancedLogin(auth0LoginFunction: Function, options: any = {}) {
    try {
      // Check rate limiting
      if (!validateAuth0Action('login')) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }

      // Get Cloudflare geolocation data
      const geoData = await this.getGeolocationData();
      
      // Enhanced login options with geo context
      const enhancedOptions = {
        ...options,
        authorizationParams: {
          ...options.authorizationParams,
          geo_country: geoData.country,
          geo_city: geoData.city,
          cf_ray: geoData.cfRay,
        }
      };

      // Log login attempt
      logAuth0Event('login_attempt', undefined, {
        country: geoData.country,
        city: geoData.city,
        userAgent: navigator.userAgent
      });

      const result = await auth0LoginFunction(enhancedOptions);
      
      // Log successful login
      logAuth0Event('login_success', undefined, geoData);
      
      return result;
    } catch (error) {
      logAuth0Event('login_failed', undefined, { 
        error: error instanceof Error ? error.message : 'Unknown error',
        userAgent: navigator.userAgent 
      });
      throw error;
    }
  }

  // Enhanced user data processing
  public processUserData(userData: any) {
    try {
      // Sanitize user data
      const sanitizedData = sanitizeAuth0UserData(userData);
      
      // Add Cloudflare-specific enhancements
      const enhancedData = {
        ...sanitizedData,
        cf_metadata: {
          processedAt: new Date().toISOString(),
          country: this.getCachedGeoData()?.country,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
      };

      logAuth0Event('user_data_processed', userData.sub, {
        fields_processed: Object.keys(enhancedData).length
      });

      return enhancedData;
    } catch (error) {
      logAuth0Event('user_data_processing_failed', userData?.sub, {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  // Get geolocation data from Cloudflare
  private async getGeolocationData() {
    try {
      // In production, this would come from Cloudflare headers
      // For now, we'll simulate or use what's available
      const response = await fetch('/api/geo', { method: 'GET' });
      
      if (response.ok) {
        return await response.json();
      }
      
      // Fallback data
      return {
        country: 'US',
        city: 'Unknown',
        cfRay: 'unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    } catch (error) {
      console.warn('Failed to get geolocation data:', error);
      return {
        country: 'Unknown',
        city: 'Unknown',
        cfRay: 'unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    }
  }

  // Cache geo data for performance
  private getCachedGeoData() {
    const cached = sessionStorage.getItem('cf_geo_data');
    return cached ? JSON.parse(cached) : null;
  }

  // Security event monitoring
  public monitorSecurityEvents() {
    // Monitor for suspicious activity
    window.addEventListener('beforeunload', () => {
      logAuth0Event('session_end', undefined, {
        duration: Date.now() - (parseInt(sessionStorage.getItem('session_start') || '0')),
        page_views: parseInt(sessionStorage.getItem('page_views') || '0')
      });
    });

    // Track page views
    const pageViews = parseInt(sessionStorage.getItem('page_views') || '0') + 1;
    sessionStorage.setItem('page_views', pageViews.toString());

    // Set session start if not set
    if (!sessionStorage.getItem('session_start')) {
      sessionStorage.setItem('session_start', Date.now().toString());
    }
  }

  // Enhanced logout with cleanup
  public async enhancedLogout(auth0LogoutFunction: Function, options: any = {}) {
    try {
      logAuth0Event('logout_attempt', undefined, {
        session_duration: Date.now() - (parseInt(sessionStorage.getItem('session_start') || '0')),
      });

      // Clear sensitive data from storage
      this.clearSensitiveData();

      const result = await auth0LogoutFunction(options);
      
      logAuth0Event('logout_success', undefined, {});
      
      return result;
    } catch (error) {
      logAuth0Event('logout_failed', undefined, {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  private clearSensitiveData() {
    // Clear session storage
    sessionStorage.removeItem('session_start');
    sessionStorage.removeItem('page_views');
    sessionStorage.removeItem('cf_geo_data');
    
    // Clear any cached user data
    localStorage.removeItem('user_preferences');
    
    // Clear any temporary tokens
    sessionStorage.clear();
  }
}

// Export singleton instance
export const cloudflareAuth0 = CloudflareAuth0Integration.getInstance();
