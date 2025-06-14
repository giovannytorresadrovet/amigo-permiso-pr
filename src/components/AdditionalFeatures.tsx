
import { Globe, Smartphone, Shield } from 'lucide-react';

interface AdditionalFeaturesProps {
  translations: {
    offline: string;
    offlineDesc: string;
    bilingual: string;
    bilingualDesc: string;
    secure: string;
    secureDesc: string;
  };
}

export const AdditionalFeatures = ({ translations }: AdditionalFeaturesProps) => {
  return (
    <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <div className="flex items-center space-x-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700">
        <Smartphone className="w-8 h-8 text-blue-400" />
        <div>
          <h3 className="text-white font-semibold">{translations.offline}</h3>
          <p className="text-slate-400 text-sm">{translations.offlineDesc}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700">
        <Globe className="w-8 h-8 text-teal-400" />
        <div>
          <h3 className="text-white font-semibold">{translations.bilingual}</h3>
          <p className="text-slate-400 text-sm">{translations.bilingualDesc}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700">
        <Shield className="w-8 h-8 text-purple-400" />
        <div>
          <h3 className="text-white font-semibold">{translations.secure}</h3>
          <p className="text-slate-400 text-sm">{translations.secureDesc}</p>
        </div>
      </div>
    </div>
  );
};
