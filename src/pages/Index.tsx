
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Upload, Brain, Shield, Smartphone, Zap } from 'lucide-react';
import { BusinessSetupWizard } from '@/components/BusinessSetupWizard';
import { DocumentUploadArea } from '@/components/DocumentUploadArea';
import { PermitDiscoveryAI } from '@/components/PermitDiscoveryAI';
import { LanguageToggle } from '@/components/LanguageToggle';

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
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">PermitPR</h1>
              <p className="text-xs text-slate-400">Versión Beta Gratuita</p>
            </div>
          </div>
          <LanguageToggle currentLanguage={currentLanguage} onChange={setCurrentLanguage} />
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
            🚀 Fase 1: Completamente Gratis para Construir Confianza
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-4 font-light">
            {t.subtitle}
          </p>
          
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            {t.description}
          </p>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105"
            onClick={() => setActiveSection('wizard')}
          >
            {t.cta}
            <Zap className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Trust Metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">1,247</div>
            <div className="text-sm text-slate-400">{t.stats.businesses}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">3,891</div>
            <div className="text-sm text-slate-400">{t.stats.problems}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">94%</div>
            <div className="text-sm text-slate-400">{t.stats.success}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">156h</div>
            <div className="text-sm text-slate-400">{t.stats.time}</div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => setActiveSection('wizard')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">{t.features.wizard}</CardTitle>
              <CardDescription className="text-slate-400">{t.features.wizardDesc}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => setActiveSection('documents')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">{t.features.documents}</CardTitle>
              <CardDescription className="text-slate-400">{t.features.documentsDesc}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer transform hover:scale-105" onClick={() => setActiveSection('ai')}>
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">{t.features.ai}</CardTitle>
              <CardDescription className="text-slate-400">{t.features.aiDesc}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Additional Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700">
            <Smartphone className="w-8 h-8 text-blue-400" />
            <div>
              <h3 className="text-white font-semibold">{t.features.offline}</h3>
              <p className="text-slate-400 text-sm">{t.features.offlineDesc}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700">
            <Globe className="w-8 h-8 text-teal-400" />
            <div>
              <h3 className="text-white font-semibold">{t.features.bilingual}</h3>
              <p className="text-slate-400 text-sm">{t.features.bilingualDesc}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-6 bg-slate-800/30 rounded-lg border border-slate-700">
            <Shield className="w-8 h-8 text-purple-400" />
            <div>
              <h3 className="text-white font-semibold">{t.features.secure}</h3>
              <p className="text-slate-400 text-sm">{t.features.secureDesc}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-4 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Index;
