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
  // 错误提示示例
  const errorMessage = "请输入有效手机号";

  // SSO 跳转
  if (loginType === "sso") {
    window.location.href = kcContext.url.loginAction;
    return <div className="flex items-center justify-center h-screen text-lg">正在跳转SSO登录...</div>;
  }

  return (
    <div className="flex min-h-screen font-sans">
      {/* 左侧品牌区 */}
      <div className="w-1/2 min-h-screen bg-[#A7BEFF] flex flex-col justify-between items-center relative rounded-tr-[42px] rounded-br-[42px] overflow-hidden">
        {/* 顶部Logo */}
        <div className="w-full flex items-start pt-10 pl-10">
          <span className="text-[48px] font-serif font-bold text-black leading-none">ONE</span>
          <span className="text-[48px] font-serif font-normal text-white leading-none ml-1">Syn</span>
        </div>
        {/* 中间装饰图 */}
        <div className="flex-1 flex items-center justify-center w-full">
          <img src="/login-left.png" alt="login left" className="max-h-[70vh] max-w-[90%] object-contain" />
        </div>
        {/* 底部 slogan 区域 */}
        <div className="w-full flex flex-col items-end pr-10 pb-10">
          <div className="text-white text-[28px] leading-tight text-right font-serif">
            Make every piece<br />of information
          </div>
          <div className="mt-2">
            <span className="bg-black/80 rounded-full px-4 py-1 text-[24px] text-[#A7BEFF] font-serif">trustworthy</span>
          </div>
        </div>
      </div>
      {/* 右侧表单区 */}
      <div className="w-1/2 min-h-screen bg-white flex flex-col justify-center items-center px-12 relative">
        {/* 顶部标题与logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[40px] font-bold text-[#223528]">登录到</span>
            <span className="relative ml-2">
              <span className="bg-[#A7BEFF] rounded-full px-6 py-2 text-[40px] font-bold text-white shadow-sm">SynNovator</span>
              {/* 放大镜icon可用img或svg占位 */}
              <span className="absolute top-0 right-0 -mt-2 -mr-4">
                {/* <img src="/search-icon.svg" alt="icon" className="w-6 h-6" /> */}
              </span>
            </span>
          </div>
        </div>
        {/* 登录方式切换tab */}
        <div className="flex w-full max-w-[480px] rounded-full mb-10 overflow-hidden bg-[#F5FAF8] border border-[#E6EAE9]">
          <button
            className={`flex-1 py-4 text-[22px] font-bold transition-colors duration-150 ${
              loginType === "phone"
                ? "text-[#223528] bg-white shadow"
                : "text-[#223528]/60"
            }`}
            onClick={() => setLoginType("phone")}
            type="button"
          >
            验证码登录
          </button>
          <span className="w-[1px] bg-[#E6EAE9] my-3"></span>
          <button
            className={`flex-1 py-4 text-[22px] font-bold transition-colors duration-150 ${
              loginType === "account"
                ? "text-[#223528] bg-white shadow"
                : "text-[#223528]/60"
            }`}
            onClick={() => setLoginType("account")}
            type="button"
          >
            账号登录
          </button>
          <span className="w-[1px] bg-[#E6EAE9] my-3"></span>
          <button
            className={`flex-1 py-4 text-[22px] font-bold transition-colors duration-150 ${
              loginType === "sso"
                ? "text-[#223528] bg-white shadow"
                : "text-[#223528]/60"
            }`}
            onClick={() => setLoginType("sso")}
            type="button"
          >
            SSO登录
          </button>
        </div>
        {/* 登录表单 */}
        <form className="w-full max-w-[480px]">
          {/* 手机号输入框 */}
          <div className="mb-2">
            <label className="block text-[#223528] text-[20px] font-bold mb-2">手机号</label>
            <div className="flex items-center bg-white border-2 rounded-full px-6 h-16 text-[20px] focus-within:border-[#A7BEFF] border-[#FF6A3A]">
              <span className="text-[#223528] mr-3">+86 ▾</span>
              <input
                className="flex-1 bg-transparent outline-none text-[#223528] placeholder-[#BDBDBD] text-[20px]"
                placeholder="Text"
                name="username"
                type="text"
                required
              />
            </div>
            <div className="text-[#FF6A3A] text-[16px] mt-2">{errorMessage}</div>
          </div>
          {/* 验证码输入框 */}
          <div className="mb-2 mt-8">
            <label className="block text-[#223528] text-[20px] font-bold mb-2">短信验证码</label>
            <div className="flex items-center bg-white border-2 rounded-full px-6 h-16 text-[20px] border-[#223528]/20 focus-within:border-[#A7BEFF]">
              <input
                className="flex-1 bg-transparent outline-none text-[#223528] placeholder-[#BDBDBD] text-[20px]"
                placeholder="请输入6位短信验证码"
                name="password"
                type={showPwd ? "text" : "password"}
                required
              />
              <button type="button" className="ml-2 text-[#BDBDBD] text-xl" tabIndex={-1} onClick={() => setShowPwd(v => !v)}>
                {/* 眼睛icon可用svg占位 */}
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
            <div className="text-[#223528]/60 text-[16px] mt-2">请输入短信验证码</div>
          </div>
          {/* 协议勾选 */}
          <div className="flex items-center mt-8 mb-8">
            <input
              type="checkbox"
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
              className="w-5 h-5 rounded border border-[#223528] mr-3 accent-[#A7BEFF]"
              required
            />
            <span className="text-[16px] text-[#223528]/80">
              勾选即代表您已阅读并同意我们的
              <a href="#" className="text-[#223528] underline mx-1">用户协议</a>
              与
              <a href="#" className="text-[#223528] underline mx-1">隐私政策</a>，未注册的手机号将自动注册
            </span>
          </div>
          {/* 登录按钮 */}
          <div className="mb-2">
            <button
              type="submit"
              className="w-full h-16 rounded-full text-[24px] bg-[#8B5CF6] hover:bg-[#A7BEFF] border-none text-white font-bold shadow-md transition-colors"
              disabled={!checked}
            >
              主题
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
