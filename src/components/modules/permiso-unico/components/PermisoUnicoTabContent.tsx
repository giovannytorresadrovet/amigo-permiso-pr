
import { TabsContent } from '@/components/ui/tabs';
import { PermisoUnicoApplication } from '@/types/permisoUnico';
import { PermisoUnicoOverview } from '../PermisoUnicoOverview';
import { PermisoUnicoApplicationForm } from '../PermisoUnicoApplicationForm';
import { PermisoUnicoDocuments } from '../PermisoUnicoDocuments';
import { PermisoUnicoInspection } from '../PermisoUnicoInspection';
import { PermisoUnicoPayment } from '../PermisoUnicoPayment';
import { PermisoUnicoNotifications } from '../notifications/PermisoUnicoNotifications';
import { PermisoUnicoCompliance } from '../compliance/PermisoUnicoCompliance';
import { PermisoUnicoAdmin } from '../admin/PermisoUnicoAdmin';
import { PermisoUnicoStatusTracker } from '../status/PermisoUnicoStatusTracker';

interface PermisoUnicoTabContentProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  businessId?: string;
  language: 'es' | 'en';
}

export const PermisoUnicoTabContent = ({ 
  application, 
  onApplicationUpdate, 
  businessId, 
  language 
}: PermisoUnicoTabContentProps) => {
  return (
    <>
      <TabsContent value="overview">
        <PermisoUnicoOverview 
          application={application}
          businessId={businessId}
          language={language}
        />
      </TabsContent>

      <TabsContent value="application">
        <PermisoUnicoApplicationForm 
          application={application}
          onApplicationUpdate={onApplicationUpdate}
          businessId={businessId}
          language={language}
        />
      </TabsContent>

      <TabsContent value="documents">
        <PermisoUnicoDocuments 
          application={application}
          onApplicationUpdate={onApplicationUpdate}
          language={language}
        />
      </TabsContent>

      <TabsContent value="inspection">
        <PermisoUnicoInspection 
          application={application}
          onApplicationUpdate={onApplicationUpdate}
          language={language}
        />
      </TabsContent>

      <TabsContent value="payment">
        <PermisoUnicoPayment 
          application={application}
          onApplicationUpdate={onApplicationUpdate}
          language={language}
        />
      </TabsContent>

      <TabsContent value="notifications">
        <PermisoUnicoNotifications 
          application={application}
          language={language}
        />
      </TabsContent>

      <TabsContent value="compliance">
        <PermisoUnicoCompliance 
          application={application}
          language={language}
        />
      </TabsContent>

      <TabsContent value="admin">
        <PermisoUnicoAdmin 
          application={application}
          onApplicationUpdate={onApplicationUpdate}
          language={language}
        />
      </TabsContent>

      <TabsContent value="status">
        <PermisoUnicoStatusTracker 
          application={application}
          language={language}
        />
      </TabsContent>
    </>
  );
};
