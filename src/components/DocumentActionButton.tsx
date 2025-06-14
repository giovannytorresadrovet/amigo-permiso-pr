
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

interface DocumentActionButtonProps {
  isVisible: boolean;
}

export const DocumentActionButton = ({ isVisible }: DocumentActionButtonProps) => {
  if (!isVisible) return null;

  return (
    <div className="text-center mt-8">
      <Button 
        size="lg"
        className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl"
      >
        Generar Reporte de Cumplimiento
        <CheckCircle className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
};
