
// SOC2 Trust Services Criteria Implementation
export interface SOC2TrustService {
  id: string;
  name: string;
  description: string;
  criteria: SOC2Criterion[];
}

export interface SOC2Criterion {
  id: string;
  name: string;
  description: string;
  controlActivities: ControlActivity[];
  testingProcedures: TestingProcedure[];
  implementationStatus: 'not_implemented' | 'designed' | 'operating_effectively';
  lastTested: Date | null;
}

export interface ControlActivity {
  id: string;
  description: string;
  frequency: 'continuous' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  owner: string;
  evidence: string[];
  automationLevel: 'manual' | 'semi_automated' | 'fully_automated';
}

export interface TestingProcedure {
  id: string;
  description: string;
  expectedEvidence: string[];
  testingFrequency: 'monthly' | 'quarterly' | 'annually';
  lastExecuted: Date | null;
  result: 'passed' | 'failed' | 'exception' | null;
}

export interface SOC2Assessment {
  id: string;
  type: 'type_i' | 'type_ii';
  startDate: Date;
  endDate: Date;
  auditor: string;
  scope: string[];
  findings: SOC2Finding[];
  overallOpinion: 'unqualified' | 'qualified' | 'adverse' | 'disclaimer';
}

export interface SOC2Finding {
  id: string;
  severity: 'significant_deficiency' | 'material_weakness' | 'other_matter';
  criterionId: string;
  description: string;
  management_response: string;
  remediation_plan: string;
  target_date: Date;
  status: 'open' | 'remediated';
}

export const SOC2_TRUST_SERVICES: SOC2TrustService[] = [
  {
    id: 'security',
    name: 'Security',
    description: 'Information and systems are protected against unauthorized access',
    criteria: [
      {
        id: 'cc6.1',
        name: 'Logical and Physical Access Controls',
        description: 'The entity implements logical and physical access controls to prevent unauthorized access',
        controlActivities: [
          {
            id: 'cc6.1-01',
            description: 'Multi-factor authentication is required for all user accounts',
            frequency: 'continuous',
            owner: 'Security Team',
            evidence: ['Auth0 MFA configuration', 'User access logs'],
            automationLevel: 'fully_automated'
          },
          {
            id: 'cc6.1-02',
            description: 'User access is reviewed and approved by management',
            frequency: 'quarterly',
            owner: 'IT Manager',
            evidence: ['Access review reports', 'Approval documentation'],
            automationLevel: 'semi_automated'
          }
        ],
        testingProcedures: [
          {
            id: 'cc6.1-test-01',
            description: 'Test MFA enforcement for all user types',
            expectedEvidence: ['Authentication logs', 'Failed login attempts'],
            testingFrequency: 'quarterly',
            lastExecuted: null,
            result: null
          }
        ],
        implementationStatus: 'operating_effectively',
        lastTested: new Date('2024-06-01')
      }
    ]
  },
  {
    id: 'availability',
    name: 'Availability',
    description: 'Information and systems are available for operation and use',
    criteria: [
      {
        id: 'a1.1',
        name: 'Performance Monitoring',
        description: 'The entity monitors system performance and availability',
        controlActivities: [
          {
            id: 'a1.1-01',
            description: 'System uptime and performance metrics are continuously monitored',
            frequency: 'continuous',
            owner: 'DevOps Team',
            evidence: ['Cloudflare analytics', 'Performance dashboards'],
            automationLevel: 'fully_automated'
          }
        ],
        testingProcedures: [
          {
            id: 'a1.1-test-01',
            description: 'Review availability metrics and incident response',
            expectedEvidence: ['Uptime reports', 'Incident logs'],
            testingFrequency: 'monthly',
            lastExecuted: null,
            result: null
          }
        ],
        implementationStatus: 'operating_effectively',
        lastTested: new Date('2024-06-01')
      }
    ]
  }
];
