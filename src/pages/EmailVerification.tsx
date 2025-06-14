
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { EmailVerification as EmailVerificationComponent } from '@/components/auth/EmailVerification';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  useEffect(() => {
    // Get email from URL params or localStorage
    const emailParam = searchParams.get('email');
    const storedEmail = localStorage.getItem('pending_verification_email');
    const storedLanguage = localStorage.getItem('preferred_language') as 'es' | 'en';
    
    if (emailParam) {
      setEmail(emailParam);
      localStorage.setItem('pending_verification_email', emailParam);
    } else if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email found, redirect to signup
      navigate('/signup');
      return;
    }

    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, [searchParams, navigate]);

  const handleResendVerification = () => {
    console.log('Resending verification to:', email);
    // TODO: Implement resend verification logic
  };

  if (!email) {
    return null; // Loading state or redirect
  }

  return (
    <EmailVerificationComponent
      email={email}
      language={language}
      onResendVerification={handleResendVerification}
    />
  );
};

export default EmailVerification;
