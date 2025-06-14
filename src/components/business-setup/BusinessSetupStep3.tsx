
import { CheckCircle, Building, AlertTriangle, Clock } from 'lucide-react';

interface BusinessSetupStep3Props {
  discoveredIssues: string[];
}

export const BusinessSetupStep3 = ({ discoveredIssues }: BusinessSetupStep3Props) => {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">
        ¡Análisis Completado!
      </h3>
      <p className="text-slate-300 mb-6">
        Hemos identificado todos los permisos requeridos y problemas potenciales para tu negocio.
      </p>
      <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
          <Building className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">7</div>
          <div className="text-sm text-blue-300">Permisos Requeridos</div>
        </div>
        <div className="p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
          <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{discoveredIssues.length}</div>
          <div className="text-sm text-yellow-300">Problemas Evitados</div>
        </div>
        <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
          <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">45</div>
          <div className="text-sm text-green-300">Días Ahorrados</div>
        </div>
      </div>
    </div>
  );
};
