import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, DollarSign, Clock, Download, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface RoiCalculatorProps {
  onScrollToDownload: () => void;
  onOpenLeadModal: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({
  onScrollToDownload,
}) => {
  const { language } = useLanguage();
  const [videoCount, setVideoCount] = useState<number>(10);

  const calcTexts = {
    vi: {
      tag: 'BẢNG TÍNH LỢI NHUẬN & HIỆU SUẤT',
      title: 'Bạn Sẽ Tiết Kiệm Được Bao Nhiêu',
      titleHighlight: 'Thời Gian & Tiền Bạc?',
      subtitle: 'Kéo thanh trượt bên dưới để ước tính chi phí và thời gian được tối ưu hóa khi sử dụng Kinx Auto.',
      slider1Label: 'Số video bạn muốn xuất bản mỗi ngày:',
      slider1Unit: 'Video / Ngày',
      slider2Label: 'Chi phí thuê ngoài / edit thủ công 1 video:',
      slider2Presets: ['30.000đ (Cơ bản)', '100.000đ (Bán chuyên)', '200.000đ (Editor xịn)'],
      summaryTitle: (total: number) => `Tổng sản lượng video: ${total} video/tháng`,
      summaryDesc: 'Đủ để bạn vận hành từ 3 đến 5 kênh YouTube Shorts / TikTok cùng lúc mà không cần thêm nhân sự.',
      savedTimeHeader: 'Thời Gian Bạn Tiết Kiệm Được',
      savedTimeValue: (hrs: number) => `${hrs} Giờ / Tháng`,
      savedTimeDesc: (days: number) => `Tương đương ${days} ngày làm việc toàn thời gian được giải phóng cho bạn nghỉ ngơi và nghiên cứu xu hướng mới.`,
      savedMoneyHeader: 'Số Tiền Tiết Kiệm Ròng Mỗi Tháng',
      savedMoneyDesc: (manual: string) => `Bạn chỉ đầu tư 550.000đ/tháng cho Kinx Auto thay vì phải trả ${manual} cho đội ngũ editor thủ công!`,
      ctaBtn: 'Bắt Đầu Tiết Kiệm Ngay - Tải Kinx Auto',
      defaultCost: 70000,
      kinxCost: 550000,
      minCost: 30000,
      maxCost: 200000,
      stepCost: 10000,
      formatCurrency: (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val),
    },
    en: {
      tag: 'ROI & PERFORMANCE CALCULATOR',
      title: 'How Much Will You Save in',
      titleHighlight: 'Time & Real Money?',
      subtitle: 'Adjust the sliders below to calculate your estimated workflow speedup and operational cost savings with Kinx Auto.',
      slider1Label: 'Target videos published per day:',
      slider1Unit: 'Videos / Day',
      slider2Label: 'Manual editing / Freelancer cost per video:',
      slider2Presets: ['$2.00 (Entry level)', '$5.00 (Semi-pro)', '$10.00 (Top editor)'],
      summaryTitle: (total: number) => `Total Monthly Video Output: ${total} videos/month`,
      summaryDesc: 'Easily scale and manage 3-5 concurrent YouTube Shorts & TikTok channels with zero added staff.',
      savedTimeHeader: 'Time Reclaimed Every Month',
      savedTimeValue: (hrs: number) => `${hrs} Hours / Month`,
      savedTimeDesc: (days: number) => `Equivalent to ${days} full working days freed up for creative strategy and personal leisure.`,
      savedMoneyHeader: 'Estimated Net Monthly Savings',
      savedMoneyDesc: (manual: string) => `You invest only $22/month in Kinx Auto instead of paying ${manual} for manual outsourced editing!`,
      ctaBtn: 'Start Saving Now - Download Kinx Auto',
      defaultCost: 4,
      kinxCost: 22,
      minCost: 1,
      maxCost: 15,
      stepCost: 1,
      formatCurrency: (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val),
    },
    ja: {
      tag: 'ROI＆コスト削減シミュレーター',
      title: '動画制作においてどれだけの',
      titleHighlight: '時間とコストを削減できるか？',
      subtitle: 'スライダーを動かして、Kinx Auto導入による制作時間短縮と費用削減の試算をご確認ください。',
      slider1Label: '1日あたりの目標動画投稿本数:',
      slider1Unit: '本 / 日',
      slider2Label: '外注・手作業編集の1本当たりコスト:',
      slider2Presets: ['¥300 (簡易編集)', '¥800 (標準編集)', '¥1,500 (プロ編集)'],
      summaryTitle: (total: number) => `月間動画生産量: 合計 ${total} 本/月`,
      summaryDesc: '追加の人員を雇うことなく、3〜5つのYouTube ShortsやTikTokチャンネルを同時に運用可能です。',
      savedTimeHeader: '毎月節約できる作業時間',
      savedTimeValue: (hrs: number) => `${hrs} 時間 / 月`,
      savedTimeDesc: (days: number) => `フルタイム換算で約 ${days} 日分の労働時間を他の企画やリサーチに充てることができます。`,
      savedMoneyHeader: '月間の実質コスト削減額',
      savedMoneyDesc: (manual: string) => `Kinx Autoなら月額わずか ¥3,500 のみ。外注費 ${manual} をまるごと削減可能です！`,
      ctaBtn: 'コスト削減を今すぐ開始 - Kinx Auto をダウンロード',
      defaultCost: 600,
      kinxCost: 3500,
      minCost: 200,
      maxCost: 2000,
      stepCost: 100,
      formatCurrency: (val: number) => new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(val),
    },
    zh: {
      tag: '收益与效率测算计算器',
      title: '使用 Kinx Auto 您将能节省多少',
      titleHighlight: '时间与外包资金成本？',
      subtitle: '拖动下方滑动条，实时预估使用 Kinx Auto 批量自动化后所节省的综合成本与人力时间。',
      slider1Label: '您计划每天导出的视频数量：',
      slider1Unit: '条 / 天',
      slider2Label: '单条视频手工剪辑或外包制作成本：',
      slider2Presets: ['¥10 (基础剪辑)', '¥30 (半专业)', '¥60 (资深剪辑)'],
      summaryTitle: (total: number) => `每月视频总产能：${total} 条视频/月`,
      summaryDesc: '足以支撑您同时全自动运营 3 到 5 个高权重矩阵账号，无需扩充任何团队人员。',
      savedTimeHeader: '每月为您节省的工时',
      savedTimeValue: (hrs: number) => `${hrs} 小时 / 月`,
      savedTimeDesc: (days: number) => `相当于释放了 ${days} 个全职工作日，让您专注于爆款题材策划与流量变现。`,
      savedMoneyHeader: '每月净节省资金成本',
      savedMoneyDesc: (manual: string) => `使用 Kinx Auto 仅需每月约 ¥160，而不是每月向外包团队支付高达 ${manual} 的制作费！`,
      ctaBtn: '立即开启降本增效 - 下载 Kinx Auto',
      defaultCost: 25,
      kinxCost: 160,
      minCost: 5,
      maxCost: 80,
      stepCost: 5,
      formatCurrency: (val: number) => new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }).format(val),
    }
  }[language] || {
    tag: 'BẢNG TÍNH LỢI NHUẬN & HIỆU SUẤT',
    title: 'Bạn Sẽ Tiết Kiệm Được Bao Nhiêu',
    titleHighlight: 'Thời Gian & Tiền Bạc?',
    subtitle: 'Kéo thanh trượt bên dưới để ước tính chi phí và thời gian được tối ưu hóa khi sử dụng Kinx Auto.',
    slider1Label: 'Số video bạn muốn xuất bản mỗi ngày:',
    slider1Unit: 'Video / Ngày',
    slider2Label: 'Chi phí thuê ngoài / edit thủ công 1 video:',
    slider2Presets: ['30.000đ (Cơ bản)', '100.000đ (Bán chuyên)', '200.000đ (Editor xịn)'],
    summaryTitle: (total: number) => `Tổng sản lượng video: ${total} video/tháng`,
    summaryDesc: 'Đủ để bạn vận hành từ 3 đến 5 kênh YouTube Shorts / TikTok cùng lúc mà không cần thêm nhân sự.',
    savedTimeHeader: 'Thời Gian Bạn Tiết Kiệm Được',
    savedTimeValue: (hrs: number) => `${hrs} Giờ / Tháng`,
    savedTimeDesc: (days: number) => `Tương đương ${days} ngày làm việc toàn thời gian được giải phóng cho bạn nghỉ ngơi và nghiên cứu xu hướng mới.`,
    savedMoneyHeader: 'Số Tiền Tiết Kiệm Ròng Mỗi Tháng',
    savedMoneyDesc: (manual: string) => `Bạn chỉ đầu tư 550.000đ/tháng cho Kinx Auto thay vì phải trả ${manual} cho đội ngũ editor thủ công!`,
    ctaBtn: 'Bắt Đầu Tiết Kiệm Ngay - Tải Kinx Auto',
    defaultCost: 70000,
    kinxCost: 550000,
    minCost: 30000,
    maxCost: 200000,
    stepCost: 10000,
    formatCurrency: (val: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val),
  };

  const [hiringCostPerVideo, setHiringCostPerVideo] = useState<number>(calcTexts.defaultCost);

  // Calculations
  const totalVideosMonth = videoCount * 30;
  const manualHoursPerMonth = Math.round(totalVideosMonth * 1.5);
  const kinxHoursPerMonth = Math.round(totalVideosMonth * 0.1);
  const hoursSaved = manualHoursPerMonth - kinxHoursPerMonth;

  const manualCostMonth = totalVideosMonth * hiringCostPerVideo;
  const moneySaved = Math.max(0, manualCostMonth - calcTexts.kinxCost);

  return (
    <section id="roi-calculator" className="py-10 sm:py-12 bg-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-bold text-emerald-300 mb-2">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>{calcTexts.tag}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
            {calcTexts.title}{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              {calcTexts.titleHighlight}
            </span>
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base">
            {calcTexts.subtitle}
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders Area */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center justify-between text-sm font-bold text-slate-200 mb-2">
                  <span>{calcTexts.slider1Label}</span>
                  <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 text-base font-black">
                    {videoCount} {calcTexts.slider1Unit}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={videoCount}
                  onChange={(e) => setVideoCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>1</span>
                  <span>10</span>
                  <span>25</span>
                  <span>50</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm font-bold text-slate-200 mb-2">
                  <span>{calcTexts.slider2Label}</span>
                  <span className="text-sm font-mono text-cyan-300 font-bold">
                    {calcTexts.formatCurrency(hiringCostPerVideo)}
                  </span>
                </div>
                <input
                  type="range"
                  min={calcTexts.minCost}
                  max={calcTexts.maxCost}
                  step={calcTexts.stepCost}
                  value={hiringCostPerVideo}
                  onChange={(e) => setHiringCostPerVideo(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>{calcTexts.slider2Presets[0]}</span>
                  <span>{calcTexts.slider2Presets[1]}</span>
                  <span>{calcTexts.slider2Presets[2]}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-purple-300 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{calcTexts.summaryTitle(totalVideosMonth)}</span>
                </div>
                <p className="text-slate-400 pl-6">
                  {calcTexts.summaryDesc}
                </p>
              </div>
            </div>

            {/* Results Display Grid */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/40 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase">{calcTexts.savedTimeHeader}</p>
                    <p className="font-display text-2xl sm:text-3xl font-black text-white">
                      {calcTexts.savedTimeValue(hoursSaved)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  {calcTexts.savedTimeDesc(Math.round(hoursSaved / 8))}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/40 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase">{calcTexts.savedMoneyHeader}</p>
                    <p className="font-display text-2xl sm:text-3xl font-black text-emerald-300">
                      {calcTexts.formatCurrency(moneySaved)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-300">
                  {calcTexts.savedMoneyDesc(calcTexts.formatCurrency(manualCostMonth))}
                </p>
              </div>

              <button
                onClick={onScrollToDownload}
                className="w-full glow-button flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:scale-[1.01] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{calcTexts.ctaBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoiCalculator;
