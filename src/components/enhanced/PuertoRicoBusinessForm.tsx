
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { municipalities, businessTypes, validateCRIM, validatePRPhone, formatCRIM, formatPRPhone } from '@/utils/puertoRicoData';
import { translations, getTranslation } from '@/utils/translations';
import { Building2, MapPin, Phone, Mail } from 'lucide-react';

const businessSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  dbaName: z.string().optional(),
  businessType: z.string().min(1, 'Please select a business type'),
  crimNumber: z.string().refine((val) => validateCRIM(val), {
    message: 'Invalid CRIM number format (XXX-XXX-XXX)',
  }),
  taxId: z.string().min(9, 'Tax ID is required'),
  municipality: z.string().min(1, 'Please select a municipality'),
  address: z.string().min(5, 'Address is required'),
  urbanization: z.string().optional(),
  zipCode: z.string().min(5, 'ZIP code is required'),
  phone: z.string().refine((val) => validatePRPhone(val), {
    message: 'Invalid Puerto Rico phone number',
  }),
  email: z.string().email('Invalid email address'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type BusinessFormData = z.infer<typeof businessSchema>;

interface PuertoRicoBusinessFormProps {
  language?: 'es' | 'en';
  onSubmit: (data: BusinessFormData) => void;
  onCancel?: () => void;
}

export const PuertoRicoBusinessForm = ({ 
  language = 'es', 
  onSubmit, 
  onCancel 
}: PuertoRicoBusinessFormProps) => {
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('');
  
  const form = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: '',
      dbaName: '',
      businessType: '',
      crimNumber: '',
      taxId: '',
      municipality: '',
      address: '',
      urbanization: '',
      zipCode: '',
      phone: '',
      email: '',
      description: '',
    },
  });

  const t = (key: string) => getTranslation(key, language);

  const handleCRIMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCRIM(e.target.value);
    form.setValue('crimNumber', formatted);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPRPhone(e.target.value);
    form.setValue('phone', formatted);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Building2 className="w-6 h-6 mr-3 text-blue-600" />
          {t('newBusiness')}
        </CardTitle>
        <CardDescription>
          {language === 'es' 
            ? 'Complete la información de su negocio para Puerto Rico'
            : 'Complete your business information for Puerto Rico'
          }
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Business Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="businessName">{t('businessName')} *</Label>
              <Input
                id="businessName"
                {...form.register('businessName')}
                placeholder={language === 'es' ? 'Ej. Café Luna' : 'Ex. Luna Café'}
              />
              {form.formState.errors.businessName && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.businessName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="dbaName">
                {language === 'es' ? 'Nombre Comercial (DBA)' : 'DBA Name'}
              </Label>
              <Input
                id="dbaName"
                {...form.register('dbaName')}
                placeholder={language === 'es' ? 'Opcional' : 'Optional'}
              />
            </div>

            <div>
              <Label htmlFor="businessType">{t('businessType')} *</Label>
              <Select 
                value={selectedBusinessType} 
                onValueChange={(value) => {
                  setSelectedBusinessType(value);
                  form.setValue('businessType', value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('selectBusinessType')} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(businessTypes).map(([key, type]) => (
                    <SelectItem key={key} value={key}>
                      {type[language]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.businessType && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.businessType.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="crimNumber">{t('crimNumber')} *</Label>
              <Input
                id="crimNumber"
                value={form.watch('crimNumber')}
                onChange={handleCRIMChange}
                placeholder="XXX-XXX-XXX"
                maxLength={11}
              />
              {form.formState.errors.crimNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.crimNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* Location Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              {language === 'es' ? 'Información de Ubicación' : 'Location Information'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="municipality">{t('municipality')} *</Label>
                <Select onValueChange={(value) => form.setValue('municipality', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectMunicipality')} />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {municipalities.map((municipality) => (
                      <SelectItem key={municipality} value={municipality}>
                        {municipality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.municipality && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.municipality.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="zipCode">{t('zipCode')} *</Label>
                <Input
                  id="zipCode"
                  {...form.register('zipCode')}
                  placeholder="00901"
                  maxLength={5}
                />
                {form.formState.errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.zipCode.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address">{t('address')} *</Label>
                <Input
                  id="address"
                  {...form.register('address')}
                  placeholder={language === 'es' ? 'Calle Principal 123' : '123 Main Street'}
                />
                {form.formState.errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="urbanization">{t('urbanization')}</Label>
                <Input
                  id="urbanization"
                  {...form.register('urbanization')}
                  placeholder={language === 'es' ? 'Ej. Villa Carolina' : 'Ex. Villa Carolina'}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              {language === 'es' ? 'Información de Contacto' : 'Contact Information'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone">{t('phone')} *</Label>
                <Input
                  id="phone"
                  value={form.watch('phone')}
                  onChange={handlePhoneChange}
                  placeholder="(787) 555-0123"
                />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">{t('email')} *</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email')}
                  placeholder="contacto@negocio.com"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Business Description */}
          <div className="border-t pt-6">
            <Label htmlFor="description">{t('description')} *</Label>
            <Textarea
              id="description"
              {...form.register('description')}
              placeholder={language === 'es' 
                ? 'Describe brevemente tu negocio y los servicios que ofreces...'
                : 'Briefly describe your business and the services you offer...'
              }
              rows={4}
              className="resize-none"
            />
            {form.formState.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-6">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="w-full sm:w-auto"
              >
                {t('cancel')}
              </Button>
            )}
            <Button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              {t('save')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
