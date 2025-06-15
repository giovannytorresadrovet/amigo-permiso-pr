
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Calendar, 
  DollarSign
} from 'lucide-react';
import { PermisoUnicoApplication } from '@/types/permisoUnico';

interface OverviewSummaryCardsProps {
  application: PermisoUnicoApplication | null;
}

export const OverviewSummaryCards = ({ application }: OverviewSummaryCardsProps) => {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Documents Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold">Documentos</h3>
          </div>
          <div className="space-y-2">
            <Progress value={documentProgress} className="h-2" />
            <p className="text-sm text-gray-600">
              {documentProgress}% de documentos requeridos subidos
            </p>
            <p className="text-xs text-gray-500">
              {application?.documents.length || 0} documentos subidos
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Inspection Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold">Inspección</h3>
          </div>
          <div className="space-y-2">
            {application?.inspectionInfo ? (
              <>
                <Badge variant={
                  application.inspectionInfo.status === 'completed' ? 'default' :
                  application.inspectionInfo.status === 'scheduled' ? 'default' : 'secondary'
                }>
                  {application.inspectionInfo.status === 'completed' ? 'Completada' :
                   application.inspectionInfo.status === 'scheduled' ? 'Programada' : 'Pendiente'}
                </Badge>
                {application.inspectionInfo.scheduledDate && (
                  <p className="text-sm text-gray-600">
                    {application.inspectionInfo.scheduledDate.toLocaleDateString()}
                  </p>
                )}
              </>
            ) : (
              <>
                <Badge variant="secondary">No Programada</Badge>
                <p className="text-sm text-gray-600">Pendiente de programar</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <DollarSign className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold">Pago</h3>
          </div>
          <div className="space-y-2">
            {application?.fees ? (
              <>
                <Badge variant={
                  application.fees.paymentStatus === 'paid' ? 'default' :
                  application.fees.paymentStatus === 'partial' ? 'destructive' : 'secondary'
                }>
                  {application.fees.paymentStatus === 'paid' ? 'Pagado' :
                   application.fees.paymentStatus === 'partial' ? 'Parcial' : 'Pendiente'}
                </Badge>
                <p className="text-sm text-gray-600">
                  ${application.fees.paidAmount.toFixed(2)} de ${application.fees.totalAmount.toFixed(2)}
                </p>
              </>
            ) : (
              <>
                <Badge variant="secondary">Calculando</Badge>
                <p className="text-sm text-gray-600">Tarifas por determinar</p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
