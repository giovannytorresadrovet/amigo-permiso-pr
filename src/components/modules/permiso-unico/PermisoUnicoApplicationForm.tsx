
import { useState } from 'react';
import { PermisoUnicoApplication, PermisoUnicoBusinessInfo, OperatingHours } from '@/types/permisoUnico';
import { BusinessInfoSection } from './application-form/BusinessInfoSection';
import { LocationSection } from './application-form/LocationSection';
import { OperatingHoursSection } from './application-form/OperatingHoursSection';
import { OperationalInfoSection } from './application-form/OperationalInfoSection';
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
  const [formData, setFormData] = useState<PermisoUnicoBusinessInfo>(() => {
    return application?.businessInfo || {
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
        monday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        tuesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        wednesday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        thursday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        friday: { isOpen: true, openTime: '09:00', closeTime: '17:00' },
        saturday: { isOpen: false },
        sunday: { isOpen: false }
      },
      employeeCount: 1,
      estimatedRevenue: ''
    };
  });

  const handleInputChange = (field: keyof PermisoUnicoBusinessInfo, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
    // Create or update application
    const newApplication: PermisoUnicoApplication = {
      id: application?.id || crypto.randomUUID(),
      businessId: businessId || '',
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

    onApplicationUpdate(newApplication);
  };

  return (
    <div className="space-y-6">
      <BusinessInfoSection 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />
      <LocationSection
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <OperatingHoursSection
        operatingHours={formData.operatingHours}
        handleOperatingHoursChange={handleOperatingHoursChange}
      />
      <OperationalInfoSection
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <FormNavigation handleSubmit={handleSubmit} />
    </div>
  );
};
