
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';
import { getTranslation } from '@/utils/translations';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { generateEnhancedGerryResponse } from './enhancedResponseGenerator';
import { UserDataService } from '@/services/userDataService';
import { getInitialMessages } from './initialMessages';
import { Message, GerryAIAssistantProps } from './types';

export const GerryAIAssistant = ({ 
  language, 
  businessContext, 
  onFormAutofill, 
  onDocumentRequest 
}: GerryAIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [userContext, setUserContext] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => getTranslation(key, language);

  useEffect(() => {
    const initializeGerry = async () => {
      // Load user context for personalized responses
      const [userProfile, businesses, urgentActions] = await Promise.all([
        UserDataService.getUserProfile(),
        UserDataService.getUserBusinesses(),
        UserDataService.getUrgentActions()
      ]);

      setUserContext({
        userProfile,
        businesses,
        urgentActions
      });

      // Set personalized initial messages
      const initialMessages = getInitialMessages(language);
      if (userProfile && businesses.length > 0) {
        const welcomeMessage: Message = {
          id: 'welcome-personalized',
          text: language === 'es' 
            ? `¡Hola ${userProfile.firstName}! 👋 He revisado tus negocios y veo que tienes ${businesses.length} negocio(s) registrado(s). ${urgentActions.length > 0 ? `⚠️ Tienes ${urgentActions.length} acción(es) urgente(s) pendiente(s).` : '✅ Todo parece estar al día.'} ¿En qué puedo ayudarte hoy?`
            : `Hello ${userProfile.firstName}! 👋 I've reviewed your businesses and see you have ${businesses.length} registered business(es). ${urgentActions.length > 0 ? `⚠️ You have ${urgentActions.length} urgent action(s) pending.` : '✅ Everything seems up to date.'} How can I help you today?`,
          sender: 'gerry',
          timestamp: new Date(),
          type: 'text',
          suggestions: language === 'es' 
            ? ['Ver mis negocios', 'Acciones urgentes', 'Estado de permisos', 'Documentos pendientes']
            : ['View my businesses', 'Urgent actions', 'Permit status', 'Pending documents']
        };
        setMessages([welcomeMessage, ...initialMessages.slice(1)]);
      } else {
        setMessages(initialMessages);
      }
    };

    initializeGerry();
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

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
      // Get current business context if available
      const currentBusinessContext = businessContext || (
        userContext?.businesses?.[0] ? {
          name: userContext.businesses[0].name,
          type: userContext.businesses[0].type,
          municipality: userContext.businesses[0].municipality,
          status: userContext.businesses[0].status
        } : undefined
      );

      const gerryResponse = await generateEnhancedGerryResponse(
        inputText, 
        language, 
        currentBusinessContext
      );
      setMessages(prev => [...prev, gerryResponse]);
    } catch (error) {
      console.error('Error generating enhanced Gerry response:', error);
      // Fallback to basic response
      const fallbackResponse: Message = {
        id: Date.now().toString(),
        text: language === 'es' 
          ? 'Lo siento, tuve un problema procesando tu consulta. ¿Podrías intentar de nuevo?'
          : 'Sorry, I had trouble processing your query. Could you try again?',
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

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-lg"
        >
          <Bot className="w-8 h-8" />
        </Button>
        <Badge className="absolute -top-2 -left-2 bg-green-500 text-white">
          Gerry
        </Badge>
        {userContext?.urgentActions?.length > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
            {userContext.urgentActions.length}
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
          {userContext?.userProfile && (
            <div className="text-xs text-slate-400">
              Conectado como {userContext.userProfile.firstName} • {userContext.businesses?.length || 0} negocio(s)
            </div>
          )}
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
