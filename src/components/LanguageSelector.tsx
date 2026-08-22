import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown, Sparkles, MapPin, RotateCw } from 'lucide-react';
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
  const { language, currentLanguageOption, setLanguage, availableLanguages, detectedInfo, redetectLanguage, isDetecting } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
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
    setLanguage(code, true);
    setIsOpen(false);
  };

  const handleAutoDetect = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRefreshing(true);
    await redetectLanguage();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
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

            {/* Auto IP info & Re-detect button */}
            <div className="mt-2 pt-2 border-t border-slate-800/80">
              <button
                onClick={handleAutoDetect}
                disabled={isDetecting || isRefreshing}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[11px] transition-all border border-slate-800 hover:border-slate-700 cursor-pointer"
                title="Quét lại địa chỉ IP để tự động chuyển ngôn ngữ theo quốc gia"
              >
                <span className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">
                    IP: <strong className="text-slate-200">{detectedInfo?.country || 'Auto'}</strong>
                  </span>
                </span>
                <span className="flex items-center gap-1 text-[10px] text-purple-400 font-semibold shrink-0">
                  <RotateCw className={`w-3 h-3 ${isRefreshing || isDetecting ? 'animate-spin' : ''}`} />
                  <span>Quét lại</span>
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

