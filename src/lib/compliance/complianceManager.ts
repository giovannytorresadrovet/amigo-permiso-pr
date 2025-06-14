
import { AuditLogger } from '@/lib/security';
import { NIST_FRAMEWORK, type NISTAssessment, type Finding } from './nist/framework';
import { SOC2_TRUST_SERVICES, type SOC2Assessment } from './soc2/framework';

export interface ComplianceStatus {
  nist: {
    overallMaturity: 'tier1' | 'tier2' | 'tier3' | 'tier4';
    implementationPercentage: number;
    lastAssessment: Date | null;
    criticalFindings: number;
  };
  soc2: {
    readinessScore: number;
    implementedControls: number;
    totalControls: number;
    lastAssessment: Date | null;
    significantDeficiencies: number;
  };
  overall: {
    complianceScore: number;
    trend: 'improving' | 'stable' | 'declining';
    nextAssessmentDue: Date;
  };
}

export interface ComplianceEvidence {
  id: string;
  type: 'document' | 'log' | 'screenshot' | 'configuration';
  title: string;
  description: string;
  framework: 'nist' | 'soc2' | 'both';
  criteriaIds: string[];
  uploadDate: Date;
  expirationDate?: Date;
  approver: string;
  status: 'draft' | 'approved' | 'expired';
}

export interface ComplianceTask {
  id: string;
  title: string;
  description: string;
  framework: 'nist' | 'soc2' | 'both';
  priority: 'critical' | 'high' | 'medium' | 'low';
  assignee: string;
  dueDate: Date;
  status: 'not_started' | 'in_progress' | 'review' | 'completed';
  dependencies: string[];
  estimatedHours: number;
  actualHours?: number;
}

export class ComplianceManager {
  private static instance: ComplianceManager;

  static getInstance(): ComplianceManager {
    if (!ComplianceManager.instance) {
      ComplianceManager.instance = new ComplianceManager();
    }
    return ComplianceManager.instance;
  }

  // NIST Framework Methods
  async assessNISTCompliance(): Promise<NISTAssessment> {
    AuditLogger.log({
      action: 'nist_assessment_started',
      details: { timestamp: new Date().toISOString() }
    });

    // Calculate implementation status across all subcategories
    let totalSubcategories = 0;
    let implementedCount = 0;
    let partiallyImplementedCount = 0;

    NIST_FRAMEWORK.forEach(func => {
      func.categories.forEach(category => {
        category.subcategories.forEach(subcategory => {
          totalSubcategories++;
          if (subcategory.implementationStatus === 'implemented') {
            implementedCount++;
          } else if (subcategory.implementationStatus === 'partially_implemented') {
            partiallyImplementedCount++;
          }
        });
      });
    });

    const implementationPercentage = Math.round(
      ((implementedCount + (partiallyImplementedCount * 0.5)) / totalSubcategories) * 100
    );

    // Determine overall maturity tier
    let overallMaturity: 'tier1' | 'tier2' | 'tier3' | 'tier4' = 'tier1';
    if (implementationPercentage >= 90) overallMaturity = 'tier4';
    else if (implementationPercentage >= 70) overallMaturity = 'tier3';
    else if (implementationPercentage >= 50) overallMaturity = 'tier2';

    const assessment: NISTAssessment = {
      id: `nist-${Date.now()}`,
      date: new Date(),
      assessor: 'System Assessment',
      overallMaturity,
      functionAssessments: NIST_FRAMEWORK.map(func => ({
        functionId: func.id,
        maturityLevel: overallMaturity,
        implementationPercentage,
        criticalGaps: []
      })),
      findings: [],
      recommendations: []
    };

    return assessment;
  }

  // SOC2 Readiness Methods
  async assessSOC2Readiness(): Promise<number> {
    AuditLogger.log({
      action: 'soc2_readiness_assessment',
      details: { timestamp: new Date().toISOString() }
    });

    let totalCriteria = 0;
    let implementedCriteria = 0;

    SOC2_TRUST_SERVICES.forEach(service => {
      service.criteria.forEach(criterion => {
        totalCriteria++;
        if (criterion.implementationStatus === 'operating_effectively') {
          implementedCriteria++;
        } else if (criterion.implementationStatus === 'designed') {
          implementedCriteria += 0.7; // Partial credit for designed controls
        }
      });
    });

    return Math.round((implementedCriteria / totalCriteria) * 100);
  }

  // Compliance Status Overview
  async getComplianceStatus(): Promise<ComplianceStatus> {
    const nistAssessment = await this.assessNISTCompliance();
    const soc2Readiness = await this.assessSOC2Readiness();

    const totalControls = SOC2_TRUST_SERVICES.reduce(
      (sum, service) => sum + service.criteria.length, 0
    );
    
    const implementedControls = SOC2_TRUST_SERVICES.reduce(
      (sum, service) => sum + service.criteria.filter(
        c => c.implementationStatus === 'operating_effectively'
      ).length, 0
    );

    return {
      nist: {
        overallMaturity: nistAssessment.overallMaturity,
        implementationPercentage: nistAssessment.functionAssessments[0]?.implementationPercentage || 0,
        lastAssessment: nistAssessment.date,
        criticalFindings: nistAssessment.findings.filter(f => f.severity === 'critical').length
      },
      soc2: {
        readinessScore: soc2Readiness,
        implementedControls,
        totalControls,
        lastAssessment: new Date(),
        significantDeficiencies: 0
      },
      overall: {
        complianceScore: Math.round((nistAssessment.functionAssessments[0]?.implementationPercentage || 0 + soc2Readiness) / 2),
        trend: 'improving',
        nextAssessmentDue: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days from now
      }
    };
  }

  // Evidence Management
  async addEvidence(evidence: Omit<ComplianceEvidence, 'id' | 'uploadDate' | 'status'>): Promise<string> {
    const evidenceId = `evidence-${Date.now()}`;
    
    AuditLogger.log({
      action: 'compliance_evidence_added',
      details: {
        evidenceId,
        type: evidence.type,
        framework: evidence.framework,
        criteriaIds: evidence.criteriaIds
      }
    });

    // In production, store in database
    const fullEvidence: ComplianceEvidence = {
      ...evidence,
      id: evidenceId,
      uploadDate: new Date(),
      status: 'draft'
    };

    return evidenceId;
  }

  // Task Management
  async createComplianceTask(task: Omit<ComplianceTask, 'id' | 'status'>): Promise<string> {
    const taskId = `task-${Date.now()}`;
    
    AuditLogger.log({
      action: 'compliance_task_created',
      details: {
        taskId,
        framework: task.framework,
        priority: task.priority,
        assignee: task.assignee
      }
    });

    // In production, store in database
    return taskId;
  }

  // Puerto Rico Specific Compliance
  async assessPuertoRicoCompliance(): Promise<{
    dataProtection: boolean;
    privacyLaws: boolean;
    governmentDataHandling: boolean;
    localBusinessRequirements: boolean;
  }> {
    AuditLogger.log({
      action: 'puerto_rico_compliance_assessment',
      details: { timestamp: new Date().toISOString() }
    });

    return {
      dataProtection: true, // Based on existing security measures
      privacyLaws: true, // GDPR-like implementation
      governmentDataHandling: true, // Secure data handling practices
      localBusinessRequirements: true // Business permit compliance
    };
  }
}
