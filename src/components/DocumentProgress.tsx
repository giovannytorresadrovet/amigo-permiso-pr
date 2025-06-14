
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DocumentItem, DocumentTranslations } from "@/types/document";

interface DocumentProgressProps {
  documents: DocumentItem[];
  translations: DocumentTranslations;
}

export const DocumentProgress = ({ documents, translations }: DocumentProgressProps) => {
  const completedDocs = documents.filter(doc => doc.status === 'validated').length;
  const totalDocs = documents.length;
  const progressPercentage = (completedDocs / totalDocs) * 100;

  return (
    <Card className="mb-8 bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          {translations.progress}
          <span className="text-2xl font-bold">{Math.round(progressPercentage)}%</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progressPercentage} className="h-3" />
      </CardContent>
    </Card>
  );
};
