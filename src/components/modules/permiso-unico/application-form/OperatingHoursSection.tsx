
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { OperatingHours } from '@/types/permisoUnico';
import { Clock } from 'lucide-react';

interface OperatingHoursSectionProps {
  operatingHours: OperatingHours;
  handleOperatingHoursChange: (day: keyof OperatingHours, field: string, value: any) => void;
}

const dayTranslations: { [key: string]: string } = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

export const OperatingHoursSection = ({ operatingHours, handleOperatingHoursChange }: OperatingHoursSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Horario de Operación
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(operatingHours).map(([day, hours]) => (
            <div key={day} className="flex items-center gap-4">
              <div className="w-24 text-sm font-medium capitalize">
                {dayTranslations[day]}
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={hours.isOpen}
                    onChange={(e) => handleOperatingHoursChange(day as keyof OperatingHours, 'isOpen', e.target.checked)}
                  />
                  <span className="text-sm">Abierto</span>
                </label>
                {hours.isOpen && (
                  <>
                    <Input
                      type="time"
                      value={hours.openTime}
                      onChange={(e) => handleOperatingHoursChange(day as keyof OperatingHours, 'openTime', e.target.value)}
                      className="w-32"
                    />
                    <span className="text-sm">a</span>
                    <Input
                      type="time"
                      value={hours.closeTime}
                      onChange={(e) => handleOperatingHoursChange(day as keyof OperatingHours, 'closeTime', e.target.value)}
                      className="w-32"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
