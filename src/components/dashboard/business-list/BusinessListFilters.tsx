
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BusinessListFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (filter: string) => void;
}

export const BusinessListFilters = ({
  statusFilter,
  onStatusFilterChange
}: BusinessListFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
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
  );
};
