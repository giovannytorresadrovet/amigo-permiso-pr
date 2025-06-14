
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileText } from 'lucide-react';

interface DocumentsCardProps {
  completed: number;
  total: number;
}

export const DocumentsCard = ({ completed, total }: DocumentsCardProps) => {
  const progressPercentage = (completed / total) * 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Documentos</CardTitle>
        <FileText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{completed}/{total}</div>
        <div className="mt-2">
          <Progress value={progressPercentage} className="h-2" />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Documentos completados
        </p>
      </CardContent>
    </Card>
  );
};
