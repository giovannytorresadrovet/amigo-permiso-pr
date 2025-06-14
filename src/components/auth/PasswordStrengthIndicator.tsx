
import React from 'react';
import { Check, X } from 'lucide-react';
import { getAuthTranslation } from '@/utils/translations/authTranslations';

interface PasswordStrengthIndicatorProps {
  password: string;
  language?: 'es' | 'en';
  className?: string;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  language = 'es',
  className = ''
}) => {
  const t = (key: string) => getAuthTranslation(key, language);

  const requirements = [
    {
      key: 'minLength',
      label: t('minLength'),
      test: (pwd: string) => pwd.length >= 8
    },
    {
      key: 'hasUppercase',
      label: t('hasUppercase'),
      test: (pwd: string) => /[A-Z]/.test(pwd)
    },
    {
      key: 'hasLowercase',
      label: t('hasLowercase'),
      test: (pwd: string) => /[a-z]/.test(pwd)
    },
    {
      key: 'hasNumber',
      label: t('hasNumber'),
      test: (pwd: string) => /\d/.test(pwd)
    },
    {
      key: 'hasSpecialChar',
      label: t('hasSpecialChar'),
      test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    }
  ];

  const getStrengthScore = () => {
    return requirements.filter(req => req.test(password)).length;
  };

  const getStrengthColor = () => {
    const score = getStrengthScore();
    if (score < 2) return 'text-red-500';
    if (score < 4) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getStrengthLabel = () => {
    const score = getStrengthScore();
    if (score < 2) return language === 'es' ? 'Débil' : 'Weak';
    if (score < 4) return language === 'es' ? 'Media' : 'Medium';
    return language === 'es' ? 'Fuerte' : 'Strong';
  };

  if (!password) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">{t('passwordRequirements')}</span>
        <span className={`text-sm font-medium ${getStrengthColor()}`}>
          {getStrengthLabel()}
        </span>
      </div>
      
      <div className="space-y-1">
        {requirements.map((requirement) => {
          const isValid = requirement.test(password);
          return (
            <div
              key={requirement.key}
              className={`flex items-center text-xs ${
                isValid ? 'text-green-400' : 'text-slate-400'
              }`}
            >
              {isValid ? (
                <Check className="w-3 h-3 mr-2" />
              ) : (
                <X className="w-3 h-3 mr-2" />
              )}
              {requirement.label}
            </div>
          );
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-slate-700 rounded-full h-1">
        <div
          className={`h-1 rounded-full transition-all duration-300 ${
            getStrengthScore() < 2 ? 'bg-red-500' :
            getStrengthScore() < 4 ? 'bg-yellow-500' : 'bg-green-500'
          }`}
          style={{ width: `${(getStrengthScore() / requirements.length) * 100}%` }}
        />
      </div>
    </div>
  );
};
