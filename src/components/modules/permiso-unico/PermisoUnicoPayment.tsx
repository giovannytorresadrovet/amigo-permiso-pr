
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, DollarSign, Receipt, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { PermisoUnicoApplication, PermisoUnicoFees, FeeItem } from '@/types/permisoUnico';
import { PermisoUnicoBusinessLogic } from '@/services/modules/permisoUnicoBusinessLogic';

interface PermisoUnicoPaymentProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  language: 'es' | 'en';
}

export const PermisoUnicoPayment = ({ application, onApplicationUpdate, language }: PermisoUnicoPaymentProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const calculateDetailedFees = (): PermisoUnicoFees => {
    if (!application) {
      return {
        baseFee: 150,
        additionalFees: [],
        totalAmount: 150,
        paidAmount: 0,
        paymentStatus: 'pending'
      };
    }

    const requirements = PermisoUnicoBusinessLogic.getRequirementsByBusinessType(
      application.businessInfo.businessType
    );

    const additionalFees: FeeItem[] = [];

    // Employee count fees
    if (application.businessInfo.employeeCount > 10) {
      additionalFees.push({
        description: 'Tarifa por más de 10 empleados',
        amount: 50,
        category: 'operational'
      });
    }
    if (application.businessInfo.employeeCount > 25) {
      additionalFees.push({
        description: 'Tarifa por más de 25 empleados',
        amount: 100,
        category: 'operational'
      });
    }

    // Business type specific fees
    if (application.businessInfo.businessType === 'restaurant') {
      additionalFees.push({
        description: 'Tarifa de permiso sanitario',
        amount: 75,
        category: 'health'
      });
    }

    if (application.businessInfo.businessType === 'manufacturing') {
      additionalFees.push({
        description: 'Tarifa de evaluación ambiental',
        amount: 200,
        category: 'environmental'
      });
    }

    // Inspection fee
    if (requirements.requiresInspection) {
      additionalFees.push({
        description: 'Tarifa de inspección',
        amount: 100,
        category: 'inspection'
      });
    }

    const totalAmount = requirements.baseFee + additionalFees.reduce((sum, fee) => sum + fee.amount, 0);

    return {
      baseFee: requirements.baseFee,
      additionalFees,
      totalAmount,
      paidAmount: application.fees?.paidAmount || 0,
      paymentStatus: application.fees?.paymentStatus || 'pending',
      paymentMethod: application.fees?.paymentMethod,
      paymentDate: application.fees?.paymentDate,
      receiptNumber: application.fees?.receiptNumber
    };
  };

  const detailedFees = calculateDetailedFees();

  const handlePayment = async () => {
    if (!application || !selectedPaymentMethod) return;

    setIsProcessingPayment(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      const receiptNumber = `PU-${Date.now()}`;
      const updatedFees: PermisoUnicoFees = {
        ...detailedFees,
        paidAmount: detailedFees.totalAmount,
        paymentStatus: 'paid',
        paymentMethod: selectedPaymentMethod,
        paymentDate: new Date(),
        receiptNumber
      };

      const updatedApplication = {
        ...application,
        fees: updatedFees,
        status: 'approved' as const,
        lastUpdated: new Date()
      };

      onApplicationUpdate(updatedApplication);
    } catch (error) {
      console.error('Payment processing error:', error);
    } finally {
      setIsProcessingPayment(false);
    }
  };

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

  const remainingBalance = detailedFees.totalAmount - detailedFees.paidAmount;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Pago de Tarifas del Permiso Único
          </CardTitle>
          <CardDescription>
            Gestión de pagos y tarifas requeridas para completar su solicitud
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Payment Status */}
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Estado del Pago</h3>
                  {getPaymentStatusBadge(detailedFees.paymentStatus)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total a Pagar</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${detailedFees.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Pagado</p>
                    <p className="text-2xl font-bold text-green-600">
                      ${detailedFees.paidAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600">Pendiente</p>
                    <p className="text-2xl font-bold text-orange-600">
                      ${remainingBalance.toFixed(2)}
                    </p>
                  </div>
                </div>

                {detailedFees.paymentStatus === 'paid' && detailedFees.receiptNumber && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800">Pago Completado</p>
                        <p className="text-xs text-green-600">
                          Recibo: {detailedFees.receiptNumber} | 
                          Fecha: {detailedFees.paymentDate?.toLocaleDateString()}
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

            {/* Fee Breakdown */}
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
                    <span className="font-medium">${detailedFees.baseFee.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  {detailedFees.additionalFees.map((fee, index) => (
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

                  {detailedFees.additionalFees.length === 0 && (
                    <p className="text-sm text-gray-500 py-2">No hay tarifas adicionales aplicables</p>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center py-2 text-lg font-bold">
                    <span>Total</span>
                    <span>${detailedFees.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Processing */}
            {remainingBalance > 0 && (
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
            )}

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información de Pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Métodos de Pago Aceptados</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Tarjetas de crédito y débito (Visa, MasterCard, American Express)</li>
                    <li>• Transferencias bancarias ACH</li>
                    <li>• Cheques certificados (con procesamiento de 3-5 días hábiles)</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-1">Política de Reembolsos</h4>
                  <p className="text-sm text-yellow-700">
                    Los reembolsos están disponibles hasta 30 días después del pago, 
                    sujetos a las regulaciones gubernamentales aplicables.
                  </p>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-1">Procesamiento Seguro</h4>
                  <p className="text-sm text-green-700">
                    Todos los pagos son procesados de forma segura a través de nuestro 
                    proveedor certificado PCI DSS con cifrado de extremo a extremo.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
