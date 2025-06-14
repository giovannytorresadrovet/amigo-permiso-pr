
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, FileText, Clock } from 'lucide-react';
import { Message } from './types';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  onSuggestionClick: (suggestion: string) => void;
  language: 'es' | 'en';
}

export const ChatMessages = ({ messages, isTyping, onSuggestionClick, language }: ChatMessagesProps) => {
  return (
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
                      onClick={() => onSuggestionClick(suggestion)}
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
      </div>
    </ScrollArea>
  );
};
