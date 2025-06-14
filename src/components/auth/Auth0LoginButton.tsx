
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { useAuth } from '@/lib/auth0';
import { auth0Features } from '@/lib/auth0/config';

interface Auth0LoginButtonProps {
  children?: React.ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
}

export const Auth0LoginButton: React.FC<Auth0LoginButtonProps> = ({ 
  children = 'Sign In with Auth0',
  variant = 'default',
  className = ''
}) => {
  const { login } = useAuth();

  // Don't render if Auth0 is not enabled
  if (!auth0Features.enabled) {
    return null;
  }

  return (
    <Button
      onClick={() => login()}
      variant={variant}
      className={`w-full ${className}`}
    >
      <Shield className="w-4 h-4 mr-2" />
      {children}
    </Button>
  );
};
