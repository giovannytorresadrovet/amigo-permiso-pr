
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';

export const InspectionHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <CalendarIcon className="w-5 h-5" />
        Inspección de Establecimiento
      </CardTitle>
      <CardDescription>
        Programación y seguimiento de la inspección requerida para el Permiso Único
      </CardDescription>
    </CardHeader>
  );
};
