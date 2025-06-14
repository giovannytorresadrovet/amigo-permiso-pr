
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Star, FileText, MapPin, Building } from 'lucide-react';
import { type KnowledgeCategory, type KnowledgeArticle } from '@/data/knowledgeBase';
import { useKnowledgeBaseTranslations } from '@/hooks/useKnowledgeBaseTranslations';

interface KnowledgeBaseMainViewProps {
  categories: KnowledgeCategory[];
  featuredArticles: KnowledgeArticle[];
  language: 'es' | 'en';
  onCategoryClick: (categoryId: string) => void;
  onArticleClick: (article: KnowledgeArticle) => void;
}

export const KnowledgeBaseMainView = ({ 
  categories, 
  featuredArticles, 
  language, 
  onCategoryClick, 
  onArticleClick 
}: KnowledgeBaseMainViewProps) => {
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
    <>
      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">{t.categories}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className="bg-slate-800/50 border-slate-700 hover:border-slate-600 cursor-pointer transition-colors"
              onClick={() => onCategoryClick(category.id)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {getIconComponent(category.icon)}
                  <div>
                    <CardTitle className="text-white">{category.name}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                  {category.articles.length} artículos
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Star className="w-6 h-6 mr-2 text-yellow-400" />
          {t.featured}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <Card 
              key={article.id}
              className="bg-slate-800/50 border-slate-700 hover:border-slate-600 cursor-pointer transition-colors"
              onClick={() => onArticleClick(article)}
            >
              <CardHeader>
                <CardTitle className="text-white text-lg">{article.title}</CardTitle>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 w-fit">
                  {article.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-slate-400 text-sm">
                    <Clock className="w-3 h-3 mr-1" />
                    {article.estimatedReadTime} {t.readTime}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
