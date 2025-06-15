
import { Separator } from '@/components/ui/separator';
import { PermisoUnicoInspection as PermisoUnicoInspectionType } from '@/types/permisoUnico';
import { InspectionStatus } from './InspectionStatus';
import { InspectionChecklist } from './InspectionChecklist';
import { InspectionResults } from './InspectionResults';
import { InspectionScheduler } from './InspectionScheduler';
import { InspectionInfo } from './InspectionInfo';

interface InspectionContentProps {
  currentInspection: PermisoUnicoInspectionType | undefined;
  businessAddress: string;
  onScheduleInspection: (selectedDate: Date, selectedTimeSlot: string, inspectionNotes: string) => void;
}

export const InspectionContent = ({ 
  currentInspection, 
  businessAddress, 
  onScheduleInspection 
}: InspectionContentProps) => {
  if (currentInspection) {
    return (
      <div className="space-y-6">
        <InspectionStatus 
          inspection={currentInspection}
          businessAddress={businessAddress}
        />

        <InspectionChecklist checklist={currentInspection.checklist} />

        <InspectionResults inspection={currentInspection} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <InspectionScheduler onScheduleInspection={onScheduleInspection} />

      <Separator />

      <InspectionInfo />
    </div>
  );
};
