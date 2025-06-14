
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle, 
  Phone, 
  FileText, 
  Share2, 
  Download, 
  MessageCircle,
  Shield,
  Clock,
  CheckCircle,
  Copy,
  Mail
} from 'lucide-react';
import { useNotificationEffects } from '@/hooks/useNotificationEffects';

interface InspectorEmergencyModeProps {
  businessData: {
    name: string;
    address: string;
    permitNumber?: string;
    legalStatus: 'legal' | 'in_process' | 'illegal';
    ownerName: string;
    phone: string;
  };
  language: 'es' | 'en';
  onClose: () => void;
}

export const InspectorEmergencyMode = ({ businessData, language, onClose }: InspectorEmergencyModeProps) => {
  const [activeScript, setActiveScript] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const { notifySuccess, notifyError } = useNotificationEffects();

  const translations = {
    es: {
      title: 'Modo Inspector en Puerta',
      subtitle: 'Ayuda inmediata cuando un inspector llega a tu negocio',
      statusCard: 'Estado del Negocio',
      quickActions: 'Acciones Rápidas',
      communicationScripts: 'Guiones de Comunicación',
      emergencyContacts: 'Contactos de Emergencia',
      documentationSupport: 'Documentación de Soporte',
      generatePDF: 'Generar PDF de Estado',
      shareViaEmail: 'Compartir por Email',
      shareViaWhatsApp: 'Compartir por WhatsApp',
      callSupport: 'Llamar Soporte',
      callMunicipality: 'Llamar Municipio',
      whatToSay: 'Qué Decir al Inspector',
      delayTactics: 'Tácticas de Demora',
      cooperationScript: 'Guión de Cooperación',
      notes: 'Notas de la Visita',
      notesPlaceholder: 'Documenta qué dijo el inspector, qué documentos solicitó, etc.',
      copyScript: 'Copiar Guión',
      scriptCopied: 'Guión copiado al portapapeles',
      pdfGenerated: 'PDF generado exitosamente',
      emailSent: 'Email enviado',
      legal: 'Legal',
      inProcess: 'En Proceso',
      illegal: 'Ilegal'
    },
    en: {
      title: 'Inspector at Door Mode',
      subtitle: 'Immediate help when an inspector arrives at your business',
      statusCard: 'Business Status',
      quickActions: 'Quick Actions',
      communicationScripts: 'Communication Scripts',
      emergencyContacts: 'Emergency Contacts',
      documentationSupport: 'Documentation Support',
      generatePDF: 'Generate Status PDF',
      shareViaEmail: 'Share via Email',
      shareViaWhatsApp: 'Share via WhatsApp',
      callSupport: 'Call Support',
      callMunicipality: 'Call Municipality',
      whatToSay: 'What to Say to Inspector',
      delayTactics: 'Delay Tactics',
      cooperationScript: 'Cooperation Script',
      notes: 'Visit Notes',
      notesPlaceholder: 'Document what the inspector said, what documents they requested, etc.',
      copyScript: 'Copy Script',
      scriptCopied: 'Script copied to clipboard',
      pdfGenerated: 'PDF generated successfully',
      emailSent: 'Email sent',
      legal: 'Legal',
      inProcess: 'In Process',
      illegal: 'Illegal'
    }
  };

  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'legal': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'in_process': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'illegal': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const scripts = {
    es: {
      cooperation: `Buenos días/tardes. Entiendo que está realizando una inspección.

Mi nombre es ${businessData.ownerName} y soy el propietario de ${businessData.name}.

Estoy completamente dispuesto/a a cooperar con su inspección. Permítame un momento para reunir los documentos que pueda necesitar.

¿Podría indicarme específicamente qué documentos o información requiere para su inspección?

Mientras tanto, aquí tiene mi información de contacto y los datos del negocio.`,

      delay: `Buenos días/tardes. Entiendo que está aquí para una inspección.

Soy el propietario/a de este establecimiento. En este momento estoy esperando algunos documentos importantes que están en proceso de renovación.

¿Sería posible programar la inspección para la próxima semana? Esto me permitiría tener toda la documentación completa y organizada.

Puedo proporcionarle mi información de contacto para coordinar una nueva fecha que sea conveniente para ambos.`,

      emergency: `Buenos días/tardes inspector.

Reconozco que puede haber algunas deficiencias en mi documentación. Estoy trabajando activamente con mi asesor legal y contable para resolver cualquier situación pendiente.

¿Podría orientarme sobre cuáles son las próximas acciones que debo tomar?

Estoy comprometido/a a cumplir con todas las regulaciones y agradecería su orientación profesional.`
    },
    en: {
      cooperation: `Good morning/afternoon. I understand you are conducting an inspection.

My name is ${businessData.ownerName} and I am the owner of ${businessData.name}.

I am completely willing to cooperate with your inspection. Please allow me a moment to gather any documents you may need.

Could you please indicate specifically what documents or information you require for your inspection?

In the meantime, here is my contact information and business details.`,

      delay: `Good morning/afternoon. I understand you are here for an inspection.

I am the owner of this establishment. At this time, I am waiting for some important documents that are in the process of renewal.

Would it be possible to schedule the inspection for next week? This would allow me to have all documentation complete and organized.

I can provide you with my contact information to coordinate a new date that is convenient for both of us.`,

      emergency: `Good morning/afternoon inspector.

I acknowledge that there may be some deficiencies in my documentation. I am actively working with my legal and accounting advisor to resolve any pending situations.

Could you guide me on what the next actions I should take are?

I am committed to complying with all regulations and would appreciate your professional guidance.`
    }
  };

  const handleGeneratePDF = async () => {
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      notifySuccess(t.pdfGenerated, '', false);
    } catch (error) {
      notifyError('Error', 'Failed to generate PDF', true);
    }
  };

  const handleShareEmail = async () => {
    try {
      const subject = encodeURIComponent(`Business Status - ${businessData.name}`);
      const body = encodeURIComponent(`
Business: ${businessData.name}
Owner: ${businessData.ownerName}
Address: ${businessData.address}
Status: ${businessData.legalStatus}
Permit: ${businessData.permitNumber || 'N/A'}
      `);
      window.open(`mailto:?subject=${subject}&body=${body}`);
      notifySuccess(t.emailSent, '', false);
    } catch (error) {
      notifyError('Error', 'Failed to open email', true);
    }
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(`
*${businessData.name}*
Propietario: ${businessData.ownerName}
Dirección: ${businessData.address}
Estado: ${businessData.legalStatus}
Permiso: ${businessData.permitNumber || 'N/A'}
    `);
    window.open(`https://wa.me/?text=${message}`);
  };

  const handleCopyScript = async (scriptText: string) => {
    try {
      await navigator.clipboard.writeText(scriptText);
      notifySuccess(t.scriptCopied, '', false);
    } catch (error) {
      notifyError('Error', 'Failed to copy script', true);
    }
  };

  const handleCall = (number: string) => {
    window.open(`tel:${number}`);
  };

  return (
    <div className="min-h-screen bg-red-900/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Emergency Header */}
        <Alert className="border-red-500/50 bg-red-500/10">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <AlertDescription className="text-red-200 text-lg font-semibold">
            {t.title}
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Business Status & Quick Actions */}
          <div className="space-y-6">
            {/* Business Status Card */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  {t.statusCard}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Negocio:</span>
                    <span className="text-white font-medium">{businessData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Propietario:</span>
                    <span className="text-white">{businessData.ownerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Dirección:</span>
                    <span className="text-white text-sm">{businessData.address}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Estado:</span>
                    <Badge className={getStatusColor(businessData.legalStatus)}>
                      {t[businessData.legalStatus as keyof typeof t]}
                    </Badge>
                  </div>
                  {businessData.permitNumber && (
                    <div className="flex justify-between">
                      <span className="text-slate-300">Permiso:</span>
                      <span className="text-white font-mono">{businessData.permitNumber}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">{t.quickActions}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button onClick={handleGeneratePDF} className="bg-blue-600 hover:bg-blue-700">
                  <FileText className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button onClick={handleShareEmail} variant="outline" className="border-slate-600">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button onClick={handleShareWhatsApp} className="bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button onClick={() => handleCall('+1-787-555-0123')} className="bg-red-600 hover:bg-red-700">
                  <Phone className="w-4 h-4 mr-2" />
                  SOS
                </Button>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">{t.emergencyContacts}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => handleCall('+1-787-555-0199')} 
                  variant="outline" 
                  className="w-full border-slate-600 justify-start"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t.callSupport}: (787) 555-0199
                </Button>
                <Button 
                  onClick={() => handleCall('+1-787-555-0100')} 
                  variant="outline" 
                  className="w-full border-slate-600 justify-start"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t.callMunicipality}: (787) 555-0100
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Communication Scripts */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">{t.communicationScripts}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <Button
                    onClick={() => setActiveScript(activeScript === 'cooperation' ? null : 'cooperation')}
                    variant={activeScript === 'cooperation' ? 'default' : 'outline'}
                    className="justify-start"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {t.cooperationScript}
                  </Button>
                  
                  <Button
                    onClick={() => setActiveScript(activeScript === 'delay' ? null : 'delay')}
                    variant={activeScript === 'delay' ? 'default' : 'outline'}
                    className="justify-start"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {t.delayTactics}
                  </Button>
                  
                  <Button
                    onClick={() => setActiveScript(activeScript === 'emergency' ? null : 'emergency')}
                    variant={activeScript === 'emergency' ? 'default' : 'outline'}
                    className="justify-start"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {t.whatToSay}
                  </Button>
                </div>

                {activeScript && (
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-white font-medium">
                          {activeScript === 'cooperation' && t.cooperationScript}
                          {activeScript === 'delay' && t.delayTactics}
                          {activeScript === 'emergency' && t.whatToSay}
                        </h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyScript(scripts[language][activeScript as keyof typeof scripts[typeof language]])}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-slate-300 text-sm whitespace-pre-line bg-slate-800/50 p-3 rounded">
                        {scripts[language][activeScript as keyof typeof scripts[typeof language]]}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Visit Notes */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">{t.notes}</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  className="bg-slate-700 border-slate-600 text-white min-h-24"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Close Emergency Mode */}
        <div className="text-center">
          <Button onClick={onClose} size="lg" className="bg-slate-600 hover:bg-slate-700">
            Salir del Modo de Emergencia
          </Button>
        </div>
      </div>
    </div>
  );
};
