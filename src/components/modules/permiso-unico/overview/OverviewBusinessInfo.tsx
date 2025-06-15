
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface OverviewBusinessInfoProps {
  application: PermisoUnicoApplication | null;
}

export const OverviewBusinessInfo = ({ application }: OverviewBusinessInfoProps) => {
  if (!application) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Información del Negocio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">Nombre del Negocio:</span>
              <p className="font-medium">{application.businessInfo.businessName}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Tipo de Negocio:</span>
              <p className="font-medium">{application.businessInfo.businessType}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">CRIM:</span>
              <p className="font-medium">{application.businessInfo.crimNumber}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-600">Municipio:</span>
              <p className="font-medium">{application.businessInfo.municipality}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Dirección:</span>
              <p className="font-medium">{application.businessInfo.address}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Empleados:</span>
              <p className="font-medium">{application.businessInfo.employeeCount}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
