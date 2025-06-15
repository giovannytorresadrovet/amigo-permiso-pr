
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building2,
  FileText, 
  Calendar, 
  CreditCard, 
  AlertCircle
} from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface OverviewQuickActionsProps {
  application: PermisoUnicoApplication | null;
}

export const OverviewQuickActions = ({ application }: OverviewQuickActionsProps) => {
  const getDocumentProgress = () => {
    if (!application) return 0;
    
    const requiredDocuments = ['incorporation_certificate', 'tax_exempt_certificate', 'crim_certificate', 'municipal_license'];
    const uploadedRequiredDocs = requiredDocuments.filter(docType => 
      application.documents.some(doc => doc.type === docType && doc.status !== 'rejected')
    );
    
    return Math.round((uploadedRequiredDocs.length / requiredDocuments.length) * 100);
  };

  const documentProgress = getDocumentProgress();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {!application && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Building2 className="w-4 h-4 mr-2" />
              Comenzar Solicitud
            </Button>
          )}
          {application && application.status === 'draft' && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              Continuar Solicitud
            </Button>
          )}
          {application && documentProgress < 100 && (
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Subir Documentos
            </Button>
          )}
          {application && !application.inspectionInfo && documentProgress >= 100 && (
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Programar Inspección
            </Button>
          )}
          {application && application.fees && application.fees.paymentStatus !== 'paid' && (
            <Button variant="outline">
              <CreditCard className="w-4 h-4 mr-2" />
              Procesar Pago
            </Button>
          )}
          <Button variant="outline">
            <AlertCircle className="w-4 h-4 mr-2" />
            Contactar Soporte
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
