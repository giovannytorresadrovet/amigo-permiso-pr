
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, DollarSign } from 'lucide-react';

export const BusinessQuickActionsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button className="w-full" size="sm">
          <FileText className="w-4 h-4 mr-2" />
          Generar Reporte
        </Button>
        <Button className="w-full" variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          Programar Cita
        </Button>
        <Button className="w-full" variant="outline" size="sm">
          <DollarSign className="w-4 h-4 mr-2" />
          Ver Costos
        </Button>
      </CardContent>
    </Card>
  );
};
