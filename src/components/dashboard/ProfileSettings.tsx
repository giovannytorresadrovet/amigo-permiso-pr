
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, Bell, Shield, Globe, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ProfileSettings = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (787) 555-0123',
    company: 'TechFlow Solutions',
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
    // Here you would typically save to backend
    toast({
      title: "Configuración guardada",
      description: "Tu perfil ha sido actualizado exitosamente.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Configuración del Perfil</h1>
        <p className="text-slate-600 mt-2">Administra tu información personal y preferencias</p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Información Personal
          </CardTitle>
          <CardDescription>
            Actualiza tu información de perfil y detalles de contacto
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">Cambiar Foto</Button>
              <p className="text-sm text-slate-500 mt-1">JPG o PNG, máximo 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              />
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
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notificaciones
          </CardTitle>
          <CardDescription>
            Configura cómo quieres recibir actualizaciones y recordatorios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Actualizaciones por Email</Label>
              <p className="text-sm text-slate-500">Recibe updates sobre tu cuenta y permisos</p>
            </div>
            <Switch
              checked={notifications.emailUpdates}
              onCheckedChange={(checked) => handleNotificationChange('emailUpdates', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Recordatorios de Permisos</Label>
              <p className="text-sm text-slate-500">Notificaciones sobre fechas límite importantes</p>
            </div>
            <Switch
              checked={notifications.permitReminders}
              onCheckedChange={(checked) => handleNotificationChange('permitReminders', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Vencimiento de Documentos</Label>
              <p className="text-sm text-slate-500">Alertas cuando documentos están por vencer</p>
            </div>
            <Switch
              checked={notifications.documentExpiry}
              onCheckedChange={(checked) => handleNotificationChange('documentExpiry', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
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
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Privacidad y Seguridad
          </CardTitle>
          <CardDescription>
            Controla tu privacidad y configuraciones de seguridad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Perfil Público</Label>
              <p className="text-sm text-slate-500">Permitir que otros usuarios vean tu perfil</p>
            </div>
            <Switch
              checked={privacy.profileVisible}
              onCheckedChange={(checked) => handlePrivacyChange('profileVisible', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Compartir Analíticas</Label>
              <p className="text-sm text-slate-500">Ayúdanos a mejorar compartiendo datos anónimos</p>
            </div>
            <Switch
              checked={privacy.shareAnalytics}
              onCheckedChange={(checked) => handlePrivacyChange('shareAnalytics', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
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
          <CardTitle className="flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Idioma y Región
          </CardTitle>
          <CardDescription>
            Personaliza tu experiencia según tu ubicación e idioma
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Idioma Preferido</Label>
              <select className="w-full p-2 border border-slate-300 rounded-md">
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <Label>Zona Horaria</Label>
              <select className="w-full p-2 border border-slate-300 rounded-md">
                <option value="Atlantic/Puerto_Rico">AST (Puerto Rico)</option>
                <option value="America/New_York">EST (Nueva York)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
};
