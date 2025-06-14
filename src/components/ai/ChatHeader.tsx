
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

interface ChatHeaderProps {
  language: 'es' | 'en';
  onClose: () => void;
}

export const ChatHeader = ({ language, onClose }: ChatHeaderProps) => {
  return (
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
        <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
          {language === 'es' ? 'En línea' : 'Online'}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-slate-400 hover:text-white"
        >
          ×
        </Button>
      </div>
    </div>
  );
};
