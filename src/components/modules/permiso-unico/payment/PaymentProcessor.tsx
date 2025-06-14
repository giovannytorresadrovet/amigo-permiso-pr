
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard } from 'lucide-react';
import { PermisoUnicoApplication, PermisoUnicoFees } from '@/types/permisoUnico';

interface PaymentProcessorProps {
  fees: PermisoUnicoFees;
  onPaymentComplete: (updatedFees: PermisoUnicoFees) => void;
}

export const PaymentProcessor = ({ fees, onPaymentComplete }: PaymentProcessorProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const remainingBalance = fees.totalAmount - fees.paidAmount;

  const handlePayment = async () => {
    if (!selectedPaymentMethod) return;

    setIsProcessingPayment(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      const receiptNumber = `PU-${Date.now()}`;
      const updatedFees: PermisoUnicoFees = {
        ...fees,
        paidAmount: fees.totalAmount,
        paymentStatus: 'paid',
        paymentMethod: selectedPaymentMethod,
        paymentDate: new Date(),
        receiptNumber
      };

      onPaymentComplete(updatedFees);
    } catch (error) {
      console.error('Payment processing error:', error);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (remainingBalance <= 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Procesar Pago</CardTitle>
        <CardDescription>
          Seleccione un método de pago para completar su solicitud
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Método de Pago</label>
          <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar método de pago" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit_card">Tarjeta de Crédito</SelectItem>
              <SelectItem value="debit_card">Tarjeta de Débito</SelectItem>
              <SelectItem value="ach">Transferencia ACH</SelectItem>
              <SelectItem value="check">Cheque Certificado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedPaymentMethod && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Resumen del Pago</h4>
            <div className="text-sm space-y-1">
              <p><strong>Monto:</strong> ${remainingBalance.toFixed(2)}</p>
              <p><strong>Método:</strong> {
                selectedPaymentMethod === 'credit_card' ? 'Tarjeta de Crédito' :
                selectedPaymentMethod === 'debit_card' ? 'Tarjeta de Débito' :
                selectedPaymentMethod === 'ach' ? 'Transferencia ACH' :
                'Cheque Certificado'
              }</p>
              <p><strong>Procesamiento:</strong> Inmediato</p>
            </div>
          </div>
        )}

        <Button 
          onClick={handlePayment}
          disabled={!selectedPaymentMethod || isProcessingPayment || remainingBalance <= 0}
          className="w-full"
          size="lg"
        >
          {isProcessingPayment ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Procesando Pago...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Pagar ${remainingBalance.toFixed(2)}
            </div>
          )}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          Su información de pago está protegida con cifrado de nivel bancario
        </div>
      </CardContent>
    </Card>
  );
};
