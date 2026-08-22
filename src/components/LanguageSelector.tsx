import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/types';

interface LanguageSelectorProps {
  variant?: 'navbar' | 'mobile-menu' | 'footer' | 'compact';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'navbar',
  className = ''
}) => {
  const { language, currentLanguageOption, setLanguage, availableLanguages, detectedInfo } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  // Footer display variant (Horizontal buttons or clear selectors)
  if (variant === 'footer') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Globe className="w-3.5 h-3.5 text-purple-400" />
          <span>Ngôn ngữ / Language:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {availableLanguages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-purple-600/30 text-white border border-purple-500/50 shadow-sm shadow-purple-500/20'
                    : 'bg-slate-900/60 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-sm">{lang.flag}</span>
                  <span className="truncate">{lang.nativeName}</span>
                </span>
                {isSelected && <Check className="w-3 h-3 text-purple-300 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Mobile menu display variant
  if (variant === 'mobile-menu') {
    return (
      <div className={`p-3 rounded-2xl bg-slate-900/90 border border-slate-800 ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ngôn Ngữ / Language</span>
          </div>
          {detectedInfo?.country && (
            <span className="text-[10px] text-slate-400 font-mono bg-slate-800 px-2 py-0.5 rounded-full">
              IP: {detectedInfo.country}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {availableLanguages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-white border border-purple-500/50'
                    : 'bg-slate-950/70 hover:bg-slate-800 text-slate-300 border border-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  <div className="text-left">
                    <p className="leading-tight">{lang.nativeName}</p>
                    <p className="text-[9px] text-slate-400 font-normal">{lang.name}</p>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Compact variant for mobile headers
  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/70 text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
          aria-label="Change Language"
          title="Select Language / Chọn ngôn ngữ"
        >
          <span className="text-sm leading-none">{currentLanguageOption.flag}</span>
          <ChevronDown
            className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-purple-400' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-48 rounded-2xl bg-[#0F172A]/98 backdrop-blur-2xl border border-slate-700 shadow-2xl shadow-purple-950/40 p-2 z-50 overflow-hidden"
            >
              <div className="px-2 py-1 mb-1 border-b border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-purple-400" />
                  <span>Language</span>
                </span>
              </div>
              <div className="space-y-1">
                {availableLanguages.map((lang) => {
                  const isSelected = lang.code === language;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-purple-600/30 text-white border border-purple-500/40 font-semibold'
                          : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-left">
                        <span className="text-sm">{lang.flag}</span>
                        <span className="text-xs">{lang.nativeName}</span>
                      </div>
                      {isSelected && <Check className="w-3 h-3 text-cyan-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Navbar dropdown variant (Compact & Professional)
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/70 hover:border-purple-500/50 text-[11px] xl:text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
        aria-label="Change Language"
        title="Select Language / Chọn ngôn ngữ"
      >
        <span className="text-xs xl:text-sm leading-none">{currentLanguageOption.flag}</span>
        <span className="hidden md:inline font-medium">{currentLanguageOption.nativeName}</span>
        <ChevronDown
          className={`w-3 h-3 xl:w-3.5 xl:h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-purple-400' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0F172A]/98 backdrop-blur-2xl border border-slate-700 shadow-2xl shadow-purple-950/40 p-2 z-50 overflow-hidden"
          >
            <div className="px-2.5 py-1.5 mb-1 border-b border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-400">
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-purple-400" />
                <span>Chọn ngôn ngữ</span>
              </span>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Auto IP</span>
              </span>
            </div>

            <div className="space-y-1">
              {availableLanguages.map((lang) => {
                const isSelected = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-white border border-purple-500/40'
                        : 'hover:bg-slate-800/80 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <span className="text-base">{lang.flag}</span>
                      <div>
                        <p className="font-semibold text-slate-100">{lang.nativeName}</p>
                        <p className="text-[10px] text-slate-400">{lang.name}</p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Toast notification when IP language is automatically detected
export const GeoLanguageToast: React.FC = () => {
  const { showGeoToast, dismissGeoToast, currentLanguageOption, setLanguage, t } = useLanguage();

  if (!showGeoToast) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-full p-4 rounded-2xl bg-[#0F172A]/98 backdrop-blur-2xl border border-purple-500/40 shadow-2xl shadow-purple-950/50 text-white"
      >
        <div className="flex items-start gap-3">
          <div className="text-2xl p-1 bg-purple-500/20 rounded-xl border border-purple-500/30 shrink-0">
            {currentLanguageOption.flag}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-cyan-300 flex items-center gap-1">
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>{t('geoNotice.autoDetected')}</span>
              </p>
              <button
                onClick={dismissGeoToast}
                className="text-slate-400 hover:text-white text-xs px-1"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-200">
              {t('geoNotice.switchedTo')} <strong>{currentLanguageOption.nativeName}</strong> ({currentLanguageOption.name}).
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={dismissGeoToast}
                className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold shadow transition-colors"
              >
                {t('geoNotice.keep')}
              </button>
              <button
                onClick={() => setLanguage('vi')}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
              >
                🇻🇳 Tiếng Việt
              </button>
              <button
                onClick={() => setLanguage('en')}
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors"
              >
                🇺🇸 English
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
