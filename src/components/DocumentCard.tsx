
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { DocumentItem, DocumentTranslations } from "@/types/document";

interface DocumentCardProps {
  document: DocumentItem;
  translations: DocumentTranslations;
}

export const DocumentCard = ({ document, translations }: DocumentCardProps) => {
  const getCategoryName = (type: string): string => {
    const validTypes = ['legal', 'business', 'zoning', 'tax', 'insurance'] as const;
    type ValidType = typeof validTypes[number];
    
    if (validTypes.includes(type as ValidType)) {
      return translations.categories[type as ValidType];
    }
    return type;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-slate-400';
      case 'uploaded': return 'text-blue-400';
      case 'validated': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded': return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>;
      case 'validated': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'rejected': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusText = (status: string): string => {
    const statusKey = status as keyof Pick<DocumentTranslations, 'pending' | 'uploaded' | 'validated' | 'rejected'>;
    return translations[statusKey] || status;
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg">{document.name}</CardTitle>
          <div className="flex items-center space-x-2">
            {getStatusIcon(document.status)}
            <Badge 
              variant="secondary" 
              className={`${getStatusColor(document.status)} bg-transparent border`}
            >
              {getStatusText(document.status)}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-slate-400">
          {getCategoryName(document.type)} • {translations.required}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {document.status === 'validated' && document.score && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">{translations.score}</span>
              <span className="text-sm font-semibold text-green-400">{document.score}/100</span>
            </div>
            <Progress value={document.score} className="h-2" />
          </div>
        )}
        
        {document.status === 'rejected' && document.issues && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-red-400">{translations.issues}:</h4>
            {document.issues.map((issue, index) => (
              <div key={index} className="flex items-start space-x-2">
                <AlertTriangle className="w-3 h-3 text-red-400 mt-0.5" />
                <span className="text-xs text-red-300">{issue}</span>
              </div>
            ))}
          </div>
        )}

        {document.status === 'pending' && (
          <div className="text-center py-4">
            <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-400">Arrastra un archivo aquí</p>
          </div>
        )}

        {document.status === 'uploaded' && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
            <p className="text-sm text-blue-400">Analizando documento...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
