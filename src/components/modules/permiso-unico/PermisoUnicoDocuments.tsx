
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PermisoUnicoApplication, DocumentType, PermisoUnicoDocument } from '@/types/permisoUnico';
import { DocumentsHeader } from './documents/DocumentsHeader';
import { DocumentsStats } from './documents/DocumentsStats';
import { DocumentsGrid } from './documents/DocumentsGrid';
import { DocumentHelpSection } from './documents/DocumentHelpSection';

interface PermisoUnicoDocumentsProps {
  application: PermisoUnicoApplication | null;
  onApplicationUpdate: (application: PermisoUnicoApplication) => void;
  language: 'es' | 'en';
}

export const PermisoUnicoDocuments = ({ 
  application, 
  onApplicationUpdate, 
  language 
}: PermisoUnicoDocumentsProps) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const documents = application?.documents || [];

  const handleDocumentUpload = async (type: DocumentType, file: File) => {
    if (!application) return;

    setIsUploading(true);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newDocument: PermisoUnicoDocument = {
        id: crypto.randomUUID(),
        type,
        name: file.name,
        fileName: file.name,
        uploadedAt: new Date(),
        status: 'uploaded',
        required: true,
        description: `Documento subido: ${file.name}`,
        fileUrl: URL.createObjectURL(file)
      };

      const updatedDocuments = [
        ...documents.filter(doc => doc.type !== type),
        newDocument
      ];

      const updatedApplication = {
        ...application,
        documents: updatedDocuments,
        lastUpdated: new Date()
      };

      onApplicationUpdate(updatedApplication);
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <DocumentsHeader />
        <CardContent className="space-y-6">
          <DocumentsStats documents={documents} />
          
          <Separator />
          
          <DocumentsGrid 
            documents={documents}
            onDocumentUpload={handleDocumentUpload}
          />
          
          <Separator />
          
          <DocumentHelpSection />
        </CardContent>
      </Card>
    </div>
  );
};
