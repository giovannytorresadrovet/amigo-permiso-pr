
interface BusinessListEmptyStateProps {
  hasFilters: boolean;
  onNewBusiness: () => void;
}

export const BusinessListEmptyState = ({ hasFilters, onNewBusiness }: BusinessListEmptyStateProps) => {
  return (
    <div className="text-center py-12">
      <div className="text-slate-400 mb-2">
        {hasFilters 
          ? 'No se encontraron negocios que coincidan con los filtros' 
          : 'No tienes negocios registrados'
        }
      </div>
      {!hasFilters && (
        <button
          onClick={onNewBusiness}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Registra tu primer negocio
        </button>
      )}
    </div>
  );
};
