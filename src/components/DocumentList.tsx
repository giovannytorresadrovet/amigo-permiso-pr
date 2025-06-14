
import { DocumentCard } from "./DocumentCard";
import { DocumentItem, DocumentTranslations } from "@/types/document";

interface DocumentListProps {
  documents: DocumentItem[];
  translations: DocumentTranslations;
}

export const DocumentList = ({ documents, translations }: DocumentListProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} translations={translations} />
      ))}
    </div>
  );
};
