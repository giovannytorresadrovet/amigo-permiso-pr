
// Comprehensive Spanish translations based on the documentation
export const translations = {
  es: {
    // Authentication
    welcomeBack: 'Bienvenido de Vuelta',
    createAccount: 'Crear Cuenta',
    signInToAccount: 'Inicia sesión en tu cuenta de PermitPR',
    joinPermitPR: 'Únete a PermitPR para comenzar',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    firstName: 'Nombre',
    lastName: 'Apellido',
    forgotPassword: 'Contraseña olvidada?',
    signIn: 'Iniciar Sesión',
    signUp: 'Registrarse',
    signingIn: 'Iniciando sesión...',
    creatingAccount: 'Creando cuenta...',
    
    // Social Login
    continueWith: 'Continuar con',
    registerWith: 'Registrarse con',
    orContinueWithEmail: 'O continúa con correo electrónico',
    orCreateAccountWithEmail: 'O crea cuenta con correo electrónico',
    
    // Business Management
    myBusinesses: 'Mis Negocios',
    manageBusinesses: 'Administra tus negocios y sus permisos',
    newBusiness: 'Nuevo Negocio',
    businessName: 'Nombre del Negocio',
    businessType: 'Tipo de Negocio',
    description: 'Descripción',
    address: 'Dirección',
    municipality: 'Municipio',
    zipCode: 'Código Postal',
    phone: 'Teléfono',
    
    // Business Types
    businessTypes: {
      restaurant: 'Restaurante',
      salon: 'Salón de Belleza',
      barbershop: 'Barbería',
      retail: 'Comercio al Detal',
      services: 'Servicios Profesionales',
      homeServices: 'Servicios a Domicilio',
      manufacturing: 'Manufactura',
      technology: 'Tecnología',
      healthcare: 'Servicios de Salud',
      education: 'Educación',
      construction: 'Construcción',
      transportation: 'Transporte'
    },
    
    // Puerto Rico specific
    crimNumber: 'Número CRIM',
    ssnNumber: 'Número de Seguro Social',
    urbanization: 'Urbanización',
    selectMunicipality: 'Selecciona tu municipio',
    selectBusinessType: 'Selecciona el tipo de negocio',
    
    // Permits and legal status
    permits: 'Permisos',
    legalStatus: 'Estatus Legal',
    active: 'Activo',
    pending: 'Pendiente',
    inactive: 'Inactivo',
    expired: 'Expirado',
    
    // Form validation
    required: 'Este campo es requerido',
    invalidEmail: 'Ingresa un correo electrónico válido',
    passwordMinLength: 'La contraseña debe tener al menos 8 caracteres',
    passwordsDontMatch: 'Las contraseñas no coinciden',
    invalidCRIM: 'Número CRIM inválido (formato: XXX-XXX-XXX)',
    invalidPhone: 'Número de teléfono inválido',
    
    // Notifications
    loginSuccessful: 'Inicio de sesión exitoso',
    loginFailed: 'Error en el inicio de sesión',
    registrationSuccessful: 'Registro exitoso',
    registrationFailed: 'Error en el registro',
    businessCreated: 'Negocio creado exitosamente',
    businessCreationFailed: 'Error al crear el negocio',
    
    // General
    save: 'Guardar',
    cancel: 'Cancelar',
    continue: 'Continuar',
    back: 'Regresar',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    warning: 'Advertencia',
    info: 'Información'
  },
  en: {
    // Authentication
    welcomeBack: 'Welcome Back',
    createAccount: 'Create Account',
    signInToAccount: 'Sign in to your PermitPR account',
    joinPermitPR: 'Join PermitPR to get started',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    forgotPassword: 'Forgot password?',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signingIn: 'Signing in...',
    creatingAccount: 'Creating account...',
    
    // Social Login
    continueWith: 'Continue with',
    registerWith: 'Register with',
    orContinueWithEmail: 'Or continue with email',
    orCreateAccountWithEmail: 'Or create account with email',
    
    // Business Management
    myBusinesses: 'My Businesses',
    manageBusinesses: 'Manage your businesses and their permits',
    newBusiness: 'New Business',
    businessName: 'Business Name',
    businessType: 'Business Type',
    description: 'Description',
    address: 'Address',
    municipality: 'Municipality',
    zipCode: 'ZIP Code',
    phone: 'Phone',
    
    // Business Types
    businessTypes: {
      restaurant: 'Restaurant',
      salon: 'Beauty Salon',
      barbershop: 'Barbershop',
      retail: 'Retail Store',
      services: 'Professional Services',
      homeServices: 'Home Services',
      manufacturing: 'Manufacturing',
      technology: 'Technology',
      healthcare: 'Healthcare',
      education: 'Education',
      construction: 'Construction',
      transportation: 'Transportation'
    },
    
    // Puerto Rico specific
    crimNumber: 'CRIM Number',
    ssnNumber: 'Social Security Number',
    urbanization: 'Urbanization',
    selectMunicipality: 'Select your municipality',
    selectBusinessType: 'Select business type',
    
    // Permits and legal status
    permits: 'Permits',
    legalStatus: 'Legal Status',
    active: 'Active',
    pending: 'Pending',
    inactive: 'Inactive',
    expired: 'Expired',
    
    // Form validation
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    passwordMinLength: 'Password must be at least 8 characters',
    passwordsDontMatch: 'Passwords do not match',
    invalidCRIM: 'Invalid CRIM number (format: XXX-XXX-XXX)',
    invalidPhone: 'Invalid phone number',
    
    // Notifications
    loginSuccessful: 'Login Successful',
    loginFailed: 'Login Failed',
    registrationSuccessful: 'Registration Successful',
    registrationFailed: 'Registration Failed',
    businessCreated: 'Business Created Successfully',
    businessCreationFailed: 'Business Creation Failed',
    
    // General
    save: 'Save',
    cancel: 'Cancel',
    continue: 'Continue',
    back: 'Back',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information'
  }
};

export const getTranslation = (key: string, language: 'es' | 'en' = 'es') => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if Spanish translation is missing
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key if translation not found
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
};
