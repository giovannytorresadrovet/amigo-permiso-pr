
interface ModuleDiscoveryLoadingProps {
  language: 'es' | 'en';
}

export const ModuleDiscoveryLoading = ({ language }: ModuleDiscoveryLoadingProps) => {
  return (
    <div className="text-center py-12">
      <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-slate-600">
        {language === 'es' ? 'Analizando tu negocio con IA...' : 'Analyzing your business with AI...'}
      </p>
    </div>
  );
};
