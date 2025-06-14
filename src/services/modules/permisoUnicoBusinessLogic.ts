
import { PermisoUnicoApplication, PermisoUnicoRequirements, DocumentType } from '@/types/permisoUnico';

export class PermisoUnicoBusinessLogic {
  
  static getRequirementsByBusinessType(businessType: string): PermisoUnicoRequirements {
    const baseRequirements: PermisoUnicoRequirements = {
      businessType,
      requiredDocuments: [
        'incorporation_certificate',
        'tax_exempt_certificate',
        'crim_certificate'
      ],
      estimatedProcessingTime: 30, // days
      baseFee: 150,
      requiresInspection: true,
      specificRequirements: []
    };

    switch (businessType) {
      case 'restaurant':
        return {
          ...baseRequirements,
          requiredDocuments: [
            ...baseRequirements.requiredDocuments,
            'health_permit',
            'fire_department_permit'
          ],
          baseFee: 250,
          estimatedProcessingTime: 45,
          specificRequirements: [
            'Certificación del Departamento de Salud',
            'Inspección del Cuerpo de Bomberos',
            'Permiso de manipulación de alimentos'
          ]
        };

      case 'retail':
        return {
          ...baseRequirements,
          requiredDocuments: [
            ...baseRequirements.requiredDocuments,
            'zoning_certification'
          ],
          baseFee: 175,
          specificRequirements: [
            'Certificación de zonificación comercial'
          ]
        };

      case 'manufacturing':
        return {
          ...baseRequirements,
          requiredDocuments: [
            ...baseRequirements.requiredDocuments,
            'environmental_permit',
            'fire_department_permit',
            'building_plans'
          ],
          baseFee: 400,
          estimatedProcessingTime: 60,
          specificRequirements: [
            'Evaluación de impacto ambiental',
            'Planos de construcción aprobados',
            'Certificación de seguridad industrial'
          ]
        };

      case 'office':
        return {
          ...baseRequirements,
          baseFee: 125,
          estimatedProcessingTime: 20,
          requiresInspection: false,
          specificRequirements: [
            'Certificación de uso de oficina'
          ]
        };

      default:
        return baseRequirements;
    }
  }

  static calculateFees(application: PermisoUnicoApplication): number {
    const requirements = this.getRequirementsByBusinessType(application.businessInfo.businessType);
    let totalFees = requirements.baseFee;

    // Additional fees based on employee count
    if (application.businessInfo.employeeCount > 10) {
      totalFees += 50;
    }
    if (application.businessInfo.employeeCount > 25) {
      totalFees += 100;
    }

    // Additional fees for expedited processing
    if (application.businessInfo.businessType === 'restaurant') {
      totalFees += 75; // Health permit fee
    }

    return totalFees;
  }

  static validateApplication(application: PermisoUnicoApplication): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate business info
    if (!application.businessInfo.businessName.trim()) {
      errors.push('Nombre del negocio es requerido');
    }

    if (!application.businessInfo.businessType) {
      errors.push('Tipo de negocio es requerido');
    }

    if (!application.businessInfo.crimNumber.match(/^\d{3}-\d{3}-\d{3}$/)) {
      errors.push('Número CRIM debe tener el formato XXX-XXX-XXX');
    }

    if (!application.businessInfo.municipality) {
      errors.push('Municipio es requerido');
    }

    if (!application.businessInfo.address.trim()) {
      errors.push('Dirección es requerida');
    }

    if (!application.businessInfo.description.trim() || application.businessInfo.description.length < 10) {
      errors.push('Descripción del negocio debe tener al menos 10 caracteres');
    }

    if (application.businessInfo.employeeCount < 1) {
      errors.push('Número de empleados debe ser al menos 1');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static getNextSteps(application: PermisoUnicoApplication): string[] {
    const steps: string[] = [];

    switch (application.status) {
      case 'draft':
        steps.push('Complete toda la información requerida');
        steps.push('Revise los datos antes de enviar');
        steps.push('Envíe la solicitud para revisión');
        break;

      case 'submitted':
        steps.push('Esperando revisión inicial');
        steps.push('Recibirá notificación en 2-3 días hábiles');
        break;

      case 'under_review':
        steps.push('Su solicitud está siendo revisada');
        steps.push('Manténgase atento a solicitudes de documentos adicionales');
        break;

      case 'pending_documents':
        steps.push('Suba los documentos faltantes');
        steps.push('Verifique que todos los documentos estén legibles');
        break;

      case 'inspection_scheduled':
        steps.push('Prepare su establecimiento para la inspección');
        steps.push('Asegúrese de estar presente en la fecha programada');
        break;

      case 'pending_payment':
        steps.push('Complete el pago de las tarifas');
        steps.push('Guarde el comprobante de pago');
        break;

      case 'approved':
        steps.push('¡Felicidades! Su permiso ha sido aprobado');
        steps.push('Descargue su certificado');
        steps.push('Exhiba el permiso en su establecimiento');
        break;

      default:
        steps.push('Contacte a soporte para más información');
    }

    return steps;
  }
}
