
export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  lastUpdated: Date;
  featured: boolean;
  estimatedReadTime: number;
}

export interface KnowledgeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  articles: KnowledgeArticle[];
}
