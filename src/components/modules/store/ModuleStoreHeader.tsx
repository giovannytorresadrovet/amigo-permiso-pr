
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ModuleStoreHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  language: 'es' | 'en';
}

export const ModuleStoreHeader = ({ 
  searchTerm, 
  onSearchChange, 
  language 
}: ModuleStoreHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <Input
          placeholder={language === 'es' ? 'Buscar módulos...' : 'Search modules...'}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};
