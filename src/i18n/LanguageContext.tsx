import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Language, LANGUAGES, LanguageOption } from './types';
import { TRANSLATIONS } from './translations';

interface GeoDetectionInfo {
  ip: string;
  country: string;
  countryName?: string;
  source: string;
  autoSwitched: boolean;
}

interface LanguageContextType {
  language: Language;
  currentLanguageOption: LanguageOption;
  setLanguage: (lang: Language) => void;
  t: (path: string, fallback?: string) => any;
  detectedInfo: GeoDetectionInfo | null;
  showGeoToast: boolean;
  dismissGeoToast: () => void;
  isDetecting: boolean;
  availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'kinx_user_language_v1';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('vi');
  const [detectedInfo, setDetectedInfo] = useState<GeoDetectionInfo | null>(null);
  const [showGeoToast, setShowGeoToast] = useState<boolean>(false);
  const [isDetecting, setIsDetecting] = useState<boolean>(true);

  // Helper to map country code or locale to supported language
  const mapCountryToLang = (countryCode: string, localeStr?: string): Language => {
    const code = countryCode ? countryCode.toUpperCase() : '';
    if (code === 'VN') return 'vi';
    if (code === 'JP') return 'ja';
    if (['CN', 'TW', 'HK', 'MO', 'SG'].includes(code)) return 'zh';

    if (localeStr) {
      const loc = localeStr.toLowerCase();
      if (loc.startsWith('vi')) return 'vi';
      if (loc.startsWith('ja')) return 'ja';
      if (loc.startsWith('zh')) return 'zh';
    }

    // Default to English for international visitors
    return 'en';
  };

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch (e) {
      // ignore localstorage error
    }
  }, []);

  const dismissGeoToast = useCallback(() => {
    setShowGeoToast(false);
  }, []);

  // IP & Geolocation Detection
  useEffect(() => {
    let isMounted = true;

    const detectLanguageFromIP = async () => {
      try {
        const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
        if (savedLang && ['vi', 'en', 'ja', 'zh'].includes(savedLang)) {
          if (isMounted) {
            setLanguageState(savedLang);
            document.documentElement.lang = savedLang;
            setIsDetecting(false);
          }
          return;
        }

        // Try server-side /api/geo first
        let detectedCountry = '';
        let detectedIp = '';
        let source = '';

        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 2000);
          const res = await fetch('/api/geo', { signal: controller.signal });
          clearTimeout(timer);
          if (res.ok) {
            const data = await res.json();
            if (data?.country) {
              detectedCountry = data.country;
              detectedIp = data.ip || '';
              source = data.source || 'server_geo';
            }
          }
        } catch (e) {
          // Fallback to client-side detection
        }

        // Client-side fallback if server didn't get it
        if (!detectedCountry) {
          try {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 1800);
            const clientGeo = await fetch('https://api.country.is/', { signal: controller.signal });
            clearTimeout(timer);
            if (clientGeo.ok) {
              const data = await clientGeo.json();
              if (data?.country) {
                detectedCountry = data.country;
                detectedIp = data.ip || '';
                source = 'client_country_is';
              }
            }
          } catch (e) {
            // next fallback
          }
        }

        const navLang = navigator.language || (navigator.languages && navigator.languages[0]) || '';
        const targetLang = mapCountryToLang(detectedCountry, navLang);

        if (isMounted) {
          setLanguageState(targetLang);
          document.documentElement.lang = targetLang;
          setDetectedInfo({
            ip: detectedIp,
            country: detectedCountry || (targetLang === 'vi' ? 'VN' : targetLang === 'ja' ? 'JP' : targetLang === 'zh' ? 'CN' : 'US'),
            source: source || 'browser_locale',
            autoSwitched: true
          });

          // Show subtle notification only if user is non-Vietnamese or language is switched
          if (targetLang !== 'vi') {
            setShowGeoToast(true);
            // Auto hide after 8 seconds
            setTimeout(() => {
              if (isMounted) setShowGeoToast(false);
            }, 8000);
          }
          setIsDetecting(false);
        }
      } catch (err) {
        if (isMounted) {
          setIsDetecting(false);
        }
      }
    };

    detectLanguageFromIP();

    return () => {
      isMounted = false;
    };
  }, []);

  // Nested dictionary accessor function: t('hero.titleHighlight1')
  const t = useCallback(
    (path: string, fallback?: string): any => {
      const keys = path.split('.');
      let current: any = TRANSLATIONS[language] || TRANSLATIONS.vi;

      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          current = current[key];
        } else {
          // Fallback to Vietnamese dictionary
          let viFallback: any = TRANSLATIONS.vi;
          for (const viKey of keys) {
            if (viFallback && typeof viFallback === 'object' && viKey in viFallback) {
              viFallback = viFallback[viKey];
            } else {
              viFallback = undefined;
              break;
            }
          }
          return viFallback !== undefined ? viFallback : fallback || path;
        }
      }

      return current !== undefined ? current : fallback || path;
    },
    [language]
  );

  const currentLanguageOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguageOption,
        setLanguage,
        t,
        detectedInfo,
        showGeoToast,
        dismissGeoToast,
        isDetecting,
        availableLanguages: LANGUAGES
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
