
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getAuthTranslation } from '@/utils/translations/authTranslations';

interface AccountVerificationSuccessProps {
  language?: 'es' | 'en';
  userEmail?: string;
  redirectToDashboard?: boolean;
}

export const AccountVerificationSuccess = ({ 
  language = 'es',
  userEmail,
  redirectToDashboard = true
}: AccountVerificationSuccessProps) => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const t = (key: string) => getAuthTranslation(key, language);

  useEffect(() => {
    if (redirectToDashboard && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (redirectToDashboard && countdown === 0) {
      navigate('/dashboard');
    }
  }, [countdown, redirectToDashboard, navigate]);

  const handleContinueToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <Card className="w-full max-w-md relative z-10 bg-slate-800/50 border-slate-700 animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4 relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            {t('accountVerified')}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {t('verificationSuccessful')}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <p className="text-green-400 text-sm font-medium">
                {t('accountVerifiedDescription')}
              </p>
              {userEmail && (
                <p className="text-slate-300 text-xs mt-2">
                  {userEmail}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-white font-semibold">
                {t('welcomeToPermitPR')}
              </h3>
              <p className="text-slate-300 text-sm">
                {t('puertoRicanBusiness')}
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="space-y-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
            <h4 className="text-slate-200 font-medium text-sm">
              {language === 'es' ? 'Ya puedes acceder a:' : 'You now have access to:'}
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                {t('municipalitySupport')}
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                {t('localCompliance')}
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                {t('bilingualSupport')}
              </div>
            </div>
          </div>

          <Button
            onClick={handleContinueToDashboard}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
          >
            {t('continueToDashboard')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {redirectToDashboard && countdown > 0 && (
            <p className="text-center text-slate-400 text-xs">
              {language === 'es' 
                ? `Redirigiendo automáticamente en ${countdown} segundos...`
                : `Auto-redirecting in ${countdown} seconds...`
              }
            </p>
          )}

          {/* Security and Trust Indicators */}
          <div className="space-y-3 pt-4 border-t border-slate-600">
            <div className="flex items-center text-xs text-slate-400">
              <Shield className="w-3 h-3 mr-2 text-green-500" />
              {t('trustedByBusinesses')}
            </div>
            <div className="flex items-center text-xs text-slate-400">
              <CheckCircle className="w-3 h-3 mr-2 text-blue-500" />
              {t('gdprCompliant')}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
