
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Search, Clock, Star, FileText, MapPin, Building, Lightbulb } from 'lucide-react';
import { knowledgeBaseData, searchKnowledgeBase, getArticleById, getFeaturedArticles, type KnowledgeArticle, type KnowledgeCategory } from '@/data/knowledgeBase';

interface KnowledgeBaseProps {
  language: 'es' | 'en';
  onBack: () => void;
}

export const KnowledgeBase = ({ language, onBack }: KnowledgeBaseProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<KnowledgeArticle[]>([]);

  const translations = {
    es: {
      title: 'Base de Conocimientos',
      subtitle: 'Encuentra respuestas a todas tus preguntas sobre permisos y negocios',
      search: 'Buscar artículos...',
      categories: 'Categorías',
      featured: 'Artículos Destacados',
      searchResults: 'Resultados de Búsqueda',
      noResults: 'No se encontraron resultados',
      readTime: 'min de lectura',
      lastUpdated: 'Actualizado',
      backToCategories: 'Volver a Categorías',
      backToSearch: 'Volver a Búsqueda'
    },
    en: {
      title: 'Knowledge Base',
      subtitle: 'Find answers to all your questions about permits and business',
      search: 'Search articles...',
      categories: 'Categories',
      featured: 'Featured Articles',
      searchResults: 'Search Results',
      noResults: 'No results found',
      readTime: 'min read',
      lastUpdated: 'Updated',
      backToCategories: 'Back to Categories',
      backToSearch: 'Back to Search'
    }
  };

  const t = translations[language];
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

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-6 h-6" />;
      case 'MapPin': return <MapPin className="w-6 h-6" />;
      case 'Building': return <Building className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={searchQuery ? handleBackToSearch : handleBackToCategories}
              className="text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {searchQuery ? t.backToSearch : t.backToCategories}
            </Button>
            <Button 
              variant="ghost" 
              onClick={onBack}
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
                  <CardTitle className="text-white text-2xl mb-2">{selectedArticle.title}</CardTitle>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                    {selectedArticle.category}
                  </Badge>
                </div>
                {selectedArticle.featured && (
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                    <Star className="w-3 h-3 mr-1" />
                    Destacado
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-4 text-slate-400 text-sm mt-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedArticle.estimatedReadTime} {t.readTime}
                </div>
                <div>
                  {t.lastUpdated}: {selectedArticle.lastUpdated.toLocaleDateString()}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <div 
                  className="text-slate-300 whitespace-pre-line leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.content.replace(/\n/g, '<br/>') }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Category View
  if (selectedCategory) {
    const category = categories.find(cat => cat.id === selectedCategory);
    if (!category) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={handleBackToCategories}
              className="text-slate-300 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToCategories}
            </Button>
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
                onClick={() => handleArticleClick(article)}
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

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                    onClick={() => handleArticleClick(article)}
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

        {/* Categories */}
        {!searchQuery && (
          <>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">{t.categories}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Card 
                    key={category.id}
                    className="bg-slate-800/50 border-slate-700 hover:border-slate-600 cursor-pointer transition-colors"
                    onClick={() => handleCategoryClick(category.id)}
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
                    onClick={() => handleArticleClick(article)}
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
        )}
      </div>
    </div>
  );
};
