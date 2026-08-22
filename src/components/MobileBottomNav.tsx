import React from 'react';
import { Layers, DollarSign, Download, MessageCircle, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { APP_LINKS } from '../data/kinxData';

interface MobileBottomNavProps {
  onScrollToDownload: () => void;
  onOpenFeatures: () => void;
  onOpenPricing: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onScrollToDownload,
  onOpenFeatures,
  onOpenPricing,
}) => {
  const { language } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLabels = {
    vi: {
      home: 'Trang Chủ',
      features: 'Tính Năng',
      download: 'Tải App',
      pricing: 'Bảng Giá',
      support: 'Hỗ Trợ 24/7'
    },
    en: {
      home: 'Home',
      features: 'Features',
      download: 'Get App',
      pricing: 'Pricing',
      support: 'Live 24/7'
    },
    ja: {
      home: 'ホーム',
      features: '主要機能',
      download: 'DLアプリ',
      pricing: '料金プラン',
      support: '24hサポート'
    },
    zh: {
      home: '首页',
      features: '核心功能',
      download: '下载软件',
      pricing: '价格方案',
      support: '在线客服'
    }
  }[language] || {
    home: 'Trang Chủ',
    features: 'Tính Năng',
    download: 'Tải App',
    pricing: 'Bảng Giá',
    support: 'Hỗ Trợ 24/7'
  };

  return (
    <nav
      aria-label="Mobile app bottom navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F19]/95 backdrop-blur-2xl border-t border-slate-800/90 shadow-2xl shadow-black/80 px-2 py-1.5 safe-area-bottom"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-white active:scale-95 transition-all cursor-pointer"
        >
          <Home className="w-5 h-5 text-slate-300 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight whitespace-nowrap">{navLabels.home}</span>
        </button>

        {/* Features */}
        <button
          onClick={() => {
            scrollTo('features-deepdive');
            onOpenFeatures();
          }}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-cyan-400 active:scale-95 transition-all cursor-pointer"
        >
          <Layers className="w-5 h-5 text-cyan-400 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight whitespace-nowrap">{navLabels.features}</span>
        </button>

        {/* Download App (Highlight Center Tab) */}
        <button
          onClick={onScrollToDownload}
          className="flex flex-col items-center justify-center -mt-4 py-1 px-3 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/40 border border-purple-400/40 active:scale-95 transition-all cursor-pointer"
        >
          <div className="w-7 h-7 flex items-center justify-center">
            <Download className="w-5 h-5 animate-bounce" />
          </div>
          <span className="text-[11px] font-bold tracking-tight whitespace-nowrap text-white">{navLabels.download}</span>
        </button>

        {/* Pricing */}
        <button
          onClick={() => {
            scrollTo('pricing');
            onOpenPricing();
          }}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400 hover:text-purple-300 active:scale-95 transition-all cursor-pointer"
        >
          <DollarSign className="w-5 h-5 text-purple-400 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight whitespace-nowrap">{navLabels.pricing}</span>
        </button>

        {/* Direct Chat */}
        <a
          href={APP_LINKS.zaloSupport}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-cyan-400 hover:text-cyan-300 active:scale-95 transition-all cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 text-cyan-400 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight whitespace-nowrap text-cyan-300">{navLabels.support}</span>
        </a>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
