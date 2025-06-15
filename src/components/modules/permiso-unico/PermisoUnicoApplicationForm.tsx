
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PermisoUnicoApplication, PermisoUnicoBusinessInfo, OperatingHours } from '@/types/permisoUnico';
import { PermisoUnicoBusinessLogic } from '@/services/modules/permisoUnicoBusinessLogic';
import { FormHeader } from './application-form/FormHeader';
import { FormStatusIndicator } from './application-form/FormStatusIndicator';
import { FormValidationDisplay } from './application-form/FormValidationDisplay';
import { BusinessInfoSection } from './application-form/BusinessInfoSection';
import { LocationSection } from './application-form/LocationSection';
import { OperationalInfoSection } from './application-form/OperationalInfoSection';
import { OperatingHoursSection } from './application-form/OperatingHoursSection';
import { FormNavigation } from './application-form/FormNavigation';

interface PermisoUnicoApplicationFormProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  businessId?: string;
  language: 'es' | 'en';
}

export const PermisoUnicoApplicationForm = ({ 
  application, 
  onApplicationUpdate, 
  businessId, 
  language 
}: PermisoUnicoApplicationFormProps) => {
  const [formData, setFormData] = useState<PermisoUnicoBusinessInfo>({
    businessName: '',
    dbaName: '',
    businessType: '',
    crimNumber: '',
    taxId: '',
    municipality: '',
    address: '',
    urbanization: '',
    zipCode: '',
    phone: '',
    email: '',
    description: '',
    operatingHours: {
      monday: { isOpen: false },
      tuesday: { isOpen: false },
      wednesday: { isOpen: false },
      thursday: { isOpen: false },
      friday: { isOpen: false },
      saturday: { isOpen: false },
      sunday: { isOpen: false }
    },
    employeeCount: 1,
    estimatedRevenue: ''
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Initialize form data from application
  useEffect(() => {
    if (application?.businessInfo) {
      setFormData(application.businessInfo);
    }
  }, [application]);

  const handleInputChange = (field: keyof PermisoUnicoBusinessInfo, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOperatingHoursChange = (day: keyof OperatingHours, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = () => {
    // Create new application or update existing one
    const newApplication: PermisoUnicoApplication = {
      id: application?.id || crypto.randomUUID(),
      businessId: businessId || 'temp-id',
      status: 'submitted',
      submittedAt: new Date(),
      lastUpdated: new Date(),
      businessInfo: formData,
      documents: application?.documents || [],
      fees: application?.fees || {
        baseFee: 150,
        additionalFees: [],
        totalAmount: 150,
        paidAmount: 0,
        paymentStatus: 'pending'
      },
      notes: application?.notes || []
    };

    // Validate the application
    const validation = PermisoUnicoBusinessLogic.validateApplication(newApplication);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    onApplicationUpdate(newApplication);
  };

  const isDraft = !application?.submittedAt;

  return (
    <Card>
      <FormHeader />
      <CardContent className="space-y-6">
        <FormStatusIndicator 
          isDraft={isDraft}
          lastSaved={application?.lastUpdated}
        />

        <FormValidationDisplay validationErrors={validationErrors} />

        <BusinessInfoSection 
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <Separator />

        <LocationSection 
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <Separator />

        <OperationalInfoSection 
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <Separator />

        <OperatingHoursSection 
          operatingHours={formData.operatingHours}
          handleOperatingHoursChange={handleOperatingHoursChange}
        />

        <Separator />

        <FormNavigation handleSubmit={handleSubmit} />
      </CardContent>
    </Card>
  );
};
