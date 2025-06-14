
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Brain, Lightbulb, AlertTriangle, Clock, DollarSign, FileText, Send } from 'lucide-react';

interface PermitDiscoveryAIProps {
  language: 'es' | 'en';
  onBack: () => void;
}

interface PermitRecommendation {
  id: string;
  name: string;
  priority: 'high' | 'medium' | 'low';
  timeframe: string;
  cost: string;
  description: string;
  requirements: string[];
  risks: string[];
}

export const PermitDiscoveryAI = ({ language, onBack }: PermitDiscoveryAIProps) => {
  const [userQuestion, setUserQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<PermitRecommendation[]>([]);

  const translations = {
    es: {
      title: "Guía con IA para Permisos",
      subtitle: "Tu amigo conocedor que entiende el sistema de permisos de Puerto Rico",
      askQuestion: "Hazme cualquier pregunta sobre permisos...",
      placeholder: "Ej. ¿Qué permisos necesito para un restaurante en Santurce?",
      send: "Enviar",
      analyzing: "Analizando tu situación...",
      recommendations: "Recomendaciones Personalizadas",
      priority: {
        high: "Alta Prioridad",
        medium: "Prioridad Media",
        low: "Prioridad Baja"
      },
      timeframe: "Tiempo Estimado",
      cost: "Costo Estimado",
      requirements: "Requisitos",
      risks: "Riesgos de No Cumplir",
      aiTips: "Consejos de IA",
      sampleQuestions: "Preguntas Frecuentes",
      questions: [
        "¿Cuáles son los permisos básicos para iniciar un negocio?",
        "¿Cómo afecta la zonificación a mi tipo de negocio?",
        "¿Qué documentos necesito para el permiso de construcción?",
        "¿Cuánto tiempo toma obtener todos los permisos?"
      ]
    },
    en: {
      title: "AI-Powered Permit Guidance",
      subtitle: "Your knowledgeable friend who understands Puerto Rico's permit system",
      askQuestion: "Ask me anything about permits...",
      placeholder: "Ex. What permits do I need for a restaurant in Santurce?",
      send: "Send",
      analyzing: "Analyzing your situation...",
      recommendations: "Personalized Recommendations",
      priority: {
        high: "High Priority",
        medium: "Medium Priority",
        low: "Low Priority"
      },
      timeframe: "Estimated Time",
      cost: "Estimated Cost",
      requirements: "Requirements",
      risks: "Risks of Non-Compliance",
      aiTips: "AI Tips",
      sampleQuestions: "Frequent Questions",
      questions: [
        "What are the basic permits needed to start a business?",
        "How does zoning affect my business type?",
        "What documents do I need for a construction permit?",
        "How long does it take to get all permits?"
      ]
    }
  };

  const t = translations[language];

  // Sample permit recommendations
  useEffect(() => {
    setRecommendations([
      {
        id: '1',
        name: language === 'es' ? 'Registro de Comerciante' : 'Business Registration',
        priority: 'high',
        timeframe: '5-7 días',
        cost: '$25-$50',
        description: language === 'es' 
          ? 'Registro oficial para operar legalmente en Puerto Rico'
          : 'Official registration to operate legally in Puerto Rico',
        requirements: [
          language === 'es' ? 'Certificado de incorporación' : 'Certificate of incorporation',
          language === 'es' ? 'Identificación del dueño' : 'Owner identification',
          language === 'es' ? 'Prueba de dirección comercial' : 'Proof of business address'
        ],
        risks: [
          language === 'es' ? 'Multas de hasta $5,000' : 'Fines up to $5,000',
          language === 'es' ? 'Cierre temporal del negocio' : 'Temporary business closure'
        ]
      },
      {
        id: '2',
        name: language === 'es' ? 'Permiso de Uso' : 'Use Permit',
        priority: 'high',
        timeframe: '15-30 días',
        cost: '$100-$300',
        description: language === 'es'
          ? 'Autorización municipal para el tipo específico de negocio'
          : 'Municipal authorization for specific business type',
        requirements: [
          language === 'es' ? 'Planos del local' : 'Property blueprints',
          language === 'es' ? 'Certificado de deuda municipal' : 'Municipal debt certificate',
          language === 'es' ? 'Inspección de bomberos' : 'Fire department inspection'
        ],
        risks: [
          language === 'es' ? 'No poder abrir el negocio' : 'Cannot open business',
          language === 'es' ? 'Problemas con seguros' : 'Insurance issues'
        ]
      },
      {
        id: '3',
        name: language === 'es' ? 'Permiso de Construcción' : 'Construction Permit',
        priority: 'medium',
        timeframe: '30-60 días',
        cost: '$200-$800',
        description: language === 'es'
          ? 'Requerido para modificaciones estructurales del local'
          : 'Required for structural modifications to the premises',
        requirements: [
          language === 'es' ? 'Planos certificados por ingeniero' : 'Engineer-certified blueprints',
          language === 'es' ? 'Estudio de suelo (si aplica)' : 'Soil study (if applicable)',
          language === 'es' ? 'Permiso ambiental' : 'Environmental permit'
        ],
        risks: [
          language === 'es' ? 'Demolición forzada' : 'Forced demolition',
          language === 'es' ? 'Multas significativas' : 'Significant fines'
        ]
      }
    ]);
  }, [language]);

  const handleSendQuestion = () => {
    if (!userQuestion.trim()) return;
    
    setIsAnalyzing(true);
    setAiResponse('');

    // Simulate AI processing
    setTimeout(() => {
      const responses = {
        es: `Basándome en tu consulta sobre "${userQuestion}", he identificado varios aspectos importantes:

**Análisis de tu situación:**
- Tu tipo de negocio requiere permisos específicos de salud y bomberos
- La ubicación en zona comercial facilita algunos procesos pero requiere cumplir con regulaciones de ruido
- El proceso completo tomará aproximadamente 45-60 días

**Recomendaciones prioritarias:**
1. Inicia con el Registro de Comerciante (más rápido y necesario para otros trámites)
2. Solicita el Permiso de Uso mientras esperas documentos del registro
3. Programa inspecciones con anticipación para evitar demoras

**Problemas potenciales detectados:**
⚠️ Posible conflicto con regulaciones de estacionamiento
⚠️ Requisitos adicionales de ventilación para tu tipo de negocio

¿Te gustaría que profundice en algún aspecto específico?`,
        en: `Based on your inquiry about "${userQuestion}", I've identified several important aspects:

**Analysis of your situation:**
- Your business type requires specific health and fire department permits
- Location in commercial zone facilitates some processes but requires noise regulation compliance
- Complete process will take approximately 45-60 days

**Priority recommendations:**
1. Start with Business Registration (faster and needed for other procedures)
2. Apply for Use Permit while waiting for registration documents
3. Schedule inspections in advance to avoid delays

**Potential problems detected:**
⚠️ Possible conflict with parking regulations
⚠️ Additional ventilation requirements for your business type

Would you like me to elaborate on any specific aspect?`
      };

      setAiResponse(responses[language]);
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleSampleQuestion = (question: string) => {
    setUserQuestion(question);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Button>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
            <Brain className="w-4 h-4 mr-2" />
            Alimentado por IA
          </Badge>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - AI Chat */}
          <div className="space-y-6">
            {/* Question Input */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-400" />
                  {t.askQuestion}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder={t.placeholder}
                  className="bg-slate-700 border-slate-600 text-white min-h-[100px] resize-none"
                />
                <Button 
                  onClick={handleSendQuestion}
                  disabled={!userQuestion.trim() || isAnalyzing}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t.analyzing}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t.send}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* AI Response */}
            {aiResponse && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                    {t.aiTips}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <div className="text-slate-300 whitespace-pre-line leading-relaxed">
                      {aiResponse}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sample Questions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">{t.sampleQuestions}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {t.questions.map((question, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={() => handleSampleQuestion(question)}
                      className="w-full text-left justify-start text-slate-300 hover:text-white hover:bg-slate-700 h-auto py-3 px-4"
                    >
                      <span className="text-sm">{question}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Permit Recommendations */}
          <div>
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-400" />
                  {t.recommendations}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Basado en tu perfil de negocio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {recommendations.map((permit) => (
                  <div key={permit.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-white">{permit.name}</h3>
                      <Badge className={getPriorityColor(permit.priority)}>
                        {t.priority[permit.priority]}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-300 text-sm mb-4">{permit.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <div>
                          <div className="text-xs text-slate-400">{t.timeframe}</div>
                          <div className="text-sm text-white">{permit.timeframe}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <div>
                          <div className="text-xs text-slate-400">{t.cost}</div>
                          <div className="text-sm text-white">{permit.cost}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-300 mb-1">{t.requirements}:</h4>
                        <ul className="text-xs text-slate-400 space-y-1">
                          {permit.requirements.map((req, index) => (
                            <li key={index}>• {req}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-red-300 mb-1 flex items-center">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {t.risks}:
                        </h4>
                        <ul className="text-xs text-red-200 space-y-1">
                          {permit.risks.map((risk, index) => (
                            <li key={index}>• {risk}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
