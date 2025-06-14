
import { useState, useCallback } from 'react';
import { DocumentItem, DocumentTranslations } from "@/types/document";
import { DocumentProgress } from "./DocumentProgress";
import { SecureFileUpload } from "./SecureFileUpload";
import { DocumentHeader } from "./DocumentHeader";
import { DocumentTitle } from "./DocumentTitle";
import { DocumentList } from "./DocumentList";
import { DocumentActionButton } from "./DocumentActionButton";
import { AuditLogger } from '@/lib/security';

interface DocumentUploadAreaProps {
  language: 'es' | 'en';
  onBack: () => void;
}

export const DocumentUploadArea = ({ language, onBack }: DocumentUploadAreaProps) => {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: '1', name: 'Certificado de Incorporación', type: 'legal', status: 'pending' },
    { id: '2', name: 'Registro de Comerciante', type: 'business', status: 'pending' },
    { id: '3', name: 'Permiso de Uso', type: 'zoning', status: 'pending' },
    { id: '4', name: 'Certificado de Deuda Municipal', type: 'tax', status: 'pending' },
    { id: '5', name: 'Póliza de Seguro Comercial', type: 'insurance', status: 'pending' },
  ]);

  const translations: Record<'es' | 'en', DocumentTranslations> = {
    es: {
      title: "Sistema de Validación de Documentos",
      subtitle: "Asegura que tus documentos estén listos para el gobierno con nuestro análisis inteligente",
      uploadArea: "Arrastra documentos aquí o haz clic para subir",
      takePhoto: "Tomar Foto",
      or: "o",
      browse: "Examinar Archivos",
      pending: "Pendiente",
      uploaded: "Subido",
      validated: "Validado",
      rejected: "Rechazado",
      score: "Puntaje de Calidad",
      issues: "Problemas Detectados",
      required: "Requerido",
      optional: "Opcional",
      progress: "Progreso de Documentos",
      complete: "Completado",
      categories: {
        legal: "Documentos Legales",
        business: "Registro de Negocio",
        zoning: "Zonificación",
        tax: "Documentos Fiscales",
        insurance: "Seguros"
      }
    },
    en: {
      title: "Document Intelligence System",
      subtitle: "Ensure your documents are government-ready with our intelligent analysis",
      uploadArea: "Drag documents here or click to upload",
      takePhoto: "Take Photo",
      or: "or",
      browse: "Browse Files",
      pending: "Pending",
      uploaded: "Uploaded",
      validated: "Validated",
      rejected: "Rejected",
      score: "Quality Score",
      issues: "Issues Detected",
      required: "Required",
      optional: "Optional",
      progress: "Document Progress",
      complete: "Complete",
      categories: {
        legal: "Legal Documents",
        business: "Business Registration",
        zoning: "Zoning",
        tax: "Tax Documents",
        insurance: "Insurance"
      }
    }
  };

  const t = translations[language];

  const simulateDocumentProcessing = useCallback((file: File, metadata: any) => {
    // Log the secure upload
    AuditLogger.log({
      action: 'document_upload_initiated',
      details: {
        fileName: metadata.sanitizedName,
        fileSize: file.size,
        fileType: file.type,
        checksum: metadata.checksum
      }
    });

    const pendingDoc = documents.find(doc => doc.status === 'pending');
    if (pendingDoc) {
      setDocuments(prev => prev.map(doc => 
        doc.id === pendingDoc.id 
          ? { ...doc, status: 'uploaded' as const, metadata }
          : doc
      ));

      // Simulate AI processing with security validation
      setTimeout(() => {
        const isValid = Math.random() > 0.3;
        const score = isValid ? 85 + Math.random() * 15 : 40 + Math.random() * 40;
        
        setDocuments(prev => prev.map(doc => 
          doc.id === pendingDoc.id 
            ? { 
                ...doc, 
                status: isValid ? 'validated' as const : 'rejected' as const,
                score: Math.round(score),
                issues: isValid ? [] : [
                  language === 'es' ? 'Calidad de imagen baja' : 'Low image quality',
                  language === 'es' ? 'Información incompleta' : 'Incomplete information'
                ]
              }
            : doc
        ));

        // Log processing result
        AuditLogger.log({
          action: 'document_processing_completed',
          details: {
            documentId: pendingDoc.id,
            fileName: metadata.sanitizedName,
            validationResult: isValid ? 'validated' : 'rejected',
            qualityScore: Math.round(score)
          }
        });
      }, 2000);
    }
  }, [documents, language]);

  const completedDocs = documents.filter(doc => doc.status === 'validated').length;
  const totalDocs = documents.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <DocumentHeader 
          onBack={onBack}
          completedDocs={completedDocs}
          totalDocs={totalDocs}
          translations={t}
        />

        <DocumentTitle translations={t} />

        <DocumentProgress documents={documents} translations={t} />

        <SecureFileUpload
          onFileUpload={simulateDocumentProcessing}
          language={language}
          className="mb-8"
        />

        <DocumentList documents={documents} translations={t} />

        <DocumentActionButton isVisible={completedDocs === totalDocs} />
      </div>
    </div>
  );
};
