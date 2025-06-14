
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BusinessListStatsProps {
  totalBusinesses: number;
  activeBusinesses: number;
  pendingBusinesses: number;
  expiringBusinesses: number;
}

export const BusinessListStats = ({
  totalBusinesses,
  activeBusinesses,
  pendingBusinesses,
  expiringBusinesses
}: BusinessListStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Total</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold">{totalBusinesses}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Activos</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold text-green-600">{activeBusinesses}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">En Proceso</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold text-blue-600">{pendingBusinesses}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Por Vencer</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-2xl font-bold text-red-600">{expiringBusinesses}</div>
        </CardContent>
      </Card>
    </div>
  );
};
