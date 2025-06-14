
import { useState, useRef, useEffect } from 'react';
import { generateSecureGerryResponse } from '@/components/ai/secureResponseGenerator';
import { getInitialMessages } from '@/components/ai/initialMessages';
import { useUserContext } from '@/contexts/UserContextProvider';
import { Message, GerryAIAssistantProps } from '@/components/ai/types';
import { AuditLogger } from '@/lib/security';

export const useSecureGerryAI = ({ 
  language, 
  businessContext 
}: Pick<GerryAIAssistantProps, 'language' | 'businessContext'>) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get user context with strict isolation
  const { userProfile, businesses, isLoading, error } = useUserContext();

  useEffect(() => {
    // Only initialize if user context is loaded and valid
    if (!isLoading && userProfile && !error) {
      const initializeSecureGerry = async () => {
        // Log AI assistant initialization
        AuditLogger.log({
          action: 'ai_assistant_initialized',
          userId: userProfile.id,
          details: {
            language,
            businessCount: businesses.length,
            timestamp: new Date().toISOString()
          }
        });

        const initialMessages = getInitialMessages(language);
        if (businesses.length > 0) {
          const welcomeMessage: Message = {
            id: 'welcome-secure',
            text: language === 'es' 
              ? `🔒 Hola ${userProfile.metadata?.firstName || userProfile.name}! Soy Gerry, tu asistente AI seguro. Tengo acceso únicamente a tus datos: ${businesses.length} negocio(s) registrado(s). Toda la información está protegida y es privada. ¿En qué puedo ayudarte hoy?`
              : `🔒 Hello ${userProfile.metadata?.firstName || userProfile.name}! I'm Gerry, your secure AI assistant. I only have access to your data: ${businesses.length} registered business(es). All information is protected and private. How can I help you today?`,
            sender: 'gerry',
            timestamp: new Date(),
            type: 'text',
            suggestions: language === 'es' 
              ? ['Ver mis negocios', 'Estado de permisos', 'Información de seguridad', 'Base de conocimientos']
              : ['View my businesses', 'Permit status', 'Security information', 'Knowledge base']
          };
          setMessages([welcomeMessage, ...initialMessages.slice(1)]);
        } else {
          setMessages(initialMessages);
        }
      };

      initializeSecureGerry();
    }
  }, [language, userProfile, businesses, isLoading, error]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !userProfile) return;

    // Log user interaction
    AuditLogger.log({
      action: 'ai_query_submitted',
      userId: userProfile.id,
      details: {
        queryLength: inputText.length,
        timestamp: new Date().toISOString()
      }
    });

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Generate response with strict user context
      const gerryResponse = await generateSecureGerryResponse(
        inputText, 
        language, 
        {
          userId: userProfile.id,
          userProfile,
          businesses,
          businessContext
        }
      );
      
      setMessages(prev => [...prev, gerryResponse]);
    } catch (error) {
      console.error('Error generating secure Gerry response:', error);
      
      // Log security error
      AuditLogger.log({
        action: 'ai_security_error',
        userId: userProfile.id,
        details: {
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        }
      });

      const fallbackResponse: Message = {
        id: Date.now().toString(),
        text: language === 'es' 
          ? '🔒 Por razones de seguridad, no pude procesar esa consulta. Asegúrate de que estés preguntando sobre tu información personal únicamente.'
          : '🔒 For security reasons, I could not process that query. Please ensure you are asking about your personal information only.',
        sender: 'gerry',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  return {
    messages,
    inputText,
    setInputText,
    isTyping,
    isExpanded,
    setIsExpanded,
    messagesEndRef,
    userProfile,
    businesses,
    isLoading,
    error,
    handleSendMessage,
    handleSuggestionClick
  };
};
