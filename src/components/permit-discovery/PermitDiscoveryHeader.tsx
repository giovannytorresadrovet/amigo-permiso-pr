
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain } from 'lucide-react';

interface PermitDiscoveryHeaderProps {
  onBack: () => void;
  title: string;
  subtitle: string;
}

export const PermitDiscoveryHeader = ({ onBack, title, subtitle }: PermitDiscoveryHeaderProps) => {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Inicio
        </Button>
        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
          <Brain className="w-4 h-4 mr-2" />
          Alimentado por IA
        </Badge>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    </>
  );
};
