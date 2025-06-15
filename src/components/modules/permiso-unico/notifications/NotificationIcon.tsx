
import { CheckCircle, AlertCircle, Bell } from 'lucide-react';
import { NotificationIconProps } from './types';

export const NotificationIcon = ({ type }: NotificationIconProps) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case 'warning':
      return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    case 'error':
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    default:
      return <Bell className="w-5 h-5 text-blue-600" />;
  }
};
