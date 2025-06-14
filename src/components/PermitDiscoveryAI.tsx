
import { useState } from 'react';
import { PermitDiscoveryHeader } from './permit-discovery/PermitDiscoveryHeader';
import { AIQuestionSection } from './permit-discovery/AIQuestionSection';
import { PermitRecommendationsSection } from './permit-discovery/PermitRecommendationsSection';
import { usePermitRecommendations } from './permit-discovery/usePermitRecommendations';
import { useAIResponse } from './permit-discovery/useAIResponse';
import { getPermitDiscoveryTranslations } from './permit-discovery/translations';
import { PermitDiscoveryAIProps } from './permit-discovery/types';

export const PermitDiscoveryAI = ({ language, onBack }: PermitDiscoveryAIProps) => {
  const [userQuestion, setUserQuestion] = useState('');
  const recommendations = usePermitRecommendations(language);
  const { aiResponse, isAnalyzing, handleSendQuestion } = useAIResponse(language);
  const translations = getPermitDiscoveryTranslations(language);

  const handleSampleQuestion = (question: string) => {
    setUserQuestion(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <PermitDiscoveryHeader 
          onBack={onBack}
          title={translations.title}
          subtitle={translations.subtitle}
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - AI Chat */}
          <AIQuestionSection
            userQuestion={userQuestion}
            setUserQuestion={setUserQuestion}
            aiResponse={aiResponse}
            isAnalyzing={isAnalyzing}
            onSendQuestion={() => handleSendQuestion(userQuestion)}
            onSampleQuestionClick={handleSampleQuestion}
            translations={translations}
          />

          {/* Right Column - Permit Recommendations */}
          <div>
            <PermitRecommendationsSection
              recommendations={recommendations}
              translations={translations}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
