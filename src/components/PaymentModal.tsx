import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, MessageCircle } from 'lucide-react';
import { PricingPlan, UserSession } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PaymentModalProps {
  isOpen: boolean;
  plan: PricingPlan | null;
  userSession: UserSession;
  onClose: () => void;
  onOpenLogin: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  plan,
  userSession,
  onClose,
  onOpenLogin,
}) => {
  const { language } = useLanguage();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  if (!isOpen || !plan) return null;

  const payTexts = {
    vi: {
      processingText: 'Đang xử lý, vui lòng không thoát...',
      successTitle: 'Giao Dịch Đã Tạo Thành Công!',
      successDesc: (uname: string, planName: string, price: string) => `Hệ thống đã ghi nhận giao dịch của tài khoản ${uname} cho gói ${planName} (${price}).`,
      lblUser: 'Tài khoản User:',
      lblPlan: 'Gói đã chọn:',
      lblAmount: 'Số tiền:',
      lblMemo: 'Nội dung CK:',
      btnContactZalo: (contact: string) => `Liên hệ Zalo kích hoạt ngay: ${contact}`,
      headerTitle: 'Thông Tin Thanh Toán',
      qrPrompt: (memo: string) => `Quét mã để thanh toán | Nội dung: ${memo}`,
      bankNameLbl: 'Ngân hàng:',
      accNoLbl: 'Số tài khoản:',
      accHolderLbl: 'Chủ tài khoản:',
      memoLbl: 'Nội dung CK:',
      amountLbl: 'Số tiền:',
      disclaimer: 'Hãy xem hướng dẫn kỹ, Cân nhắc trước khi mua, thanh toán xong sẽ không được hoàn trả',
      btnLoginToBuy: 'Vui lòng Đăng nhập để mua gói',
      loginNotice: 'Bạn cần đăng nhập để tạo và lưu lại lịch sử giao dịch.',
      btnPaid: 'Tôi đã thanh toán',
    },
    en: {
      processingText: 'Processing transaction, please do not close...',
      successTitle: 'Order Created Successfully!',
      successDesc: (uname: string, planName: string, price: string) => `System has recorded the order for account ${uname} for the plan ${planName} (${price}).`,
      lblUser: 'Account User:',
      lblPlan: 'Selected Plan:',
      lblAmount: 'Amount:',
      lblMemo: 'Transfer Memo:',
      btnContactZalo: (contact: string) => `Contact Support for instant activation: ${contact}`,
      headerTitle: 'Payment Details & QR Code',
      qrPrompt: (memo: string) => `Scan QR to pay | Transfer memo: ${memo}`,
      bankNameLbl: 'Beneficiary Bank:',
      accNoLbl: 'Account Number:',
      accHolderLbl: 'Account Name:',
      memoLbl: 'Transfer Memo:',
      amountLbl: 'Total Amount:',
      disclaimer: 'Please review features carefully before purchasing. Digital licenses are non-refundable once activated.',
      btnLoginToBuy: 'Please Sign In to Purchase',
      loginNotice: 'Signing in is required to generate and link your digital license key.',
      btnPaid: 'I Have Completed Payment',
    },
    ja: {
      processingText: '処理中です。この画面を閉じないでください...',
      successTitle: '注文の受付が完了しました！',
      successDesc: (uname: string, planName: string, price: string) => `アカウント ${uname} によるプラン ${planName} (${price}) のお申し込みを記録しました。`,
      lblUser: 'ユーザー名:',
      lblPlan: '選択プラン:',
      lblAmount: '決済金額:',
      lblMemo: '振込名義/メモ:',
      btnContactZalo: (contact: string) => `専任サポートに連絡して有効化: ${contact}`,
      headerTitle: 'お支払い情報・QR決済',
      qrPrompt: (memo: string) => `QRコードをスキャンして送金 | 振込メモ: ${memo}`,
      bankNameLbl: '受取銀行:',
      accNoLbl: '口座番号:',
      accHolderLbl: '受取人名義:',
      memoLbl: '振込メモ:',
      amountLbl: '決済金額:',
      disclaimer: '※デジタル製品の性質上、ライセンス発行後の返金はお受けできません。十分にご確認の上ご購入ください。',
      btnLoginToBuy: 'ログインして購入へ進む',
      loginNotice: 'ライセンスと履歴を紐付けるため、事前のログインが必要です。',
      btnPaid: '決済を完了しました',
    },
    zh: {
      processingText: '正在处理交易，请勿关闭窗口...',
      successTitle: '订单创建成功！',
      successDesc: (uname: string, planName: string, price: string) => `系统已成功记录账号 ${uname} 购买的 ${planName} (${price}) 订单。`,
      lblUser: '用户账号：',
      lblPlan: '所选方案：',
      lblAmount: '支付金额：',
      lblMemo: '转账附言/备注：',
      btnContactZalo: (contact: string) => `联系技术支持立即激活软件: ${contact}`,
      headerTitle: '订单支付与扫码结算',
      qrPrompt: (memo: string) => `扫码快捷支付 | 备注附言：${memo}`,
      bankNameLbl: '收款机构：',
      accNoLbl: '收款账号：',
      accHolderLbl: '收款人姓名：',
      memoLbl: '转账附言：',
      amountLbl: '支付金额：',
      disclaimer: '数字授权软件交付后一律不支持退款，请在购买前仔细体验测试并确认需求。',
      btnLoginToBuy: '请先登录账号后再进行购买',
      loginNotice: '您需要登录以将激活序列号与您的账户绑定。',
      btnPaid: '我已完成扫码支付',
    }
  }[language] || {
    processingText: 'Đang xử lý, vui lòng không thoát...',
    successTitle: 'Giao Dịch Đã Tạo Thành Công!',
    successDesc: (uname: string, planName: string, price: string) => `Hệ thống đã ghi nhận giao dịch của tài khoản ${uname} cho gói ${planName} (${price}).`,
    lblUser: 'Tài khoản User:',
    lblPlan: 'Gói đã chọn:',
    lblAmount: 'Số tiền:',
    lblMemo: 'Nội dung CK:',
    btnContactZalo: (contact: string) => `Liên hệ Zalo kích hoạt ngay: ${contact}`,
    headerTitle: 'Thông Tin Thanh Toán',
    qrPrompt: (memo: string) => `Quét mã để thanh toán | Nội dung: ${memo}`,
    bankNameLbl: 'Ngân hàng:',
    accNoLbl: 'Số tài khoản:',
    accHolderLbl: 'Chủ tài khoản:',
    memoLbl: 'Nội dung CK:',
    amountLbl: 'Số tiền:',
    disclaimer: 'Hãy xem hướng dẫn kỹ, Cân nhắc trước khi mua, thanh toán xong sẽ không được hoàn trả',
    btnLoginToBuy: 'Vui lòng Đăng nhập để mua gói',
    loginNotice: 'Bạn cần đăng nhập để tạo và lưu lại lịch sử giao dịch.',
    btnPaid: 'Tôi đã thanh toán',
  };

  const paymentSettings = {
    vietqr_account_holder: 'PHAM DUC PHI',
    vietqr_account_number: '0357838215',
    vietqr_bank_id: '970422',
    vietqr_bank_name: 'MB Bank',
    zalo_contact: '0563.402.950'
  };

  const rawPrice = plan.priceFormatted.replace(/\D/g, '');
  const amount = parseInt(rawPrice, 10) || 550000;

  const uname = userSession.isLoggedIn && userSession.username ? userSession.username : 'user';
  const transactionContent = `${uname} chuyen tien`;

  const bankId = paymentSettings.vietqr_bank_id;
  const accountNo = paymentSettings.vietqr_account_number;
  const accountName = encodeURIComponent(paymentSettings.vietqr_account_holder);
  const addInfo = encodeURIComponent(transactionContent);
  const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-onlyqr.png?amount=${amount}&addInfo=${addInfo}&accountName=${accountName}`;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAction = () => {
    if (!userSession.isLoggedIn) {
      onClose();
      onOpenLogin();
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTransactionSuccess(true);
      setTimeout(() => {
        setTransactionSuccess(false);
        onClose();
      }, 4000);
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        {/* Processing Spinner Overlay */}
        {isProcessing && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-[100]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mb-4" />
            <p className="text-white text-lg font-bold">{payTexts.processingText}</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md rounded-2xl bg-gray-900 border border-white/10 p-8 text-white shadow-2xl relative my-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-light leading-none cursor-pointer"
          >
            &times;
          </button>

          {transactionSuccess ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">{payTexts.successTitle}</h3>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                {payTexts.successDesc(uname, plan.name, plan.priceFormatted)}
              </p>
              <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-xs text-gray-400 text-left space-y-2">
                <div className="flex justify-between">
                  <span>{payTexts.lblUser}</span>
                  <span className="text-cyan-300 font-mono font-bold">{uname}</span>
                </div>
                <div className="flex justify-between">
                  <span>{payTexts.lblPlan}</span>
                  <span className="text-white font-mono font-bold">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>{payTexts.lblAmount}</span>
                  <span className="text-emerald-400 font-mono font-bold">{plan.priceFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span>{payTexts.lblMemo}</span>
                  <span className="text-indigo-400 font-mono font-bold">{transactionContent}</span>
                </div>
              </div>
              <a
                href={`https://zalo.me/${paymentSettings.zalo_contact.replace(/\./g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{payTexts.btnContactZalo(paymentSettings.zalo_contact)}</span>
              </a>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-indigo-400">{payTexts.headerTitle}</h3>
              </div>

              {/* QR Code Section */}
              <div className="text-center">
                <img
                  src={qrUrl}
                  alt="QR Code"
                  className="mx-auto rounded-lg w-56 h-56 mb-4 ring-2 ring-indigo-500 p-1 bg-white"
                />
                <p className="text-sm text-gray-400">
                  {payTexts.qrPrompt(transactionContent)}
                </p>
              </div>

              {/* Bank Details */}
              <div className="mt-6 space-y-3 bg-gray-800 p-4 rounded-lg text-sm">
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">{payTexts.bankNameLbl}</span>
                  <span className="font-semibold text-white">{paymentSettings.vietqr_bank_name}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">{payTexts.accNoLbl}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white font-mono">{paymentSettings.vietqr_account_number}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(paymentSettings.vietqr_account_number, 'acc')}
                      className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors cursor-pointer"
                      title="Copy"
                    >
                      {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">{payTexts.accHolderLbl}</span>
                  <span className="font-semibold text-white">{paymentSettings.vietqr_account_holder}</span>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span className="text-gray-400">{payTexts.memoLbl}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-indigo-300 font-mono">{transactionContent}</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(transactionContent, 'content')}
                      className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors cursor-pointer"
                      title="Copy"
                    >
                      {copiedField === 'content' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-gray-700 pt-3 mt-3">
                  <span className="text-gray-400 font-bold">{payTexts.amountLbl}</span>
                  <span className="font-bold text-xl text-indigo-400 font-mono">{plan.priceFormatted}</span>
                </div>
              </div>

              {/* Warning text */}
              <p className="mt-4 text-center text-xs text-gray-400 leading-relaxed">
                {payTexts.disclaimer}
              </p>

              {/* Submit / Action Button */}
              <div className="mt-6">
                {!userSession.isLoggedIn ? (
                  <div>
                    <button
                      type="button"
                      onClick={handleAction}
                      className="w-full bg-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors text-white text-sm shadow-lg shadow-indigo-600/30 cursor-pointer"
                    >
                      {payTexts.btnLoginToBuy}
                    </button>
                    <p className="mt-3 text-center text-xs text-amber-400">
                      {payTexts.loginNotice}
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handleAction}
                    className="w-full bg-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors text-white text-sm shadow-lg shadow-indigo-600/30 cursor-pointer"
                  >
                    {payTexts.btnPaid}
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
