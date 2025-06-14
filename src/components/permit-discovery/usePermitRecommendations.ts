
import { useState, useEffect } from 'react';
import { PermitRecommendation } from './types';

export const usePermitRecommendations = (language: 'es' | 'en') => {
  const [recommendations, setRecommendations] = useState<PermitRecommendation[]>([]);

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

  return recommendations;
};
