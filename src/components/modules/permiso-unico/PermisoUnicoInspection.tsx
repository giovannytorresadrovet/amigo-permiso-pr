
import { Card, CardContent } from '@/components/ui/card';
import type { PermisoUnicoApplication, PermisoUnicoInspection as PermisoUnicoInspectionType } from '@/types/permisoUnico';
import { InspectionHeader } from './inspection/InspectionHeader';
import { InspectionContent } from './inspection/InspectionContent';
import { INSPECTION_CHECKLIST } from './inspection/InspectionScheduler';

interface PermisoUnicoInspectionProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  language: 'es' | 'en';
}

export const PermisoUnicoInspection = ({ application, onApplicationUpdate, language }: PermisoUnicoInspectionProps) => {
  const currentInspection = application?.inspectionInfo;

  const handleScheduleInspection = (selectedDate: Date, selectedTimeSlot: string, inspectionNotes: string) => {
    if (!application) return;

    const scheduledDateTime = new Date(selectedDate);
    const [time, period] = selectedTimeSlot.split(' ');
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    scheduledDateTime.setHours(hour, parseInt(minutes), 0, 0);

    const newInspection: PermisoUnicoInspectionType = {
      id: crypto.randomUUID(),
      scheduledDate: scheduledDateTime,
      status: 'scheduled',
      checklist: INSPECTION_CHECKLIST,
      notes: inspectionNotes,
      passed: false,
      deficiencies: []
    };

    const updatedApplication = {
      ...application,
      inspectionInfo: newInspection,
      status: 'inspection_scheduled' as const,
      lastUpdated: new Date()
    };

    onApplicationUpdate(updatedApplication);
  };

  return (
    <div className="space-y-6">
      <Card>
        <InspectionHeader />
        <CardContent>
          <InspectionContent
            currentInspection={currentInspection}
            businessAddress={application?.businessInfo.address || ''}
            onScheduleInspection={handleScheduleInspection}
          />
        </CardContent>
      </Card>
    </div>
  );
};
