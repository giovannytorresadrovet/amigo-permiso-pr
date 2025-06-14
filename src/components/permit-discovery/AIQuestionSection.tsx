
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Lightbulb, Send } from 'lucide-react';
import { PermitDiscoveryTranslations } from './types';

interface AIQuestionSectionProps {
  userQuestion: string;
  setUserQuestion: (question: string) => void;
  aiResponse: string;
  isAnalyzing: boolean;
  onSendQuestion: () => void;
  onSampleQuestionClick: (question: string) => void;
  translations: PermitDiscoveryTranslations;
}

export const AIQuestionSection = ({
  userQuestion,
  setUserQuestion,
  aiResponse,
  isAnalyzing,
  onSendQuestion,
  onSampleQuestionClick,
  translations: t
}: AIQuestionSectionProps) => {
  return (
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
            onClick={onSendQuestion}
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
                onClick={() => onSampleQuestionClick(question)}
                className="w-full text-left justify-start text-slate-300 hover:text-white hover:bg-slate-700 h-auto py-3 px-4"
              >
                <span className="text-sm">{question}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
