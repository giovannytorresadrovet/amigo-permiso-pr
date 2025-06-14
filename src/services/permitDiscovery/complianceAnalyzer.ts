
import { ComplianceIssue, BusinessProfile } from './types';

export class ComplianceAnalyzer {
  static identifyComplianceIssues(
    profile: BusinessProfile,
    zoningInfo: any[]
  ): ComplianceIssue[] {
    const issues: ComplianceIssue[] = [];

    // Check zoning compliance
    if (zoningInfo.length === 0) {
      issues.push({
        type: 'zoning',
        severity: 'critical',
        title: 'Zonificación Incompatible',
        description: 'El tipo de negocio podría no estar permitido en esta zona',
        solution: 'Verificar zonificación municipal y considerar cambio de ubicación o solicitud de varianza',
        estimatedCost: '$100-500',
        timeToResolve: '15-45 días'
      });
    }

    // Check parking requirements
    if (profile.hasPhysicalLocation && profile.employees > 5) {
      issues.push({
        type: 'regulatory',
        severity: 'warning',
        title: 'Requisitos de Estacionamiento',
        description: 'Negocios con más de 5 empleados requieren espacios de estacionamiento adicionales',
        solution: 'Verificar disponibilidad de estacionamiento o solicitar exención',
        estimatedCost: '$1,000-5,000',
        timeToResolve: '30-60 días'
      });
    }

    // Safety requirements for chemical handling
    if (profile.handlesChemicals) {
      issues.push({
        type: 'safety',
        severity: 'critical',
        title: 'Manejo de Químicos',
        description: 'Se requieren permisos especiales y medidas de seguridad para el manejo de químicos',
        solution: 'Obtener permiso ambiental y cumplir con protocolos de seguridad',
        estimatedCost: '$500-2,000',
        timeToResolve: '45-90 días'
      });
    }

    return issues;
  }
}
