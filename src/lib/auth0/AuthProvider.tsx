
import React, { createContext, useContext, ReactNode } from 'react';
import { Auth0Provider as Auth0ProviderBase, useAuth0 } from '@auth0/auth0-react';
import { auth0Config, auth0Features } from './config';
import { AuthContextType, Auth0User } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock auth context for when Auth0 is disabled
const MockAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const mockContext: AuthContextType = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: () => console.log('Mock login'),
    logout: () => console.log('Mock logout'),
    signup: () => console.log('Mock signup'),
    getAccessTokenSilently: async () => 'mock-token'
  };

  return (
    <AuthContext.Provider value={mockContext}>
      {children}
    </AuthContext.Provider>
  );
};

// Auth0 context wrapper
const Auth0ContextWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth0 = useAuth0();
  
  const authContext: AuthContextType = {
    user: auth0.user as Auth0User | null,
    isAuthenticated: auth0.isAuthenticated,
    isLoading: auth0.isLoading,
    login: auth0.loginWithRedirect,
    logout: auth0.logout,
    signup: (options) => auth0.loginWithRedirect({ 
      ...options, 
      authorizationParams: { screen_hint: 'signup' } 
    }),
    getAccessTokenSilently: auth0.getAccessTokenSilently
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

// Main Auth Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // If Auth0 is not enabled, use mock provider
  if (!auth0Features.enabled || !auth0Config.domain || !auth0Config.clientId) {
    return <MockAuthProvider>{children}</MockAuthProvider>;
  }

  return (
    <Auth0ProviderBase
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        redirect_uri: auth0Config.redirectUri,
        audience: auth0Config.audience,
        scope: auth0Config.scope
      }}
    >
      <Auth0ContextWrapper>{children}</Auth0ContextWrapper>
    </Auth0ProviderBase>
  );
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
