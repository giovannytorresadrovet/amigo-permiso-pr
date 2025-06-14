
import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { DocumentItem, DocumentTranslations } from "@/types/document";
import { DocumentProgress } from "./DocumentProgress";
import { DocumentUploadZone } from "./DocumentUploadZone";
import { DocumentCard } from "./DocumentCard";

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

  const [dragActive, setDragActive] = useState(false);

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

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      simulateDocumentProcessing(e.dataTransfer.files[0]);
    }
  }, []);

  const simulateDocumentProcessing = (file: File) => {
    const pendingDoc = documents.find(doc => doc.status === 'pending');
    if (pendingDoc) {
      setDocuments(prev => prev.map(doc => 
        doc.id === pendingDoc.id 
          ? { ...doc, status: 'uploaded' as const }
          : doc
      ));

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
      }, 2000);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateDocumentProcessing(e.target.files[0]);
    }
  };

  const completedDocs = documents.filter(doc => doc.status === 'validated').length;
  const totalDocs = documents.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Button>
          <Badge variant="secondary" className="bg-teal-500/20 text-teal-300">
            {completedDocs}/{totalDocs} {t.complete}
          </Badge>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Progress */}
        <DocumentProgress documents={documents} translations={t} />

        {/* Upload Area */}
        <DocumentUploadZone
          dragActive={dragActive}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onFileInput={handleFileInput}
          translations={t}
        />

        {/* Document List */}
        <div className="grid md:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} translations={t} />
          ))}
        </div>

        {/* Action Button */}
        {completedDocs === totalDocs && (
          <div className="text-center mt-8">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl"
            >
              Generar Reporte de Cumplimiento
              <CheckCircle className="ml-2 w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
