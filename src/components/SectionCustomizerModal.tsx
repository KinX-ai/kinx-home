import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Sliders,
  Check,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';
import { SectionConfig } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface SectionCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: SectionConfig[];
  onToggleVisibility: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onReset: () => void;
  currentDevice: 'desktop' | 'tablet' | 'mobile';
  onChangeDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
}

export const SectionCustomizerModal: React.FC<SectionCustomizerModalProps> = ({
  isOpen,
  onClose,
  sections,
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
  onReset,
  currentDevice,
  onChangeDevice,
}) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const modalTexts = {
    vi: {
      title: 'Tùy Biến Bố Cục & Trình Bày Landing Page',
      subtitle: 'Kéo sắp xếp thứ tự các khối nội dung theo ý muốn',
      previewMode: 'Chế độ xem trước thiết bị:',
      btnReset: 'Khôi Phục Mặc Định',
      btnApply: 'Áp Dụng Bố Cục',
      moveUp: 'Di chuyển lên',
      moveDown: 'Di chuyển xuống',
      showing: 'Đang hiển thị',
      hidden: 'Đang ẩn',
      sectionNames: {
        hero: 'Banner & Giới Thiệu Đầu Trang',
        'software-gallery': 'Giao Diện & Video Demo Thực Tế',
        'features-deepdive': '6 Module Tự Động Hóa Kép Kinx Auto',
        'interactive-flow': 'Mô Phỏng Trải Nghiệm 1-Click',
        'roi-calculator': 'Bảng Tính Lợi Nhuận & Tiết Kiệm',
        comparison: 'So Sánh Kinx Auto vs Đối Thủ',
        pricing: 'Bảng Giá & Gói Bản Quyền',
        testimonials: 'Đánh Giá Từ Cộng Đồng Sáng Tạo',
        faq: 'Câu Hỏi Thường Gặp & Giải Đáp',
        download: 'Khu Vực Tải Phần Mềm Kinx Auto'
      } as Record<string, string>
    },
    en: {
      title: 'Customize Page Layout & Sections',
      subtitle: 'Reorder sections or toggle visibility according to your preference',
      previewMode: 'Device Viewport Mode:',
      btnReset: 'Reset to Default',
      btnApply: 'Apply Layout',
      moveUp: 'Move Up',
      moveDown: 'Move Down',
      showing: 'Visible',
      hidden: 'Hidden',
      sectionNames: {
        hero: 'Hero Header & Introduction',
        'software-gallery': 'UI Gallery & Video Workflows',
        'features-deepdive': '6 Core Automation Modules',
        'interactive-flow': '1-Click Interactive Workflow Simulator',
        'roi-calculator': 'ROI & Cost-Savings Calculator',
        comparison: 'Kinx Auto vs Traditional Tools',
        pricing: 'Pricing & License Packages',
        testimonials: 'Creator Proof & Reviews',
        faq: 'Frequently Asked Questions',
        download: 'Software Download Center'
      } as Record<string, string>
    },
    ja: {
      title: 'レイアウト＆セクション表示カスタマイズ',
      subtitle: '各セクションの順序変更や表示・非表示を自由に設定できます',
      previewMode: 'プレビュー端末表示:',
      btnReset: '初期設定に戻す',
      btnApply: 'レイアウトを適用',
      moveUp: '上に移動',
      moveDown: '下に移動',
      showing: '表示中',
      hidden: '非表示',
      sectionNames: {
        hero: 'メインヘッダー・導入',
        'software-gallery': 'UIギャラリー・実機デモ',
        'features-deepdive': '6大自動化コアモジュール',
        'interactive-flow': '1クリック制作シミュレーター',
        'roi-calculator': 'ROI・コスト削減計算機',
        comparison: '他社・従来手法との徹底比較',
        pricing: '料金プラン・ライセンス',
        testimonials: '導入実績・クリエイターの声',
        faq: 'よくある質問と回答',
        download: 'ソフトウェアダウンロード'
      } as Record<string, string>
    },
    zh: {
      title: '自定义页面板块与布局',
      subtitle: '按需自由调整各功能板块的显示顺序与可见状态',
      previewMode: '终端设备视口预览：',
      btnReset: '恢复默认布局',
      btnApply: '应用当前布局',
      moveUp: '上移',
      moveDown: '下移',
      showing: '当前显示',
      hidden: '当前隐藏',
      sectionNames: {
        hero: '首屏横幅与核心简介',
        'software-gallery': '真实软件界面与视频流演示',
        'features-deepdive': '6大闭环自动化模块解析',
        'interactive-flow': '1键制作交互式全流程实操',
        'roi-calculator': '收益与降本增效测算器',
        comparison: 'Kinx Auto 与传统外包全方位对比',
        pricing: '价格与商业授权方案',
        testimonials: '头部创作者实战好评',
        faq: '常见问题答疑汇总',
        download: '客户端软件极速下载区'
      } as Record<string, string>
    }
  }[language] || {
    title: 'Tùy Biến Bố Cục & Trình Bày Landing Page',
    subtitle: 'Kéo sắp xếp thứ tự các khối nội dung theo ý muốn',
    previewMode: 'Chế độ xem trước thiết bị:',
    btnReset: 'Khôi Phục Mặc Định',
    btnApply: 'Áp Dụng Bố Cục',
    moveUp: 'Di chuyển lên',
    moveDown: 'Di chuyển xuống',
    showing: 'Đang hiển thị',
    hidden: 'Đang ẩn',
    sectionNames: {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 relative max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">{modalTexts.title}</h3>
              <p className="text-xs text-slate-400">{modalTexts.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device View Selector */}
        <div className="py-4 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs font-semibold text-slate-300">{modalTexts.previewMode}</span>
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => onChangeDevice('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentDevice === 'desktop'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => onChangeDevice('tablet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentDevice === 'tablet'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
            <button
              onClick={() => onChangeDevice('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currentDevice === 'mobile'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        {/* Sections List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-2.5 pr-2">
          {sections.map((section, idx) => {
            const isVisible = section.visible ?? section.enabled ?? true;
            const displayName = modalTexts.sectionNames[section.id] || section.name || section.title || section.id;
            return (
              <div
                key={section.id}
                className={`p-3.5 rounded-2xl flex items-center justify-between border transition-all ${
                  isVisible
                    ? 'bg-slate-950/80 border-slate-800'
                    : 'bg-slate-950/30 border-slate-900 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono text-xs w-5">{idx + 1}.</span>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white">{displayName}</p>
                    {section.description && <p className="text-[11px] text-slate-400">{section.description}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Move Up */}
                  <button
                    disabled={idx === 0}
                    onClick={() => onMoveUp(idx)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title={modalTexts.moveUp}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  {/* Move Down */}
                  <button
                    disabled={idx === sections.length - 1}
                    onClick={() => onMoveDown(idx)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title={modalTexts.moveDown}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  {/* Toggle Visible */}
                  <button
                    onClick={() => onToggleVisibility(section.id)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isVisible
                        ? 'bg-purple-950 text-purple-300 border border-purple-500/40 hover:bg-purple-900'
                        : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                    }`}
                    title={isVisible ? modalTexts.showing : modalTexts.hidden}
                  >
                    {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{modalTexts.btnReset}</span>
          </button>

          <button
            onClick={onClose}
            className="glow-button flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{modalTexts.btnApply}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionCustomizerModal;
