
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Star } from 'lucide-react';
import { type KnowledgeArticle } from '@/data/knowledgeBase';
import { useKnowledgeBaseTranslations } from '@/hooks/useKnowledgeBaseTranslations';

interface KnowledgeBaseArticleViewProps {
  article: KnowledgeArticle;
  language: 'es' | 'en';
  onBack: () => void;
  onMainBack: () => void;
  isFromSearch: boolean;
}

export const KnowledgeBaseArticleView = ({ 
  article, 
  language, 
  onBack, 
  onMainBack, 
  isFromSearch 
}: KnowledgeBaseArticleViewProps) => {
  const t = useKnowledgeBaseTranslations(language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {isFromSearch ? t.backToSearch : t.backToCategories}
          </Button>
          <Button 
            variant="ghost" 
            onClick={onMainBack}
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Button>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-white text-2xl mb-2">{article.title}</CardTitle>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                  {article.category}
                </Badge>
              </div>
              {article.featured && (
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  <Star className="w-3 h-3 mr-1" />
                  Destacado
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4 text-slate-400 text-sm mt-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.estimatedReadTime} {t.readTime}
              </div>
              <div>
                {t.lastUpdated}: {article.lastUpdated.toLocaleDateString()}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <div 
                className="text-slate-300 whitespace-pre-line leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
