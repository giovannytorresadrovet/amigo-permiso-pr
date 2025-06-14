
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, Star } from 'lucide-react';
import { type KnowledgeArticle } from '@/data/knowledgeBase';
import { useKnowledgeBaseTranslations } from '@/hooks/useKnowledgeBaseTranslations';

interface KnowledgeBaseSearchProps {
  searchQuery: string;
  searchResults: KnowledgeArticle[];
  language: 'es' | 'en';
  onSearchChange: (query: string) => void;
  onArticleClick: (article: KnowledgeArticle) => void;
}

export const KnowledgeBaseSearch = ({ 
  searchQuery, 
  searchResults, 
  language, 
  onSearchChange, 
  onArticleClick 
}: KnowledgeBaseSearchProps) => {
  const t = useKnowledgeBaseTranslations(language);

  return (
    <>
      {/* Search */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.search}
            className="bg-slate-800 border-slate-700 text-white pl-12 h-12 text-lg"
          />
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">{t.searchResults}</h2>
          {searchResults.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((article) => (
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
          ) : (
            <Card className="bg-slate-800/50 border-slate-700 p-8 text-center">
              <p className="text-slate-400">{t.noResults}</p>
            </Card>
          )}
        </div>
      )}
    </>
  );
};
