
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Settings } from 'lucide-react';
import { auth0Features } from '@/lib/auth0/config';

export const AuthModeToggle: React.FC = () => {
  if (auth0Features.enabled) {
    return (
      <Alert className="border-green-500/30 bg-green-500/10 mb-6">
        <Settings className="w-4 h-4 text-green-400" />
        <AlertDescription className="text-green-200">
          Auth0 integration is enabled. Authentication will use Auth0 services.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-blue-500/30 bg-blue-500/10 mb-6">
      <Info className="w-4 h-4 text-blue-400" />
      <AlertDescription className="text-blue-200">
        Running in development mode with mock authentication. 
        Set VITE_AUTH0_ENABLED=true and configure Auth0 credentials to enable Auth0 integration.
      </AlertDescription>
    </Alert>
  );
};
