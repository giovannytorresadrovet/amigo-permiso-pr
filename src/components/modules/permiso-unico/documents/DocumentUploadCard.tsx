
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Camera } from 'lucide-react';
import { DocumentType, PermisoUnicoDocument } from '@/types/permisoUnico';
import { DocumentStatusBadge } from './DocumentStatusBadge';

interface DocumentUploadCardProps {
  docReq: {
    type: DocumentType;
    name: string;
    description: string;
    required: boolean;
  };
  existingDoc?: PermisoUnicoDocument;
  isUploading: boolean;
  onFileUpload: (file: File, metadata: any, documentType: DocumentType) => void;
}

export const DocumentUploadCard = ({ 
  docReq, 
  existingDoc, 
  isUploading, 
  onFileUpload 
}: DocumentUploadCardProps) => {
  const handleFileSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onFileUpload(file, { sanitizedName: file.name }, docReq.type);
      }
    };
    input.click();
  };

  return (
    <Card key={docReq.type} className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{docReq.name}</h4>
              {docReq.required && (
                <Badge variant="outline" className="text-xs">Requerido</Badge>
              )}
              {existingDoc && <DocumentStatusBadge status={existingDoc.status} />}
            </div>
            <p className="text-sm text-gray-600 mb-3">{docReq.description}</p>
          </div>
        </div>

        {existingDoc ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-4 h-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">{existingDoc.fileName}</p>
                <p className="text-xs text-gray-500">
                  Subido el {existingDoc.uploadedAt.toLocaleDateString()}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Ver
              </Button>
            </div>
            
            {existingDoc.status === 'rejected' && (
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
              disabled={isUploading}
              onClick={handleFileSelect}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? 'Subiendo...' : 'Reemplazar Documento'}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {isUploading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">Subiendo documento...</p>
              </div>
            ) : (
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
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
