
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onSendMessage: () => void;
  isTyping: boolean;
  language: 'es' | 'en';
}

export const ChatInput = ({ inputText, setInputText, onSendMessage, isTyping, language }: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
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
          onClick={onSendMessage}
          disabled={!inputText.trim() || isTyping}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
