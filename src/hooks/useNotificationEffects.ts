
import { useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';

export const useNotificationEffects = () => {
  const { addNotification } = useNotifications();

  // Simulate system notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        type: 'info',
        title: 'Welcome to the Business Portal',
        message: 'Your account has been successfully set up. Start by adding your business information.',
        persistent: true,
        actionUrl: '/dashboard',
        actionLabel: 'Go to Dashboard'
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [addNotification]);

  // Add notification helpers
  const notifySuccess = (title: string, message: string, persistent = false) => {
    addNotification({ type: 'success', title, message, persistent });
  };

  const notifyError = (title: string, message: string, persistent = true) => {
    addNotification({ type: 'error', title, message, persistent });
  };

  const notifyWarning = (title: string, message: string, persistent = false) => {
    addNotification({ type: 'warning', title, message, persistent });
  };

  const notifyInfo = (title: string, message: string, persistent = false) => {
    addNotification({ type: 'info', title, message, persistent });
  };

  return {
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
  };
};
