
import { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { PermisoUnicoApplication } from '@/types/permisoUnico';
import { PermisoUnicoHeader } from './components/PermisoUnicoHeader';
import { PermisoUnicoTabs } from './components/PermisoUnicoTabs';
import { PermisoUnicoTabContent } from './components/PermisoUnicoTabContent';

interface PermisoUnicoComponentProps {
  businessId?: string;
  language?: 'es' | 'en';
}

export const PermisoUnicoComponent = ({ businessId, language = 'es' }: PermisoUnicoComponentProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [application, setApplication] = useState<PermisoUnicoApplication | null>(null);

  return (
    <div className="space-y-6">
      <PermisoUnicoHeader application={application} />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <PermisoUnicoTabs activeTab={activeTab} />
        
        <div className="mt-6">
          <PermisoUnicoTabContent 
            application={application}
            onApplicationUpdate={setApplication}
            businessId={businessId}
            language={language}
          />
        </div>
      </Tabs>
    </div>
  );
};
