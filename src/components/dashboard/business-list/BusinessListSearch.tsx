
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BusinessListSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const BusinessListSearch = ({
  searchQuery,
  onSearchChange
}: BusinessListSearchProps) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
      <Input
        placeholder="Buscar negocios..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
