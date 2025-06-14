
import { PermitDiscoveryResult } from '@/services/permitDiscoveryEngine';
import { PermitWizardContainer } from './permit-wizard';

interface EnhancedPermitDiscoveryWizardProps {
  language: 'es' | 'en';
  onComplete: (result: PermitDiscoveryResult) => void;
  onBack: () => void;
}

export const EnhancedPermitDiscoveryWizard = ({ 
  language, 
  onComplete, 
  onBack 
}: EnhancedPermitDiscoveryWizardProps) => {
  return (
    <PermitWizardContainer
      language={language}
      onComplete={onComplete}
      onBack={onBack}
    />
  );
};
