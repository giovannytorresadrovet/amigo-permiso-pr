
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Building2,
  MapPin,
  Users,
  DollarSign
} from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';
import { PermisoUnicoBusinessLogic } from '@/services/modules/permisoUnicoBusinessLogic';

interface PermisoUnicoOverviewProps {
  application: PermisoUnicoApplication | null;
  businessId?: string;
  language: 'es' | 'en';
}

export const PermisoUnicoOverview = ({ application, businessId, language }: PermisoUnicoOverviewProps) => {
  const getStatusProgress = () => {
    if (!application) return { progress: 0, step: 'draft', stepNumber: 0 };

    const statusSteps = {
      'draft': { progress: 10, stepNumber: 1 },
      'submitted': { progress: 25, stepNumber: 2 },
      'under_review': { progress: 40, stepNumber: 3 },
      'pending_documents': { progress: 35, stepNumber: 3 },
      'inspection_scheduled': { progress: 60, stepNumber: 4 },
      'inspection_completed': { progress: 75, stepNumber: 5 },
      'pending_payment': { progress: 85, stepNumber: 6 },
      'approved': { progress: 100, stepNumber: 7 },
      'rejected': { progress: 0, stepNumber: 0 },
      'expired': { progress: 0, stepNumber: 0 }
    };

    const statusInfo = statusSteps[application.status];
    return {
      progress: statusInfo.progress,
      step: application.status,
      stepNumber: statusInfo.stepNumber
    };
  };

  const getDocumentProgress = () => {
    if (!application) return 0;
    
    const requiredDocuments = ['incorporation_certificate', 'tax_exempt_certificate', 'crim_certificate', 'municipal_license'];
    const uploadedRequiredDocs = requiredDocuments.filter(docType => 
      application.documents.some(doc => doc.type === docType && doc.status !== 'rejected')
    );
    
    return Math.round((uploadedRequiredDocs.length / requiredDocuments.length) * 100);
  };

  const calculateTimelineEstimate = () => {
    if (!application) return 'N/A';
    
    const requirements = PermisoUnicoBusinessLogic.getRequirementsByBusinessType(
      application.businessInfo.businessType
    );
    
    const baseProcessingTime = requirements.estimatedProcessingTime;
    const submittedDate = application.submittedAt || new Date();
    const estimatedCompletion = new Date(submittedDate);
    estimatedCompletion.setDate(estimatedCompletion.getDate() + baseProcessingTime);
    
    return estimatedCompletion.toLocaleDateString();
  };

  const getNextActions = () => {
    if (!application) {
      return [
        'Complete la información básica del negocio',
        'Proporcione detalles de ubicación y operación',
        'Envíe la solicitud para revisión'
      ];
    }

    return PermisoUnicoBusinessLogic.getNextSteps(application);
  };

  const statusProgress = getStatusProgress();
  const documentProgress = getDocumentProgress();
  const nextActions = getNextActions();

  const getStatusBadge = (status: string) => {
    const config = {
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

    const statusInfo = config[status as keyof typeof config] || config.draft;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Estado de su Solicitud</CardTitle>
              <CardDescription>
                {application ? `Solicitud #${application.applicationNumber || application.id.slice(0, 8)}` : 'Nueva Solicitud'}
              </CardDescription>
            </div>
            {application && getStatusBadge(application.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progreso General</span>
                <span className="text-sm text-gray-600">{statusProgress.progress}% completado</span>
              </div>
              <Progress value={statusProgress.progress} className="h-3" />
            </div>

            {application && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Fecha de Envío:</span>
                  <p className="font-medium">
                    {application.submittedAt?.toLocaleDateString() || 'No enviado'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Última Actualización:</span>
                  <p className="font-medium">{application.lastUpdated.toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-600">Fecha Estimada de Finalización:</span>
                  <p className="font-medium">{calculateTimelineEstimate()}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pasos del Proceso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Información del Negocio', icon: Building2, status: statusProgress.stepNumber >= 1 },
              { step: 2, title: 'Envío de Solicitud', icon: FileText, status: statusProgress.stepNumber >= 2 },
              { step: 3, title: 'Revisión de Documentos', icon: FileText, status: statusProgress.stepNumber >= 3 },
              { step: 4, title: 'Programar Inspección', icon: Calendar, status: statusProgress.stepNumber >= 4 },
              { step: 5, title: 'Completar Inspección', icon: CheckCircle, status: statusProgress.stepNumber >= 5 },
              { step: 6, title: 'Procesar Pago', icon: CreditCard, status: statusProgress.stepNumber >= 6 },
              { step: 7, title: 'Permiso Aprobado', icon: CheckCircle, status: statusProgress.stepNumber >= 7 }
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.status ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {item.status ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <item.icon className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${item.status ? 'text-green-700' : 'text-gray-600'}`}>
                    {item.title}
                  </p>
                </div>
                {statusProgress.stepNumber === item.step && (
                  <Badge variant="default" className="text-xs">Actual</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Documents Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Documentos</h3>
            </div>
            <div className="space-y-2">
              <Progress value={documentProgress} className="h-2" />
              <p className="text-sm text-gray-600">
                {documentProgress}% de documentos requeridos subidos
              </p>
              <p className="text-xs text-gray-500">
                {application?.documents.length || 0} documentos subidos
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Inspection Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Inspección</h3>
            </div>
            <div className="space-y-2">
              {application?.inspectionInfo ? (
                <>
                  <Badge variant={
                    application.inspectionInfo.status === 'completed' ? 'default' :
                    application.inspectionInfo.status === 'scheduled' ? 'default' : 'secondary'
                  }>
                    {application.inspectionInfo.status === 'completed' ? 'Completada' :
                     application.inspectionInfo.status === 'scheduled' ? 'Programada' : 'Pendiente'}
                  </Badge>
                  {application.inspectionInfo.scheduledDate && (
                    <p className="text-sm text-gray-600">
                      {application.inspectionInfo.scheduledDate.toLocaleDateString()}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <Badge variant="secondary">No Programada</Badge>
                  <p className="text-sm text-gray-600">Pendiente de programar</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold">Pago</h3>
            </div>
            <div className="space-y-2">
              {application?.fees ? (
                <>
                  <Badge variant={
                    application.fees.paymentStatus === 'paid' ? 'default' :
                    application.fees.paymentStatus === 'partial' ? 'destructive' : 'secondary'
                  }>
                    {application.fees.paymentStatus === 'paid' ? 'Pagado' :
                     application.fees.paymentStatus === 'partial' ? 'Parcial' : 'Pendiente'}
                  </Badge>
                  <p className="text-sm text-gray-600">
                    ${application.fees.paidAmount.toFixed(2)} de ${application.fees.totalAmount.toFixed(2)}
                  </p>
                </>
              ) : (
                <>
                  <Badge variant="secondary">Calculando</Badge>
                  <p className="text-sm text-gray-600">Tarifas por determinar</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Information Summary */}
      {application && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Información del Negocio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Nombre del Negocio:</span>
                  <p className="font-medium">{application.businessInfo.businessName}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Tipo de Negocio:</span>
                  <p className="font-medium">{application.businessInfo.businessType}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">CRIM:</span>
                  <p className="font-medium">{application.businessInfo.crimNumber}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Municipio:</span>
                  <p className="font-medium">{application.businessInfo.municipality}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Dirección:</span>
                  <p className="font-medium">{application.businessInfo.address}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Empleados:</span>
                  <p className="font-medium">{application.businessInfo.employeeCount}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Próximos Pasos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nextActions.map((action, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm">{action}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {!application && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Building2 className="w-4 h-4 mr-2" />
                Comenzar Solicitud
              </Button>
            )}
            {application && application.status === 'draft' && (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FileText className="w-4 h-4 mr-2" />
                Continuar Solicitud
              </Button>
            )}
            {application && documentProgress < 100 && (
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Subir Documentos
              </Button>
            )}
            {application && !application.inspectionInfo && documentProgress >= 100 && (
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Programar Inspección
              </Button>
            )}
            {application && application.fees && application.fees.paymentStatus !== 'paid' && (
              <Button variant="outline">
                <CreditCard className="w-4 h-4 mr-2" />
                Procesar Pago
              </Button>
            )}
            <Button variant="outline">
              <AlertCircle className="w-4 h-4 mr-2" />
              Contactar Soporte
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
