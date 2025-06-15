
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { NotificationIcon } from './NotificationIcon';
import { NotificationItemProps } from './types';

export const NotificationItemCard = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  return (
    <div 
      className={`p-4 border rounded-lg ${
        notification.read ? 'bg-gray-50' : 'bg-white border-l-4 border-l-blue-500'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <NotificationIcon type={notification.type} />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium">{notification.title}</h4>
              {notification.actionRequired && (
                <Badge variant="outline" className="text-xs">
                  Acción Requerida
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {notification.message}
            </p>
            <p className="text-xs text-gray-400">
              {notification.timestamp.toLocaleString()}
            </p>
          </div>
        </div>
        {!notification.read && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onMarkAsRead(notification.id)}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
