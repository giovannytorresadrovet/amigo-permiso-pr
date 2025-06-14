
export const useBusinessSetupTranslations = (language: 'es' | 'en') => {
  const translations = {
    es: {
      title: "Asistente de Configuración Empresarial",
      subtitle: "Descubramos problemas potenciales antes de que inviertas tiempo y dinero",
      step1: "Información Básica",
      step2: "Ubicación y Zonificación",
      step3: "Análisis Inteligente",
      businessName: "Nombre del Negocio",
      businessType: "Tipo de Negocio",
      location: "Dirección Específica",
      municipality: "Municipio",
      employees: "Número de Empleados",
      revenue: "Ingresos Anuales Estimados",
      continue: "Continuar",
      back: "Regresar",
      analyzing: "Analizando zonificación...",
      compatible: "✅ Ubicación Compatible",
      issues: "⚠️ Problemas Detectados",
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
      municipalities: {
        sanJuan: "San Juan",
        bayamon: "Bayamón",
        carolina: "Carolina",
        ponce: "Ponce",
        caguas: "Caguas",
        guaynabo: "Guaynabo",
        arecibo: "Arecibo",
        mayaguez: "Mayagüez",
        other: "Otro"
      },
      revenueRanges: {
        under50k: "Menos de $50,000",
        "50k-100k": "$50,000 - $100,000",
        "100k-500k": "$100,000 - $500,000",
        "500k-1m": "$500,000 - $1M",
        over1m: "Más de $1M"
      }
    },
    en: {
      title: "Business Setup Wizard",
      subtitle: "Let's discover potential problems before you invest time and money",
      step1: "Basic Information",
      step2: "Location & Zoning",
      step3: "Smart Analysis",
      businessName: "Business Name",
      businessType: "Business Type",
      location: "Specific Address",
      municipality: "Municipality",
      employees: "Number of Employees",
      revenue: "Estimated Annual Revenue",
      continue: "Continue",
      back: "Back",
      analyzing: "Analyzing zoning...",
      compatible: "✅ Location Compatible",
      issues: "⚠️ Issues Detected",
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
      municipalities: {
        sanJuan: "San Juan",
        bayamon: "Bayamón",
        carolina: "Carolina",
        ponce: "Ponce",
        caguas: "Caguas",
        guaynabo: "Guaynabo",
        arecibo: "Arecibo",
        mayaguez: "Mayagüez",
        other: "Other"
      },
      revenueRanges: {
        under50k: "Under $50,000",
        "50k-100k": "$50,000 - $100,000",
        "100k-500k": "$100,000 - $500,000",
        "500k-1m": "$500,000 - $1M",
        over1m: "Over $1M"
      }
    }
  };

  return translations[language];
};
