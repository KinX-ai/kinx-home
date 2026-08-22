import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedFaqs } from '../data/localizedKinxData';

export const FaqSection: React.FC = () => {
  const { language } = useLanguage();
  const faqs = getLocalizedFaqs(language);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const uiTexts = {
    vi: {
      badge: 'GIẢI ĐÁP THẮC MẮC THƯỜNG GẶP',
      titlePrefix: 'Câu Hỏi &',
      titleHighlight: 'Tư Vấn Kỹ Thuật',
      subtitle: 'Mọi điều bạn cần biết trước khi sở hữu phần mềm tự động hóa Kinx Auto.',
      stillQuestionsTitle: 'Bạn vẫn còn câu hỏi chưa được giải đáp?',
      stillQuestionsDesc: 'Liên hệ trực tiếp với chuyên gia kỹ thuật của chúng tôi qua Zalo để được hỗ trợ và demo trực quan 1-1.',
      supportBtn: 'Zalo Kỹ Thuật: 0563.402.950',
    },
    en: {
      badge: 'FREQUENTLY ASKED QUESTIONS',
      titlePrefix: 'Questions &',
      titleHighlight: 'Technical Advisory',
      subtitle: 'Everything you need to know before acquiring and scaling with Kinx Auto.',
      stillQuestionsTitle: 'Still have questions or need a live demo?',
      stillQuestionsDesc: 'Connect directly with our technical support team for 1-on-1 assistance and guidance.',
      supportBtn: 'Technical Support Hotline & Chat',
    },
    ja: {
      badge: 'よくあるご質問 (FAQ)',
      titlePrefix: 'よくあるご質問と',
      titleHighlight: '技術サポート',
      subtitle: 'Kinx Autoの導入前に知っておくべきすべての重要情報。',
      stillQuestionsTitle: '他にご不明な点やデモのご要望はございますか？',
      stillQuestionsDesc: '専任エンジニアが個別デモや導入相談に24時間親身に対応いたします。',
      supportBtn: '24時間技術サポート窓口',
    },
    zh: {
      badge: '常见问题与技术答疑',
      titlePrefix: '常见问题与',
      titleHighlight: '技术咨询解答',
      subtitle: '全面了解 Kinx Auto 软件运行、算力配置及授权相关的所有疑问。',
      stillQuestionsTitle: '还有其他未解答的问题或需要远程演示？',
      stillQuestionsDesc: '直接联系技术支持团队，享受 1 对 1 屏幕共享与专属操作演示。',
      supportBtn: '24小时技术支持与咨询',
    },
  }[language] || {
    badge: 'GIẢI ĐÁP THẮC MẮC THƯỜNG GẶP',
    titlePrefix: 'Câu Hỏi &',
    titleHighlight: 'Tư Vấn Kỹ Thuật',
    subtitle: 'Mọi điều bạn cần biết trước khi sở hữu phần mềm tự động hóa Kinx Auto.',
    stillQuestionsTitle: 'Bạn vẫn còn câu hỏi chưa được giải đáp?',
    stillQuestionsDesc: 'Liên hệ trực tiếp với chuyên gia kỹ thuật của chúng tôi qua Zalo để được hỗ trợ và demo trực quan 1-1.',
    supportBtn: 'Zalo Kỹ Thuật: 0563.402.950',
  };

  return (
    <section id="faq" className="py-10 sm:py-12 bg-gradient-to-b from-[#0B0F19] via-slate-950 to-[#0B0F19] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-bold text-cyan-300 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>{uiTexts.badge}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
            {uiTexts.titlePrefix} <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">{uiTexts.titleHighlight}</span>
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base">
            {uiTexts.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-purple-500/60 shadow-xl shadow-purple-950/30'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-purple-950 text-purple-400 text-xs flex items-center justify-center flex-shrink-0">
                      Q{index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-purple-400' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <p className="text-sm font-bold text-white">{uiTexts.stillQuestionsTitle}</p>
          <p className="text-xs text-slate-400 mt-1">
            {uiTexts.stillQuestionsDesc}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://zalo.me/0563402950"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-950/60 text-cyan-300 border border-blue-500/30 text-xs font-bold hover:bg-blue-900/60 hover:scale-105 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              <span>{uiTexts.supportBtn}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FaqSection;
