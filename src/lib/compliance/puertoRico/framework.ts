
// Puerto Rico Specific Compliance Framework
export interface PuertoRicoRegulation {
  id: string;
  name: string;
  description: string;
  applicability: string[];
  requirements: ComplianceRequirement[];
  penalties: RegulatoryPenalty[];
}

export interface ComplianceRequirement {
  id: string;
  description: string;
  category: 'data_protection' | 'privacy' | 'business_licensing' | 'tax' | 'employment';
  mandatory: boolean;
  implementationStatus: 'compliant' | 'non_compliant' | 'partial' | 'not_applicable';
  evidence: string[];
  lastReviewed: Date | null;
}

export interface RegulatoryPenalty {
  violationType: string;
  minimumFine: number;
  maximumFine: number;
  additionalConsequences: string[];
}

export const PUERTO_RICO_REGULATIONS: PuertoRicoRegulation[] = [
  {
    id: 'pr-data-protection',
    name: 'Ley de Protección de Datos de Puerto Rico',
    description: 'Regulaciones para protección de datos personales y privacidad',
    applicability: ['all_businesses', 'government_contractors', 'data_processors'],
    requirements: [
      {
        id: 'pr-dp-01',
        description: 'Implementar medidas técnicas y organizacionales para proteger datos personales',
        category: 'data_protection',
        mandatory: true,
        implementationStatus: 'compliant',
        evidence: ['Security policies', 'Encryption implementation', 'Access controls'],
        lastReviewed: new Date('2024-06-01')
      },
      {
        id: 'pr-dp-02',
        description: 'Notificar violaciones de datos dentro de 72 horas',
        category: 'data_protection',
        mandatory: true,
        implementationStatus: 'compliant',
        evidence: ['Incident response plan', 'Notification procedures'],
        lastReviewed: new Date('2024-06-01')
      },
      {
        id: 'pr-dp-03',
        description: 'Obtener consentimiento explícito para procesamiento de datos',
        category: 'privacy',
        mandatory: true,
        implementationStatus: 'compliant',
        evidence: ['Consent management system', 'Privacy notices'],
        lastReviewed: new Date('2024-06-01')
      }
    ],
    penalties: [
      {
        violationType: 'Minor data protection violation',
        minimumFine: 1000,
        maximumFine: 10000,
        additionalConsequences: ['Warning', 'Corrective action requirement']
      },
      {
        violationType: 'Major data breach',
        minimumFine: 10000,
        maximumFine: 100000,
        additionalConsequences: ['Business license suspension', 'Mandatory security audit']
      }
    ]
  },
  {
    id: 'pr-business-licensing',
    name: 'Regulaciones de Licencias Comerciales',
    description: 'Requisitos para operación legal de negocios en Puerto Rico',
    applicability: ['all_businesses'],
    requirements: [
      {
        id: 'pr-bl-01',
        description: 'Mantener registro comercial válido y actualizado',
        category: 'business_licensing',
        mandatory: true,
        implementationStatus: 'compliant',
        evidence: ['Business registration certificate', 'Annual renewals'],
        lastReviewed: new Date('2024-06-01')
      },
      {
        id: 'pr-bl-02',
        description: 'Cumplir con requisitos de zonificación municipal',
        category: 'business_licensing',
        mandatory: true,
        implementationStatus: 'compliant',
        evidence: ['Zoning permits', 'Use permits'],
        lastReviewed: new Date('2024-06-01')
      }
    ],
    penalties: [
      {
        violationType: 'Operating without proper license',
        minimumFine: 500,
        maximumFine: 5000,
        additionalConsequences: ['Business closure order', 'Daily penalties until compliance']
      }
    ]
  }
];

export class PuertoRicoComplianceManager {
  static assessCompliance(): {
    overallScore: number;
    compliantRequirements: number;
    totalRequirements: number;
    criticalViolations: number;
    recommendations: string[];
  } {
    let totalRequirements = 0;
    let compliantRequirements = 0;
    let criticalViolations = 0;
    const recommendations: string[] = [];

    PUERTO_RICO_REGULATIONS.forEach(regulation => {
      regulation.requirements.forEach(requirement => {
        totalRequirements++;
        
        if (requirement.implementationStatus === 'compliant') {
          compliantRequirements++;
        } else if (requirement.mandatory && requirement.implementationStatus === 'non_compliant') {
          criticalViolations++;
          recommendations.push(`Urgente: Cumplir con ${requirement.description}`);
        } else if (requirement.implementationStatus === 'partial') {
          compliantRequirements += 0.5;
          recommendations.push(`Completar implementación: ${requirement.description}`);
        }
      });
    });

    return {
      overallScore: Math.round((compliantRequirements / totalRequirements) * 100),
      compliantRequirements: Math.floor(compliantRequirements),
      totalRequirements,
      criticalViolations,
      recommendations
    };
  }

  static getApplicableRegulations(businessType: string): PuertoRicoRegulation[] {
    return PUERTO_RICO_REGULATIONS.filter(regulation =>
      regulation.applicability.includes('all_businesses') ||
      regulation.applicability.includes(businessType)
    );
  }
}
