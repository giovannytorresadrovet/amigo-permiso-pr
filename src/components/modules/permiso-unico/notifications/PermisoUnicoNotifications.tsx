
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PermisoUnicoApplication } from '@/types/permisoUnico';
import { NotificationsHeader } from './NotificationsHeader';
import { NotificationsList } from './NotificationsList';
import { generateNotifications } from './notificationGenerator';
import { NotificationItem } from './types';

interface PermisoUnicoNotificationsProps {
  application: PermisoUnicoApplication | null;
  language: 'es' | 'en';
}

export const PermisoUnicoNotifications = ({ application, language }: PermisoUnicoNotificationsProps) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (application) {
      const generatedNotifications = generateNotifications(application);
      setNotifications(generatedNotifications);
      setUnreadCount(generatedNotifications.filter(n => !n.read).length);
    }
  }, [application]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  return (
    <Card>
      <NotificationsHeader unreadCount={unreadCount} />
      <CardContent>
        <NotificationsList 
          notifications={notifications}
          onMarkAsRead={markAsRead}
        />
      </CardContent>
    </Card>
  );
};
