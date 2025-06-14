
import { ReactNode, useEffect } from 'react';
import { ComplianceManager } from '@/lib/compliance';
import { AuditLogger } from '@/lib/security';

interface ComplianceProviderProps {
  children: ReactNode;
}

export const ComplianceProvider = ({ children }: ComplianceProviderProps) => {
  useEffect(() => {
    // Initialize compliance monitoring
    const initializeCompliance = async () => {
      try {
        const manager = ComplianceManager.getInstance();
        
        // Log compliance system initialization
        AuditLogger.log({
          action: 'compliance_system_initialized',
          details: {
            frameworks: ['NIST', 'SOC2', 'Puerto Rico'],
            timestamp: new Date().toISOString()
          }
        });

        // Schedule periodic compliance assessments
        const assessmentInterval = setInterval(async () => {
          try {
            await manager.getComplianceStatus();
            AuditLogger.log({
              action: 'automated_compliance_assessment',
              details: { timestamp: new Date().toISOString() }
            });
          } catch (error) {
            console.error('Compliance assessment error:', error);
            AuditLogger.log({
              action: 'compliance_assessment_error',
              details: { 
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString()
              }
            });
          }
        }, 24 * 60 * 60 * 1000); // Daily assessments

        // Cleanup interval on unmount
        return () => clearInterval(assessmentInterval);
      } catch (error) {
        console.error('Compliance initialization error:', error);
      }
    };

    initializeCompliance();
  }, []);

  return <>{children}</>;
};
