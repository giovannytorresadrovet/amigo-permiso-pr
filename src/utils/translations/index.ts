
import { spanishTranslations } from './spanish';
import { englishTranslations } from './english';
import { Translations } from './types';

export const translations: Translations = {
  es: spanishTranslations,
  en: englishTranslations
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

// Re-export types for external use
export type { TranslationData, BusinessTypes, Translations } from './types';
