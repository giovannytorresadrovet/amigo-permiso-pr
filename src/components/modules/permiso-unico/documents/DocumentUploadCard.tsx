
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Camera } from 'lucide-react';
import { DocumentType, PermisoUnicoDocument } from '@/types/permisoUnico';
import { DocumentStatusBadge } from './DocumentStatusBadge';

interface DocumentUploadCardProps {
  documentType: DocumentType;
  title: string;
  description: string;
  uploadedDocument?: PermisoUnicoDocument;
  onUpload: (file: File) => void;
}

export const DocumentUploadCard = ({ 
  documentType,
  title,
  description,
  uploadedDocument,
  onUpload
}: DocumentUploadCardProps) => {
  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onUpload(file);
      }
    };
    input.click();
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{title}</h4>
              <Badge variant="outline" className="text-xs">Requerido</Badge>
              {uploadedDocument && <DocumentStatusBadge status={uploadedDocument.status} />}
            </div>
            <p className="text-sm text-gray-600 mb-3">{description}</p>
          </div>
        </div>

        {uploadedDocument ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-4 h-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">{uploadedDocument.fileName}</p>
                <p className="text-xs text-gray-500">
                  Subido el {uploadedDocument.uploadedAt.toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Ver
              </Button>
            </div>
            
            {uploadedDocument.status === 'rejected' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 font-medium mb-1">Documento Rechazado</p>
                <p className="text-xs text-red-600">
                  El documento necesita ser actualizado. Suba una nueva versión.
                </p>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={handleFileSelect}
            >
              <Upload className="w-4 h-4 mr-2" />
              Reemplazar Documento
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-3">
                Arrastra el archivo aquí o haz clic para subir
              </p>
              <div className="flex items-center justify-center gap-2">
                <Button size="sm" onClick={handleFileSelect}>
                  <Upload className="w-4 h-4 mr-2" />
                  Subir Archivo
                </Button>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Tomar Foto
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                PDF, JPG, PNG, DOC hasta 25MB
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
