
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewBusinessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const businessTypes = [
  { value: 'restaurant', label: 'Restaurante' },
  { value: 'retail', label: 'Comercio al por menor' },
  { value: 'services', label: 'Servicios' },
  { value: 'manufacturing', label: 'Manufactura' },
  { value: 'technology', label: 'Tecnología' },
  { value: 'healthcare', label: 'Salud' },
  { value: 'education', label: 'Educación' },
  { value: 'construction', label: 'Construcción' },
  { value: 'transportation', label: 'Transporte' },
  { value: 'other', label: 'Otro' }
];

const municipalities = [
  'Adjuntas', 'Aguada', 'Aguadilla', 'Aguas Buenas', 'Aibonito', 'Arecibo',
  'Arroyo', 'Barceloneta', 'Barranquitas', 'Bayamón', 'Cabo Rojo', 'Caguas',
  'Camuy', 'Canóvanas', 'Carolina', 'Cataño', 'Cayey', 'Ceiba', 'Cidra',
  'Coamo', 'Comerío', 'Corozal', 'Culebra', 'Dorado', 'Fajardo', 'Florida',
  'Guánica', 'Guayama', 'Guayanilla', 'Guaynabo', 'Gurabo', 'Hatillo',
  'Hormigueros', 'Humacao', 'Isabela', 'Jayuya', 'Juana Díaz', 'Juncos',
  'Lajas', 'Lares', 'Las Marías', 'Las Piedras', 'Loíza', 'Luquillo',
  'Manatí', 'Maricao', 'Maunabo', 'Mayagüez', 'Moca', 'Morovis',
  'Naguabo', 'Naranjito', 'Orocovis', 'Patillas', 'Peñuelas', 'Ponce',
  'Quebradillas', 'Rincón', 'Río Grande', 'Sabana Grande', 'Salinas',
  'San Germán', 'San Juan', 'San Lorenzo', 'San Sebastián', 'Santa Isabel',
  'Toa Alta', 'Toa Baja', 'Trujillo Alto', 'Utuado', 'Vega Alta', 'Vega Baja',
  'Vieques', 'Villalba', 'Yabucoa', 'Yauco'
];

export const NewBusinessModal = ({ open, onOpenChange, onSuccess }: NewBusinessModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    address: '',
    municipality: '',
    zipCode: '',
    phone: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.municipality) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa el nombre del negocio, tipo y municipio.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Negocio creado exitosamente",
        description: `${formData.name} ha sido registrado correctamente.`
      });
      
      // Reset form
      setFormData({
        name: '',
        type: '',
        description: '',
        address: '',
        municipality: '',
        zipCode: '',
        phone: '',
        email: ''
      });
      
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al crear el negocio. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Building2 className="w-5 h-5 mr-2" />
            Registrar Nuevo Negocio
          </DialogTitle>
          <DialogDescription>
            Completa la información básica de tu negocio para comenzar con el proceso de permisos.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="businessName">Nombre del Negocio *</Label>
              <Input
                id="businessName"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ej. Café Luna"
                required
              />
            </div>

            <div>
              <Label htmlFor="businessType">Tipo de Negocio *</Label>
              <Select onValueChange={(value) => handleInputChange('type', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-slate-300 shadow-lg z-50">
                  {businessTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="hover:bg-slate-100">
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="municipality">Municipio *</Label>
              <Select onValueChange={(value) => handleInputChange('municipality', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona municipio" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-slate-300 shadow-lg z-50 max-h-60">
                  {municipalities.map((municipality) => (
                    <SelectItem key={municipality} value={municipality} className="hover:bg-slate-100">
                      {municipality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Ej. 123 Calle Principal"
              />
            </div>

            <div>
              <Label htmlFor="zipCode">Código Postal</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                placeholder="00901"
              />
            </div>

            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="(787) 555-0123"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="email">Email del Negocio</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contacto@negocio.com"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="description">Descripción del Negocio</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe brevemente tu negocio y los servicios que ofreces"
                rows={3}
                className="resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creando...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Negocio
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
