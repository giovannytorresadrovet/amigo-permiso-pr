
import { useState, useMemo } from 'react';
import { EnhancedBusinessCard } from './EnhancedBusinessCard';
import { BusinessListHeader } from './BusinessListHeader';
import { NewBusinessModal } from '@/components/modals/NewBusinessModal';
import { useIsMobile } from '@/hooks/use-mobile';

interface BusinessListProps {
  onBusinessSelect: (businessId: string) => void;
}

export const BusinessList = ({ onBusinessSelect }: BusinessListProps) => {
  const [isNewBusinessModalOpen, setIsNewBusinessModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const isMobile = useIsMobile();

  // Enhanced mock data
  const businesses = [
    {
      id: '1',
      name: 'Café Luna',
      type: 'restaurant',
      typeLabel: 'Restaurante',
      description: 'Café artesanal con ambiente acogedor en el corazón de Viejo San Juan. Especialidad en café puertorriqueño y repostería local.',
      address: 'Calle Fortaleza 123',
      municipality: 'San Juan',
      zipCode: '00901',
      phone: '(787) 555-0123',
      email: 'info@cafeluna.com',
      status: 'active',
      permitCount: 5,
      lastUpdate: '2024-01-15',
      socialProvider: 'google',
      complianceScore: 95
    },
    {
      id: '2',
      name: 'TechFlow Solutions',
      type: 'technology',
      typeLabel: 'Tecnología',
      description: 'Consultoría en tecnología para pequeñas empresas y startups. Desarrollo de software y soluciones digitales.',
      address: 'Av. Ashford 456',
      municipality: 'Guaynabo',
      zipCode: '00968',
      phone: '(787) 555-0456',
      email: 'contact@techflow.pr',
      status: 'pending',
      permitCount: 3,
      lastUpdate: '2024-01-10',
      socialProvider: 'facebook',
      complianceScore: 78
    },
    {
      id: '3',
      name: 'Panadería Doña Carmen',
      type: 'retail',
      typeLabel: 'Comercio',
      description: 'Panadería tradicional puertorriqueña con más de 30 años sirviendo la comunidad con productos frescos diarios.',
      address: 'Calle Principal 789',
      municipality: 'Bayamón',
      zipCode: '00961',
      phone: '(787) 555-0789',
      email: 'panaderia@carmen.pr',
      status: 'active',
      permitCount: 7,
      lastUpdate: '2024-01-18',
      socialProvider: 'email',
      complianceScore: 88
    },
    {
      id: '4',
      name: 'Eco Adventures PR',
      type: 'services',
      typeLabel: 'Servicios',
      description: 'Tours ecológicos y aventuras en la naturaleza de Puerto Rico. Experiencias únicas en contacto con el ambiente.',
      address: 'Carr. 191 Km 4.5',
      municipality: 'Rincón',
      zipCode: '00677',
      phone: '(787) 555-0321',
      email: 'adventures@ecopr.com',
      status: 'inactive',
      permitCount: 2,
      lastUpdate: '2024-01-05',
      socialProvider: 'apple',
      complianceScore: 45
    },
    {
      id: '5',
      name: 'Farmacia San Miguel',
      type: 'healthcare',
      typeLabel: 'Salud',
      description: 'Farmacia comunitaria con servicios de salud y consultas. Comprometidos con el bienestar de la comunidad.',
      address: 'Ave. Luis Muñoz Rivera 234',
      municipality: 'Caguas',
      zipCode: '00725',
      phone: '(787) 555-0654',
      email: 'farmacia@sanmiguel.pr',
      status: 'active',
      permitCount: 8,
      lastUpdate: '2024-01-20',
      socialProvider: 'google',
      complianceScore: 92
    }
  ];

  // Filter and search logic
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(business => {
      const matchesSearch = searchQuery === '' || 
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.typeLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.municipality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || business.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: businesses.length,
      active: businesses.filter(b => b.status === 'active').length,
      pending: businesses.filter(b => b.status === 'pending').length,
      expiring: businesses.filter(b => b.complianceScore && b.complianceScore < 70).length
    };
  }, []);

  return (
    <div className="space-y-6">
      <BusinessListHeader
        totalBusinesses={stats.total}
        activeBusinesses={stats.active}
        pendingBusinesses={stats.pending}
        expiringBusinesses={stats.expiring}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onNewBusiness={() => setIsNewBusinessModalOpen(true)}
      />

      {/* Results Count */}
      {searchQuery || statusFilter !== 'all' ? (
        <div className="text-sm text-slate-600">
          Mostrando {filteredBusinesses.length} de {businesses.length} negocios
        </div>
      ) : null}

      {/* Business Grid */}
      {filteredBusinesses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-2">
            {searchQuery || statusFilter !== 'all' 
              ? 'No se encontraron negocios que coincidan con los filtros' 
              : 'No tienes negocios registrados'
            }
          </div>
          {!searchQuery && statusFilter === 'all' && (
            <button
              onClick={() => setIsNewBusinessModalOpen(true)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Registra tu primer negocio
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <EnhancedBusinessCard
              key={business.id}
              business={business}
              onBusinessSelect={onBusinessSelect}
            />
          ))}
        </div>
      )}

      <NewBusinessModal
        open={isNewBusinessModalOpen}
        onOpenChange={setIsNewBusinessModalOpen}
        onSuccess={() => {
          console.log('Business created successfully');
        }}
      />
    </div>
  );
};
