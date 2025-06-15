
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, CheckCircle, AlertCircle, Bell, Shield, Settings } from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';
import { PermisoUnicoOverview } from './PermisoUnicoOverview';
import { PermisoUnicoApplicationForm } from './PermisoUnicoApplicationForm';
import { PermisoUnicoDocuments } from './PermisoUnicoDocuments';
import { PermisoUnicoInspection } from './PermisoUnicoInspection';
import { PermisoUnicoPayment } from './PermisoUnicoPayment';
import { PermisoUnicoNotifications } from './notifications/PermisoUnicoNotifications';
import { PermisoUnicoStatusTracker } from './status/PermisoUnicoStatusTracker';
import { PermisoUnicoCompliance } from './compliance/PermisoUnicoCompliance';
import { PermisoUnicoAdmin } from './admin/PermisoUnicoAdmin';

interface PermisoUnicoComponentProps {
  businessId?: string;
  language?: 'es' | 'en';
}

export const PermisoUnicoComponent = ({ businessId, language = 'es' }: PermisoUnicoComponentProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [application, setApplication] = useState<PermisoUnicoApplication | null>(null);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Borrador', variant: 'secondary' as const },
      submitted: { label: 'Enviado', variant: 'default' as const },
      under_review: { label: 'En Revisión', variant: 'default' as const },
      pending_documents: { label: 'Documentos Pendientes', variant: 'destructive' as const },
      inspection_scheduled: { label: 'Inspección Programada', variant: 'default' as const },
      inspection_completed: { label: 'Inspección Completada', variant: 'default' as const },
      pending_payment: { label: 'Pago Pendiente', variant: 'destructive' as const },
      approved: { label: 'Aprobado', variant: 'default' as const },
      rejected: { label: 'Rechazado', variant: 'destructive' as const },
      expired: { label: 'Expirado', variant: 'secondary' as const }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <CardTitle className="text-2xl">Permiso Único de Operación</CardTitle>
                <CardDescription>
                  Sistema integral para permisos comerciales en Puerto Rico
                </CardDescription>
              </div>
            </div>
            {application?.status && getStatusBadge(application.status)}
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="application" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Solicitud
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Documentos
          </TabsTrigger>
          <TabsTrigger value="inspection" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Inspección
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Pago
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Cumplimiento
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Admin
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview">
            <PermisoUnicoOverview 
              application={application}
              businessId={businessId}
              language={language}
            />
          </TabsContent>

          <TabsContent value="application">
            <PermisoUnicoApplicationForm 
              application={application}
              onApplicationUpdate={setApplication}
              businessId={businessId}
              language={language}
            />
          </TabsContent>

          <TabsContent value="documents">
            <PermisoUnicoDocuments 
              application={application}
              onApplicationUpdate={setApplication}
              language={language}
            />
          </TabsContent>

          <TabsContent value="inspection">
            <PermisoUnicoInspection 
              application={application}
              onApplicationUpdate={setApplication}
              language={language}
            />
          </TabsContent>

          <TabsContent value="payment">
            <PermisoUnicoPayment 
              application={application}
              onApplicationUpdate={setApplication}
              language={language}
            />
          </TabsContent>

          <TabsContent value="notifications">
            <PermisoUnicoNotifications 
              application={application}
              language={language}
            />
          </TabsContent>

          <TabsContent value="compliance">
            <PermisoUnicoCompliance 
              application={application}
              language={language}
            />
          </TabsContent>

          <TabsContent value="admin">
            <PermisoUnicoAdmin 
              application={application}
              onApplicationUpdate={setApplication}
              language={language}
            />
          </TabsContent>

          <TabsContent value="status">
            <PermisoUnicoStatusTracker 
              application={application}
              language={language}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
