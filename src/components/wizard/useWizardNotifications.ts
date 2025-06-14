
import { useNotificationEffects } from '@/hooks/useNotificationEffects';

export const useWizardNotifications = (language: 'es' | 'en') => {
  const { notifySuccess, notifyError, notifyInfo } = useNotificationEffects();

  const notifyStepComplete = (step: number) => {
    if (step === 0) {
      notifySuccess(
        language === 'es' ? 'Información Básica Completada' : 'Basic Information Completed',
        language === 'es' 
          ? 'Datos del negocio guardados exitosamente.' 
          : 'Business information saved successfully.'
      );
    } else if (step === 1) {
      notifySuccess(
        language === 'es' ? 'Ubicación Validada' : 'Location Validated',
        language === 'es' 
          ? 'Dirección verificada y información de zonificación obtenida.' 
          : 'Address verified and zoning information obtained.'
      );
    } else if (step === 2) {
      notifyInfo(
        language === 'es' ? 'Revisión Final' : 'Final Review',
        language === 'es' 
          ? 'Revisa toda la información antes de completar.' 
          : 'Review all information before completing.'
      );
    }
  };

  const notifyCompletion = () => {
    notifySuccess(
      language === 'es' ? '¡Configuración Completada!' : 'Setup Completed!',
      language === 'es' 
        ? 'Tu perfil de negocio ha sido configurado exitosamente.' 
        : 'Your business profile has been set up successfully.',
      true
    );
  };

  const notifyCompletionError = () => {
    notifyError(
      language === 'es' ? 'Error al Completar' : 'Completion Error',
      language === 'es' 
        ? 'Hubo un problema al guardar la configuración.' 
        : 'There was a problem saving the setup.'
    );
  };

  const notifyZoningWarnings = () => {
    notifyError(
      language === 'es' ? 'Advertencias de Zonificación' : 'Zoning Warnings',
      language === 'es' 
        ? 'Se encontraron posibles problemas de zonificación.' 
        : 'Potential zoning issues were found.',
      true
    );
  };

  return {
    notifyStepComplete,
    notifyCompletion,
    notifyCompletionError,
    notifyZoningWarnings
  };
};
