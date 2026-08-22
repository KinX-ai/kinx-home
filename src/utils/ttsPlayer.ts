// Authentic Microsoft Edge TTS Vietnamese Audio Player with Web Audio API Decoding

export interface TTSVoiceOption {
  id: string;
  name: string;
  lang: 'vi' | 'en' | 'ja' | 'zh';
  gender: 'female' | 'male';
  accent: string;
  style: string;
  pitch: number;
  rate: number;
}

export const TTS_VOICES: TTSVoiceOption[] = [
  // Vietnamese
  {
    id: 'vi-VN-HoaiMyNeural',
    name: 'Hoài My (Nữ Bắc)',
    lang: 'vi',
    gender: 'female',
    accent: 'Miền Bắc',
    style: 'Truyền cảm • Kể chuyện • Review phim',
    pitch: 1.0,
    rate: 1.0,
  },
  {
    id: 'vi-VN-NamMinhNeural',
    name: 'Nam Minh (Nam Bắc)',
    lang: 'vi',
    gender: 'male',
    accent: 'Miền Bắc',
    style: 'Trầm ấm • Lịch sử • Phim tài liệu',
    pitch: 1.0,
    rate: 1.0,
  },
  // English
  {
    id: 'en-US-JennyNeural',
    name: 'Jenny (US Female)',
    lang: 'en',
    gender: 'female',
    accent: 'American Accent',
    style: 'Dynamic • Storytelling • Tech Review',
    pitch: 1.0,
    rate: 1.0,
  },
  {
    id: 'en-US-GuyNeural',
    name: 'Guy (US Male)',
    lang: 'en',
    gender: 'male',
    accent: 'American Accent',
    style: 'Cinematic Trailer • Deep Narration',
    pitch: 1.0,
    rate: 1.0,
  },
  // Japanese
  {
    id: 'ja-JP-NanamiNeural',
    name: 'Nanami (女性)',
    lang: 'ja',
    gender: 'female',
    accent: 'Standard Tokyo',
    style: '明瞭・解説・アニメストーリー',
    pitch: 1.0,
    rate: 1.0,
  },
  {
    id: 'ja-JP-KeitaNeural',
    name: 'Keita (男性)',
    lang: 'ja',
    gender: 'male',
    accent: 'Standard Tokyo',
    style: '重厚・ドキュメンタリー・映画解説',
    pitch: 1.0,
    rate: 1.0,
  },
  // Chinese
  {
    id: 'zh-CN-XiaoxiaoNeural',
    name: '晓晓 (女声)',
    lang: 'zh',
    gender: 'female',
    accent: '普通话',
    style: '生动自然 • 电影解说 • 带货口播',
    pitch: 1.0,
    rate: 1.0,
  },
  {
    id: 'zh-CN-YunxiNeural',
    name: '云希 (男声)',
    lang: 'zh',
    gender: 'male',
    accent: '普通话',
    style: '深沉磁性 • 历史传奇 • 纪录片',
    pitch: 1.0,
    rate: 1.0,
  },
];

export const ALLOWED_VOICE_IDS = TTS_VOICES.map((v) => v.id);

let globalAudioCtx: AudioContext | null = null;
let currentSourceNode: AudioBufferSourceNode | null = null;
let currentAbortController: AbortController | null = null;
let globalFallbackAudio: HTMLAudioElement | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!globalAudioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        globalAudioCtx = new AudioCtxClass();
      }
    }
    if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume().catch(() => {});
    }
    return globalAudioCtx;
  } catch (e) {
    console.warn('AudioContext initialization notice:', e);
    return null;
  }
}

export function stopAllTTS() {
  if (currentAbortController) {
    currentAbortController.abort();
    currentAbortController = null;
  }

  if (currentSourceNode) {
    try {
      currentSourceNode.onended = null;
      currentSourceNode.stop();
      currentSourceNode.disconnect();
    } catch (e) {
      // Ignore
    }
    currentSourceNode = null;
  }

  if (globalFallbackAudio) {
    try {
      globalFallbackAudio.pause();
      globalFallbackAudio.currentTime = 0;
      globalFallbackAudio.src = '';
    } catch (e) {
      // Ignore
    }
    globalFallbackAudio = null;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // Ignore
    }
  }
}

