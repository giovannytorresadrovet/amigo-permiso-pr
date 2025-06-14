
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface PermisoUnicoPaymentProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  language: 'es' | 'en';
}

export const PermisoUnicoPayment = ({ application, onApplicationUpdate, language }: PermisoUnicoPaymentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pago de Tarifas</CardTitle>
        <CardDescription>
          Gestión de pagos y tarifas del Permiso Único
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-lg font-medium mb-4">Gestión de Pagos</p>
          <p className="text-gray-600">
            Esta sección estará disponible próximamente para procesar los pagos de las tarifas.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
