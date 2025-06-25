import { useState } from "react";

interface TabItem {
  key: string;
  label: string;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  size?: 'small' | 'default' | 'large';
  variant?: 'default' | 'card' | 'pill';
  className?: string;
}

export default function OptimizedTabs({ 
  items, 
  activeKey, 
  onChange, 
  size = 'default',
  variant = 'default',
  className = ""
}: TabsProps) {
  // 尺寸配置
  const sizeConfig = {
    small: {
      container: "p-1 gap-1",
      tab: "py-2 px-3 text-sm",
      height: "h-8"
    },
    default: {
      container: "p-1 gap-1", 
      tab: "py-3 px-4 text-base",
      height: "h-12"
    },
    large: {
      container: "p-1.5 gap-1.5",
      tab: "py-4 px-6 text-lg", 
      height: "h-14"
    }
  };

  // 变体配置
  const variantConfig = {
    default: {
      container: "bg-gray-50 border border-gray-200 rounded-xl shadow-sm",
      activeTab: "bg-white text-gray-900 shadow-sm border border-white",
      inactiveTab: "text-gray-600 hover:text-gray-800 hover:bg-white/50"
    },
    card: {
      container: "bg-white border border-gray-200 rounded-lg shadow-md",
      activeTab: "bg-blue-50 text-blue-700 border-blue-200",
      inactiveTab: "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
    },
    pill: {
      container: "bg-gray-100 rounded-full p-1",
      activeTab: "bg-white text-gray-900 shadow-md",
      inactiveTab: "text-gray-600 hover:text-gray-800 hover:bg-white/60"
    }
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  return (
    <div 
      className={`
        inline-flex w-full max-w-md mx-auto
        ${currentVariant.container}
        ${currentSize.container}
        ${className}
      `}
      role="tablist"
      aria-orientation="horizontal"
    >
      {items.map((item, index) => {
        const isActive = activeKey === item.key;
        const isDisabled = item.disabled;
        
        return (
          <button
            key={item.key}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${item.key}`}
            tabIndex={isActive ? 0 : -1}
            disabled={isDisabled}
            className={`
              flex-1 flex items-center justify-center
              ${currentSize.tab}
              ${currentSize.height}
              font-medium rounded-lg
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isActive 
                ? currentVariant.activeTab 
                : currentVariant.inactiveTab
              }
              ${!isDisabled && !isActive ? 'active:scale-[0.98]' : ''}
            `}
            onClick={() => !isDisabled && onChange(item.key)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft' && index > 0) {
                const prevItem = items[index - 1];
                if (!prevItem.disabled) onChange(prevItem.key);
              } else if (e.key === 'ArrowRight' && index < items.length - 1) {
                const nextItem = items[index + 1];
                if (!nextItem.disabled) onChange(nextItem.key);
              }
            }}
          >
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// 使用示例组件
export function TabsExample() {
  const [activeTab, setActiveTab] = useState("tab1");
  
  const tabItems = [
    { key: "tab1", label: "验证码登录" },
    { key: "tab2", label: "账号登录" },
    { key: "tab3", label: "SSO登录", disabled: true }
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">默认样式</h3>
        <OptimizedTabs 
          items={tabItems}
          activeKey={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">卡片样式</h3>
        <OptimizedTabs 
          items={tabItems}
          activeKey={activeTab}
          onChange={setActiveTab}
          variant="card"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">胶囊样式</h3>
        <OptimizedTabs 
          items={tabItems}
          activeKey={activeTab}
          onChange={setActiveTab}
          variant="pill"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">不同尺寸</h3>
        <div className="space-y-3">
          <OptimizedTabs 
            items={[{ key: "small1", label: "小尺寸" }, { key: "small2", label: "选项2" }]}
            activeKey="small1"
            onChange={() => {}}
            size="small"
          />
          <OptimizedTabs 
            items={[{ key: "default1", label: "默认尺寸" }, { key: "default2", label: "选项2" }]}
            activeKey="default1"
            onChange={() => {}}
            size="default"
          />
          <OptimizedTabs 
            items={[{ key: "large1", label: "大尺寸" }, { key: "large2", label: "选项2" }]}
            activeKey="large1"
            onChange={() => {}}
            size="large"
          />
        </div>
      </div>
    </div>
  );
}