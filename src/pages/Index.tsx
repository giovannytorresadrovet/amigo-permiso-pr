
import { useState } from 'react';
import { BusinessSetupWizard } from '@/components/BusinessSetupWizard';
import { DocumentUploadArea } from '@/components/DocumentUploadArea';
import { PermitDiscoveryAI } from '@/components/PermitDiscoveryAI';
import { AppHeader } from '@/components/AppHeader';
import { HeroSection } from '@/components/HeroSection';
import { TrustMetrics } from '@/components/TrustMetrics';
import { FeatureCards } from '@/components/FeatureCards';
import { AdditionalFeatures } from '@/components/AdditionalFeatures';
import { BackgroundElements } from '@/components/BackgroundElements';

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState<'es' | 'en'>('es');
  const [activeSection, setActiveSection] = useState<'home' | 'wizard' | 'documents' | 'ai'>('home');

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

  if (activeSection === 'wizard') {
    return <BusinessSetupWizard language={currentLanguage} onBack={() => setActiveSection('home')} />;
  }

  if (activeSection === 'documents') {
    return <DocumentUploadArea language={currentLanguage} onBack={() => setActiveSection('home')} />;
  }

  if (activeSection === 'ai') {
    return <PermitDiscoveryAI language={currentLanguage} onBack={() => setActiveSection('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AppHeader currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />

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
