
import { KnowledgeCategory } from './types';

export const englishKnowledgeData: KnowledgeCategory[] = [
  {
    id: 'permits-basic',
    name: 'Basic Permits',
    description: 'Everything about fundamental permits to start a business',
    icon: 'FileText',
    articles: [
      {
        id: 'merchant-registration',
        title: 'How to Get Merchant Registration?',
        category: 'Basic Permits',
        content: `# Merchant Registration

Merchant Registration is the first step to legalize your business in Puerto Rico.

## Required Documents:
- Certificate of incorporation
- Owner's photo ID
- Proof of business address
- Completed Form SC-2901

## Process:
1. **Prepare documents** - Ensure you have all required documents
2. **Complete form** - Fill SC-2901 with accurate information
3. **Pay fees** - $25-$50 depending on business type
4. **Submit application** - At local office or online
5. **Receive certificate** - Process takes 5-7 business days

## Costs:
- Individual business: $25
- Corporation: $50
- Partnership: $40

## Renewal:
Must be renewed every 5 years. Renewal cost is the same as initial registration.

## Penalties for Non-Compliance:
- First violation: $500-$1,000
- Subsequent violations: $1,000-$5,000
- Temporary business closure`,
        tags: ['registration', 'merchant', 'basic', 'incorporation'],
        lastUpdated: new Date('2024-01-15'),
        featured: true,
        estimatedReadTime: 3
      },
      {
        id: 'use-permit',
        title: 'Use Permit: Complete Guide',
        category: 'Basic Permits',
        content: `# Use Permit

The Use Permit authorizes the operation of your business in a specific location.

## What is it?
Municipal certification that confirms your business type is allowed in the zone where you plan to operate.

## Required Documents:
- Certified property blueprints
- Municipal debt certificate
- Fire department inspection
- Property CRIM number
- Commercial insurance policy

## Step-by-Step Process:
1. **Verify zoning** - Confirm your business is allowed in the zone
2. **Obtain blueprints** - Architectural plans of the space
3. **Request inspections** - Fire, health (if applicable)
4. **Submit application** - With all documents
5. **Pay fees** - $100-$300 depending on municipality
6. **Receive approval** - 15-30 business days

## Required Inspections:
- **Fire**: Verify emergency exits and extinguishers
- **Health**: For restaurants, salons, care centers
- **Municipal**: Building code compliance

## Costs by Municipality:
- San Juan: $150-$300
- Bayamón: $100-$250
- Carolina: $125-$275
- Toa Baja: $100-$200

## Renewal:
Every 3 years or when changing commercial activity.`,
        tags: ['permit', 'use', 'municipal', 'zoning'],
        lastUpdated: new Date('2024-01-20'),
        featured: true,
        estimatedReadTime: 5
      }
    ]
  },
  {
    id: 'municipalities',
    name: 'By Municipality',
    description: 'Specific information for each municipality',
    icon: 'MapPin',
    articles: [
      {
        id: 'toa-baja-guide',
        title: 'Complete Guide: Permits in Toa Baja',
        category: 'By Municipality',
        content: `# Permits in Toa Baja

## Permits Office
**Address**: Calle Betances #75, Toa Baja, PR 00949
**Phone**: (787) 780-2020 ext. 245
**Hours**: Monday to Friday, 7:30 AM - 4:00 PM

## Main Permits:

### 1. Merchant Registration
- **Cost**: $25 (individual), $50 (corporation)
- **Time**: 5-7 days
- **Renewal**: Every 5 years

### 2. Use Permit
- **Cost**: $100-$200 depending on activity
- **Time**: 15-20 days (faster than other municipalities)
- **Renewal**: Every 3 years

### 3. Construction Permit
- **Cost**: 2% of construction value (minimum $200)
- **Time**: 30-45 days
- **Inspections**: Pre-construction, during work, final

## Special Services in Toa Baja:
- **One-Stop Window**: All permits in one office
- **Online tracking**: Digital system to track applications
- **Scheduled appointments**: Avoid long waits

## Zoning:
- **Residential**: R-1, R-2, R-3
- **Commercial**: C-1 (local), C-2 (general)
- **Industrial**: I-1 (light), I-2 (heavy)

## Important Contacts:
- **Permits Director**: Eng. María Torres
- **Assistant**: Mr. Carlos Vega
- **Email**: permisos@toabaja.pr.gov`,
        tags: ['toa baja', 'municipality', 'contacts', 'zoning'],
        lastUpdated: new Date('2024-01-25'),
        featured: false,
        estimatedReadTime: 4
      }
    ]
  },
  {
    id: 'business-types',
    name: 'Business Types',
    description: 'Specific requirements by business type',
    icon: 'Building',
    articles: [
      {
        id: 'restaurant-permits',
        title: 'Permits for Restaurants and Cafeterias',
        category: 'Business Types',
        content: `# Restaurant Permits

## Mandatory Permits:

### 1. Merchant Registration
- **Cost**: $50 (corporation)
- **Time**: 5-7 days

### 2. Use Permit
- **Cost**: $150-$300
- **Time**: 20-30 days
- **Note**: Commercial zoning required

### 3. Health Permit
- **Cost**: $75-$150
- **Time**: 10-15 days
- **Inspection**: Mandatory before opening

### 4. Alcohol Permit (if applicable)
- **Cost**: $500-$2,000 depending on type
- **Time**: 60-90 days
- **Types**: Beer & Wine, Full liquor

## Required Inspections:

### Health Inspection:
- ✅ Clean preparation area
- ✅ Adequate refrigeration
- ✅ Employee handwashing stations
- ✅ Ventilation system
- ✅ Pest control

### Fire Inspection:
- ✅ Emergency exits
- ✅ Appropriate extinguishers
- ✅ Safety signage
- ✅ Maximum capacity defined

## Special Documents:
- Food handler certificate (employees)
- Emergency plan
- Potable water certificate
- Public liability insurance

## Estimated Total Costs:
- **Small restaurant**: $800-$1,500
- **Medium restaurant**: $1,500-$3,000
- **With liquor**: +$500-$2,000

## Renewals:
- Health: Annual
- Use: Every 3 years
- Alcohol: Annual
- Merchant: Every 5 years`,
        tags: ['restaurant', 'food', 'health', 'alcohol'],
        lastUpdated: new Date('2024-01-18'),
        featured: true,
        estimatedReadTime: 6
      }
    ]
  }
];
