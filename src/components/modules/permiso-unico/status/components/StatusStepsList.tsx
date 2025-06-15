
import { StatusStep } from '../utils/statusUtils';
import { StatusStepItem } from './StatusStepItem';

interface StatusStepsListProps {
  steps: StatusStep[];
}

export const StatusStepsList = ({ steps }: StatusStepsListProps) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <StatusStepItem 
          key={step.id} 
          step={step} 
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
};
