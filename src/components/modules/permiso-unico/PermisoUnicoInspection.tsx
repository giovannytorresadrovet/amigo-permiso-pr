
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarIcon } from 'lucide-react';
import type { PermisoUnicoApplication, PermisoUnicoInspection as PermisoUnicoInspectionType } from '@/types/permisoUnico';
import { InspectionStatus } from './inspection/InspectionStatus';
import { InspectionChecklist } from './inspection/InspectionChecklist';
import { InspectionResults } from './inspection/InspectionResults';
import { InspectionScheduler, INSPECTION_CHECKLIST } from './inspection/InspectionScheduler';
import { InspectionInfo } from './inspection/InspectionInfo';

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
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Inspección de Establecimiento
          </CardTitle>
          <CardDescription>
            Programación y seguimiento de la inspección requerida para el Permiso Único
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentInspection ? (
            <div className="space-y-6">
              <InspectionStatus 
                inspection={currentInspection}
                businessAddress={application?.businessInfo.address || ''}
              />

              <InspectionChecklist checklist={currentInspection.checklist} />

              <InspectionResults inspection={currentInspection} />
            </div>
          ) : (
            <div className="space-y-6">
              <InspectionScheduler onScheduleInspection={handleScheduleInspection} />

              <Separator />

              <InspectionInfo />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
