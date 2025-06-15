
import { PermisoUnicoDocument } from '@/types/permisoUnico';
import { DocumentProgressBar } from './DocumentProgressBar';

interface DocumentsStatsProps {
  documents: PermisoUnicoDocument[];
}

export const DocumentsStats = ({ documents }: DocumentsStatsProps) => {
  const totalRequired = 8; // Based on REQUIRED_DOCUMENTS length
  const uploaded = documents.filter(doc => doc.status !== 'pending').length;
  const approved = documents.filter(doc => doc.status === 'approved').length;
  
  return (
    <div className="space-y-4">
      <DocumentProgressBar 
        uploaded={uploaded}
        total={totalRequired}
        approved={approved}
      />
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-blue-600">{uploaded}</div>
          <div className="text-sm text-gray-600">Subidos</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">{approved}</div>
          <div className="text-sm text-gray-600">Aprobados</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-600">{totalRequired - uploaded}</div>
          <div className="text-sm text-gray-600">Pendientes</div>
        </div>
      </div>
    </div>
  );
};
