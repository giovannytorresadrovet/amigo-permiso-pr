
import { useState } from 'react';
import { EnhancedPermitDiscoveryWizard } from '@/components/EnhancedPermitDiscoveryWizard';
import { DocumentUploadArea } from '@/components/DocumentUploadArea';
import { PermitDiscoveryAI } from '@/components/PermitDiscoveryAI';
import { LandingHeader } from '@/components/app/LandingHeader';
import { HeroSection } from '@/components/HeroSection';
import { TrustMetrics } from '@/components/TrustMetrics';
import { FeatureCards } from '@/components/FeatureCards';
import { AdditionalFeatures } from '@/components/AdditionalFeatures';
import { BackgroundElements } from '@/components/BackgroundElements';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { KnowledgeBase } from '@/components/KnowledgeBase';
import type { PermitDiscoveryResult } from '@/services/permitDiscoveryEngine';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'es' | 'en'>('es');
  const [activeSection, setActiveSection] = useState<'home' | 'wizard' | 'documents' | 'ai' | 'knowledge' | 'results'>('home');
  const [discoveryResults, setDiscoveryResults] = useState<PermitDiscoveryResult | null>(null);

  const translations = {
    es: {
      title: "Plataforma de Permisos Empresariales de Puerto Rico",
      subtitle: "Tu amigo conocedor para navegar permisos gubernamentales con confianza",
      description: "Descubre problemas antes de invertir. Prepárate completamente. Trabaja sin conexión cuando el gobierno falla.",
      cta: "Comenzar Análisis Gratuito",
      features: {
        wizard: "Asistente Inteligente",
        wizardDesc: "Descubre problemas de zonificación al instante",
        documents: "Validación de Documentos",
        documentsDesc: "Asegura documentos listos para el gobierno",
        ai: "Guía con IA",
        aiDesc: "Recomendaciones personalizadas de permisos",
        offline: "Funciona Sin Conexión",
        offlineDesc: "Nunca te quedes atascado por conectividad",
        bilingual: "Bilingüe",
        bilingualDesc: "Español e inglés perfectos",
        secure: "Completamente Seguro",
        secureDesc: "Protección empresarial de documentos"
      },
      stats: {
        businesses: "Negocios Ayudados",
        problems: "Problemas Evitados",
        success: "Tasa de Éxito",
        time: "Tiempo Ahorrado"
      }
    },
    en: {
      title: "Puerto Rican Business Permit Management Platform",
      subtitle: "Your knowledgeable friend for navigating government permits with confidence",
      description: "Discover problems before you invest. Prepare completely. Work offline when government fails.",
      cta: "Start Free Analysis",
      features: {
        wizard: "Smart Wizard",
        wizardDesc: "Discover zoning issues instantly",
        documents: "Document Validation",
        documentsDesc: "Ensure government-ready documents",
        ai: "AI Guidance",
        aiDesc: "Personalized permit recommendations",
        offline: "Works Offline",
        offlineDesc: "Never get stuck by connectivity",
        bilingual: "Bilingual",
        bilingualDesc: "Perfect Spanish & English",
        secure: "Fully Secure",
        secureDesc: "Enterprise document protection"
      },
      stats: {
        businesses: "Businesses Helped",
        problems: "Problems Prevented",
        success: "Success Rate",
        time: "Time Saved"
      }
    }
  };

  const t = translations[currentLanguage];

  const handleWizardComplete = (result: PermitDiscoveryResult) => {
    setDiscoveryResults(result);
    setActiveSection('results');
  };

  const handleResultsBack = () => {
    setActiveSection('home');
    setDiscoveryResults(null);
  };

  if (activeSection === 'wizard') {
    return (
      <EnhancedPermitDiscoveryWizard 
        language={currentLanguage} 
        onComplete={handleWizardComplete}
        onBack={() => setActiveSection('home')} 
      />
    );
  }

  if (activeSection === 'documents') {
    return <DocumentUploadArea language={currentLanguage} onBack={() => setActiveSection('home')} />;
  }

  if (activeSection === 'ai') {
    return <PermitDiscoveryAI language={currentLanguage} onBack={() => setActiveSection('home')} />;
  }

  if (activeSection === 'knowledge') {
    return <KnowledgeBase language={currentLanguage} onBack={() => setActiveSection('home')} />;
  }

  if (activeSection === 'results' && discoveryResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={handleResultsBack}
              className="text-slate-300 hover:text-white flex items-center space-x-2"
            >
              <span>←</span>
              <span>{currentLanguage === 'es' ? 'Regresar' : 'Back'}</span>
            </button>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {currentLanguage === 'es' ? 'Plan de Permisos Personalizado' : 'Personalized Permit Plan'}
            </h1>
            <p className="text-lg text-slate-400">
              {currentLanguage === 'es' 
                ? 'Tu hoja de ruta completa para el cumplimiento legal'
                : 'Your complete roadmap to legal compliance'
              }
            </p>
          </div>

          {/* Display detailed results */}
          <div className="grid gap-8">
            {/* Required Permits */}
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4">
                {currentLanguage === 'es' ? 'Permisos Requeridos' : 'Required Permits'}
              </h2>
              <div className="grid gap-4">
                {discoveryResults.requiredPermits.map((permit, index) => (
                  <div key={index} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-white">{permit.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded ${
                        permit.priority === 'critical' ? 'bg-red-500/20 text-red-300' :
                        permit.priority === 'high' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {permit.priority}
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">{permit.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-slate-400">
                      <div>
                        <strong>{currentLanguage === 'es' ? 'Costo:' : 'Cost:'}</strong> {permit.estimatedCost}
                      </div>
                      <div>
                        <strong>{currentLanguage === 'es' ? 'Tiempo:' : 'Time:'}</strong> {permit.processingTime}
                      </div>
                      <div>
                        <strong>{currentLanguage === 'es' ? 'Agencia:' : 'Agency:'}</strong> {permit.agency}
                      </div>
                      <div>
                        <strong>{currentLanguage === 'es' ? 'Inspección:' : 'Inspection:'}</strong> {permit.inspectionRequired ? 'Sí' : 'No'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline and Costs */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-4">
                  {currentLanguage === 'es' ? 'Cronograma' : 'Timeline'}
                </h2>
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {discoveryResults.estimatedTimeline}
                </div>
                <p className="text-slate-400">
                  {currentLanguage === 'es' 
                    ? 'Tiempo estimado desde inicio hasta completar todos los permisos'
                    : 'Estimated time from start to completing all permits'
                  }
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-4">
                  {currentLanguage === 'es' ? 'Costo Total' : 'Total Cost'}
                </h2>
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {discoveryResults.estimatedCost}
                </div>
                <p className="text-slate-400">
                  {currentLanguage === 'es' 
                    ? 'Tarifas gubernamentales estimadas'
                    : 'Estimated government fees'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex justify-between items-center p-4">
        <LandingHeader currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
        <div className="flex items-center gap-4">
          <NotificationBell />
        </div>
      </div>

      <main className="relative z-10 px-6 pb-16">
        <HeroSection 
          translations={{
            title: t.title,
            subtitle: t.subtitle,
            description: t.description,
            cta: t.cta
          }}
          onStartAnalysis={() => setActiveSection('wizard')}
        />

        <TrustMetrics translations={t.stats} />

        <FeatureCards 
          translations={t.features}
          onSectionChange={setActiveSection}
        />

        <AdditionalFeatures translations={t.features} />
      </main>

      <BackgroundElements />
    </div>
  );
};

export default Index;
