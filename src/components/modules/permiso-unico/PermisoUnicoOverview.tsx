
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, Clock, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface PermisoUnicoOverviewProps {
  application: PermisoUnicoApplication | null;
  businessId?: string;
  language: 'es' | 'en';
}

export const PermisoUnicoOverview = ({ application, businessId, language }: PermisoUnicoOverviewProps) => {
  const getProgressPercentage = () => {
    if (!application) return 0;
    
    const steps = [
      application.status !== 'draft',
      application.documents.length > 0,
      application.inspectionInfo?.status === 'completed',
      application.fees.paymentStatus === 'paid',
      application.status === 'approved'
    ];
    
    const completedSteps = steps.filter(Boolean).length;
    return (completedSteps / steps.length) * 100;
  };

  if (!application) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bienvenido al Permiso Único</CardTitle>
          <CardDescription>
            Comience su solicitud de Permiso Único de Operación para su establecimiento comercial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium mb-4">No hay solicitud activa</p>
            <p className="text-gray-600 mb-6">
              Inicie una nueva solicitud de Permiso Único para comenzar el proceso de obtención de su permiso comercial.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Iniciar Nueva Solicitud
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso de la Solicitud</CardTitle>
          <CardDescription>
            Estado actual de su solicitud de Permiso Único
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progreso General</span>
              <span className="text-sm text-gray-600">{Math.round(getProgressPercentage())}%</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Solicitud</p>
                <p className="text-xs text-gray-600">
                  {application.status === 'draft' ? 'Borrador' : 'Enviada'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm font-medium">Documentos</p>
                <p className="text-xs text-gray-600">
                  {application.documents.filter(d => d.status === 'approved').length} de {application.documents.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-sm font-medium">Inspección</p>
                <p className="text-xs text-gray-600">
                  {application.inspectionInfo?.status || 'No programada'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Pago</p>
                <p className="text-xs text-gray-600">
                  ${application.fees.paidAmount} de ${application.fees.totalAmount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Details */}
      <Card>
        <CardHeader>
          <CardTitle>Detalles de la Solicitud</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Número de Solicitud</p>
              <p className="text-lg">{application.applicationNumber || 'Sin asignar'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Fecha de Envío</p>
              <p className="text-lg">
                {application.submittedAt ? 
                  new Date(application.submittedAt).toLocaleDateString('es-PR') : 
                  'No enviada'
                }
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Negocio</p>
              <p className="text-lg">{application.businessInfo.businessName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Municipio</p>
              <p className="text-lg">{application.businessInfo.municipality}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      {application.status !== 'approved' && (
        <Card>
          <CardHeader>
            <CardTitle>Próximos Pasos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {application.status === 'draft' && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Complete su solicitud</p>
                    <p className="text-sm text-gray-600">Termine de llenar todos los campos requeridos y envíe su solicitud.</p>
                  </div>
                </div>
              )}
              
              {application.status === 'pending_documents' && (
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <FileText className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium">Documentos pendientes</p>
                    <p className="text-sm text-gray-600">Suba los documentos faltantes para continuar con el proceso.</p>
                  </div>
                </div>
              )}
              
              {application.status === 'pending_payment' && (
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium">Pago pendiente</p>
                    <p className="text-sm text-gray-600">Complete el pago de las tarifas para procesar su solicitud.</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
