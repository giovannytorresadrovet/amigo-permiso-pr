
import { DocumentTranslations } from "@/types/document";

interface DocumentTitleProps {
  translations: DocumentTranslations;
}

export const DocumentTitle = ({ translations }: DocumentTitleProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {translations.title}
      </h1>
      <p className="text-lg text-slate-400 max-w-2xl mx-auto">
        {translations.subtitle}
      </p>
    </div>
  );
};
