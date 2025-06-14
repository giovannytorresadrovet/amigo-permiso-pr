
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Notification, NotificationContextType } from '@/types/notification';
import { useToast } from '@/hooks/use-toast';
import { AuditLogger } from '@/lib/security';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  const addNotification = useCallback((notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const notification: Notification = {
      ...notificationData,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [notification, ...prev]);

    // Show toast notification
    toast({
      title: notification.title,
      description: notification.message,
      variant: notification.type === 'error' ? 'destructive' : 'default',
    });

    // Log notification creation
    AuditLogger.log({
      action: 'notification_created',
      details: {
        notificationId: notification.id,
        type: notification.type,
        title: notification.title,
        persistent: notification.persistent || false
      }
    });
  }, [toast]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );

    AuditLogger.log({
      action: 'notification_read',
      details: { notificationId: id }
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );

    AuditLogger.log({
      action: 'notifications_mark_all_read',
      details: { count: notifications.filter(n => !n.read).length }
    });
  }, [notifications]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));

    AuditLogger.log({
      action: 'notification_removed',
      details: { notificationId: id }
    });
  }, []);

  const clearAll = useCallback(() => {
    const count = notifications.length;
    setNotifications([]);

    AuditLogger.log({
      action: 'notifications_cleared_all',
      details: { count }
    });
  }, [notifications.length]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
