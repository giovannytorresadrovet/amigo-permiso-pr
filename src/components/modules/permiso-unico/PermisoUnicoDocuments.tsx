
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { PermisoUnicoApplication, DocumentType, PermisoUnicoDocument } from '@/types/permisoUnico';
import { REQUIRED_DOCUMENTS } from './documents/DocumentRequirements';
import { DocumentProgressBar } from './documents/DocumentProgressBar';
import { DocumentUploadCard } from './documents/DocumentUploadCard';
import { DocumentHelpSection } from './documents/DocumentHelpSection';

interface PermisoUnicoDocumentsProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  language: 'es' | 'en';
}

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
          <DocumentProgressBar application={application} />

          <div className="grid gap-6">
            {REQUIRED_DOCUMENTS.map((docReq) => {
              const existingDoc = getDocumentStatus(docReq.type);
              const isUploading = uploadingDocument === docReq.type;
              
              return (
                <DocumentUploadCard
                  key={docReq.type}
                  docReq={docReq}
                  existingDoc={existingDoc}
                  isUploading={isUploading}
                  onFileUpload={handleFileUpload}
                />
              );
            })}
          </div>

          <DocumentHelpSection />
        </CardContent>
      </Card>
    </div>
  );
};
