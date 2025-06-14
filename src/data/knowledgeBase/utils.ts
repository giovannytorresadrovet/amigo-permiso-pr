
import { KnowledgeArticle, KnowledgeCategory } from './types';
import { spanishKnowledgeData } from './spanishData';
import { englishKnowledgeData } from './englishData';

export const knowledgeBaseData: Record<'es' | 'en', KnowledgeCategory[]> = {
  es: spanishKnowledgeData,
  en: englishKnowledgeData
};

export const searchKnowledgeBase = (query: string, language: 'es' | 'en'): KnowledgeArticle[] => {
  const categories = knowledgeBaseData[language];
  const allArticles = categories.flatMap(category => category.articles);
  
  if (!query.trim()) return allArticles;
  
  const searchTerms = query.toLowerCase().split(' ');
  
  return allArticles.filter(article => {
    const searchableText = `${article.title} ${article.content} ${article.tags.join(' ')}`.toLowerCase();
    return searchTerms.some(term => searchableText.includes(term));
  }).sort((a, b) => {
    // Prioritize featured articles and recent updates
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.lastUpdated.getTime() - a.lastUpdated.getTime();
  });
};

export const getArticleById = (id: string, language: 'es' | 'en'): KnowledgeArticle | null => {
  const categories = knowledgeBaseData[language];
  const allArticles = categories.flatMap(category => category.articles);
  return allArticles.find(article => article.id === id) || null;
};

export const getFeaturedArticles = (language: 'es' | 'en'): KnowledgeArticle[] => {
  const categories = knowledgeBaseData[language];
  const allArticles = categories.flatMap(category => category.articles);
  return allArticles.filter(article => article.featured);
};
