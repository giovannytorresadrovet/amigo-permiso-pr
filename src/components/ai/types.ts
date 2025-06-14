
export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  estimatedReadTime: number;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'gerry';
  timestamp: Date;
  type?: 'text' | 'form_suggestion' | 'document_request' | 'regulation_info' | 'knowledge_article';
  suggestions?: string[];
  knowledgeArticles?: KnowledgeArticle[];
}

export interface GerryAIAssistantProps {
  language: 'es' | 'en';
  businessContext?: {
    businessId: string;
    name: string;
    type: string;
    municipality: string;
    status: string;
  };
  onFormAutofill?: (field: string, value: string) => void;
  onDocumentRequest?: (documentType: string) => void;
}
