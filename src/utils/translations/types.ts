
export interface BusinessTypes {
  restaurant: string;
  salon: string;
  barbershop: string;
  retail: string;
  services: string;
  homeServices: string;
  manufacturing: string;
  technology: string;
  healthcare: string;
  education: string;
  construction: string;
  transportation: string;
  agriculture: string;
  tourism: string;
  automotive: string;
  entertainment: string;
}

export interface TranslationData {
  // Authentication
  welcomeBack: string;
  createAccount: string;
  signInToAccount: string;
  joinPermitPR: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  forgotPassword: string;
  signIn: string;
  signUp: string;
  signingIn: string;
  creatingAccount: string;
  
  // Social Login
  continueWith: string;
  registerWith: string;
  orContinueWithEmail: string;
  orCreateAccountWithEmail: string;
  
  // Business Status & Legal Compliance
  legalStatus: string;
  legalStatusDescription: string;
  legal: string;
  inProcess: string;
  illegal: string;
  expiringSoon: string;
  complianceProgress: string;
  permitExpiration: string;
  inspectorReadiness: string;
  emergencyMode: string;
  
  // Permit Management
  permisoUnico: string;
  permitNumber: string;
  applicationStatus: string;
  submissionDate: string;
  approvalDate: string;
  expirationDate: string;
  renewalRequired: string;
  documentsRequired: string;
  inspectionScheduled: string;
  
  // Emergency Mode
  inspectorAtDoor: string;
  emergencyAssistance: string;
  quickPDF: string;
  emergencyContacts: string;
  communicationScripts: string;
  whatToSayInspector: string;
  delayTactics: string;
  cooperationScript: string;
  callSupport: string;
  callMunicipality: string;
  shareWhatsApp: string;
  shareEmail: string;
  visitNotes: string;
  
  // AI Assistant (Gerry)
  gerryAssistant: string;
  askGerry: string;
  aiGuidance: string;
  formAutofill: string;
  regulationExpert: string;
  chatWithGerry: string;
  gerryRecommends: string;
  complianceReminder: string;
  
  // Identity Verification
  identityVerification: string;
  verifyWithIdMe: string;
  identityRequired: string;
  secureProcess: string;
  verificationComplete: string;
  verificationFailed: string;
  
  // Document Management Enhanced
  documentSecurity: string;
  encryptedStorage: string;
  offlineAccess: string;
  autoSync: string;
  documentValidation: string;
  qualityCheck: string;
  
  // Subscription & Payments
  municipalityBasedPricing: string;
  ivuTaxIncluded: string;
  monthlyBilling: string;
  annualBilling: string;
  proRatedRefund: string;
  subscriptionTier: string;
  
  // Enhanced Business Types
  businessTypes: BusinessTypes;
  
  // Puerto Rico specific
  crimNumber: string;
  ssnNumber: string;
  urbanization: string;
  selectMunicipality: string;
  selectBusinessType: string;
  
  // Permits and legal status
  permits: string;
  active: string;
  pending: string;
  inactive: string;
  expired: string;
  
  // Form validation
  required: string;
  invalidEmail: string;
  passwordMinLength: string;
  passwordsDontMatch: string;
  invalidCRIM: string;
  invalidPhone: string;
  
  // Notifications
  loginSuccessful: string;
  loginFailed: string;
  registrationSuccessful: string;
  registrationFailed: string;
  businessCreated: string;
  businessCreationFailed: string;
  
  // General
  save: string;
  cancel: string;
  continue: string;
  back: string;
  loading: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

export interface Translations {
  es: TranslationData;
  en: TranslationData;
}
