
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Shield } from 'lucide-react';
import { getTranslation } from '@/utils/translations';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { generateSecureGerryResponse } from './secureResponseGenerator';
import { getInitialMessages } from './initialMessages';
import { useUserContext } from '@/contexts/UserContextProvider';
import { Message, GerryAIAssistantProps } from './types';
import { AuditLogger } from '@/lib/security';

export const SecureGerryAIAssistant = ({ 
  language, 
  businessContext, 
  onFormAutofill, 
  onDocumentRequest 
}: GerryAIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get user context with strict isolation
  const { userProfile, businesses, isLoading, error } = useUserContext();

  const t = (key: string) => getTranslation(key, language);

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
              ? `🔒 Hola ${userProfile.firstName}! Soy Gerry, tu asistente AI seguro. Tengo acceso únicamente a tus datos: ${businesses.length} negocio(s) registrado(s). Toda la información está protegida y es privada. ¿En qué puedo ayudarte hoy?`
              : `🔒 Hello ${userProfile.firstName}! I'm Gerry, your secure AI assistant. I only have access to your data: ${businesses.length} registered business(es). All information is protected and private. How can I help you today?`,
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

  // Don't render if no valid user context
  if (isLoading || error || !userProfile) {
    return null;
  }

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-lg"
        >
          <Bot className="w-8 h-8" />
        </Button>
        <Badge className="absolute -top-2 -left-2 bg-green-500 text-white flex items-center gap-1">
          <Shield className="w-3 h-3" />
          Gerry
        </Badge>
        {businesses.length > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white">
            {businesses.length}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-h-[80vh]">
      <Card className="h-full bg-slate-800/95 border-slate-700 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <ChatHeader language={language} onClose={() => setIsExpanded(false)} />
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Shield className="w-3 h-3 text-green-400" />
            Sesión segura: {userProfile.firstName} • {businesses.length} negocio(s)
          </div>
        </CardHeader>

        <CardContent className="flex flex-col h-[calc(100%-80px)] p-0">
          <ChatMessages 
            messages={messages}
            isTyping={isTyping}
            onSuggestionClick={handleSuggestionClick}
            language={language}
          />
          <div ref={messagesEndRef} />
          <ChatInput
            inputText={inputText}
            setInputText={setInputText}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            language={language}
          />
        </CardContent>
      </Card>
    </div>
  );
};
