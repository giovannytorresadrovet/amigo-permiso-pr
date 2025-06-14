
import { Globe, MapPin, Phone, Mail, Clock, Star } from 'lucide-react';
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/modern-card';
import { Badge } from '@/components/ui/badge';
import { Business } from '@/types/business';

interface BusinessDigitalProfileCardProps {
  business: Business;
}

export const BusinessDigitalProfileCard = ({ business }: BusinessDigitalProfileCardProps) => {
  const defaultHours = {
    monday: { open: '9:00', close: '17:00' },
    tuesday: { open: '9:00', close: '17:00' },
    wednesday: { open: '9:00', close: '17:00' },
    thursday: { open: '9:00', close: '17:00' },
    friday: { open: '9:00', close: '17:00' }
  };

  const businessHours = business.businessHours || defaultHours;

  return (
    <ModernCard variant="gradient" className="overflow-hidden">
      <ModernCardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <ModernCardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <span>Perfil Digital Empresarial</span>
        </ModernCardTitle>
      </ModernCardHeader>
      <ModernCardContent className="p-6">
        {/* Business Description */}
        <div className="mb-6">
          <p className="text-slate-700 leading-relaxed">{business.description}</p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-slate-500 mt-0.5" />
              <div>
                <p className="font-medium text-slate-900">Ubicación</p>
                <p className="text-sm text-slate-600">{business.location}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">Teléfono</p>
                <p className="text-sm text-slate-600">{business.phone}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">Email</p>
                <p className="text-sm text-slate-600">{business.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">Sitio Web</p>
                <p className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                  {business.website}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-4 h-4 text-slate-600" />
            <h4 className="font-medium text-slate-900">Horarios de Operación</h4>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(businessHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between items-center py-1">
                <span className="text-slate-600 capitalize">{day}</span>
                <span className="text-slate-900 font-medium">
                  {hours.open} - {hours.close}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Business Metrics */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700">{business.employees}</div>
            <div className="text-xs text-green-600">Empleados</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">{business.permitCount}</div>
            <div className="text-xs text-blue-600">Permisos</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">{business.established}</div>
            <div className="text-xs text-purple-600">Establecido</div>
          </div>
        </div>
      </ModernCardContent>
    </ModernCard>
  );
};
