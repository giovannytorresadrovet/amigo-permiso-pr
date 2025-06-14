
interface ComplianceLoadingStateProps {
  language: 'es' | 'en';
}

export const ComplianceLoadingState = ({ language }: ComplianceLoadingStateProps) => {
  return (
    <div className="p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-slate-700 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-slate-700 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
