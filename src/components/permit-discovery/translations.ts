
import { PermitDiscoveryTranslations } from './types';

export const getPermitDiscoveryTranslations = (language: 'es' | 'en'): PermitDiscoveryTranslations => {
  const translations = {
    es: {
      title: "Guía con IA para Permisos",
      subtitle: "Tu amigo conocedor que entiende el sistema de permisos de Puerto Rico",
      askQuestion: "Hazme cualquier pregunta sobre permisos...",
      placeholder: "Ej. ¿Qué permisos necesito para un restaurante en Santurce?",
      send: "Enviar",
      analyzing: "Analizando tu situación...",
      recommendations: "Recomendaciones Personalizadas",
      priority: {
        high: "Alta Prioridad",
        medium: "Prioridad Media",
        low: "Prioridad Baja"
      },
      timeframe: "Tiempo Estimado",
      cost: "Costo Estimado",
      requirements: "Requisitos",
      risks: "Riesgos de No Cumplir",
      aiTips: "Consejos de IA",
      sampleQuestions: "Preguntas Frecuentes",
      questions: [
        "¿Cuáles son los permisos básicos para iniciar un negocio?",
        "¿Cómo afecta la zonificación a mi tipo de negocio?",
        "¿Qué documentos necesito para el permiso de construcción?",
        "¿Cuánto tiempo toma obtener todos los permisos?"
      ]
    },
    en: {
      title: "AI-Powered Permit Guidance",
      subtitle: "Your knowledgeable friend who understands Puerto Rico's permit system",
      askQuestion: "Ask me anything about permits...",
      placeholder: "Ex. What permits do I need for a restaurant in Santurce?",
      send: "Send",
      analyzing: "Analyzing your situation...",
      recommendations: "Personalized Recommendations",
      priority: {
        high: "High Priority",
        medium: "Medium Priority",
        low: "Low Priority"
      },
      timeframe: "Estimated Time",
      cost: "Estimated Cost",
      requirements: "Requirements",
      risks: "Risks of Non-Compliance",
      aiTips: "AI Tips",
      sampleQuestions: "Frequent Questions",
      questions: [
        "What are the basic permits needed to start a business?",
        "How does zoning affect my business type?",
        "What documents do I need for a construction permit?",
        "How long does it take to get all permits?"
      ]
    }
  };

  return translations[language];
};
