
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

interface TotalInvestmentCardProps {
  amount: number;
}

export const TotalInvestmentCard = ({ amount }: TotalInvestmentCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Inversión Total</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${amount.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">
          En permisos y licencias
        </p>
      </CardContent>
    </Card>
  );
};
