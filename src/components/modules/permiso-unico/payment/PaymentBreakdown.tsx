
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { DollarSign } from 'lucide-react';
import { PermisoUnicoFees } from '@/types/permisoUnico';

interface PaymentBreakdownProps {
  fees: PermisoUnicoFees;
}

export const PaymentBreakdown = ({ fees }: PaymentBreakdownProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Desglose de Tarifas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2">
            <span>Tarifa base del Permiso Único</span>
            <span className="font-medium">${fees.baseFee.toFixed(2)}</span>
          </div>
          
          <Separator />
          
          {fees.additionalFees.map((fee, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <div>
                <span className="text-sm">{fee.description}</span>
                <Badge variant="outline" className="ml-2 text-xs">
                  {fee.category}
                </Badge>
              </div>
              <span className="font-medium">${fee.amount.toFixed(2)}</span>
            </div>
          ))}

          {fees.additionalFees.length === 0 && (
            <p className="text-sm text-gray-500 py-2">No hay tarifas adicionales aplicables</p>
          )}
          
          <Separator />
          
          <div className="flex justify-between items-center py-2 text-lg font-bold">
            <span>Total</span>
            <span>${fees.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
