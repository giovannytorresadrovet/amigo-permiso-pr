
interface PermitWizardHeaderProps {
  language: 'es' | 'en';
}

export const PermitWizardHeader = ({ language }: PermitWizardHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {language === 'es' 
          ? 'Descubrimiento Inteligente de Permisos'
          : 'Smart Permit Discovery'
        }
      </h1>
      <p className="text-lg text-slate-400 max-w-2xl mx-auto">
        {language === 'es'
          ? 'Identifiquemos todos los permisos que necesitas y los problemas potenciales antes de invertir'
          : 'Let\'s identify all the permits you need and potential issues before you invest'
        }
      </p>
    </div>
  );
};
