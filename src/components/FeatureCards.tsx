
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  FileCheck, 
  Brain, 
  Wifi, 
  Globe, 
  Shield,
  BookOpen
} from 'lucide-react';

interface FeatureCardsProps {
  translations: {
    wizard: string;
    wizardDesc: string;
    documents: string;
    documentsDesc: string;
    ai: string;
    aiDesc: string;
    offline: string;
    offlineDesc: string;
    bilingual: string;
    bilingualDesc: string;
    secure: string;
    secureDesc: string;
  };
  onSectionChange: (section: 'home' | 'wizard' | 'documents' | 'ai' | 'knowledge') => void;
}

export const FeatureCards = ({ translations, onSectionChange }: FeatureCardsProps) => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      title: translations.wizard,
      description: translations.wizardDesc,
      badge: "Instant",
      action: () => onSectionChange('wizard'),
      actionText: "Comenzar"
    },
    {
      icon: <FileCheck className="w-8 h-8 text-green-400" />,
      title: translations.documents,
      description: translations.documentsDesc,
      badge: "Smart",
      action: () => onSectionChange('documents'),
      actionText: "Validar"
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-400" />,
      title: translations.ai,
      description: translations.aiDesc,
      badge: "AI",
      action: () => onSectionChange('ai'),
      actionText: "Preguntar"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-yellow-400" />,
      title: "Base de Conocimientos",
      description: "Accede a artículos y guías completas",
      badge: "Nuevo",
      action: () => onSectionChange('knowledge'),
      actionText: "Explorar"
    },
    {
      icon: <Wifi className="w-8 h-8 text-orange-400" />,
      title: translations.offline,
      description: translations.offlineDesc,
      badge: "Always",
      action: () => {},
      actionText: "Soon"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-400" />,
      title: translations.secure,
      description: translations.secureDesc,
      badge: "256-bit",
      action: () => {},
      actionText: "Secure"
    }
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Características Principales
        </h2>
        <p className="text-xl text-slate-400">
          Todo lo que necesitas para navegar el sistema de permisos
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl group"
          >
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-slate-700/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <Badge 
                  variant="secondary" 
                  className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                >
                  {feature.badge}
                </Badge>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <Button 
                onClick={feature.action}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                disabled={feature.actionText === "Soon"}
              >
                {feature.actionText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
