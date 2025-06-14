
import { DiscoveredPermit, BusinessProfile } from './types';

export class PermitAnalyzer {
  static discoverAdditionalPermits(
    profile: BusinessProfile,
    basePermits: any[]
  ): DiscoveredPermit[] {
    const permits: DiscoveredPermit[] = basePermits.map(permit => ({
      id: permit.permitId,
      name: permit.permitName,
      agency: permit.agency,
      priority: permit.required ? 'critical' : 'medium' as any,
      required: permit.required,
      estimatedCost: permit.estimatedCost,
      processingTime: permit.processingTime,
      dependencies: permit.dependencies,
      description: `Permiso requerido para ${profile.businessType}`,
      applicationSteps: ['Llenar solicitud', 'Adjuntar documentos', 'Pagar derechos', 'Esperar aprobación'],
      documents: permit.documents,
      inspectionRequired: permit.inspectionRequired
    }));

    // Add conditional permits based on business characteristics
    if (profile.servesFood) {
      permits.push({
        id: 'manipulador-alimentos',
        name: 'Certificado de Manipulador de Alimentos',
        agency: 'Departamento de Salud',
        priority: 'critical',
        required: true,
        estimatedCost: '$15-25',
        processingTime: '1-2 días',
        dependencies: [],
        description: 'Certificación obligatoria para el manejo de alimentos',
        applicationSteps: ['Completar curso', 'Tomar examen', 'Obtener certificado'],
        documents: ['Identificación', 'Comprobante de curso'],
        inspectionRequired: false
      });
    }

    if (profile.employees > 1) {
      permits.push({
        id: 'compensacion-trabajadores',
        name: 'Seguro de Compensación por Accidentes del Trabajo',
        agency: 'Fondo del Seguro del Estado',
        priority: 'critical',
        required: true,
        estimatedCost: 'Variable según nómina',
        processingTime: '7-14 días',
        dependencies: ['registro-comerciante'],
        description: 'Seguro obligatorio para empleadores',
        applicationSteps: ['Registrarse como patrono', 'Solicitar póliza', 'Pagar prima'],
        documents: ['W-3', 'Planilla de empleados'],
        inspectionRequired: false
      });
    }

    if (profile.operatesLateHours) {
      permits.push({
        id: 'licencia-horario-extendido',
        name: 'Licencia de Horario Extendido',
        agency: 'Municipio',
        priority: 'medium',
        required: false,
        estimatedCost: '$50-200',
        processingTime: '15-30 días',
        dependencies: ['licencia-municipal'],
        description: 'Autorización para operar después del horario regular',
        applicationSteps: ['Solicitar en municipio', 'Evaluación de impacto', 'Aprobación'],
        documents: ['Solicitud municipal', 'Planos de ubicación'],
        inspectionRequired: true
      });
    }

    return permits;
  }

  static determineCriticalPath(permits: DiscoveredPermit[]): string[] {
    // Sort by priority and dependencies
    const critical = permits
      .filter(permit => permit.priority === 'critical')
      .sort((a, b) => a.dependencies.length - b.dependencies.length);
    
    return critical.map(permit => permit.name);
  }
}
