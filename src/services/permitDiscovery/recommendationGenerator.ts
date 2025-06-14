
import { DiscoveredPermit, ComplianceIssue, BusinessProfile } from './types';

export class RecommendationGenerator {
  static generateRecommendations(
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
}
