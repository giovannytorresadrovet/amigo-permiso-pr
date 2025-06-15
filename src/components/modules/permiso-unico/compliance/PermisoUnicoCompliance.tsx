
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, CheckCircle, FileText, Calendar, Eye } from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface ComplianceItem {
  id: string;
  category: string;
  requirement: string;
  status: 'compliant' | 'non_compliant' | 'pending' | 'not_applicable';
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  description: string;
  actionRequired?: string;
}

interface PermisoUnicoComplianceProps {
  application: PermisoUnicoApplication | null;
  language: 'es' | 'en';
}

export const PermisoUnicoCompliance = ({ application, language }: PermisoUnicoComplianceProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getComplianceItems = (): ComplianceItem[] => {
    if (!application) return [];

    const items: ComplianceItem[] = [
      {
        id: 'business-registration',
        category: 'Registro Legal',
        requirement: 'Certificado de Incorporación',
        status: application.documents.some(d => d.type === 'incorporation_certificate') ? 'compliant' : 'non_compliant',
        priority: 'high',
        description: 'Documento que certifica la incorporación legal del negocio',
        actionRequired: 'Subir certificado de incorporación válido'
      },
      {
        id: 'tax-certificate',
        category: 'Obligaciones Fiscales',
        requirement: 'Certificado de Exención Contributiva',
        status: application.documents.some(d => d.type === 'tax_exempt_certificate') ? 'compliant' : 'non_compliant',
        priority: 'high',
        description: 'Certificación de cumplimiento con obligaciones contributivas',
        actionRequired: 'Obtener certificado actualizado de Hacienda'
      },
      {
        id: 'crim-certificate',
        category: 'Registro Municipal',
        requirement: 'Certificado CRIM',
        status: application.documents.some(d => d.type === 'crim_certificate') ? 'compliant' : 'non_compliant',
        priority: 'high',
        description: 'Certificación del Centro de Recaudación de Ingresos Municipales',
        actionRequired: 'Presentar certificado CRIM vigente'
      },
      {
        id: 'health-permit',
        category: 'Permisos Sanitarios',
        requirement: 'Permiso del Departamento de Salud',
        status: application.businessInfo.businessType === 'restaurant' 
          ? (application.documents.some(d => d.type === 'health_permit') ? 'compliant' : 'non_compliant')
          : 'not_applicable',
        priority: 'high',
        description: 'Requerido para establecimientos que manejan alimentos',
        actionRequired: 'Solicitar inspección sanitaria'
      },
      {
        id: 'fire-permit',
        category: 'Seguridad',
        requirement: 'Permiso del Cuerpo de Bomberos',
        status: ['restaurant', 'manufacturing'].includes(application.businessInfo.businessType)
          ? (application.documents.some(d => d.type === 'fire_department_permit') ? 'compliant' : 'pending')
          : 'not_applicable',
        priority: 'medium',
        description: 'Certificación de cumplimiento con normas de seguridad contra incendios',
        actionRequired: 'Coordinar inspección con Bomberos'
      },
      {
        id: 'environmental-permit',
        category: 'Medio Ambiente',
        requirement: 'Permiso Ambiental',
        status: application.businessInfo.businessType === 'manufacturing'
          ? (application.documents.some(d => d.type === 'environmental_permit') ? 'compliant' : 'non_compliant')
          : 'not_applicable',
        priority: 'high',
        description: 'Evaluación de impacto ambiental para actividades industriales',
        actionRequired: 'Completar estudio de impacto ambiental'
      },
      {
        id: 'zoning-compliance',
        category: 'Zonificación',
        requirement: 'Certificación de Zonificación',
        status: application.documents.some(d => d.type === 'zoning_certification') ? 'compliant' : 'pending',
        priority: 'medium',
        description: 'Verificación de que el uso cumple con la zonificación municipal',
        actionRequired: 'Solicitar certificación en Oficina de Permisos'
      }
    ];

    return items.filter(item => item.status !== 'not_applicable');
  };

  const getComplianceStats = () => {
    const items = getComplianceItems();
    const total = items.length;
    const compliant = items.filter(item => item.status === 'compliant').length;
    const nonCompliant = items.filter(item => item.status === 'non_compliant').length;
    const pending = items.filter(item => item.status === 'pending').length;
    
    return {
      total,
      compliant,
      nonCompliant,
      pending,
      complianceRate: total > 0 ? Math.round((compliant / total) * 100) : 0
    };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'non_compliant': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'pending': return <Eye className="w-4 h-4 text-yellow-600" />;
      default: return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant': return <Badge className="bg-green-100 text-green-800">Cumple</Badge>;
      case 'non_compliant': return <Badge variant="destructive">No Cumple</Badge>;
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>;
      default: return <Badge variant="secondary">N/A</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive" className="text-xs">Alta</Badge>;
      case 'medium': return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Media</Badge>;
      case 'low': return <Badge variant="secondary" className="text-xs">Baja</Badge>;
      default: return null;
    }
  };

  const complianceItems = getComplianceItems();
  const stats = getComplianceStats();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Monitor de Cumplimiento
          </CardTitle>
          <CardDescription>
            Seguimiento del cumplimiento con todos los requisitos normativos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-blue-700">Requisitos Totales</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.compliant}</div>
              <div className="text-sm text-green-700">En Cumplimiento</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.nonCompliant}</div>
              <div className="text-sm text-red-700">No Cumplen</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-yellow-700">Pendientes</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Tasa de Cumplimiento</span>
              <span className="text-sm text-gray-600">{stats.complianceRate}%</span>
            </div>
            <Progress value={stats.complianceRate} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="requirements">Requisitos</TabsTrigger>
          <TabsTrigger value="actions">Acciones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Estado por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from(new Set(complianceItems.map(item => item.category))).map(category => {
                  const categoryItems = complianceItems.filter(item => item.category === category);
                  const categoryCompliant = categoryItems.filter(item => item.status === 'compliant').length;
                  const categoryRate = Math.round((categoryCompliant / categoryItems.length) * 100);

                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category}</span>
                        <span className="text-sm text-gray-600">
                          {categoryCompliant}/{categoryItems.length} ({categoryRate}%)
                        </span>
                      </div>
                      <Progress value={categoryRate} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4">
          {complianceItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <h3 className="font-medium">{item.requirement}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(item.priority)}
                    {getStatusBadge(item.status)}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{item.description}</p>
                {item.actionRequired && item.status !== 'compliant' && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800 mb-1">Acción Requerida:</p>
                    <p className="text-sm text-yellow-700">{item.actionRequired}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Acciones Prioritarias</CardTitle>
              <CardDescription>
                Elementos que requieren atención inmediata
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceItems
                  .filter(item => item.status === 'non_compliant' && item.priority === 'high')
                  .map((item) => (
                    <div key={item.id} className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-red-800">{item.requirement}</h3>
                        <Badge variant="destructive" className="text-xs">Urgente</Badge>
                      </div>
                      <p className="text-sm text-red-700 mb-3">{item.actionRequired}</p>
                      <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                        <FileText className="w-4 h-4 mr-2" />
                        Ver Detalles
                      </Button>
                    </div>
                  ))}

                {complianceItems.filter(item => item.status === 'non_compliant' && item.priority === 'high').length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
                    <p>No hay acciones urgentes pendientes</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
