
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { FileText, Upload, CheckCircle, AlertCircle, Clock, Camera } from 'lucide-react';
import { PermisoUnicoApplication, DocumentType, PermisoUnicoDocument } from '@/types/permisoUnico';
import { SecureFileUpload } from '@/components/SecureFileUpload';

interface PermisoUnicoDocumentsProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  language: 'es' | 'en';
}

const REQUIRED_DOCUMENTS: Array<{
  type: DocumentType;
  name: string;
  description: string;
  required: boolean;
}> = [
  {
    type: 'incorporation_certificate',
    name: 'Certificado de Incorporación',
    description: 'Certificado de incorporación de la empresa emitido por el Departamento de Estado',
    required: true
  },
  {
    type: 'tax_exempt_certificate',
    name: 'Certificado de Exención Contributiva',
    description: 'Certificado de exención contributiva del Departamento de Hacienda',
    required: true
  },
  {
    type: 'crim_certificate',
    name: 'Certificado CRIM',
    description: 'Certificación del Centro de Recaudación de Ingresos Municipales',
    required: true
  },
  {
    type: 'municipal_license',
    name: 'Licencia Municipal',
    description: 'Licencia municipal vigente del municipio correspondiente',
    required: true
  },
  {
    type: 'zoning_certification',
    name: 'Certificación de Zonificación',
    description: 'Certificación de que el negocio cumple con las regulaciones de zonificación',
    required: false
  },
  {
    type: 'insurance_certificate',
    name: 'Certificado de Seguro',
    description: 'Certificado de póliza de seguro comercial vigente',
    required: false
  }
];

export const PermisoUnicoDocuments = ({ application, onApplicationUpdate, language }: PermisoUnicoDocumentsProps) => {
  const [uploadingDocument, setUploadingDocument] = useState<DocumentType | null>(null);

  const handleFileUpload = async (file: File, metadata: any, documentType: DocumentType) => {
    setUploadingDocument(documentType);
    
    try {
      // Simulate file upload and processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newDocument: PermisoUnicoDocument = {
        id: crypto.randomUUID(),
        type: documentType,
        name: REQUIRED_DOCUMENTS.find(d => d.type === documentType)?.name || 'Documento',
        fileName: metadata.sanitizedName,
        uploadedAt: new Date(),
        status: 'uploaded',
        required: REQUIRED_DOCUMENTS.find(d => d.type === documentType)?.required || false,
        description: REQUIRED_DOCUMENTS.find(d => d.type === documentType)?.description || '',
        fileUrl: URL.createObjectURL(file)
      };

      if (application) {
        const updatedApplication = {
          ...application,
          documents: [...application.documents.filter(d => d.type !== documentType), newDocument],
          lastUpdated: new Date()
        };
        onApplicationUpdate(updatedApplication);
      }
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setUploadingDocument(null);
    }
  };

  const getDocumentStatus = (documentType: DocumentType) => {
    return application?.documents.find(d => d.type === documentType);
  };

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { label: 'Pendiente', variant: 'secondary' as const, icon: Clock },
      uploaded: { label: 'Subido', variant: 'default' as const, icon: CheckCircle },
      under_review: { label: 'En Revisión', variant: 'default' as const, icon: Clock },
      approved: { label: 'Aprobado', variant: 'default' as const, icon: CheckCircle },
      rejected: { label: 'Rechazado', variant: 'destructive' as const, icon: AlertCircle },
      requires_update: { label: 'Requiere Actualización', variant: 'destructive' as const, icon: AlertCircle }
    };

    const statusInfo = config[status as keyof typeof config] || config.pending;
    const Icon = statusInfo.icon;
    
    return (
      <Badge variant={statusInfo.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {statusInfo.label}
      </Badge>
    );
  };

  const calculateProgress = () => {
    const requiredDocs = REQUIRED_DOCUMENTS.filter(d => d.required);
    const uploadedRequiredDocs = requiredDocs.filter(doc => 
      application?.documents.some(appDoc => appDoc.type === doc.type && appDoc.status !== 'rejected')
    );
    return Math.round((uploadedRequiredDocs.length / requiredDocs.length) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Documentos Requeridos
          </CardTitle>
          <CardDescription>
            Suba los documentos necesarios para su solicitud de Permiso Único
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progreso de Documentos</span>
              <span className="text-sm text-gray-600">{progress}% completado</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid gap-6">
            {REQUIRED_DOCUMENTS.map((docReq) => {
              const existingDoc = getDocumentStatus(docReq.type);
              const isUploading = uploadingDocument === docReq.type;
              
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
                          {existingDoc && getStatusBadge(existingDoc.status)}
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
                              <Button 
                                size="sm"
                                onClick={() => {
                                  const input = document.createElement('input');
                                  input.type = 'file';
                                  input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
                                  input.onchange = (e) => {
                                    const file = (e.target as HTMLInputElement).files?.[0];
                                    if (file) {
                                      handleFileUpload(file, { sanitizedName: file.name }, docReq.type);
                                    }
                                  };
                                  input.click();
                                }}
                              >
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
            })}
          </div>

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
        </CardContent>
      </Card>
    </div>
  );
};
