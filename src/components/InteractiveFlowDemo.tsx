import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  FileText,
  Mic,
  Video,
  Play,
  Square,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Clock,
  Zap,
  Volume2,
  Sliders,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { APP_IMAGES } from '../data/images';
import { TTS_VOICES, speakEdgeTTS } from '../utils/ttsPlayer';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/types';

interface InteractiveFlowDemoProps {
  onOpenLeadModal: () => void;
  onScrollToDownload: () => void;
}

const TOPICS_BY_LANG: Record<Language, Array<{ id: string; label: string; sampleDialogue: string; placeholder: string; promptHelp: string }>> = {
  vi: [
    {
      id: 'mystery',
      label: 'Bí Ẩn Trinh Thám: "Cậu bé Tom và chú mèo Milo phát hiện chìa khóa cổ"',
      sampleDialogue: 'Phòng ngủ của Tom vào lúc nửa đêm, ánh trăng xanh nhạt chiếu qua cửa sổ. Chú mèo Milo bỗng ngước nhìn ra ngoài và phát hiện chiếc chìa khóa cổ đang phát sáng bí ẩn.',
      placeholder: 'Nhập câu thoại tiếng Việt cần đọc thử...',
      promptHelp: 'Điền câu chuẩn trinh thám'
    },
    {
      id: 'history',
      label: 'Lịch Sử / Huyền Thoại: "Trận chiến Skull Island & Huyền thoại King Kong"',
      sampleDialogue: 'Dưới làn sương mù dày đặc của Skull Island, tiếng gầm rung chuyển của Kong vang vọng khắp các vách núi cổ xưa, báo hiệu trận chiến sinh tử sắp bắt đầu.',
      placeholder: 'Nhập câu thoại lịch sử...',
      promptHelp: 'Điền câu sử thi hành động'
    },
    {
      id: 'tiktok_ecom',
      label: 'Review TMĐT: "KOL review Serum dưỡng trắng da mờ thâm TikTok Shop"',
      sampleDialogue: 'Chào các bạn! Đây là dòng serum phục hồi dưỡng trắng mờ thâm đang làm mưa làm gió trên TikTok Shop tuần qua. Cùng mình bóc seal trải nghiệm thực tế ngay nhé!',
      placeholder: 'Nhập câu thoại review bán hàng...',
      promptHelp: 'Điền câu review KOL'
    },
  ],
  en: [
    {
      id: 'mystery',
      label: 'Mystery / Adventure: "Tom and Milo uncover the glowing ancient relic"',
      sampleDialogue: 'Midnight in Tom’s bedroom, faint blue moonlight pouring through the frosted window. Milo the cat suddenly glances outside, discovering an ancient glowing key beneath the floorboards.',
      placeholder: 'Enter dialogue in English to test AI voiceover...',
      promptHelp: 'Fill sample mystery prompt'
    },
    {
      id: 'history',
      label: 'Epic / Mythology: "The Legend of Skull Island and King Kong"',
      sampleDialogue: 'Deep inside the treacherous mist of Skull Island, Kong’s ground-shaking roar echoes across ancient cliffs, heralding an ultimate battle for survival.',
      placeholder: 'Enter epic narration...',
      promptHelp: 'Fill epic action prompt'
    },
    {
      id: 'tiktok_ecom',
      label: 'E-commerce Review: "Trending Viral Skincare Serum Unboxing"',
      sampleDialogue: 'Hey guys! This is the viral brightening serum everyone is raving about on TikTok Shop this week. Let’s unbox it and test the instant glow on camera right now!',
      placeholder: 'Enter marketing review script...',
      promptHelp: 'Fill product review prompt'
    },
  ],
  ja: [
    {
      id: 'mystery',
      label: 'ミステリー・冒険：「少年トムと猫のマイロが光る古代の鍵を発見」',
      sampleDialogue: '真夜中のトムの部屋、窓から青白い月明かりが差し込んでいる。猫のマイロが突然外を見つめ、床下で淡く光る古代の鍵を見つけた。',
      placeholder: 'テストしたい日本語のセリフを入力してください...',
      promptHelp: 'ミステリーの例文を挿入'
    },
    {
      id: 'history',
      label: '歴史・伝説：「スカルアイランドの戦いとキングコングの神話」',
      sampleDialogue: 'スカルアイランドの濃い霧の奥深く、コングの地響きのような咆哮が古代の断崖に響き渡り、命を懸けた最終決戦の幕が開く。',
      placeholder: '迫力あるナレーションを入力...',
      promptHelp: '伝説・神話の例文を挿入'
    },
    {
      id: 'tiktok_ecom',
      label: '商品レビュー：「TikTokで大バズり中の美白美容液を本音レビュー」',
      sampleDialogue: '皆さんこんにちは！今週SNSで話題沸騰中の大人気セラムが届きました。早速開封して、その圧倒的な保湿力とツヤ感を試してみましょう！',
      placeholder: 'レビュー・広告文を入力...',
      promptHelp: '商品レビューの例文を挿入'
    },
  ],
  zh: [
    {
      id: 'mystery',
      label: '悬疑探险：《小男孩汤姆与白猫米洛发现神秘发光古钥匙》',
      sampleDialogue: '午夜时分，淡蓝色的月光透过窗户洒在汤姆的房间。白猫米洛突然望向窗外，在地板夹层中发现了一柄正散发着幽蓝光芒的神秘古钥匙。',
      placeholder: '输入需要试听配音的中文文案...',
      promptHelp: '填入悬疑剧情范例文案'
    },
    {
      id: 'history',
      label: '史诗传奇：《骷髅岛之战与金刚远古传说》',
      sampleDialogue: '在骷髅岛弥漫的浓雾深处，金刚震天动地的怒吼声回荡在古老断崖之间，预示着一场决定宿命的生死之战即将拉开序幕。',
      placeholder: '输入历史传奇旁白文案...',
      promptHelp: '填入史诗战役范例文案'
    },
    {
      id: 'tiktok_ecom',
      label: '电商带货：《爆款美白焕肤精华液开箱实测》',
      sampleDialogue: '大家好！今天给大家带来这周在带货榜单断层第一的焕肤美白精华液。让我们一起开箱，看看上脸后的透亮水光感到底有多惊艳！',
      placeholder: '输入带货口播文案...',
      promptHelp: '填入爆款带货范例文案'
    },
  ],
};

