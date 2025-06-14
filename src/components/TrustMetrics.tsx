
interface TrustMetricsProps {
  translations: {
    businesses: string;
    problems: string;
    success: string;
    time: string;
  };
}

export const TrustMetrics = ({ translations }: TrustMetricsProps) => {
  return (
    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      <div className="text-center">
        <div className="text-3xl font-bold text-white">1,247</div>
        <div className="text-sm text-slate-400">{translations.businesses}</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">3,891</div>
        <div className="text-sm text-slate-400">{translations.problems}</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">94%</div>
        <div className="text-sm text-slate-400">{translations.success}</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white">156h</div>
        <div className="text-sm text-slate-400">{translations.time}</div>
      </div>
    </div>
  );
};
