
import { ModernCardDescription, ModernCardTitle } from '@/components/ui/modern-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Building2, CheckCircle, MoreHorizontal } from 'lucide-react';
import { getSocialProviderBadge } from './utils/businessCardHelpers';

interface BusinessCardHeaderProps {
  business: {
    name: string;
    typeLabel: string;
    socialProvider: string;
    status: string;
  };
  statusConfig: {
    status: 'success' | 'pending' | 'error' | 'inactive';
    text: string;
  };
}

export const BusinessCardHeader = ({ business, statusConfig }: BusinessCardHeaderProps) => {
  const socialBadge = getSocialProviderBadge(business.socialProvider);

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          {business.status === 'active' && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <CheckCircle className="w-2 h-2 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <ModernCardTitle className="group-hover:text-blue-600 transition-colors truncate">
            {business.name}
          </ModernCardTitle>
          <ModernCardDescription className="flex items-center gap-2 flex-wrap">
            <span className="truncate">{business.typeLabel}</span>
            {socialBadge && (
              <Badge variant={socialBadge.variant} size="sm">
                via {socialBadge.name}
              </Badge>
            )}
          </ModernCardDescription>
        </div>
      </div>
      
      <div className="flex flex-col items-end space-y-2">
        <StatusIndicator status={statusConfig.status} size="sm">
          {statusConfig.text}
        </StatusIndicator>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem>Editar información</DropdownMenuItem>
            <DropdownMenuItem>Generar reporte</DropdownMenuItem>
            <DropdownMenuItem>Exportar datos</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
