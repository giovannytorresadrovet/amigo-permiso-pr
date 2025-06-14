
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PaymentInformation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Información de Pago</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-1">Métodos de Pago Aceptados</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Tarjetas de crédito y débito (Visa, MasterCard, American Express)</li>
            <li>• Transferencias bancarias ACH</li>
            <li>• Cheques certificados (con procesamiento de 3-5 días hábiles)</li>
          </ul>
        </div>
        
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-1">Política de Reembolsos</h4>
          <p className="text-sm text-yellow-700">
            Los reembolsos están disponibles hasta 30 días después del pago, 
            sujetos a las regulaciones gubernamentales aplicables.
          </p>
        </div>

        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-1">Procesamiento Seguro</h4>
          <p className="text-sm text-green-700">
            Todos los pagos son procesados de forma segura a través de nuestro 
            proveedor certificado PCI DSS con cifrado de extremo a extremo.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
