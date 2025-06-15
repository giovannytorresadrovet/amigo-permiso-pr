
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Users, FileText, BarChart3, Download, Send, Calendar } from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface PermisoUnicoAdminProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  language: 'es' | 'en';
}

export const PermisoUnicoAdmin = ({ application, onApplicationUpdate, language }: PermisoUnicoAdminProps) => {
  const [activeTab, setActiveTab] = useState('status');
  const [adminNotes, setAdminNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const handleStatusUpdate = () => {
    if (!application || !newStatus) return;

    const updatedApplication = {
      ...application,
      status: newStatus as any,
      lastUpdated: new Date(),
      notes: [...application.notes, `Estado cambiado a: ${newStatus} - ${new Date().toLocaleString()}`]
    };

    if (adminNotes.trim()) {
      updatedApplication.notes.push(`Nota administrativa: ${adminNotes.trim()}`);
    }

    onApplicationUpdate(updatedApplication);
    setAdminNotes('');
    setNewStatus('');
  };

  const generateReport = () => {
    if (!application) return;

    const reportData = {
      applicationId: application.id,
      businessName: application.businessInfo.businessName,
      status: application.status,
      submittedAt: application.submittedAt,
      lastUpdated: application.lastUpdated,
      documentsCount: application.documents.length,
      complianceRate: calculateComplianceRate(),
      fees: application.fees
    };

    console.log('Generating report:', reportData);
    // In a real application, this would generate a PDF or export data
  };

  const calculateComplianceRate = () => {
    if (!application) return 0;
    
    const requiredDocs = ['incorporation_certificate', 'tax_exempt_certificate', 'crim_certificate'];
    const uploadedDocs = requiredDocs.filter(docType => 
      application.documents.some(doc => doc.type === docType && doc.status === 'approved')
    );
    
    return Math.round((uploadedDocs.length / requiredDocs.length) * 100);
  };

  const scheduleInspection = () => {
    if (!application) return;

    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + 7); // Schedule for next week

    const updatedApplication = {
      ...application,
      status: 'inspection_scheduled' as const,
      inspectionInfo: {
        id: `insp-${Date.now()}`,
        scheduledDate,
        status: 'scheduled' as const,
        checklist: [],
        notes: 'Inspección programada automáticamente',
        passed: false,
        deficiencies: []
      },
      lastUpdated: new Date(),
      notes: [...application.notes, `Inspección programada para: ${scheduledDate.toLocaleDateString()}`]
    };

    onApplicationUpdate(updatedApplication);
  };

  const sendNotification = (type: string) => {
    if (!application) return;

    const notifications = {
      'status_update': 'Notificación de cambio de estado enviada',
      'document_request': 'Solicitud de documentos adicionales enviada',
      'inspection_reminder': 'Recordatorio de inspección enviado',
      'payment_reminder': 'Recordatorio de pago enviado'
    };

    const message = notifications[type as keyof typeof notifications] || 'Notificación enviada';
    
    const updatedApplication = {
      ...application,
      notes: [...application.notes, `${message} - ${new Date().toLocaleString()}`],
      lastUpdated: new Date()
    };

    onApplicationUpdate(updatedApplication);
  };

  if (!application) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Panel Administrativo
          </CardTitle>
          <CardDescription>
            No hay solicitud seleccionada para administrar
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Panel Administrativo
          </CardTitle>
          <CardDescription>
            Herramientas de gestión para la solicitud #{application.id.slice(0, 8)}
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="status">Estado</TabsTrigger>
          <TabsTrigger value="communication">Comunicación</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
          <TabsTrigger value="actions">Acciones</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Gestión de Estado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Estado Actual</label>
                  <Badge variant="outline" className="w-full justify-center py-2">
                    {application.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Último Cambio</label>
                  <p className="text-sm text-gray-600">
                    {application.lastUpdated.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Tasa de Cumplimiento</label>
                  <p className="text-sm font-semibold text-green-600">
                    {calculateComplianceRate()}%
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">Cambiar Estado</label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar nuevo estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="submitted">Enviado</SelectItem>
                      <SelectItem value="under_review">En Revisión</SelectItem>
                      <SelectItem value="pending_documents">Documentos Pendientes</SelectItem>
                      <SelectItem value="inspection_scheduled">Inspección Programada</SelectItem>
                      <SelectItem value="inspection_completed">Inspección Completada</SelectItem>
                      <SelectItem value="pending_payment">Pago Pendiente</SelectItem>
                      <SelectItem value="approved">Aprobado</SelectItem>
                      <SelectItem value="rejected">Rechazado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Notas Administrativas</label>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Agregar notas sobre el cambio de estado..."
                    rows={3}
                  />
                </div>

                <Button onClick={handleStatusUpdate} disabled={!newStatus}>
                  <FileText className="w-4 h-4 mr-2" />
                  Actualizar Estado
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Centro de Comunicaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => sendNotification('status_update')}
                  className="h-20 flex-col"
                >
                  <Send className="w-6 h-6 mb-2" />
                  Notificar Cambio de Estado
                </Button>
                <Button
                  variant="outline"
                  onClick={() => sendNotification('document_request')}
                  className="h-20 flex-col"
                >
                  <FileText className="w-6 h-6 mb-2" />
                  Solicitar Documentos
                </Button>
                <Button
                  variant="outline"
                  onClick={() => sendNotification('inspection_reminder')}
                  className="h-20 flex-col"
                >
                  <Calendar className="w-6 h-6 mb-2" />
                  Recordar Inspección
                </Button>
                <Button
                  variant="outline"
                  onClick={() => sendNotification('payment_reminder')}
                  className="h-20 flex-col"
                >
                  <Send className="w-6 h-6 mb-2" />
                  Recordar Pago
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historial de Comunicaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {application.notes.slice(-5).map((note, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">{note}</p>
                  </div>
                ))}
                {application.notes.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No hay comunicaciones registradas
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Generación de Reportes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={generateReport} className="h-20 flex-col">
                  <Download className="w-6 h-6 mb-2" />
                  Reporte Completo
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  Análisis de Cumplimiento
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="w-6 h-6 mb-2" />
                  Reporte de Actividad
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <FileText className="w-6 h-6 mb-2" />
                  Historial de Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  onClick={scheduleInspection}
                  disabled={application.status !== 'under_review'}
                  className="w-full"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Programar Inspección
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Generar Certificado
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Expediente
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
