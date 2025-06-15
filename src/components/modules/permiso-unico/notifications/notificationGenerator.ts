
import { PermisoUnicoApplication } from '@/types/permisoUnico';
import { NotificationItem } from './types';

export const generateNotifications = (app: PermisoUnicoApplication): NotificationItem[] => {
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

  return generatedNotifications;
};
