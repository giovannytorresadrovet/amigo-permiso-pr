
import { Button } from '@/components/ui/button';

interface FormNavigationProps {
  handleSubmit: () => void;
}

export const FormNavigation = ({ handleSubmit }: FormNavigationProps) => {
  return (
    <div className="flex justify-end gap-4">
      <Button variant="outline">
        Guardar Borrador
      </Button>
      <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
        Enviar Solicitud
      </Button>
    </div>
  );
};
