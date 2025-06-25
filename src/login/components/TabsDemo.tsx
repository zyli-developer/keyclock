import { useState } from "react";
import ModernTabs from "./ModernTabs";
import LoginTabs from "./LoginTabs";

export default function TabsDemo() {
  const [demoTab, setDemoTab] = useState("modern");
  const [loginTab, setLoginTab] = useState("sms");
  const [modernTab, setModernTab] = useState("tab1");

  const demoTabs = [
    { key: "modern", label: "现代样式" },
    { key: "original", label: "原始复刻" }
  ];

  const modernTabItems = [
    { 
      key: "tab1", 
      label: "验证码登录",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    },
    { 
      key: "tab2", 
      label: "账号登录",
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* 页面标题 */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Tab 组件对比展示</h1>
          <p className="text-lg text-gray-600">优化前后的 Tab 组件效果对比</p>
        </div>

        {/* 主要演示区域 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* 演示切换 */}
          <div className="mb-8">
            <ModernTabs 
              items={demoTabs}
              activeKey={demoTab}
              onChange={setDemoTab}
              size="default"
              variant="rounded"
            />
          </div>

          {/* 内容区域 */}
          <div className="space-y-8">
            {demoTab === "modern" ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">现代化 Tab 组件</h2>
                
                {/* 基础样式 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">基础样式</h3>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <ModernTabs 
                      items={modernTabItems}
                      activeKey={modernTab}
                      onChange={setModernTab}
                      size="default"
                      variant="default"
                    />
                  </div>
                </div>

                {/* 不同尺寸 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">不同尺寸</h3>
                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">小尺寸</p>
                      <ModernTabs 
                        items={modernTabItems}
                        activeKey={modernTab}
                        onChange={setModernTab}
                        size="small"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">默认尺寸</p>
                      <ModernTabs 
                        items={modernTabItems}
                        activeKey={modernTab}
                        onChange={setModernTab}
                        size="default"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">大尺寸</p>
                      <ModernTabs 
                        items={modernTabItems}
                        activeKey={modernTab}
                        onChange={setModernTab}
                        size="large"
                      />
                    </div>
                  </div>
                </div>

                {/* 不同变体 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">不同样式变体</h3>
                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">默认样式</p>
                      <ModernTabs 
                        items={modernTabItems}
                        activeKey={modernTab}
                        onChange={setModernTab}
                        variant="default"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">圆角样式</p>
                      <ModernTabs 
                        items={modernTabItems}
                        activeKey={modernTab}
                        onChange={setModernTab}
                        variant="rounded"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">下划线样式</p>
                      <ModernTabs 
                        items={modernTabItems}
                        activeKey={modernTab}
                        onChange={setModernTab}
                        variant="underline"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">原始设计复刻</h2>
                <p className="text-gray-600">基于提供的 HTML 结构优化后的版本</p>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <LoginTabs 
                    activeTab={loginTab}
                    onTabChange={setLoginTab}
                  />
                </div>

                {/* 原始 HTML 结构展示 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">原始 HTML 结构问题</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <ul className="text-sm text-red-800 space-y-2">
                      <li>• 使用绝对定位，布局复杂且不灵活</li>
                      <li>• 手动添加分隔线，增加维护成本</li>
                      <li>• 固定像素值，响应式支持差</li>
                      <li>• 缺少交互状态和无障碍支持</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">优化后的改进</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <ul className="text-sm text-green-800 space-y-2">
                      <li>• 使用 Flexbox 布局，简洁且灵活</li>
                      <li>• 滑块动画效果，视觉体验更佳</li>
                      <li>• 响应式设计，适配各种屏幕</li>
                      <li>• 完整的键盘导航和无障碍支持</li>
                      <li>• 组件化设计，易于复用和维护</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 技术特性 */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">技术特性</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>TypeScript 类型安全</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>完整的键盘导航支持</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>ARIA 无障碍属性</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>响应式设计</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>深色模式支持</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">性能优化</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>CSS contain 属性优化渲染</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>will-change 预告浏览器变化</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>transform 动画避免重排</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>减少动画支持检测</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>高对比度模式适配</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}