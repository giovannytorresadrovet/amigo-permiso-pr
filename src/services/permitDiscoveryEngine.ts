
import { getPermitRequirements } from '@/data/governmentAgencies';
import { getZoningInfo, getMunicipalityById } from '@/data/municipalities';
import { getTranslation } from '@/utils/translations';

export interface BusinessProfile {
  name: string;
  businessType: string;
  municipality: string;
  address?: string;
  employees: number;
  revenue: string;
  hasPhysicalLocation: boolean;
  servesFood: boolean;
  handlesChemicals: boolean;
  operatesLateHours: boolean;
}

export interface PermitDiscoveryResult {
  requiredPermits: DiscoveredPermit[];
  potentialIssues: ComplianceIssue[];
  recommendations: string[];
  estimatedTimeline: string;
  estimatedCost: string;
  criticalPath: string[];
}

export interface DiscoveredPermit {
  id: string;
  name: string;
  agency: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  required: boolean;
  estimatedCost: string;
  processingTime: string;
  dependencies: string[];
  description: string;
  applicationSteps: string[];
  documents: string[];
  inspectionRequired: boolean;
}

export interface ComplianceIssue {
  type: 'zoning' | 'regulatory' | 'safety' | 'environmental';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  solution: string;
  estimatedCost?: string;
  timeToResolve?: string;
}

export class PermitDiscoveryEngine {
  static async analyzeBusinessRequirements(
    businessProfile: BusinessProfile,
    language: 'es' | 'en' = 'es'
  ): Promise<PermitDiscoveryResult> {
    // Get basic permit requirements
    const basePermits = getPermitRequirements(businessProfile.businessType, businessProfile.municipality);
    
    // Analyze zoning compliance
    const zoningInfo = getZoningInfo(businessProfile.municipality, businessProfile.businessType);
    const municipality = getMunicipalityById(businessProfile.municipality);
    
    // Discover additional permits based on business characteristics
    const discoveredPermits = this.discoverAdditionalPermits(businessProfile, basePermits);
    
    // Identify potential compliance issues
    const complianceIssues = this.identifyComplianceIssues(businessProfile, zoningInfo);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(businessProfile, discoveredPermits, complianceIssues, language);
    
    // Calculate timeline and costs
    const timeline = this.calculateTimeline(discoveredPermits);
    const cost = this.calculateCosts(discoveredPermits);
    
    // Determine critical path
    const criticalPath = this.determineCriticalPath(discoveredPermits);
    
    return {
      requiredPermits: discoveredPermits,
      potentialIssues: complianceIssues,
      recommendations,
      estimatedTimeline: timeline,
      estimatedCost: cost,
      criticalPath
    };
  }

  private static discoverAdditionalPermits(
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

  private static identifyComplianceIssues(
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

  private static generateRecommendations(
    profile: BusinessProfile,
    permits: DiscoveredPermit[],
    issues: ComplianceIssue[],
    language: 'es' | 'en'
  ): string[] {
    const recommendations: string[] = [];

    if (language === 'es') {
      recommendations.push('Comience con el Registro de Comerciante - es el primer paso obligatorio');
      
      if (issues.some(issue => issue.severity === 'critical')) {
        recommendations.push('Resuelva los problemas críticos de zonificación antes de invertir en equipos');
      }
      
      if (permits.some(permit => permit.inspectionRequired)) {
        recommendations.push('Programe inspecciones con anticipación - pueden tomar varias semanas');
      }
      
      recommendations.push('Considere contratar un consultor para acelerar el proceso');
      recommendations.push('Mantenga todos los documentos organizados y digitalizados');
    } else {
      recommendations.push('Start with Merchant Registration - it\'s the mandatory first step');
      
      if (issues.some(issue => issue.severity === 'critical')) {
        recommendations.push('Resolve critical zoning issues before investing in equipment');
      }
      
      if (permits.some(permit => permit.inspectionRequired)) {
        recommendations.push('Schedule inspections in advance - they can take several weeks');
      }
      
      recommendations.push('Consider hiring a consultant to accelerate the process');
      recommendations.push('Keep all documents organized and digitized');
    }

    return recommendations;
  }

  private static calculateTimeline(permits: DiscoveredPermit[]): string {
    // Calculate based on critical path and dependencies
    const maxDays = permits.reduce((max, permit) => {
      const days = this.parseDays(permit.processingTime);
      return Math.max(max, days);
    }, 0);

    const totalDays = maxDays + (permits.length * 5); // Add buffer for sequential processing
    
    if (totalDays <= 30) return '2-4 semanas';
    if (totalDays <= 60) return '1-2 meses';
    if (totalDays <= 90) return '2-3 meses';
    return '3-6 meses';
  }

  private static calculateCosts(permits: DiscoveredPermit[]): string {
    const costs = permits.map(permit => this.parseCost(permit.estimatedCost));
    const minTotal = costs.reduce((sum, cost) => sum + cost.min, 0);
    const maxTotal = costs.reduce((sum, cost) => sum + cost.max, 0);
    
    return `$${minTotal.toLocaleString()} - $${maxTotal.toLocaleString()}`;
  }

  private static determineCriticalPath(permits: DiscoveredPermit[]): string[] {
    // Sort by priority and dependencies
    const critical = permits
      .filter(permit => permit.priority === 'critical')
      .sort((a, b) => a.dependencies.length - b.dependencies.length);
    
    return critical.map(permit => permit.name);
  }

  private static parseDays(timeString: string): number {
    const match = timeString.match(/(\d+)/);
    return match ? parseInt(match[1]) : 30;
  }

  private static parseCost(costString: string): { min: number; max: number } {
    const matches = costString.match(/\$(\d+(?:,\d+)?)-?(\d+(?:,\d+)?)?/);
    if (!matches) return { min: 0, max: 0 };
    
    const min = parseInt(matches[1].replace(',', ''));
    const max = matches[2] ? parseInt(matches[2].replace(',', '')) : min;
    
    return { min, max };
  }
}
