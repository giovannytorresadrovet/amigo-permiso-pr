
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, AlertCircle, Clock, Mail, X } from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface NotificationItem {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
}

interface PermisoUnicoNotificationsProps {
  application: PermisoUnicoApplication | null;
  language: 'es' | 'en';
}

export const PermisoUnicoNotifications = ({ application, language }: PermisoUnicoNotificationsProps) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (application) {
      generateNotifications(application);
    }
  }, [application]);

  const generateNotifications = (app: PermisoUnicoApplication) => {
    const generatedNotifications: NotificationItem[] = [];

    // Status-based notifications
    switch (app.status) {
      case 'submitted':
        generatedNotifications.push({
          id: 'submit-confirmation',
          type: 'success',
          title: 'Solicitud Recibida',
          message: 'Su solicitud ha sido enviada exitosamente y está en cola para revisión.',
          timestamp: app.submittedAt || new Date(),
          read: false
        });
        break;

      case 'under_review':
        generatedNotifications.push({
          id: 'under-review',
          type: 'info',
          title: 'Revisión en Progreso',
          message: 'Su solicitud está siendo revisada por nuestro equipo técnico.',
          timestamp: new Date(),
          read: false
        });
        break;

      case 'pending_documents':
        generatedNotifications.push({
          id: 'docs-needed',
          type: 'warning',
          title: 'Documentos Requeridos',
          message: 'Se necesitan documentos adicionales para continuar con el proceso.',
          timestamp: new Date(),
          read: false,
          actionRequired: true
        });
        break;

      case 'inspection_scheduled':
        generatedNotifications.push({
          id: 'inspection-scheduled',
          type: 'info',
          title: 'Inspección Programada',
          message: `Su inspección ha sido programada para el ${app.inspectionInfo?.scheduledDate?.toLocaleDateString()}.`,
          timestamp: new Date(),
          read: false,
          actionRequired: true
        });
        break;

      case 'pending_payment':
        generatedNotifications.push({
          id: 'payment-pending',
          type: 'warning',
          title: 'Pago Pendiente',
          message: `Complete el pago de $${app.fees?.totalAmount?.toFixed(2)} para finalizar su solicitud.`,
          timestamp: new Date(),
          read: false,
          actionRequired: true
        });
        break;

      case 'approved':
        generatedNotifications.push({
          id: 'approved',
          type: 'success',
          title: '¡Permiso Aprobado!',
          message: 'Su Permiso Único ha sido aprobado exitosamente.',
          timestamp: new Date(),
          read: false
        });
        break;
    }

    // Document-based notifications
    const missingDocs = ['incorporation_certificate', 'tax_exempt_certificate', 'crim_certificate']
      .filter(docType => !app.documents.some(doc => doc.type === docType));

    if (missingDocs.length > 0) {
      generatedNotifications.push({
        id: 'missing-docs',
        type: 'warning',
        title: 'Documentos Faltantes',
        message: `Faltan ${missingDocs.length} documentos requeridos por subir.`,
        timestamp: new Date(),
        read: false,
        actionRequired: true
      });
    }

    setNotifications(generatedNotifications);
    setUnreadCount(generatedNotifications.filter(n => !n.read).length);
  };

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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <Bell className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <Card>
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
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No hay notificaciones disponibles</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 border rounded-lg ${
                  notification.read ? 'bg-gray-50' : 'bg-white border-l-4 border-l-blue-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
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
                      onClick={() => markAsRead(notification.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
