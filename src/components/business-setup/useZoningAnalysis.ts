
import { useEffect } from 'react';

interface FormData {
  location: string;
  municipality: string;
  businessType: string;
}

interface UseZoningAnalysisProps {
  currentStep: number;
  formData: FormData;
  language: 'es' | 'en';
  setZoningResult: (result: 'checking' | 'compatible' | 'issues' | null) => void;
  setDiscoveredIssues: (issues: string[]) => void;
}

export const useZoningAnalysis = ({
  currentStep,
  formData,
  language,
  setZoningResult,
  setDiscoveredIssues
}: UseZoningAnalysisProps) => {
  useEffect(() => {
    if (currentStep === 2 && formData.location && formData.municipality && formData.businessType) {
      setZoningResult('checking');
      
      setTimeout(() => {
        // Simulate AI analysis results
        const hasIssues = Math.random() > 0.6; // 40% chance of issues for demo
        
        if (hasIssues) {
          setZoningResult('issues');
          setDiscoveredIssues([
            language === 'es' 
              ? "Restricción de estacionamiento: Se requieren 5 espacios adicionales"
              : "Parking restriction: 5 additional spaces required",
            language === 'es'
              ? "Permiso de ruido requerido para operaciones después de las 8 PM"
              : "Noise permit required for operations after 8 PM",
            language === 'es'
              ? "Restricción de señalización: Máximo 2 letreros exteriores"
              : "Signage restriction: Maximum 2 exterior signs allowed"
          ]);
        } else {
          setZoningResult('compatible');
          setDiscoveredIssues([]);
        }
      }, 2000);
    }
  }, [currentStep, formData.location, formData.municipality, formData.businessType, language, setZoningResult, setDiscoveredIssues]);
};
