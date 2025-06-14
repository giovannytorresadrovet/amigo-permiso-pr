
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';
import { getTranslation } from '@/utils/translations';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { generateGerryResponse } from './responseGenerator';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => getTranslation(key, language);

  useEffect(() => {
    setMessages(getInitialMessages(language));
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
      const gerryResponse = await generateGerryResponse(inputText, language, businessContext);
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
          <ChatHeader language={language} onClose={() => setIsExpanded(false)} />
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
