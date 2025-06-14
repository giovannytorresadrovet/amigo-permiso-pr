
import { MapPin, Phone, Mail } from 'lucide-react';

interface BusinessCardContactInfoProps {
  business: {
    address: string;
    municipality: string;
    phone: string;
    email: string;
  };
}

export const BusinessCardContactInfo = ({ business }: BusinessCardContactInfoProps) => {
  return (
    <div className="space-y-3 text-sm text-slate-600">
      <div className="flex items-center">
        <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-slate-400" />
        <span className="truncate">{business.address}, {business.municipality}</span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center">
          <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-slate-400" />
          <span>{business.phone}</span>
        </div>
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2 flex-shrink-0 text-slate-400" />
          <span className="truncate">{business.email}</span>
        </div>
      </div>
    </div>
  );
};
