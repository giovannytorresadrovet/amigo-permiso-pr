
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon } from 'lucide-react';
import type { InspectionItem } from '@/types/permisoUnico';

interface InspectionSchedulerProps {
  onScheduleInspection: (date: Date, timeSlot: string, notes: string) => void;
}

const INSPECTION_CHECKLIST: InspectionItem[] = [
  {
    id: '1',
    category: 'Seguridad Estructural',
    description: 'Verificación de la integridad estructural del edificio',
    status: 'pending'
  },
  {
    id: '2',
    category: 'Sistemas Eléctricos',
    description: 'Inspección de instalaciones eléctricas y cumplimiento del código',
    status: 'pending'
  },
  {
    id: '3',
    category: 'Sistemas de Plomería',
    description: 'Verificación de sistemas de agua y desagüe',
    status: 'pending'
  },
  {
    id: '4',
    category: 'Seguridad contra Incendios',
    description: 'Evaluación de sistemas de prevención y extinción de incendios',
    status: 'pending'
  },
  {
    id: '5',
    category: 'Accesibilidad',
    description: 'Cumplimiento con regulaciones de accesibilidad (ADA)',
    status: 'pending'
  },
  {
    id: '6',
    category: 'Zonificación',
    description: 'Verificación del cumplimiento con regulaciones de zonificación',
    status: 'pending'
  }
];

const AVAILABLE_TIME_SLOTS = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

export const InspectionScheduler = ({ onScheduleInspection }: InspectionSchedulerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [inspectionNotes, setInspectionNotes] = useState('');

  const handleScheduleInspection = () => {
    if (!selectedDate || !selectedTimeSlot) return;
    onScheduleInspection(selectedDate, selectedTimeSlot, inspectionNotes);
  };

  // Filter past dates for scheduling
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6; // Disable weekends
  };

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Programar Inspección</h3>
        <p className="text-gray-600">
          Una vez que complete todos los documentos requeridos, podrá programar la inspección.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Seleccionar Fecha</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={isDateDisabled}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Horario Disponible</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar horario" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_TIME_SLOTS.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notas Adicionales</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Información adicional para el inspector (opcional)"
                value={inspectionNotes}
                onChange={(e) => setInspectionNotes(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          <Button 
            onClick={handleScheduleInspection}
            disabled={!selectedDate || !selectedTimeSlot}
            className="w-full"
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            Programar Inspección
          </Button>
        </div>
      </div>
    </div>
  );
};

export { INSPECTION_CHECKLIST };
