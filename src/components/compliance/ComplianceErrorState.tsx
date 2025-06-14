
interface ComplianceErrorStateProps {
  language: 'es' | 'en';
}

export const ComplianceErrorState = ({ language }: ComplianceErrorStateProps) => {
  return (
    <div className="p-6 text-center">
      <p className="text-slate-400">
        {language === 'es' 
          ? 'Error al cargar datos de cumplimiento'
          : 'Error loading compliance data'
        }
      </p>
    </div>
  );
};
