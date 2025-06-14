
// Auth0 Configuration
export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || '',
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || '',
  redirectUri: window.location.origin,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE || '',
  scope: 'openid profile email offline_access'
};

// Auth0 feature flags
export const auth0Features = {
  enabled: import.meta.env.VITE_AUTH0_ENABLED === 'true',
  // Add more feature flags as needed
};
