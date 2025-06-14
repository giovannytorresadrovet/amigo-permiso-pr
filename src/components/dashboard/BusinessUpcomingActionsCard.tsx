
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UpcomingAction {
  action: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

interface BusinessUpcomingActionsCardProps {
  actions: UpcomingAction[];
}

export const BusinessUpcomingActionsCard = ({ actions }: BusinessUpcomingActionsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Próximas Acciones</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <div key={index} className="p-3 border rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{action.action}</p>
                <p className="text-xs text-slate-500">Fecha límite: {action.dueDate}</p>
              </div>
              <Badge 
                variant="outline" 
                className={
                  action.priority === 'high' ? 'border-red-200 text-red-700' :
                  action.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                  'border-gray-200 text-gray-700'
                }
              >
                {action.priority === 'high' ? 'Alta' : 
                 action.priority === 'medium' ? 'Media' : 'Baja'}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
