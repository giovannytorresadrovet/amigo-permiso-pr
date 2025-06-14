
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Upload, Zap } from 'lucide-react';

interface FeatureCardsProps {
  translations: {
    wizard: string;
    wizardDesc: string;
    documents: string;
    documentsDesc: string;
    ai: string;
    aiDesc: string;
  };
  onSectionChange: (section: 'wizard' | 'documents' | 'ai') => void;
}

export const FeatureCards = ({ translations, onSectionChange }: FeatureCardsProps) => {
  return (
    <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => onSectionChange('wizard')}>
        <CardHeader>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-white">{translations.wizard}</CardTitle>
          <CardDescription className="text-slate-400">{translations.wizardDesc}</CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => onSectionChange('documents')}>
        <CardHeader>
          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-white">{translations.documents}</CardTitle>
          <CardDescription className="text-slate-400">{translations.documentsDesc}</CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => onSectionChange('ai')}>
        <CardHeader>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-white">{translations.ai}</CardTitle>
          <CardDescription className="text-slate-400">{translations.aiDesc}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
