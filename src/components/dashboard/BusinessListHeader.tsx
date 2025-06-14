
import { useState } from 'react';
import { Search, Plus, Filter, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BusinessListHeaderProps {
  totalBusinesses: number;
  activeBusinesses: number;
  pendingBusinesses: number;
  expiringBusinesses: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (filter: string) => void;
  onNewBusiness: () => void;
  showVerificationWarning?: boolean;
}

export const BusinessListHeader = ({
  totalBusinesses,
  activeBusinesses,
  pendingBusinesses,
  expiringBusinesses,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onNewBusiness,
  showVerificationWarning = false
}: BusinessListHeaderProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Mis Negocios</h1>
          <p className="text-slate-600">
            Administra y monitorea el estado de tus negocios registrados
          </p>
        </div>
        
        <Button 
          onClick={onNewBusiness}
          className={`${showVerificationWarning ? 'bg-gray-400 hover:bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {showVerificationWarning ? (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Verificación Requerida
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Negocio
            </>
          )}
        </Button>
      </div>

      {/* Verification Warning */}
      {showVerificationWarning && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <p className="font-medium">Verificación de Identidad Requerida</p>
            <p className="text-sm mt-1">
              Para ver y crear negocios, necesitas completar la verificación de identidad. 
              Haz clic en "Verificación Requerida" para comenzar el proceso.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards - only show if not in verification warning mode */}
      {!showVerificationWarning && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold">{totalBusinesses}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Activos</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-green-600">{activeBusinesses}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">En Proceso</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-blue-600">{pendingBusinesses}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Por Vencer</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-red-600">{expiringBusinesses}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filters - only show if not in verification warning mode */}
      {!showVerificationWarning && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Buscar negocios..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
              {(statusFilter !== 'all') && (
                <Badge variant="secondary" className="ml-2">1</Badge>
              )}
            </Button>
          </div>

          {showFilters && (
            <div className="p-4 border border-slate-200 rounded-lg bg-slate-50">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Estado
                  </label>
                  <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="in_process">En proceso</SelectItem>
                      <SelectItem value="expiring_soon">Por vencer</SelectItem>
                      <SelectItem value="illegal">Irregular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
