
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type ComplianceStatus } from '@/lib/compliance/complianceManager';

interface ComplianceTabsContentProps {
  complianceStatus: ComplianceStatus;
  language: 'es' | 'en';
}

export const ComplianceTabsContent = ({ complianceStatus, language }: ComplianceTabsContentProps) => {
  const getMaturityBadge = (tier: string) => {
    const colors = {
      tier1: 'bg-red-500/20 text-red-300',
      tier2: 'bg-yellow-500/20 text-yellow-300', 
      tier3: 'bg-blue-500/20 text-blue-300',
      tier4: 'bg-green-500/20 text-green-300'
    };
    return colors[tier as keyof typeof colors] || colors.tier1;
  };

  return (
    <Tabs defaultValue="nist" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
        <TabsTrigger value="nist" className="text-slate-300 data-[state=active]:text-white">
          NIST Framework
        </TabsTrigger>
        <TabsTrigger value="soc2" className="text-slate-300 data-[state=active]:text-white">
          SOC2 Compliance
        </TabsTrigger>
        <TabsTrigger value="tasks" className="text-slate-300 data-[state=active]:text-white">
          {language === 'es' ? 'Tareas' : 'Tasks'}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="nist" className="space-y-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              {language === 'es' ? 'Estado del Marco NIST' : 'NIST Framework Status'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Identify', 'Protect', 'Detect', 'Respond', 'Recover'].map((func, index) => (
                <div key={func} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">{func}</h3>
                    <p className="text-sm text-slate-400">
                      {language === 'es' ? 'Función del marco de ciberseguridad' : 'Cybersecurity framework function'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={75 + index * 5} className="w-24 h-2" />
                    <Badge className={getMaturityBadge(complianceStatus.nist.overallMaturity)}>
                      {75 + index * 5}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="soc2" className="space-y-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              {language === 'es' ? 'Criterios de Servicios de Confianza SOC2' : 'SOC2 Trust Services Criteria'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Security', status: 'operating_effectively', percentage: 95 },
                { name: 'Availability', status: 'operating_effectively', percentage: 92 },
                { name: 'Processing Integrity', status: 'designed', percentage: 78 },
                { name: 'Confidentiality', status: 'operating_effectively', percentage: 88 },
                { name: 'Privacy', status: 'designed', percentage: 72 }
              ].map((criteria) => (
                <div key={criteria.name} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <h3 className="font-medium text-white">{criteria.name}</h3>
                    <p className="text-sm text-slate-400">
                      {criteria.status === 'operating_effectively' 
                        ? (language === 'es' ? 'Operando efectivamente' : 'Operating effectively')
                        : (language === 'es' ? 'Diseñado' : 'Designed')
                      }
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Progress value={criteria.percentage} className="w-24 h-2" />
                    <Badge className={criteria.status === 'operating_effectively' 
                      ? 'bg-green-500/20 text-green-300' 
                      : 'bg-yellow-500/20 text-yellow-300'
                    }>
                      {criteria.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tasks" className="space-y-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">
              {language === 'es' ? 'Tareas de Cumplimiento Pendientes' : 'Pending Compliance Tasks'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: language === 'es' ? 'Documentar Procedimientos de Respuesta a Incidentes' : 'Document Incident Response Procedures',
                  priority: 'high',
                  dueDate: '2024-07-15',
                  framework: 'NIST'
                },
                {
                  title: language === 'es' ? 'Implementar Monitoreo de Logs Continuo' : 'Implement Continuous Log Monitoring',
                  priority: 'medium',
                  dueDate: '2024-07-30',
                  framework: 'SOC2'
                },
                {
                  title: language === 'es' ? 'Actualizar Política de Privacidad' : 'Update Privacy Policy',
                  priority: 'low',
                  dueDate: '2024-08-15',
                  framework: 'Puerto Rico'
                }
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{task.title}</h3>
                    <p className="text-sm text-slate-400">
                      {task.framework} • {language === 'es' ? 'Vence:' : 'Due:'} {task.dueDate}
                    </p>
                  </div>
                  <Badge className={
                    task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                    task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }>
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
