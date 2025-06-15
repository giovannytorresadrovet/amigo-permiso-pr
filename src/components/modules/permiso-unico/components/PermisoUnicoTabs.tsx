
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Clock, CheckCircle, AlertCircle, Bell, Shield, Settings } from 'lucide-react';

interface PermisoUnicoTabsProps {
  activeTab: string;
}

export const PermisoUnicoTabs = ({ activeTab }: PermisoUnicoTabsProps) => {
  return (
    <TabsList className="grid w-full grid-cols-8">
      <TabsTrigger value="overview" className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4" />
        Resumen
      </TabsTrigger>
      <TabsTrigger value="application" className="flex items-center gap-2">
        <FileText className="w-4 h-4" />
        Solicitud
      </TabsTrigger>
      <TabsTrigger value="documents" className="flex items-center gap-2">
        <FileText className="w-4 h-4" />
        Documentos
      </TabsTrigger>
      <TabsTrigger value="inspection" className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        Inspección
      </TabsTrigger>
      <TabsTrigger value="payment" className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4" />
        Pago
      </TabsTrigger>
      <TabsTrigger value="notifications" className="flex items-center gap-2">
        <Bell className="w-4 h-4" />
        Notificaciones
      </TabsTrigger>
      <TabsTrigger value="compliance" className="flex items-center gap-2">
        <Shield className="w-4 h-4" />
        Cumplimiento
      </TabsTrigger>
      <TabsTrigger value="admin" className="flex items-center gap-2">
        <Settings className="w-4 h-4" />
        Admin
      </TabsTrigger>
    </TabsList>
  );
};
