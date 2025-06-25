import { useState } from "react";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import Template from "keycloakify/login/Template";
import LoginForm from "./components/LoginForm";

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

  const [loading, setLoading] = useState(false);

  // 处理登录提交
  const handleLogin = async (formData: any) => {
    setLoading(true);
    try {
      console.log("登录数据:", formData);
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 实际项目中这里应该调用登录API
      // 然后重定向到登录成功页面
      window.location.href = kcContext.url.loginAction;
      
    } catch (error) {
      console.error("登录失败:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="w-1/2 min-h-screen bg-white flex items-center justify-center px-8 relative">
        <LoginForm onSubmit={handleLogin} loading={loading} />
        
        {/* 底部装饰 */}
        <div className="absolute bottom-6 right-6 opacity-5 pointer-events-none">
          <div className="w-24 h-24 bg-gradient-to-br from-[#A7BEFF] to-[#8B5CF6] rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
}