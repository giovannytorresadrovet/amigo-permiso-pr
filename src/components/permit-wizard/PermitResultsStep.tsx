
import { CheckCircle, AlertTriangle, Clock, DollarSign } from 'lucide-react';
import { PermitDiscoveryResult } from '@/services/permitDiscoveryEngine';

interface PermitResultsStepProps {
  discoveryResult: PermitDiscoveryResult;
  language: 'es' | 'en';
}

export const PermitResultsStep = ({ discoveryResult, language }: PermitResultsStepProps) => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-blue-400" />
            <div>
              <div className="text-xl font-bold text-white">
                {discoveryResult.requiredPermits.length}
              </div>
              <div className="text-sm text-blue-300">
                {language === 'es' ? 'Permisos Requeridos' : 'Required Permits'}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            <div>
              <div className="text-xl font-bold text-white">
                {discoveryResult.potentialIssues.length}
              </div>
              <div className="text-sm text-yellow-300">
                {language === 'es' ? 'Problemas Potenciales' : 'Potential Issues'}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-green-400" />
            <div>
              <div className="text-xl font-bold text-white">
                {discoveryResult.estimatedTimeline}
              </div>
              <div className="text-sm text-green-300">
                {language === 'es' ? 'Tiempo Estimado' : 'Estimated Time'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Estimate */}
      <div className="p-6 bg-slate-700/50 rounded-lg border border-slate-600">
        <div className="flex items-center space-x-3 mb-4">
          <DollarSign className="w-6 h-6 text-green-400" />
          <h3 className="text-lg font-semibold text-white">
            {language === 'es' ? 'Costo Estimado Total' : 'Total Estimated Cost'}
          </h3>
        </div>
        <div className="text-2xl font-bold text-green-400">
          {discoveryResult.estimatedCost}
        </div>
        <p className="text-sm text-slate-400 mt-2">
          {language === 'es' 
            ? 'Incluye tarifas gubernamentales, no incluye costos de consultoría'
            : 'Includes government fees, excludes consulting costs'
          }
        </p>
      </div>

      {/* Critical Issues */}
      {discoveryResult.potentialIssues.some(issue => issue.severity === 'critical') && (
        <div className="p-6 bg-red-500/10 rounded-lg border border-red-500/30">
          <h3 className="text-lg font-semibold text-red-400 mb-4">
            {language === 'es' ? '⚠️ Problemas Críticos Detectados' : '⚠️ Critical Issues Detected'}
          </h3>
          {discoveryResult.potentialIssues
            .filter(issue => issue.severity === 'critical')
            .map((issue, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h4 className="font-medium text-red-300">{issue.title}</h4>
                <p className="text-sm text-red-200">{issue.description}</p>
                <p className="text-sm text-red-100 mt-1">
                  <strong>{language === 'es' ? 'Solución:' : 'Solution:'}</strong> {issue.solution}
                </p>
              </div>
            ))
          }
        </div>
      )}

      {/* Recommendations */}
      <div className="p-6 bg-blue-500/10 rounded-lg border border-blue-500/30">
        <h3 className="text-lg font-semibold text-blue-400 mb-4">
          {language === 'es' ? '💡 Recomendaciones' : '💡 Recommendations'}
        </h3>
        <ul className="space-y-2">
          {discoveryResult.recommendations.map((rec, index) => (
            <li key={index} className="text-sm text-blue-200 flex items-start space-x-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
