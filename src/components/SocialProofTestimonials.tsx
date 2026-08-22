import React from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedTestimonials } from '../data/localizedKinxData';

export const SocialProofTestimonials: React.FC = () => {
  const { language } = useLanguage();
  const testimonials = getLocalizedTestimonials(language);

  const uiTexts = {
    vi: {
      badge: 'CASE STUDY & REVIEW THỰC CHIẾN',
      titlePrefix: 'Người Dùng Nói Gì Về',
      subtitle: 'Hơn 15.000 Content Creator và Agency MMO đang ứng dụng Kinx Auto để tự động hóa hàng nghìn video mỗi ngày.',
    },
    en: {
      badge: 'REAL CASE STUDIES & CREATOR REVIEWS',
      titlePrefix: 'What Top Creators Say About',
      subtitle: 'Over 15,000+ content creators and video production agencies rely on Kinx Auto daily to publish thousands of automated videos.',
    },
    ja: {
      badge: '実践レビュー＆導入事例',
      titlePrefix: 'トップクリエイターの声：',
      subtitle: '15,000人以上の動画クリエイターやメディアチームがKinx Autoで毎日数千本の動画を自動生成しています。',
    },
    zh: {
      badge: '真实用户案例与实测评价',
      titlePrefix: '全球创作者眼中的',
      subtitle: '超过 15,000+ 头部内容创作者与 MCN 机构正在使用 Kinx Auto 每天批量自动化产出数千条爆款视频。',
    },
  }[language] || {
    badge: 'CASE STUDY & REVIEW THỰC CHIẾN',
    titlePrefix: 'Người Dùng Nói Gì Về',
    subtitle: 'Hơn 15.000 Content Creator và Agency MMO đang ứng dụng Kinx Auto để tự động hóa hàng nghìn video mỗi ngày.',
  };

  return (
    <section id="testimonials" className="py-10 sm:py-12 bg-gradient-to-b from-[#0B0F19] via-[#0F172A] to-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-xs font-bold text-amber-300 mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{uiTexts.badge}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
            {uiTexts.titlePrefix} <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-purple-300 bg-clip-text text-transparent">Kinx Auto</span>?
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base">
            {uiTexts.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-6 bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-purple-500/40 transition-all shadow-xl"
            >
              <div>
                {/* Rating stars & stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {item.stats}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-11 h-11 rounded-full object-cover border border-purple-500/40"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs sm:text-sm font-bold text-white">{item.author}</p>
                    {item.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">{item.role}</p>
                  <p className="text-[10px] text-purple-400 font-semibold">{item.channelName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default SocialProofTestimonials;
