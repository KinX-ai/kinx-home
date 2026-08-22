import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { UserSession } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserSession) => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { language } = useLanguage();
  const [emailInput, setEmailInput] = useState('ducphi2048+2@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const authTexts = {
    vi: {
      title: 'Đăng Nhập',
      emailLabel: 'Email',
      emailPlaceholder: 'Nhập email của bạn',
      passwordLabel: 'Mật khẩu',
      passwordPlaceholder: 'Nhập mật khẩu',
      successMsg: 'Đăng nhập thành công! Đang tải dữ liệu...',
      errorMsg: 'Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!',
      serverError: 'Lỗi kết nối máy chủ xác thực. Vui lòng thử lại sau.',
      btnSubmit: 'Đăng Nhập',
      noPackage: 'Chưa có gói'
    },
    en: {
      title: 'Sign In to',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      successMsg: 'Signed in successfully! Loading user session...',
      errorMsg: 'Invalid email or password. Please verify and try again!',
      serverError: 'Server authentication connection error. Please try again.',
      btnSubmit: 'Sign In',
      noPackage: 'Free Tier'
    },
    ja: {
      title: 'ログイン',
      emailLabel: 'メールアドレス',
      emailPlaceholder: 'メールアドレスを入力',
      passwordLabel: 'パスワード',
      passwordPlaceholder: 'パスワードを入力',
      successMsg: 'ログインに成功しました！セッションを読み込み中...',
      errorMsg: 'メールアドレスまたはパスワードが正しくありません。',
      serverError: '認証サーバーへの接続に失敗しました。',
      btnSubmit: 'ログイン',
      noPackage: '未契約'
    },
    zh: {
      title: '登录账号',
      emailLabel: '电子邮箱',
      emailPlaceholder: '请输入您的登录邮箱',
      passwordLabel: '登录密码',
      passwordPlaceholder: '请输入您的密码',
      successMsg: '登录成功！正在加载用户数据...',
      errorMsg: '邮箱或密码不正确，请重新核对后重试！',
      serverError: '身份认证服务器连接异常，请稍后重试。',
      btnSubmit: '立即登录',
      noPackage: '暂未开通'
    }
  }[language] || {
    title: 'Đăng Nhập',
    emailLabel: 'Email',
    emailPlaceholder: 'Nhập email của bạn',
    passwordLabel: 'Mật khẩu',
    passwordPlaceholder: 'Nhập mật khẩu',
    successMsg: 'Đăng nhập thành công! Đang tải dữ liệu...',
    errorMsg: 'Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại!',
    serverError: 'Lỗi kết nối máy chủ xác thực. Vui lòng thử lại sau.',
    btnSubmit: 'Đăng Nhập',
    noPackage: 'Chưa có gói'
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput.trim(),
          password: password.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.success && data.user) {
        const user: UserSession = {
          isLoggedIn: true,
          email: data.user.email,
          username: data.user.username,
          packageName: data.user.packageName || data.user.package_name || authTexts.noPackage,
          expireDate: data.user.expireDate || data.user.expire_date || ''
        };

        setMsg({ type: 'success', text: authTexts.successMsg });
        setTimeout(() => {
          onLoginSuccess(user);
          onClose();
          setMsg(null);
        }, 800);
      } else {
        setMsg({
          type: 'error',
          text: data.message || authTexts.errorMsg
        });
      }
    } catch (err: any) {
      setMsg({
        type: 'error',
        text: authTexts.serverError
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-md rounded-2xl bg-gray-900 border border-white/10 p-8 text-white shadow-2xl relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl cursor-pointer"
          >
            &times;
          </button>

          <div>
            <h3 className="text-2xl font-bold text-center mb-6">
              {authTexts.title} <span className="text-indigo-500">Kinx Auto</span>
            </h3>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">{authTexts.emailLabel}</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500"
                    placeholder={authTexts.emailPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">{authTexts.passwordLabel}</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500"
                    placeholder={authTexts.passwordPlaceholder}
                  />
                </div>
              </div>

              {msg && (
                <div
                  className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
                    msg.type === 'success'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}
                >
                  {msg.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{msg.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 font-bold py-3 rounded-lg hover:bg-indigo-700 transition-colors mt-2 text-white text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{authTexts.btnSubmit}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModals;
