
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, ArrowLeft, CheckCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import { EnhancedFormField } from '@/components/auth/EnhancedFormField';
import { useNotificationEffects } from '@/hooks/useNotificationEffects';
import { Auth0PasswordResetService } from '@/lib/auth0/passwordReset';
import { getAuthTranslation } from '@/utils/translations/authTranslations';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [language] = useState<'es' | 'en'>('es');
  const { notifySuccess, notifyError } = useNotificationEffects();
  const t = (key: string) => getAuthTranslation(key, language);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    console.log('Password reset request:', data);
    
    try {
      const result = await Auth0PasswordResetService.requestPasswordReset(data.email);
      
      if (result.success) {
        setSubmittedEmail(data.email);
        setIsSubmitted(true);
        notifySuccess(
          t('resetLinkSent'),
          t('resetEmailSent'),
          false
        );
      } else {
        notifyError(
          t('signupError'),
          result.error || 'Failed to send reset email',
          true
        );
      }
    } catch (error) {
      notifyError(
        t('signupError'),
        'An unexpected error occurred. Please try again.',
        true
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <Card className="w-full max-w-md relative z-10 bg-slate-800/50 border-slate-700 text-center animate-scale-in">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              {t('emailSentSuccessfully')}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {t('resetEmailSent')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <p className="text-green-400 text-sm">
                {t('resetEmailDescription')}
              </p>
              <p className="text-blue-400 font-medium mt-2">{submittedEmail}</p>
            </div>
            
            <p className="text-slate-300 text-sm">
              {language === 'es' 
                ? 'Si no ves el email, revisa tu carpeta de spam.'
                : "If you don't see the email, check your spam folder."
              }
            </p>

            <Link to="/login">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'es' ? 'Volver al Inicio de Sesión' : 'Back to Sign In'}
              </Button>
            </Link>

            {/* Trust Indicators */}
            <div className="space-y-3 pt-4 border-t border-slate-600">
              <div className="flex items-center text-xs text-slate-400">
                <Shield className="w-3 h-3 mr-2 text-green-500" />
                {t('secureConnection')}
              </div>
              <div className="flex items-center text-xs text-slate-400">
                <Users className="w-3 h-3 mr-2 text-blue-500" />
                {t('trustedByBusinesses')}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            {t('resetPasswordEnhanced')}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {t('resetPasswordDescription')}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
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

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? t('sendingResetLink') : (language === 'es' ? 'Enviar Enlace' : 'Send Reset Link')}
              </Button>
            </form>
          </Form>

          {/* Trust and Security Messaging */}
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

          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-slate-400 hover:text-slate-300 text-sm underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'es' ? 'Volver al Inicio de Sesión' : 'Back to Sign In'}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
