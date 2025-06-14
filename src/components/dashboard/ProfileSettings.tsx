import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, Bell, Shield, Globe, Save, ArrowLeft, MapPin, ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUserManagement } from '@/contexts/UserManagementContext';
import { VerificationStatus } from '@/components/verification/VerificationStatus';

interface ProfileSettingsProps {
  onBack?: () => void;
}

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

export const ProfileSettings = ({ onBack }: ProfileSettingsProps) => {
  const { user, businessCreationAccess, startVerification, isLoading } = useUserManagement();
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (787) 555-0123',
    company: 'TechFlow Solutions',
    municipality: 'San Juan',
    bio: 'Experienced business owner focused on technology solutions in Puerto Rico.',
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    permitReminders: true,
    documentExpiry: true,
    marketingEmails: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    shareAnalytics: false,
    twoFactorAuth: false,
  });

  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handlePrivacyChange = (field: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Configuración guardada",
      description: "Tu perfil ha sido actualizado exitosamente.",
    });
  };

  const handleStartVerification = async () => {
    try {
      const verificationUrl = await startVerification();
      window.location.href = verificationUrl;
    } catch (error) {
      console.error('Failed to start verification:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Mobile Header */}
        {isMobile && onBack && (
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        )}

        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Configuración del Perfil</h1>
          <p className="text-slate-600 mt-2">Administra tu información personal y preferencias</p>
        </div>

        {/* Identity Verification Status */}
        <VerificationStatus language="es" showActions={true} />

        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <User className="w-5 h-5 mr-2" />
              Información Personal
            </CardTitle>
            <CardDescription>
              Actualiza tu información de perfil y detalles de contacto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <Button variant="outline" size="sm">Cambiar Foto</Button>
                <p className="text-sm text-slate-500 mt-1">JPG o PNG, máximo 5MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => handleProfileChange('firstName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => handleProfileChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="municipality">Municipio</Label>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <Select 
                  onValueChange={(value) => handleProfileChange('municipality', value)}
                  defaultValue={profile.municipality}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Selecciona tu municipio" />
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
            </div>

            <div>
              <Label htmlFor="company">Empresa</Label>
              <Input
                id="company"
                value={profile.company}
                onChange={(e) => handleProfileChange('company', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="bio">Biografía</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => handleProfileChange('bio', e.target.value)}
                placeholder="Cuéntanos sobre ti y tu negocio..."
                rows={3}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Access Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Shield className="w-5 h-5 mr-2" />
              Acceso a Funciones de Negocio
            </CardTitle>
            <CardDescription>
              Estado de verificación y permisos para crear negocios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                {businessCreationAccess.hasAccess ? (
                  <ShieldCheck className="w-6 h-6 text-green-500" />
                ) : (
                  <Shield className="w-6 h-6 text-yellow-500" />
                )}
                <div>
                  <p className="font-medium">
                    {businessCreationAccess.hasAccess 
                      ? 'Acceso Completo Habilitado' 
                      : 'Verificación Requerida'
                    }
                  </p>
                  <p className="text-sm text-slate-600">
                    {businessCreationAccess.hasAccess 
                      ? 'Puedes crear y gestionar negocios sin restricciones.'
                      : 'Necesitas verificar tu identidad para crear negocios.'
                    }
                  </p>
                </div>
              </div>
              {!businessCreationAccess.hasAccess && (
                <Button 
                  onClick={handleStartVerification}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Verificar Identidad
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Bell className="w-5 h-5 mr-2" />
              Notificaciones
            </CardTitle>
            <CardDescription>
              Configura cómo quieres recibir actualizaciones y recordatorios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex-1">
                <Label>Actualizaciones por Email</Label>
                <p className="text-sm text-slate-500">Recibe updates sobre tu cuenta y permisos</p>
              </div>
              <Switch
                checked={notifications.emailUpdates}
                onCheckedChange={(checked) => handleNotificationChange('emailUpdates', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex-1">
                <Label>Recordatorios de Permisos</Label>
                <p className="text-sm text-slate-500">Notificaciones sobre fechas límite importantes</p>
              </div>
              <Switch
                checked={notifications.permitReminders}
                onCheckedChange={(checked) => handleNotificationChange('permitReminders', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex-1">
                <Label>Vencimiento de Documentos</Label>
                <p className="text-sm text-slate-500">Alertas cuando documentos están por vencer</p>
              </div>
              <Switch
                checked={notifications.documentExpiry}
                onCheckedChange={(checked) => handleNotificationChange('documentExpiry', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex-1">
                <Label>Emails de Marketing</Label>
                <p className="text-sm text-slate-500">Ofertas especiales y actualizaciones del producto</p>
              </div>
              <Switch
                checked={notifications.marketingEmails}
                onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Shield className="w-5 h-5 mr-2" />
              Privacidad y Seguridad
            </CardTitle>
            <CardDescription>
              Controla tu privacidad y configuraciones de seguridad
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex-1">
                <Label>Perfil Público</Label>
                <p className="text-sm text-slate-500">Permitir que otros usuarios vean tu perfil</p>
              </div>
              <Switch
                checked={privacy.profileVisible}
                onCheckedChange={(checked) => handlePrivacyChange('profileVisible', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex-1">
                <Label>Compartir Analíticas</Label>
                <p className="text-sm text-slate-500">Ayúdanos a mejorar compartiendo datos anónimos</p>
              </div>
              <Switch
                checked={privacy.shareAnalytics}
                onCheckedChange={(checked) => handlePrivacyChange('shareAnalytics', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex-1">
                <Label>Autenticación de Dos Factores</Label>
                <p className="text-sm text-slate-500">Añade una capa extra de seguridad a tu cuenta</p>
              </div>
              <Switch
                checked={privacy.twoFactorAuth}
                onCheckedChange={(checked) => handlePrivacyChange('twoFactorAuth', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Globe className="w-5 h-5 mr-2" />
              Idioma y Región
            </CardTitle>
            <CardDescription>
              Personaliza tu experiencia según tu ubicación e idioma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Idioma Preferido</Label>
                <select className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <Label>Zona Horaria</Label>
                <select className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="Atlantic/Puerto_Rico">AST (Puerto Rico)</option>
                  <option value="America/New_York">EST (Nueva York)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-center sm:justify-end pb-6">
          <Button 
            onClick={handleSave} 
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
};
