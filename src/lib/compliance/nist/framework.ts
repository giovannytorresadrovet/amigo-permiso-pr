
// NIST Cybersecurity Framework Implementation
export interface NISTFunction {
  id: string;
  name: string;
  description: string;
  categories: NISTCategory[];
}

export interface NISTCategory {
  id: string;
  name: string;
  description: string;
  subcategories: NISTSubcategory[];
}

export interface NISTSubcategory {
  id: string;
  name: string;
  description: string;
  informativeReferences: string[];
  implementationStatus: 'not_implemented' | 'partially_implemented' | 'implemented';
  evidence: string[];
  lastAssessed: Date | null;
}

export interface NISTAssessment {
  id: string;
  date: Date;
  assessor: string;
  overallMaturity: 'tier1' | 'tier2' | 'tier3' | 'tier4';
  functionAssessments: FunctionAssessment[];
  findings: Finding[];
  recommendations: Recommendation[];
}

export interface FunctionAssessment {
  functionId: string;
  maturityLevel: 'tier1' | 'tier2' | 'tier3' | 'tier4';
  implementationPercentage: number;
  criticalGaps: string[];
}

export interface Finding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  subcategoryId: string;
  description: string;
  recommendation: string;
  dueDate: Date;
  status: 'open' | 'in_progress' | 'resolved';
}

export interface Recommendation {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  estimatedEffort: string;
  businessImpact: string;
  technicalImpact: string;
}

export const NIST_FRAMEWORK: NISTFunction[] = [
  {
    id: 'identify',
    name: 'Identify (ID)',
    description: 'Develop organizational understanding to manage cybersecurity risk',
    categories: [
      {
        id: 'id-am',
        name: 'Asset Management',
        description: 'Data, personnel, devices, systems and facilities that enable achievement of business purposes',
        subcategories: [
          {
            id: 'id-am-1',
            name: 'Physical devices and systems',
            description: 'Physical devices and systems within the organization are inventoried',
            informativeReferences: ['CIS CSC 1', 'ISO/IEC 27001:2013 A.8.1.1'],
            implementationStatus: 'implemented',
            evidence: ['Device inventory system', 'Asset management database'],
            lastAssessed: new Date('2024-06-01')
          },
          {
            id: 'id-am-2',
            name: 'Software platforms and applications',
            description: 'Software platforms and applications within the organization are inventoried',
            informativeReferences: ['CIS CSC 2', 'ISO/IEC 27001:2013 A.8.1.2'],
            implementationStatus: 'implemented',
            evidence: ['Software inventory tracking', 'Application catalog'],
            lastAssessed: new Date('2024-06-01')
          },
          {
            id: 'id-am-3',
            name: 'Organizational communication flows',
            description: 'Organizational communication and data flows are mapped',
            informativeReferences: ['ISO/IEC 27001:2013 A.13.2.1'],
            implementationStatus: 'partially_implemented',
            evidence: ['Network diagrams', 'Data flow documentation'],
            lastAssessed: new Date('2024-06-01')
          }
        ]
      }
    ]
  },
  {
    id: 'protect',
    name: 'Protect (PR)',
    description: 'Develop and implement appropriate safeguards',
    categories: [
      {
        id: 'pr-ac',
        name: 'Identity Management and Access Control',
        description: 'Access to physical and logical assets is limited to authorized users',
        subcategories: [
          {
            id: 'pr-ac-1',
            name: 'Identity and credential management',
            description: 'Identities and credentials are issued, managed, verified, revoked for authorized devices',
            informativeReferences: ['CIS CSC 16', 'ISO/IEC 27001:2013 A.9.2.1'],
            implementationStatus: 'implemented',
            evidence: ['Auth0 implementation', 'User management system'],
            lastAssessed: new Date('2024-06-01')
          }
        ]
      }
    ]
  }
];
