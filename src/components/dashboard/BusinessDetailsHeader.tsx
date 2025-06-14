
import { ArrowLeft, Building, Badge, MoreVertical, Edit, FileText, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge as UIBadge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface BusinessDetailsHeaderProps {
  business: {
    id: string;
    name: string;
    type: string;
    status: string;
  };
  onBack: () => void;
}

export const BusinessDetailsHeader = ({ business, onBack }: BusinessDetailsHeaderProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Negocios
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Building className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{business.name}</h1>
            <p className="text-slate-600">{business.type}</p>
          </div>
          <UIBadge className={getStatusColor(business.status)}>
            {business.status}
          </UIBadge>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>
        
        <Button variant="outline" size="sm">
          <FileText className="w-4 h-4 mr-2" />
          Reportes
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem>
              <Share2 className="w-4 h-4 mr-2" />
              Compartir información
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="w-4 h-4 mr-2" />
              Generar certificado
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Desactivar negocio
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
