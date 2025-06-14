
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Star, FileText, MapPin, Building } from 'lucide-react';
import { type KnowledgeCategory, type KnowledgeArticle } from '@/data/knowledgeBase';
import { useKnowledgeBaseTranslations } from '@/hooks/useKnowledgeBaseTranslations';

interface KnowledgeBaseCategoryViewProps {
  category: KnowledgeCategory;
  language: 'es' | 'en';
  onBack: () => void;
  onMainBack: () => void;
  onArticleClick: (article: KnowledgeArticle) => void;
}

export const KnowledgeBaseCategoryView = ({ 
  category, 
  language, 
  onBack, 
  onMainBack, 
  onArticleClick 
}: KnowledgeBaseCategoryViewProps) => {
  const t = useKnowledgeBaseTranslations(language);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-6 h-6" />;
      case 'MapPin': return <MapPin className="w-6 h-6" />;
      case 'Building': return <Building className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToCategories}
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

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            {getIconComponent(category.icon)}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{category.name}</h1>
          <p className="text-slate-400">{category.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.articles.map((article) => (
            <Card 
              key={article.id}
              className="bg-slate-800/50 border-slate-700 hover:border-slate-600 cursor-pointer transition-colors"
              onClick={() => onArticleClick(article)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-white text-lg">{article.title}</CardTitle>
                  {article.featured && (
                    <Star className="w-4 h-4 text-yellow-400 flex-shrink-0 ml-2" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-slate-400 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.estimatedReadTime} {t.readTime}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
