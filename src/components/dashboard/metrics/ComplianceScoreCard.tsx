
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';

interface ComplianceScoreCardProps {
  score: number;
}

export const ComplianceScoreCard = ({ score }: ComplianceScoreCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Puntuación</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-600">{score}%</div>
        <div className="mt-2">
          <Progress value={score} className="h-2" />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Excelente cumplimiento
        </p>
      </CardContent>
    </Card>
  );
};
