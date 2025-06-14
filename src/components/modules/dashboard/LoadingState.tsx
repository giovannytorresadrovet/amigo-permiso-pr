
interface LoadingStateProps {
  language: 'es' | 'en';
}

export const LoadingState = ({ language }: LoadingStateProps) => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );
};
