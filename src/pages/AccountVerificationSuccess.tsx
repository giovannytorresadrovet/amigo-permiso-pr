
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AccountVerificationSuccess as AccountVerificationSuccessComponent } from '@/components/auth/AccountVerificationSuccess';

const AccountVerificationSuccess = () => {
  const [searchParams] = useSearchParams();
  const [userEmail, setUserEmail] = useState<string>('');
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  useEffect(() => {
    // Get user info from URL params or localStorage
    const emailParam = searchParams.get('email');
    const storedEmail = localStorage.getItem('verified_user_email');
    const storedLanguage = localStorage.getItem('preferred_language') as 'es' | 'en';
    
    if (emailParam) {
      setUserEmail(emailParam);
      localStorage.setItem('verified_user_email', emailParam);
    } else if (storedEmail) {
      setUserEmail(storedEmail);
    }

    if (storedLanguage) {
      setLanguage(storedLanguage);
    }

    // Clean up verification-related localStorage items
    localStorage.removeItem('pending_verification_email');
  }, [searchParams]);

  return (
    <AccountVerificationSuccessComponent
      language={language}
      userEmail={userEmail}
      redirectToDashboard={true}
    />
  );
};

export default AccountVerificationSuccess;
