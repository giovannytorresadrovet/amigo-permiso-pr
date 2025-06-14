
import { Award, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { ModernCard, ModernCardContent, ModernCardHeader, ModernCardTitle } from '@/components/ui/modern-card';
import { Badge } from '@/components/ui/badge';
import { Business } from '@/types/business';

interface BusinessCertificationsCardProps {
  business: Business;
}

export const BusinessCertificationsCard = ({ business }: BusinessCertificationsCardProps) => {
  // Default certifications if not provided
  const certifications = business.certifications || [
    {
      name: 'ISO 9001:2015',
      issuer: 'International Organization for Standardization',
      expires: '2025-12-31',
      verified: true
    },
    {
      name: 'Certificación de Negocio Local',
      issuer: 'Gobierno de Puerto Rico',
      expires: '2024-08-15',
      verified: true
    },
    {
      name: 'Certificación Ambiental',
      issuer: 'EPA Puerto Rico',
      expires: '2024-06-30',
      verified: false
    }
  ];

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
    return expiry <= thirtyDaysFromNow;
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  return (
    <ModernCard variant="elevated">
      <ModernCardHeader>
        <ModernCardTitle className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-purple-600" />
          <span>Certificaciones y Acreditaciones</span>
        </ModernCardTitle>
      </ModernCardHeader>
      <ModernCardContent className="space-y-4">
        {certifications.map((cert, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border bg-gradient-to-r from-white to-slate-50 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-slate-900">{cert.name}</h4>
                  {cert.verified ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                  )}
                </div>
                <p className="text-sm text-slate-600">{cert.issuer}</p>
              </div>
              
              <div className="text-right">
                <Badge 
                  variant="outline"
                  className={
                    isExpired(cert.expires) ? 'border-red-300 text-red-700 bg-red-50' :
                    isExpiringSoon(cert.expires) ? 'border-orange-300 text-orange-700 bg-orange-50' :
                    'border-green-300 text-green-700 bg-green-50'
                  }
                >
                  {isExpired(cert.expires) ? 'Vencida' :
                   isExpiringSoon(cert.expires) ? 'Por Vencer' : 'Vigente'}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>Vence: {new Date(cert.expires).toLocaleDateString('es-ES')}</span>
            </div>
            
            {!cert.verified && (
              <div className="mt-2 text-xs text-orange-600 bg-orange-50 p-2 rounded">
                Esta certificación requiere verificación
              </div>
            )}
          </div>
        ))}
        
        {certifications.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <Award className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>No hay certificaciones registradas</p>
            <p className="text-sm mt-1">Agregue certificaciones para mejorar su perfil empresarial</p>
          </div>
        )}
      </ModernCardContent>
    </ModernCard>
  );
};
