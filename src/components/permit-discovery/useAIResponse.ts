
import { useState } from 'react';

export const useAIResponse = (language: 'es' | 'en') => {
  const [aiResponse, setAiResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSendQuestion = (userQuestion: string) => {
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

  return {
    aiResponse,
    isAnalyzing,
    handleSendQuestion
  };
};
