import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  Users,
  Facebook,
  X,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { APP_LINKS } from '../data/kinxData';
import { useLanguage } from '../context/LanguageContext';

export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const chatTexts = {
    vi: {
      btnOpen: 'Chat & Hỗ Trợ Kỹ Thuật',
      btnClose: 'Đóng Hỗ Trợ',
      channelsCount: '3 Kênh',
      headerTitle: 'Trung Tâm Hỗ Trợ Kinx Auto',
      headerStatus: 'Kỹ thuật viên online 24/7',
      desc: 'Chọn kênh kết nối thuận tiện nhất để được tư vấn cài đặt Ultraview hoặc tham gia cộng đồng:',
      zaloTech: 'Zalo Kỹ Thuật 1-1',
      zaloBadge: 'Phản hồi ngay',
      zaloSub: 'Hotline: 0563.402.950 (Ultraview)',
      groupTitle: 'Nhóm Zalo Cộng Đồng',
      groupBadge: 'Cộng đồng MMO',
      groupSub: 'Giao lưu mẹo làm video & nhận Prompt AI',
      fanpageTitle: 'Fanpage Facebook',
      fanpageBadge: 'Chính thức',
      fanpageSub: 'Kinx Auto Tools (@kinx.auto.tools)',
      footerNote: 'Hỗ trợ cài đặt Ultraview',
      footerFree: '24/7 Miễn Phí'
    },
    en: {
      btnOpen: 'Live Support & Community',
      btnClose: 'Close Support',
      channelsCount: '3 Channels',
      headerTitle: 'Kinx Auto Support Center',
      headerStatus: 'Engineers Online 24/7',
      desc: 'Choose your preferred channel for 1-on-1 Ultraview setup, license activation, or community chat:',
      zaloTech: '1-on-1 Direct Support Hotline',
      zaloBadge: 'Instant Reply',
      zaloSub: 'Zalo / WhatsApp: 0563.402.950 (Remote Setup)',
      groupTitle: 'VIP Creator Community',
      groupBadge: 'Global Creators',
      groupSub: 'Exchange video workflow hacks & prompt packs',
      fanpageTitle: 'Official Facebook Page',
      fanpageBadge: 'Verified',
      fanpageSub: 'Kinx Auto Official Support Page',
      footerNote: 'Free Remote Ultraview Setup',
      footerFree: '24/7 Free Guarantee'
    },
    ja: {
      btnOpen: 'サポート・コミュニティ',
      btnClose: 'サポートを閉じる',
      channelsCount: '3窓口',
      headerTitle: 'Kinx Auto サポートセンター',
      headerStatus: 'エンジニア24時間待機中',
      desc: '初期設定やライセンス発行、コミュニティへの参加など最適な窓口をお選びください：',
      zaloTech: '専任エンジニア 1:1 サポート',
      zaloBadge: '即時返答',
      zaloSub: '直通ホットライン: 0563.402.950 (遠隔導入支援)',
      groupTitle: '公式クリエイターグループ',
      groupBadge: 'AI動画コミュニティ',
      groupSub: 'プロンプト配布＆収益化ノウハウ共有',
      fanpageTitle: '公式Facebookページ',
      fanpageBadge: '公式認定',
      fanpageSub: 'Kinx Auto 公式ニュース＆アップデート',
      footerNote: '安心の遠隔リモート初期設定',
      footerFree: '24時間年中無休・無料'
    },
    zh: {
      btnOpen: '在线技术支持与社群',
      btnClose: '收起支持面板',
      channelsCount: '3 大通道',
      headerTitle: 'Kinx Auto 官方技术支持中心',
      headerStatus: '技术专家 7×24 在线',
      desc: '请选择您最方便的联系方式以获取 1对1 远程环境配置或加入官方创作者社群：',
      zaloTech: '1对1 专属技术支持热线',
      zaloBadge: '极速响应',
      zaloSub: 'Zalo/微信咨询: 0563.402.950 (远程协助)',
      groupTitle: '官方 VIP 创作者社群',
      groupBadge: '出海搞钱社群',
      groupSub: '交流爆款视频打法并免费领取全套提示词',
      fanpageTitle: '官方 Facebook 专页',
      fanpageBadge: '官方认证',
      fanpageSub: 'Kinx Auto 官方主页 (@kinx.auto.tools)',
      footerNote: '免费提供远程一对一协助安装',
      footerFree: '全天候免费'
    }
  }[language] || {
    btnOpen: 'Chat & Hỗ Trợ Kỹ Thuật',
    btnClose: 'Đóng Hỗ Trợ',
    channelsCount: '3 Kênh',
    headerTitle: 'Trung Tâm Hỗ Trợ Kinx Auto',
    headerStatus: 'Kỹ thuật viên online 24/7',
    desc: 'Chọn kênh kết nối thuận tiện nhất để được tư vấn cài đặt Ultraview hoặc tham gia cộng đồng:',
    zaloTech: 'Zalo Kỹ Thuật 1-1',
    zaloBadge: 'Phản hồi ngay',
    zaloSub: 'Hotline: 0563.402.950 (Ultraview)',
    groupTitle: 'Nhóm Zalo Cộng Đồng',
    groupBadge: 'Cộng đồng MMO',
    groupSub: 'Giao lưu mẹo làm video & nhận Prompt AI',
    fanpageTitle: 'Fanpage Facebook',
    fanpageBadge: 'Chính thức',
    fanpageSub: 'Kinx Auto Tools (@kinx.auto.tools)',
    footerNote: 'Hỗ trợ cài đặt Ultraview',
    footerFree: '24/7 Miễn Phí'
  };

  return (
    <div className="relative pointer-events-auto">
      {/* Expanded Contact Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[320px] sm:w-[360px] rounded-3xl bg-[#0D1322]/95 backdrop-blur-2xl border border-purple-500/30 shadow-2xl shadow-purple-950/80 p-4 sm:p-5 overflow-hidden text-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
                  <Sparkles className="w-4 h-4 text-purple-200" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                    {chatTexts.headerTitle}
                  </h4>
                  <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {chatTexts.headerStatus}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label={chatTexts.btnClose}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              {chatTexts.desc}
            </p>

            {/* Channels List */}
            <div className="space-y-2.5">
              {/* 1. Zalo Kỹ Thuật 1:1 */}
              <a
                href={APP_LINKS.zaloSupport}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-blue-950/70 to-indigo-950/70 hover:from-blue-900/80 hover:to-indigo-900/80 border border-blue-500/30 hover:border-blue-400 transition-all group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-md shadow-blue-600/40">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">
                        {chatTexts.zaloTech}
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {chatTexts.zaloBadge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {chatTexts.zaloSub}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>

              {/* 2. Nhóm Zalo Cộng Đồng */}
              <a
                href={APP_LINKS.zaloGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-purple-950/70 to-slate-900/80 hover:from-purple-900/80 hover:to-slate-800/80 border border-purple-500/30 hover:border-purple-400 transition-all group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-md shadow-purple-600/40">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white group-hover:text-purple-300 transition-colors">
                        {chatTexts.groupTitle}
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {chatTexts.groupBadge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {chatTexts.groupSub}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-300 group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>

              {/* 3. Facebook Fanpage */}
              <a
                href={APP_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-900/80 hover:from-blue-900/70 hover:to-slate-800/80 border border-blue-600/30 hover:border-blue-500 transition-all group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-700/40">
                    <Facebook className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-white group-hover:text-blue-300 transition-colors">
                        {chatTexts.fanpageTitle}
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {chatTexts.fanpageBadge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {chatTexts.fanpageSub}
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-300 group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>
            </div>

            {/* Bottom Note */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {chatTexts.footerNote}
              </span>
              <span>{chatTexts.footerFree}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center gap-2 px-4 py-3 rounded-full text-white shadow-2xl transition-all duration-300 border cursor-pointer ${
          isOpen
            ? 'bg-slate-800 hover:bg-slate-700 border-slate-600 shadow-slate-900/60'
            : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 border-purple-400/40 shadow-purple-950/80 hover:scale-105'
        }`}
        title={chatTexts.btnOpen}
      >
        <div className="relative">
          <MessageCircle className={`w-5 h-5 ${!isOpen ? 'animate-bounce' : ''}`} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0B0F19] animate-pulse" />
        </div>
        <span className="font-bold text-xs sm:text-sm whitespace-nowrap">
          {isOpen ? chatTexts.btnClose : chatTexts.btnOpen}
        </span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        ) : (
          <span className="hidden sm:inline-block text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-semibold">
            {chatTexts.channelsCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default FloatingChatWidget;
