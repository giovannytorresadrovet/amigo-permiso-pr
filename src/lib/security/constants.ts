
// Security Constants
export const SECURITY_CONFIG = {
  MAX_FILE_SIZE: 25 * 1024 * 1024, // 25MB
  ALLOWED_MIME_TYPES: [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword'
  ],
  MAX_INPUT_LENGTH: {
    businessName: 100,
    address: 200,
    description: 1000,
    fileName: 255
  },
  RATE_LIMITS: {
    fileUpload: 5, // per minute
    aiQuery: 10, // per minute
    formSubmission: 20 // per minute
  }
};
