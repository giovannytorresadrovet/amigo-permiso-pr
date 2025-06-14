
import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Upload, FileText, CheckCircle, AlertTriangle, Camera, Trash2 } from 'lucide-react';

interface DocumentUploadAreaProps {
  language: 'es' | 'en';
  onBack: () => void;
}

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'uploaded' | 'validated' | 'rejected';
  score?: number;
  issues?: string[];
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

  const translations = {
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
      // Simulate file processing
      simulateDocumentProcessing(e.dataTransfer.files[0]);
    }
  }, []);

  const simulateDocumentProcessing = (file: File) => {
    // Find the first pending document and update it
    const pendingDoc = documents.find(doc => doc.status === 'pending');
    if (pendingDoc) {
      // Simulate upload
      setDocuments(prev => prev.map(doc => 
        doc.id === pendingDoc.id 
          ? { ...doc, status: 'uploaded' as const }
          : doc
      ));

      // Simulate validation after 2 seconds
      setTimeout(() => {
        const isValid = Math.random() > 0.3; // 70% chance of being valid
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-slate-400';
      case 'uploaded': return 'text-blue-400';
      case 'validated': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded': return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>;
      case 'validated': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'rejected': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  const completedDocs = documents.filter(doc => doc.status === 'validated').length;
  const totalDocs = documents.length;
  const progressPercentage = (completedDocs / totalDocs) * 100;

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
        <Card className="mb-8 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              {t.progress}
              <span className="text-2xl font-bold">{Math.round(progressPercentage)}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="h-3" />
          </CardContent>
        </Card>

        {/* Upload Area */}
        <Card className="mb-8 bg-slate-800/50 border-slate-700">
          <CardContent className="p-8">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {t.uploadArea}
              </h3>
              <p className="text-slate-400 mb-6">
                PDF, JPG, PNG hasta 10MB
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                  <input
                    type="file"
                    onChange={handleFileInput}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {t.browse}
                </Button>
                
                <span className="text-slate-400">{t.or}</span>
                
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Camera className="w-4 h-4 mr-2" />
                  {t.takePhoto}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document List */}
        <div className="grid md:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <Card key={doc.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">{doc.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(doc.status)}
                    <Badge 
                      variant="secondary" 
                      className={`${getStatusColor(doc.status)} bg-transparent border`}
                    >
                      {t[doc.status as keyof typeof t] || doc.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-slate-400">
                  {t.categories[doc.type as keyof typeof t.categories]} • {t.required}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {doc.status === 'validated' && doc.score && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">{t.score}</span>
                      <span className="text-sm font-semibold text-green-400">{doc.score}/100</span>
                    </div>
                    <Progress value={doc.score} className="h-2" />
                  </div>
                )}
                
                {doc.status === 'rejected' && doc.issues && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-red-400">{t.issues}:</h4>
                    {doc.issues.map((issue, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <AlertTriangle className="w-3 h-3 text-red-400 mt-0.5" />
                        <span className="text-xs text-red-300">{issue}</span>
                      </div>
                    ))}
                  </div>
                )}

                {doc.status === 'pending' && (
                  <div className="text-center py-4">
                    <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-400">Arrastra un archivo aquí</p>
                  </div>
                )}

                {doc.status === 'uploaded' && (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
                    <p className="text-sm text-blue-400">Analizando documento...</p>
                  </div>
                )}
              </CardContent>
            </Card>
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
