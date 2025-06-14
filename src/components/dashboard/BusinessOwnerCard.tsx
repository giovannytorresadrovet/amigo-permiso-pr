
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BusinessOwnerCardProps {
  owner: string;
  taxId: string;
}

export const BusinessOwnerCard = ({ owner, taxId }: BusinessOwnerCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Propietario</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-slate-600">Nombre</p>
          <p className="font-medium text-slate-800">{owner}</p>
        </div>
        <div>
          <p className="text-sm text-slate-600">ID Fiscal</p>
          <p className="font-medium text-slate-800">{taxId}</p>
        </div>
      </CardContent>
    </Card>
  );
};
