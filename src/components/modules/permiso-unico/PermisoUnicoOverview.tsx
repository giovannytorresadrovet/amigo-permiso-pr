
import { PermisoUnicoApplication } from '@/types/permisoUnico';
import { OverviewStatusCard } from './overview/OverviewStatusCard';
import { OverviewProgressSteps } from './overview/OverviewProgressSteps';
import { OverviewSummaryCards } from './overview/OverviewSummaryCards';
import { OverviewBusinessInfo } from './overview/OverviewBusinessInfo';
import { OverviewNextActions } from './overview/OverviewNextActions';
import { OverviewQuickActions } from './overview/OverviewQuickActions';

interface PermisoUnicoOverviewProps {
  application: PermisoUnicoApplication | null;
  businessId?: string;
  language: 'es' | 'en';
}

export const PermisoUnicoOverview = ({ application, businessId, language }: PermisoUnicoOverviewProps) => {
  return (
    <div className="space-y-6">
      <OverviewStatusCard application={application} />
      <OverviewProgressSteps application={application} />
      <OverviewSummaryCards application={application} />
      <OverviewBusinessInfo application={application} />
      <OverviewNextActions application={application} />
      <OverviewQuickActions application={application} />
    </div>
  );
};
