
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  {
    title: 'Total Permits',
    value: '12',
    change: '+2 this month',
    icon: FileText,
    color: 'text-blue-600',
    bg: 'bg-blue-50/50',
    border: 'border-blue-100',
  },
  {
    title: 'In Progress',
    value: '5',
    change: '3 pending review',
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50/50',
    border: 'border-amber-100',
  },
  {
    title: 'Approved',
    value: '7',
    change: '+1 this week',
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50/50',
    border: 'border-green-100',
  },
  {
    title: 'Requires Action',
    value: '2',
    change: 'Review needed',
    icon: AlertTriangle,
    color: 'text-red-600',
    bg: 'bg-red-50/50',
    border: 'border-red-100',
  },
];

export const OverviewStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow duration-200 border-0 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.border} border`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <p className="text-xs text-slate-500">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
