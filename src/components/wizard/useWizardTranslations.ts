
export const useWizardTranslations = (language: 'es' | 'en') => {
  const translations = {
    es: {
      title: "Asistente de Configuración Empresarial",
      steps: ["Información Básica", "Ubicación", "Detalles", "Resumen"],
      businessName: "Nombre del Negocio",
      businessType: "Tipo de Negocio",
      description: "Descripción",
      back: "Atrás",
      next: "Siguiente",
      complete: "Completar",
      businessTypes: {
        restaurant: "Restaurante",
        retail: "Comercio al Detal",
        services: "Servicios Profesionales",
        manufacturing: "Manufactura",
        tech: "Tecnología",
        healthcare: "Salud",
        education: "Educación",
        other: "Otro"
      },
      employeeRanges: {
        "1": "1 empleado",
        "2-5": "2-5 empleados",
        "6-10": "6-10 empleados",
        "11-20": "11-20 empleados",
        "21+": "21+ empleados"
      },
      revenueRanges: {
        under50k: "Menos de $50,000",
        "50k-100k": "$50,000 - $100,000",
        "100k-500k": "$100,000 - $500,000",
        "500k-1m": "$500,000 - $1M",
        over1m: "Más de $1M"
      },
      employees: "Número de Empleados",
      revenue: "Ingresos Anuales Estimados"
    },
    en: {
      title: "Business Setup Wizard",
      steps: ["Basic Info", "Location", "Details", "Summary"],
      businessName: "Business Name",
      businessType: "Business Type",
      description: "Description",
      back: "Back",
      next: "Next",
      complete: "Complete",
      businessTypes: {
        restaurant: "Restaurant",
        retail: "Retail Store",
        services: "Professional Services",
        manufacturing: "Manufacturing",
        tech: "Technology",
        healthcare: "Healthcare",
        education: "Education",
        other: "Other"
      },
      employeeRanges: {
        "1": "1 employee",
        "2-5": "2-5 employees",
        "6-10": "6-10 employees",
        "11-20": "11-20 employees",
        "21+": "21+ employees"
      },
      revenueRanges: {
        under50k: "Under $50,000",
        "50k-100k": "$50,000 - $100,000",
        "100k-500k": "$100,000 - $500,000",
        "500k-1m": "$500,000 - $1M",
        over1m: "Over $1M"
      },
      employees: "Number of Employees",
      revenue: "Estimated Annual Revenue"
    }
  };

  return translations[language];
};
