
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SocialLoginButton } from './SocialLoginButton';
import { LanguageToggle } from '@/components/LanguageToggle';
import { getTranslation } from '@/utils/translations';
import { useNotificationEffects } from '@/hooks/useNotificationEffects';
import { Shield, User, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

interface AuthenticationFlowProps {
  onAuthSuccess: (user: any) => void;
  language: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
}

export const AuthenticationFlow = ({ onAuthSuccess, language, onLanguageChange }: AuthenticationFlowProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [showIdVerification, setShowIdVerification] = useState(false);

  const { notifySuccess, notifyError } = useNotificationEffects();
  const t = (key: string) => getTranslation(key, language);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (mode === 'signup') {
        // For signup, show ID verification step
        setShowIdVerification(true);
        notifySuccess(
          t('registrationSuccessful'),
          language === 'es' 
            ? 'Cuenta creada exitosamente. Ahora necesitas verificar tu identidad.'
            : 'Account created successfully. You now need to verify your identity.',
          false
        );
      } else {
        // For login, proceed directly
        const mockUser = {
          id: '1',
          email: formData.email,
          firstName: formData.firstName || 'Usuario',
          lastName: formData.lastName || 'Demo',
          verified: true
        };
        onAuthSuccess(mockUser);
        notifySuccess(
          t('loginSuccessful'),
          language === 'es' 
            ? `¡Bienvenido de vuelta ${mockUser.firstName}!`
            : `Welcome back ${mockUser.firstName}!`,
          false
        );
      }
    } catch (error) {
      notifyError(
        mode === 'login' ? t('loginFailed') : t('registrationFailed'),
        language === 'es' 
          ? 'Hubo un problema con la autenticación. Inténtalo de nuevo.'
          : 'There was a problem with authentication. Please try again.',
        true
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleIdVerification = async () => {
    setIsLoading(true);
    try {
      // Simulate ID.me verification
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const mockUser = {
        id: '1',
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        verified: true
      };
      
      onAuthSuccess(mockUser);
      notifySuccess(
        language === 'es' ? 'Identidad Verificada' : 'Identity Verified',
        language === 'es' 
          ? '¡Excelente! Tu identidad ha sido verificada exitosamente.'
          : 'Great! Your identity has been successfully verified.',
        false
      );
    } catch (error) {
      notifyError(
        language === 'es' ? 'Error de Verificación' : 'Verification Error',
        language === 'es' 
          ? 'No pudimos verificar tu identidad. Contacta soporte si el problema persiste.'
          : 'We could not verify your identity. Contact support if the problem persists.',
        true
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (showIdVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-white text-xl">
              {language === 'es' ? 'Verificación de Identidad' : 'Identity Verification'}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {language === 'es' 
                ? 'Para proteger tu información y cumplir con regulaciones, necesitamos verificar tu identidad con ID.me'
                : 'To protect your information and comply with regulations, we need to verify your identity with ID.me'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-blue-500/30 bg-blue-500/10">
              <CheckCircle className="w-4 h-4 text-blue-400" />
              <AlertDescription className="text-blue-200">
                {language === 'es' 
                  ? 'Este proceso es seguro y está encriptado. Solo tomará unos minutos.'
                  : 'This process is secure and encrypted. It will only take a few minutes.'
                }
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={handleIdVerification}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {language === 'es' ? 'Verificando...' : 'Verifying...'}
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  {language === 'es' ? 'Verificar con ID.me' : 'Verify with ID.me'}
                </>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => setShowIdVerification(false)}
              className="w-full text-slate-300 hover:text-white"
            >
              {language === 'es' ? 'Regresar' : 'Go Back'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header with Language Toggle */}
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-white">Permisoria</div>
          <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl">
              {mode === 'login' ? t('welcomeBack') : t('createAccount')}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {mode === 'login' ? t('signInToAccount') : t('joinPermitPR')}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={mode} onValueChange={(value) => setMode(value as 'login' | 'signup')}>
              <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                <TabsTrigger value="login" className="text-slate-300 data-[state=active]:text-white">
                  {t('signIn')}
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-slate-300 data-[state=active]:text-white">
                  {t('signUp')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">{t('email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-300">{t('password')}</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="bg-slate-700 border-slate-600 text-white pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 
                          <EyeOff className="h-4 w-4 text-slate-400" /> : 
                          <Eye className="h-4 w-4 text-slate-400" />
                        }
                      </Button>
                    </div>
                  </div>
                  
                  <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t('signingIn')}
                      </>
                    ) : (
                      t('signIn')
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <Button variant="link" className="text-blue-400 hover:text-blue-300">
                      {t('forgotPassword')}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-slate-300">{t('firstName')}</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-slate-300">{t('lastName')}</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-slate-300">{t('email')}</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-slate-300">{t('password')}</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-slate-300">{t('confirmPassword')}</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white"
                      required
                    />
                  </div>
                  
                  <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t('creatingAccount')}
                      </>
                    ) : (
                      t('signUp')
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-800 px-2 text-slate-400">
                    {mode === 'login' ? t('orContinueWithEmail') : t('orCreateAccountWithEmail')}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <SocialLoginButton 
                  provider="google" 
                  mode={mode} 
                  language={language}
                  disabled={isLoading}
                />
                <SocialLoginButton 
                  provider="facebook" 
                  mode={mode} 
                  language={language}
                  disabled={isLoading}
                />
                <SocialLoginButton 
                  provider="apple" 
                  mode={mode} 
                  language={language}
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
