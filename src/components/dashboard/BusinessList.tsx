
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Phone, Mail, Plus, Eye, MoreVertical } from 'lucide-react';
import { NewBusinessModal } from '@/components/modals/NewBusinessModal';
import { useIsMobile } from '@/hooks/use-mobile';

interface BusinessListProps {
  onBusinessSelect: (businessId: string) => void;
}

export const BusinessList = ({ onBusinessSelect }: BusinessListProps) => {
  const [isNewBusinessModalOpen, setIsNewBusinessModalOpen] = useState(false);
  const isMobile = useIsMobile();

  // Enhanced mock data with more realistic scenarios
  const businesses = [
    {
      id: '1',
      name: 'Café Luna',
      type: 'restaurant',
      typeLabel: 'Restaurante',
      description: 'Café artesanal con ambiente acogedor en el corazón de Viejo San Juan',
      address: 'Calle Fortaleza 123',
      municipality: 'San Juan',
      zipCode: '00901',
      phone: '(787) 555-0123',
      email: 'info@cafeluna.com',
      status: 'active',
      permitCount: 5,
      lastUpdate: '2024-01-15',
      socialProvider: 'google' // Mock: registered via Google
    },
    {
      id: '2',
      name: 'TechFlow Solutions',
      type: 'technology',
      typeLabel: 'Tecnología',
      description: 'Consultoría en tecnología para pequeñas empresas y startups',
      address: 'Av. Ashford 456',
      municipality: 'Guaynabo',
      zipCode: '00968',
      phone: '(787) 555-0456',
      email: 'contact@techflow.pr',
      status: 'pending',
      permitCount: 3,
      lastUpdate: '2024-01-10',
      socialProvider: 'facebook' // Mock: registered via Facebook
    },
    {
      id: '3',
      name: 'Panadería Doña Carmen',
      type: 'retail',
      typeLabel: 'Comercio',
      description: 'Panadería tradicional puertorriqueña con más de 30 años sirviendo la comunidad',
      address: 'Calle Principal 789',
      municipality: 'Bayamón',
      zipCode: '00961',
      phone: '(787) 555-0789',
      email: 'panaderia@carmen.pr',
      status: 'active',
      permitCount: 7,
      lastUpdate: '2024-01-18',
      socialProvider: 'email' // Mock: registered via email
    },
    {
      id: '4',
      name: 'Eco Adventures PR',
      type: 'services',
      typeLabel: 'Servicios',
      description: 'Tours ecológicos y aventuras en la naturaleza de Puerto Rico',
      address: 'Carr. 191 Km 4.5',
      municipality: 'Rincón',
      zipCode: '00677',
      phone: '(787) 555-0321',
      email: 'adventures@ecopr.com',
      status: 'inactive',
      permitCount: 2,
      lastUpdate: '2024-01-05',
      socialProvider: 'apple' // Mock: registered via Apple
    },
    {
      id: '5',
      name: 'Farmacia San Miguel',
      type: 'healthcare',
      typeLabel: 'Salud',
      description: 'Farmacia comunitaria con servicios de salud y consultas',
      address: 'Ave. Luis Muñoz Rivera 234',
      municipality: 'Caguas',
      zipCode: '00725',
      phone: '(787) 555-0654',
      email: 'farmacia@sanmiguel.pr',
      status: 'active',
      permitCount: 8,
      lastUpdate: '2024-01-20',
      socialProvider: 'google' // Mock: registered via Google
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'pending':
        return 'Pendiente';
      case 'inactive':
        return 'Inactivo';
      default:
        return status;
    }
  };

  const getSocialProviderBadge = (provider: string) => {
    if (provider === 'email') return null;
    
    const providerConfig = {
      google: { name: 'Google', color: 'bg-blue-100 text-blue-800' },
      facebook: { name: 'Facebook', color: 'bg-blue-100 text-blue-800' },
      apple: { name: 'Apple', color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = providerConfig[provider as keyof typeof providerConfig];
    if (!config) return null;
    
    return (
      <Badge variant="outline" className={`text-xs ${config.color}`}>
        via {config.name}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Mis Negocios</h1>
          <p className="text-slate-600 mt-1">Administra tus negocios y sus permisos</p>
        </div>
        <Button 
          onClick={() => setIsNewBusinessModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          size={isMobile ? "default" : "default"}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Negocio
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <Card key={business.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{business.name}</CardTitle>
                    <CardDescription className="text-sm">{business.typeLabel}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge className={getStatusColor(business.status)}>
                    {getStatusText(business.status)}
                  </Badge>
                  {getSocialProviderBadge(business.socialProvider)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600 line-clamp-2">{business.description}</p>
              
              <div className="space-y-2 text-sm text-slate-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="truncate">{business.address}, {business.municipality}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{business.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{business.email}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-slate-500">
                  {business.permitCount} permisos
                </span>
                <Button
                  onClick={() => onBusinessSelect(business.id)}
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-50"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Ver detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewBusinessModal
        open={isNewBusinessModalOpen}
        onOpenChange={setIsNewBusinessModalOpen}
        onSuccess={() => {
          // Refresh the business list or handle success
          console.log('Business created successfully');
        }}
      />
    </div>
  );
};
