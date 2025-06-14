
export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  lastUpdated: Date;
  featured: boolean;
  estimatedReadTime: number;
}

export interface KnowledgeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  articles: KnowledgeArticle[];
}

export const knowledgeBaseData: Record<'es' | 'en', KnowledgeCategory[]> = {
  es: [
    {
      id: 'permits-basic',
      name: 'Permisos Básicos',
      description: 'Todo sobre los permisos fundamentales para iniciar un negocio',
      icon: 'FileText',
      articles: [
        {
          id: 'registro-comerciante',
          title: '¿Cómo obtener el Registro de Comerciante?',
          category: 'Permisos Básicos',
          content: `# Registro de Comerciante

El Registro de Comerciante es el primer paso para legalizar tu negocio en Puerto Rico.

## Documentos Necesarios:
- Certificado de incorporación
- Identificación con foto del dueño
- Prueba de dirección comercial
- Formulario SC-2901 completado

## Proceso:
1. **Prepara los documentos** - Asegúrate de tener todos los documentos requeridos
2. **Completa el formulario** - Llena el SC-2901 con información precisa
3. **Paga las tarifas** - $25-$50 dependiendo del tipo de negocio
4. **Presenta la solicitud** - En la oficina local o en línea
5. **Recibe el certificado** - Proceso toma 5-7 días hábiles

## Costos:
- Negocio individual: $25
- Corporación: $50
- Sociedad: $40

## Renovación:
Se debe renovar cada 5 años. El costo de renovación es el mismo que el registro inicial.

## Multas por No Cumplir:
- Primera infracción: $500-$1,000
- Infracciones subsecuentes: $1,000-$5,000
- Cierre temporal del negocio`,
          tags: ['registro', 'comerciante', 'básico', 'incorporación'],
          lastUpdated: new Date('2024-01-15'),
          featured: true,
          estimatedReadTime: 3
        },
        {
          id: 'permiso-uso',
          title: 'Permiso de Uso: Guía Completa',
          category: 'Permisos Básicos',
          content: `# Permiso de Uso

El Permiso de Uso autoriza la operación de tu negocio en una ubicación específica.

## ¿Qué es?
Certificación municipal que confirma que tu tipo de negocio es permitido en la zona donde planeas operar.

## Documentos Requeridos:
- Planos del local certificados
- Certificado de deuda municipal
- Inspección de bomberos
- Número CRIM del local
- Póliza de seguro comercial

## Proceso Paso a Paso:
1. **Verificar zonificación** - Confirma que tu negocio es permitido en la zona
2. **Obtener planos** - Planos arquitectónicos del espacio
3. **Solicitar inspecciones** - Bomberos, salud (si aplica)
4. **Presentar solicitud** - Con todos los documentos
5. **Pagar tarifas** - $100-$300 según municipio
6. **Recibir aprobación** - 15-30 días hábiles

## Inspecciones Requeridas:
- **Bomberos**: Verificar salidas de emergencia y extintores
- **Salud**: Para restaurantes, salones, centros de cuidado
- **Municipal**: Cumplimiento de códigos de construcción

## Costos por Municipio:
- San Juan: $150-$300
- Bayamón: $100-$250
- Carolina: $125-$275
- Toa Baja: $100-$200

## Renovación:
Cada 3 años o al cambiar de actividad comercial.`,
          tags: ['permiso', 'uso', 'municipal', 'zonificación'],
          lastUpdated: new Date('2024-01-20'),
          featured: true,
          estimatedReadTime: 5
        }
      ]
    },
    {
      id: 'municipalities',
      name: 'Por Municipio',
      description: 'Información específica de cada municipio',
      icon: 'MapPin',
      articles: [
        {
          id: 'toa-baja-guide',
          title: 'Guía Completa: Permisos en Toa Baja',
          category: 'Por Municipio',
          content: `# Permisos en Toa Baja

## Oficina de Permisos
**Dirección**: Calle Betances #75, Toa Baja, PR 00949
**Teléfono**: (787) 780-2020 ext. 245
**Horario**: Lunes a Viernes, 7:30 AM - 4:00 PM

## Permisos Principales:

### 1. Registro de Comerciante
- **Costo**: $25 (individual), $50 (corporación)
- **Tiempo**: 5-7 días
- **Renovación**: Cada 5 años

### 2. Permiso de Uso
- **Costo**: $100-$200 según actividad
- **Tiempo**: 15-20 días (más rápido que otros municipios)
- **Renovación**: Cada 3 años

### 3. Permiso de Construcción
- **Costo**: 2% del valor de construcción (mínimo $200)
- **Tiempo**: 30-45 días
- **Inspecciones**: Pre-construcción, durante obra, final

## Servicios Especiales en Toa Baja:
- **Ventanilla Única**: Todos los permisos en una oficina
- **Seguimiento en línea**: Sistema digital para rastrear solicitudes
- **Citas programadas**: Evita esperas largas

## Zonificación:
- **Residencial**: R-1, R-2, R-3
- **Comercial**: C-1 (local), C-2 (general)
- **Industrial**: I-1 (liviana), I-2 (pesada)

## Contactos Importantes:
- **Director de Permisos**: Ing. María Torres
- **Asistente**: Sr. Carlos Vega
- **Email**: permisos@toabaja.pr.gov`,
          tags: ['toa baja', 'municipio', 'contactos', 'zonificación'],
          lastUpdated: new Date('2024-01-25'),
          featured: false,
          estimatedReadTime: 4
        }
      ]
    },
    {
      id: 'business-types',
      name: 'Tipos de Negocio',
      description: 'Requisitos específicos por tipo de negocio',
      icon: 'Building',
      articles: [
        {
          id: 'restaurant-permits',
          title: 'Permisos para Restaurantes y Cafeterías',
          category: 'Tipos de Negocio',
          content: `# Permisos para Restaurantes

## Permisos Obligatorios:

### 1. Registro de Comerciante
- **Costo**: $50 (corporación)
- **Tiempo**: 5-7 días

### 2. Permiso de Uso
- **Costo**: $150-$300
- **Tiempo**: 20-30 días
- **Nota**: Zonificación comercial requerida

### 3. Permiso de Salud
- **Costo**: $75-$150
- **Tiempo**: 10-15 días
- **Inspección**: Obligatoria antes de apertura

### 4. Permiso de Alcohol (si aplica)
- **Costo**: $500-$2,000 según tipo
- **Tiempo**: 60-90 días
- **Tipos**: Beer & Wine, Licor completo

## Inspecciones Requeridas:

### Inspección de Salud:
- ✅ Área de preparación limpia
- ✅ Refrigeración adecuada
- ✅ Lavamanos para empleados
- ✅ Sistema de ventilación
- ✅ Control de plagas

### Inspección de Bomberos:
- ✅ Salidas de emergencia
- ✅ Extintores apropiados
- ✅ Señalización de seguridad
- ✅ Capacidad máxima definida

## Documentos Especiales:
- Certificado de manipulador de alimentos (empleados)
- Plan de emergencia
- Certificado de agua potable
- Póliza de responsabilidad pública

## Costos Totales Estimados:
- **Restaurante pequeño**: $800-$1,500
- **Restaurante mediano**: $1,500-$3,000
- **Con licor**: +$500-$2,000

## Renovaciones:
- Salud: Anual
- Uso: Cada 3 años
- Alcohol: Anual
- Comerciante: Cada 5 años`,
          tags: ['restaurante', 'comida', 'salud', 'alcohol'],
          lastUpdated: new Date('2024-01-18'),
          featured: true,
          estimatedReadTime: 6
        }
      ]
    }
  ],
  en: [
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
  ]
};

export const searchKnowledgeBase = (query: string, language: 'es' | 'en'): KnowledgeArticle[] => {
  const categories = knowledgeBaseData[language];
  const allArticles = categories.flatMap(category => category.articles);
  
  if (!query.trim()) return allArticles;
  
  const searchTerms = query.toLowerCase().split(' ');
  
  return allArticles.filter(article => {
    const searchableText = `${article.title} ${article.content} ${article.tags.join(' ')}`.toLowerCase();
    return searchTerms.some(term => searchableText.includes(term));
  }).sort((a, b) => {
    // Prioritize featured articles and recent updates
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.lastUpdated.getTime() - a.lastUpdated.getTime();
  });
};

export const getArticleById = (id: string, language: 'es' | 'en'): KnowledgeArticle | null => {
  const categories = knowledgeBaseData[language];
  const allArticles = categories.flatMap(category => category.articles);
  return allArticles.find(article => article.id === id) || null;
};

export const getFeaturedArticles = (language: 'es' | 'en'): KnowledgeArticle[] => {
  const categories = knowledgeBaseData[language];
  const allArticles = categories.flatMap(category => category.articles);
  return allArticles.filter(article => article.featured);
};
