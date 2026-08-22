export type Language = 'vi' | 'en' | 'ja' | 'zh';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  country: string;
  regionCode: string;
}

export const LANGUAGES: LanguageOption[] = [
  {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    country: 'Vietnam',
    regionCode: 'VN'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    country: 'United States / Global',
    regionCode: 'US'
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    country: 'Japan',
    regionCode: 'JP'
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '简体中文',
    flag: '🇨🇳',
    country: 'China / Taiwan / Singapore',
    regionCode: 'CN'
  }
];
