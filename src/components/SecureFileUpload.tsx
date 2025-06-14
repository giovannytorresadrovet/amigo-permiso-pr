
import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { validateFile, sanitizeFileName, RateLimiter, AuditLogger } from '@/lib/security';

interface SecureFileUploadProps {
  onFileUpload: (file: File, metadata: any) => void;
  acceptedTypes?: string[];
  maxSize?: number;
  className?: string;
  language: 'es' | 'en';
}

export const SecureFileUpload = ({
  onFileUpload,
  acceptedTypes,
  maxSize,
  className = '',
  language
}: SecureFileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const translations = {
    es: {
      uploadArea: "Arrastra documentos aquí o haz clic para subir",
      browse: "Examinar Archivos",
      takePhoto: "Tomar Foto",
      or: "o",
      processing: "Procesando archivo...",
      rateLimitExceeded: "Límite de subidas excedido. Intenta en un minuto.",
      fileAccepted: "Archivo aceptado y validado",
      securityCheck: "Verificación de seguridad completada",
      allowedTypes: "Tipos permitidos: PDF, JPG, PNG, DOC",
      maxSize: "Tamaño máximo: 25MB"
    },
    en: {
      uploadArea: "Drag documents here or click to upload",
      browse: "Browse Files",
      takePhoto: "Take Photo",
      or: "or",
      processing: "Processing file...",
      rateLimitExceeded: "Upload limit exceeded. Try again in a minute.",
      fileAccepted: "File accepted and validated",
      securityCheck: "Security check completed",
      allowedTypes: "Allowed types: PDF, JPG, PNG, DOC",
      maxSize: "Maximum size: 25MB"
    }
  };

  const t = translations[language];

  const processFile = useCallback(async (file: File) => {
    // Rate limiting check
    if (!RateLimiter.check('fileUpload')) {
      setValidationErrors([t.rateLimitExceeded]);
      AuditLogger.log({
        action: 'file_upload_rate_limit_exceeded',
        details: { fileName: file.name, fileSize: file.size }
      });
      return;
    }

    setIsProcessing(true);
    setValidationErrors([]);

    try {
      // Security validation
      const validation = validateFile(file);
      
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        AuditLogger.log({
          action: 'file_upload_validation_failed',
          details: { 
            fileName: file.name, 
            fileSize: file.size, 
            fileType: file.type,
            errors: validation.errors 
          }
        });
        return;
      }

      // Create secure file metadata
      const secureMetadata = {
        originalName: file.name,
        sanitizedName: sanitizeFileName(file.name),
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        securityValidated: true,
        checksum: await calculateChecksum(file)
      };

      // Log successful upload
      AuditLogger.log({
        action: 'file_upload_success',
        details: { 
          fileName: secureMetadata.sanitizedName,
          fileSize: file.size,
          fileType: file.type
        }
      });

      onFileUpload(file, secureMetadata);
      
    } catch (error) {
      console.error('File processing error:', error);
      setValidationErrors(['File processing failed. Please try again.']);
      
      AuditLogger.log({
        action: 'file_upload_error',
        details: { 
          fileName: file.name,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });
    } finally {
      setIsProcessing(false);
    }
  }, [onFileUpload, t]);

  // Calculate file checksum for integrity verification
  const calculateChecksum = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

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
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <Card className={`bg-slate-800/50 border-slate-700 ${className}`}>
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
          {isProcessing ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
              <p className="text-slate-400">{t.processing}</p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                {t.uploadArea}
              </h3>
              <p className="text-slate-400 mb-2">{t.allowedTypes}</p>
              <p className="text-slate-500 text-sm mb-6">{t.maxSize}</p>
              
              <div className="flex items-center justify-center space-x-4">
                <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                  <input
                    type="file"
                    onChange={handleFileInput}
                    accept={acceptedTypes?.join(',') || '.pdf,.jpg,.jpeg,.png,.doc,.docx'}
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
            </>
          )}
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="mt-4 space-y-2">
            {validationErrors.map((error, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-red-200 text-sm">{error}</span>
              </div>
            ))}
          </div>
        )}

        {/* Success Message */}
        {validationErrors.length === 0 && !isProcessing && (
          <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-200 text-sm">{t.securityCheck}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
