
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { ModuleStatus as ModuleStatusType } from '@/types/module';

interface ModuleStatusProps {
  status: ModuleStatusType;
  language: 'es' | 'en';
}

export const ModuleStatus = ({ status, language }: ModuleStatusProps) => {
  const getStatusIcon = (status: ModuleStatusType) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <AlertCircle className="w-4 h-4 text-slate-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'updating':
      case 'installing':
        return <Loader className="w-4 h-4 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusLabel = (status: ModuleStatusType) => {
    const labels = {
      es: {
        active: 'Activo',
        inactive: 'Inactivo',
        installing: 'Instalando',
        updating: 'Actualizando',
        error: 'Error',
        deprecated: 'Obsoleto'
      },
      en: {
        active: 'Active',
        inactive: 'Inactive',
        installing: 'Installing',
        updating: 'Updating',
        error: 'Error',
        deprecated: 'Deprecated'
      }
    };
    return labels[language][status];
  };

  return (
    <div className="flex items-center gap-1">
      {getStatusIcon(status)}
      <span className="text-sm text-slate-600">
        {getStatusLabel(status)}
      </span>
    </div>
  );
};
