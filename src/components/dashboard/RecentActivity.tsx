
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    title: 'Document uploaded for PR-002',
    description: 'Construction plans submitted for review',
    time: '2 hours ago',
    icon: FileText,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    id: 2,
    title: 'Permit PR-001 approved',
    description: 'Restaurant Liquor License has been approved',
    time: '1 day ago',
    icon: CheckCircle,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
  },
  {
    id: 3,
    title: 'New comment on PR-004',
    description: 'Health inspector requested additional documentation',
    time: '2 days ago',
    icon: MessageSquare,
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-50',
  },
  {
    id: 4,
    title: 'Action required for PR-004',
    description: 'Missing fire safety certificate',
    time: '3 days ago',
    icon: AlertCircle,
    iconColor: 'text-red-600',
    iconBg: 'bg-red-50',
  },
];

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${activity.iconBg}`}>
                <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800">{activity.title}</p>
                <p className="text-sm text-slate-500 mt-1">{activity.description}</p>
                <p className="text-xs text-slate-400 mt-2">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
