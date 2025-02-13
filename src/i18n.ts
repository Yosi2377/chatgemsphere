import { useEffect, useState } from 'react';

// Available locales
const LOCALES = ['en', 'he'] as const;
type Locale = typeof LOCALES[number];

// Current locale
let currentLocale: Locale = 'en';

// Store translations  (This needs to be populated with your actual translations)
const translations: Record<Locale, Record<string, string>> = {
  en: {
    'Translate to Hebrew': 'Translate to Hebrew',
    'Translating...': 'Translating...',
    'Error:': 'Error:',
    'Translated!': 'Translated!',
  },
  he: {
    'Translate to Hebrew': 'תרגם לעברית',
    'Translating...': 'מתרגם...',
    'Error:': 'שגיאה:',
    'Translated!': 'תורגם!',
  },
};

// Function to check if a locale is available
export const isLocaleAvailable = (locale: string): locale is Locale => {
  return LOCALES.includes(locale as Locale);
};

// Function to set the current locale
export const setLocale = (locale: Locale) => {
  if (isLocaleAvailable(locale)) {
    currentLocale = locale;
    document.documentElement.dir = locale === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }
};

// Translation function
export const t = (key: string): string => {
  const translation = translations[currentLocale]?.[key];
  if (!translation) {
    console.warn(`Translation missing for key "${key}" in locale "${currentLocale}"`);
    return key;
  }
  return translation;
};

// React hook for translations
export const useTranslation = () => {
  const [, setUpdate] = useState({});

  useEffect(() => {
    // Force update when locale changes
    const forceUpdate = () => setUpdate({});
    window.addEventListener('languagechange', forceUpdate);
    return () => window.removeEventListener('languagechange', forceUpdate);
  }, []);

  return { t };
};
