
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap } from 'lucide-react';

interface HeroSectionProps {
  translations: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
  };
  onStartAnalysis: () => void;
}

export const HeroSection = ({ translations, onStartAnalysis }: HeroSectionProps) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
        🚀 Fase 1: Completamente Gratis para Construir Confianza
      </Badge>
      
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
        {translations.title}
      </h1>
      
      <p className="text-xl md:text-2xl text-slate-300 mb-4 font-light">
        {translations.subtitle}
      </p>
      
      <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
        {translations.description}
      </p>

      <Button 
        size="lg" 
        className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
        onClick={onStartAnalysis}
      >
        {translations.cta}
        <Zap className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
};
