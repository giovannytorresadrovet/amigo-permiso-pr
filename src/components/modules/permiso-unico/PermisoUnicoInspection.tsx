
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Clock, User, CheckCircle, AlertCircle, MapPin } from 'lucide-react';
import { PermisoUnicoApplication, PermisoUnicoInspection, InspectionItem } from '@/types/permisoUnico';

interface PermisoUnicoInspectionProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  language: 'es' | 'en';
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

export const PermisoUnicoInspection = ({ application, onApplicationUpdate, language }: PermisoUnicoInspectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [inspectionNotes, setInspectionNotes] = useState('');

  const currentInspection = application?.inspectionInfo;

  const handleScheduleInspection = () => {
    if (!selectedDate || !selectedTimeSlot || !application) return;

    const scheduledDateTime = new Date(selectedDate);
    const [time, period] = selectedTimeSlot.split(' ');
    const [hours, minutes] = time.split(':');
    let hour = parseInt(hours);
    
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    
    scheduledDateTime.setHours(hour, parseInt(minutes), 0, 0);

    const newInspection: PermisoUnicoInspection = {
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

  const getStatusBadge = (status: string) => {
    const config = {
      not_scheduled: { label: 'No Programada', variant: 'secondary' as const, icon: Clock },
      scheduled: { label: 'Programada', variant: 'default' as const, icon: CalendarIcon },
      in_progress: { label: 'En Progreso', variant: 'default' as const, icon: Clock },
      completed: { label: 'Completada', variant: 'default' as const, icon: CheckCircle },
      rescheduled: { label: 'Reprogramada', variant: 'destructive' as const, icon: CalendarIcon },
      cancelled: { label: 'Cancelada', variant: 'destructive' as const, icon: AlertCircle }
    };

    const statusInfo = config[status as keyof typeof config] || config.not_scheduled;
    const Icon = statusInfo.icon;
    
    return (
      <Badge variant={statusInfo.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {statusInfo.label}
      </Badge>
    );
  };

  const getChecklistStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'not_applicable':
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  // Filter past dates for scheduling
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0 || date.getDay() === 6; // Disable weekends
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
              {/* Inspection Status */}
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Estado de la Inspección</h3>
                    {getStatusBadge(currentInspection.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>Fecha:</strong> {currentInspection.scheduledDate?.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>Hora:</strong> {currentInspection.scheduledDate?.toLocaleTimeString()}
                      </span>
                    </div>
                    {currentInspection.inspectorName && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">
                          <strong>Inspector:</strong> {currentInspection.inspectorName}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        <strong>Ubicación:</strong> {application?.businessInfo.address}
                      </span>
                    </div>
                  </div>

                  {currentInspection.status === 'scheduled' && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700 font-medium mb-1">Próxima Inspección</p>
                      <p className="text-xs text-blue-600">
                        Asegúrese de estar presente en la fecha y hora programada. 
                        El inspector revisará su establecimiento según la lista de verificación.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Inspection Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lista de Verificación</CardTitle>
                  <CardDescription>
                    Elementos que serán evaluados durante la inspección
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentInspection.checklist.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                        {getChecklistStatusIcon(item.status)}
                        <div className="flex-1">
                          <h4 className="font-medium">{item.category}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          {item.notes && (
                            <p className="text-xs text-gray-500 mt-1">
                              <strong>Notas:</strong> {item.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Inspection Results */}
              {currentInspection.status === 'completed' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Resultados de la Inspección</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Badge 
                        variant={currentInspection.passed ? 'default' : 'destructive'}
                        className="text-lg px-4 py-2"
                      >
                        {currentInspection.passed ? 'APROBADA' : 'REQUIERE CORRECCIONES'}
                      </Badge>
                    </div>

                    {!currentInspection.passed && currentInspection.deficiencies.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Deficiencias Encontradas:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {currentInspection.deficiencies.map((deficiency, index) => (
                            <li key={index} className="text-sm text-red-600">{deficiency}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {currentInspection.notes && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Notas del Inspector:</h4>
                        <p className="text-sm">{currentInspection.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Reschedule Option */}
              {currentInspection.status === 'scheduled' && (
                <div className="flex gap-2">
                  <Button variant="outline">
                    Reprogramar Inspección
                  </Button>
                  <Button variant="outline">
                    Cancelar Inspección
                  </Button>
                </div>
              )}
            </div>
          ) : (
            /* Schedule New Inspection */
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

              <Separator />

              {/* Inspection Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Información Importante</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">Preparación para la Inspección</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Asegúrese de estar presente durante la inspección</li>
                      <li>• Tenga todos los documentos disponibles</li>
                      <li>• El establecimiento debe estar listo para operar</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-1">Duración Estimada</h4>
                    <p className="text-sm text-yellow-700">
                      La inspección típicamente toma entre 1-2 horas dependiendo del tipo de establecimiento.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
