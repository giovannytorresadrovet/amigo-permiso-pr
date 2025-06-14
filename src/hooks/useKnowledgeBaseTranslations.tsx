
export const useKnowledgeBaseTranslations = (language: 'es' | 'en') => {
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

  return translations[language];
};
