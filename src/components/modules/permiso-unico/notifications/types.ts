
export interface NotificationItem {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
}

export interface NotificationIconProps {
  type: string;
}

export interface NotificationItemProps {
  notification: NotificationItem;
  onMarkAsRead: (id: string) => void;
}

export interface NotificationListProps {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
}
