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
  setLanguage: (lang: Language, isManualChoice?: boolean) => void;
  t: (path: string, fallback?: string) => any;
  detectedInfo: GeoDetectionInfo | null;
  isDetecting: boolean;
  availableLanguages: LanguageOption[];
  redetectLanguage: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'kinx_user_language_v1';
const MANUAL_OVERRIDE_KEY = 'kinx_user_manual_lang_override';

// Helper to determine initial language immediately before network calls
const getInitialImmediateLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && ['vi', 'en', 'ja', 'zh'].includes(saved)) {
      return saved;
    }
    // Check browser locale as instant first guess
    if (typeof navigator !== 'undefined') {
      const loc = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
      if (loc.startsWith('vi')) return 'vi';
      if (loc.startsWith('ja')) return 'ja';
      if (loc.startsWith('zh')) return 'zh';
      return 'en'; // Any other locale defaults to English immediately
    }
  } catch (e) {
    // fallback
  }
  return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialImmediateLanguage);
  const [detectedInfo, setDetectedInfo] = useState<GeoDetectionInfo | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(true);

  // Helper to map country code to language
  const mapCountryToLang = (countryCode: string, localeStr?: string): Language => {
    const code = countryCode ? countryCode.toUpperCase().trim() : '';
    
    // Vietnam -> Vietnamese
    if (code === 'VN') return 'vi';
    
    // Japan -> Japanese
    if (code === 'JP') return 'ja';
    
    // China, Taiwan, Hong Kong, Macau -> Chinese
    if (['CN', 'TW', 'HK', 'MO'].includes(code)) return 'zh';

    // Any other country code (US, GB, FR, DE, KR, AU, CA, SG, etc.) -> English
    if (code && code !== 'UNKNOWN') {
      return 'en';
    }

    // If country is unknown, inspect browser locale
    if (localeStr) {
      const loc = localeStr.toLowerCase();
      if (loc.startsWith('vi')) return 'vi';
      if (loc.startsWith('ja')) return 'ja';
      if (loc.startsWith('zh')) return 'zh';
    }

    // Default international is English
    return 'en';
  };

  const setLanguage = useCallback((newLang: Language, isManualChoice = true) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      if (isManualChoice) {
        localStorage.setItem(MANUAL_OVERRIDE_KEY, 'true');
      }
      document.documentElement.lang = newLang;
    } catch (e) {
      // ignore localstorage error
    }
  }, []);

  // IP & Geolocation Detection
  const runDetection = useCallback(async (force = false) => {
    setIsDetecting(true);
    try {
      // Check manual override if not forced
      if (!force) {
        const manualOverride = localStorage.getItem(MANUAL_OVERRIDE_KEY);
        const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
        if (manualOverride === 'true' && savedLang && ['vi', 'en', 'ja', 'zh'].includes(savedLang)) {
          setLanguageState(savedLang);
          document.documentElement.lang = savedLang;
          setIsDetecting(false);
          return;
        }
      }

      let detectedCountry = '';
      let detectedIp = '';
      let detectedCountryName = '';
      let source = '';

      // 1. Try server-side /api/geo first (Fastest & most accurate behind Cloud Run / Proxies)
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 1800);
        const res = await fetch('/api/geo', { signal: controller.signal });
        clearTimeout(timer);
        if (res.ok) {
          const data = await res.json();
          if (data?.country && data.country !== 'unknown') {
            detectedCountry = String(data.country).toUpperCase();
            detectedIp = data.ip || '';
            source = data.source || 'server_geo';
          }
        }
      } catch (e) {
        // Fallback to client-side detection
      }

      // 2. Client-side fallback: get.geojs.io
      if (!detectedCountry) {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 1600);
          const clientGeo = await fetch('https://get.geojs.io/v1/ip/country.json', { signal: controller.signal });
          clearTimeout(timer);
          if (clientGeo.ok) {
            const data = await clientGeo.json();
            if (data?.country) {
              detectedCountry = String(data.country).toUpperCase();
              detectedCountryName = data.name || '';
              source = 'geojs_client';
            }
          }
        } catch (e) {
          // next fallback
        }
      }

      // 3. Client-side fallback: api.country.is
      if (!detectedCountry) {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 1600);
          const clientGeo = await fetch('https://api.country.is/', { signal: controller.signal });
          clearTimeout(timer);
          if (clientGeo.ok) {
            const data = await clientGeo.json();
            if (data?.country) {
              detectedCountry = String(data.country).toUpperCase();
              detectedIp = data.ip || detectedIp;
              source = 'country_is_client';
            }
          }
        } catch (e) {
          // next fallback
        }
      }

      const navLang = typeof navigator !== 'undefined' ? (navigator.language || (navigator.languages && navigator.languages[0]) || '') : '';
      const targetLang = mapCountryToLang(detectedCountry, navLang);

      // Silently switch language right from the start
      setLanguageState(targetLang);
      document.documentElement.lang = targetLang;
      localStorage.setItem(STORAGE_KEY, targetLang);
      if (force) {
        localStorage.removeItem(MANUAL_OVERRIDE_KEY);
      }

      setDetectedInfo({
        ip: detectedIp,
        country: detectedCountry || (targetLang === 'vi' ? 'VN' : targetLang === 'ja' ? 'JP' : targetLang === 'zh' ? 'CN' : 'US'),
        countryName: detectedCountryName || (detectedCountry === 'VN' ? 'Vietnam' : detectedCountry === 'JP' ? 'Japan' : detectedCountry ? detectedCountry : 'Auto'),
        source: source || 'browser_locale',
        autoSwitched: true
      });

      setIsDetecting(false);
    } catch (err) {
      setIsDetecting(false);
    }
  }, []);

  const redetectLanguage = useCallback(async () => {
    await runDetection(true);
  }, [runDetection]);

  // Initial detection on mount
  useEffect(() => {
    runDetection(false);
  }, [runDetection]);

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
        isDetecting,
        availableLanguages: LANGUAGES,
        redetectLanguage
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
