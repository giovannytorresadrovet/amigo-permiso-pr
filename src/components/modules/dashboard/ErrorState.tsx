
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  language: 'es' | 'en';
  error: string;
  onRetry: () => void;
}

export const ErrorState = ({ language, error, onRetry }: ErrorStateProps) => {
  return (
    <Card className="border-red-200">
      <CardContent className="p-6">
        <div className="text-red-600 mb-4">
          {language === 'es' ? 'Error al cargar módulos' : 'Error loading modules'}
        </div>
        <p className="text-sm text-gray-600 mb-4">{error}</p>
        <Button onClick={onRetry} variant="outline">
          {language === 'es' ? 'Reintentar' : 'Retry'}
        </Button>
      </CardContent>
    </Card>
  );
};
