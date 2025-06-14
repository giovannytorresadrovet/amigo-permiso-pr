
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';

interface BusinessMetricsCardsProps {
  business: {
    permitCount: number;
    employees?: number;
    established?: string;
  };
}

export const BusinessMetricsCards = ({ business }: BusinessMetricsCardsProps) => {
  // Mock data for enhanced metrics
  const metrics = {
    complianceScore: 92,
    totalInvestment: 45000,
    monthlyRevenue: 8500,
    nextRenewal: '2024-08-15',
    documentsCompleted: 8,
    totalDocuments: 10
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Puntuación</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{metrics.complianceScore}%</div>
          <div className="mt-2">
            <Progress value={metrics.complianceScore} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Excelente cumplimiento
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inversión Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${metrics.totalInvestment.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            En permisos y licencias
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Empleados</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{business.employees || 12}</div>
          <p className="text-xs text-muted-foreground">
            Trabajadores registrados
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Documentos</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.documentsCompleted}/{metrics.totalDocuments}</div>
          <div className="mt-2">
            <Progress value={(metrics.documentsCompleted / metrics.totalDocuments) * 100} className="h-2" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Documentos completados
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
