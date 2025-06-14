
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from 'lucide-react';
import { DocumentTranslations } from "@/types/document";

interface DocumentHeaderProps {
  onBack: () => void;
  completedDocs: number;
  totalDocs: number;
  translations: DocumentTranslations;
}

export const DocumentHeader = ({ onBack, completedDocs, totalDocs, translations }: DocumentHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-slate-300 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al Inicio
      </Button>
      <Badge variant="secondary" className="bg-teal-500/20 text-teal-300">
        {completedDocs}/{totalDocs} {translations.complete}
      </Badge>
    </div>
  );
};
