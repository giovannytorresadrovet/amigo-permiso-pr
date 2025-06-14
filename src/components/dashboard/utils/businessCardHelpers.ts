
export const getStatusConfig = (status: string) => {
  switch (status) {
    case 'active':
      return {
        status: 'success' as const,
        text: 'Activo'
      };
    case 'pending':
      return {
        status: 'pending' as const,
        text: 'Pendiente'
      };
    case 'inactive':
      return {
        status: 'error' as const,
        text: 'Inactivo'
      };
    default:
      return {
        status: 'inactive' as const,
        text: 'Desconocido'
      };
  }
};

export const getSocialProviderBadge = (provider: string) => {
  if (provider === 'email') return null;
  
  const providerConfig = {
    google: { name: 'Google', variant: 'info' as const },
    facebook: { name: 'Facebook', variant: 'info' as const },
    apple: { name: 'Apple', variant: 'outline' as const }
  };
  
  return providerConfig[provider as keyof typeof providerConfig] || null;
};

export const getComplianceVariant = (complianceScore: number) => {
  if (complianceScore >= 90) return 'success';
  if (complianceScore >= 70) return 'warning';
  return 'danger';
};
