
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Mail } from 'lucide-react';

interface NotificationsHeaderProps {
  unreadCount: number;
}

export const NotificationsHeader = ({ unreadCount }: NotificationsHeaderProps) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          <CardTitle className="text-lg">Notificaciones</CardTitle>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        <Button variant="outline" size="sm">
          <Mail className="w-4 h-4 mr-2" />
          Configurar Email
        </Button>
      </div>
      <CardDescription>
        Manténgase informado sobre el estado de su solicitud
      </CardDescription>
    </CardHeader>
  );
};
