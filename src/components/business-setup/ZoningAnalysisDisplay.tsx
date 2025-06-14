
import { MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

interface ZoningAnalysisDisplayProps {
  shouldShow: boolean;
  zoningResult: 'checking' | 'compatible' | 'issues' | null;
  discoveredIssues: string[];
  translations: {
    analyzing: string;
    compatible: string;
    issues: string;
  };
}

export const ZoningAnalysisDisplay = ({ 
  shouldShow, 
  zoningResult, 
  discoveredIssues, 
  translations 
}: ZoningAnalysisDisplayProps) => {
  if (!shouldShow) return null;

  return (
    <div className="mt-8 p-6 bg-slate-700/50 rounded-lg border border-slate-600">
      <div className="flex items-center space-x-3 mb-4">
        <MapPin className="w-5 h-5 text-blue-400" />
        <h3 className="text-white font-semibold">Análisis de Zonificación en Tiempo Real</h3>
      </div>

      {zoningResult === 'checking' && (
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
          <span className="text-slate-300">{translations.analyzing}</span>
        </div>
      )}

      {zoningResult === 'compatible' && (
        <div className="flex items-center space-x-3 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span>{translations.compatible}</span>
        </div>
      )}

      {zoningResult === 'issues' && (
        <div>
          <div className="flex items-center space-x-3 text-yellow-400 mb-4">
            <AlertTriangle className="w-5 h-5" />
            <span>{translations.issues}</span>
          </div>
          <div className="space-y-2">
            {discoveredIssues.map((issue, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                <span className="text-yellow-200 text-sm">{issue}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
