
import { PermisoUnicoDocument, DocumentType } from '@/types/permisoUnico';
import { DocumentUploadCard } from './DocumentUploadCard';

interface DocumentsGridProps {
  documents: PermisoUnicoDocument[];
  onDocumentUpload: (type: DocumentType, file: File) => void;
}

const REQUIRED_DOCUMENTS: { type: DocumentType; name: string; description: string }[] = [
  {
    type: 'incorporation_certificate',
    name: 'Certificado de Incorporación',
    description: 'Certificado expedido por el Departamento de Estado'
  },
  {
    type: 'tax_exempt_certificate',
    name: 'Certificado de Exención Contributiva',
    description: 'Si aplica para exención de impuestos'
  },
  {
    type: 'crim_certificate',
    name: 'Certificado CRIM',
    description: 'Centro de Recaudación de Ingresos Municipales'
  },
  {
    type: 'municipal_license',
    name: 'Licencia Municipal',
    description: 'Licencia del municipio donde opera'
  },
  {
    type: 'fire_department_permit',
    name: 'Permiso de Bomberos',
    description: 'Certificación del Cuerpo de Bomberos'
  },
  {
    type: 'health_permit',
    name: 'Permiso de Salud',
    description: 'Si aplica según el tipo de negocio'
  },
  {
    type: 'environmental_permit',
    name: 'Permiso Ambiental',
    description: 'Si aplica según la actividad comercial'
  },
  {
    type: 'zoning_certification',
    name: 'Certificación de Zonificación',
    description: 'Confirmación de uso de suelo permitido'
  }
];

export const DocumentsGrid = ({ documents, onDocumentUpload }: DocumentsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {REQUIRED_DOCUMENTS.map((docType) => {
        const uploadedDoc = documents.find(doc => doc.type === docType.type);
        
        return (
          <DocumentUploadCard
            key={docType.type}
            documentType={docType.type}
            title={docType.name}
            description={docType.description}
            uploadedDocument={uploadedDoc}
            onUpload={(file) => onDocumentUpload(docType.type, file)}
          />
        );
      })}
    </div>
  );
};
