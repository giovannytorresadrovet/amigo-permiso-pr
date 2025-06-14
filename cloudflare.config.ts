
// Cloudflare Configuration
export const cloudflareConfig = {
  // Pages configuration
  pages: {
    projectName: import.meta.env.VITE_CLOUDFLARE_PROJECT_NAME || 'permitpr',
    environment: import.meta.env.VITE_ENVIRONMENT || 'production',
    buildCommand: 'npm run build',
    buildOutputDirectory: 'dist',
    nodeJsCompatibility: true,
  },

  // Performance optimization
  performance: {
    minify: {
      html: true,
      css: true,
      js: true,
    },
    compression: {
      brotli: true,
      gzip: true,
    },
    caching: {
      staticAssets: 31536000, // 1 year
      htmlPages: 86400, // 1 day
      api: 300, // 5 minutes
    },
  },

  // Security configuration
  security: {
    ssl: {
      mode: 'strict',
      minTlsVersion: '1.2',
    },
    headers: {
      hsts: {
        enabled: true,
        maxAge: 31536000,
        includeSubdomains: true,
        preload: true,
      },
      contentTypeOptions: 'nosniff',
      frameOptions: 'DENY',
      xssProtection: '1; mode=block',
    },
    ddosProtection: true,
    botManagement: true,
  },

  // Edge functions configuration
  functions: {
    compatibility: {
      date: '2024-06-14',
      flags: ['nodejs_compat'],
    },
    placement: {
      mode: 'smart',
    },
  },

  // Analytics configuration
  analytics: {
    webAnalytics: {
      enabled: true,
      beaconToken: import.meta.env.VITE_CLOUDFLARE_ANALYTICS_TOKEN || '',
    },
    realUserMonitoring: true,
  },
};

// Environment-specific overrides
export const getCloudflareConfig = (environment: string = 'production') => {
  const baseConfig = { ...cloudflareConfig };

  if (environment === 'development') {
    baseConfig.performance.caching.htmlPages = 0;
    baseConfig.performance.caching.api = 0;
    baseConfig.security.ssl.mode = 'flexible';
  }

  return baseConfig;
};
