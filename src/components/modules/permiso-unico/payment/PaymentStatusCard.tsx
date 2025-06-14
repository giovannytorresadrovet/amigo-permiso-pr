
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Clock, Receipt } from 'lucide-react';
import { PermisoUnicoFees } from '@/types/permisoUnico';

interface PaymentStatusCardProps {
  fees: PermisoUnicoFees;
}

export const PaymentStatusCard = ({ fees }: PaymentStatusCardProps) => {
  const getPaymentStatusBadge = (status: string) => {
    const config = {
      pending: { label: 'Pendiente', variant: 'secondary' as const, icon: Clock },
      partial: { label: 'Parcial', variant: 'destructive' as const, icon: AlertCircle },
      paid: { label: 'Pagado', variant: 'default' as const, icon: CheckCircle },
      refunded: { label: 'Reembolsado', variant: 'secondary' as const, icon: Receipt },
      failed: { label: 'Fallido', variant: 'destructive' as const, icon: AlertCircle }
    };

    const statusInfo = config[status as keyof typeof config] || config.pending;
    const Icon = statusInfo.icon;
    
    return (
      <Badge variant={statusInfo.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {statusInfo.label}
      </Badge>
    );
  };

  const remainingBalance = fees.totalAmount - fees.paidAmount;

  return (
    <Card className="border-l-4 border-l-green-500">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Estado del Pago</h3>
          {getPaymentStatusBadge(fees.paymentStatus)}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Total a Pagar</p>
            <p className="text-2xl font-bold text-blue-600">
              ${fees.totalAmount.toFixed(2)}
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Pagado</p>
            <p className="text-2xl font-bold text-green-600">
              ${fees.paidAmount.toFixed(2)}
            </p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600">Pendiente</p>
            <p className="text-2xl font-bold text-orange-600">
              ${remainingBalance.toFixed(2)}
            </p>
          </div>
        </div>

        {fees.paymentStatus === 'paid' && fees.receiptNumber && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800">Pago Completado</p>
                <p className="text-xs text-green-600">
                  Recibo: {fees.receiptNumber} | 
                  Fecha: {fees.paymentDate?.toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Receipt className="w-4 h-4 mr-2" />
                Descargar Recibo
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
