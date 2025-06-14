
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Phone, 
  MapPin, 
  Building,
  FileText,
  Camera,
  MessageSquare
} from 'lucide-react';

interface EmergencyBusinessData {
  id: string;
  name: string;
  address: string;
  permitNumber?: string;
  legalStatus: 'legal' | 'in_process' | 'illegal' | 'expiring_soon';
  ownerName: string;
  phone: string;
}

interface InspectorEmergencyModeProps {
  businessData: EmergencyBusinessData;
  language: 'es' | 'en';
  onClose: () => void;
}

export const InspectorEmergencyMode = ({ 
  businessData, 
  language, 
  onClose 
}: InspectorEmergencyModeProps) => {
  const [inspectionStatus, setInspectionStatus] = useState<'pending' | 'in_progress' | 'completed'>('pending');
  const [notes, setNotes] = useState('');

  const t = (key: string) => {
    const translations = {
      emergencyMode: language === 'es' ? 'Modo de Emergencia' : 'Emergency Mode',
      inspectorView: language === 'es' ? 'Vista del Inspector' : 'Inspector View',
      businessInfo: language === 'es' ? 'Información del Negocio' : 'Business Information',
      contactOwner: language === 'es' ? 'Contactar Propietario' : 'Contact Owner',
      takePhotos: language === 'es' ? 'Tomar Fotos' : 'Take Photos',
      addNotes: language === 'es' ? 'Agregar Notas' : 'Add Notes',
      completeInspection: language === 'es' ? 'Completar Inspección' : 'Complete Inspection',
      back: language === 'es' ? 'Regresar' : 'Back',
      address: language === 'es' ? 'Dirección' : 'Address',
      owner: language === 'es' ? 'Propietario' : 'Owner',
      phone: language === 'es' ? 'Teléfono' : 'Phone',
      permitNumber: language === 'es' ? 'Número de Permiso' : 'Permit Number',
      status: language === 'es' ? 'Estado' : 'Status',
      legal: language === 'es' ? 'Legal' : 'Legal',
      illegal: language === 'es' ? 'Ilegal' : 'Illegal',
      in_process: language === 'es' ? 'En Proceso' : 'In Process',
      expiring_soon: language === 'es' ? 'Expira Pronto' : 'Expiring Soon'
    };
    return translations[key as keyof typeof translations] || key;
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'legal':
        return {
          color: 'bg-green-500',
          textColor: 'text-green-500',
          label: t('legal')
        };
      case 'expiring_soon':
        return {
          color: 'bg-yellow-500',
          textColor: 'text-yellow-500',
          label: t('expiring_soon')
        };
      case 'in_process':
        return {
          color: 'bg-blue-500',
          textColor: 'text-blue-500',
          label: t('in_process')
        };
      case 'illegal':
        return {
          color: 'bg-red-500',
          textColor: 'text-red-500',
          label: t('illegal')
        };
      default:
        return {
          color: 'bg-gray-500',
          textColor: 'text-gray-500',
          label: status
        };
    }
  };

  const statusConfig = getStatusConfig(businessData.legalStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-700 text-white">
      {/* Header */}
      <div className="bg-red-800/50 backdrop-blur-sm border-b border-red-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="text-white hover:bg-red-700/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('back')}
              </Button>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <h1 className="text-xl font-bold">{t('emergencyMode')}</h1>
                <Badge className="bg-red-600 text-white">
                  {t('inspectorView')}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Business Information */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Building className="w-5 h-5 mr-2" />
                {t('businessInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{businessData.name}</h3>
                <Badge className={`${statusConfig.color} text-white`}>
                  {statusConfig.label}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-white/70 mt-0.5" />
                  <div>
                    <p className="text-sm text-white/70">{t('address')}</p>
                    <p className="text-white">{businessData.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-white/70 mt-0.5" />
                  <div>
                    <p className="text-sm text-white/70">{t('owner')}</p>
                    <p className="text-white">{businessData.ownerName}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-white/70 mt-0.5" />
                  <div>
                    <p className="text-sm text-white/70">{t('phone')}</p>
                    <p className="text-white">{businessData.phone}</p>
                  </div>
                </div>

                {businessData.permitNumber && (
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-white/70 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/70">{t('permitNumber')}</p>
                      <p className="text-white">{businessData.permitNumber}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Inspector Actions */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">Inspector Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white h-20"
                  onClick={() => window.open(`tel:${businessData.phone}`)}
                >
                  <div className="text-center">
                    <Phone className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm">{t('contactOwner')}</span>
                  </div>
                </Button>

                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white h-20"
                  onClick={() => {
                    // In a real app, this would open the camera
                    console.log('Opening camera for inspection photos');
                  }}
                >
                  <div className="text-center">
                    <Camera className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm">{t('takePhotos')}</span>
                  </div>
                </Button>
              </div>

              <div className="space-y-3">
                <label className="text-white text-sm font-medium">
                  {t('addNotes')}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 min-h-[100px]"
                  placeholder={language === 'es' ? 'Agregar notas de inspección...' : 'Add inspection notes...'}
                />
              </div>

              <div className="space-y-3">
                <label className="text-white text-sm font-medium">
                  Inspection Progress
                </label>
                <Progress 
                  value={inspectionStatus === 'completed' ? 100 : inspectionStatus === 'in_progress' ? 50 : 0} 
                  className="h-2"
                />
              </div>

              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                onClick={() => {
                  setInspectionStatus('completed');
                  console.log('Inspection completed for:', businessData.name);
                }}
                disabled={inspectionStatus === 'completed'}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {t('completeInspection')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Status Alert */}
        {businessData.legalStatus === 'illegal' && (
          <Alert className="mt-6 bg-red-600/20 border-red-500 text-white">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              {language === 'es' 
                ? 'ADVERTENCIA: Este negocio está operando sin permisos válidos. Se requiere acción inmediata.'
                : 'WARNING: This business is operating without valid permits. Immediate action required.'
              }
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};
