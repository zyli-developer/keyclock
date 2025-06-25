import { useState } from "react";

interface LoginTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export default function LoginTabs({ activeTab, onTabChange, className = "" }: LoginTabsProps) {
  const tabs = [
    { key: "sms", label: "验证码登录" },
    { key: "account", label: "账号登录" },
    { key: "sso", label: "SSO登录" }
  ];

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {/* 容器 - 复刻原始设计 */}
      <div className="relative bg-stone-50 rounded-[29px] h-11 p-1 flex">
        {/* 活跃背景滑块 */}
        <div 
          className="absolute top-1 bottom-1 bg-white rounded-[31px] shadow-sm transition-all duration-300 ease-out"
          style={{
            width: `${100 / tabs.length}%`,
            left: `${(tabs.findIndex(tab => tab.key === activeTab) * 100) / tabs.length}%`,
            transform: 'translateX(0%)'
          }}
        />
        
        {/* Tab 按钮 */}
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.key;
          const isDisabled = tab.key === "sso"; // SSO 暂时禁用
          
          return (
            <button
              key={tab.key}
              disabled={isDisabled}
              className={`
                relative flex-1 h-9 flex items-center justify-center
                text-lg font-normal font-['OPPOSans'] rounded-[31px]
                transition-all duration-200 ease-out
                focus:outline-none focus:ring-2 focus:ring-blue-500/20
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isActive 
                  ? 'text-neutral-900 z-10' 
                  : isDisabled 
                    ? 'text-neutral-400'
                    : 'text-neutral-500 hover:text-neutral-700'
                }
                ${!isActive && !isDisabled ? 'active:scale-[0.98]' : ''}
              `}
              onClick={() => !isDisabled && onTabChange(tab.key)}
            >
              <span className="relative z-10 px-2 truncate">
                {tab.label}
              </span>
            </button>
          );
        })}
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