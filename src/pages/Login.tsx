
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, CheckCircle, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { SocialLoginButton } from '@/components/auth/SocialLoginButton';
import { AuthModeToggle } from '@/components/auth/AuthModeToggle';
import { Auth0LoginButton } from '@/components/auth/Auth0LoginButton';
import { EnhancedFormField } from '@/components/auth/EnhancedFormField';
import { useNotificationEffects } from '@/hooks/useNotificationEffects';
import { auth0Features } from '@/lib/auth0/config';
import { getAuthTranslation } from '@/utils/translations/authTranslations';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const { notifySuccess, notifyError } = useNotificationEffects();
  const navigate = useNavigate();
  const t = (key: string) => getAuthTranslation(key, language);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    console.log('Login attempt:', data);
    
    try {
      // TODO: Replace with actual authentication logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success/failure randomly for demo
      const success = Math.random() > 0.3;
      
      if (success) {
        notifySuccess(
          t('loginSuccess'),
          t('signingInSecurely'),
          false
        );
        // Redirect to dashboard after successful login
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        notifyError(
          t('loginError'),
          t('invalidCredentials'),
          true
        );
      }
    } catch (error) {
      notifyError(
        t('loginError'),
        'An unexpected error occurred. Please try again later.',
        true
      );
    } finally {
      setIsLoading(false);
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            {t('welcomeBackEnhanced')}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {t('signInDescription')}
          </CardDescription>
          
          {/* Cultural Sensitivity Badge */}
          <div className="flex items-center justify-center mt-4 text-xs text-slate-400">
            <Globe className="w-3 h-3 mr-1" />
            {t('puertoRicanBusiness')}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <AuthModeToggle />

          {/* Auth0 Login Button - only shown when Auth0 is enabled */}
          {auth0Features.enabled && (
            <div className="space-y-3">
              <Auth0LoginButton />
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-slate-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-800 px-2 text-slate-400">Or continue with email</span>
                </div>
              </div>
            </div>
          )}

          {/* Original form - hidden when Auth0 is enabled */}
          {!auth0Features.enabled && (
            <>
              {/* Social Login Buttons */}
              <div className="space-y-3">
                <SocialLoginButton provider="google" mode="login" disabled={isLoading} />
                <SocialLoginButton provider="facebook" mode="login" disabled={isLoading} />
                <SocialLoginButton provider="apple" mode="login" disabled={isLoading} />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-slate-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-800 px-2 text-slate-400">Or continue with email</span>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <EnhancedFormField
                        field={field}
                        type="email"
                        placeholder="tu@email.com"
                        label={t('email')}
                        error={fieldState.error?.message}
                        disabled={isLoading}
                      />
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <EnhancedFormField
                        field={field}
                        label={t('password')}
                        placeholder={language === 'es' ? 'Ingresa tu contraseña' : 'Enter your password'}
                        showPasswordToggle={true}
                        error={fieldState.error?.message}
                        disabled={isLoading}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="rememberMe"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-slate-600 data-[state=checked]:bg-blue-500"
                          disabled={isLoading}
                        />
                        <label
                          htmlFor="rememberMe"
                          className="text-sm text-slate-300 cursor-pointer"
                        >
                          {t('rememberMe')}
                        </label>
                      </div>
                    )}
                  />

                  <div className="flex items-center justify-between">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-400 hover:text-blue-300 underline"
                    >
                      {t('forgotPassword')}
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? t('signingInSecurely') : t('signIn')}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-slate-400">
                  {language === 'es' ? '¿No tienes una cuenta?' : "Don't have an account?"}{' '}
                  <Link to="/signup" className="text-blue-400 hover:text-blue-300 underline">
                    {t('signUp')}
                  </Link>
                </p>
              </div>
            </>
          )}

          {/* Trust Indicators */}
          <div className="space-y-3 pt-4 border-t border-slate-600">
            <div className="flex items-center text-xs text-slate-400">
              <Shield className="w-3 h-3 mr-2 text-green-500" />
              {t('secureConnection')}
            </div>
            <div className="flex items-center text-xs text-slate-400">
              <CheckCircle className="w-3 h-3 mr-2 text-blue-500" />
              {t('dataProtected')}
            </div>
            <div className="flex items-center text-xs text-slate-400">
              <Users className="w-3 h-3 mr-2 text-teal-500" />
              {t('trustedByBusinesses')}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