const DEFAULT_VOICE_BY_LANG: Record<Language, string> = {
  vi: 'vi-VN-HoaiMyNeural',
  en: 'en-US-JennyNeural',
  ja: 'ja-JP-NanamiNeural',
  zh: 'zh-CN-XiaoxiaoNeural',
};

export const InteractiveFlowDemo: React.FC<InteractiveFlowDemoProps> = ({
  onOpenLeadModal,
  onScrollToDownload,
}) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedTopic, setSelectedTopic] = useState<string>('mystery');
  const [selectedVoice, setSelectedVoice] = useState<string>(DEFAULT_VOICE_BY_LANG[language] || 'vi-VN-HoaiMyNeural');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const topics = TOPICS_BY_LANG[language] || TOPICS_BY_LANG.vi;
  const currentTopicObj = topics.find((t) => t.id === selectedTopic) || topics[0];

  const [customDialogue, setCustomDialogue] = useState<string>(currentTopicObj.sampleDialogue);

  const cancelAudioRef = useRef<(() => void) | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Update default voice when language changes
  useEffect(() => {
    setSelectedVoice(DEFAULT_VOICE_BY_LANG[language] || 'vi-VN-HoaiMyNeural');
  }, [language]);

  // Update custom dialogue when topic or language changes
  useEffect(() => {
    setCustomDialogue(currentTopicObj.sampleDialogue);
  }, [selectedTopic, language]);

  const flowUi = {
    vi: {
      tag: 'MÔ PHỎNG QUY TRÌNH 1-CLICK',
      title: 'Từ Ý Tưởng Đến Video Hoàn Thiện Chỉ Sau 60 Giây',
      subtitle: 'Trải nghiệm từng bước tự động hóa khép kín của Kinx Auto ngay trên trình duyệt của bạn.',
      steps: [
        { number: 1, title: 'Nhập Ý Tưởng / Link', icon: FileText, desc: 'Dán link YouTube hoặc gõ 1 câu ý tưởng' },
        { number: 2, title: 'AI Viết Kịch Bản', icon: Sparkles, desc: 'Tự động phân cảnh 3 hồi chuẩn chỉnh' },
        { number: 3, title: 'Lồng Tiếng Voice AI', icon: Mic, desc: 'Giọng đọc Edge TTS chuẩn phát thanh viên' },
        { number: 4, title: 'Render Veo 3.1', icon: Video, desc: 'Khóa nhân vật & xuất video 1080p' },
      ],
      step1: {
        header: 'BƯỚC 1: CHỌN CHỦ ĐỀ HOẶC DÁN LINK YOUTUBE',
        timeSaved: 'Tiết kiệm 2 giờ viết lách',
        label: 'Chọn kịch bản mẫu để chạy thử nghiệm:',
        tip: '💡 Mẹo chuyên gia: Bạn cũng có thể dán link video YouTube công khai bất kỳ để Kinx Auto tự động phân tích bối cảnh, trích xuất phụ đề và tạo ra bản kịch bản độc quyền mới 100%.'
      },
      step2: {
        header: 'BƯỚC 2: AI TỰ ĐỘNG PHÂN CẢNH VÀ TẠO PROMPT',
        badge: 'Đã sinh 6 phân cảnh',
        scenes: [
          { title: 'Cảnh 1 (0-8s):', desc: '[Mô tả nhân vật @nv1]: Tom 9 tuổi mặc áo hoodie vàng đứng bên cửa sổ nhìn mưa đêm rơi trên con hẻm vắng.' },
          { title: 'Cảnh 2 (8-16s):', desc: '[Góc quay Dolly Zoom]: Chú mèo Milo lông vàng trắng @nv2 dùng miệng kéo chiếc ba lô cũ bí ẩn.' },
          { title: 'Cảnh 3 (16-24s):', desc: '[Ánh sáng Rembrandt]: Chiếc chìa khóa đồng cổ phát sáng mờ ảo, hé lộ cánh cửa bí mật trong phòng kho.' },
        ]
      },
      step3: {
        header: 'BƯỚC 3: XUẤT AUDIO VOICE TRUYỀN CẢM (EDGE TTS)',
        costZero: 'Chi phí: 0 VNĐ (Không tốn token)',
      }
    },
    en: {
      tag: '1-CLICK AUTOMATION SIMULATOR',
      title: 'From Rough Idea to Finished AI Video in 60 Seconds',
      subtitle: 'Experience the closed-loop automation pipeline of Kinx Auto directly inside your browser.',
      steps: [
        { number: 1, title: 'Input Idea / Link', icon: FileText, desc: 'Paste YouTube URL or type a single sentence' },
        { number: 2, title: 'AI Scriptwriting', icon: Sparkles, desc: 'Automatic 3-act story & prompt breakdown' },
        { number: 3, title: 'Neural Voice Studio', icon: Mic, desc: 'Edge TTS studio-grade emotional voiceover' },
        { number: 4, title: 'Veo 3.1 Rendering', icon: Video, desc: 'Face lock & 1080p multi-threaded export' },
      ],
      step1: {
        header: 'STEP 1: SELECT TOPIC OR PASTE YOUTUBE LINK',
        timeSaved: 'Saves 2+ hours of writing',
        label: 'Select sample topic to test AI simulation:',
        tip: '💡 Pro Tip: You can also paste any public YouTube link to let Kinx Auto automatically extract transcripts, analyze pacing, and craft a brand-new original script.'
      },
      step2: {
        header: 'STEP 2: AI AUTO-STORYBOARDING & PROMPT BREAKDOWN',
        badge: '6 Scenes Generated',
        scenes: [
          { title: 'Scene 1 (0-8s):', desc: '[Character Lock @char1]: 9-year-old Tom in yellow hoodie stands by the rainy window gazing into the night alley.' },
          { title: 'Scene 2 (8-16s):', desc: '[Cinematic Dolly Zoom]: Milo the ginger cat @char2 tugs the mysterious antique backpack with his mouth.' },
          { title: 'Scene 3 (16-24s):', desc: '[Rembrandt Lighting]: Ancient bronze key glows faintly, unlocking the hidden doorway in the attic.' },
        ]
      },
      step3: {
        header: 'STEP 3: STUDIO NEURAL AI VOICEOVER (EDGE TTS)',
        costZero: 'Cost: $0 (Zero tokens consumed)',
      }
    },
    ja: {
      tag: '1クリック自動化シミュレーター',
      title: 'アイデア入力から完成動画までわずか60秒',
      subtitle: 'Kinx Autoの完全自動化ワークフローをブラウザ上で直接ご体験ください。',
      steps: [
        { number: 1, title: 'アイデア/リンク入力', icon: FileText, desc: 'YouTubeリンク貼付または1行入力' },
        { number: 2, title: 'AI台本・分鏡生成', icon: Sparkles, desc: '黄金の3幕構成で自動プロンプト作成' },
        { number: 3, title: 'AI音声合成', icon: Mic, desc: 'Edge TTS高精度スタジオ音声' },
        { number: 4, title: 'Veo 3.1 レンダリング', icon: Video, desc: '顔固定＆1080p並列一括出力' },
      ],
      step1: {
        header: 'ステップ 1: トピック選択 または YouTube リンク貼り付け',
        timeSaved: '台本作成時間を2時間削減',
        label: 'シミュレーション実行用のサンプル台本を選択:',
        tip: '💡 プロの活用術: YouTube動画のリンクを貼り付けるだけで、Kinx Autoが字幕と演出構成を自動解析し、完全オリジナルの新台本を生成します。'
      },
      step2: {
        header: 'ステップ 2: AI 自動絵コンテ＆プロンプト生成',
        badge: '6つの分鏡シーン生成完了',
        scenes: [
          { title: 'シーン 1 (0-8秒):', desc: '[キャラクター固定 @char1]: 黄色いパーカーを着た9歳の少年トムが、雨の降る夜の路地を窓辺から見つめる。' },
          { title: 'シーン 2 (8-16秒):', desc: '[ドリーズーム演出]: 白茶トラ猫のマイロ @char2 が口で謎のアンティークリュックを引っ張る。' },
          { title: 'シーン 3 (16-24秒):', desc: '[レンブラントライティング]: 古代の青銅の鍵がほのかに光り、屋根裏部屋の隠し扉を照らし出す。' },
        ]
      },
      step3: {
        header: 'ステップ 3: スタジオ品質の音声合成 (EDGE TTS)',
        costZero: '費用: 0円 (トークン消費なし)',
      }
    },
    zh: {
      tag: '1键全自动化流程实操演示',
      title: '输入灵感到视频成片仅需 60 秒',
      subtitle: '在浏览器中亲身体验 Kinx Auto 闭环全自动 AI 视频制作的全流程。',
      steps: [
        { number: 1, title: '输入创意/链接', icon: FileText, desc: '粘贴 YouTube 链接或输入一句话构思' },
        { number: 2, title: 'AI 分镜剧本', icon: Sparkles, desc: '自动黄金三幕式结构与画面指令拆解' },
        { number: 3, title: 'AI 广播级配音', icon: Mic, desc: 'Edge TTS 免费专业情感播音' },
        { number: 4, title: 'Veo 3.1 极速渲染', icon: Video, desc: '角色面部深度锁定与1080p导出' },
      ],
      step1: {
        header: '第一步：选择生成主题或粘贴 YOUTUBE 链接',
        timeSaved: '节省 2 小时文案撰写时间',
        label: '选择范例剧本进行效果测试：',
        tip: '💡 高手技巧：您可以粘贴任意公开的 YouTube 视频链接，Kinx Auto 会自动提取字幕、拆解分镜节奏并重新生成 100% 原创的爆款剧本。'
      },
      step2: {
        header: '第二步：AI 自动分镜脚本与画面指令生成',
        badge: '已生成 6 个标准分镜',
        scenes: [
          { title: '分镜 1 (0-8秒):', desc: '[人物锁定 @角色1]: 9岁小男孩汤姆身穿黄色卫衣站在雨夜窗前，注视着寂静的街道。' },
          { title: '分镜 2 (8-16秒):', desc: '[电影级推拉变焦]: 白橘相间的小猫米洛 @角色2 用嘴叼住神秘的复古背包。' },
          { title: '分镜 3 (16-24秒):', desc: '[伦勃朗光影]: 古老的青铜钥匙泛起幽幽蓝光，隐约揭开储藏室深处的秘密暗门。' },
        ]
      },
      step3: {
        header: '第三步：导出广播级神经网络配音 (EDGE TTS)',
        costZero: '成本：0元 (无需消耗任何额度)',
      }
    },
  }[language] || {
    tag: 'MÔ PHỎNG QUY TRÌNH 1-CLICK',
    title: 'Từ Ý Tưởng Đến Video Hoàn Thiện Chỉ Sau 60 Giây',
    subtitle: 'Trải nghiệm từng bước tự động hóa khép kín của Kinx Auto ngay trên trình duyệt của bạn.',
    steps: [
      { number: 1, title: 'Nhập Ý Tưởng / Link', icon: FileText, desc: 'Dán link YouTube hoặc gõ 1 câu ý tưởng' },
      { number: 2, title: 'AI Viết Kịch Bản', icon: Sparkles, desc: 'Tự động phân cảnh 3 hồi chuẩn chỉnh' },
      { number: 3, title: 'Lồng Tiếng Voice AI', icon: Mic, desc: 'Giọng đọc Edge TTS chuẩn phát thanh viên' },
      { number: 4, title: 'Render Veo 3.1', icon: Video, desc: 'Khóa nhân vật & xuất video 1080p' },
    ],
    step1: {
      header: 'BƯỚC 1: CHỌN CHỦ ĐỀ HOẶC DÁN LINK YOUTUBE',
      timeSaved: 'Tiết kiệm 2 giờ viết lách',
      label: 'Chọn kịch bản mẫu để chạy thử nghiệm:',
      tip: '💡 Mẹo chuyên gia: Bạn cũng có thể dán link video YouTube công khai bất kỳ để Kinx Auto tự động phân tích bối cảnh, trích xuất phụ đề và tạo ra bản kịch bản độc quyền mới 100%.'
    },
    step2: {
      header: 'BƯỚC 2: AI TỰ ĐỘNG PHÂN CẢNH VÀ TẠO PROMPT',
      badge: 'Đã sinh 6 phân cảnh',
      scenes: [
        { title: 'Cảnh 1 (0-8s):', desc: '[Mô tả nhân vật @nv1]: Tom 9 tuổi mặc áo hoodie vàng đứng bên cửa sổ nhìn mưa đêm rơi trên con hẻm vắng.' },
        { title: 'Cảnh 2 (8-16s):', desc: '[Góc quay Dolly Zoom]: Chú mèo Milo lông vàng trắng @nv2 dùng miệng kéo chiếc ba lô cũ bí ẩn.' },
        { title: 'Cảnh 3 (16-24s):', desc: '[Ánh sáng Rembrandt]: Chiếc chìa khóa đồng cổ phát sáng mờ ảo, hé lộ cánh cửa bí mật trong phòng kho.' },
      ]
    },
    step3: {
      header: 'BƯỚC 3: XUẤT AUDIO VOICE TRUYỀN CẢM (EDGE TTS)',
      costZero: 'Chi phí: 0 VNĐ (Không tốn token)',
    }
  };

  const steps = flowUi.steps;

  // Clean up audio on step change or unmount
  const stopAudio = () => {
    if (cancelAudioRef.current) {
      cancelAudioRef.current();
      cancelAudioRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    setIsPlayingAudio(false);
    setAudioProgress(0);
  };

  useEffect(() => {
    stopAudio();
  }, [currentStep, selectedTopic]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const handlePlayVoice = () => {
    if (isPlayingAudio) {
      stopAudio();
      return;
    }

    stopAudio();
    setIsPlayingAudio(true);
    setAudioProgress(5);

    const activeText = customDialogue.trim() || currentTopicObj.sampleDialogue;
    const duration = Math.max(4, Math.round(activeText.length / 16));
    const stepMs = 100;
    const progressInc = (stepMs / (duration * 1000)) * 100;

    progressIntervalRef.current = window.setInterval(() => {
      setAudioProgress((prev) => {
        if (prev >= 98) {
          return 98;
        }
        return prev + progressInc;
      });
    }, stepMs);

    cancelAudioRef.current = speakEdgeTTS({
      text: activeText,
      voiceId: selectedVoice,
      speed: playbackSpeed,
      onStart: () => {
        setIsPlayingAudio(true);
      },
      onEnd: () => {
        setIsPlayingAudio(false);
        setAudioProgress(100);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        setTimeout(() => setAudioProgress(0), 600);
      },
      onError: () => {
        setIsPlayingAudio(false);
        setAudioProgress(0);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      }
    });
  };

  const handleNextStep = () => {
    stopAudio();
    if (currentStep < 4) {
      setIsSimulating(true);
      setTimeout(() => {
        setIsSimulating(false);
        setCurrentStep((prev) => prev + 1);
      }, 400);
    } else {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.7 }
      });
      setCurrentStep(1);
    }
  };

  return (
    <section id="interactive-flow" className="py-10 sm:py-12 bg-gradient-to-b from-[#0B0F19] via-[#0F172A] to-[#0B0F19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-bold text-cyan-300 mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{flowUi.tag}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-black text-white tracking-tight">
            {flowUi.title}
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            {flowUi.subtitle}
          </p>
        </div>

        {/* Step Progress Tracker */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10 max-w-4xl mx-auto">
          {steps.map((s) => {
            const Icon = s.icon;
            const isPassed = currentStep > s.number;
            const isCurrent = currentStep === s.number;
            return (
              <button
                key={s.number}
                onClick={() => setCurrentStep(s.number)}
                className={`p-3.5 rounded-2xl text-left transition-all border ${
                  isCurrent
                    ? 'bg-purple-950/70 border-purple-500 shadow-lg shadow-purple-950/50 scale-[1.02]'
                    : isPassed
                    ? 'bg-slate-900/80 border-emerald-500/40'
                    : 'bg-slate-900/40 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                    isCurrent
                      ? 'bg-purple-600 text-white'
                      : isPassed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isPassed ? <CheckCircle2 className="w-4 h-4" /> : s.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-purple-300' : 'text-slate-400'}`} />
                </div>
                <p className="text-xs sm:text-sm font-bold text-white">{s.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{s.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace Screen */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-950 border border-slate-700/80 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] pointer-events-none" />

          {/* Step 1 Content */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  {flowUi.step1.header}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" /> {flowUi.step1.timeSaved}
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  {flowUi.step1.label}
                </label>
                <div className="space-y-2">
                  {topics.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTopic(t.id)}
                      className={`w-full p-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-all border ${
                        selectedTopic === t.id
                          ? 'bg-purple-950/60 border-purple-500/80 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
                {flowUi.step1.tip}
              </div>
            </motion.div>
          )}

          {/* Step 2 Content */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  {flowUi.step2.header}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                  {flowUi.step2.badge}
                </span>
              </div>

              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-2">
                {flowUi.step2.scenes.map((sc, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                    <span className="text-purple-400 font-bold">{sc.title}</span>
                    <p className="text-slate-300 mt-1 font-mono">{sc.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3 Content: Specialized Edge TTS Voice Studio */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                    {flowUi.step3.header}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {flowUi.step3.costZero}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Engine: Edge TTS Hi-Fi 320kbps
                </span>
              </div>

              {/* Main Audio Studio Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-purple-500/40 shadow-xl space-y-4 relative overflow-hidden">
                {/* Background Ambient Wave Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/15 blur-[60px] pointer-events-none" />

                {/* Voice Selection Tabs */}
                <div>
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2 flex items-center justify-between">
                    <span>{language === 'en' ? 'Select AI Voice Artist:' : language === 'ja' ? 'AI音声ナレーターを選択：' : language === 'zh' ? '选择 AI 配音主播：' : 'Chọn Giọng Đọc AI (Microsoft Edge TTS):'}</span>
                    <span className="text-purple-300 font-normal text-xs lowercase">{language === 'en' ? '100% human-like neural quality' : language === 'ja' ? '高精度ニューラル音声' : language === 'zh' ? '超逼真神经网络发音' : 'Giọng Neural chuẩn tự nhiên 100%'}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {TTS_VOICES.filter((v) => v.lang === language).map((voice) => {
                      const isSelected = selectedVoice === voice.id;
                      return (
                        <button
                          key={voice.id}
                          type="button"
                          onClick={() => {
                            setSelectedVoice(voice.id);
                            if (isPlayingAudio) stopAudio();
                          }}
                          className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-purple-950/80 border-purple-400 shadow-md shadow-purple-950/60 text-white'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs flex items-center gap-1.5">
                              <UserCheck className={`w-3.5 h-3.5 ${isSelected ? 'text-purple-300' : 'text-slate-500'}`} />
                              {voice.name}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                              isSelected ? 'bg-purple-500/30 text-purple-200 border border-purple-400/40' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {voice.accent}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">{voice.style}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Speed Controls & Topic Script Info */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Sliders className="w-3.5 h-3.5 text-cyan-400" /> {language === 'en' ? 'Speed:' : language === 'ja' ? '再生速度:' : language === 'zh' ? '语速:' : 'Tốc độ:'}
                    </span>
                    <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                      {[0.85, 1.0, 1.2].map((spd) => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => {
                            setPlaybackSpeed(spd);
                            if (isPlayingAudio) stopAudio();
                          }}
                          className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            playbackSpeed === spd
                              ? 'bg-purple-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {spd === 1.0 ? '1.0x' : `${spd}x`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 font-medium">
                    {language === 'en' ? 'Script topic:' : language === 'ja' ? '選択ジャンル:' : language === 'zh' ? '剧本分类:' : 'Kịch bản theo:'} <strong className="text-purple-300">{currentTopicObj.label.split(/[:：]/)[0]}</strong>
                  </div>
                </div>

                {/* Text Sample Dialogue Preview & Editor */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/90 relative">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 flex-wrap gap-1">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-purple-400" /> {language === 'en' ? 'Dialogue text for TTS narration:' : language === 'ja' ? '音声合成用テキスト:' : language === 'zh' ? '待合成旁白文案:' : 'Câu thoại mẫu Tiếng Việt xuất audio:'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCustomDialogue(currentTopicObj.sampleDialogue);
                          if (isPlayingAudio) stopAudio();
                        }}
                        className="text-[10px] text-purple-400 hover:text-purple-300 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                      >
                        <RefreshCw className="w-3 h-3" /> {currentTopicObj.promptHelp}
                      </button>
                      <span className="text-[10px] text-emerald-400 font-mono">{language === 'en' ? 'Duration: ~6s' : language === 'ja' ? '所要時間: 約6秒' : language === 'zh' ? '预计时长: ~6秒' : 'Độ dài: ~6 giây'}</span>
                    </div>
                  </div>
                  
                  <textarea
                    value={customDialogue}
                    onChange={(e) => {
                      setCustomDialogue(e.target.value);
                      if (isPlayingAudio) stopAudio();
                    }}
                    rows={2}
                    className="w-full bg-slate-900/90 border border-purple-500/20 focus:border-purple-500/60 rounded-lg p-2.5 text-xs sm:text-sm text-slate-100 font-sans leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-purple-500/40 transition-all"
                    placeholder={currentTopicObj.placeholder}
                  />
                </div>

                {/* Audio Waveform & Player Action Bar */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-950/60 via-slate-950 to-indigo-950/60 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Waveform Equalizer Visualizer */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="flex items-center gap-1 h-8 px-2 bg-slate-900/90 rounded-lg border border-slate-800">
                      {[14, 28, 45, 70, 90, 60, 80, 40, 65, 85, 50, 75, 95, 60, 40, 80, 55, 30].map((baseHeight, idx) => {
                        const dynamicHeight = isPlayingAudio
                          ? Math.max(15, (baseHeight + Math.sin(idx + Date.now() / 150) * 35) % 100)
                          : 20;
                        return (
                          <motion.span
                            key={idx}
                            animate={{
                              height: isPlayingAudio ? `${dynamicHeight}%` : '20%',
                              backgroundColor: isPlayingAudio ? '#C084FC' : '#64748B',
                            }}
                            transition={{ duration: 0.15, repeat: isPlayingAudio ? Infinity : 0, repeatType: 'reverse' }}
                            className="w-1 rounded-full"
                          />
                        );
                      })}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                        <p className="text-xs font-bold text-white">
                          {isPlayingAudio 
                            ? (language === 'en' ? 'Playing Edge TTS Audio...' : language === 'ja' ? '音声再生中...' : language === 'zh' ? '正在播放 Edge TTS 语音...' : 'Đang phát âm thanh Edge TTS...')
                            : (language === 'en' ? 'Ready to preview audio' : language === 'ja' ? '音声プレビュー待機中' : language === 'zh' ? '准备试听音频' : 'Sẵn sàng nghe thử âm thanh')}
                        </p>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {isPlayingAudio 
                          ? (language === 'en' ? 'Audio Stereo 320kbps • Syncing timeline' : language === 'ja' ? '高音質ステレオ 320kbps • タイムライン同期中' : language === 'zh' ? '立体声 320kbps • 正在对齐时间轴' : 'Audio Stereo 320kbps • Đang đồng bộ timeline')
                          : (language === 'en' ? 'Click button to test natural AI voiceover' : language === 'ja' ? 'ボタンを押して高品質AI音声を体験' : language === 'zh' ? '点击按钮试听逼真神经网络配音' : 'Nhấn nút để kiểm tra chất giọng truyền cảm')}
                      </p>
                    </div>
                  </div>

                  {/* Playback Trigger Button */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={handlePlayVoice}
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all cursor-pointer ${
                        isPlayingAudio
                          ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-950/60 animate-pulse'
                          : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-purple-950/80 hover:scale-105'
                      }`}
                    >
                      {isPlayingAudio ? (
                        <>
                          <Square className="w-4 h-4 fill-white" />
                          <span>{language === 'en' ? 'Stop Audio' : language === 'ja' ? '停止' : language === 'zh' ? '停止播放' : 'Dừng Nghe'}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-white" />
                          <span>{language === 'en' ? 'Listen to AI Voice' : language === 'ja' ? '音声を試聴する' : language === 'zh' ? '立即试听 AI 语音' : 'Nghe Thử Voice AI Ngay'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Progress bar when playing */}
                {isPlayingAudio && (
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full transition-all duration-150"
                      style={{ width: `${audioProgress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Edge TTS Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{language === 'en' ? 'Context-aware natural pauses' : language === 'ja' ? '文脈に応じた自然な抑揚と間' : language === 'zh' ? '根据语境自动智能停顿' : 'Tự động ngắt nghỉ câu theo ngữ cảnh'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>{language === 'en' ? 'Batch multi-threaded MP3 export' : language === 'ja' ? 'マルチスレッド一括MP3書き出し' : language === 'zh' ? '多线程批量导出MP3音频' : 'Xuất file MP3 hàng loạt đa luồng'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{language === 'en' ? '100% video scene timeline sync' : language === 'ja' ? '映像と音声のタイムライン完全同期' : language === 'zh' ? '音画分镜时间轴100%精准对齐' : 'Khớp timeline phân cảnh video 100%'}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4 Content */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'RENDER COMPLETED WITH GOOGLE VEO 3.1' : language === 'ja' ? 'Google Veo 3.1 レンダリング完了' : language === 'zh' ? 'Google Veo 3.1 渲染已完成' : 'RENDER HOÀN TẤT VỚI GOOGLE VEO 3.1'}</span>
              </div>

              <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-900 border border-purple-500/40 flex items-center justify-center p-4 max-w-lg mx-auto group">
                <img
                  src={APP_IMAGES.consistentCharacter}
                  alt="Rendered Video Sample"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-black/60" />
                <div className="relative z-10 space-y-2">
                  <div className="w-14 h-14 rounded-full bg-purple-600/90 text-white flex items-center justify-center mx-auto shadow-xl animate-pulse backdrop-blur-sm border border-purple-400/50">
                    <Play className="w-6 h-6 ml-0.5" />
                  </div>
                  <p className="text-xs font-bold text-white">{language === 'en' ? 'Completed Scene Breakdown (1080p 60fps)' : language === 'ja' ? '完成したシーン映像 (1080p 60fps)' : language === 'zh' ? '分镜视频已渲染完成 (1080p 60fps)' : 'Video Phân Cảnh Đã Hoàn Chỉnh (1080p 60fps)'}</p>
                  <p className="text-[11px] text-purple-200">{language === 'en' ? '100% Face & Character Lock • Synchronized Edge TTS' : language === 'ja' ? 'キャラクター顔貌100%保持 • 高音質音声完全同期' : language === 'zh' ? '100% 人物面部一致性锁定 • 完美对齐配音' : 'Khóa 100% nhân vật @nv1 & @nv2 • Khớp giọng đọc Edge TTS 100%'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={onScrollToDownload}
                  className="glow-button w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30"
                >
                  {language === 'en' ? 'Download Kinx Auto to Automate Your Channel' : language === 'ja' ? 'Kinx AutoをDLしてチャンネルを自動化' : language === 'zh' ? '下载 Kinx Auto 开启频道全自动运营' : 'Tải Kinx Auto Để Tự Động Hóa Kênh Của Bạn'}
                </button>
                <button
                  onClick={onOpenLeadModal}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold border border-slate-700 hover:border-cyan-500/40 transition-all"
                >
                  {language === 'en' ? 'Get Tool & Start Free Trial' : language === 'ja' ? '無料体験版をダウンロード' : language === 'zh' ? '免费注册试用软件' : 'Tải Tool & Đăng Ký Dùng Thử Miễn Phí'}
                </button>
              </div>
            </motion.div>
          )}

          {/* Bottom Action Footer */}
          <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {language === 'en' ? `Step ${currentStep} of 4` : language === 'ja' ? `ステップ ${currentStep} / 4` : language === 'zh' ? `第 ${currentStep} 步 / 共 4 步` : `Bước ${currentStep} trên 4`}
            </span>
            <button
              onClick={handleNextStep}
              disabled={isSimulating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-purple-600/20 cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{language === 'en' ? 'Processing AI...' : language === 'ja' ? 'AI処理中...' : language === 'zh' ? 'AI处理中...' : 'Đang xử lý AI...'}</span>
                </>
              ) : currentStep === 4 ? (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>{language === 'en' ? 'Replay Demo' : language === 'ja' ? '最初から再生' : language === 'zh' ? '重新体验' : 'Chạy Lại Từ Đầu'}</span>
                </>
              ) : (
                <>
                  <span>{language === 'en' ? 'Continue to Next Step' : language === 'ja' ? '次のステップへ進む' : language === 'zh' ? '进入下一步' : 'Tiếp tục bước kế tiếp'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFlowDemo;
