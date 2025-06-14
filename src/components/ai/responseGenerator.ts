
import { searchKnowledgeBase, type KnowledgeArticle } from '@/data/knowledgeBase';
import { Message } from './types';

interface BusinessContext {
  name: string;
  type: string;
  municipality: string;
  status: string;
}

export const generateGerryResponse = async (
  userMessage: string, 
  language: 'es' | 'en', 
  businessContext?: BusinessContext
): Promise<Message> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  // Search knowledge base for relevant articles
  const knowledgeResults = searchKnowledgeBase(userMessage, language);
  const relevantArticles = knowledgeResults.slice(0, 3); // Top 3 most relevant

  const responses = {
    es: {
      permits: `Para ${businessContext?.type || 'tu tipo de negocio'} en ${businessContext?.municipality || 'tu municipio'}, según nuestra base de conocimientos:\n\n✅ **Permiso Único de Negocio**\n- Formulario SC-2901\n- Tiempo: 15-30 días\n- Costo: $25-75\n\n✅ **Certificado de Uso**\n- Depende de zonificación\n- Inspección requerida\n\n✅ **Permiso de Salud** (si aplica)\n- Para restaurantes/salones\n- Inspección sanitaria\n\nHe encontrado artículos relevantes en nuestra base de conocimientos que te pueden ayudar con información detallada.`,
      documents: `Según nuestra base de conocimientos, los documentos más importantes son:\n\n📄 **Documentos Básicos:**\n• Certificado de incorporación\n• Número CRIM\n• Identificación con foto\n• Prueba de dirección comercial\n\n📄 **Documentos Específicos:**\n• Planos del local (si aplica)\n• Certificado de deuda municipal\n• Póliza de seguro comercial\n\nTengo artículos detallados que explican cómo obtener cada documento.`,
      time: `Basándome en nuestra base de conocimientos, los tiempos típicos son:\n\n⏱️ **Permiso Único:** 15-30 días\n⏱️ **Certificado de Uso:** 30-60 días\n⏱️ **Permiso de Salud:** 10-20 días\n⏱️ **Permiso de Construcción:** 60-90 días\n\n*Los tiempos pueden variar según el municipio.*\n\nHe encontrado guías específicas por municipio que pueden ayudarte.`,
      help: `¡Perfecto! Usando nuestra base de conocimientos, te ayudo paso a paso:\n\n1️⃣ **Identifica tu negocio** - ¿Qué tipo y dónde?\n2️⃣ **Revisa requisitos** - Cada municipio es diferente\n3️⃣ **Reúne documentos** - Te doy la lista completa\n4️⃣ **Completa formularios** - Puedo autocompletar algunos\n5️⃣ **Programa inspecciones** - Te ayudo a coordinar\n\nTengo artículos específicos para cada paso del proceso.`,
      restaurant: `Para restaurantes, según nuestra base de conocimientos completa:\n\n**Permisos Obligatorios:**\n• Registro de Comerciante ($50)\n• Permiso de Uso ($150-$300)\n• Permiso de Salud ($75-$150)\n• Permiso de Alcohol ($500-$2,000 si aplica)\n\n**Inspecciones Requeridas:**\n• Salud: área limpia, refrigeración, ventilación\n• Bomberos: salidas, extintores, capacidad\n\n**Costos Totales:** $800-$3,000+\n\nTengo una guía completa específica para restaurantes.`,
      default: `He buscado en nuestra base de conocimientos sobre "${userMessage}" y encontré información relevante.\n\nComo experto en permisos de Puerto Rico con acceso a nuestra base de conocimientos actualizada, te recomiendo:\n\n💡 Verificar los requisitos específicos de tu municipio\n💡 Revisar los artículos relacionados que encontré\n💡 Contactar la oficina de permisos local si necesitas aclaración\n\n¿Te gustaría que revise algún artículo específico contigo?`
    },
    en: {
      permits: `For ${businessContext?.type || 'your business type'} in ${businessContext?.municipality || 'your municipality'}, according to our knowledge base:\n\n✅ **Unique Business Permit**\n- Form SC-2901\n- Time: 15-30 days\n- Cost: $25-75\n\n✅ **Use Certificate**\n- Depends on zoning\n- Inspection required\n\n✅ **Health Permit** (if applicable)\n- For restaurants/salons\n- Sanitary inspection\n\nI found relevant articles in our knowledge base that can help you with detailed information.`,
      documents: `According to our knowledge base, the most important documents are:\n\n📄 **Basic Documents:**\n• Certificate of incorporation\n• CRIM number\n• Photo ID\n• Proof of business address\n\n📄 **Specific Documents:**\n• Property blueprints (if applicable)\n• Municipal debt certificate\n• Commercial insurance policy\n\nI have detailed articles explaining how to obtain each document.`,
      time: `Based on our knowledge base, typical timeframes are:\n\n⏱️ **Unique Permit:** 15-30 days\n⏱️ **Use Certificate:** 30-60 days\n⏱️ **Health Permit:** 10-20 days\n⏱️ **Construction Permit:** 60-90 days\n\n*Times may vary by municipality.*\n\nI found specific guides by municipality that can help you.`,
      help: `Perfect! Using our knowledge base, I'll help you step by step:\n\n1️⃣ **Identify your business** - What type and where?\n2️⃣ **Review requirements** - Each municipality is different\n3️⃣ **Gather documents** - I'll give you the complete list\n4️⃣ **Complete forms** - I can auto-fill some\n5️⃣ **Schedule inspections** - I'll help you coordinate\n\nI have specific articles for each step of the process.`,
      restaurant: `For restaurants, according to our complete knowledge base:\n\n**Mandatory Permits:**\n• Merchant Registration ($50)\n• Use Permit ($150-$300)\n• Health Permit ($75-$150)\n• Alcohol Permit ($500-$2,000 if applicable)\n\n**Required Inspections:**\n• Health: clean area, refrigeration, ventilation\n• Fire: exits, extinguishers, capacity\n\n**Total Costs:** $800-$3,000+\n\nI have a complete guide specific to restaurants.`,
      default: `I searched our knowledge base about "${userMessage}" and found relevant information.\n\nAs a Puerto Rico permits expert with access to our updated knowledge base, I recommend:\n\n💡 Verify your municipality's specific requirements\n💡 Review the related articles I found\n💡 Contact the local permits office if you need clarification\n\nWould you like me to review any specific article with you?`
    }
  };

  const messageContent = userMessage.toLowerCase();
  let responseText: string;
  let suggestions: string[] = [];

  if (messageContent.includes('restaurante') || messageContent.includes('restaurant') || messageContent.includes('comida') || messageContent.includes('food')) {
    responseText = responses[language].restaurant;
    suggestions = language === 'es' 
      ? ['Inspección de salud', 'Permiso de alcohol', 'Costos totales', 'Guía completa restaurantes']
      : ['Health inspection', 'Alcohol permit', 'Total costs', 'Complete restaurant guide'];
  } else if (messageContent.includes('permiso') || messageContent.includes('permit')) {
    responseText = responses[language].permits;
    suggestions = language === 'es' 
      ? ['¿Cuánto cuesta cada permiso?', 'Ayuda con formularios', '¿Qué hacer si me niegan?', 'Ver artículos relacionados']
      : ['How much does each permit cost?', 'Help with forms', 'What if I get denied?', 'View related articles'];
  } else if (messageContent.includes('documento') || messageContent.includes('document')) {
    responseText = responses[language].documents;
    suggestions = language === 'es'
      ? ['¿Dónde obtengo el CRIM?', 'Certificado de incorporación', 'Prueba de dirección', 'Ver guías detalladas']
      : ['Where do I get CRIM?', 'Certificate of incorporation', 'Proof of address', 'View detailed guides'];
  } else if (messageContent.includes('tiempo') || messageContent.includes('time') || messageContent.includes('demora')) {
    responseText = responses[language].time;
    suggestions = language === 'es'
      ? ['¿Cómo acelerar el proceso?', 'Fechas importantes', 'Seguimiento de solicitud', 'Guías por municipio']
      : ['How to speed up the process?', 'Important dates', 'Application tracking', 'Municipality guides'];
  } else if (messageContent.includes('ayuda') || messageContent.includes('help') || messageContent.includes('empez')) {
    responseText = responses[language].help;
    suggestions = language === 'es'
      ? ['Tipo de negocio', 'Mi municipio', 'Lista de documentos', 'Ver base de conocimientos']
      : ['Business type', 'My municipality', 'Document list', 'View knowledge base'];
  } else {
    responseText = responses[language].default;
    suggestions = language === 'es'
      ? ['Permisos necesarios', 'Documentos requeridos', 'Tiempos de proceso', 'Ver artículos encontrados']
      : ['Required permits', 'Required documents', 'Processing times', 'View found articles'];
  }

  return {
    id: Date.now().toString(),
    text: responseText,
    sender: 'gerry',
    timestamp: new Date(),
    type: relevantArticles.length > 0 ? 'knowledge_article' : 'text',
    suggestions,
    knowledgeArticles: relevantArticles.length > 0 ? relevantArticles : undefined
  };
};
