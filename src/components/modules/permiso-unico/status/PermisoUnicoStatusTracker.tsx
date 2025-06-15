
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle, Calendar, FileText, CreditCard, Award } from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface StatusStep {
  id: string;
  title: string;
  description: string;
  icon: typeof CheckCircle;
  status: 'completed' | 'current' | 'pending' | 'blocked';
  estimatedDays?: number;
  actualCompletionDate?: Date;
}

interface PermisoUnicoStatusTrackerProps {
  application: PermisoUnicoApplication | null;
  language: 'es' | 'en';
}

export const PermisoUnicoStatusTracker = ({ application, language }: PermisoUnicoStatusTrackerProps) => {
  const getStatusSteps = (): StatusStep[] => {
    if (!application) {
      return [
        {
          id: 'application',
          title: 'Información del Negocio',
          description: 'Complete los datos básicos de su establecimiento',
          icon: FileText,
          status: 'pending',
          estimatedDays: 1
        },
        {
          id: 'submission',
          title: 'Envío de Solicitud',
          description: 'Revise y envíe su solicitud completa',
          icon: FileText,
          status: 'pending',
          estimatedDays: 1
        },
        {
          id: 'review',
          title: 'Revisión Técnica',
          description: 'Nuestro equipo revisará su solicitud',
          icon: Clock,
          status: 'pending',
          estimatedDays: 5
        },
        {
          id: 'documents',
          title: 'Verificación de Documentos',
          description: 'Validación de documentos requeridos',
          icon: FileText,
          status: 'pending',
          estimatedDays: 3
        },
        {
          id: 'inspection',
          title: 'Inspección del Local',
          description: 'Inspección física del establecimiento',
          icon: Calendar,
          status: 'pending',
          estimatedDays: 7
        },
        {
          id: 'payment',
          title: 'Procesamiento de Pago',
          description: 'Complete el pago de las tarifas',
          icon: CreditCard,
          status: 'pending',
          estimatedDays: 1
        },
        {
          id: 'approval',
          title: 'Aprobación Final',
          description: 'Emisión del Permiso Único',
          icon: Award,
          status: 'pending',
          estimatedDays: 2
        }
      ];
    }

    const steps: StatusStep[] = [
      {
        id: 'application',
        title: 'Información del Negocio',
        description: 'Complete los datos básicos de su establecimiento',
        icon: FileText,
        status: 'completed',
        estimatedDays: 1,
        actualCompletionDate: application.lastUpdated
      },
      {
        id: 'submission',
        title: 'Envío de Solicitud',
        description: 'Revise y envíe su solicitud completa',
        icon: FileText,
        status: application.submittedAt ? 'completed' : 'current',
        estimatedDays: 1,
        actualCompletionDate: application.submittedAt
      }
    ];

    // Add subsequent steps based on current status
    const reviewStep: StatusStep = {
      id: 'review',
      title: 'Revisión Técnica',
      description: 'Nuestro equipo revisará su solicitud',
      icon: Clock,
      status: ['under_review', 'pending_documents', 'inspection_scheduled', 'inspection_completed', 'pending_payment', 'approved'].includes(application.status) ? 'completed' : 'pending',
      estimatedDays: 5
    };

    const documentsStep: StatusStep = {
      id: 'documents',
      title: 'Verificación de Documentos',
      description: 'Validación de documentos requeridos',
      icon: FileText,
      status: application.status === 'pending_documents' ? 'blocked' : 
             ['inspection_scheduled', 'inspection_completed', 'pending_payment', 'approved'].includes(application.status) ? 'completed' : 'pending',
      estimatedDays: 3
    };

    const inspectionStep: StatusStep = {
      id: 'inspection',
      title: 'Inspección del Local',
      description: 'Inspección física del establecimiento',
      icon: Calendar,
      status: application.status === 'inspection_scheduled' ? 'current' :
             ['inspection_completed', 'pending_payment', 'approved'].includes(application.status) ? 'completed' : 'pending',
      estimatedDays: 7,
      actualCompletionDate: application.inspectionInfo?.completedDate
    };

    const paymentStep: StatusStep = {
      id: 'payment',
      title: 'Procesamiento de Pago',
      description: 'Complete el pago de las tarifas',
      icon: CreditCard,
      status: application.status === 'pending_payment' ? 'current' :
             application.status === 'approved' ? 'completed' : 'pending',
      estimatedDays: 1,
      actualCompletionDate: application.fees?.paymentDate
    };

    const approvalStep: StatusStep = {
      id: 'approval',
      title: 'Aprobación Final',
      description: 'Emisión del Permiso Único',
      icon: Award,
      status: application.status === 'approved' ? 'completed' : 'pending',
      estimatedDays: 2
    };

    steps.push(reviewStep, documentsStep, inspectionStep, paymentStep, approvalStep);
    return steps;
  };

  const getOverallProgress = () => {
    const steps = getStatusSteps();
    const completedSteps = steps.filter(step => step.status === 'completed').length;
    return Math.round((completedSteps / steps.length) * 100);
  };

  const getEstimatedCompletion = () => {
    if (!application) return null;
    
    const steps = getStatusSteps();
    const remainingSteps = steps.filter(step => step.status === 'pending' || step.status === 'blocked');
    const remainingDays = remainingSteps.reduce((sum, step) => sum + (step.estimatedDays || 0), 0);
    
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + remainingDays);
    
    return estimatedDate;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'current': return <Clock className="w-6 h-6 text-blue-600" />;
      case 'blocked': return <AlertCircle className="w-6 h-6 text-red-600" />;
      default: return <Clock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-800">Completado</Badge>;
      case 'current': return <Badge className="bg-blue-100 text-blue-800">En Progreso</Badge>;
      case 'blocked': return <Badge variant="destructive">Bloqueado</Badge>;
      default: return <Badge variant="secondary">Pendiente</Badge>;
    }
  };

  const steps = getStatusSteps();
  const overallProgress = getOverallProgress();
  const estimatedCompletion = getEstimatedCompletion();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Seguimiento Detallado</CardTitle>
        <CardDescription>
          Progreso completo de su solicitud de Permiso Único
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progreso General</span>
            <span className="text-sm text-gray-600">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
          {estimatedCompletion && (
            <div className="text-sm text-gray-600">
              Fecha estimada de finalización: {estimatedCompletion.toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Detailed Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              {/* Step Indicator */}
              <div className="flex flex-col items-center">
                {getStatusIcon(step.status)}
                {index < steps.length - 1 && (
                  <div className={`w-px h-12 mt-2 ${
                    step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                  }`} />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium">{step.title}</h3>
                  {getStatusBadge(step.status)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Estimado: {step.estimatedDays} día{step.estimatedDays !== 1 ? 's' : ''}</span>
                  {step.actualCompletionDate && (
                    <span>Completado: {step.actualCompletionDate.toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
