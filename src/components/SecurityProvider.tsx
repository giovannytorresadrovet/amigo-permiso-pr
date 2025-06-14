
import { useEffect, ReactNode } from 'react';
import { getSecurityHeaders, AuditLogger } from '@/lib/security';

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider = ({ children }: SecurityProviderProps) => {
  useEffect(() => {
    // Log application start
    AuditLogger.log({
      action: 'application_started',
      details: {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timestamp: new Date().toISOString()
      }
    });

    // Set security headers (this would typically be done on the server)
    const headers = getSecurityHeaders();
    console.log('Security headers configured:', headers);

    // Add security event listeners
    const handleUnload = () => {
      AuditLogger.log({
        action: 'application_unload',
        details: { timestamp: new Date().toISOString() }
      });
    };

    const handleSecurityError = (event: Event) => {
      AuditLogger.log({
        action: 'security_violation',
        details: {
          type: event.type,
          timestamp: new Date().toISOString()
        }
      });
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('securitypolicyviolation', handleSecurityError);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('securitypolicyviolation', handleSecurityError);
    };
  }, []);

  return <>{children}</>;
};
