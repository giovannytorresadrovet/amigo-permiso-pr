
import { Building2, Star, Award, Globe, MapPin } from 'lucide-react';
import { ModernCard } from '@/components/ui/modern-card';
import { TrustBadge } from '@/components/ui/trust-badge';
import { Badge } from '@/components/ui/badge';
import { Business } from '@/types/business';

interface BusinessIdentityCrownProps {
  business: Business;
}

export const BusinessIdentityCrown = ({ business }: BusinessIdentityCrownProps) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'verified';
      case 'Pending': return 'warning';
      case 'Inactive': return 'error';
      default: return 'pending';
    }
  };

  return (
    <ModernCard variant="premium" className="overflow-hidden relative">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-indigo-500/5 to-purple-600/5" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -translate-y-32 translate-x-32" />
      
      <div className="relative p-8">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                {business.name}
              </h1>
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="bg-white/80 text-slate-700 border-slate-300">
                  {business.type}
                </Badge>
                <TrustBadge variant={getStatusVariant(business.status)} size="sm">
                  {business.status}
                </TrustBadge>
              </div>
            </div>
          </div>
          
          <div className="text-right space-y-2">
            <TrustBadge variant="verified" size="lg">
              <Award className="w-4 h-4" />
              Empresa Premium
            </TrustBadge>
            <div className="text-sm text-slate-600">
              ID: {business.id}
            </div>
          </div>
        </div>

        {/* Business Description */}
        <div className="mb-6">
          <p className="text-lg text-slate-700 leading-relaxed font-light max-w-4xl">
            {business.description}
          </p>
        </div>

        {/* Quick Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-xl border border-white/80">
            <MapPin className="w-5 h-5 text-slate-500" />
            <div>
              <div className="text-sm font-medium text-slate-900">Ubicación</div>
              <div className="text-sm text-slate-600">{business.location}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-xl border border-white/80">
            <Building2 className="w-5 h-5 text-slate-500" />
            <div>
              <div className="text-sm font-medium text-slate-900">Empleados</div>
              <div className="text-sm text-slate-600">{business.employees} personas</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-white/60 rounded-xl border border-white/80">
            <Globe className="w-5 h-5 text-slate-500" />
            <div>
              <div className="text-sm font-medium text-slate-900">Establecido</div>
              <div className="text-sm text-slate-600">Desde {business.established}</div>
            </div>
          </div>
        </div>
      </div>
    </ModernCard>
  );
};
