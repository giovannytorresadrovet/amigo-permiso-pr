
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, Mic, PaperclipIcon, Star, Lightbulb, FileText } from 'lucide-react';
import { getTranslation } from '@/utils/translations';
import { searchKnowledgeBase, type KnowledgeArticle } from '@/data/knowledgeBase';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'gerry';
  timestamp: Date;
  type?: 'text' | 'form_suggestion' | 'document_request' | 'regulation_info' | 'knowledge_article';
  suggestions?: string[];
  knowledgeArticles?: KnowledgeArticle[];
}

interface GerryAIAssistantProps {
  language: 'es' | 'en';
  businessContext?: {
    name: string;
    type: string;
    municipality: string;
    status: string;
  };
  onFormAutofill?: (field: string, value: string) => void;
  onDocumentRequest?: (documentType: string) => void;
}

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => getTranslation(key, language);

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

  useEffect(() => {
    setMessages(initialMessages[language]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateGerryResponse = async (userMessage: string): Promise<Message> => {
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
      const gerryResponse = await generateGerryResponse(inputText);
      setMessages(prev => [...prev, gerryResponse]);
    } catch (error) {
      console.error('Error generating Gerry response:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-h-[80vh]">
      <Card className="h-full bg-slate-800/95 border-slate-700 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-white text-lg">Gerry</CardTitle>
                <p className="text-xs text-slate-400">
                  {language === 'es' ? 'Asistente con Base de Conocimientos' : 'Assistant with Knowledge Base'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                {language === 'es' ? 'En línea' : 'Online'}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-white"
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col h-[calc(100%-80px)] p-0">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-100'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-line">{message.text}</div>
                    
                    {/* Knowledge Articles */}
                    {message.knowledgeArticles && message.knowledgeArticles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs text-slate-300 flex items-center">
                          <FileText className="w-3 h-3 mr-1" />
                          {language === 'es' ? 'Artículos relacionados:' : 'Related articles:'}
                        </div>
                        {message.knowledgeArticles.map((article) => (
                          <div key={article.id} className="bg-slate-600 rounded p-2 text-xs">
                            <div className="font-semibold text-white">{article.title}</div>
                            <div className="text-slate-300">{article.category}</div>
                            <div className="flex items-center mt-1 text-slate-400">
                              <Clock className="w-3 h-3 mr-1" />
                              {article.estimatedReadTime} {language === 'es' ? 'min' : 'min'}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left justify-start text-xs h-auto p-2 hover:bg-slate-600"
                          >
                            <Lightbulb className="w-3 h-3 mr-1 flex-shrink-0" />
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="border-t border-slate-700 p-4">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'es' ? 'Pregúntale a Gerry...' : 'Ask Gerry...'}
                className="bg-slate-700 border-slate-600 text-white flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
