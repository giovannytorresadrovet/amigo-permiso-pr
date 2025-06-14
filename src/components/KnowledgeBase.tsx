
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { knowledgeBaseData, searchKnowledgeBase, getFeaturedArticles, type KnowledgeArticle } from '@/data/knowledgeBase';
import { useKnowledgeBaseTranslations } from '@/hooks/useKnowledgeBaseTranslations';
import { KnowledgeBaseArticleView } from './knowledge-base/KnowledgeBaseArticleView';
import { KnowledgeBaseCategoryView } from './knowledge-base/KnowledgeBaseCategoryView';
import { KnowledgeBaseMainView } from './knowledge-base/KnowledgeBaseMainView';
import { KnowledgeBaseSearch } from './knowledge-base/KnowledgeBaseSearch';

interface KnowledgeBaseProps {
  language: 'es' | 'en';
  onBack: () => void;
}

export const KnowledgeBase = ({ language, onBack }: KnowledgeBaseProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<KnowledgeArticle[]>([]);

  const t = useKnowledgeBaseTranslations(language);
  const categories = knowledgeBaseData[language];
  const featuredArticles = getFeaturedArticles(language);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchKnowledgeBase(searchQuery, language);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, language]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
    setSelectedArticle(null);
  };

  const handleArticleClick = (article: KnowledgeArticle) => {
    setSelectedArticle(article);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedArticle(null);
    setSearchQuery('');
  };

  const handleBackToSearch = () => {
    setSelectedArticle(null);
  };

  // Article View
  if (selectedArticle) {
    return (
      <KnowledgeBaseArticleView
        article={selectedArticle}
        language={language}
        onBack={searchQuery ? handleBackToSearch : handleBackToCategories}
        onMainBack={onBack}
        isFromSearch={!!searchQuery}
      />
    );
  }

  // Category View
  if (selectedCategory) {
    const category = categories.find(cat => cat.id === selectedCategory);
    if (!category) return null;

    return (
      <KnowledgeBaseCategoryView
        category={category}
        language={language}
        onBack={handleBackToCategories}
        onMainBack={onBack}
        onArticleClick={handleArticleClick}
      />
    );
  }

  // Main View (Categories and Search)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <KnowledgeBaseSearch
          searchQuery={searchQuery}
          searchResults={searchResults}
          language={language}
          onSearchChange={setSearchQuery}
          onArticleClick={handleArticleClick}
        />

        {!searchQuery && (
          <KnowledgeBaseMainView
            categories={categories}
            featuredArticles={featuredArticles}
            language={language}
            onCategoryClick={handleCategoryClick}
            onArticleClick={handleArticleClick}
          />
        )}
      </div>
    </div>
  );
};
