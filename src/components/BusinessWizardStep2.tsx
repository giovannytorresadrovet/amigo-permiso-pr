
import { AddressValidator } from './AddressValidator';

interface BusinessWizardStep2Props {
  onAddressValidated: (address: any, zoningInfo: any) => void;
  language: 'es' | 'en';
}

export const BusinessWizardStep2 = ({ onAddressValidated, language }: BusinessWizardStep2Props) => {
  return (
    <AddressValidator
      onAddressValidated={onAddressValidated}
      language={language}
    />
  );
};
