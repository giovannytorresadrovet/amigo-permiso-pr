
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal } from 'lucide-react';

const permits = [
  {
    id: 'PR-001',
    title: 'Restaurant Liquor License',
    status: 'approved',
    date: '2024-01-15',
    type: 'Liquor License',
  },
  {
    id: 'PR-002',
    title: 'Construction Permit',
    status: 'in-progress',
    date: '2024-01-20',
    type: 'Construction',
  },
  {
    id: 'PR-003',
    title: 'Business Operation License',
    status: 'pending',
    date: '2024-01-25',
    type: 'Business',
  },
  {
    id: 'PR-004',
    title: 'Health Department Permit',
    status: 'requires-action',
    date: '2024-01-30',
    type: 'Health',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'in-progress':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'pending':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'requires-action':
      return 'bg-red-50 text-red-700 border-red-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
};

export const PermitsList = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Recent Permits</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {permits.map((permit) => (
            <div
              key={permit.id}
              className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-slate-800">{permit.title}</h4>
                  <Badge className={`border ${getStatusColor(permit.status)}`}>
                    {permit.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                  <span>{permit.id}</span>
                  <span>•</span>
                  <span>{permit.type}</span>
                  <span>•</span>
                  <span>{permit.date}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
