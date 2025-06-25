import { useState } from "react";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import Template from "keycloakify/login/Template";

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { i18n } = useI18n({ kcContext });

  // 彻底隐藏语言选择
  const kcContextNoLocale = { ...kcContext, locale: undefined };

  if (kcContext.pageId !== "login.ftl") {
    return (
      <Template
        kcContext={kcContextNoLocale}
        i18n={i18n}
        doUseDefaultCss={false}
        classes={{}}
        headerNode={null}
        children={null}
      />
    );
  }

  const [loginType, setLoginType] = useState("phone");
  const [checked, setChecked] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  
  // 错误提示示例
  const errorMessage = phoneNumber && !/^1[3-9]\d{9}$/.test(phoneNumber) ? "请输入有效手机号" : "";

  // SSO 跳转
  if (loginType === "sso") {
    window.location.href = kcContext.url.loginAction;
    return <div className="flex items-center justify-center h-screen text-lg">正在跳转SSO登录...</div>;
  }

  return (
    <div className="flex min-h-screen font-sans bg-gray-50">
      {/* 左侧品牌区 */}
      <div className="w-1/2 min-h-screen bg-gradient-to-br from-[#A7BEFF] to-[#8B5CF6] flex flex-col justify-between items-center relative rounded-tr-[42px] rounded-br-[42px] overflow-hidden">
        {/* 顶部Logo */}
        <div className="w-full flex items-start pt-12 pl-12">
          <span className="text-[52px] font-serif font-bold text-black leading-none">ONE</span>
          <span className="text-[52px] font-serif font-normal text-white leading-none ml-2">Syn</span>
        </div>
        
        {/* 中间装饰图 */}
        <div className="flex-1 flex items-center justify-center w-full relative">
          <img 
            src="/login-left.png" 
            alt="login illustration" 
            className="max-h-[70vh] max-w-[85%] object-contain drop-shadow-2xl" 
          />
          
          {/* 装饰性浮动元素 */}
          <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-white/20 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-white/15 rounded-full blur-sm animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-white/25 rounded-full blur-sm animate-pulse delay-500"></div>
        </div>
        
        {/* 底部 slogan 区域 */}
        <div className="w-full flex flex-col items-end pr-12 pb-12">
          <div className="text-white text-[32px] leading-tight text-right font-serif font-light">
            Make every piece<br />of information
          </div>
          <div className="mt-4">
            <span className="bg-black/90 rounded-full px-6 py-2 text-[26px] text-[#A7BEFF] font-serif font-medium backdrop-blur-sm">
              trustworthy
            </span>
          </div>
        </div>
      </div>

      {/* 右侧表单区 */}
      <div className="w-1/2 min-h-screen bg-white flex flex-col justify-center items-center px-16 relative">
        {/* 顶部标题与logo */}
        <div className="flex flex-col items-center mb-12 w-full max-w-[520px]">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[44px] font-semibold text-[#1a1a1a] leading-tight">登录到</span>
            <div className="relative">
              <span className="bg-gradient-to-r from-[#A7BEFF] to-[#8B5CF6] rounded-2xl px-8 py-3 text-[44px] font-semibold text-white shadow-lg">
                SynNovator
              </span>
              {/* 搜索图标 */}
              <div className="absolute -top-2 -right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 登录方式切换tab */}
        <div className="flex w-full max-w-[520px] rounded-2xl mb-12 overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0] shadow-sm">
          <button
            className={`flex-1 py-5 text-[20px] font-semibold transition-all duration-200 ${
              loginType === "phone"
                ? "text-[#1a1a1a] bg-white shadow-sm border-r border-[#E2E8F0]"
                : "text-[#64748B] hover:text-[#475569]"
            }`}
            onClick={() => setLoginType("phone")}
            type="button"
          >
            验证码登录
          </button>
          <button
            className={`flex-1 py-5 text-[20px] font-semibold transition-all duration-200 ${
              loginType === "account"
                ? "text-[#1a1a1a] bg-white shadow-sm border-x border-[#E2E8F0]"
                : "text-[#64748B] hover:text-[#475569]"
            }`}
            onClick={() => setLoginType("account")}
            type="button"
          >
            账号登录
          </button>
          <button
            className={`flex-1 py-5 text-[20px] font-semibold transition-all duration-200 ${
              loginType === "sso"
                ? "text-[#1a1a1a] bg-white shadow-sm border-l border-[#E2E8F0]"
                : "text-[#64748B] hover:text-[#475569]"
            }`}
            onClick={() => setLoginType("sso")}
            type="button"
          >
            SSO登录
          </button>
        </div>

        {/* 登录表单 */}
        <form className="w-full max-w-[520px] space-y-8">
          {/* 手机号输入框 */}
          <div className="space-y-3">
            <label className="block text-[#1a1a1a] text-[18px] font-semibold">手机号</label>
            <div className="relative">
              <div className="flex items-center bg-white border-2 rounded-2xl px-6 h-16 text-[18px] transition-colors focus-within:border-[#A7BEFF] border-[#E2E8F0] hover:border-[#CBD5E1]">
                <div className="flex items-center text-[#64748B] mr-4 border-r border-[#E2E8F0] pr-4">
                  <span className="text-[18px] font-medium">+86</span>
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <input
                  className="flex-1 bg-transparent outline-none text-[#1a1a1a] placeholder-[#94A3B8] text-[18px]"
                  placeholder="请输入手机号"
                  name="username"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              {errorMessage && (
                <div className="text-[#EF4444] text-[16px] mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errorMessage}
                </div>
              )}
            </div>
          </div>

          {/* 验证码输入框 */}
          <div className="space-y-3">
            <label className="block text-[#1a1a1a] text-[18px] font-semibold">短信验证码</label>
            <div className="flex items-center bg-white border-2 rounded-2xl px-6 h-16 text-[18px] border-[#E2E8F0] focus-within:border-[#A7BEFF] hover:border-[#CBD5E1] transition-colors">
              <input
                className="flex-1 bg-transparent outline-none text-[#1a1a1a] placeholder-[#94A3B8] text-[18px]"
                placeholder="请输入6位短信验证码"
                name="password"
                type={showPwd ? "text" : "password"}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                required
              />
              <button 
                type="button" 
                className="ml-4 text-[#64748B] hover:text-[#475569] transition-colors p-1" 
                tabIndex={-1} 
                onClick={() => setShowPwd(v => !v)}
              >
                {showPwd ? (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            <div className="text-[#64748B] text-[16px]">请输入短信验证码</div>
          </div>

          {/* 协议勾选 */}
          <div className="flex items-start space-x-4 py-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-[#CBD5E1] mt-1 accent-[#A7BEFF] focus:ring-2 focus:ring-[#A7BEFF]/20"
              required
            />
            <span className="text-[16px] text-[#475569] leading-relaxed">
              勾选即代表您已阅读并同意我们的
              <a href="#" className="text-[#A7BEFF] hover:text-[#8B5CF6] underline mx-1 font-medium transition-colors">用户协议</a>
              与
              <a href="#" className="text-[#A7BEFF] hover:text-[#8B5CF6] underline mx-1 font-medium transition-colors">隐私政策</a>，未注册的手机号将自动注册
            </span>
          </div>

          {/* 登录按钮 */}
          <div className="pt-4">
            <button
              type="submit"
              className={`w-full h-16 rounded-2xl text-[22px] font-semibold shadow-lg transition-all duration-200 ${
                checked && phoneNumber && verificationCode
                  ? "bg-gradient-to-r from-[#A7BEFF] to-[#8B5CF6] hover:from-[#9333EA] hover:to-[#7C3AED] text-white transform hover:scale-[1.02] hover:shadow-xl"
                  : "bg-[#F1F5F9] text-[#94A3B8] cursor-not-allowed"
              }`}
              disabled={!checked || !phoneNumber || !verificationCode}
            >
              登录
            </button>
          </div>
        </form>

        {/* 底部装饰 */}
        <div className="absolute bottom-8 right-8 opacity-10">
          <div className="w-32 h-32 bg-gradient-to-br from-[#A7BEFF] to-[#8B5CF6] rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}