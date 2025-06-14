
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';
import { PermisoUnicoApplication, PermisoUnicoFees, FeeItem } from '@/types/permisoUnico';
import { PermisoUnicoBusinessLogic } from '@/services/modules/permisoUnicoBusinessLogic';
import { PaymentStatusCard } from './payment/PaymentStatusCard';
import { PaymentBreakdown } from './payment/PaymentBreakdown';
import { PaymentProcessor } from './payment/PaymentProcessor';
import { PaymentInformation } from './payment/PaymentInformation';

interface PermisoUnicoPaymentProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  language: 'es' | 'en';
}

export const PermisoUnicoPayment = ({ application, onApplicationUpdate, language }: PermisoUnicoPaymentProps) => {
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

  const handlePaymentComplete = (updatedFees: PermisoUnicoFees) => {
    if (!application) return;

    const updatedApplication = {
      ...application,
      fees: updatedFees,
      status: 'approved' as const,
      lastUpdated: new Date()
    };

    onApplicationUpdate(updatedApplication);
  };

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
            <PaymentStatusCard fees={detailedFees} />
            <PaymentBreakdown fees={detailedFees} />
            <PaymentProcessor 
              fees={detailedFees} 
              onPaymentComplete={handlePaymentComplete}
            />
            <PaymentInformation />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
