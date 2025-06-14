
import { DocumentType } from '@/types/permisoUnico';

export const REQUIRED_DOCUMENTS: Array<{
  type: DocumentType;
  name: string;
  description: string;
  required: boolean;
}> = [
  {
    type: 'incorporation_certificate',
    name: 'Certificado de Incorporación',
    description: 'Certificado de incorporación de la empresa emitido por el Departamento de Estado',
    required: true
  },
  {
    type: 'tax_exempt_certificate',
    name: 'Certificado de Exención Contributiva',
    description: 'Certificado de exención contributiva del Departamento de Hacienda',
    required: true
  },
  {
    type: 'crim_certificate',
    name: 'Certificado CRIM',
    description: 'Certificación del Centro de Recaudación de Ingresos Municipales',
    required: true
  },
  {
    type: 'municipal_license',
    name: 'Licencia Municipal',
    description: 'Licencia municipal vigente del municipio correspondiente',
    required: true
  },
  {
    type: 'zoning_certification',
    name: 'Certificación de Zonificación',
    description: 'Certificación de que el negocio cumple con las regulaciones de zonificación',
    required: false
  },
  {
    type: 'insurance_certificate',
    name: 'Certificado de Seguro',
    description: 'Certificado de póliza de seguro comercial vigente',
    required: false
  }
];
