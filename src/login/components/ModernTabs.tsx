import { useState } from "react";

interface TabItem {
  key: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface ModernTabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  size?: 'small' | 'default' | 'large';
  variant?: 'default' | 'rounded' | 'underline';
  className?: string;
}

export default function ModernTabs({ 
  items, 
  activeKey, 
  onChange, 
  size = 'default',
  variant = 'default',
  className = ""
}: ModernTabsProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // 尺寸配置
  const sizeStyles = {
    small: {
      container: "h-9 p-1 text-sm",
      tab: "px-3 py-1.5 min-h-[28px]",
      gap: "gap-0.5"
    },
    default: {
      container: "h-11 p-1 text-base", 
      tab: "px-4 py-2 min-h-[36px]",
      gap: "gap-1"
    },
    large: {
      container: "h-14 p-1.5 text-lg",
      tab: "px-6 py-3 min-h-[44px]", 
      gap: "gap-1.5"
    }
  };

  // 变体样式
  const variantStyles = {
    default: {
      container: "bg-stone-50 rounded-[29px] border border-stone-200",
      activeTab: "bg-white text-neutral-900 shadow-sm border border-white/50",
      inactiveTab: "text-neutral-500 hover:text-neutral-700 hover:bg-white/30",
      tabRadius: "rounded-[31px]"
    },
    rounded: {
      container: "bg-gray-100 rounded-2xl",
      activeTab: "bg-white text-gray-900 shadow-md",
      inactiveTab: "text-gray-600 hover:text-gray-800 hover:bg-white/50",
      tabRadius: "rounded-xl"
    },
    underline: {
      container: "bg-transparent border-b border-gray-200",
      activeTab: "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50",
      inactiveTab: "text-gray-500 hover:text-gray-700 border-b-2 border-transparent",
      tabRadius: "rounded-t-lg"
    }
  };

  const currentSize = sizeStyles[size];
  const currentVariant = variantStyles[variant];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = index > 0 ? index - 1 : items.length - 1;
        const prevItem = items[prevIndex];
        if (!prevItem.disabled) {
          onChange(prevItem.key);
          setFocusedIndex(prevIndex);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = index < items.length - 1 ? index + 1 : 0;
        const nextItem = items[nextIndex];
        if (!nextItem.disabled) {
          onChange(nextItem.key);
          setFocusedIndex(nextIndex);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!items[index].disabled) {
          onChange(items[index].key);
        }
        break;
    }
  };

  return (
    <div 
      className={`
        relative inline-flex w-full max-w-sm mx-auto
        ${currentVariant.container}
        ${currentSize.container}
        ${currentSize.gap}
        transition-all duration-300 ease-out
        ${className}
      `}
      role="tablist"
      aria-orientation="horizontal"
    >
      {items.map((item, index) => {
        const isActive = activeKey === item.key;
        const isDisabled = item.disabled;
        const isFocused = focusedIndex === index;
        
        return (
          <button
            key={item.key}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${item.key}`}
            tabIndex={isActive ? 0 : -1}
            disabled={isDisabled}
            className={`
              flex-1 flex items-center justify-center gap-2
              ${currentSize.tab}
              ${currentVariant.tabRadius}
              font-medium relative overflow-hidden
              transition-all duration-200 ease-out
              focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-1
              disabled:opacity-40 disabled:cursor-not-allowed
              ${isActive 
                ? `${currentVariant.activeTab} transform-none` 
                : `${currentVariant.inactiveTab} ${!isDisabled ? 'active:scale-[0.98]' : ''}`
              }
              ${isFocused ? 'ring-2 ring-blue-500/30' : ''}
            `}
            onClick={() => !isDisabled && onChange(item.key)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(-1)}
          >
            {/* 背景动画效果 */}
            {isActive && (
              <div 
                className="absolute inset-0 bg-gradient-to-r from-white/80 to-white rounded-[inherit] -z-10"
                style={{
                  animation: 'slideIn 0.3s ease-out'
                }}
              />
            )}
            
            {/* 图标 */}
            {item.icon && (
              <span className={`flex-shrink-0 ${isActive ? 'text-current' : 'text-inherit'}`}>
                {item.icon}
              </span>
            )}
            
            {/* 文字 */}
            <span className="truncate font-['OPPOSans'] font-normal">
              {item.label}
            </span>
            
            {/* 活跃指示器 */}
            {isActive && variant === 'underline' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-current rounded-full" />
            )}
          </button>
        );
      })}
      
      {/* 全局样式 */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

// 使用示例
export function TabsShowcase() {
  const [activeTab1, setActiveTab1] = useState("sms");
  const [activeTab2, setActiveTab2] = useState("account");
  const [activeTab3, setActiveTab3] = useState("tab1");
  
  const loginTabs = [
    { 
      key: "sms", 
      label: "验证码登录",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    },
    { 
      key: "account", 
      label: "账号登录",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    },
    { 
      key: "sso", 
      label: "SSO登录",
      disabled: true,
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    }
  ];

  const simpleTabs = [
    { key: "tab1", label: "选项一" },
    { key: "tab2", label: "选项二" },
    { key: "tab3", label: "选项三" }
  ];

  return (
    <div className="space-y-12 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900">Tab 组件展示</h1>
        
        {/* 原始设计复刻 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">原始设计复刻</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <ModernTabs 
              items={loginTabs.slice(0, 2)}
              activeKey={activeTab1}
              onChange={setActiveTab1}
              size="default"
              variant="default"
            />
          </div>
        </div>

        {/* 不同尺寸 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">不同尺寸</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">小尺寸</p>
              <ModernTabs 
                items={simpleTabs}
                activeKey={activeTab3}
                onChange={setActiveTab3}
                size="small"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">默认尺寸</p>
              <ModernTabs 
                items={simpleTabs}
                activeKey={activeTab3}
                onChange={setActiveTab3}
                size="default"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">大尺寸</p>
              <ModernTabs 
                items={simpleTabs}
                activeKey={activeTab3}
                onChange={setActiveTab3}
                size="large"
              />
            </div>
          </div>
        </div>

        {/* 不同变体 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">不同样式变体</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">默认样式</p>
              <ModernTabs 
                items={loginTabs.slice(0, 2)}
                activeKey={activeTab2}
                onChange={setActiveTab2}
                variant="default"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">圆角样式</p>
              <ModernTabs 
                items={loginTabs.slice(0, 2)}
                activeKey={activeTab2}
                onChange={setActiveTab2}
                variant="rounded"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">下划线样式</p>
              <ModernTabs 
                items={loginTabs.slice(0, 2)}
                activeKey={activeTab2}
                onChange={setActiveTab2}
                variant="underline"
              />
            </div>
          </div>
        </div>

        {/* 带图标的标签页 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">带图标的标签页</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <ModernTabs 
              items={loginTabs}
              activeKey={activeTab1}
              onChange={setActiveTab1}
              size="default"
            />
          </div>
        </div>
      </div>
    </div>
  );
}