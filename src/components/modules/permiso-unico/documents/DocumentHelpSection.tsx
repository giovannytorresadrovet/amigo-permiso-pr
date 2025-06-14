
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText } from 'lucide-react';

export const DocumentHelpSection = () => {
  return (
    <>
      <Separator className="my-6" />
      
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          ¿Necesitas ayuda con los documentos? Consulta nuestra guía de documentos requeridos.
        </p>
        <Button variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          Guía de Documentos
        </Button>
      </div>
    </>
  );
};
