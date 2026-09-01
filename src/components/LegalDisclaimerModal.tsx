import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Scale,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Lock,
  Printer,
  Ban,
  Headphones,
  Check,
  MessageCircle,
  Mic,
  ShieldAlert
} from 'lucide-react';
import { APP_LINKS } from '../data/kinxData';
import { useLanguage } from '../context/LanguageContext';

export type LegalTabType = 'disclaimer' | 'refund' | 'compliance' | 'voice_compliance' | 'privacy' | 'terms';

interface LegalDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTabType;
}

export const LegalDisclaimerModal: React.FC<LegalDisclaimerModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'disclaimer',
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);
  const [hasAgreed, setHasAgreed] = useState(false);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const legalContent = {
    vi: {
      badge: 'Pháp Lý & Chính Sách',
      effectiveDate: 'Hiệu lực: 2026 • Kinx Auto (kinxauto.click)',
      title: 'Tuyên Bố Pháp Lý, Miễn Trừ & Chính Sách Không Hoàn Tiền',
      subtitle: 'Quy định minh bạch về bản quyền phần mềm, trách nhiệm nội dung, AI giọng nói và chính sách bản quyền kỹ thuật số',
      btnPrint: 'In',
      tabs: {
        disclaimer: 'Tuyên Bố Miễn Trừ Trách Nhiệm',
        voice_compliance: 'Miễn Trừ AI Voice & Clone Giọng (Quan Trọng)',
        refund: 'Chính Sách Không Hoàn Tiền (No-Refund)',
        compliance: 'Tuân Thủ Pháp Luật & Cộng Đồng',
        privacy: 'Bảo Mật & Dữ Liệu Cục Bộ',
        terms: 'Điều Khoản Sở Hữu Bản Quyền',
      },
      disclaimer: {
        alertTitle: 'Lưu ý quan trọng trước khi sử dụng phần mềm:',
        alertDesc: 'Kinx Auto là bộ công cụ kỹ thuật phần mềm tự động hóa nhằm tối ưu hóa quy trình sản xuất nội dung đa phương tiện. Người dùng tự chịu hoàn toàn trách nhiệm pháp lý đối với nội dung video, hình ảnh và âm thanh/giọng nói được khởi tạo hoặc xuất bản.',
        h1: '1. Bản Chất & Mục Đích Cung Cấp Phần Mềm',
        p1: 'Phần mềm Kinx Auto (được phân phối tại kinxauto.click) cung cấp giao diện tự động hóa luồng làm việc với các mô hình AI tạo sinh công khai (Google Veo 3 / 3.1, Microsoft Edge Neural TTS, Stable Diffusion / Imagen). Kinx Auto không trực tiếp sở hữu hay vận hành cơ sở dữ liệu huấn luyện của các mô hình AI từ bên thứ ba.',
        h2: '2. Miễn Trừ Trách Nhiệm Về Hiệu Quả Kinh Doanh & Thu Nhập',
        p2: 'Các số liệu tính toán trên trang web mang tính chất minh họa tiềm năng năng suất kỹ thuật. Kinx Auto không cam kết hay bảo đảm chắc chắn bất kỳ kết quả tài chính, doanh thu kiếm tiền (MMO, Affiliate, AdSense) hay lưu lượng người xem cụ thể nào. Hiệu quả thực tế phụ thuộc vào tư duy kịch bản và chất lượng nội dung của người dùng.',
        h3: '3. Miễn Trừ Trách Nhiệm Về Dịch Vụ Của Bên Thứ Ba',
        p3: 'Kinx Auto tích hợp kết nối API từ bên thứ ba. Kinx Auto không chịu trách nhiệm đối với các sự cố gián đoạn dịch vụ, thay đổi hạn ngạch (rate limit), nâng cấp thuật toán hoặc thay đổi điều khoản dịch vụ do các nhà cung cấp bên thứ ba này đơn phương quyết định.'
      },
      voice_compliance: {
        alertTitle: 'TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM VỀ AI GIỌNG NÓI & VOICE CLONING:',
        alertDesc: 'Tính năng Edge TTS và Kinx TTS Voice Cloning được thiết kế dành riêng cho mục đích sáng tạo nội dung giải trí lành mạnh, giáo dục, nghệ thuật và kinh doanh minh bạch. Người dùng chịu 100% trách nhiệm trước pháp luật Việt Nam (Luật An ninh mạng, Bộ luật Dân sự, Bộ luật Hình sự) và quốc tế về bất kỳ âm thanh nào được tạo ra.',
        h1: '1. Nghiêm Cấm Tuyệt Đối Các Hành Vi Vi Phạm Pháp Luật & Lừa Đảo (Deepfake Audio Fraud)',
        p1: 'Nghiêm cấm tuyệt đối sử dụng tính năng Clone giọng nói để: (a) Giả mạo giọng nói của người khác nhằm lừa đảo chiếm đoạt tài sản, gọi điện tống tiền, mạo danh người thân mượn tiền; (b) Giả mạo giọng nói của cơ quan công an, tòa án, viện kiểm sát, cơ quan nhà nước, tổ chức ngân hàng - tài chính; (c) Giả mạo nguyên thủ quốc gia, lãnh đạo chính trị nhằm xuyên tạc, vu khống, chống phá an ninh quốc gia; (d) Giả mạo người nổi tiếng, KOLs để quảng cáo gian dối, bôi nhọ danh dự nhân phẩm người khác khi chưa được ủy quyền.',
        h2: '2. Bản Quyền File Mẫu & Sự Đồng Ý Của Chủ Thể Giọng Nói',
        p2: 'Khi tải file âm thanh mẫu (Audio Sample) vào phần mềm để nhân bản giọng nói, Người dùng cam kết đã có quyền sở hữu hợp pháp hoặc đã nhận được sự chấp thuận bằng văn bản của người sở hữu giọng nói đó. Kinx Auto không chịu trách nhiệm đối với các tranh chấp bản quyền giọng nói phát sinh giữa Người dùng và bên thứ ba.',
        h3: '3. Nguyên Tắc Miễn Trừ Trách Nhiệm Toàn Diện Cho Kinx Auto',
        p3: 'Kinx Auto chỉ là công cụ phần mềm kỹ thuật số xử lý cục bộ trên máy tính của người dùng (Offline/Local Execution). Chúng tôi không kiểm soát, không lưu trữ và không thể can thiệp vào các tệp âm thanh người dùng xuất bản. Do đó, Kinx Auto hoàn toàn được miễn trừ khỏi mọi trách nhiệm dân sự, hành chính hoặc hình sự liên quan đến hành vi sử dụng trái phép công nghệ voice clone của người dùng.',
        h4: '4. Chế Tài Thu Hồi Bản Quyền & Phối Hợp Cơ Quan Điều Tra',
        p4: 'Kinx Auto có quyền đơn phương thu hồi, khóa vĩnh viễn giấy phép sử dụng (License Key) không hoàn tiền đối với bất kỳ cá nhân/tổ chức nào sử dụng phần mềm vi phạm pháp luật, và cam kết hợp tác đầy đủ với cơ quan an ninh mạng có thẩm quyền khi có yêu cầu điều tra.'
      },
      refund: {
        alertTitle: 'Tuyên Bố Chính Sách Không Hoàn Tiền (Strict No-Refund Policy):',
        alertDesc: 'Kinx Auto là sản phẩm kỹ thuật số (Digital Software & License Key) kích hoạt trực tiếp theo mã bản quyền phần cứng máy tính. Sau khi bản quyền đã được cấp hoặc kích hoạt thành công, Kinx Auto không áp dụng chính sách hoàn trả tiền dưới bất kỳ hình thức nào.',
        h1: '1. Bản Chất Sản Phẩm Kỹ Thuật Số & Giấy Phép Điện Tử',
        p1: 'Do đặc thù của sản phẩm số không thể thu hồi sau khi đã bàn giao và sử dụng, mọi khoản phí đã thanh toán là khoản thanh toán cuối cùng và không hoàn lại (Non-Refundable).',
        h2: '2. Chính Sách "Dùng Thử Miễn Phí Trước Khi Mua" (Try Before You Buy)',
        p2: 'Để đảm bảo quyền lợi tối đa cho khách hàng, Kinx Auto cung cấp bản dùng thử miễn phí 100% tại trang web chính thức. Khách hàng đã trải nghiệm dùng thử trước khi quyết định mua.',
        h3: '3. Cam Kết Hỗ Trợ Kỹ Thuật 1-Kèm-1 Qua Ultraview Thay Thế',
        p3: 'Mặc dù không hoàn tiền, Kinx Auto cam kết hỗ trợ toàn diện qua Ultraview/AnyDesk từ xa để đảm bảo khách hàng luôn cài đặt và sử dụng thành công trọn đời.'
      },
      compliance: {
        alertTitle: 'Cam Kết Tuân Thủ Pháp Luật Hiện Hành:',
        alertDesc: 'Người sử dụng cam kết tuân thủ Luật An ninh mạng Việt Nam và Quy định Tiêu chuẩn cộng đồng quốc tế khi sử dụng Kinx Auto.',
        h1: '1. Các Hành Vi Nghiêm Cấm Tuyệt Đối',
        p1: 'Nghiêm cấm tuyệt đối tạo video xuyên tạc, chống phá nhà nước, deepfake giọng nói/hình ảnh lừa đảo tài chính, nội dung bạo lực đồi trụy hoặc vi phạm bản quyền thương hiệu trái phép.',
        h2: '2. Biện Pháp Xử Lý Khi Phát Hiện Vi Phạm',
        p2: 'Kinx Auto có quyền đơn phương đình chỉ, thu hồi bản quyền không hoàn lại đối với các tài khoản cố tình vi phạm pháp luật và sẽ phối hợp với cơ quan có thẩm quyền.'
      },
      privacy: {
        alertTitle: 'Nguyên Tắc Dữ Liệu Cục Bộ (Local-First Privacy):',
        alertDesc: 'Kinx Auto hoạt động trực tiếp trên máy tính cá nhân của người dùng. Video, hình ảnh và tệp âm thanh được xuất và lưu trữ trực tiếp trên ổ đĩa cứng của bạn.',
        h1: '1. Bảo Mật API Key & Tài Khoản Cá Nhân',
        p1: 'Các khóa API cá nhân được mã hóa và lưu trữ duy nhất trên tệp cấu hình cục bộ máy tính của bạn. Kinx Auto không thu thập các khóa này về máy chủ.',
        h2: '2. Quyền Riêng Tư Của Tệp Dự Án',
        p2: 'Toàn bộ video thành phẩm, kịch bản và tài nguyên đều lưu trên máy của bạn. Chúng tôi không có quyền truy cập hay kiểm duyệt các tệp này.'
      },
      terms: {
        alertTitle: 'Quyền Sở Hữu Bản Quyền & Thương Mại:',
        alertDesc: 'Người dùng sở hữu toàn quyền thương mại đối với các sản phẩm video được xuất từ phần mềm Kinx Auto, tuân thủ theo điều khoản của mô hình AI nguồn.',
        h1: '1. Bản Quyền Phần Mềm Kinx Auto',
        p1: 'Mã nguồn, giao diện và thương hiệu Kinx Auto thuộc quyền sở hữu của Kinx Auto Team. Nghiêm cấm mọi hành vi dịch ngược (reverse engineering) hoặc bẻ khóa phần mềm.',
        h2: '2. Kênh Hỗ Trợ & Khiếu Nại',
        p2: 'Mọi thắc mắc và hỗ trợ vui lòng liên hệ trực tiếp qua Zalo Kỹ Thuật 0563.402.950 hoặc website kinxauto.click.'
      },
      agreeText: 'Tôi đã đọc, hiểu rõ và cam kết tuân thủ các quy định pháp luật và miễn trừ trách nhiệm trên',
      btnContact: 'Hỏi Pháp Lý Zalo',
      btnClose: 'Đóng & Tiếp Tục'
    },
    en: {
      badge: 'Legal & Compliance',
      effectiveDate: 'Effective: 2026 • Kinx Auto (kinxauto.click)',
      title: 'Legal Terms, Disclaimers & Strict No-Refund Policy',
      subtitle: 'Clear guidelines regarding digital licensing, software copyright, AI voice cloning compliance, and user content liability',
      btnPrint: 'Print',
      tabs: {
        disclaimer: 'Disclaimer & Liability',
        voice_compliance: 'AI Voice & Cloning Disclaimer (Critical)',
        refund: 'Strict No-Refund Policy',
        compliance: 'Legal & Policy Compliance',
        privacy: 'Local-First Data Privacy',
        terms: 'Copyright & License Terms',
      },
      disclaimer: {
        alertTitle: 'Important Notice Before Using Software:',
        alertDesc: 'Kinx Auto is an automation engineering software suite designed to streamline multimedia content creation. The end user assumes full legal responsibility for all created video, audio/voice, and visual assets.',
        h1: '1. Software Nature & Delivery Purpose',
        p1: 'Kinx Auto (distributed via kinxauto.click) provides a desktop workflow automation interface utilizing public generative AI foundational models (Veo 3/3.1, Microsoft Edge Neural TTS, etc.). Kinx Auto does not own or operate 3rd-party training datasets.',
        h2: '2. No Income or Financial Outcome Guarantee',
        p2: 'Calculated metrics on the landing page are illustrative productivity indicators. Kinx Auto makes no guarantee of specific financial returns, ad revenues, or view metrics. Results depend on creator effort and platform algorithms.',
        h3: '3. Third-Party Service Disclaimer',
        p3: 'Kinx Auto integrates 3rd-party AI endpoints. Kinx Auto is not liable for upstream rate limits, model quota revisions, or algorithmic policy shifts made by external providers.'
      },
      voice_compliance: {
        alertTitle: 'AI VOICE & VOICE CLONING LEGAL DISCLAIMER & COMPLIANCE:',
        alertDesc: 'Edge TTS and Kinx TTS Voice Cloning technologies are strictly intended for lawful, creative storytelling, entertainment, education, and legitimate media production. The user assumes 100% legal liability under international laws and local regulations.',
        h1: '1. Strict Prohibition of Deepfake Fraud & Impersonation',
        p1: 'It is strictly forbidden to use voice cloning features to: (a) Impersonate individuals for financial scams, extortion, or fake emergency wire requests; (b) Impersonate law enforcement, judicial authorities, government bodies, or financial institutions; (c) Impersonate political leaders for misinformation or civil disruption; (d) Defame, harass, or create unauthorized commercial endorsements using celebrity voices without written consent.',
        h2: '2. Voice Ownership & Consent Verification',
        p2: 'Users must possess explicit legal rights or written consent from the voice owner before uploading reference audio samples for cloning. Kinx Auto bears no liability for third-party intellectual property or publicity rights disputes.',
        h3: '3. Total Legal Immunity for Kinx Auto',
        p3: 'Kinx Auto is a client-side desktop software operating entirely on user hardware. We do not monitor, store, or transmit generated audio files. Therefore, Kinx Auto and its developers are fully indemnified and held harmless from any civil or criminal liabilities arising from user misuse.',
        h4: '4. License Revocation & Law Enforcement Cooperation',
        p4: 'Kinx Auto reserves the right to immediately terminate license keys without refund for any malicious violations and will fully cooperate with cybersecurity authorities in criminal investigations.'
      },
      refund: {
        alertTitle: 'Strict Digital Product No-Refund Policy:',
        alertDesc: 'Kinx Auto is delivered as digital software and instant electronic hardware license keys. Once generated or activated, all purchases are strictly final and non-refundable.',
        h1: '1. Nature of Digital Assets & Irrevocable Delivery',
        p1: 'Because digital license keys and offline executable software cannot be returned once delivered and activated, all payments are non-refundable under all jurisdictions.',
        h2: '2. "Try Before You Buy" Guarantee',
        p2: 'To guarantee full buyer confidence, Kinx Auto offers a 100% free trial on our website so customers can test compatibility, speed, and render quality before upgrading.',
        h3: '3. Dedicated 1-on-1 Remote Setup Guarantee',
        p3: 'In lieu of refunds, our engineering team provides complimentary 1-on-1 remote assistance to configure your machine and guarantee seamless operation.'
      },
      compliance: {
        alertTitle: 'Full Legal & Regulatory Compliance:',
        alertDesc: 'Users agree to adhere to cybersecurity laws, intellectual property rights, and community standards when publishing generated media.',
        h1: '1. Strictly Prohibited Content',
        p1: 'Creating deepfake fraudulent audio/video media, unauthorized celebrity impersonations, unlawful political subversion, or illicit explicit content is strictly forbidden.',
        h2: '2. Enforcement & Account Revocation',
        p2: 'Kinx Auto reserves the right to immediately terminate digital license keys without refund in cases of severe unlawful conduct or reverse-engineering.'
      },
      privacy: {
        alertTitle: 'Local-First Data Storage & Privacy:',
        alertDesc: 'Kinx Auto executes locally on your personal desktop. All generated videos, render caches, and project assets reside entirely on your local storage drive.',
        h1: '1. Local Storage of API Credentials',
        p1: 'Personal API keys are encrypted locally on your computer. Kinx Auto never transmits private keys to intermediate central servers.',
        h2: '2. Private Project Data',
        p2: 'All exported video reels, script prompt files, and audio assets remain private. Kinx Auto personnel do not have access to your local drives.'
      },
      terms: {
        alertTitle: 'Copyright & Commercial Distribution Rights:',
        alertDesc: 'Users retain 100% commercial ownership over rendered video outputs, subject to underlying AI provider terms.',
        h1: '1. Kinx Auto Intellectual Property',
        p1: 'Software binaries, codebase, and branding belong exclusively to Kinx Auto Team. Reverse engineering, decompiling, or cracked redistribution is prohibited.',
        h2: '2. Support & Inquiries',
        p2: 'For licensing inquiries or assistance, reach out via our official support channels or kinxauto.click.'
      },
      agreeText: 'I have read, understood, and agreed to all terms, voice compliance policies, and disclaimers stated above',
      btnContact: 'Contact Legal Support',
      btnClose: 'Acknowledge & Close'
    },
    ja: {
      badge: '利用規約・ポリシー',
      effectiveDate: '発効日: 2026年 • Kinx Auto (kinxauto.click)',
      title: '法的免責事項・AI音声規定・返金不可ポリシー',
      subtitle: 'ソフトウェアの知的財産権、AI音声クローン利用規約、生成コンテンツの法的責任、デジタルライセンスに関する明文化された規定',
      btnPrint: '印刷',
      tabs: {
        disclaimer: '免責事項・責任の範囲',
        voice_compliance: 'AI音声＆ボイスクローン免責（重要）',
        refund: '返金不可ポリシー (No-Refund)',
        compliance: '法令遵守・コミュニティ規定',
        privacy: 'プライバシー・ローカル保存',
        terms: '著作権・商用利用規約',
      },
      disclaimer: {
        alertTitle: 'ソフトウェアご利用前の重要事項：',
        alertDesc: 'Kinx Autoはマルチメディアコンテンツ制作を自動化・効率化するためのツールです。生成・公開された動画、画像、音声に関する法的責任はすべて利用者に帰属します。',
        h1: '1. 本ソフトウェアの性質と提供目的',
        p1: 'Kinx Auto (kinxauto.click) は、公開されている生成AI基盤モデル (Veo 3/3.1, Microsoft Edge Neural TTS等) とのワークフローを自動化するPC向けクライアントです。',
        h2: '2. 収益および再生回数の非保証',
        p2: '本サイトに記載されているROIや試算数値は技術的な生産性を示す目安であり、特定の収益や再生数を保証するものではありません。',
        h3: '3. サードパーティ製サービスに関する免責',
        p3: '外部AIプロバイダによるAPI仕様変更、レートリミット制限、規約改定に伴う一時的な影響について、当社は責任を負いかねます。'
      },
      voice_compliance: {
        alertTitle: 'AI音声およびボイスクローン技術に関する法的免責声明：',
        alertDesc: 'Edge TTS および Kinx TTS ボイスクローン機能は、正当なクリエイティブ活動、動画制作、教育、娯楽目的のみに使用が許可されています。利用者は生成されたすべての音声データについて、刑法・民法上の全責任を負うものとします。',
        h1: '1. ディープフェイク詐欺および不正ななりすましの絶対的禁止',
        p1: '以下の目的での音声クローン利用を固く禁じます：(a) 金融詐欺、オレオレ詐欺、脅迫、身代金要求を目的とした他人の声の偽造；(b) 警察、裁判所、行政機関、金融機関の職員へのなりすまし；(c) 政治家や著名人の声を用いた偽情報の拡散や名誉毀損；(d) 許諾を得ていない著名人の声を用いた商業的詐欺広告。',
        h2: '2. 音声サンプルの権利と本人の同意',
        p2: '音声クローンのために読み込ませる参照音声ファイルについて、利用者は適法な権利または本人の明示的な同意を取得していることを保証するものとします。権利侵害による損害について当社は一切関与いたしません。',
        h3: '3. Kinx Auto 開発チームの完全免責',
        p3: 'Kinx Autoは利用者のPC内でローカル稼働するツールであり、当社が利用者の音声データを傍受・監視・保存することはありません。不正利用により生じた民事・刑事上の紛争について、当社は一切の責任を免除されます。',
        h4: '4. 不正利用時のライセンス即時停止措置',
        p4: '違法行為が確認された場合、当社は事前の通知なくライセンスを永久停止し、捜査機関への協力を行います。'
      },
      refund: {
        alertTitle: 'デジタル製品の返金不可規定 (Strict No-Refund)：',
        alertDesc: 'Kinx Autoは即時発行されるデジタルライセンス製品です。ライセンスキー発行後のキャンセル・返金には一切応じられません。',
        h1: '1. デジタル製品および電子ライセンスの特性',
        p1: '製品の性質上、一度納品・アクティベーションされたライセンスの回収が不可能なため、お支払い完了後の返金は致しかねます。',
        h2: '2. 「無料体験版」による事前動作確認のお願い',
        p2: 'お客様が十分にご納得の上でご購入いただけるよう、公式サイトにて100%無料体験版をご提供しております。',
        h3: '3. 専任エンジニアによる遠隔リモートサポート保証',
        p3: '返金不可に代わり、専任技術スタッフが初期設定や環境構築を遠隔サポートし、確実に動画生成できるよう保証いたします。'
      },
      compliance: {
        alertTitle: '法令およびプラットフォーム規定の遵守：',
        alertDesc: '利用者は各種法令、著作権法、および主要SNSのコミュニティガイドラインを厳格に遵守することに同意するものとします。',
        h1: '1. 絶対的禁止事項',
        p1: 'ディープフェイク音声・動画を用いた詐欺、誹謗中傷、公序良俗に反する暴力・成人向けコンテンツの生成は固く禁止されています。',
        h2: '2. 違反時のライセンス失効措置',
        p2: '不正利用やリバースエンジニアリングが確認された場合、予告なくライセンスを無効化し法的措置を講じる場合があります。'
      },
      privacy: {
        alertTitle: 'ローカル第一のプライバシー保護：',
        alertDesc: 'Kinx Autoはお客様のパソコン内でローカル処理を行います。生成された動画や音声データはすべてご自身のPC内ストレージに保存されます。',
        h1: '1. APIキー情報の暗号化ローカル保管',
        p1: '入力された各種APIキーはPC内にのみ安全に保存され、当社のサーバー等に送信されることは一切ありません。',
        h2: '2. プロジェクトデータの非公開性',
        p2: '生成された動画、台本、音声などのファイルについて当社が閲覧・収集することはありません。'
      },
      terms: {
        alertTitle: '著作権および商用利用権：',
        alertDesc: '生成された動画コンテンツの商用利用権は利用者に帰属します（各AIモデル提供元の利用規約に準じます）。',
        h1: '1. Kinx Auto 本体の知的財産権',
        p1: 'ソフトウェアのバイナリ、UI、ブランドに関するすべての権利は Kinx Auto 開発チームに帰属します。クラックや無断再配布を禁止します。',
        h2: '2. お問い合わせ窓口',
        p2: 'ライセンスや規約に関するご質問は、公式サポート窓口までお気軽にご連絡ください。'
      },
      agreeText: '上記すべての法的規約、AI音声規定、免責事項を確認し、同意いたします',
      btnContact: '法務サポート窓口',
      btnClose: '同意して閉じる'
    },
    zh: {
      badge: '法律合规与服务条款',
      effectiveDate: '生效日期：2026年 • Kinx Auto (kinxauto.click)',
      title: '法律声明、AI声音免责与不可退款政策',
      subtitle: '关于数字软件授权、知识产权保护、AI声音克隆合规准则与创作者内容责任的明文规定',
      btnPrint: '打印条款',
      tabs: {
        disclaimer: '免责声明与责任范围',
        voice_compliance: 'AI声音克隆免责与合规（重点）',
        refund: '不可退款声明 (No-Refund)',
        compliance: '法律法规与合规承诺',
        privacy: '本地优先数据隐私',
        terms: '版权归属与商用授权',
      },
      disclaimer: {
        alertTitle: '使用软件前的重要法律提示：',
        alertDesc: 'Kinx Auto 是一款旨在提升多媒体批量制作效率的桌面自动化软件工具。用户对通过本工具生成并发布的全部视频、音频与画面资产承担完全的法律责任。',
        h1: '1. 软件交付性质与运行定位',
        p1: 'Kinx Auto (通过 kinxauto.click 分发) 为用户提供调用公开生成式 AI 大模型 (Veo 3/3.1, Microsoft Edge Neural TTS 等) 的自动化桌面工作流，不拥有第三方训练数据集。',
        h2: '2. 收益与流量非保证声明',
        p2: '落地页测算的 ROI 与产出数据仅为工程效率参考，Kinx Auto 不对用户的实际变现收益、平台播放量或商业结果做出任何担保。',
        h3: '3. 第三方接口与模型服务免责',
        p3: '如因第三方 AI 供应商单方面调整 API 频率、价格或服务条款导致的功能波动，Kinx Auto 不承担直接连带责任。'
      },
      voice_compliance: {
        alertTitle: 'AI 拟真配音与声音克隆技术法律免责声明：',
        alertDesc: 'Edge TTS 及 Kinx TTS 声音克隆技术仅限用于正当合法的自媒体创作、影视解说、教育教学及商业宣传。使用者对其所生成或分发的任何音频承担 100% 的全部法律责任。',
        h1: '1. 绝对严禁 Deepfake 拟音诈骗与非法侵权行为',
        p1: '严禁利用本工具的声音克隆能力从事以下违法活动：(a) 冒充他人声音实施电信网络诈骗、敲诈勒索或虚假借款；(b) 冒充公检法等国家机关工作人员或金融机构客服；(c) 伪造国家领导人、公众人物言论进行政治造谣或危害公共安全；(d) 未经书面授权擅自克隆公众人物/明星声音用于虚假商品代言或名誉侵权。',
        h2: '2. 参考音频样本版权与主体知情同意',
        p2: '用户在向软件上传音频样本进行声音克隆时，必须保证拥有合法的版权或许可，或已取得声音主体本人的明确书面同意。因侵犯他人声音权、肖像权或著作权产生的纠纷均由用户自行负责。',
        h3: '3. Kinx Auto 软件开发方免责声明',
        p3: 'Kinx Auto 属于本地离线运行的工具软件，官方服务器不存储、不审核、不传输用户的任何音频和视频资产。对于任何因滥用声音克隆功能而导致的民事侵权或刑事犯罪，Kinx Auto 团队概不承担任何连带法律责任。',
        h4: '4. 违规追责与封禁授权',
        p4: '如发现任何恶意违法使用行为，Kinx Auto 有权立即永久封禁软件授权码且不予退款，并全力配合网安及执法部门依法追究法律责任。'
      },
      refund: {
        alertTitle: '数字软件严格不可退款声明 (Strict No-Refund)：',
        alertDesc: 'Kinx Auto 属于数字虚拟商品与机器码电子序列号。一旦授权码生成交付或激活成功，一律不支持任何形式的退款申请。',
        h1: '1. 数字虚拟商品与电子密钥属性',
        p1: '鉴于软件与激活码交付后无法进行物理回收，所有支付款项均为最终结算且不可撤销 (Non-Refundable)。',
        h2: '2. “先免费试用后付费”保障机制',
        p2: '为保障用户权益，Kinx Auto 官网提供 100% 免费试用版本。用户在充分体验满意后再做购买决定。',
        h3: '3. 专属 1对1 远程环境配置技术兜底',
        p3: '作为退款替代保障，官方提供一对一远程协助安装调试服务，确保您的电脑环境顺利出片。'
      },
      compliance: {
        alertTitle: '法律合规与创作者公约：',
        alertDesc: '用户承诺遵守所在地网络安全法律法规以及各大社媒平台的社区准则。',
        h1: '1. 绝对严禁生成的违规内容',
        p1: '严禁利用本工具生成涉及政治敏感、声音/画面 Deepfake 诈骗、色情低俗、暴力虐待或侵犯第三方注册商标的违规视频。',
        h2: '2. 违规账户查封与法律追责',
        p2: '如发现严重恶意违规行为，Kinx Auto 有权单方面吊销软件使用授权并不予退款，必要时将依法配合相关部门调查。'
      },
      privacy: {
        alertTitle: '本地优先隐私安全原则：',
        alertDesc: 'Kinx Auto 软件全部运行在用户个人电脑本地，生成的视频、台本及音频文件全部保存在本地硬盘中。',
        h1: '1. 个人 API 密钥本地加密存储',
        p1: '用户配置的 API Key 仅加密保存在个人电脑本地配置文件中，Kinx Auto 绝对不会将密钥回传至任何中间服务器。',
        h2: '2. 专属工程资产绝对私密',
        p2: '您的所有视频文件、提示词库和成片资产均保留在本地目录，开发团队无法查看或审核您的私有文件。'
      },
      terms: {
        alertTitle: '版权归属与商用授权许可：',
        alertDesc: '用户对使用 Kinx Auto 渲染输出的视频成片拥有完整的商用版权（须符合对应 AI 模型的开源/商业许可协议）。',
        h1: '1. Kinx Auto 软件本体知识产权',
        p1: 'Kinx Auto 软件代码、界面架构及品牌归开发团队所有。严禁任何形式的逆向工程、反编译破解或未经授权的二次分发。',
        h2: '2. 专属支持与咨询热线',
        p2: '如有关于商业授权或条款疑问，请通过官方技术支持渠道或 kinxauto.click 获取协助。'
      },
      agreeText: '我已仔细阅读并完全理解上述所有法律条款、声音合规政策与不退款政策',
      btnContact: '咨询法务支持',
      btnClose: '确认并关闭'
    }
  }[language] || {
    badge: 'Pháp Lý & Chính Sách',
    effectiveDate: 'Hiệu lực: 2026 • Kinx Auto (kinxauto.click)',
    title: 'Tuyên Bố Pháp Lý, Miễn Trừ & Chính Sách Không Hoàn Tiền',
    subtitle: 'Quy định minh bạch về bản quyền phần mềm, trách nhiệm nội dung, AI giọng nói và chính sách bản quyền kỹ thuật số',
    btnPrint: 'In',
    tabs: {
      disclaimer: 'Tuyên Bố Miễn Trừ Trách Nhiệm',
      voice_compliance: 'Miễn Trừ AI Voice & Clone Giọng (Quan Trọng)',
      refund: 'Chính Sách Không Hoàn Tiền (No-Refund)',
      compliance: 'Tuân Thủ Pháp Luật & Cộng Đồng',
      privacy: 'Bảo Mật & Dữ Liệu Cục Bộ',
      terms: 'Điều Khoản Sở Hữu Bản Quyền',
    },
    disclaimer: {
      alertTitle: 'Lưu ý quan trọng trước khi sử dụng phần mềm:',
      alertDesc: 'Kinx Auto là bộ công cụ kỹ thuật phần mềm tự động hóa nhằm tối ưu hóa quy trình sản xuất nội dung đa phương tiện.',
      h1: '1. Bản Chất & Mục Đích Cung Cấp Phần Mềm',
      p1: 'Phần mềm Kinx Auto cung cấp giao diện tự động hóa luồng làm việc với các mô hình AI tạo sinh công khai.',
      h2: '2. Miễn Trừ Trách Nhiệm Về Hiệu Quả Kinh Doanh',
      p2: 'Các số liệu tính toán mang tính chất minh họa tiềm năng năng suất kỹ thuật.',
      h3: '3. Miễn Trừ Trách Nhiệm Về Dịch Vụ Của Bên Thứ Ba',
      p3: 'Kinx Auto không chịu trách nhiệm đối với các sự cố gián đoạn từ nhà cung cấp bên thứ ba.'
    },
    voice_compliance: {
      alertTitle: 'TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM VỀ AI GIỌNG NÓI & VOICE CLONING:',
      alertDesc: 'Tính năng Edge TTS và Kinx TTS Voice Cloning được thiết kế dành riêng cho mục đích sáng tạo nội dung giải trí lành mạnh.',
      h1: '1. Nghiêm Cấm Tuyệt Đối Các Hành Vi Vi Phạm Pháp Luật & Lừa Đảo',
      p1: 'Nghiêm cấm giả mạo giọng nói của người khác nhằm lừa đảo tài chính hoặc mạo danh cơ quan nhà nước.',
      h2: '2. Bản Quyền File Mẫu & Sự Đồng Ý',
      p2: 'Người dùng phải có sự đồng ý của chủ thể giọng nói trước khi clone.',
      h3: '3. Miễn Trừ Trách Nhiệm Toàn Diện Cho Kinx Auto',
      p3: 'Kinx Auto là phần mềm cục bộ, người dùng tự chịu 100% trách nhiệm trước pháp luật.',
      h4: '4. Chế Tài Xử Lý',
      p4: 'Khóa bản quyền vĩnh viễn đối với các hành vi vi phạm.'
    },
    refund: {
      alertTitle: 'Tuyên Bố Chính Sách Không Hoàn Tiền (Strict No-Refund Policy):',
      alertDesc: 'Kinx Auto là sản phẩm kỹ thuật số kích hoạt trực tiếp. Sau khi kích hoạt thành công, không áp dụng hoàn tiền.',
      h1: '1. Bản Chất Sản Phẩm Kỹ Thuật Số',
      p1: 'Mọi khoản phí đã thanh toán là khoản thanh toán cuối cùng và không hoàn lại.',
      h2: '2. Chính Sách Dùng Thử Miễn Phí',
      p2: 'Kinx Auto cung cấp bản dùng thử miễn phí 100% tại trang web chính thức.',
      h3: '3. Cam Kết Hỗ Trợ Kỹ Thuật 1-Kèm-1 Qua Ultraview',
      p3: 'Hỗ trợ kỹ thuật toàn diện từ xa trọn đời thay thế.'
    },
    compliance: {
      alertTitle: 'Cam Kết Tuân Thủ Pháp Luật Hiện Hành:',
      alertDesc: 'Người sử dụng cam kết tuân thủ Luật An ninh mạng và Quy định Tiêu chuẩn cộng đồng.',
      h1: '1. Các Hành Vi Nghiêm Cấm Tuyệt Đối',
      p1: 'Nghiêm cấm tuyệt đối tạo video, âm thanh vi phạm pháp luật, deepfake lừa đảo.',
      h2: '2. Biện Pháp Xử Lý Khi Phát Hiện Vi Phạm',
      p2: 'Kinx Auto có quyền đình chỉ bản quyền đối với các tài khoản vi phạm.'
    },
    privacy: {
      alertTitle: 'Nguyên Tắc Dữ Liệu Cục Bộ (Local-First Privacy):',
      alertDesc: 'Kinx Auto hoạt động trực tiếp trên máy tính cá nhân của người dùng.',
      h1: '1. Bảo Mật API Key',
      p1: 'Các khóa API được mã hóa và lưu trữ cục bộ.',
      h2: '2. Quyền Riêng Tư Của Tệp Dự Án',
      p2: 'Toàn bộ video thành phẩm lưu trên máy tính của bạn.'
    },
    terms: {
      alertTitle: 'Quyền Sở Hữu Bản Quyền & Thương Mại:',
      alertDesc: 'Người dùng sở hữu toàn quyền thương mại đối với các sản phẩm video được xuất từ phần mềm.',
      h1: '1. Bản Quyền Phần Mềm Kinx Auto',
      p1: 'Mã nguồn và giao diện thuộc quyền sở hữu của Kinx Auto Team.',
      h2: '2. Kênh Hỗ Trợ & Khiếu Nại',
      p2: 'Liên hệ qua Zalo Kỹ Thuật 0563.402.950.'
    },
    agreeText: 'Tôi đã đọc, hiểu rõ và cam kết tuân thủ các quy định trên',
    btnContact: 'Hỏi Pháp Lý Zalo',
    btnClose: 'Đóng & Tiếp Tục'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl shadow-purple-950/40 relative overflow-hidden"
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/70 flex items-start justify-between gap-4 shrink-0">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {legalContent.badge}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {legalContent.effectiveDate}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                {legalContent.title}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {legalContent.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors hidden sm:flex items-center gap-1.5 text-xs cursor-pointer"
              title={legalContent.btnPrint}
            >
              <Printer className="w-4 h-4" />
              <span>{legalContent.btnPrint}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 sm:px-6 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'disclaimer', label: legalContent.tabs.disclaimer, icon: AlertTriangle },
            { id: 'voice_compliance', label: legalContent.tabs.voice_compliance, icon: Mic, highlight: true },
            { id: 'refund', label: legalContent.tabs.refund, icon: Ban },
            { id: 'compliance', label: legalContent.tabs.compliance, icon: Scale },
            { id: 'privacy', label: legalContent.tabs.privacy, icon: Lock },
            { id: 'terms', label: legalContent.tabs.terms, icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? tab.highlight
                      ? 'bg-amber-600/30 text-amber-200 border border-amber-500/40 shadow-sm'
                      : 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm'
                    : tab.highlight
                    ? 'text-amber-300 hover:text-amber-200 hover:bg-amber-950/40 border border-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? (tab.highlight ? 'text-amber-400' : 'text-purple-400') : (tab.highlight ? 'text-amber-400' : 'text-slate-500')}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {activeTab === 'disclaimer' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-amber-300">{legalContent.disclaimer.alertTitle}</p>
                  <p className="text-amber-200/90 leading-normal">
                    {legalContent.disclaimer.alertDesc}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-mono">1</span>
                  {legalContent.disclaimer.h1}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed pl-8">
                  {legalContent.disclaimer.p1}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-mono">2</span>
                  {legalContent.disclaimer.h2}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed pl-8">
                  {legalContent.disclaimer.p2}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-mono">3</span>
                  {legalContent.disclaimer.h3}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed pl-8">
                  {legalContent.disclaimer.p3}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'voice_compliance' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-200 flex items-start gap-3">
                <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1.5">
                  <p className="font-bold text-amber-300 text-sm">{legalContent.voice_compliance.alertTitle}</p>
                  <p className="text-amber-200/90 leading-relaxed">
                    {legalContent.voice_compliance.alertDesc}
                  </p>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-start gap-2 text-rose-300">
                  <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">1</span>
                  <span>{legalContent.voice_compliance.h1}</span>
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed pl-8">
                  {legalContent.voice_compliance.p1}
                </p>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-start gap-2 text-cyan-300">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">2</span>
                  <span>{legalContent.voice_compliance.h2}</span>
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed pl-8">
                  {legalContent.voice_compliance.p2}
                </p>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-start gap-2 text-purple-300">
                  <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">3</span>
                  <span>{legalContent.voice_compliance.h3}</span>
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed pl-8">
                  {legalContent.voice_compliance.p3}
                </p>
              </div>

              <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-start gap-2 text-emerald-300">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">4</span>
                  <span>{legalContent.voice_compliance.h4}</span>
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed pl-8">
                  {legalContent.voice_compliance.p4}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200 flex items-start gap-3">
                <Ban className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-rose-300">{legalContent.refund.alertTitle}</p>
                  <p className="text-rose-200/90 leading-normal">
                    {legalContent.refund.alertDesc}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs font-mono">1</span>
                  {legalContent.refund.h1}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed pl-8">
                  {legalContent.refund.p1}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs font-mono">2</span>
                  {legalContent.refund.h2}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed pl-8">
                  {legalContent.refund.p2}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-mono">3</span>
                  {legalContent.refund.h3}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed pl-8">
                  {legalContent.refund.p3}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 flex items-start gap-3">
                <Scale className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-cyan-300">{legalContent.compliance.alertTitle}</p>
                  <p className="text-cyan-200/90 leading-normal">
                    {legalContent.compliance.alertDesc}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-mono">1</span>
                  {legalContent.compliance.h1}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed pl-8">
                  {legalContent.compliance.p1}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-mono">2</span>
                  {legalContent.compliance.h2}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed pl-8">
                  {legalContent.compliance.p2}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 flex items-start gap-3">
                <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-emerald-300">{legalContent.privacy.alertTitle}</p>
                  <p className="text-emerald-200/90 leading-normal">
                    {legalContent.privacy.alertDesc}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-mono">1</span>
                  {legalContent.privacy.h1}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed pl-8">
                  {legalContent.privacy.p1}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-mono">2</span>
                  {legalContent.privacy.h2}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed pl-8">
                  {legalContent.privacy.p2}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-200 flex items-start gap-3">
                <FileText className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-purple-300">{legalContent.terms.alertTitle}</p>
                  <p className="text-purple-200/90 leading-normal">
                    {legalContent.terms.alertDesc}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-mono">1</span>
                  {legalContent.terms.h1}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed pl-8">
                  {legalContent.terms.p1}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-mono">2</span>
                  {legalContent.terms.h2}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed pl-8">
                  {legalContent.terms.p2}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={hasAgreed}
              onChange={(e) => setHasAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900 cursor-pointer"
            />
            <span>{legalContent.agreeText}</span>
          </label>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={APP_LINKS.zaloSupport}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>{legalContent.btnContact}</span>
            </a>

            <button
              onClick={onClose}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                hasAgreed
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              {legalContent.btnClose}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LegalDisclaimerModal;