// Speaks Vietnamese text using real Microsoft Edge Neural TTS API
export function speakEdgeTTS({
  text,
  voiceId = 'vi-VN-HoaiMyNeural',
  speed = 1.0,
  onStart,
  onEnd,
  onError,
}: {
  text: string;
  voiceId?: string;
  speed?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}): () => void {
  if (typeof window === 'undefined') return () => {};

  stopAllTTS();

  const ctx = getAudioContext();
  const abortController = new AbortController();
  currentAbortController = abortController;

  const cleanText = text.trim();
  const validVoice = ALLOWED_VOICE_IDS.includes(voiceId) ? voiceId : 'vi-VN-HoaiMyNeural';

  const requestUrl = `/api/tts`;

  fetch(requestUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: cleanText,
      voice: validVoice,
      speed: speed,
    }),
    signal: abortController.signal,
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Edge TTS API status: ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      if (abortController.signal.aborted) return;

      // Method 1: High fidelity Web Audio API Decode (Iframe & sandbox proof)
      if (ctx) {
        try {
          if (ctx.state === 'suspended') {
            await ctx.resume();
          }

          // Use slice(0) because decodeAudioData detaches the arrayBuffer in some browsers
          const audioBuffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
          if (abortController.signal.aborted) return;

          const source = ctx.createBufferSource();
          source.buffer = audioBuffer;
          source.playbackRate.value = 1.0; // Speed is already synthesized by Edge TTS prosody

          source.connect(ctx.destination);
          currentSourceNode = source;

          source.onended = () => {
            if (currentSourceNode === source) {
              currentSourceNode = null;
            }
            onEnd?.();
          };

          source.start(0);
          onStart?.();
          return;
        } catch (decodeErr) {
          console.warn('Web Audio decode error, falling back to data URL:', decodeErr);
        }
      }

      // Method 2: Base64 Audio fallback
      try {
        let binary = '';
        const bytes = new Uint8Array(arrayBuffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64 = window.btoa(binary);
        const dataUrl = `data:audio/mp3;base64,${base64}`;

        const audio = new Audio(dataUrl);
        globalFallbackAudio = audio;

        audio.onplay = () => onStart?.();
        audio.onended = () => {
          if (globalFallbackAudio === audio) globalFallbackAudio = null;
          onEnd?.();
        };
        audio.onerror = (e) => {
          console.warn('Fallback audio tag error:', e);
          if (globalFallbackAudio === audio) globalFallbackAudio = null;
          onEnd?.();
        };

        audio.play().catch((err) => {
          console.warn('Audio play notice:', err);
          onEnd?.();
        });
      } catch (fallbackErr) {
        console.error('TTS playback failure:', fallbackErr);
        onError?.(fallbackErr);
        onEnd?.();
      }
    })
    .catch((err) => {
      if (abortController.signal.aborted) return;
      console.warn('Edge TTS backend fetch failed:', err);

      // Fallback: Web Speech API with Vietnamese voice
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          window.speechSynthesis.resume();
          const utterance = new SpeechSynthesisUtterance(cleanText);
          utterance.lang = 'vi-VN';
          utterance.rate = speed;

          const voices = window.speechSynthesis.getVoices();
          const viVoice = voices.find(
            (v) =>
              v.lang.toLowerCase() === 'vi-vn' ||
              v.lang.toLowerCase().startsWith('vi') ||
              v.name.toLowerCase().includes('vietnam')
          );
          if (viVoice) utterance.voice = viVoice;

          utterance.onstart = () => onStart?.();
          utterance.onend = () => onEnd?.();
          utterance.onerror = () => onEnd?.();

          window.speechSynthesis.speak(utterance);
        } catch (e) {
          onError?.(e);
          onEnd?.();
        }
      } else {
        onError?.(err);
        onEnd?.();
      }
    });

  return () => {
    stopAllTTS();
  };
}
