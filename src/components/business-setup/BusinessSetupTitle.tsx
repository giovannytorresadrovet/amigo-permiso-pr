
interface BusinessSetupTitleProps {
  title: string;
  subtitle: string;
}

export const BusinessSetupTitle = ({ title, subtitle }: BusinessSetupTitleProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {title}
      </h1>
      <p className="text-lg text-slate-400 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};
