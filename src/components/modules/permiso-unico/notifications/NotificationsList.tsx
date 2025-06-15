
import { Bell } from 'lucide-react';
import { NotificationItemCard } from './NotificationItemCard';
import { NotificationListProps } from './types';

export const NotificationsList = ({ notifications, onMarkAsRead }: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No hay notificaciones disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItemCard 
          key={notification.id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
};
