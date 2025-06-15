
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Clock, DollarSign, Users, FileText, Award } from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface PermisoUnicoAnalyticsProps {
  applications: PermisoUnicoApplication[];
  language: 'es' | 'en';
}

export const PermisoUnicoAnalytics = ({ applications, language }: PermisoUnicoAnalyticsProps) => {
  const getStatusDistribution = () => {
    const statusCounts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status,
      value: count,
      percentage: Math.round((count / applications.length) * 100)
    }));
  };

  const getProcessingTimeAnalysis = () => {
    const completedApps = applications.filter(app => app.status === 'approved' && app.submittedAt);
    
    if (completedApps.length === 0) return { average: 0, distribution: [] };

    const processingTimes = completedApps.map(app => {
      const submitted = app.submittedAt!;
      const completed = app.lastUpdated;
      return Math.ceil((completed.getTime() - submitted.getTime()) / (1000 * 60 * 60 * 24));
    });

    const average = Math.round(processingTimes.reduce((sum, time) => sum + time, 0) / processingTimes.length);

    const distribution = [
      { range: '0-15 días', count: processingTimes.filter(t => t <= 15).length },
      { range: '16-30 días', count: processingTimes.filter(t => t > 15 && t <= 30).length },
      { range: '31-45 días', count: processingTimes.filter(t => t > 30 && t <= 45).length },
      { range: '45+ días', count: processingTimes.filter(t => t > 45).length }
    ];

    return { average, distribution };
  };

  const getBusinessTypeAnalysis = () => {
    const typeCounts = applications.reduce((acc, app) => {
      const type = app.businessInfo.businessType;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCounts).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / applications.length) * 100)
    }));
  };

  const getRevenueAnalysis = () => {
    const totalRevenue = applications.reduce((sum, app) => {
      return sum + (app.fees?.totalAmount || 0);
    }, 0);

    const paidRevenue = applications.reduce((sum, app) => {
      return sum + (app.fees?.paidAmount || 0);
    }, 0);

    const monthlyData = [
      { month: 'Ene', revenue: totalRevenue * 0.08 },
      { month: 'Feb', revenue: totalRevenue * 0.09 },
      { month: 'Mar', revenue: totalRevenue * 0.11 },
      { month: 'Abr', revenue: totalRevenue * 0.10 },
      { month: 'May', revenue: totalRevenue * 0.12 },
      { month: 'Jun', revenue: totalRevenue * 0.13 }
    ];

    return { totalRevenue, paidRevenue, monthlyData };
  };

  const statusDistribution = getStatusDistribution();
  const processingTimeAnalysis = getProcessingTimeAnalysis();
  const businessTypeAnalysis = getBusinessTypeAnalysis();
  const revenueAnalysis = getRevenueAnalysis();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Solicitudes</p>
                <p className="text-2xl font-bold">{applications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Aprobadas</p>
                <p className="text-2xl font-bold">
                  {applications.filter(app => app.status === 'approved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tiempo Promedio</p>
                <p className="text-2xl font-bold">{processingTimeAnalysis.average} días</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ingresos Totales</p>
                <p className="text-2xl font-bold">${revenueAnalysis.totalRevenue.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribución por Estado</CardTitle>
            <CardDescription>Solicitudes por estado actual</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tipos de Negocio</CardTitle>
            <CardDescription>Distribución por sector</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={businessTypeAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tiempo de Procesamiento</CardTitle>
            <CardDescription>Distribución de tiempos de aprobación</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processingTimeAnalysis.distribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ingresos Mensuales</CardTitle>
            <CardDescription>Tendencia de ingresos por tarifas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueAnalysis.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${Number(value).toFixed(0)}`, 'Ingresos']} />
                <Line type="monotone" dataKey="revenue" stroke="#FF8042" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Indicadores de Rendimiento</CardTitle>
          <CardDescription>Métricas clave del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Tasa de Aprobación</span>
                <span className="text-sm text-gray-600">
                  {Math.round((applications.filter(app => app.status === 'approved').length / applications.length) * 100)}%
                </span>
              </div>
              <Progress 
                value={Math.round((applications.filter(app => app.status === 'approved').length / applications.length) * 100)} 
                className="h-2" 
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Eficiencia de Cobros</span>
                <span className="text-sm text-gray-600">
                  {Math.round((revenueAnalysis.paidRevenue / revenueAnalysis.totalRevenue) * 100)}%
                </span>
              </div>
              <Progress 
                value={Math.round((revenueAnalysis.paidRevenue / revenueAnalysis.totalRevenue) * 100)} 
                className="h-2" 
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Solicitudes Completadas</span>
                <span className="text-sm text-gray-600">
                  {Math.round((applications.filter(app => ['approved', 'rejected'].includes(app.status)).length / applications.length) * 100)}%
                </span>
              </div>
              <Progress 
                value={Math.round((applications.filter(app => ['approved', 'rejected'].includes(app.status)).length / applications.length) * 100)} 
                className="h-2" 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
