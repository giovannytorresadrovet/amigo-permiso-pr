
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera } from 'lucide-react';
import { DocumentTranslations } from "@/types/document";

interface DocumentUploadZoneProps {
  dragActive: boolean;
  onDragEnter: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  translations: DocumentTranslations;
}

export const DocumentUploadZone = ({
  dragActive,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onFileInput,
  translations
}: DocumentUploadZoneProps) => {
  return (
    <Card className="mb-8 bg-slate-800/50 border-slate-700">
      <CardContent className="p-8">
        <div
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-blue-500 bg-blue-500/10' 
              : 'border-slate-600 hover:border-slate-500'
          }`}
        >
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">
            {translations.uploadArea}
          </h3>
          <p className="text-slate-400 mb-6">
            PDF, JPG, PNG hasta 10MB
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
              <input
                type="file"
                onChange={onFileInput}
                accept=".pdf,.jpg,.jpeg,.png"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {translations.browse}
            </Button>
            
            <span className="text-slate-400">{translations.or}</span>
            
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Camera className="w-4 h-4 mr-2" />
              {translations.takePhoto}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
