
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotificationEffects } from '@/hooks/useNotificationEffects';
import { getAuthTranslation } from '@/utils/translations/authTranslations';

interface EmailVerificationProps {
  email: string;
  language?: 'es' | 'en';
  onResendVerification?: () => void;
}

export const EmailVerification = ({ 
  email, 
  language = 'es',
  onResendVerification 
}: EmailVerificationProps) => {
  const [isResending, setIsResending] = useState(false);
  const { notifySuccess, notifyError } = useNotificationEffects();
  const t = (key: string) => getAuthTranslation(key, language);

  const handleResendVerification = async () => {
    setIsResending(true);
    
    try {
      // TODO: Implement actual resend verification logic with Auth0
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onResendVerification) {
        onResendVerification();
      }
      
      notifySuccess(
        t('verificationResent'),
        t('verificationEmailSent'),
        false
      );
    } catch (error) {
      notifyError(
        t('signupError'),
        'Error al reenviar el email de verificación',
        true
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <Card className="w-full max-w-md relative z-10 bg-slate-800/50 border-slate-700 animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center animate-pulse">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            {t('checkYourEmail')}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {t('emailVerification')}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <p className="text-slate-200 text-sm">
                {t('verificationEmailSent')}
              </p>
              <p className="text-blue-400 font-medium mt-2">{email}</p>
            </div>
            
            <p className="text-slate-300 text-sm">
              {t('verificationEmailDescription')}
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-3">
                {t('didntReceiveEmail')}
              </p>
              <p className="text-slate-300 text-xs mb-4">
                {t('checkSpamFolder')}
              </p>
              
              <Button
                onClick={handleResendVerification}
                disabled={isResending}
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    {t('resendingVerification')}
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {t('resendVerification')}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Security and Trust Indicators */}
          <div className="space-y-3 pt-4 border-t border-slate-600">
            <div className="flex items-center text-xs text-slate-400">
              <Shield className="w-3 h-3 mr-2 text-green-500" />
              {t('secureConnection')}
            </div>
            <div className="flex items-center text-xs text-slate-400">
              <CheckCircle className="w-3 h-3 mr-2 text-blue-500" />
              {t('dataProtected')}
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/login"
              className="text-slate-400 hover:text-slate-300 text-sm underline"
            >
              {t('goBack')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
