
import { Button } from '@/components/ui/button';
import { useNotificationEffects } from '@/hooks/useNotificationEffects';
import { getTranslation } from '@/utils/translations';

interface SocialLoginButtonProps {
  provider: 'google' | 'facebook' | 'apple';
  mode: 'login' | 'signup';
  disabled?: boolean;
  language?: 'es' | 'en';
}

const providerConfig = {
  google: {
    name: 'Google',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    ),
    bgColor: 'bg-white hover:bg-gray-50',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-300'
  },
  facebook: {
    name: 'Facebook',
    icon: (
      <svg className="w-5 h-5" fill="#1877f2" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    bgColor: 'bg-[#1877f2] hover:bg-[#166fe5]',
    textColor: 'text-white',
    borderColor: 'border-[#1877f2]'
  },
  apple: {
    name: 'Apple',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
      </svg>
    ),
    bgColor: 'bg-black hover:bg-gray-800',
    textColor: 'text-white',
    borderColor: 'border-black'
  }
};

export const SocialLoginButton = ({ 
  provider, 
  mode, 
  disabled, 
  language = 'es' 
}: SocialLoginButtonProps) => {
  const { notifySuccess, notifyError } = useNotificationEffects();
  const config = providerConfig[provider];

  const t = (key: string) => getTranslation(key, language);

  const handleSocialLogin = async () => {
    console.log(`Mock ${provider} ${mode} attempt`);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate success/failure (90% success rate for demo)
      const success = Math.random() > 0.1;
      
      if (success) {
        // Puerto Rico specific mock names
        const mockNames = {
          google: language === 'es' ? 'Juan Pérez González' : 'Juan Pérez González',
          facebook: language === 'es' ? 'María Rivera Torres' : 'María Rivera Torres', 
          apple: language === 'es' ? 'Carlos Martínez Díaz' : 'Carlos Martínez Díaz'
        };
        
        const userName = mockNames[provider];
        const successMessage = language === 'es' 
          ? `¡Bienvenido ${userName}! Has iniciado sesión con ${config.name}.`
          : `Welcome ${userName}! You have signed in with ${config.name}.`;
          
        notifySuccess(
          t(mode === 'login' ? 'loginSuccessful' : 'registrationSuccessful'),
          successMessage,
          false
        );
      } else {
        const errorMessage = language === 'es'
          ? `No se pudo completar el ${mode === 'login' ? 'inicio de sesión' : 'registro'} con ${config.name}. Inténtalo de nuevo.`
          : `Could not complete ${mode === 'login' ? 'login' : 'registration'} with ${config.name}. Please try again.`;
          
        notifyError(
          `Error con ${config.name}`,
          errorMessage,
          true
        );
      }
    } catch (error) {
      const errorMessage = language === 'es'
        ? 'Hubo un problema al conectar con el proveedor. Inténtalo más tarde.'
        : 'There was a problem connecting with the provider. Please try again later.';
        
      notifyError(
        language === 'es' ? 'Error de conexión' : 'Connection Error',
        errorMessage,
        true
      );
    }
  };

  const buttonText = language === 'es' 
    ? `${mode === 'login' ? 'Continuar' : 'Registrarse'} con ${config.name}`
    : `${mode === 'login' ? 'Continue' : 'Register'} with ${config.name}`;

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleSocialLogin}
      disabled={disabled}
      className={`w-full ${config.bgColor} ${config.textColor} border ${config.borderColor} flex items-center justify-center space-x-2`}
    >
      {config.icon}
      <span>{buttonText}</span>
    </Button>
  );
};
