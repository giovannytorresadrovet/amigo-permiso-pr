
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Shield } from 'lucide-react';

interface SecureGerryFloatingButtonProps {
  businessCount: number;
  onExpand: () => void;
}

export const SecureGerryFloatingButton = ({ 
  businessCount, 
  onExpand 
}: SecureGerryFloatingButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onExpand}
        className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-lg"
      >
        <Bot className="w-8 h-8" />
      </Button>
      <Badge className="absolute -top-2 -left-2 bg-green-500 text-white flex items-center gap-1">
        <Shield className="w-3 h-3" />
        Gerry
      </Badge>
      {businessCount > 0 && (
        <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white">
          {businessCount}
        </Badge>
      )}
    </div>
  );
};
