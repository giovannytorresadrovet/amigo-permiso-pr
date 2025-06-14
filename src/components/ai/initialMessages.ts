
import { Message } from './types';

export const getInitialMessages = (language: 'es' | 'en'): Message[] => {
  const initialMessages = {
    es: [
      {
        id: '1',
        text: `¡Hola! Soy Gerry, tu asistente especializado en permisos de Puerto Rico. 🇵🇷\n\nTengo acceso a nuestra base de conocimientos completa y estoy aquí para ayudarte con:\n• Preguntas sobre regulaciones\n• Completar formularios\n• Identificar documentos necesarios\n• Guía paso a paso\n• Artículos de nuestra base de conocimientos\n\n¿En qué puedo ayudarte hoy?`,
        sender: 'gerry' as const,
        timestamp: new Date(),
        type: 'text' as const,
        suggestions: [
          '¿Qué permisos necesito para mi negocio?',
          'Ayúdame a completar mi solicitud',
          '¿Cuánto tiempo toma el proceso?',
          'Documentos requeridos'
        ]
      }
    ],
    en: [
      {
        id: '1',
        text: `Hello! I'm Gerry, your specialized Puerto Rico permits assistant. 🇵🇷\n\nI have access to our complete knowledge base and I'm here to help you with:\n• Questions about regulations\n• Completing forms\n• Identifying required documents\n• Step-by-step guidance\n• Articles from our knowledge base\n\nWhat can I help you with today?`,
        sender: 'gerry' as const,
        timestamp: new Date(),
        type: 'text' as const,
        suggestions: [
          'What permits do I need for my business?',
          'Help me complete my application',
          'How long does the process take?',
          'Required documents'
        ]
      }
    ]
  };

  return initialMessages[language];
};
