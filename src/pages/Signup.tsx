
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { SocialLoginButton } from '@/components/auth/SocialLoginButton';
import { AuthModeToggle } from '@/components/auth/AuthModeToggle';
import { Auth0SignupButton } from '@/components/auth/Auth0SignupButton';
import { EnhancedFormField } from '@/components/auth/EnhancedFormField';
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator';
import { useNotificationEffects } from '@/hooks/useNotificationEffects';
import { auth0Features } from '@/lib/auth0/config';
import { getAuthTranslation } from '@/utils/translations/authTranslations';

const municipalities = [
  'Adjuntas', 'Aguada', 'Aguadilla', 'Aguas Buenas', 'Aibonito', 'Arecibo',
  'Arroyo', 'Barceloneta', 'Barranquitas', 'Bayamón', 'Cabo Rojo', 'Caguas',
  'Camuy', 'Canóvanas', 'Carolina', 'Cataño', 'Cayey', 'Ceiba', 'Cidra',
  'Coamo', 'Comerío', 'Corozal', 'Culebra', 'Dorado', 'Fajardo', 'Florida',
  'Guánica', 'Guayama', 'Guayanilla', 'Guaynabo', 'Gurabo', 'Hatillo',
  'Hormigueros', 'Humacao', 'Isabela', 'Jayuya', 'Juana Díaz', 'Juncos',
  'Lajas', 'Lares', 'Las Marías', 'Las Piedras', 'Loíza', 'Luquillo',
  'Manatí', 'Maricao', 'Maunabo', 'Mayagüez', 'Moca', 'Morovis',
  'Naguabo', 'Naranjito', 'Orocovis', 'Patillas', 'Peñuelas', 'Ponce',
  'Quebradillas', 'Rincón', 'Río Grande', 'Sabana Grande', 'Salinas',
  'San Germán', 'San Juan', 'San Lorenzo', 'San Sebastián', 'Santa Isabel',
  'Toa Alta', 'Toa Baja', 'Trujillo Alto', 'Utuado', 'Vega Alta', 'Vega Baja',
  'Vieques', 'Villalba', 'Yabucoa', 'Yauco'
];

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  municipality: z.string().min(1, 'Please select your municipality'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [language] = useState<'es' | 'en'>('es');
  const navigate = useNavigate();
  const { notifySuccess, notifyError, notifyWarning } = useNotificationEffects();
  const t = (key: string) => getAuthTranslation(key, language);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      municipality: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const password = form.watch('password');

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store email for verification flow
      localStorage.setItem('pending_verification_email', data.email);
      localStorage.setItem('preferred_language', language);
      
      // Simulate success/failure for demo
      const success = Math.random() > 0.2;
      
      if (success) {
        notifySuccess(
          t('accountCreated'),
          `Welcome ${data.firstName}! Your account has been created for ${data.municipality}.`,
          false
        );
        
        // Redirect to email verification
        navigate(`/email-verification?email=${encodeURIComponent(data.email)}`);
      } else {
        notifyError(
          t('signupError'),
          t('emailAlreadyExists'),
          true
        );
      }
    } catch (error) {
      notifyError(
        t('signupError'),
        'An unexpected error occurred during account creation. Please try again.',
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
            {t('createAccountEnhanced')}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {t('signupDescription')}
          </CardDescription>
          
          {/* Cultural Sensitivity Badge */}
          <div className="flex items-center justify-center mt-4 text-xs text-slate-400">
            <Globe className="w-3 h-3 mr-1" />
            {t('puertoRicanBusiness')}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <AuthModeToggle />

          {/* Auth0 Signup Button - only shown when Auth0 is enabled */}
          {auth0Features.enabled && (
            <div className="space-y-3">
              <Auth0SignupButton />
            </div>
          )}

          {/* Original form - hidden when Auth0 is enabled */}
          {!auth0Features.enabled && (
            <>
              {/* Social Login Buttons */}
              <div className="space-y-3">
                <SocialLoginButton provider="google" mode="signup" disabled={isLoading} />
                <SocialLoginButton provider="facebook" mode="signup" disabled={isLoading} />
                <SocialLoginButton provider="apple" mode="signup" disabled={isLoading} />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-slate-600" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-800 px-2 text-slate-400">Or create account with email</span>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field, fieldState }) => (
                        <EnhancedFormField
                          field={field}
                          label="First Name"
                          placeholder="John"
                          error={fieldState.error?.message}
                          disabled={isLoading}
                        />
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field, fieldState }) => (
                        <EnhancedFormField
                          field={field}
                          label="Last Name"
                          placeholder="Doe"
                          error={fieldState.error?.message}
                          disabled={isLoading}
                        />
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <EnhancedFormField
                        field={field}
                        type="email"
                        label={t('email')}
                        placeholder="john@example.com"
                        error={fieldState.error?.message}
                        disabled={isLoading}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="municipality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Municipality</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue placeholder="Select your municipality" className="text-slate-400" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-800 border-slate-600 max-h-60">
                            {municipalities.map((municipality) => (
                              <SelectItem 
                                key={municipality} 
                                value={municipality}
                                className="text-white hover:bg-slate-700"
                              >
                                {municipality}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <EnhancedFormField
                        field={field}
                        label={t('password')}
                        placeholder="Create a password"
                        showPasswordToggle={true}
                        error={fieldState.error?.message}
                        disabled={isLoading}
                      >
                        <PasswordStrengthIndicator 
                          password={password} 
                          language={language}
                          className="mt-2"
                        />
                      </EnhancedFormField>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field, fieldState }) => (
                      <EnhancedFormField
                        field={field}
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        showPasswordToggle={true}
                        error={fieldState.error?.message}
                        disabled={isLoading}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-slate-600 data-[state=checked]:bg-blue-500"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <label className="text-sm text-slate-300">
                            I agree to the{' '}
                            <Link to="/terms" className="text-blue-400 hover:text-blue-300 underline">
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                              Privacy Policy
                            </Link>
                          </label>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? t('creatingAccountSecurely') : 'Create Account'}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-slate-400">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-400 hover:text-blue-300 underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
