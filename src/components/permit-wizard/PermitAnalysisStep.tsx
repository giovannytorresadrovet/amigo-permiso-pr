
import { BusinessProfile } from '@/services/permitDiscoveryEngine';
import { BusinessWizardStep3 } from '../BusinessWizardStep3';

interface PermitAnalysisStepProps {
  businessProfile: Partial<BusinessProfile>;
  onDataChange: (data: Partial<BusinessProfile>) => void;
  language: 'es' | 'en';
  isAnalyzing: boolean;
}

export const PermitAnalysisStep = ({
  businessProfile,
  onDataChange,
  language,
  isAnalyzing
}: PermitAnalysisStepProps) => {
  return (
    <div className="space-y-6">
      <BusinessWizardStep3
        businessData={{
          employees: businessProfile.employees?.toString() || '1',
          revenue: businessProfile.revenue || 'under50k'
        }}
        onDataChange={(data) => onDataChange({
          employees: parseInt(data.employees || '1'),
          revenue: data.revenue
        })}
        translations={{
          employees: language === 'es' ? 'Número de Empleados' : 'Number of Employees',
          revenue: language === 'es' ? 'Ingresos Anuales' : 'Annual Revenue',
          employeeRanges: {
            '1': '1',
            '2-5': '2-5',
            '6-10': '6-10',
            '11+': '11+'
          },
          revenueRanges: {
            under50k: language === 'es' ? 'Menos de $50,000' : 'Under $50,000',
            '50k-100k': '$50,000 - $100,000',
            '100k+': language === 'es' ? 'Más de $100,000' : 'Over $100,000'
          }
        }}
      />

      <div className="space-y-4 p-6 bg-slate-700/50 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">
          {language === 'es' ? 'Características del Negocio' : 'Business Characteristics'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 text-slate-300">
            <input
              type="checkbox"
              checked={businessProfile.servesFood}
              onChange={(e) => onDataChange({ servesFood: e.target.checked })}
              className="rounded"
            />
            <span>{language === 'es' ? 'Sirve comida' : 'Serves food'}</span>
          </label>
          
          <label className="flex items-center space-x-3 text-slate-300">
            <input
              type="checkbox"
              checked={businessProfile.handlesChemicals}
              onChange={(e) => onDataChange({ handlesChemicals: e.target.checked })}
              className="rounded"
            />
            <span>{language === 'es' ? 'Maneja químicos' : 'Handles chemicals'}</span>
          </label>
          
          <label className="flex items-center space-x-3 text-slate-300">
            <input
              type="checkbox"
              checked={businessProfile.operatesLateHours}
              onChange={(e) => onDataChange({ operatesLateHours: e.target.checked })}
              className="rounded"
            />
            <span>{language === 'es' ? 'Opera horario extendido' : 'Operates late hours'}</span>
          </label>
          
          <label className="flex items-center space-x-3 text-slate-300">
            <input
              type="checkbox"
              checked={businessProfile.hasPhysicalLocation}
              onChange={(e) => onDataChange({ hasPhysicalLocation: e.target.checked })}
              className="rounded"
            />
            <span>{language === 'es' ? 'Tiene ubicación física' : 'Has physical location'}</span>
          </label>
        </div>
      </div>

      {isAnalyzing && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-300">
            {language === 'es' 
              ? 'Analizando requisitos de permisos...'
              : 'Analyzing permit requirements...'
            }
          </p>
        </div>
      )}
    </div>
  );
};
