import { useState } from "react";

interface LoginTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export default function LoginTabs({ activeTab, onTabChange, className = "" }: LoginTabsProps) {
  const tabs = [
    { key: "sms", label: "验证码登录" },
    { key: "account", label: "账号登录" }
  ];

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* 使用提供的 HTML 结构 */}
      <div className="w-96 h-11 relative bg-stone-50 rounded-[29px]">
        {/* 验证码登录 Tab */}
        <div 
          className={`w-36 h-9 left-[4px] top-[4px] absolute rounded-[31px] cursor-pointer transition-all duration-200 ${
            activeTab === "sms" ? "bg-white shadow-sm" : "hover:bg-white/30"
          }`}
          onClick={() => onTabChange("sms")}
        >
          <div className={`left-[26.50px] top-[8px] absolute text-center justify-start text-lg font-normal font-['OPPOSans'] transition-colors duration-200 ${
            activeTab === "sms" ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-700"
          }`}>
            验证码登录
          </div>
        </div>

        {/* 分隔线 */}
        <div className="w-0 h-2.5 left-[148px] top-[18px] absolute outline outline-1 outline-offset-[-0.50px] outline-neutral-500"></div>

        {/* 账号登录 Tab */}
        <div 
          className={`w-36 h-9 left-[148px] top-[4px] absolute rounded-xl cursor-pointer transition-all duration-200 ${
            activeTab === "account" ? "bg-white shadow-sm" : "hover:bg-white/30"
          }`}
          onClick={() => onTabChange("account")}
        >
          <div className={`left-[35.50px] top-[8px] absolute text-center justify-start text-lg font-normal font-['OPPOSans'] transition-colors duration-200 ${
            activeTab === "account" ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-700"
          }`}>
            账号登录
          </div>
        </div>
      </div>
    </div>
  );
}

// 使用示例
export function LoginTabsExample() {
  const [activeTab, setActiveTab] = useState("sms");

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-lg mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center">登录标签页</h1>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <LoginTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          {/* 内容区域 */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-center text-gray-600">
              当前选中: <span className="font-semibold">{activeTab}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}