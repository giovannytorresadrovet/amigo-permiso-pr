
import { PermisoUnicoApplication } from '@/types/permisoUnico';

export interface StatusStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: 'completed' | 'current' | 'pending' | 'blocked';
  estimatedDays?: number;
  actualCompletionDate?: Date;
}

export const getStatusSteps = (application: PermisoUnicoApplication | null): StatusStep[] => {
  if (!application) {
    return [
      {
        id: 'application',
        title: 'Información del Negocio',
        description: 'Complete los datos básicos de su establecimiento',
        icon: 'FileText',
        status: 'pending',
        estimatedDays: 1
      },
      {
        id: 'submission',
        title: 'Envío de Solicitud',
        description: 'Revise y envíe su solicitud completa',
        icon: 'FileText',
        status: 'pending',
        estimatedDays: 1
      },
      {
        id: 'review',
        title: 'Revisión Técnica',
        description: 'Nuestro equipo revisará su solicitud',
        icon: 'Clock',
        status: 'pending',
        estimatedDays: 5
      },
      {
        id: 'documents',
        title: 'Verificación de Documentos',
        description: 'Validación de documentos requeridos',
        icon: 'FileText',
        status: 'pending',
        estimatedDays: 3
      },
      {
        id: 'inspection',
        title: 'Inspección del Local',
        description: 'Inspección física del establecimiento',
        icon: 'Calendar',
        status: 'pending',
        estimatedDays: 7
      },
      {
        id: 'payment',
        title: 'Procesamiento de Pago',
        description: 'Complete el pago de las tarifas',
        icon: 'CreditCard',
        status: 'pending',
        estimatedDays: 1
      },
      {
        id: 'approval',
        title: 'Aprobación Final',
        description: 'Emisión del Permiso Único',
        icon: 'Award',
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
      icon: 'FileText',
      status: 'completed',
      estimatedDays: 1,
      actualCompletionDate: application.lastUpdated
    },
    {
      id: 'submission',
      title: 'Envío de Solicitud',
      description: 'Revise y envíe su solicitud completa',
      icon: 'FileText',
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
    icon: 'Clock',
    status: ['under_review', 'pending_documents', 'inspection_scheduled', 'inspection_completed', 'pending_payment', 'approved'].includes(application.status) ? 'completed' : 'pending',
    estimatedDays: 5
  };

  const documentsStep: StatusStep = {
    id: 'documents',
    title: 'Verificación de Documentos',
    description: 'Validación de documentos requeridos',
    icon: 'FileText',
    status: application.status === 'pending_documents' ? 'blocked' : 
           ['inspection_scheduled', 'inspection_completed', 'pending_payment', 'approved'].includes(application.status) ? 'completed' : 'pending',
    estimatedDays: 3
  };

  const inspectionStep: StatusStep = {
    id: 'inspection',
    title: 'Inspección del Local',
    description: 'Inspección física del establecimiento',
    icon: 'Calendar',
    status: application.status === 'inspection_scheduled' ? 'current' :
           ['inspection_completed', 'pending_payment', 'approved'].includes(application.status) ? 'completed' : 'pending',
    estimatedDays: 7,
    actualCompletionDate: application.inspectionInfo?.completedDate
  };

  const paymentStep: StatusStep = {
    id: 'payment',
    title: 'Procesamiento de Pago',
    description: 'Complete el pago de las tarifas',
    icon: 'CreditCard',
    status: application.status === 'pending_payment' ? 'current' :
           application.status === 'approved' ? 'completed' : 'pending',
    estimatedDays: 1,
    actualCompletionDate: application.fees?.paymentDate
  };

  const approvalStep: StatusStep = {
    id: 'approval',
    title: 'Aprobación Final',
    description: 'Emisión del Permiso Único',
    icon: 'Award',
    status: application.status === 'approved' ? 'completed' : 'pending',
    estimatedDays: 2
  };

  steps.push(reviewStep, documentsStep, inspectionStep, paymentStep, approvalStep);
  return steps;
};

export const getOverallProgress = (steps: StatusStep[]): number => {
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  return Math.round((completedSteps / steps.length) * 100);
};

export const getEstimatedCompletion = (application: PermisoUnicoApplication | null, steps: StatusStep[]): Date | null => {
  if (!application) return null;
  
  const remainingSteps = steps.filter(step => step.status === 'pending' || step.status === 'blocked');
  const remainingDays = remainingSteps.reduce((sum, step) => sum + (step.estimatedDays || 0), 0);
  
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + remainingDays);
  
  return estimatedDate;
};
