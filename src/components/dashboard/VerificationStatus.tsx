
import { Shield, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';

interface VerificationStatusProps {
  user: User | null;
  hasAccess: boolean;
  language: 'es' | 'en';
  isLoading: boolean;
  onStartVerification: () => Promise<void>;
}

export const VerificationStatus = ({ 
  user, 
  hasAccess, 
  language, 
  isLoading, 
  onStartVerification 
}: VerificationStatusProps) => {
  const getVerificationIcon = () => {
    if (user?.identityVerified && user?.verificationStatus === 'verified') {
      return <ShieldCheck className="w-4 h-4 text-green-500" />;
    }
    return <Shield className="w-4 h-4 text-blue-500" />;
  };

  const getVerificationStatus = () => {
    if (user?.identityVerified && user?.verificationStatus === 'verified') {
      return language === 'es' ? 'Verificado' : 'Verified';
    }
    if (user?.verificationStatus === 'in_progress') {
      return language === 'es' ? 'En Proceso' : 'In Progress';
    }
    if (user?.verificationStatus === 'failed') {
      return language === 'es' ? 'Fallida' : 'Failed';
    }
    return language === 'es' ? 'Sin Verificar' : 'Unverified';
  };

  return (
    <div className="mt-4 p-3 bg-slate-50 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        {getVerificationIcon()}
        <span className="text-sm font-medium">
          {language === 'es' ? 'Estado de Verificación' : 'Verification Status'}
        </span>
      </div>
      <p className="text-xs text-slate-600 mb-2">
        {getVerificationStatus()}
      </p>
      
      {!hasAccess && (
        <Button 
          onClick={onStartVerification}
          disabled={isLoading}
          size="sm"
          className="w-full text-xs bg-blue-600 hover:bg-blue-700"
        >
          {language === 'es' ? 'Verificar Identidad' : 'Verify Identity'}
        </Button>
      )}
    </div>
  );
};
