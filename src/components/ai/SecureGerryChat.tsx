
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { Message } from './types';
import type { UserProfile, BusinessSummary } from '@/services/userDataService';

interface SecureGerryChatProps {
  language: 'es' | 'en';
  messages: Message[];
  inputText: string;
  isTyping: boolean;
  userProfile: UserProfile;
  businesses: BusinessSummary[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  onSendMessage: () => void;
  onInputChange: (text: string) => void;
  onSuggestionClick: (suggestion: string) => void;
}

export const SecureGerryChat = ({
  language,
  messages,
  inputText,
  isTyping,
  userProfile,
  businesses,
  messagesEndRef,
  onClose,
  onSendMessage,
  onInputChange,
  onSuggestionClick
}: SecureGerryChatProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] max-h-[80vh]">
      <Card className="h-full bg-slate-800/95 border-slate-700 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <ChatHeader language={language} onClose={onClose} />
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Shield className="w-3 h-3 text-green-400" />
            Sesión segura: {userProfile.metadata?.firstName || userProfile.name} • {businesses.length} negocio(s)
          </div>
        </CardHeader>

        <CardContent className="flex flex-col h-[calc(100%-80px)] p-0">
          <ChatMessages 
            messages={messages}
            isTyping={isTyping}
            onSuggestionClick={onSuggestionClick}
            language={language}
          />
          <div ref={messagesEndRef} />
          <ChatInput
            inputText={inputText}
            setInputText={onInputChange}
            onSendMessage={onSendMessage}
            isTyping={isTyping}
            language={language}
          />
        </CardContent>
      </Card>
    </div>
  );
};
