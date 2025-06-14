
export interface PermitDiscoveryAIProps {
  language: 'es' | 'en';
  onBack: () => void;
}

export interface PermitRecommendation {
  id: string;
  name: string;
  priority: 'high' | 'medium' | 'low';
  timeframe: string;
  cost: string;
  description: string;
  requirements: string[];
  risks: string[];
}

export interface PermitDiscoveryTranslations {
  title: string;
  subtitle: string;
  askQuestion: string;
  placeholder: string;
  send: string;
  analyzing: string;
  recommendations: string;
  priority: {
    high: string;
    medium: string;
    low: string;
  };
  timeframe: string;
  cost: string;
  requirements: string;
  risks: string;
  aiTips: string;
  sampleQuestions: string;
  questions: string[];
}
